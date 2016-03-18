var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');
var express      = require('express');
var multer       = require('multer')
var session      = require('express-session');

var app = express();

var public_folder = __dirname + '/public';

app.use(express.static(public_folder));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

var session_secret = 'webdev2016';

app.use(multer());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: session_secret,
    resave: true,
    saveUninitialized: true
}));

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