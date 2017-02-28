var App = angular.module('app', ['ngMaterial','angular.viacep','ngResource','ui.router','ngMask']);
App.config(function ($stateProvider, $urlRouterProvider) {

	$stateProvider

	.state('customer_list', {
		url: '/customer',
		templateUrl: 'public/customer_list.html',
		controller: 'customers_list_ctrl',
		cache: false
	})
	.state('customer_view', {
		url: '/customer/:id',
		templateUrl: 'public/customer_view.html',
		controller: 'customers_view_ctrl',
		cache: false
	})
	$urlRouterProvider.otherwise('/customer');
});

App.factory('Customer', function($resource) {
	var methods = {
		query: { method: 'GET', isArray: false },
		get: { method: 'GET' },
		update: { method: 'PUT'	},
		save:   { method: 'POST'},
		delete: { method: 'DELETE'}
	};
	return $resource('private/customer.php/:id', { id: '@id' }, methods);
});

App.controller('customers_list_ctrl', function($scope, $rootScope, $state,Customer) {

	function success(data) {
		$scope.customers = data.customers;
	};

	$scope.getCustomers= function () {
		$scope.promise = Customer.get($scope.query,success).$promise;
	};

	$scope.getCustomers();

	$scope.viewCustomer= function (customertId = 0) {
		$state.go('customer_view',{id : customertId});
	}

	
});

App.controller('customers_view_ctrl', function($scope, $rootScope, $state,$stateParams, viaCEP, Customer) {

	$scope.error = '';
	$scope.loading = false;
	$scope.customertId = $stateParams.id
	
	if($scope.customertId == 0){
		$scope.header_text = 'Cadastrar Cliente';
		$scope.customer = new Customer();
	}else{
		$scope.header_text = 'Editar Cliente';
		Customer.get({id: $scope.customertId}, function(data) {
			$scope.customer = data;
		});
	}
	$scope.getCep = function () {
		viaCEP.get($scope.customer.cep).then(function(response){
			$scope.address = response
			$scope.customer.adress = $scope.address.logradouro;
			$scope.customer.district = $scope.address.bairro;
		});
	};

	$scope.delete = function() {
		Customer.delete({id: $scope.customertId}, $scope.listGo);
	};

	$scope.save = function() {
		$scope.loading = true;
		if($scope.customertId == 0)
			$scope.customer.$save($scope.listGo);
		else
			$scope.customer.$update({ id: $scope.customertId },$scope.listGo);
		$scope.loading = false;
	};

	$scope.listGo = function() {
		$state.go('customer_list')
	};
});