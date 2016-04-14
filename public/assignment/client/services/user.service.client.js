/**
 * Created by ameyapandilwar on 2/21/16.
 */

(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $rootScope) {
        var model = {
            deleteUserById: deleteUserById,
            findAllUsers: findAllUsers,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            getCurrentUser: getCurrentUser,
            setCurrentUser: setCurrentUser,
            updateUser: updateUser,
            login: login,
            logout:logout,
            register: register
        };
        return model;

        function register(user) {
            return $http.post('/api/assignment/register', user);
        }

        function login(user) {
            console.log(user);
            return $http.post('/api/assignment/login', user);
        }

        function logout() {
            return $http.post('/api/assignment/logout', user);
        }

        function deleteUserById(userId) {
            return $http.delete('/api/assignment/user/' + userId);
        }

        function findAllUsers() {
            return $http.get('/api/assignment/user');
        }

        function findUserById(id) {
            return $http.get('/api/assignment/user/' + id);
        }

        function findUserByUsername(username) {
            return $http.get('/api/assignment/user?username=' + username);
        }

        function getCurrentUser() {
            return $http.get('/api/assignment/loggedin');
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function updateUser(userId, user) {
            return $http.put('/api/assignment/user/' + userId, user);
        }
    }
}());