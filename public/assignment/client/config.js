/**
 * Created by ameyapandilwar on 2/17/16.
 */

(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "client/views/home/home.view.html",
                controller: "HomeController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })
            .when("/admin", {
                templateUrl: "client/views/admin/admin.view.html",
                controller: "AdminController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkAdmin
                }
            })
            .when("/forms", {
                templateUrl: "client/views/forms/form.view.html",
                controller: "FormController",
                controllerAs: "model"
            })
            .when("/fields", {
                templateUrl: "client/views/forms/field.view.html",
                controller: "FieldController",
                controllerAs: "model"
            })
            .when("/form/:formId/fields", {
                templateUrl: "client/views/forms/field.view.html",
                controller: "FieldController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "client/views/users/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/profile", {
                templateUrl: "client/views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedIn
                }
            })
            .when("/register", {
                templateUrl: "client/views/users/register.view.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }

    var checkAdmin = function($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();

        $http.get('/api/assignment/loggedin').success(function(user) {
            $rootScope.errorMessage = null;

            if (user !== '0' && user.roles.indexOf('admin') != -1) {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
        });

        return deferred.promise;
    };

    var checkLoggedIn = function($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();

        $http.get('/api/assignment/loggedin').success(function(user) {
            $rootScope.errorMessage = null;

            if (user !== '0') {
                $rootScope.currentUser = user;
                deferred.resolve();
            } else {
                $rootScope.errorMessage = 'You need to be logged in to view this.';
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };

    var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();

        $http.get('/api/assignment/loggedin').success(function(user) {
            $rootScope.errorMessage = null;
            if (user !== '0') {
                $rootScope.currentUser = user;
            }
            deferred.resolve();
        });

        return deferred.promise;
    };

}());