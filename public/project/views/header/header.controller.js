/**
 * Created by ameyapandilwar on 3/1/16.
 */

(function () {
    "use strict";
    angular
        .module("ProjectApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location) {
        $scope.showDropdown = showDropdown;

        function showDropdown() {
            return ($location.url() === '/home' || $location.url() === '/proposal' || $location.url() === '/mockups');
        }
    }
}());