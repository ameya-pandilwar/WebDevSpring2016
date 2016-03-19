/**
 * Created by ameyapandilwar on 2/17/16.
 */

(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController)

    function FieldController(FieldService, FormService, $routeParams, $rootScope) {
        var vm = this;

        var formId ="000";
        vm.currentField = null;
        vm.fieldEdit=null;
        vm.commitEdit = commitEdit;
        vm.editField = editField;
        vm.deleteField = deleteField;
        vm.addField=addField;

        var currentUser = $rootScope.currentUser;

        vm.options = [
            'Single Line Text Field',
            'Multi Line Text Field',
            'Date Field',
            'Dropdown Field',
            'Checkboxes Field',
            'Radio Buttons Field'
        ];

        if($routeParams.formId) {
            formId = $routeParams.formId;
        }

        var optionDetails =
            [
                {name: "Single Line Text Field",id:"TEXT"},
                {name: "Multi Line Text Field" ,id:"TEXTAREA"},
                {name: "Dropdown Field", id:"OPTIONS"},
                {name: "Checkbox Field", id:"CHECKBOX"},
                {name: "Radio Buttons Field", id:"RADIO"},
                {name: "Date Field", id:"DATE"}
            ];

        if(currentUser === null) {
            $location.url("/home");
        } else {
            displayFields();
        }

        function displayFields() {

            FormService.findFormById(formId).then(function(response) {
                    vm.form = response.data;
                    vm.fields = response.data.fields;
                });
        }

        function editField(field){
            vm.fieldEdit = field;
            var value = !(vm.fieldEdit.type == "TEXT" || vm.fieldEdit.type == "TEXTAREA" || vm.fieldEdit.type == "EMAIL");

            if(value){
                var optionList = [];
                var op =vm.fieldEdit.options;
                for(var u in op){
                    optionList.push(op[u].label+ ":" +op[u].id)
                }
                vm.optionText = optionList.join("\n");
            }
        }

        function commitEdit(field){
            vm.fieldEdit = field;
            var value = !(field.type == 'TEXT' || field.type == 'TEXTAREA'|| vm.fieldEdit.type == "EMAIL");

            if(value){
                var optionList =[];
                console.log("optionText" +vm.optionText);
                var op = vm.optionText;
                for(var u in op){
                    var val = op[u].split(':');
                    optionList.push({
                        label:val[0],
                        id:val[1]
                    });
                }
                vm.fieldEdit.options = optionList;
            }
            else {
                FieldService.updateField(formId, vm.fieldEdit._id, vm.fieldEdit).then(displayFields);
                vm.fieldEdit = null;
            }
        }

        function deleteField(field){
            vm.currentField = null;
            FieldService.deleteFieldFromForm(formId, field._id).then(displayFields);
        }

        function addField(fieldType){
            var field = {"label": "", "type":optionType(fieldType),"Placeholder":"","options":"null"};
            FieldService.createField(formId,field)
                .then(displayFields);
        }

        function optionType(fieldType){
            for(var u in optionDetails){
                if(optionDetails[u].name == fieldType){
                    return optionDetails[u].id;
                }
            }
        }
    }
}());