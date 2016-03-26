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
                controller: "HomeController"
            })
            .when("/admin", {
                templateUrl: "client/views/admin/admin.view.html",
                controller: "AdminController"
            })
            .when("/login", {
                templateUrl: "client/views/users/login.view.html",
                controller: "LoginController"
            })
            .when("/register", {
                templateUrl: "client/views/users/register.view.html",
                controller: "RegisterController"
            })
            .when("/profile", {
                templateUrl: "client/views/users/profile.view.html",
                controller: "ProfileController"
            })
            .when("/module", {
                templateUrl: "client/views/modules/module.view.html",
                controller: "ModuleController"
            })
            .when("/module/:id", {
                templateUrl: "client/views/modules/detail.view.html",
                controller: "ModuleController"
            })
            .when("/course", {
                templateUrl: "client/views/courses/brochure.view.html",
                controller: "BrochureController"
            })
            .when("/course/:id", {
                templateUrl: "client/views/courses/course.view.html",
                controller: "CourseController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
}());