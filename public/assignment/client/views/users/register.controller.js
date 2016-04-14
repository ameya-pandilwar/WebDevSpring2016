/**
 * Created by ameyapandilwar on 2/17/16.
 */

(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController)

    function RegisterController(UserService, $location) {
        var vm = this;
        vm.message = null;
        vm.register = register;

        function register(user){
            vm.message = null;
            if (user == null) {
                vm.message = "Please fill in the required fields";
                return;
            }
            if (!user.username) {
                vm.message = "Please provide a username";
                return;
            }
            if (!user.password || !user.verifypassword) {
                vm.message = "Please provide a password";
                return;
            }
            if (user.password != user.verifypassword) {
                vm.message = "Passwords must match";
                return;
            }
            if (!user.emails) {
                vm.message = "Please provide an email";
                return;
            }

            UserService.register(vm.user).then(function(response) {
                console.log(response);
                if (response.data != null) {
                    UserService.setCurrentUser(response.data);
                    $location.path('/profile');
                } else {
                    vm.message = "Username already exists";
                }
            });
        }
    }
}());