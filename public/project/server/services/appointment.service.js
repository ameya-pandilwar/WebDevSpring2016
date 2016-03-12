/**
 * Created by ameyapandilwar on 3/8/16.
 */

var config = require('./../config.json')
var Acuity = require('acuityscheduling');

var acuity = Acuity.basic(config);

module.exports = function(app) {
    app.get("/api/project/appointments", displayAppointments);

    function displayAppointments(req, res) {
        acuity.request('appointments', function (error, response, appointments) {
            if (error) return console.error(error);
            res.json(appointments);
        });
    }
}