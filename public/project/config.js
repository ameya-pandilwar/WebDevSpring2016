/**
 * Created by ameyapandilwar on 3/1/16.
 */

(function () {
    "use strict";
    angular
        .module("ProjectApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/poc", {
                templateUrl: "views/home/home.view.html",
                controller: "HomeController"
            })
            .when("/home", {
                templateUrl: "landing.html"
            })
            .when("/proposal", {
                templateUrl: "proposal.html"
            })
            .when("/mockups", {
                templateUrl: "mockups.html"
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html"
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
}());