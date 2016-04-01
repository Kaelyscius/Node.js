angular.module("productApp", ["ngressource"])
        .constant("baseUrl", "http://localhost:8081/restproducts")
        .controller("defaultCtrl", function ($scope, $http, $ressource, baseUrl) {
            $scope.displayMode = "list";
            $scope.currentProduct = null;

        })