/**
 * Created by ameyapandilwar on 3/25/16.
 */

module.exports = function(app, courseModel) {
    app.get("/api/ds/catalog/course", viewCourses);
    app.post("/api/ds/catalog/course", createCourse);
    app.delete("/api/ds/catalog/course/:id", deleteCourseById);
    app.put("/api/ds/catalog/course/:id", updateCourseById);

    app.post("/api/ds/catalog/course/:id/module", addModuleToCourse);
    app.get("/api/ds/catalog/course/:id/module", findModulesForCourse);
    app.put("/api/ds/catalog/course/:courseId/module/:moduleId", deleteModuleFromCourse);
    app.put("/api/ds/catalog/course/:courseId/module", updateModulesInCourse);

    app.put("/api/ds/catalog/course/:courseId/register/:username", registerUserToCourse);
    app.put("/api/ds/catalog/course/:courseId/deregister/:username", deregisterUserFromCourse);

    app.get("/api/ds/catalog/course/:number", getCourseByNumber);
    app.get("/api/ds/catalog/course/:courseNumber/module/:moduleNumber", getModuleByNumber);

    app.post("/api/ds/catalog/course/:courseId/module/:moduleId/assignment", addAssignment);
    app.delete("/api/ds/catalog/course/:courseId/module/:moduleId/assignment/:assignmentId", removeAssignment);
    app.put("/api/ds/catalog/course/:courseId/module/:moduleId/assignment/:assignmentId", updateAssignment);

    app.post("/api/ds/catalog/course/:courseId/module/:moduleId/lecture", addLecture);
    app.delete("/api/ds/catalog/course/:courseId/module/:moduleId/lecture/:lectureId", removeLecture);
    app.put("/api/ds/catalog/course/:courseId/module/:moduleId/lecture/:lectureId", updateLecture);

    app.post("/api/ds/catalog/course/:courseId/module/:moduleId/lecture/:lectureId/le", addLearningElement);
    app.delete("/api/ds/catalog/course/:courseId/module/:moduleId/lecture/:lectureId/le/:leId", removeLearningElement);
    app.put("/api/ds/catalog/course/:courseId/module/:moduleId/lecture/:lectureId/le/:leId", updateLearningElement);

    app.post("/api/ds/catalog/course/:courseId/module/:moduleId/example", addExample);
    app.delete("/api/ds/catalog/course/:courseId/module/:moduleId/example/:exampleId", removeExample);
    app.put("/api/ds/catalog/course/:courseId/module/:moduleId/example/:exampleId", updateExample);

    app.post("/api/ds/catalog/course/:courseId/module/:moduleId/example/:exampleId/demo", addDemo);
    app.delete("/api/ds/catalog/course/:courseId/module/:moduleId/example/:exampleId/demo/:demoId", removeDemo);
    app.put("/api/ds/catalog/course/:courseId/module/:moduleId/example/:exampleId/demo/:demoId", updateDemo);

    app.post("/api/ds/catalog/course/:courseId/module/:moduleId/example/:exampleId/demo/:demoId/dependency", addDependency);
    app.delete("/api/ds/catalog/course/:courseId/module/:moduleId/example/:exampleId/demo/:demoId/dependency/:dependencyId", removeDependency);
    app.put("/api/ds/catalog/course/:courseId/module/:moduleId/example/:exampleId/demo/:demoId/dependency/:dependencyId", updateDependency);

    function addModuleToCourse(req, res) {
        courseModel.addModuleToCourse(req.params.id, req.body).then(function(modules) {
            res.json(modules);
        });
    }

    function getCourseByNumber(req, res) {
        courseModel.getCourseByNumber(req.params.number).then(function(course){
            res.json(course);
            res.json(course);
        });
    }

    function findModulesForCourse(req, res) {
        courseModel.findModulesForCourse(req.params.id).then(function(modules) {
            res.json(modules);
        });
    }

    function deleteModuleFromCourse(req, res) {
        courseModel.deleteModuleFromCourse(req.params.courseId, req.params.moduleId).then(function(modules){
            res.json(modules);
        });
    }

    function searchModuleInCourse(req, res) {
        courseModel.searchModuleInCourse(req.params.courseId, req.params.moduleId).then(function(module){
            res.json(module);
        });
    }

    function getModuleByNumber(req, res) {
        courseModel.getModuleByNumber(req.params.courseNumber, req.params.moduleNumber).then(function(module) {
            res.json(module);
        }, function(err) {
            res.status(400).send(err);
        });
    }

    function updateModulesInCourse(req, res) {
        courseModel.updateModulesInCourse(req.params.courseId, req.body).then(function(modules) {
            res.json(modules);
        });
    }

    function viewCourses(req, res) {
        courseModel.viewCourses().then(function(courses) {
            res.json(courses);
        }, function(err) {
            res.status(400).send(err);
        });
    }

    function createCourse(req, res) {
        courseModel.createCourse(req.body).then(function(course) {
            res.json(course);
        }, function(err) {
            res.status(400).send(err);
        });
    }

    function deleteCourseById(req, res) {
        res.json(courseModel.deleteCourseById(req.params.id));
    }

    function updateCourseById(req, res) {
        res.json(courseModel.updateCourseById(req.params.id, req.body));
    }

    function registerUserToCourse(req, res) {
        courseModel.registerUserToCourse(req.params.courseId, req.params.username).then(function(course) {
            res.json(course);
        }, function(err) {
            res.status(400).send(err);
        });
    }

    function deregisterUserFromCourse(req, res) {
        courseModel.deregisterUserFromCourse(req.params.courseId, req.params.username).then(function(course) {
            res.json(course);
        }, function(err) {
            res.status(400).send(err);
        });
    }

    function addAssignment(req, res) {
        courseModel.addAssignment(req.params.courseId, req.params.moduleId, req.body).then(function(assignments) {
            res.json(assignments);
        });
    }

    function removeAssignment(req, res) {
        courseModel.removeAssignment(req.params.courseId, req.params.moduleId, req.params.assignmentId).then(function(assignments) {
            res.json(assignments);
        });
    }

    function updateAssignment(req, res) {
        courseModel.updateAssignment(req.params.courseId, req.params.moduleId, req.params.assignmentId, req.body).then(function(course) {
            res.json(course);
        });
    }

    function addExample(req, res) {
        courseModel.addExample(req.params.courseId, req.params.moduleId, req.body).then(function(examples) {
            res.json(examples);
        });
    }

    function removeExample(req, res) {
        courseModel.removeExample(req.params.courseId, req.params.moduleId, req.params.exampleId).then(function(examples) {
            res.json(examples);
        });
    }

    function updateExample(req, res){
        courseModel.updateExample(req.params.courseId, req.params.moduleId, req.params.exampleId, req.body).then(function(examples) {
            res.json(examples);
        });
    }

    function addDemo(req, res) {
        courseModel.addDemo(req.params.courseId, req.params.moduleId, req.params.exampleId, req.body).then(function(demos) {
            res.json(demos);
        });
    }

    function removeDemo(req, res) {
        courseModel.removeDemo(req.params.courseId, req.params.moduleId, req.params.exampleId, req.params.demoId).then(function(demos) {
            res.json(demos);
        });
    }

    function updateDemo(req, res) {
        courseModel.updateDemo(req.params.courseId, req.params.moduleId, req.params.exampleId, req.params.demoId, req.body).then(function(demos) {
            res.json(demos);
        });
    }

    function addDependency(req, res) {
        courseModel.addDependency(req.params.courseId, req.params.moduleId, req.params.exampleId, req.params.demoId, req.body).then(function(dependencies) {
            res.json(dependencies);
        });
    }

    function removeDependency(req, res) {
        courseModel.removeDependency(req.params.courseId, req.params.moduleId, req.params.exampleId, req.params.demoId, req.params.dependencyId).then(function(dependencies) {
            res.json(dependencies);
        });
    }

    function updateDependency(req, res){
        courseModel.updateDependency(req.params.courseId, req.params.moduleId, req.params.exampleId, req.params.demoId, req.params.dependencyId, req.body).then(function(dependencies) {
            res.json(dependencies);
        });
    }

    function addLecture(req, res) {
        courseModel.addLecture(req.params.courseId, req.params.moduleId, req.body).then(function(lectures) {
            res.json(lectures);
        });
    }

    function removeLecture(req, res){
        courseModel.removeLecture(req.params.courseId, req.params.moduleId, req.params.lectureId).then(function(lectures) {
            res.json(lectures);
        });
    }

    function updateLecture(req, res) {
        courseModel.updateLecture(req.params.courseId, req.params.moduleId, req.params.lectureId, req.body).then(function(lectures) {
            res.json(lectures);
        });
    }

    function addLearningElement(req, res) {
        courseModel.addLearningElement(req.params.courseId, req.params.moduleId, req.params.lectureId, req.body).then(function(learningElements) {
            res.json(learningElements);
        });
    }

    function removeLearningElement(req, res) {
        courseModel.removeLearningElement(req.params.courseId, req.params.moduleId, req.params.lectureId, req.params.leId).then(function(learningElements) {
            res.json(learningElements);
        });
    }

    function updateLearningElement(req, res){
        courseModel.updateLearningElement(req.params.courseId, req.params.moduleId, req.params.lectureId, req.params.leId, req.body).then(function(learningElements) {
            res.json(learningElements);
        });
    }
};