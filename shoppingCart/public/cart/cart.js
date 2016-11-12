'use strict';

angular.module('cart', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/cart', {
            templateUrl: 'public/cart/cart.html',
            controller: 'CartCtrl'
        });
    }])

    .controller('CartCtrl',  function ($scope, $http, DataService) {
        $http.get('/api/items')
            .success(function (data) {
                $scope.items = data;
            })
            .error(function (err) {
                console.log('Error: ' + err);
            });
        $scope.totalValue = 0;
        $scope.totalItems = {};
        $scope.myCart = DataService.myCart;

        $scope.addValue = function (name, price) {
           $scope.totalValue += price;
            DataService.myCart.total = $scope.totalValue;
            //Add item to your cart
            DataService.myCart.addItem(name, price, 1);
            console.log("$scope.myCart:", DataService.myCart.total);
        };
        $scope.removeValue = function (name, price) {
            //check if item is present in the cart
            var itemFound = DataService.myCart.removeItem(name, price, 1);
            if(itemFound) {
                $scope.totalValue = $scope.totalValue > price ? $scope.totalValue - price : 0;
                DataService.myCart.total = $scope.totalValue;
            }

            console.log("$scope.myCart:", DataService.myCart.total);
        };
    });