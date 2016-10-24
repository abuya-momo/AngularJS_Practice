angular
	.module('contactsListCtrl', ['contactsListService'])
	.controller('contactGroup', function($scope, $rootScope, showCustomerList) {
		$rootScope.ifcontactGroupShow = true;

		$scope.groupList = [{
			contactGroupId: 0,
			groupName: '朋友',
			groupProfile: '朋友备注',
			selected: false
		},{
			contactGroupId: 1,
			groupName: '同学',
			groupProfile: '同学备注',
			selected: false
		},{
			contactGroupId: 2,
			groupName: '亲友',
			groupProfile: '亲友备注',
			selected: false
		},{
			contactGroupId: 3,
			groupName: '同事',
			groupProfile: '同事备注',
			selected: false
		},{
			contactGroupId: 4,
			groupName: '客户',
			groupProfile: '客户备注',
			selected: false
		},{
			contactGroupId: 5,
			groupName: '老师',
			groupProfile: '老师备注',
			selected: false
		}];

		//edit
		$scope.edit = function(id) {
			for (var i = $scope.groupList.length - 1; i >= 0; i--) {
				if($scope.groupList[i].contactGroupId == id) {
					$scope.$broadcast('editMessage', $scope.groupList[i], id);
				}
			}
		}
		$scope.$on('saveEdittedGroup', function(event, edittedMessage, id) {
			for (var i = $scope.groupList.length - 1; i >= 0; i--) {
				if($scope.groupList[i].contactGroupId == id) {
					$scope.groupList[id] = edittedMessage;
				}
			}
		});

		//add
		$scope.add = function() {
			$scope.$broadcast('addNewGroup');
		}
		$scope.$on('saveNewGroup', function(event, addedMessage) {
			$scope.groupList.push(addedMessage);
		});

		$scope.delete = function() {
			for (var i = $scope.groupList.length - 1; i >= 0; i--) {
				if($scope.groupList[i].selected == true) {
					$scope.groupList.splice(i, 1);
				}
			}
		}
		$scope.showCustomerList1 = function(id) {
			$rootScope.contactGroupId = id;
			showCustomerList();
		}
		
	})
	.controller('newGroup', function($scope, $rootScope, showNewGroup, showContactGroup) {
		$rootScope.ifNewGroupShow = false;
		$scope.title = "添加";
		$scope.maxGroupId = 10;
		$scope.nowGroupId = null;
		$scope.$on('editMessage', function(event, editMessage, id) {
			showNewGroup($scope);
			$scope.title = "修改";
			$scope.groupName = editMessage.groupName;
			$scope.groupProfile = editMessage.groupProfile;
			$scope.nowGroupId = id;
		});
		$scope.$on('addNewGroup', function(event) {
			showNewGroup($scope);
			$scope.title = "添加";
			$scope.id = null;
			$scope.maxGroupId = $scope.maxGroupId + 1;
		});
		$scope.saveNewGroup = function() {
			if($scope.title === "添加") {
				var addedMessage = {
					contactGroupId: $scope.maxGroupId,
					groupName: $scope.groupName,
					groupProfile: $scope.groupProfile,
					selected: false
				}
				$scope.$emit('saveNewGroup', addedMessage);
			}
			else {
				var edittedMessage = {
					contactGroupId: $scope.nowGroupId,
					groupName: $scope.groupName,
					groupProfile: $scope.groupProfile,
					selected: false
				}
				$scope.$emit('saveEdittedGroup', edittedMessage, $scope.nowGroupId);
			}
			showContactGroup();
		}
		$scope.notSaveNewGroup = function() {
			showContactGroup();
		}
	})
	.controller('customerList', function($scope, $rootScope, showContactGroup, showNewUser) {
		$rootScope.ifCustomerListShow = false;

		$rootScope.customerList = [{
			id: 0,
			contactGroupId: 0,
			userName: '雷之宇',
			email: 'gark@263.net',
			phone: 82781921,
			postNum: 100085,
			addr: "北京上地信息产业基地开拓路1号302室",
			selected: false
		},{
			id: 1,
			contactGroupId: 1,
			userName: '朱冰',
			email: 'icer53@263.net',
			phone: 82781921,
			postNum: 100085,
			addr: "北京上地信息产业基地开拓路1号302室",
			selected: false
		},{
			id: 2,
			contactGroupId: 2,
			userName: '徐敏',
			email: 'xumin@china.com',
			phone: 82781921,
			postNum: 100085,
			addr: "北京上地信息产业基地开拓路1号302室",
			selected: false
		}];


		//edit
		$scope.edit = function(id) {
			$scope.$broadcast('editUserMessage', id);
		}
		$scope.$on('saveEdittedUser', function(event, edittedMessage, id) {
			for (var i = $rootScope.customerList.length - 1; i >= 0; i--) {
				if($rootScope.customerList[i].id == id) {
					$rootScope.customerList[i] = edittedMessage;
				}
			}
		});

		//add
		$scope.add = function() {
			$scope.$broadcast('addNewUser');
		}
		$scope.$on('saveNewUser', function(event, addedMessage) {
			$rootScope.customerList.push(addedMessage);
		});

		$scope.delete = function() {
			for (var i = $rootScope.oneGroupUserList.length - 1; i >= 0; i--) {
				if($rootScope.oneGroupUserList[i].selected == true) {
					var deleteId = $rootScope.oneGroupUserList[i].id;
					$rootScope.oneGroupUserList.splice(i, 1);
					for (var j = $rootScope.customerList.length - 1; j>= 0; j--) {
						if($rootScope.customerList[j].id == deleteId) {
							$rootScope.customerList.splice(j, 1);
						}
					}
				}
			}
		}

		$scope.backToContactGroup = function() {
			showContactGroup();
		}

		$scope.showNewUser = function(id) {
			showNewUser(id);
		}
	})
	.controller('newUser', function($scope, $rootScope, showNewUser, showCustomerList) {
		$rootScope.ifNewUserShow = false;
		$scope.title = "添加";
		$scope.maxId = 10;
		$scope.nowId = null;
		$scope.$on('editUserMessage', function(event, id) {
			showNewUser();
			$scope.title = "修改";
			for (var i = $rootScope.customerList.length - 1; i >= 0; i--) {
				if($rootScope.customerList[i].id == id) {
					$scope.userName = $rootScope.customerList[i].userName;
					$scope.userEmail = $rootScope.customerList[i].email;
					$scope.phone = $rootScope.customerList[i].phone;
					$scope.postNum = $rootScope.customerList[i].postNum;
					$scope.addr = $rootScope.customerList[i].addr;
					$scope.nowId = id;
				}
			}
		});
		$scope.$on('addNewUser', function(event) {
			showNewUser();
			$scope.title = "添加";
			$scope.nowId = $scope.maxId;
			$scope.maxId = $scope.maxId + 1;

			$scope.userName = "";
			$scope.userEmail = "";
			$scope.phone = "";
			$scope.postNum = "";
			$scope.addr = "";
		});
		$scope.saveNewUser = function() {
			if($scope.title === "添加") {
				var addedMessage = {
					id: $scope.nowId,
					contactGroupId: $rootScope.contactGroupId,
					userName: $scope.userName,
					email: $scope.userEmail,
					phone: $scope.phone,
					postNum: $scope.postNum,
					addr: $scope.addr,
					selected: false
				}
				$rootScope.customerList.push(addedMessage);
			}
			else {
				var edittedMessage = {
					id: $scope.nowId,
					contactGroupId: $rootScope.contactGroupId,
					userName: $scope.userName,
					email: $scope.userEmail,
					phone: $scope.phone,
					postNum: $scope.postNum,
					addr: $scope.addr,
					selected: false
				}
				$scope.$emit('saveEdittedUser', edittedMessage, $scope.nowId);
			}
			showCustomerList();
		}
		$scope.notSaveNewUser = function() {
			showCustomerList();
		}
	})
