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
            if (!user.email) {
                vm.message = "Please provide an email";
                return;
            }
            //UserService.findUserByUsername(user.username).then(function(response) {
            //    user = response.data;
                //if (user != null) {
                //    vm.message = "User already exists";
                //    return;
                //} else {
                    UserService.createUser(vm.user).then(function(response) {
                        UserService.setCurrentUser(response.data);
                        $location.url('/profile');
                    });
                //}
            //});
        }
    }
}());