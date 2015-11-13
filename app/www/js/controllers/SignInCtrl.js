angular.module('circle-blvd.controllers')
.controller('SignInCtrl', function ($scope, $state, Session, CircleBlvdClient) {
	
	$scope.member = {};

	$scope.signIn = function (email, password) {
		$scope.message = "";

		CircleBlvdClient.signIn(email, password, function (err, member) {
			if (err) {
				switch (err.status) {
					case 401:
						$scope.message = "Sorry, please try something else.";
					default: 
						$scope.message = "Sorry, our computers aren't working right now."
				}
				console.log(err);
				return;
			}
			$scope.message = "Success!";

			Session.setMember(member);
			$state.go('circles')
		});
	};
});