/**
 * Created by ameyapandilwar on 3/20/16.
 */

(function () {
    "use strict";
    angular
        .module("CatalogApp")
        .controller("UserController", UserController);

    function UserController($scope, $location, UserService, CourseService, ngDialog) {
        var vm = this;
        vm.error = null;
        vm.message = null;

        var user = null;

        vm.update = update;
        vm.removeCourse = removeCourse;
        vm.viewCourse = viewCourse;

        CourseService.setCurrentCourse(null);

        function init() {
            UserService.getCurrentUser().then(function (response) {
                user = response.data;
                vm.currentUser = user;
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
                UserService.setCurrentUser(user);
                vm.message = "User updated successfully";
                $location.url('/profile');
            });
        }

        function removeCourse(course) {
            vm.title = course.title;
            vm.element = "course";
            vm.keyword = "disenroll"
            showRemoveDialog(function() {
                UserService.disenrollUserFromCourse(vm.currentUser._id, course.number).then(function (response) {
                    UserService.setCurrentUser(response.data);
                    vm.currentUser = UserService.getCurrentUser();
                    vm.currentUser.courses = response.data.courses;
                });

                CourseService.deregisterUserFromCourse(vm.currentUser.username, course._id).then(function (response) {

                });
            });
        }

        function viewCourse(course) {
            $location.url('/course/' + course.number);
        }

        function showRemoveDialog(confirm, cancel){
            ngDialog.openConfirm({template: 'client/views/modules/delete.html', scope: $scope}).then(confirm, cancel);
        }
    }
}());