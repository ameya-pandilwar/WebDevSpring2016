var bodyParser      = require('body-parser');
var cookieParser    = require('cookie-parser');
var express         = require('express');
var multer          = require('multer')
var session         = require('express-session');
var mongoose        = require('mongoose');
var passport        = require('passport');

var app = express();

var public_folder = __dirname + '/public';

var connectionUrl = 'mongodb://localhost/webdev'

app.use(express.static(public_folder));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionUrl = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
            process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
            process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
            process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
            process.env.OPENSHIFT_APP_NAME;
    }

var session_secret = process.env.SESSION_SECRET || process.env.OPENSHIFT_APP_NAME;

var db = mongoose.connect(connectionUrl);

app.use(multer());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: session_secret,
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/assignment', function(req, res){
   res.sendfile(public_folder + '/assignment/client/index.html');
});

app.get('/experiment', function(req, res){
    res.sendfile(public_folder + '/experiment/index.html');
});

app.get('/project', function(req, res){
    res.sendfile(public_folder + '/project/client/index.html');
});

var aUser = require("./public/assignment/server/models/user.model.js")(db, mongoose);
var cUser = require("./public/project/server/models/user.model.js")(db, mongoose);

require("./public/assignment/server/app.js")(app, db, mongoose, aUser, cUser, passport);
require("./public/project/server/app.js")(app, db, mongoose, aUser, cUser, passport);

app.listen(port, ipaddress);