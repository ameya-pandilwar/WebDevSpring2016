/**
 * Created by ameyapandilwar on 3/7/16.
 */

module.exports = function(app, userModel) {
    var passport      = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var auth = authorized;
    passport.use('assignment', new LocalStrategy(assignmentLocalStrategy));

    var bcrypt = require("bcrypt-nodejs");

    app.post('/api/assignment/login', passport.authenticate('assignment'), login);
    app.post('/api/assignment/logout', logout);
    app.get('/api/assignment/loggedin', loggedin);
    app.post('/api/assignment/register', register);
    app.get('/api/assignment/user', findUser);
    app.get('/api/assignment/user/:id', findUserById);
    app.put('/api/assignment/user/:id', updateUserById);
    app.delete('/api/assignment/user/:id', deleteUserById);

    app.post("/api/assignment/admin/user", auth, createUser);
    app.get("/api/assignment/admin/user", auth, findUser);
    app.get("/api/assignment/admin/user/:id", findUserById);
    app.put("/api/assignment/admin/user/:id", auth, updateUserById);
    app.delete("/api/assignment/admin/user/:id", auth, deleteUserById);

    function login(req, res) {
        res.json(req.user);
    }

    function assignmentLocalStrategy(username, password, done){
        userModel.findUserByUsername(username).then(function (user) {
            if(user && bcrypt.compareSync(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        }, function(err) {
            if (err) {
                return done(err);
            }
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

    function register(req, res) {
        var newUser = req.body;
        newUser.roles = ['student'];

        userModel.findUserByUsername(newUser.username).then(function(user) {
            if(user) {
                res.json(null);
            } else {
                newUser.password = bcrypt.hashSync(newUser.password);
                return userModel.createUser(newUser);
            }
        }, function(err) {
            res.status(400).send(err);
        }).then(function(user) {
            if(user) {
                req.login(user, function(err) {
                    if(err) {
                        res.status(400).send(err);
                    } else {
                        res.json(user);
                    }
                });
            }
        }, function(err) {
            res.status(400).send(err);
        });
    }

    function createUser(req, res) {
        var user = req.body;
        userModel.createUser(user).then(function(user) {
            //req.session.currentUser = user;
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
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        userModel.updateUser(req.params.id, user).then(function(user) {
            req.session.currentUser = user;
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