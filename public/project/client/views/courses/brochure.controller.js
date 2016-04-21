/**
 * Created by ameyapandilwar on 3/11/16.
 */

(function () {
    "use strict";
    angular
        .module("CatalogApp")
        .controller("BrochureController", BrochureController)

    function BrochureController($scope, $location, ngDialog, CourseService) {
        var vm = this;
        var selectedCourse = null;

        vm.viewCourse = viewCourse;
        vm.newCourse = newCourse;
        vm.removeCourse = removeCourse;
        vm.modifyCourse = modifyCourse;
        vm.searchCourse = searchCourse;
        vm.clearSearch = clearSearch;
        vm.isVisible = isVisible;

        function init() {
            CourseService.findAllCourses().then(function (response) {
                vm.courses = response.data;
            });
        }
        init();

        function viewCourse(index) {
            selectedCourse = vm.courses[index];
            CourseService.setCurrentCourse(selectedCourse);
            $location.url('/course/' + selectedCourse.number);
        }

        function newCourse() {
            vm.element = "course";
            showAddDialog(function(model){
                var course = {
                    "number": model.number,
                    "title": model.title,
                    "modules": []
                };

                CourseService.createCourse(course).then(function(response) {
                    CourseService.findAllCourses().then(function(response) {
                        vm.courses = response.data;
                    });
                });
            });
            vm.number = "";
            vm.title = "";
        }

        function removeCourse(index) {
            vm.title = vm.courses[index].title;
            vm.element = "course";
            showRemoveDialog(function(){
                CourseService.deleteCourseById(vm.courses[index]._id).then(function(response) {
                    CourseService.findAllCourses().then(function(response) {
                        vm.courses = response.data;
                    });
                });
            });
        }

        function modifyCourse(index) {
            vm.element = "course";
            vm.course = vm.courses[index];
            showUpdateDialog(function(model){
                selectedCourse = vm.course;
                selectedCourse.number = model.number;
                selectedCourse.title = model.title;

                CourseService.updateCourseById(selectedCourse._id, selectedCourse).then(function(response) {
                    CourseService.findAllCourses().then(function(response) {
                        vm.courses = response.data;
                    });
                });
            });
            vm.number = "";
            vm.title = "";
        }

        function searchCourse(name) {
            CourseService.searchCourse(name).then(function(response) {
                vm.courses = response.data;
            });
        }

        function clearSearch() {
            vm.searchText = "";
            init();
        }

        function showAddDialog(confirm, cancel){
            ngDialog.openConfirm({template: 'client/views/modules/add.html', scope: $scope}).then(confirm, cancel);
        }

        function showRemoveDialog(confirm, cancel){
            ngDialog.openConfirm({template: 'client/views/modules/delete.html', scope: $scope}).then(confirm, cancel);
        }

        function showUpdateDialog(confirm, cancel){
            ngDialog.openConfirm({template: 'client/views/modules/update.html', scope: $scope}).then(confirm, cancel);
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
