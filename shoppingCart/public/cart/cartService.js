var app = angular.module('sampleApplicationApp')
    .factory('abcModel', function () {
        var factory = {};
        var model = {};

        factory.setModel = function(key, value) {
            model[key] = value;
        };
        factory.getModel = function(key) {
            return model[key];
        };
        return factory;
    });