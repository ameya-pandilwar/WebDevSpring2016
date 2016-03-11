/**
 * Created by ameyapandilwar on 3/10/16.
 */

(function () {
    "use strict";
    angular
        .module("ProjectApp")
        .factory("CourseService", CourseService);

    function CourseService($rootScope) {
        var model = {
            courses: [
                {
                    "_id": 123, "number": "CS5600", "title": "Web Development", "timing": "6 - 9 PM | W",
                    "location": "101 Chrome Hall", "userId": 123
                },
                {
                    "_id": 234, "number": "CS8674", "title": "Master's Project", "timing": "3 - 6 PM | M",
                    "location": "1 Hacker Way", "userId": 123
                },
                {
                    "_id": 345, "number": "CS6000", "title": "Database Management", "timing": "6 - 9 PM | T, F",
                    "location": "1 Infinite Loop", "userId": 234
                }
            ],
            createCourse: createCourse,
            deleteCourseById: deleteCourseById,
            findAllCourses: findAllCourses,
            findCourseByUserId: findCourseByUserId,
            findCourseByTitle: findCourseByTitle,
            updateCourseById: updateCourseById
        };
        return model;

        function findCourseByTitle (title) {
            for (var u in model.courses) {
                if (model.courses[u].coursename === title) {
                    return model.courses[u];
                }
            }
            return null;
        }

        function findCourseByUserId(courseId, callback) {
            var course = null;
            for (var u in model.courses) {
                if (model.courses[u].coursename === courseId) {
                    course = model.courses[u];
                    break;
                }
            }
            callback(course);
        }

        function findAllCourses(callback) {
            callback(model.courses);
        }

        function createCourse(course, callback) {
            var newCourse = {
                _id: new Date().getTime(),
                number: course.number,
                title: course.title,
                timing: course.timing,
                location: course.location,
                userId: course.userId
            };
            model.courses.push(newCourse);
            callback(model.courses);
        }

        function deleteCourseById(courseId, callback) {
            for (var u in model.courses) {
                if (model.courses[u]._id == courseId) {
                    model.courses.splice(u, 1);
                    break;
                }
            }
            callback(model.courses);
        }

        function updateCourseById(courseId, course, callback) {
            for (var u in model.courses) {
                if (model.courses[u]._id == courseId) {
                    var updatedCourse = {
                        _id: courseId,
                        number: course.number,
                        title: course.title,
                        timing: course.timing,
                        location: course.location,
                        userId: course.userId
                    };
                    model.courses[u] = updatedCourse;
                    callback(updatedCourse);
                }
            }
        }
    }
}());