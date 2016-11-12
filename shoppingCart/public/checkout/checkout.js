'use strict';

angular.module('checkout', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/checkout', {
            templateUrl: 'public/checkout/checkout.html',
            controller: 'CheckoutCtrl'
        });
    }])

    .controller('CheckoutCtrl',  function($scope, DataService) {
        console.log("myCart:",  DataService.myCart);
        $scope.checkouts = DataService.myCart.items;
        $scope.total = DataService.myCart.total;
    });