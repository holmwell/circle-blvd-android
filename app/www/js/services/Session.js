angular.module('circle-blvd.services')

.factory('Session', function (LocalStorage) {
	var localList = LocalStorage.getObject('circle-blvd-active-list');

	return {
		setMember: function (member) {
			LocalStorage.setObject('circle-blvd-member', member);
		},
		getMember: function () {
			return LocalStorage.getObject('circle-blvd-member');
		},
		setActiveList: function (list) {
			localList = list;
			LocalStorage.setObject('circle-blvd-active-list', list);
		},
		activeList: localList
	}
});