/**
 * Created by ameyapandilwar on 2/17/16.
 */

(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController)

    function RegisterController($scope, UserService, $location, $rootScope){
        $scope.register = register;

        function register(){

            var newUser = {
                username : $scope.username,
                password : $scope.password,
                email: $scope.email
            };

            UserService.createUser(newUser, function(callback) {
                newUser = callback;
                $rootScope.user = newUser;
                $location.url('/profile');
            });

        }

    }
})();