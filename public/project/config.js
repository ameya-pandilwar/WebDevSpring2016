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
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController"
            })
            .otherwise({
                redirectTo: "/poc"
            });
    }
}());