/**
 * Created by ameyapandilwar on 3/1/16.
 */

(function () {
    "use strict";
    angular
        .module("CatalogApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location, UserService) {
        var vm = this;
        vm.getTabClass = getTabClass;

        $scope.showDropdownOnPage = showDropdownOnPage;
        $scope.showDropdown = showDropdown;
        $scope.logout = logout;

        function getTabClass(currentCourse) {
            if (currentCourse) {
                var pattern = '/course/' + currentCourse.number;
                if ($location.url().indexOf(pattern) > -1) {
                    return 'active dropdown';
                }
            } else {
                return 'dropdown';
            }
        }

        function showDropdownOnPage() {
            return ($location.url() === '/home' || $location.url() === '/course');
        }

        function showDropdown() {
            return ($location.url() === '/home');
        }

        function logout() {
            UserService.logout().then(function() {
                UserService.setCurrentUser(null);
                $location.url('/home');
            });
        }
    }
}());