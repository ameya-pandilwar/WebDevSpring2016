/**
 * Created by ameyapandilwar on 3/10/16.
 */

(function () {
    "use strict";
    angular
        .module("ProjectApp")
        .factory("CourseService", CourseService);

    function CourseService($rootScope) {
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
            createCourse: createCourse,
            deleteCourseById: deleteCourseById,
            findAllCourses: findAllCourses,
            findCourseByUserId: findCourseByUserId,
            findCourseByTitle: findCourseByTitle,
            updateCourse: updateCourse
        };
        return model;

        function findCourseByTitle (title) {
            for (var u in model.users) {
                if (model.users[u].username === title) {
                    return model.users[u];
                }
            }
            return null;
        }

        function findCourseByUserId(userId, callback) {
            var user = null;
            for (var u in model.users) {
                if (model.users[u].username === userId) {
                    user = model.users[u];
                    break;
                }
            }
            callback(user);
        }

        function findAllCourses(callback) {
            callback(model.users);
        }

        function createCourse(user, callback) {
            var newCourse = {
                _id: new Date().getTime(),
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                password: user.password,
                roles: user.roles,
                email: user.email
            };
            model.users.push(newCourse);
            callback(newCourse);
        }

        function deleteCourseById(userId, callback) {
            for (var u in model.users) {
                if (model.users[u]._id == userId) {
                    model.users.splice(u, 1);
                    break;
                }
            }
            callback(model.users);
        }

        function updateCourse(userId, user, callback) {
            for (var u in model.users) {
                if (model.users[u]._id == userId) {
                    var updatedCourse = {
                        _id: userId,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        username: user.username,
                        password: user.password,
                        roles: user.roles,
                        email: user.email
                    };
                    model.users[u] = updatedCourse;
                    callback(updatedCourse);
                }
            }
        }
    }
}());