/**
 * Created by ameyapandilwar on 2/21/16.
 */

(function(){
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

        function findUserByCredentials(username, password, callback){
            for(user in users){
                if(users[user].username==username && users[user].password==password){
                    var success = users[user];
                    break;
                }
            }
            callback(success);
        }

        function findAllUsers(callback){}

        function createUser(user, callback){

        }

        function deleteUserById(userId, callback){}

        function updateUser(userId, user, callback){}

    }

})();