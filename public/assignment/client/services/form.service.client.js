/**
 * Created by ameyapandilwar on 2/22/16.
 */

(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($http) {
        var service = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
            findFormById: findFormById
        };

        return service;

        function createFormForUser(userId, form) {
            return $http.post("/api/assignment/user/" + userId + "/form", form);
        }

        function findAllFormsForUser(userId) {
            return $http.get("/api/assignment/user/" + userId + "/form");
        }

        function deleteFormById(formId) {
            return $http.delete("/api/assignment/form/" + formId);
        }

        function updateFormById(formId, newForm) {
            return $http.put("/api/assignment/form/" + formId, newForm);
        }

        function findFormById(formId) {
            return $http.get("/api/assignment/form/" + formId);
        }
    }
}());