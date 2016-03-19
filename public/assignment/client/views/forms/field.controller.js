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

            var op =field.options;

            if(op){
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

            FieldService.updateField(formId, vm.fieldEdit._id, vm.fieldEdit).then(initialize());
            vm.label = null;
            vm.placeholder = null;
            vm.options = null;
        }

        function deleteField(fieldId) {
            FieldService.deleteFieldFromForm(formId, fieldId).then(initialize());
        }

        function addField(fieldType){
            var field;
            switch(fieldType) {
                case "TEXT":
                    field = {"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};
                    break;
                case "TEXTAREA":
                    field = {"_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};
                    break;
                case "DATE":
                    field = {"_id": null, "label": "New Date Field", "type": "DATE"};
                    break;
                case "OPTIONS":
                    field = {
                        "_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                            {"label": "Option 1", "value": "OPTION_1"},
                            {"label": "Option 2", "value": "OPTION_2"},
                            {"label": "Option 3", "value": "OPTION_3"}
                        ]
                    };
                    break;

                case "CHECKBOXES":
                    field = {
                        "_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                            {"label": "Option A", "value": "OPTION_A"},
                            {"label": "Option B", "value": "OPTION_B"},
                            {"label": "Option C", "value": "OPTION_C"}
                        ]
                    };
                    break;
                case "RADIOS":
                    field = {
                        "_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                            {"label": "Option X", "value": "OPTION_X"},
                            {"label": "Option Y", "value": "OPTION_Y"},
                            {"label": "Option Z", "value": "OPTION_Z"}
                        ]
                    };
                    break;
            }
            FieldService.createFieldForForm(formId, field).then(initialize());
        }

        function repeatField(field){
            FieldService.createFieldForForm(formId, field).then(initialize());
        }
    }

})();