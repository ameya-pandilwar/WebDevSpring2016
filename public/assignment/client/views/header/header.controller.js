/**
 * Created by ameyapandilwar on 2/17/16.
 */

(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, UserService) {
        var vm = this;
        vm.logout = logout;

        function logout() {
            UserService.logout().then(function() {
                UserService.setCurrentUser(null);
                $location.url('/home');
            });
        }
    }
}());