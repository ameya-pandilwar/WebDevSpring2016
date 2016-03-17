/**
 * Created by ameyapandilwar on 2/17/16.
 */

(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController)

    function LoginController($scope, $location, UserService) {
        $scope.login = login;

        function login() {
            var username = $scope.username;
            var password = $scope.password;

            UserService.findUserByCredentials(username, password).then(function(response) {
                UserService.setCurrentUser(response.data);
                $location.url('/profile');
            });
        }
    }
}());