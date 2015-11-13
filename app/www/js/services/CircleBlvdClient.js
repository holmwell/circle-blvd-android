angular.module('circle-blvd.services')

.factory('CircleBlvdClient', function ($http, Session) {

	var server = "http://localhost:3000";

	var handleError = function (callback) {
		return function (data, status) {
			var err = new Error(data);
			err.status = status;
			callback(err);
		};
	};

	return {
		getList: function (listId, callback) {
			var result = {
				taskTable: undefined,
				firstTask: undefined
			};

			$http.get(server + '/data/' + listId + '/stories')
			.success(function (storyList) {
				$http.get(server + '/data/' + listId + '/first-story')
				.success(function (firstStory) {
			
					result.taskTable = storyList;
					result.firstTask = firstStory;

					callback(null, result);
				})
				.error(handleError(callback))
			})
			.error(handleError(callback));
		},

		signIn: function (email, password, callback) {
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
			.error(handleError(callback));
		}
	}
});