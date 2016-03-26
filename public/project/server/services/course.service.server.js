/**
 * Created by ameyapandilwar on 3/25/16.
 */

module.exports = function(app, courseModel) {
    app.get("/api/catalog/course", viewCourses);
    app.post("/api/catalog/course", createCourse);
    app.delete("/api/catalog/course/:id", deleteCourseById);
    //app.get("/api/catalog/course", findAllCourses);
    //app.get("/api/catalog/course", findAllCoursesForUser);
    //app.get("/api/catalog/course", findCourseByUserId);
    //app.get("/api/catalog/course", findCourseByTitle);
    //app.get("/api/catalog/course", getCurrentCourse);
    //app.get("/api/catalog/course", setCurrentCourse);
    app.put("/api/catalog/course/:id", updateCourseById);
    app.put("/api/catalog/course/:id/module", addModuleToCourse);
    app.put("/api/catalog/course/:courseId/module/:id", deleteModuleFromCourse);
    app.get("/api/catalog/course/:courseId/module/:moduleId", searchModuleInCourse);

    function addModuleToCourse(req, res) {
        var courseId = req.params.id;
        res.json(courseModel.addModuleToCourse(courseId));
    }

    function deleteModuleFromCourse(req, res) {
        var courseId = req.params.courseId;
        var id = req.params.id;
        res.json(courseModel.deleteModuleFromCourse(courseId, id));
    }

    function searchModuleInCourse(req, res) {
        var courseId = req.params.courseId;
        var moduleId = req.params.moduleId;
        res.json(courseModel.searchModuleInCourse(courseId, moduleId));
    }

    function viewCourses(req, res) {
        res.json(courseModel.viewCourses());
    }

    function findCourseByTitle(title) {
        for (var u in model.courses) {
            if (model.courses[u].title === title) {
                return model.courses[u];
            }
        }
        return null;
    }

    function findCourseByUserId(courseId, callback) {
        var course = null;
        for (var u in model.courses) {
            if (model.courses[u].title === courseId) {
                course = model.courses[u];
                break;
            }
        }
        callback(course);
    }

    function findAllCourses() {
        return $http.get("/api/catalog/course");
    }

    function findAllCoursesForUser(courseIds, callback) {
        var courses = []
        for (var u in model.courses) {
            for (var id in courseIds) {
                if (model.courses[u].number === courseIds[id]) {
                    courses.push(model.courses[u]);
                }
            }
        }
        callback(courses);
    }

    function createCourse(req, res) {
        var course = req.body;
        res.json(courseModel.createCourse(course));
    }

    function deleteCourseById(req, res) {
        var courseId = req.params.id;
        res.send(courseModel.deleteCourseById(courseId));
    }

    function updateCourseById(req, res) {
        var id = req.params.id;
        var course = req.body;
        var updatedCourse = courseModel.updateCourseById(id, course);
        res.json(updatedCourse);
    }
};
