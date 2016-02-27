/**
 * Created by ameyapandilwar on 2/17/16.
 */

(function() {
    angular
        .module("FormBuilderApp")
        .controller("FormsController", FormsController)

    function FormsController($scope, $rootScope, FormService) {
        var selectedForm = null;

        $scope.addForm = addForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;
        $scope.updateForm = updateForm;

        var userId = $rootScope.user._id;

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
})();