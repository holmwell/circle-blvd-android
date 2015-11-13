angular.module('starter.controllers')
.controller('SignInCtrl', function ($scope, $http, $state, Session) {
	
	$scope.member = {};
	var server = "http://localhost:3000";

	// TODO: Move to a library, share with client (website)
	var signIn = function (email, password, callback) {

        var xsrf = "";
        xsrf += encodeURIComponent("email") + "=" + encodeURIComponent(email) + "&";
		xsrf += encodeURIComponent("password") + "=" + encodeURIComponent(password);

        var request = {
            method: 'POST',
            url: server + '/auth/signin',
            data: xsrf,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        };      

        $http(request)
        .success(function (user, status) {
            callback(null, user);
        })
        .error(function (data, status) {
            var err = new Error(data)
            err.status = status;
            callback(err);
        });
    };

	$scope.signIn = function (email, password) {
		$scope.message = "";

		signIn(email, password, function (err, member) {
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

			Session.member = member;
			$state.go('circles')
		});
	};
});