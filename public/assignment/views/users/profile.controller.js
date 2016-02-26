/**
 * Created by ameyapandilwar on 2/17/16.
 */

(function() {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, UserService, $location, $rootScope) {
        $scope.update = update;

        function update() {
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