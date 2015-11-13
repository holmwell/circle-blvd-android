angular.module('circle-blvd.controllers')
.controller('TaskCtrl', function ($scope, $http, $stateParams, Session) {
	
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
});