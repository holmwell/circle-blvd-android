angular.module('starter.controllers')
.controller('ListCtrl', function ($scope, $http, $state, $stateParams, Session) {
	
	var member = Session.getMember();
	if (!member) {
		// TODO: Not signed in. Figure it out.
		console.log("Member not set");
		return;
	}

	var listId = $stateParams.listId;
	if (!listId) {
		// TODO: No list specified
		console.log("No list specified in URL");
		return;
	}

	var list = [];

	$http.get('http://localhost:3000/data/' + listId + '/stories')
	.success(function (storyList) {

		$http.get('http://localhost:3000/data/' + listId + '/first-story')
		.success(function (firstStory) {

			// Basic 'build list' algorithm
			list.push(firstStory);
			var story = firstStory;
			var nextStory = storyList[story.nextId];

			// TODO: This will break if there is a loop in the list.
			while (nextStory) {
				list.push(nextStory);
				story = nextStory;
				nextStory = storyList[story.nextId];
			}

			$scope.list = list;
		})
	});

});