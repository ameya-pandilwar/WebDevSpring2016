/**
 * Created by ameyapandilwar on 2/17/16.
 */

(function() {
    "use strict";

    angular.module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($routeParams, FieldService, FormService) {
        var vm = this;

        var formId;
        vm.currentField = null;
        vm.fieldEdit = null;
        vm.commitEdit = commitEdit;
        vm.editField = editField;
        vm.deleteField = deleteField;
        vm.addField = addField;
        vm.repeatField = repeatField;

        if($routeParams.formId) {
            formId = $routeParams.formId;
        }

        function initialize() {
            FieldService.getFieldsForForm(formId).then(function(response) {
                    vm.fields = response.data;
                });

            FormService.findFormById(formId).then(function(response) {
                    vm.form = response.data;
                });
        }

        initialize();

        function editField(field){
            vm.fieldEdit = field;
            vm.label = field.label;

            var op = field.options;

            if (op) {
                var optionList = [];
                for(var u in op){
                    optionList.push(op[u].label+ ":" +op[u].value+ "\n")
                }
                vm.fieldEdit.options = optionList;
            }

            if(field.placeholder){
                vm.placeholder = field.placeholder;
            }
        }

        function commitEdit(){
            if(vm.fieldEdit.options){
                var opt = vm.options.split("\n");
                var optionList =[];

                for(var u in opt){
                    var val = opt[u].split(":");
                    optionList.push({"label":val[0],"value":val[1]});
                }
                vm.fieldEdit.options = optionList;
            }

            if(vm.fieldEdit.placeholder) {
                vm.fieldEdit.placeholder = vm.placeholder
            }

            vm.fieldEdit.label = vm.label;

            FieldService.updateField(formId, vm.fieldEdit._id, vm.fieldEdit).then(function(response){initialize()});
            vm.label = null;
            vm.placeholder = null;
            vm.options = null;
        }

        function deleteField(fieldId) {
            FieldService.deleteFieldFromForm(formId, fieldId).then(function(response){initialize()});
        }

        function addField(fieldType){
            var field;
            switch(fieldType) {
                case "TEXT":
                    field = {"label": "New Text Field", "type": "TEXT", "placeholder": "New Text Field"};
                    break;
                case "TEXTAREA":
                    field = {"label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Textarea Field"};
                    break;
                case "EMAIL":
                    field = {"label": "New Email Field", "type": "EMAIL", "placeholder": "New Email Field"};
                    break;
                case "PASSWORD":
                    field = {"label": "New Password Field", "type": "PASSWORD", "placeholder": "New Passowrd Field"};
                    break;
                case "OPTIONS":
                    field = {
                        "label": "New Dropdown", "type": "OPTIONS", "options": [
                            {"label": "Option 1", "value": "OPTION_1"},
                            {"label": "Option 2", "value": "OPTION_2"},
                            {"label": "Option 3", "value": "OPTION_3"}
                        ]
                    };
                    break;
                case "DATE":
                    field = {"label": "New Date Field", "type": "DATE"};
                    break;
                case "RADIOS":
                    field = {
                        "label": "New Radio Buttons", "type": "RADIOS", "options": [
                            {"label": "Option X", "value": "OPTION_X"},
                            {"label": "Option Y", "value": "OPTION_Y"},
                            {"label": "Option Z", "value": "OPTION_Z"}
                        ]
                    };
                    break;
                case "CHECKBOXES":
                    field = {
                        "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                            {"label": "Option A", "value": "OPTION_A"},
                            {"label": "Option B", "value": "OPTION_B"},
                            {"label": "Option C", "value": "OPTION_C"}
                        ]
                    };
                    break;
            }
            FieldService.createFieldForForm(formId, field).then(function(response){initialize()});
        }

        function repeatField(field){
            FieldService.createFieldForForm(formId, field).then(function(response){initialize()});
        }
    }

})();