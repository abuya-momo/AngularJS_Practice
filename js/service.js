angular
	.module('contactsListService', [])
	.factory('hideAllPart', ['$rootScope', function(rootScope) {
		return function() {
			rootScope.ifcontactGroupShow = false;
			rootScope.ifNewGroupShow = false;
			rootScope.ifNewUserShow = false;
			rootScope.ifCustomerListShow = false;
		}
	}])
	.factory('showNewGroup', ['$rootScope', 'hideAllPart', function(rootScope, hideAllPart) {
		return function(rawScope) {
			hideAllPart();
			rootScope.ifNewGroupShow = true;
			rawScope.groupName = "";
			rawScope.groupProfile = "";
		}
	}])
	.factory('showContactGroup', ['$rootScope', 'hideAllPart', function(rootScope, hideAllPart) {
		return function() {
			hideAllPart();
			rootScope.ifcontactGroupShow = true;
		}
	}])
	.factory('showNewUser', ['$rootScope', 'hideAllPart', function(rootScope, hideAllPart) {
		return function() {
			hideAllPart();
			rootScope.ifNewUserShow = true;
		}
	}])
	.factory('showCustomerList', ['$rootScope', 'hideAllPart', function(rootScope, hideAllPart) {
		return function() {
			hideAllPart();
			rootScope.oneGroupUserList = [];
			for (var i = rootScope.customerList.length - 1; i >= 0; i--) {
				if(rootScope.customerList[i].contactGroupId == rootScope.contactGroupId) {
					rootScope.oneGroupUserList.push(rootScope.customerList[i]);
				}
			}
			rootScope.ifCustomerListShow = true;
		}
	}])