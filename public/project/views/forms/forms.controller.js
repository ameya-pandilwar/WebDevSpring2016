/**
 * Created by ameyapandilwar on 2/17/16.
 */

(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FormsController", FormsController)

    function FormsController($scope, FormService, UserService) {
        var selectedForm = null;

        $scope.addForm = addForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;
        $scope.updateForm = updateForm;

        var userId = UserService.getCurrentUser().userId;

        FormService.findAllFormsForUser(userId, function(callback) {
            $scope.forms = callback;
        });

        function selectForm(index) {
            $scope.formName = $scope.forms[index].title;
            selectedForm = $scope.forms[index];
        }

        function addForm(){
            var newForm = {"title": $scope.formName};
            FormService.createFormForUser(userId, newForm, function(callback) {
                $scope.forms.push(callback);
                $scope.formName = "";
            });
        }

        function updateForm() {
            if(selectedForm) {
                selectedForm.title = $scope.formName;
                FormService.updateFormById(selectedForm._id, selectedForm, function(callback) {
                    $scope.formName = "";
                });
            }
        }

        function deleteForm(index) {
            FormService.deleteFormById($scope.forms[index]._id, function(callback) {
                $scope.forms.splice(index, 1);
            });
        }
    }
}());