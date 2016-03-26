/**
 * Created by ameyapandilwar on 2/21/16.
 */

(function () {
    "use strict";
    angular
        .module("CatalogApp")
        .factory("UserService", UserService);

    function UserService($rootScope, $http) {
        var service = {
            createUser: createUser,
            deleteUserById: deleteUserById,
            findAllUsers: findAllUsers,
            findUserByCredentials: findUserByCredentials,
            findUserByUsername: findUserByUsername,
            getCurrentUser: getCurrentUser,
            setCurrentUser: setCurrentUser,
            updateUserById: updateUserById
        };
        return service;

        function createUser(user) {
            return $http.post('/api/catalog/user', user);
        }

        function deleteUserById(userId) {
            return $http.delete('/api/catalog/user/' + userId);
        }

        function findAllUsers() {
            return $http.get('/api/catalog/user');
        }

        function findUserByCredentials(username, password) {
            return $http.get('/api/catalog/user?username=' + username + '&password=' + password);
        }

        function findUserById(id) {
            return $http.get('/api/catalog/user/' + id);
        }

        function findUserByUsername(username) {
            return $http.get('/api/catalog/user?username=' + username);
        }

        function getCurrentUser() {
            return $rootScope.currentUser;
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function updateUserById(userId, user) {
            return $http.put('/api/catalog/user/' + userId, user);
        }
    }
}());