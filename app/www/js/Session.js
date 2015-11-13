angular.module('starter.services')

// LocalStorage service suggestion from Ionic
// http://learn.ionicframework.com/formulas/localstorage/
.factory('LocalStorage', ['$window', function ($window) {
  return {
    set: function (key, value) {
      $window.localStorage[key] = value;
    },
    get: function (key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function (key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function (key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}])

.factory('Session', function (LocalStorage) {
	return {
		setMember: function (member) {
			LocalStorage.setObject('circle-blvd-member', member);
		},
		getMember: function () {
			return LocalStorage.getObject('circle-blvd-member');
		}
	}
});