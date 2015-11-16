angular.module('circle-blvd.services')

.factory('Session', function (LocalStorage) {
	var localList = LocalStorage.getObject('circle-blvd-active-list');
	var localMember = LocalStorage.getObject('circle-blvd-member');

	return {
		saveMember: function (member) {
			localMember = member;
			LocalStorage.setObject('circle-blvd-member', member);
		},
		saveActiveList: function (list) {
			localList = list;
			LocalStorage.setObject('circle-blvd-active-list', list);
		},
		member: localMember,
		activeList: localList
	}
});