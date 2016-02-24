/**
 * Created by ameyapandilwar on 2/17/16.
 */

(function() {
    angular
        .module("FormBuilderApp")
        .controller("FormsController", FormsController)

    function FormsController($scope, $rootScope, $location, FormService) {
        var userId = $rootScope.user._id;

        FormService.findAllFormsForUser(userId, function(callback) {
            $scope.forms = callback;
        });
    }
})();