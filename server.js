var express = require('express');
var app = express();
var path = require('path');

var hmhco = require('./hmhco.json');
var clientId = hmhco.clientId;
var clientSecret = hmhco.clientSecret;

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

require("./public/assignment/server/app.js")(app);
require("./public/project/server/app.js")(app);

app.listen(port, ipaddress);