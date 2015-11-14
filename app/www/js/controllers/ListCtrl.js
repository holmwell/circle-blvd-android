angular.module('circle-blvd.controllers')
.controller('ListCtrl', function ($scope, $stateParams, Session, CircleBlvdClient) {
	
	// TODO: Get active circle name and display in the title.

	var listId = $stateParams.listId;
	if (!listId) {
		// TODO: No list specified
		console.log("No list ID specified in URL");
		return;
	}

	var member = CircleBlvdClient.getMember();

	CircleBlvdClient.getList(listId, function (err, result) {
		if (err) {
			// TODO: Fail
			console.log(err);
			return;
		}
		
		var taskTable = result.taskTable;
		// Save task data to session
		Session.setActiveList(taskTable);

		var list = CircleBlvdClient.buildList(result.firstTask, result.taskTable);

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
	});
});