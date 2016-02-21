/**
 * Created by ameyapandilwar on 2/20/16.
 */

(function(){
    angular
        .module("FormBuilderApp")
        .controller("MainController", MainController)

    function MainController($scope, $location){
        $scope.$location = $location;
    }
})();