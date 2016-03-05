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
                templateUrl: "views/admin/admin.view.html",
                controller: "AdminController"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController"
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController"
            })
            .when("/syllabus", {
                templateUrl: "views/courses/syllabus.view.html",
                controller: "SyllabusController"
            })
            .when("/schedule", {
                templateUrl: "views/courses/schedule.view.html",
                controller: "ScheduleController"
            })
            .when("/appointment", {
                templateUrl: "views/appointments/appointment.view.html",
                controller: "AppointmentController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
}());