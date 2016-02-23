/**
 * Created by ameyapandilwar on 2/17/16.
 */

(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController)

    function LoginController($scope, $rootScope, $location, UserService){
        var model = this;
        $scope.login = login;

        function login(username, password){
            username = this.username;
            password = this.password;

            UserService.findUserByCredentials(username, password, function(response){
                var user = response;
                var status = false;
                if(user != null){
                    for(var i in user.roles){
                        if(user.roles[i] == "admin"){
                            status = true;
                            break;
                        }
                    }
                    $rootScope.user = user;
                    $rootScope.isAdmin = status;
                    $rootScope.user.logged = true;
                    $rootScope.user.globalusername = user.username;
                    $location.url('/profile');
                }
            });
        }
    }
})();