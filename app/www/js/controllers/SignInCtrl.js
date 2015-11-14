angular.module('circle-blvd.controllers')
.controller('SignInCtrl', function ($scope, $state, CircleBlvdClient) {
	
	$scope.member = {};

	var memberInfoUpdated = function () {
		$scope.message = undefined;
	};

	$scope.$watch('member.email', memberInfoUpdated);
	$scope.$watch('member.password', memberInfoUpdated);

	$scope.signIn = function (email, password) {
		$scope.message = "";

		if (!email) {
			$scope.message = "Please enter your email address to continue."
			return;
		}

		if (!password) {
			$scope.message = "Please enter your password to continue."
			return;
		}

		CircleBlvdClient.setMember(email, password, function (err, member) {
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
			$state.go('circles')
		});
	};
});