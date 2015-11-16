angular.module('circle-blvd.controllers')
.controller('ListCtrl', function ($scope, $stateParams, Session, CircleBlvdClient) {
	
	var listId = $stateParams.listId;
	var listName = $stateParams.listName;

	if (!listId) {
		// TODO: No list specified
		console.log("No list ID specified in URL");
		return;
	}

	if (!listName) {
		// Don't care.
		console.log("No list name specified in URL");
	}

	var member = CircleBlvdClient.getMember();
	var firstTaskId = undefined;

	var buildViewModel = function (firstTaskId, taskTable) {
		var list = CircleBlvdClient.buildList(firstTaskId, taskTable);

		// Set up the view model: figure out which tasks
		// are mileposts, before the next meeting, etc.
		var isBeforeNextMeeting = true;

		angular.forEach(list, function (task) {
			task.type = "task";

			if (task.owner === member.name) {
				task.ownerRelationship = "mine";
			}

			task.isBeforeNextMeeting = isBeforeNextMeeting;

			if (task.isDeadline) {
				task.type = "milepost";
			}

			if (task.isNextMeeting) {
				task.type = "next-meeting";
				isBeforeNextMeeting = false;
			}

			if (task.isBeforeNextMeeting) {
				task.meetingRelationship = "before-meeting";
			}
			else {
				task.meetingRelationship = "after-meeting";
			}
		});

		$scope.list = list;
		$scope.listName = listName;
	};

	CircleBlvdClient.getList(listId, function (err, result) {
		if (err) {
			// TODO: Fail
			console.log(err);
			return;
		}
		
		var taskTable = result.taskTable;
		firstTaskId = result.firstTask.id;
		// Save task data to session
		Session.saveActiveList(taskTable);

		buildViewModel(firstTaskId, taskTable);
	});

	$scope.$on("$stateChangeSuccess", function (e, toState) {
		if (toState.name === 'list') {
			if (Session.getActiveList() && $scope.list) {
				// We're returning to this page with new data. Let's update.
				buildViewModel(firstTaskId, Session.getActiveList());
			}
		}
	});
});