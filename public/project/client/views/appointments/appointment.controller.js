/**
 * Created by ameyapandilwar on 3/5/16.
 */

(function () {
    "use strict";
    angular
        .module("ProjectApp")
        .controller("AppointmentController", AppointmentController)

    function AppointmentController($scope, $http, $q, AppointmentService) {

        var deferred = $q.defer();

        $http.get("/api/project/appointments")
            .success(function(response) {
                $scope.appointments = response;
                deferred.resolve(response);
            })
            .error(function(error) {
                deferred.reject(error);
            })

        return deferred.promise;

        //AppointmentService.getAppointments(function(callback) {
        //    $scope.appointments = callback;
        //});
    }
}());
