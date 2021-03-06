/**
 * Created by ameyapandilwar on 3/20/16.
 */

(function () {
    "use strict";
    angular
        .module("CatalogApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, UserService, CourseService) {
        var vm = this;
        vm.error = null;
        vm.message = null;

        var user = null;

        vm.update = update;

        CourseService.setCurrentCourse(null);

        function init() {
            UserService.getCurrentUser().then(function (response) {
                user = response.data;
                vm.currentUser = user;
                vm.currentUser.password = "";
            });
        }
        init();

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
            if (!user.email) {
                vm.error = "Please provide an email";
                return;
            }

            UserService.updateUserById(user._id, user).then(function(response) {
                if (response.data) {
                    vm.message = "User updated successfully";
                    $location.path('/profile');
                }
            });
        }
    }
}());