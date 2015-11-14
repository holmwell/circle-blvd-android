angular.module('circle-blvd.controllers')
.controller('CirclesCtrl', function ($scope, $http, $state, CircleBlvdClient) {
	
	var member = CircleBlvdClient.getMember();
	if (!member) {
		// TODO: Not signed in. Figure it out.
		console.log("Member not set");
		return;
	}

	var circles = {};
	var memberships = member.memberships;

	member.memberships.forEach(function (membership) {
		circles[membership.circleName] = {
			circleName: membership.circleName,
			circle: membership.circle
		};
	});

	$scope.circleList = circles;
});