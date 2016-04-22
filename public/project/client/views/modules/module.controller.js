/**
 * Created by ameyapandilwar on 3/5/16.
 */

(function () {
    "use strict";
    angular
        .module("CatalogApp")
        .controller("ModuleController", ModuleController)
        .filter("trustUrl", trustUrl)

    function trustUrl($sce) {
        return function(url) {
            return $sce.trustAsResourceUrl(url);
        };
    }

    function ModuleController($scope, $location, ngDialog, CourseService, ModuleService, $routeParams, $sce) {
        var vm = this;

        vm.addModule = addModule;
        vm.deleteModule = deleteModule;
        vm.editModule = editModule;
        vm.selectModule = selectModule;
        vm.searchModule = searchModule;
        vm.viewModule = viewModule;

        vm.addLecture = addLecture;
        vm.deleteLecture = deleteLecture;
        vm.editLecture = editLecture;
        vm.viewLecture = viewLecture;

        vm.addExample = addExample;
        vm.deleteExample = deleteExample;
        vm.editExample = editExample;
        vm.viewExample = viewExample;

        vm.addAssignment = addAssignment;
        vm.deleteAssignment = deleteAssignment;
        vm.editAssignment = editAssignment;
        vm.viewAssignment = viewAssignment;

        vm.addLearningElement = addLearningElement;
        vm.deleteLearningElement = deleteLearningElement;
        vm.editLearningElement = editLearningElement;

        vm.addDemo = addDemo;
        vm.deleteDemo = deleteDemo;
        vm.editDemo = editDemo;

        vm.addDependency = addDependency;
        vm.deleteDependency = deleteDependency;
        vm.editDependency = editDependency;

        vm.viewOverview = viewOverview;
        vm.renderHtml = renderHtml;
        vm.isVisible = isVisible;

        vm.tinymceOptions = {
            plugins: "link image",
            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | bullist numlist'
        };

        var courseId = $routeParams.courseId;
        var moduleId = $routeParams.moduleId;

        var lectureId = $routeParams.lectureId;
        var exampleId = $routeParams.exampleId;
        var assignmentId = $routeParams.assignmentId;

        if (courseId && moduleId) {
            CourseService.getCourseByNumber(courseId).then(function(response) {
                vm.course = response.data;
                CourseService.setCurrentCourse(vm.course);

                ModuleService.getModuleByNumber(courseId, moduleId).then(function(response) {
                    ModuleService.setCurrentModule(response.data);

                    if (lectureId) {
                        vm.lecture = getLecture(response.data.lectures, lectureId);
                    } else if (exampleId) {
                        vm.example = getExample(response.data.examples, exampleId);
                        $scope.selected = vm.example ? vm.example.demos[0] : null;
                    } else if (assignmentId) {
                        vm.assignment = getAssignment(response.data.assignments, assignmentId);
                    }
                });
            });
        } else if (courseId) {
            CourseService.getCourseByNumber(courseId).then(function(response) {
                vm.course = response.data;
                CourseService.setCurrentCourse(vm.course);
            });
        }

        vm.course = CourseService.getCurrentCourse();

        vm.lecture = ModuleService.getCurrentLecture();
        vm.example = ModuleService.getCurrentExample();
        vm.assignment = ModuleService.getCurrentAssignment();

        // Module

        function selectModule(index) {
            vm.course = vm.courses[index];
            vm.number = vm.course.number;
            vm.timing = vm.course.timing;
            vm.location = vm.course.location;
        }

        function viewModule(index) {
            var selectedModule = vm.course.modules[index];
            ModuleService.setCurrentModule(selectedModule);
            $location.url("/course/" + vm.course.number + "/module/" + selectedModule.number);
        }

        function addModule() {
            var number = vm.course.modules.length > 0 ? vm.course.modules[vm.course.modules.length - 1].number + 1 : 1;
            vm.element = "module";

            vm.title = "";
            vm.description = "";

            showAddDialog(function(model) {
                var module = {
                    "number": number,
                    "title": model.title,
                    "description": model.description
                };

                CourseService.addModuleToCourse(vm.course._id, module).then(function(response) {
                    vm.course.modules = response.data;
                });
            });
        }

        function editModule(module) {
            vm.element = "module";
            vm.cModule = module;

            showUpdateDialog(function(model) {
                vm.cModule.title = model.title;
                vm.cModule.description = model.description;

                for (var m in vm.course.modules) {
                    if (vm.course.modules[m]._id === vm.cModule._id) {
                        vm.course.modules[m] = vm.cModule;
                    }
                }

                CourseService.updateModulesByCourseId(vm.course._id, vm.course.modules).then(function(response) {
                    vm.course.modules = response.data;
                });
            });
        }

        function deleteModule(module) {
            vm.title = module.title;
            vm.element = "module";
            showRemoveDialog(function() {
                CourseService.deleteModuleFromCourse(vm.course._id, module._id).then(function (response) {
                    vm.course.modules = response.data;
                });
            });
        }

        function searchModule() {
            var moduleId = vm.search;
            CourseService.searchModuleInCourse(vm.course._id, moduleId).then(function(response) {
                vm.moduleSearchResult = response.data;
            });
        }

        // Lecture

        function addLecture() {
            var currentModule = ModuleService.getCurrentModule();
            var number = currentModule.lectures.length > 0 ? currentModule.lectures[currentModule.lectures.length - 1].number + 1 : 1;

            vm.element = "lecture";

            vm.title = "";
            vm.overview = "";

            showAddDialog(function(model) {
                var lecture = {
                    "number": number,
                    "title": model.title,
                    "overview": model.overview,
                    "learningElements": []
                };

                CourseService.addLecture(vm.course._id, currentModule._id, lecture).then(function(response) {
                    currentModule.lectures = response.data;
                    viewLecture(0);
                });
            });
        }

        function deleteLecture(lecture) {
            vm.title = lecture.title;
            vm.element = "lecture";
            showRemoveDialog(function() {
                var currentModule = ModuleService.getCurrentModule();

                CourseService.removeLecture(vm.course._id, currentModule._id, lecture._id).then(function (response) {
                    currentModule.lectures = response.data;
                    viewLecture(0);
                });
            });
        }

        function editLecture(lecture) {
            var currentModule = ModuleService.getCurrentModule();
            vm.cLecture = lecture;
            vm.element = "lecture";

            showUpdateDialog(function(model) {
                vm.cLecture.title = model.title;
                vm.cLecture.overview = model.overview;

                CourseService.updateLecture(vm.course._id, currentModule._id, lecture._id, lecture).then(function(response) {
                    currentModule.lectures = response.data;
                });
            });
        }

        function viewLecture(lecture) {
            var currentModule = ModuleService.getCurrentModule();
            var lectureId = 1;

            if (currentModule.lectures.length > 0) {
                vm.lecture = lecture != 0 ? lecture : currentModule.lectures[0];
                lectureId = vm.lecture.number;
            } else {
                vm.lecture = null;
            }

            if (lecture > 1) {
                lectureId = lecture;
            }
            ModuleService.setCurrentLecture(vm.lecture);

            $location.url("/course/" + vm.course.number + "/module/" + currentModule.number + "/lecture/" + lectureId);
        }

        // Example

        function addExample() {
            var currentModule = ModuleService.getCurrentModule();
            var number = currentModule.examples.length > 0 ? currentModule.examples[currentModule.examples.length - 1].number + 1 : 1;

            vm.element = "example";
            vm.title = "";

            showAddDialog(function(model) {
                var example = {
                    "number": number,
                    "title": model.title,
                    "demos": []
                };

                CourseService.addExample(vm.course._id, currentModule._id, example).then(function(response) {
                    currentModule.examples = response.data;
                    viewExample(0);
                });
            });
        }

        function deleteExample(example) {
            vm.title = example.title;
            vm.element = "example";
            showRemoveDialog(function() {
                var currentModule = ModuleService.getCurrentModule();

                CourseService.removeExample(vm.course._id, currentModule._id, example._id).then(function (response) {
                    currentModule.examples = response.data;
                    viewExample(0);
                });
            });
        }

        function editExample(example) {
            var currentModule = ModuleService.getCurrentModule();
            vm.cExample = example;
            vm.element = "example";

            showUpdateDialog(function(model){
                vm.cExample.title = model.title;

                CourseService.updateExample(vm.course._id, currentModule._id, example._id, vm.cExample).then(function(response) {
                    currentModule.examples = response.data;
                });
            });
        }

        function viewExample(example) {
            var currentModule = ModuleService.getCurrentModule();
            var exampleId = 1;

            if (currentModule.examples.length > 0) {
                vm.example = example != 0 ? example : currentModule.examples[0];
                exampleId = vm.example.number;
            } else {
                vm.example = null;
            }

            if (example > 1) {
                exampleId = example;
            }
            ModuleService.setCurrentExample(vm.example);

            $location.url("/course/" + vm.course.number + "/module/" + currentModule.number + "/example/" + exampleId);
        }

        // Assignment

        function addAssignment() {
            var currentModule = ModuleService.getCurrentModule();
            var number = currentModule.assignments.length > 0 ? currentModule.assignments[currentModule.assignments.length - 1].number + 1 : 1;

            vm.element = "assignment";
            vm.title = "";
            vm.src = "";

            showAddDialog(function(model) {
                var assignment = {
                    "number": number,
                    "title": model.title,
                    "src": model.src
                };

                CourseService.addAssignment(vm.course._id, currentModule._id, assignment).then(function(response) {
                    currentModule.assignments = response.data;
                    viewAssignment(0);
                });
            });
        }

        function deleteAssignment(assignment) {
            vm.title = assignment.title;
            vm.element = "assignment";
            showRemoveDialog(function() {
                var currentModule = ModuleService.getCurrentModule();

                CourseService.removeAssignment(vm.course._id, currentModule._id, assignment._id).then(function (response) {
                    currentModule.assignments = response.data;
                    viewAssignment(0);
                });
            });
        }

        function editAssignment(assignment) {
            var currentModule = ModuleService.getCurrentModule();
            vm.cAssignment = assignment;
            vm.element = "assignment";

            showUpdateDialog(function(model){
                vm.cAssignment.title = model.title;
                vm.cAssignment.src = model.src;

                CourseService.updateAssignment(vm.course._id, currentModule._id, assignment._id, assignment).then(function(response){
                    currentModule.assignments = response.data;
                });
            });
        }

        function viewAssignment(assignment) {
            var currentModule = ModuleService.getCurrentModule();
            var assignmentId = 1;

            if (currentModule.assignments.length > 0) {
                vm.assignment = assignment != 0 ? assignment : currentModule.assignments[0];
                assignmentId = vm.assignment.number;
            } else {
                vm.assignment = null;
            }

            if (assignment > 1) {
                assignmentId = assignment;
            }
            ModuleService.setCurrentAssignment(vm.assignment);

            $location.url("/course/" + vm.course.number + "/module/" + currentModule.number + "/assignment/" + assignmentId);
        }

        // LearningElement

        function addLearningElement(lecture) {
            var currentModule = ModuleService.getCurrentModule();

            vm.element = "learning element";
            vm.type = "VIDEO";
            vm.title = "";
            vm.src = "";

            showAddDialog(function(model) {
                var le = {
                    "title": model.title,
                    "type": model.type,
                    "src": model.src,
                    "html": model.html
                };

                CourseService.addLearningElement(vm.course._id, currentModule._id, lecture._id, le).then(function(response) {
                    CourseService.getLectureById(vm.course._id, currentModule._id, lecture._id).then(function(response) {
                        vm.lecture = response.data;
                    });
                    ModuleService.getModuleByNumber(vm.course.number, currentModule.number).then(function(response) {
                        currentModule.lectures = response.data.lectures;
                        CourseService.setCurrentModule(currentModule);
                    });
                });
            });
        }

        function deleteLearningElement(lecture, le) {
            vm.title = le.title;
            vm.element = "learning element";
            showRemoveDialog(function() {
                var currentModule = ModuleService.getCurrentModule();

                CourseService.removeLearningElement(vm.course._id, currentModule._id, lecture._id, le._id).then(function (response) {
                    CourseService.getLectureById(vm.course._id, currentModule._id, lecture._id).then(function (response) {
                        vm.lecture = response.data;
                    });
                    ModuleService.getModuleByNumber(vm.course.number, currentModule.number).then(function (response) {
                        currentModule.lectures = response.data.lectures;
                        CourseService.setCurrentModule(currentModule);
                    });
                });
            });
        }

        function editLearningElement(lecture, le) {
            var currentModule = ModuleService.getCurrentModule();
            vm.cLE = le;
            vm.element = "learning element";

            showUpdateDialog(function(model) {
                vm.cLE.title = model.title;
                vm.cLE.type = model.type;
                vm.cLE.src = model.src;

                CourseService.updateLearningElement(vm.course._id, currentModule._id, lecture._id, le._id, le).then(function(response) {
                    CourseService.getLectureById(vm.course._id, currentModule._id, lecture._id).then(function(response) {
                        vm.lecture = response.data;
                    });
                    ModuleService.getModuleByNumber(vm.course.number, currentModule.number).then(function(response) {
                        currentModule.lectures = response.data.lectures;
                        CourseService.setCurrentModule(currentModule);
                    });
                });
            });
        }

        // Demo

        function addDemo(example) {
            var currentModule = ModuleService.getCurrentModule();

            vm.element = "demo";
            vm.title = "";
            vm.base = "";
            vm.src = "";

            showAddDialog(function(model) {
                var demo = {
                    "title": model.title,
                    "base": model.base,
                    "src": model.src
                };

                CourseService.addDemo(vm.course._id, currentModule._id, example._id, demo).then(function(response) {
                    CourseService.getExampleById(vm.course._id, currentModule._id, example._id).then(function(response) {
                        vm.example = response.data;
                    });
                    ModuleService.getModuleByNumber(vm.course.number, currentModule.number).then(function(response) {
                        currentModule.examples = response.data.examples;
                        ModuleService.setCurrentModule(currentModule);
                        $scope.selected = vm.example.demos[0];
                    });
                });
            });
        }

        function deleteDemo(example, demo) {
            vm.title = demo.title;
            vm.element = "demo";
            showRemoveDialog(function() {
                var currentModule = ModuleService.getCurrentModule();

                CourseService.removeDemo(vm.course._id, currentModule._id, example._id, demo._id).then(function (response) {
                    CourseService.getExampleById(vm.course._id, currentModule._id, example._id).then(function (response) {
                        vm.example = response.data;
                    });
                    ModuleService.getModuleByNumber(vm.course.number, currentModule.number).then(function (response) {
                        currentModule.examples = response.data.examples;
                        ModuleService.setCurrentModule(currentModule);
                        $scope.selected = vm.example.demos[0];
                    });
                });
            });
        }

        function editDemo(example, demo) {
            var currentModule = ModuleService.getCurrentModule();
            vm.cDemo = demo;
            vm.element = "demo";

            showUpdateDialog(function(model) {
                vm.cDemo.title = model.title;
                vm.cDemo.base = model.base;
                vm.cDemo.src = model.src;

                CourseService.updateDemo(vm.course._id, currentModule._id, example._id, demo._id, demo).then(function(response) {
                    CourseService.getExampleById(vm.course._id, currentModule._id, example._id).then(function(response) {
                        vm.example = response.data;
                    });
                    ModuleService.getModuleByNumber(vm.course.number, currentModule.number).then(function(response) {
                        currentModule.examples = response.data.examples;
                        ModuleService.setCurrentModule(currentModule);
                        $scope.selected = vm.example.demos[0];
                    });
                });
            });
        }

        // Dependency

        function addDependency(example, demo) {
            var currentModule = ModuleService.getCurrentModule();

            vm.element = "dependency";
            vm.title = "";

            showAddDialog(function(model) {
                var dependency = {
                    "src": model.src
                };

                CourseService.addDependency(vm.course._id, currentModule._id, example._id, demo._id, dependency).then(function(response) {
                    CourseService.getExampleById(vm.course._id, currentModule._id, example._id).then(function(response) {
                        vm.example = response.data;
                    });
                    ModuleService.getModuleByNumber(vm.course.number, currentModule.number).then(function(response) {
                        currentModule.examples = response.data.examples;
                        ModuleService.setCurrentModule(currentModule);
                    });
                });
            });
        }

        function deleteDependency(example, demo, dependency) {
            vm.title = dependency.title;
            vm.element = "dependency";
            showRemoveDialog(function() {
                var currentModule = ModuleService.getCurrentModule();

                CourseService.removeDependency(vm.course._id, currentModule._id, example._id, demo._id, dependency._id).then(function (response) {
                    CourseService.getExampleById(vm.course._id, currentModule._id, example._id).then(function (response) {
                        vm.example = response.data;
                    });
                    ModuleService.getModuleByNumber(vm.course.number, currentModule.number).then(function (response) {
                        currentModule.examples = response.data.examples;
                        ModuleService.setCurrentModule(currentModule);
                    });
                });
            });
        }

        function editDependency(example, demo, dependency) {
            var currentModule = ModuleService.getCurrentModule();
            vm.cDependency = dependency;
            vm.element = "dependency";

            showUpdateDialog(function(model){
                vm.cDependency.src = model.src;

                CourseService.updateDependency(vm.course._id, currentModule._id, example._id, demo._id, dependency._id, dependency).then(function(response) {
                    CourseService.getExampleById(vm.course._id, currentModule._id, example._id).then(function(response) {
                        vm.example = response.data;
                    });
                    ModuleService.getModuleByNumber(vm.course.number, currentModule.number).then(function(response) {
                        currentModule.examples = response.data.examples;
                        ModuleService.setCurrentModule(currentModule);
                    });
                });
            });
        }

        function showAddDialog(confirm, cancel){
            ngDialog.openConfirm({template: 'client/views/modules/add.html', scope: $scope}).then(confirm, cancel);
        }

        function showUpdateDialog(confirm, cancel){
            ngDialog.openConfirm({template: 'client/views/modules/update.html', scope: $scope}).then(confirm, cancel);
        }

        function showRemoveDialog(confirm, cancel){
            ngDialog.openConfirm({template: 'client/views/modules/delete.html', scope: $scope}).then(confirm, cancel);
        }

        function viewOverview() {
            var currentModule = ModuleService.getCurrentModule();
            $location.url("/course/" + vm.course.number + "/module/" + currentModule.number);
        }

        function getLecture(lectures, id) {
            for (var l in lectures) {
                if (lectures[l].number == id) {
                    return lectures[l];
                }
            }
        }

        function getExample(examples, id) {
            for (var e in examples) {
                if (examples[e].number == id) {
                    return examples[e];
                }
            }
        }

        function getAssignment(assignments, id) {
            for (var a in assignments) {
                if (assignments[a].number == id) {
                    return assignments[a];
                }
            }
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