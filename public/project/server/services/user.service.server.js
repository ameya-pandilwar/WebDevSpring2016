/**
 * Created by ameyapandilwar on 3/7/16.
 */

module.exports = function(app, userModel) {
    var passport      = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var auth = authorized;
    passport.use('catalog', new LocalStrategy(catalogLocalStrategy));

    var bcrypt = require("bcrypt-nodejs");

    app.post('/api/ds/catalog/login', passport.authenticate('catalog'), login);
    app.post('/api/ds/catalog/logout', logout);
    app.get('/api/ds/catalog/loggedin', loggedin);
    app.post('/api/ds/catalog/register', register);
    app.get("/api/ds/catalog/user", findUser);
    app.get("/api/ds/catalog/user/:id", findUserById);
    app.put("/api/ds/catalog/user/:id", updateUserById);
    app.put("/api/ds/catalog/user/:id/admin", updateUserToAdmin);
    app.delete("/api/ds/catalog/user/:id", deleteUserById);

    app.post("/api/ds/catalog/admin/user", auth, createUser);
    app.get("/api/ds/catalog/admin/user", auth, findUser);
    app.get("/api/ds/catalog/admin/user/:id", auth, findUserById);
    app.put("/api/ds/catalog/admin/user/:id", auth, updateUserById);
    app.delete("/api/ds/catalog/admin/user/:id", auth, deleteUserById);

    app.put("/api/ds/catalog/user/:id/enroll", enrollUserInCourse);
    app.put("/api/ds/catalog/user/:id/disenroll/:crn", disenrollUserFromCourse);

    function login(req, res) {
        res.json(req.user);
    }

    function catalogLocalStrategy(username, password, done){
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

    function updateUserToAdmin(req, res) {
        var user = req.body;
        userModel.updateUser(req.params.id, user).then(function(user) {
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

    function enrollUserInCourse(req, res) {
        userModel.enrollUserInCourse(req.params.id, req.body).then(function(user) {
            res.json(user);
        }, function(err) {
            res.status(400).send(err);
        });
    }

    function disenrollUserFromCourse(req, res) {
        userModel.disenrollUserFromCourse(req.params.id, req.params.crn).then(function(user) {
            res.json(user);
        }, function(err) {
            res.status(400).send(err);
        });
    }

};