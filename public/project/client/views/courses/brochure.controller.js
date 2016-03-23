/**
 * Created by ameyapandilwar on 3/11/16.
 */

(function () {
    "use strict";
    angular
        .module("CatalogApp")
        .controller("BrochureController", BrochureController)

    function BrochureController($scope, $location, CourseService) {
        var selectedCourse = null;

        $scope.addCourse = addCourse;
        $scope.deleteCourse = deleteCourse;
        $scope.selectCourse = selectCourse;
        $scope.updateCourse = updateCourse;
        $scope.viewCourse = viewCourse;

        CourseService.findAllCourses().then(function(response) {
            $scope.courses = response.data;
        });

        function selectCourse(index) {
            selectedCourse = $scope.courses[index];
            $scope.number = selectedCourse.number;
            $scope.timing = selectedCourse.timing;
            $scope.location = selectedCourse.location;
        }

        function addCourse() {
            var newCourse = {"number": $scope.number, "timing": $scope.timing, "location": $scope.location};
            CourseService.createCourse(newCourse, function(callback) {
                $scope.courses = callback;
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
                CourseService.updateCourseById(selectedCourse._id, selectedCourse, function(callback) {
                    $scope.number = "";
                    $scope.timing = "";
                    $scope.location = "";
                });
            }
        }

        function deleteCourse(index) {
            CourseService.deleteCourseById($scope.courses[index]._id, function(callback) {
                $scope.courses = callback;
            });
        }

        function viewCourse(index) {
            selectedCourse = $scope.courses[index];
            CourseService.setCurrentCourse(selectedCourse);
            $location.url('/course/'+selectedCourse.number);
        }
    }
}());
