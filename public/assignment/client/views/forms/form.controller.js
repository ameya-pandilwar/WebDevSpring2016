/**
 * Created by ameyapandilwar on 2/17/16.
 */

(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController)

    function FormController($scope, FormService, UserService) {
        var selectedForm = null;

        $scope.addForm = addForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;
        $scope.updateForm = updateForm;

        var userId = UserService.getCurrentUser()._id;

        FormService.findAllFormsForUser(userId).then(function(response) {
            $scope.forms = response.data;
        });

        function selectForm(index) {
            $scope.formName = $scope.forms[index].title;
            selectedForm = $scope.forms[index];
        }

        function addForm(){
            var newForm = {"title": $scope.formName};
            FormService.createFormForUser(userId, newForm).then(function(response) {
                $scope.forms = response.data;
                $scope.formName = "";
            });
        }

        function updateForm() {
            if(selectedForm) {
                selectedForm.title = $scope.formName;
                FormService.updateFormById(selectedForm._id, selectedForm).then(function(response) {
                    selectedForm = response.data;
                    FormService.findAllFormsForUser(userId).then(function(response) {
                        $scope.forms = response.data;
                    })
                    $scope.formName = "";
                });
            }
        }

        function deleteForm(index) {
            FormService.deleteFormById($scope.forms[index]._id).then(function(response) {
                $scope.forms.splice(index, 1);
            });
        }
    }
}());