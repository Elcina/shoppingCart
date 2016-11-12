var shoppingCart = angular.module('shoppingCart', [
    'ngRoute',
    'cart',
    'checkout'
])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({
            redirectTo: '/cart'
        });
    }]);

shoppingCart.factory("DataService", function () {

    var myCart = new MyCart();
    return {
        myCart: myCart
    };
});