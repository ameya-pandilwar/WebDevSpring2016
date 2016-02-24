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
            var user = $scope.user;

            user.firstName = $scope.firstname;
            user.lastName = $scope.lastname;
            user.email = $scope.email;

            UserService.updateUser(userId, user, function(callback) {
                $rootScope.user = callback;
                $location.url('/profile');
            });
        }
    }
})();