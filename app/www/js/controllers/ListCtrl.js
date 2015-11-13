angular.module('circle-blvd.controllers')
.controller('ListCtrl', function ($scope, $stateParams, Session, CircleBlvdClient) {
	
	var listId = $stateParams.listId;
	if (!listId) {
		// TODO: No list specified
		console.log("No list ID specified in URL");
		return;
	}

	var list = [];

	CircleBlvdClient.getList(listId, function (err, result) {
		if (err) {
			// TODO: Fail
			console.log(err);
			return;
		}
		
		var taskTable = result.taskTable;
		// Save story list to session
		Session.setActiveList(taskTable);

		// Basic 'build list' algorithm
		list.push(result.firstTask);
		var story = result.firstTask;
		var nextStory = taskTable[story.nextId];

		// TODO: This will break if there is a loop in the list.
		// TODO: Make a library for this.
		while (nextStory) {
			list.push(nextStory);
			story = nextStory;
			nextStory = taskTable[story.nextId];
		}

		$scope.list = list;
	});

});