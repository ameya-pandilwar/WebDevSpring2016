/**
 * Created by ameyapandilwar on 2/17/16.
 */

(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController)

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login() {
            if (!vm.username && !vm.password) {
                return;
            }
            UserService.findUserByCredentials(vm.username, vm.password).then(function(response) {
                UserService.setCurrentUser(response.data);
                $location.url('/profile');
            });
        }
    }
}());