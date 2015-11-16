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

	$scope.task = list[$stateParams.taskId];

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
		});
	};
});