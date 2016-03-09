var express = require('express');
var app = express();
var path = require('path');

var config = require('./config.json')
var Acuity = require('acuityscheduling');

var acuity = Acuity.basic(config);

acuity.request('appointments', function (err, res, appointments) {
    if (err) return console.error(err);
    console.log(appointments);
});

var public_folder = __dirname + '/public';

app.use(express.static(public_folder));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.get('/hello', function(req, res){
    res.send('hello world');
});

app.get('/assignment', function(req, res){
   res.sendfile(public_folder + '/assignment/client/index.html');
});

app.get('/experiment', function(req, res){
    res.sendfile(public_folder + '/experiment/main.html');
});

app.get('/project', function(req, res){
    res.sendfile(public_folder + '/project/client/welcome.html');
});

app.listen(port, ipaddress);