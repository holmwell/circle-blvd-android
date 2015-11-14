angular.module('circle-blvd.controllers')
.controller('ListCtrl', function ($scope, $stateParams, Session, CircleBlvdClient) {
	
	var listId = $stateParams.listId;
	if (!listId) {
		// TODO: No list specified
		console.log("No list ID specified in URL");
		return;
	}

	CircleBlvdClient.getList(listId, function (err, result) {
		if (err) {
			// TODO: Fail
			console.log(err);
			return;
		}
		
		var taskTable = result.taskTable;
		// Save task data to session
		Session.setActiveList(taskTable);

		var list = CircleBlvdClient.buildList(result.firstTask, result.taskTable);
		$scope.list = list;
	});
});