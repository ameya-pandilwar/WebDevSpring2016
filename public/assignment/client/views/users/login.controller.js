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
            UserService.login({username: vm.username, password: vm.password}).then(function(response) {
                console.log(response);
                if (response) {
                    UserService.setCurrentUser(response.data);
                    $location.url('/profile');
                }
            },
            function(err) {
                console.log(err);
                vm.error = "Username/Password is incorrect or doesn't exist";
            });
        }
    }
}());