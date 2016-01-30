var express = require('express');
var app = express();
var path = require('path');

var public_folder = __dirname + '/public';

app.use(express.static(public_folder));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.get('/hello', function(req, res){
    res.send('hello world');
});

app.get('/assignment', function(req, res){
   res.sendfile(public_folder + '/assignment/home.html');
});

app.listen(port, ipaddress);