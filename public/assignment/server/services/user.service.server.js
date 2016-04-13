/**
 * Created by ameyapandilwar on 3/7/16.
 */

var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(app, userModel) {
    var auth = authorized;

    app.post('/api/assignment/login', passport.authenticate('local'), login);
    app.post('/api/assignment/logout', logout);
    app.get('/api/assignment/loggedin', loggedin);
    app.post('/api/assignment/register', auth, createUser);
    app.get('/api/assignment/user', findUser);
    app.get('/api/assignment/user/:id', findUserById);
    app.put('/api/assignment/user/:id', auth, updateUserById);
    app.delete('/api/assignment/user/:id', auth, deleteUserById);
    app.get('/api/assignment/user/logout', logout);

    app.post("/api/assignment/admin/user",auth,createUser);
    app.get("/api/assignment/admin/user", auth, findUser);
    app.get("/api/assignment/admin/user/:id", findUserById);
    app.put("/api/assignment/admin/user/:id", auth, updateUserById);
    app.delete("/api/assignment/admin/user/:userId", auth, deleteUserById);

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function login(req, res) {
        res.json(req.user);
    }

    function localStrategy(username, password, response) {
        userModel.findUserByCredentials({username: username, password: password}).then(function(user) {
            req.session.currentUser = user;
            res.json(user);
        }, function(err) {
            res.status(400).send(err);
        });
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel.findById(user._id).then(function(user) {
            done(null, user);
        }, function(err) {
            done(err, null);
        });
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    function createUser(req, res) {
        var user = req.body;
        userModel.createUser(user).then(function(user) {
            req.session.currentUser = user;
            res.json(user);
        }, function(err) {
            res.status(400).send(err);
        });
    }

    function findUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        if (username && password) {
            userModel.findUserByCredentials({username: username, password: password}).then(function(user) {
                req.session.currentUser = user;
                res.json(user);
            }, function(err) {
                res.status(400).send(err);
            });
        } else if (username) {
            userModel.findUserByUsername(username).then(function(user) {
                res.json(user);
            }, function(err) {
                res.status(400).send(err);
            });
        } else {
            userModel.findAllUsers().then(function(users) {
                res.json(users);
            }, function(err) {
                res.status(400).send(err);
            });
        }
    }

    function findUserById(req, res) {
        var id = req.params.id;
        userModel.findUserById(id).then(function(user) {
            res.json(user);
        }, function(err) {
            res.status(400).send(err);
        });
    }

    function updateUserById(req, res) {
        userModel.updateUser(req.params.id, req.body).then(function(user) {
            res.json(user);
        }, function(err) {
            res.status(400).send(err);
        });
    }

    function deleteUserById(req, res) {
        userModel.deleteUserById(req.params.id).then(function(user) {
            res.json(200);
        }, function(err) {
            res.status(400).send(err);
        });
    }

};