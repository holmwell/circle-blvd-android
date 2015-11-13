angular.module('circle-blvd.services')

.factory('CircleBlvdClient', function ($http, Session) {

	var server = "http://localhost:3000";

	var handleError = function (handler, callback) {
		return function (data, status) {
			// TODO: Check that this makese sense
			// We might want to do something like this instead:
			//   var err = new Error(data);
			callback(data);
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
				.error(handleError)
			})
			.error(handleError, callback);
		}
	}
});