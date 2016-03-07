/**
 * Created by ameyapandilwar on 2/21/16.
 */

(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($rootScope) {
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

        function setCurrentUser (user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser () {
            return $rootScope.currentUser;
        }

        function findUserByUsername (username) {
            for (var u in model.users) {
                if (model.users[u].username === username) {
                    return model.users[u];
                }
            }
            return null;
        }

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

        function createUser(user, callback) {
            var newUser = {
                _id: new Date().getTime(),
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                password: user.password,
                roles: user.roles,
                email: user.email
            };
            model.users.push(newUser);
            callback(newUser);
        }

        function deleteUserById(userId, callback) {
            for (var u in model.users) {
                if (model.users[u]._id == userId) {
                    model.users.splice(u, 1);
                    break;
                }
            }
            callback(model.users);
        }

        function updateUser(userId, user, callback) {
            for (var u in model.users) {
                if (model.users[u]._id == userId) {
                    var updatedUser = {
                        _id: userId,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        username: user.username,
                        password: user.password,
                        roles: user.roles,
                        email: user.email
                    };
                    model.users[u] = updatedUser;
                    callback(updatedUser);
                }
            }
        }
    }
}());