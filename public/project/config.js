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
            .otherwise({
                redirectTo: "/home"
            });
    }
}());