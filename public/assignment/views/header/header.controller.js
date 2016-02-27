/**
 * Created by ameyapandilwar on 2/17/16.
 */

(function() {
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location, UserService) {
        $scope.logout = logout;

        function logout(){
            UserService.setCurrentUser(null);
            $location.url('/home');
        }
    }
})();