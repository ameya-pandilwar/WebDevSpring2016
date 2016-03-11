/**
 * Created by ameyapandilwar on 2/28/16.
 */

(function () {
    "use strict";
    angular
        .module("ProjectApp")
        .controller("AdminController", AdminController)

    function AdminController($scope, UserService) {
        var selectedUser = null;

        $scope.addUser = addUser;
        $scope.deleteUser = deleteUser;
        $scope.selectUser = selectUser;
        $scope.updateUser = updateUser;

        UserService.findAllUsers(function(callback) {
            $scope.users = callback;
        });

        function selectUser(index) {
            selectedUser = $scope.users[index];
            $scope.username = selectedUser.username;
        }

        function addUser(){
            var newUser = {"title": $scope.username};
            UserService.createUser(userId, newUser, function(callback) {
                $scope.users.push(callback);
                $scope.userName = "";
            });
        }

        function updateUser() {
            if(selectedUser) {
                selectedUser.title = $scope.userName;
                UserService.updateUserById(selectedUser._id, selectedUser, function(callback) {
                    $scope.userName = "";
                });
            }
        }

        function deleteUser(index) {
            UserService.deleteUserById($scope.users[index]._id, function(callback) {
                $scope.users.splice(index, 1);
            });
        }
    }
}());