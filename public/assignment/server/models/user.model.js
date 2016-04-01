/**
 * Created by ameyapandilwar on 3/7/16.
 */

var q = require('q');
var uuid = require('node-uuid');

module.exports = function (db, mongoose) {

    var UserSchema = require("./user.schema.server.js")(mongoose);

    var UserModel = mongoose.model('UserModel', UserSchema);

    var api = {
        createUser: createUser,
        deleteUserById: deleteUserById,
        findUserByCredentials: findUserByCredentials,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findAllUsers: findAllUsers,
        updateUser: updateUser
    };

    return api;

    function findUserByCredentials(credentials) {
        var deferred = q.defer();

        UserModel.findOne({username: credentials.username, password: credentials.password},

            function(err, res) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(res);
                }
            });

        return deferred.promise;
    }

    function findUserById(userId) {
        return UserModel.findById(userId);
    }

    function findUserByUsername(username) {
        var deferred = q.defer();

        UserModel.findOne({username: username},
            function (err, res) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(res);
                }
            });

        return deferred.promise;
    }

    function findAllUsers() {
        var deferred = q.defer();

        UserModel.find(
            function(err, res) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(res);
                }
            });

        return deferred.promise;
    }

    function createUser(user) {
        var newUser = {
            "_id": uuid.v1(),
            "username": user.username,
            "password": user.password,
            "firstName": user.firstName,
            "lastName": user.lastName,
            "roles": user.roles,
            "email" : user.email
        };

        var deferred = q.defer();

        UserModel.create(newUser, function (err, res) {

            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(res);
            }

        });

        return deferred.promise;
    }

    function deleteUserById(userId) {
        var deferred = q.defer();

        UserModel.remove({_id: userId},
            function(err, res) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(findAllUsers());
                }
            });

        return deferred.promise;
    }

    function updateUser(userId, user) {
        var deferred = q.defer();

        UserModel.update (
            {_id: userId},
            {$set: newUser},
            function (err, res) {
                if (err) {
                    deferred.reject(err);
                } else {
                    UserModel.findById(userId,
                        function (err, res) {
                            if (err) {
                                deferred.reject(err);
                            } else {
                                deferred.resolve(res);
                            }
                        });
                }
            });

        return deferred.promise;
    }
};