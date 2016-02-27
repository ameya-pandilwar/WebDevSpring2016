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

            var userId = user._id;

            UserService.updateUser(userId, user, function(callback) {
                UserService.setCurrentUser(callback);
                $scope.message = "User updated successfully";
                $location.url('/profile');
            });
        }
    }
})();