/**
 * Created by ameyapandilwar on 3/8/16.
 */

var config = require('./config.json')
var Acuity = require('acuityscheduling');

var acuity = Acuity.basic(config);

acuity.request('appointments', function (err, res, appointments) {
    if (err) return console.error(err);
    console.log(appointments);
});