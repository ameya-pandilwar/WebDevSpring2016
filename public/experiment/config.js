/**
 * Created by ameyapandilwar on 3/1/16.
 */

(function () {
    "use strict";
    angular
        .module("ExperimentApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                controller: "HomeController"
            })
            .when("/github", {
                templateUrl: "views/github.html"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
}());