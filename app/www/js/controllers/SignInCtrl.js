angular.module('circle-blvd.controllers')
.controller('SignInCtrl', function ($scope, $state, CircleBlvdClient) {
	
	$scope.member = {};

	var memberInfoUpdated = function () {
		$scope.message = undefined;
	};

	$scope.$watch('member.email', memberInfoUpdated);
	$scope.$watch('member.password', memberInfoUpdated);

	var isSigningIn = false;

	$scope.signIn = function (email, password) {
		if (isSigningIn) {
			return;
		}
		$scope.message = "";

		if (!email) {
			$scope.message = "Please enter your email address to continue."
			return;
		}

		if (!password) {
			$scope.message = "Please enter your password to continue."
			return;
		}

		isSigningIn = true;
		CircleBlvdClient.setMember(email, password, function (err, member) {
			if (err) {
				switch (err.status) {
					case 401:
						$scope.message = "Sorry, please try something else.";
						break;
					default: 
						$scope.message = "Sorry, our computers aren't working right now.";
						break;
				}
				console.log(err);
				isSigningIn = false;
				return;
			}
			isSigningIn = false;
			$state.go('circles');
		});
	};
});