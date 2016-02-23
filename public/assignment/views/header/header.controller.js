/**
 * Created by ameyapandilwar on 2/17/16.
 */

(function(){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $rootScope, $location){
        var model = this;
        $scope.logout = logout;

        function logout(){
            this.user = null;
            $rootScope.user = null;
            $location.url('/home');
        }
    }
})();