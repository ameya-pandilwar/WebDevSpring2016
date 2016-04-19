/**
 * Created by ameyapandilwar on 3/11/16.
 */

(function () {
    "use strict";
    angular
        .module("CatalogApp")
        .controller("CourseController", CourseController)

    function CourseController($location, CourseService, ModuleService, UserService, $routeParams, $sce) {
        var vm = this;

        vm.updateCourse = updateCourse;
        vm.viewModule = viewModule;
        vm.enrollInCourse = enrollInCourse;
        vm.disenrollFromCourse = disenrollFromCourse;
        vm.renderHtml = renderHtml;
        vm.editSyllabus = editSyllabus;
        vm.saveSyllabus = saveSyllabus;
        vm.isVisible = isVisible;

        vm.tinymceOptions = {
            plugins: 'link image',
            toolbar: 'insertfile undo redo | bold italic | alignleft aligncenter alignright | bullist numlist'
        };
        vm.isEditable = false;

        CourseService.getCourseByNumber($routeParams.courseId).then(function(response) {
            vm.course = response.data;
            CourseService.setCurrentCourse(vm.course);
        });

        function updateCourse(course) {
            CourseService.updateCourseById(course._id, course).then(function(response) {
                CourseService.getCourseByNumber(course.number).then(function(response) {
                    vm.course = response.data;
                    CourseService.setCurrentCourse(vm.course);
                    vm.message = "Course details updated successfully";
                });
            });
        }

        function viewModule(index) {
            var selectedModule = vm.course.modules[index];
            ModuleService.setCurrentModule(selectedModule);
            $location.path("/course/" + vm.course.number + "/module/" + selectedModule.number);
        }

        function enrollInCourse(user) {
            UserService.enrollUserInCourse(user._id, vm.course).then(function(response) {
                UserService.setCurrentUser(response.data);
            });

            CourseService.registerUserToCourse(user.username, vm.course._id).then(function(response) {
                vm.course = response.data;
                CourseService.setCurrentCourse(vm.course);
            });
        }

        function disenrollFromCourse(user) {
            UserService.disenrollUserFromCourse(user._id, vm.course.number).then(function(response) {
                UserService.setCurrentUser(response.data);
            });

            CourseService.deregisterUserFromCourse(user.username, vm.course._id).then(function(response) {
                vm.course = response.data;
                CourseService.setCurrentCourse(vm.course);
            });
        }

        function editSyllabus() {
            vm.isEditable = true;

        }

        function saveSyllabus() {
            vm.isEditable = false;
            CourseService.updateCourseById(vm.course._id, vm.course).then(function(response) {
                CourseService.getCourseByNumber(course.number).then(function(response) {
                    vm.course = response.data;
                    CourseService.setCurrentCourse(vm.course);
                    vm.message = "Course details updated successfully";
                });
            });
        }

        function renderHtml(text) {
            return $sce.trustAsHtml(text);
        }

        function isVisible(user) {
            if (user) {
                return (user.roles.indexOf('admin') >= 0 || user.roles.indexOf('faculty') >= 0);
            } else {
                return false;
            }
        }
    }
}());
