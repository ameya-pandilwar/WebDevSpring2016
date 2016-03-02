/**
 * Created by ameyapandilwar on 3/1/16.
 */

(function () {
    "use strict";
    angular
        .module("ProjectApp")
        .controller("MainController", MainController)

    function MainController($scope, $location) {
        $scope.$location = $location;
    }
}());