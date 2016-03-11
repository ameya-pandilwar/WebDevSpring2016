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
                templateUrl: "client/views/home/home.view.html",
                controller: "HomeController"
            })
            .when("/home", {
                templateUrl: "client/landing.html"
            })
            .when("/proposal", {
                templateUrl: "client/proposal.html"
            })
            .when("/mockups", {
                templateUrl: "client/mockups.html"
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
            .when("/syllabus", {
                templateUrl: "client/views/courses/syllabus.view.html",
                controller: "SyllabusController"
            })
            .when("/schedule", {
                templateUrl: "client/views/courses/schedule.view.html",
                controller: "ScheduleController"
            })
            .when("/course", {
                templateUrl: "client/views/courses/course.view.html",
                controller: "CourseController"
            })
            .when("/appointment", {
                templateUrl: "client/views/appointments/appointment.view.html",
                controller: "AppointmentController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
}());