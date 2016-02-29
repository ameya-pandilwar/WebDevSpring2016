/**
 * Created by ameyapandilwar on 2/20/16.
 */

(function () {
    "use strict";
    angular
        .module("ExperimentApp")
        .controller("MainController", MainController)

    function MainController($scope, $location) {
        $scope.$location = $location;
    }
}());