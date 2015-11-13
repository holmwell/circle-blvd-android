angular.module('starter.controllers')
.controller('CirclesCtrl', function ($scope, $http, $state, Session) {
	
//	var server = "http://localhost:3000";
	var member = Session.member;
	if (!member) {
		// TODO: Not signed in. Figure it out.
		console.log("Member not set");
		return;
	}

	var circles = {};

	var membership;
	var memberships = member.memberships;

	member.memberships.forEach(function (membership) {
		circles[membership.circleName] = {
			circleName: membership.circleName,
			circle: membership.circle
		};
	});

	$scope.circleList = circles;
});