/**
 * Created by ameyapandilwar on 2/17/16.
 */

(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", ['UserService', RegisterController])

    function RegisterController($scope, UserService, $location, $rootScope){
        var model = this;
        model.register = register;

        function register(newUser){
            console.log(newUser);

            var newUser = {
                username : model.username,
                password : model.password,
                email: model.email
            };

            UserService.createUser(newUser).then(function(response){
                newUser = response;
                $rootScope.user.username = newUser.username;
                $rootScope.user.password = newUser.password;
                $rootScope.user.email = newUser.email;
                $rootScope.user.userid = newUser.userid;
                $location.url('/profile');
                $rootScope.user.logged = true;
                $rootScope.user.globalusername = newUser.username;
            });

        }

    }
})();