angular.module('circle-blvd.services')

.factory('Session', function (LocalStorage) {
	return {
		setMember: function (member) {
			LocalStorage.setObject('circle-blvd-member', member);
		},
		getMember: function () {
			return LocalStorage.getObject('circle-blvd-member');
		},
		setActiveList: function (list) {
			LocalStorage.setObject('circle-blvd-active-list', list);
		},
		getActiveList: function () {
			return LocalStorage.getObject('circle-blvd-active-list');
		}
	}
});