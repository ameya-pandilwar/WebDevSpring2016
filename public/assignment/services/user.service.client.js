/**
 * Created by ameyapandilwar on 2/21/16.
 */

(function() {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService() {
        var users = []

        users = [
                    {	"_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                        "username":"alice",  "password":"alice",   "roles": ["student"]		},
                    {	"_id":234, "firstName":"Bob",              "lastName":"Hope",
                        "username":"bob",    "password":"bob",     "roles": ["admin"]		},
                    {	"_id":345, "firstName":"Charlie",          "lastName":"Brown",
                        "username":"charlie","password":"charlie", "roles": ["faculty"]		},
                    {	"_id":456, "firstName":"Dan",              "lastName":"Craig",
                        "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
                    {	"_id":567, "firstName":"Edward",           "lastName":"Norton",
                        "username":"ed",     "password":"ed",      "roles": ["student"]		}
                ];

        var service = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };

        return service;

        function findUserByCredentials(username, password, callback) {
            var user = null;
            for (var u in users) {
                if (users[u].username == username && users[u].password == password) {
                    user = users[u];
                    break;
                }
            }
            callback(user);
        }

        function findAllUsers(callback) {
            callback(users);
        }

        function createUser(user, callback) {
            console.log(user);
            var newUser = {
                _id: (new Date).getTime(),
                firstName: '',
                lastName: '',
                username: user.username,
                password: user.password,
                roles: '',
                email: user.email
            };
            users.push(newUser);
            callback(users);
        }

        function deleteUserById(userId, callback) {
            for (var u in users) {
                if (users[u]._id == userId) {
                    users.splice(u, 1);
                    break;
                }
            }
            callback(users);
        }

        function updateUser(userId, user, callback) {
            for (var u in users) {
                if (users[u]._id == userId) {
                    var updatedUser = {
                        _id: userId,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        username: user.username,
                        password: user.password,
                        roles: user.roles,
                        email: user.email
                    };
                    users[u] = updatedUser;
                    callback(users[u]);
                }
            }
        }
    }
})();