/**
 * Created by ameyapandilwar on 3/16/16.
 */

(function() {
    angular
        .module("FormBuilderApp")
        .factory("FieldService", fieldService);

    function fieldService($http) {
        var service = {
            createFieldForForm: createFieldForForm,
            getFieldsForForm: getFieldsForForm,
            getFieldForForm: getFieldForForm,
            deleteFieldFromForm: deleteFieldFromForm,
            updateField: updateField,
            sortField: sortField
        };

        return service;

        function createFieldForForm(formId, field) {
            return $http.post("/api/assignment/form/" + formId + "/field", field);
        }

        function getFieldsForForm(formId) {
            return $http.get("/api/assignment/form/" + formId + "/field");
        }

        function getFieldForForm(formId, fieldId) {
            return $http.get("/api/assignment/form/" + formId + "/field/" + fieldId);
        }

        function deleteFieldFromForm(formId, fieldId) {
            return $http.delete("/api/assignment/form/" + formId + "/field/" + fieldId);
        }

        function updateField(formId, fieldId, field) {
            return $http.put("/api/assignment/form/" + formId + "/field/" + fieldId, field);
        }

        function sortField(formId, startIndex, endIndex) {
            return $http.put("/api/assignment/" + formId + "/field?startIndex=" + startIndex + "&endIndex=" + endIndex);
        }
    }
})();