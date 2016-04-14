/**
 * Created by ameyapandilwar on 2/17/16.
 */

(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $location) {
        var vm = this;
        vm.error = null;
        vm.message = null;

        var user = null;

        vm.update = update;

        UserService.getCurrentUser().then(function(response) {
            user = response.data;
            vm.currentUser = user;
        });

        function update(user) {
            vm.error = null;
            vm.message = null;

            if (user == null) {
                vm.error = "Please fill in the required fields";
                return;
            }
            if (!user.password) {
                vm.error = "Please provide a password";
                return;
            }
            if (!user.firstName) {
                vm.error = "Please provide a first name";
                return;
            }
            if (!user.lastName) {
                vm.error = "Please provide a last name";
                return;
            }
            if (!user.emails) {
                vm.error = "Please provide an email";
                return;
            }

            var userId = user._id;

            UserService.updateUser(userId, user).then(function(response) {
                UserService.setCurrentUser(response.data);
                vm.message = "User updated successfully";
                $location.url('/profile');
            });
        }
    }
}());