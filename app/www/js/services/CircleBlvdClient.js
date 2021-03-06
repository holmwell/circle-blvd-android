angular.module('circle-blvd.services')

.factory('CircleBlvdClient', function ($http, Session) {

	var server = "http://localhost:3000";
	// server = "http://10.0.1.38:3000";
	server = "https://circleblvd.org";

	var handleError = function (callback) {
		return function (data, status) {
			console.log("Error: " + data);
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

		buildList: function (firstTaskId, taskTable) {
			var list = [];
			// Basic 'build list' algorithm
			var firstTask = taskTable[firstTaskId];
			list.push(firstTask);
			var story = firstTask;
			var nextStory = taskTable[story.nextId];

			// TODO: This will break if there is a loop in the list.
			while (nextStory) {
				list.push(nextStory);
				story = nextStory;
				nextStory = taskTable[story.nextId];
			}
			return list;
		},

		setMember: function (email, password, callback) {
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
			.success(function (member, status) {
				// Save the user in the Session
				//
				// TODO: Should we modify the Session like this? This 
				// design seems 'ok' but something about it doesn't feel right.
				//
				Session.saveMember(member);
				callback(null, member);
			})
			.error(handleError(callback));
		},

		getMember: function () {
			return Session.getMember();
		},

		saveTask: function (task, callback) {
			$http.put(server + '/data/story/', task)
			.success(function (savedTask) {
				if (callback) {
					callback(null, savedTask);
				}
			})
			.error(handleError(callback));
		}
	}
});