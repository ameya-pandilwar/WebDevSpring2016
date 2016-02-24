/**
 * Created by ameyapandilwar on 2/22/16.
 */

(function() {
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService() {
        var forms = []

        forms = [
                    {"_id": "000", "title": "Contacts", "userId": 123},
                    {"_id": "010", "title": "ToDo",     "userId": 123},
                    {"_id": "020", "title": "CDs",      "userId": 234},
                ];

        var service = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };

        return service;

        function createFormForUser(userId, form, callback){}

        function findAllFormsForUser(userId, callback) {
            var userForms = [];
            for (var f in forms) {
                if (forms[f].userId == userId) {
                    userForms.push(forms[f]);
                }
            }
            callback(userForms);
        }

        function deleteFormById(formId, callback){}

        function updateFormById(formId, newForm, callback){}

    }

})();