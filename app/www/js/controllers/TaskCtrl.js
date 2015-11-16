angular.module('circle-blvd.controllers')
.controller('TaskCtrl', function ($scope, $http, $stateParams, Session, CircleBlvdClient) {
	
	var member = Session.getMember();
	if (!member) {
		// TODO: Not signed in. Figure it out.
		console.log("Member not set");
		return;
	}

	var list = Session.getActiveList();
	if (!list) {
		// TODO: No active list. Figure it out.
		console.log("Active list not set");
		return;
	}

	var listId = $stateParams.listId;
	var task = list[$stateParams.taskId];
	$scope.task = task;

	var isStatus = function (status) {
		return task.status === status;
	}

	$scope.isSad = function () {
		return isStatus('sad');
	};
	$scope.isActive = function () {
		return isStatus('active');
	};
	$scope.isNew = function () {
		return isStatus('') || isStatus('new');
	};
	$scope.isAssigned = function () {
		return isStatus('assigned');
	};
	$scope.isDone = function () {
		return isStatus('done');
	};


	$scope.setStatus = function (status) {
		$scope.task.status = status;
		$scope.saveTask($scope.task);
	};

	$scope.saveTask = function (task) {
		CircleBlvdClient.saveTask(task, function (err, task) {
			if (err) {
				console.log('Error: ' + err.message);
				return;
			}
			// Save our state.
			if (listId === task.listId || task.projectId) {
				var list = Session.getActiveList();
				list[task.id] = task;
				Session.setActiveList(list);				
			}
		});
	};
});