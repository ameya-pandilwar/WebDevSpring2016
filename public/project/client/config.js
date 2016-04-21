/**
 * Created by ameyapandilwar on 3/18/16.
 */

(function () {
    "use strict";
    angular
        .module("CatalogApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "client/views/home/home.view.html",
                controller: "HomeController",
                controllerAs: "model",
                resolve: {
                    catalogLoggedIn: checkCatalogCurrentUser
                }
            })
            .when("/admin", {
                templateUrl: "client/views/admin/admin.view.html",
                controller: "AdminController",
                controllerAs: "model",
                resolve: {
                    catalogLoggedIn: checkCatalogAdmin
                }
            })
            .when("/login", {
                templateUrl: "client/views/users/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "client/views/users/register.view.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/profile", {
                templateUrl: "client/views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    catalogLoggedIn: checkCatalogLoggedIn
                }
            })
            .when("/course", {
                templateUrl: "client/views/courses/brochure.view.html",
                controller: "BrochureController",
                controllerAs: "model",
                resolve: {
                    catalogLoggedIn: checkCatalogCurrentUser
                }
            })
            .when("/course/:courseId", {
                templateUrl: "client/views/courses/course.view.html",
                controller: "CourseController",
                controllerAs: "model",
                resolve: {
                    catalogLoggedIn: checkCatalogCurrentUser
                }
            })
            .when("/course/:courseId/edit", {
                templateUrl: "client/views/courses/course.edit.view.html",
                controller: "CourseController",
                controllerAs: "model",
                resolve: {
                    catalogLoggedIn: checkCatalogAdmin
                }
            })
            .when("/course/:courseId/module", {
                templateUrl: "client/views/modules/module.view.html",
                controller: "ModuleController",
                controllerAs: "model",
                resolve: {
                    catalogLoggedIn: checkCatalogCurrentUser
                }
            })
            .when("/course/:courseId/module/:moduleId", {
                templateUrl: "client/views/modules/detail.view.html",
                controller: "ModuleController",
                controllerAs: "model",
                resolve: {
                    catalogLoggedIn: checkCatalogCurrentUser
                }
            })
            .when("/course/:courseId/module/:moduleId/lecture", {
                templateUrl: "client/views/modules/lecture.view.html",
                controller: "ModuleController",
                controllerAs: "model",
                resolve: {
                    catalogLoggedIn: checkCatalogCurrentUser
                }
            })
            .when("/course/:courseId/module/:moduleId/lecture/:lectureId", {
                templateUrl: "client/views/modules/lecture.view.html",
                controller: "ModuleController",
                controllerAs: "model",
                resolve: {
                    catalogLoggedIn: checkCatalogCurrentUser
                }
            })
            .when("/course/:courseId/module/:moduleId/example", {
                templateUrl: "client/views/modules/example.view.html",
                controller: "ModuleController",
                controllerAs: "model",
                resolve: {
                    catalogLoggedIn: checkCatalogCurrentUser
                }
            })
            .when("/course/:courseId/module/:moduleId/example/:exampleId", {
                templateUrl: "client/views/modules/example.view.html",
                controller: "ModuleController",
                controllerAs: "model",
                resolve: {
                    catalogLoggedIn: checkCatalogCurrentUser
                }
            })
            .when("/course/:courseId/module/:moduleId/assignment", {
                templateUrl: "client/views/modules/assignment.view.html",
                controller: "ModuleController",
                controllerAs: "model",
                resolve: {
                    catalogLoggedIn: checkCatalogCurrentUser
                }
            })
            .when("/course/:courseId/module/:moduleId/assignment/:assignmentId", {
                templateUrl: "client/views/modules/assignment.view.html",
                controller: "ModuleController",
                controllerAs: "model",
                resolve: {
                    catalogLoggedIn: checkCatalogCurrentUser
                }
            })
            .when("/course/:courseId/syllabus", {
                templateUrl: "client/views/courses/syllabus.view.html",
                controller: "CourseController",
                controllerAs: "model",
                resolve: {
                    catalogLoggedIn: checkCatalogCurrentUser
                }
            })
            .when("/course/:courseId/agenda", {
                templateUrl: "client/views/courses/agenda.view.html",
                controller: "CourseController",
                controllerAs: "model",
                resolve: {
                    catalogLoggedIn: checkCatalogCurrentUser
                }
            })
            .when("/:username/course", {
                templateUrl: "client/views/users/courses.view.html",
                controller: "UserController",
                controllerAs: "model",
                resolve: {
                    catalogLoggedIn: checkCatalogLoggedIn
                }
            })
            .otherwise({
                redirectTo: "/home"
            });
    }

    var checkCatalogAdmin = function($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();

        $http.get('/api/ds/catalog/loggedin').success(function(user) {
            $rootScope.errorMessage = null;

            if (user !== '0' && user.roles.indexOf('admin') != -1) {
                $rootScope.currentUser = user;
                deferred.resolve();
            } else {
                $location.path('/home');
            }
        });

        return deferred.promise;
    };

    var checkCatalogLoggedIn = function($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();

        $http.get('/api/ds/catalog/loggedin').success(function(user) {
            $rootScope.errorMessage = null;

            if (user !== '0') {
                $rootScope.currentUser = user;
                deferred.resolve();
            } else {
                $rootScope.errorMessage = 'You need to be logged in to view this';
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };

    var checkCatalogCurrentUser = function($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();

        $http.get('/api/ds/catalog/loggedin').success(function(user) {
            $rootScope.errorMessage = null;
            if (user !== '0') {
                $rootScope.currentUser = user;
            }
            deferred.resolve();
        });

        return deferred.promise;
    };
}());