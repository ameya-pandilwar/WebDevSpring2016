/**
 * Created by ameyapandilwar on 3/11/16.
 */

(function () {
    "use strict";
    angular
        .module("CatalogApp")
        .controller("CourseController", CourseController)

    function CourseController($scope, $rootScope, $location, CourseService) {
        var selectedCourse = CourseService.getCurrentCourse();
        $scope.course = selectedCourse;

        $scope.addCourse = addCourse;
        $scope.deleteCourse = deleteCourse;
        $scope.selectCourse = selectCourse;
        $scope.updateCourse = updateCourse;
        $scope.viewCourses = viewCourses;
        $scope.viewModule = viewModule;

        function viewCourses() {
            CourseService.findAllCourses().then(function(response) {
                $scope.courses = response.data;
            });
        }

        function viewModule(index) {
            var selectedModule = selectedCourse.modules[index];
            $rootScope.selectedModule = selectedModule;
            $location.url("/module/" + selectedModule);
        }

        function selectCourse(index) {
            selectedCourse = $scope.courses[index];
            $scope.number = selectedCourse.number;
            $scope.timing = selectedCourse.timing;
            $scope.location = selectedCourse.location;
        }

        function addCourse(){
            var newCourse = {"number": $scope.number, "timing": $scope.timing, "location": $scope.location};
            CourseService.createCourse(newCourse).then(function(response) {
                $scope.courses = response.data;
                $scope.number = "";
                $scope.timing = "";
                $scope.location = "";
            });
        }

        function updateCourse() {
            if (selectedCourse) {
                selectedCourse.number = $scope.number;
                selectedCourse.timing = $scope.timing;
                selectedCourse.location = $scope.location;
                CourseService.updateCourseById(selectedCourse._id, selectedCourse).then(function(response) {
                    $scope.number = "";
                    $scope.timing = "";
                    $scope.location = "";
                });
            }
        }

        function deleteCourse(index) {
            CourseService.deleteCourseById($scope.courses[index]._id).then(function(response) {
                $scope.courses = response.data;
            });
        }

    }
}());
