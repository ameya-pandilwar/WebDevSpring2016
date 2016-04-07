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

    function ModuleController($scope, $rootScope, $location, ngDialog, CourseService, ModuleService) {
        var vm = this;
        var selectedCourse = CourseService.getCurrentCourse();
        vm.course = selectedCourse;

        vm.lecture = ModuleService.getCurrentLecture();
        vm.assignment = ModuleService.getCurrentAssignment();
        vm.example = ModuleService.getCurrentExample();

        vm.addModule = addModule;
        vm.deleteModule = deleteModule;
        vm.editModule = editModule;
        vm.selectModule = selectModule;
        vm.updateModule = updateModule;
        vm.searchModule = searchModule;
        vm.viewModule = viewModule;

        vm.addLecture = addLecture;
        vm.deleteLecture = deleteLecture;
        vm.editLecture = editLecture;
        vm.viewLecture = viewLecture;

        vm.addExample = addExample;
        vm.deleteExample = deleteExample;
        vm.viewExample = viewExample;

        vm.addAssignment = addAssignment;
        vm.deleteAssignment = deleteAssignment;
        vm.viewAssignment = viewAssignment;

        vm.addLearningElement = addLearningElement;
        vm.deleteLearningElement = deleteLearningElement;

        // Module

        function selectModule(index) {
            selectedCourse = vm.courses[index];
            vm.number = selectedCourse.number;
            vm.timing = selectedCourse.timing;
            vm.location = selectedCourse.location;
        }

        function viewModule(index) {
            var selectedModule = selectedCourse.modules[index];
            ModuleService.setCurrentModule(selectedModule);
            $location.url("/course/" + selectedCourse.number + "/module/" + selectedModule.number);
        }

        function addModule() {
            var number = selectedCourse.modules.length > 0 ? selectedCourse.modules[selectedCourse.modules.length - 1].number + 1 : 1;
            var module = {"number": number, "title": Date.now(), "description": ""}
            CourseService.addModuleToCourse(selectedCourse._id, module).then(function(response) {
                $rootScope.currentCourse.modules = response.data;
                vm.course.modules = $rootScope.currentCourse.modules;
            });
        }

        function editModule(index){
            vm.addingType = "module";
            vm.currentModule = vm.course.modules[index];

            showUpdateDialog(function(model){
                var selectedModule = vm.currentModule;
                selectedModule.title = model.title;
                selectedModule.description = model.description;

                for (var m in vm.course.modules) {
                    if (vm.course.modules[index]._id === vm.course.modules[m]._id) {
                        vm.course.modules[m] = selectedModule;
                    }
                }

                CourseService.updateModulesByCourseId(selectedCourse._id, vm.course.modules).then(function(response) {
                    vm.course.modules = response.data;
                });
            });
            vm.module = null;
        }

        function updateModule() {
            if (selectedCourse) {
                selectedCourse.number = vm.number;
                selectedCourse.timing = vm.timing;
                selectedCourse.location = vm.location;
                CourseService.updateCourseById(selectedCourse._id, selectedCourse, function(callback) {
                    vm.number = "";
                    vm.timing = "";
                    vm.location = "";
                });
            }
        }

        function deleteModule(index) {
            CourseService.deleteModuleFromCourse(selectedCourse._id, selectedCourse.modules[index]._id).then(function(response) {
                $rootScope.currentCourse.modules = response.data;
                vm.course.modules = $rootScope.currentCourse.modules;
            });
        }

        function searchModule() {
            var moduleId = vm.search;
            CourseService.searchModuleInCourse(selectedCourse._id, moduleId).then(function(response) {
                vm.moduleSearchResult = response.data;
            });
        }

        // Lecture

        function addLecture() {
            var currentModule = ModuleService.getCurrentModule();
            var number = currentModule.lectures.length > 0 ? currentModule.lectures[currentModule.lectures.length - 1].number + 1 : 1;

            vm.addingType = "lecture";
            showAddDialog(function(model) {
                var lecture = {
                    "number": number,
                    "title": model.title,
                    "overview": model.overview,
                    "learningElements": []
                };

                currentModule.lectures.push(lecture);

                for (var m in vm.course.modules) {
                    if (currentModule._id === vm.course.modules[m]._id) {
                        vm.course.modules[m] = currentModule;
                    }
                }

                CourseService.updateModulesByCourseId(selectedCourse._id, vm.course.modules).then(function(response) {
                    vm.course.modules = response.data;
                });
            });
            vm.title = "";
            vm.overview = "";
        }

        function deleteLecture(index) {
            var currentModule = ModuleService.getCurrentModule();

            currentModule.lectures.splice(index, 1);

            for (var m in vm.course.modules) {
                if (currentModule._id === vm.course.modules[m]._id) {
                    vm.course.modules[m] = currentModule;
                }
            }

            CourseService.updateModulesByCourseId(selectedCourse._id, vm.course.modules).then(function(response) {
                vm.course.modules = response.data;
            });
        }

        function editLecture(index){
            var currentModule = ModuleService.getCurrentModule();
            vm.currentLecture = currentModule.lectures[index];
            vm.addingType = "lecture";

            showUpdateDialog(function(model){
                vm.currentLecture.title = model.title;
                vm.currentLecture.overview = model.overview;

                for (var l in currentModule.lectures) {
                    if (vm.currentLecture._id === currentModule.lectures[l]._id) {
                        currentModule.lectures[l] = vm.currentLecture;
                    }
                }

                for (var m in vm.course.modules) {
                    if (currentModule._id === vm.course.modules[m]._id) {
                        vm.course.modules[m] = currentModule;
                    }
                }

                CourseService.updateModulesByCourseId(selectedCourse._id, vm.course.modules).then(function(response) {
                    vm.course.modules = response.data;
                });
            });
            vm.module = null;
        }

        function viewLecture(index) {
            var currentModule = ModuleService.getCurrentModule();
            vm.lecture = currentModule.lectures[index];

            ModuleService.setCurrentLecture(vm.lecture);

            $location.url("/course/" + selectedCourse.number + "/module/" + currentModule.number + "/lecture/" + vm.lecture.number);
        }

        // Example

        function addExample() {
            var currentModule = ModuleService.getCurrentModule();
            var number = currentModule.examples.length > 0 ? currentModule.examples[currentModule.examples.length - 1].number + 1 : 1;

            vm.addingType = "example";
            showAddDialog(function(model) {
                var example = {
                    "number": number,
                    "title": model.title,
                    "demos": []
                };

                currentModule.examples.push(example);

                for (var m in vm.course.modules) {
                    if (currentModule._id === vm.course.modules[m]._id) {
                        vm.course.modules[m] = currentModule;
                    }
                }

                CourseService.updateModulesByCourseId(selectedCourse._id, vm.course.modules).then(function(response) {
                    vm.course.modules = response.data;
                });
            });
            vm.title = "";
        }

        function deleteExample(index) {
            var currentModule = ModuleService.getCurrentModule();

            currentModule.examples.splice(index, 1);

            for (var m in vm.course.modules) {
                if (currentModule._id === vm.course.modules[m]._id) {
                    vm.course.modules[m] = currentModule;
                }
            }

            CourseService.updateModulesByCourseId(selectedCourse._id, vm.course.modules).then(function(response) {
                vm.course.modules = response.data;
            });
        }

        function viewExample(index) {
            var currentModule = ModuleService.getCurrentModule();
            vm.example = currentModule.examples[index];

            ModuleService.setCurrentExample(vm.example);

            $location.url("/course/" + selectedCourse.number + "/module/" + currentModule.number + "/example/" + vm.example.number);
        }

        // Assignment

        function addAssignment() {
            var currentModule = ModuleService.getCurrentModule();
            var number = currentModule.assignments.length > 0 ? currentModule.assignments[currentModule.assignments.length - 1].number + 1 : 1;

            vm.addingType = "assignment";
            showAddDialog(function(model) {
                var assignment = {
                    "number": number,
                    "title": model.title,
                    "src": model.src
                };

                currentModule.assignments.push(assignment);

                for (var m in vm.course.modules) {
                    if (currentModule._id === vm.course.modules[m]._id) {
                        vm.course.modules[m] = currentModule;
                    }
                }

                CourseService.updateModulesByCourseId(selectedCourse._id, vm.course.modules).then(function(response) {
                    vm.course.modules = response.data;
                });
            });
            vm.title = "";
            vm.src = "";
        }

        function deleteAssignment(index) {
            var currentModule = ModuleService.getCurrentModule();

            currentModule.assignments.splice(index, 1);

            for (var m in vm.course.modules) {
                if (currentModule._id === vm.course.modules[m]._id) {
                    vm.course.modules[m] = currentModule;
                }
            }

            CourseService.updateModulesByCourseId(selectedCourse._id, vm.course.modules).then(function(response) {
                vm.course.modules = response.data;
            });
        }

        function viewAssignment(index) {
            var currentModule = ModuleService.getCurrentModule();
            vm.assignment = currentModule.assignments[index];

            ModuleService.setCurrentAssignment(vm.assignment);

            $location.url("/course/" + selectedCourse.number + "/module/" + currentModule.number + "/assignment/" + vm.assignment.number);
        }

        // LearningElement

        function addLearningElement(lecture) {
            var currentModule = ModuleService.getCurrentModule();

            vm.addingType = "learning element";
            showAddDialog(function(model) {
                var learningElement = {
                    "title": model.title,
                    "type": model.type,
                    "src": model.src,
                    "height": model.height,
                    "width": model.width,
                    "html": model.html
                };

                lecture.learningElements.push(learningElement);

                for (var m in vm.course.modules) {
                    if (currentModule._id === vm.course.modules[m]._id) {
                        for (var l in currentModule.lectures) {
                            if (lecture._id === currentModule.lectures[l]._id) {
                                currentModule.lectures[l] = lecture;
                            }
                        }
                        vm.course.modules[m] = currentModule;
                    }
                }

                CourseService.updateModulesByCourseId(selectedCourse._id, vm.course.modules).then(function(response) {
                    vm.course.modules = response.data;
                });
            });
            vm.title = "";
            vm.overview = "";
        }

        function deleteLearningElement(index, lecture) {
            var currentModule = ModuleService.getCurrentModule();

            lecture.learningElements.splice(index, 1);

            for (var m in vm.course.modules) {
                if (currentModule._id === vm.course.modules[m]._id) {
                    for (var l in currentModule.lectures) {
                        if (lecture._id === currentModule.lectures[l]._id) {
                            currentModule.lectures[l] = lecture;
                        }
                    }
                    vm.course.modules[m] = currentModule;
                }
            }

            CourseService.updateModulesByCourseId(selectedCourse._id, vm.course.modules).then(function(response) {
                vm.course.modules = response.data;
            });
        }

        function showAddDialog(confirm, cancel){
            ngDialog.openConfirm({template: 'views/modules/add.html', scope: $scope}).then(confirm, cancel);
        }

        function showUpdateDialog(confirm, cancel){
            ngDialog.openConfirm({template: 'views/modules/update.html', scope: $scope}).then(confirm, cancel);
        }

    }
}());
