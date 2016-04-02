/**
 * Created by ameyapandilwar on 2/17/16.
 */

(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController)

    function FormController(FormService, UserService) {
        var vm = this;
        var selectedForm = null;

        vm.addForm = addForm;
        vm.deleteForm = deleteForm;
        vm.selectForm = selectForm;
        vm.updateForm = updateForm;

        var userId = UserService.getCurrentUser()._id;

        FormService.findAllFormsForUser(userId).then(function(response) {
            vm.forms = response.data;
        });

        function selectForm(index) {
            vm.formName = vm.forms[index].title;
            selectedForm = vm.forms[index];
        }

        function addForm(){
            var newForm = {"title": vm.formName};
            FormService.createFormForUser(userId, newForm).then(function(response) {
                FormService.findAllFormsForUser(userId).then(function(response) {
                    vm.forms = response.data;
                });
                vm.formName = "";
            });
        }

        function updateForm() {
            if(selectedForm) {
                selectedForm.title = vm.formName;
                FormService.updateFormById(selectedForm._id, selectedForm).then(function(response) {
                    selectedForm = response.data;
                    FormService.findAllFormsForUser(userId).then(function(response) {
                        vm.forms = response.data;
                    })
                    vm.formName = "";
                    selectedForm = null;
                });
            }
        }

        function deleteForm(index) {
            FormService.deleteFormById(vm.forms[index]._id).then(function(response) {
                vm.forms.splice(index, 1);
            });
        }
    }
}());