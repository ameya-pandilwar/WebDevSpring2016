/**
 * Created by ameyapandilwar on 2/17/16.
 */

(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, UserService, $location) {
        $scope.error = null;
        $scope.message = null;

        $scope.update = update;

        $scope.currentUser = UserService.getCurrentUser();
        if (!$scope.currentUser) {
            $location.url("/home");
        }

        function update(user) {
            $scope.error = null;
            $scope.message = null;

            if (user == null) {
                $scope.error = "Please fill in the required fields";
                return;
            }
            if (!user.password) {
                $scope.error = "Please provide a password";
                return;
            }
            if (!user.firstName) {
                $scope.error = "Please provide a first name";
                return;
            }
            if (!user.lastName) {
                $scope.error = "Please provide a last name";
                return;
            }
            if (!user.email) {
                $scope.error = "Please provide an email";
                return;
            }

            var userId = user._id;

            UserService.updateUser(userId, user).then(function(response) {
                UserService.setCurrentUser(response.data);
                $scope.message = "User updated successfully";
                $location.url('/profile');
            });
        }
    }
}());