/**
 * Created by ameyapandilwar on 2/17/16.
 */

(function() {
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

            var userId = $scope.user._id;
            var updatedUser = {
                username : $scope.username,
                password : $scope.password,
                firstName: $scope.firstName,
                lastName: $scope.lastName,
                email: $scope.email
            };

            UserService.updateUser(userId, updatedUser, function(callback) {
                $rootScope.user = callback;
                $location.url('/profile');
            });
        }
    }
})();