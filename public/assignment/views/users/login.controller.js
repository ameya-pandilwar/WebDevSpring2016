/**
 * Created by ameyapandilwar on 2/17/16.
 */

(function() {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController)

    function LoginController($scope, $rootScope, $location, UserService) {
        $scope.login = login;

        function login() {
            var username = $scope.username;
            var password = $scope.password;

            UserService.findUserByCredentials(username, password, function(callback) {
                UserService.setCurrentUser(callback);
                $location.url('/profile');
            });
        }
    }
})();