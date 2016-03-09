/**
 * Created by ameyapandilwar on 3/5/16.
 */

(function () {
    "use strict";
    angular
        .module("ProjectApp")
        .factory("AppointmentService", AppointmentService);

    function AppointmentService($rootScope) {
        var model = {
            users: [
                {
                    "_id": 123, "firstName": "Alice", "lastName": "Wonderland",
                    "username": "alice", "password": "alice", "roles": ["student"]
                },
                {
                    "_id": 234, "firstName": "Bob", "lastName": "Hope",
                    "username": "bob", "password": "bob", "roles": ["admin"]
                },
                {
                    "_id": 345, "firstName": "Charlie", "lastName": "Brown",
                    "username": "charlie", "password": "charlie", "roles": ["faculty"]
                },
                {
                    "_id": 456, "firstName": "Dan", "lastName": "Craig",
                    "username": "dan", "password": "dan", "roles": ["faculty", "admin"]
                },
                {
                    "_id": 567, "firstName": "Edward", "lastName": "Norton",
                    "username": "ed", "password": "ed", "roles": ["student"]
                }
            ],
            createUser: createUser,
            deleteUserById: deleteUserById,
            findAllUsers: findAllUsers,
            findUserByCredentials: findUserByCredentials,
            findUserByUsername: findUserByUsername,
            getCurrentUser: getCurrentUser,
            setCurrentUser: setCurrentUser,
            updateUser: updateUser
        };
        return model;

        function findUserByCredentials(username, password, callback) {
            var user = null;
            for (var u in model.users) {
                if (model.users[u].username === username && model.users[u].password === password) {
                    user = model.users[u];
                    break;
                }
            }
            callback(user);
        }

        function findAllUsers(callback) {
            callback(model.users);
        }
    }
}());