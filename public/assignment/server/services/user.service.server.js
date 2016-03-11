/**
 * Created by ameyapandilwar on 3/7/16.
 */

module.exports = function(app, userModel) {
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", findAllUsers);
    app.get("/api/assignment/user/:id", findUserById);
    app.get("/api/assignment/user?username=username", findUserByUsername);
    app.get("/api/assignment/user?username=:username&password=:password", findUserByCredentials);
    app.put("/api/assignment/user/:id", updateUserById);
    app.delete("/api/assignment/user/:id", deleteUserById);
    app.post("/api/assignment/login", login);
    app.post("/api/assignment/logout", logout);
    app.get("/api/assignment/loggedin", loggedIn);

    function createUser(req, res) {
        var user = req.body;
        user = userModel.createUser(user);
        res.json(userModel.findAllUsers());
    }

    function findAllUsers(req, res) {
        res.json(userModel.findAllUsers());
    }

    function findUserById(req, res) {
        var id = req.params.id;
        var user = userModel.findUserById(id);
        res.json(user);
    }

    function findUserByUsername(req, res) {
        var username = req.params.username;
        var user = userModel.findUserByUsername(username);
        res.json(user);
    }

    function findUserByCredentials(req, res) {
        var username = req.params.username;
        var password = req.params.password;
        var credentials = {
            username: username,
            password: password
        };
        var user = userModel.findUserByCredentials(credentials);
        res.json(user);
    }

    function updateUserById(req, res) {
        var id = req.params.id;
        var user = req.body;
        var userTemp = userModel.updateUserById(id, user);
        res.json(userModel.findAllUsers());
    }

    function deleteUserById(req, res) {
        var id = req.params.id;
        var user = userModel.deleteUserById(id);
        res.json(userModel.findAllUsers());
    }

    function login(req, res) {
        var credentials = req.body;
        var user = userModel.findUserByCredentials(credentials);
        req.session.currentUser = user;
        res.json(user);
    }

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }

    function loggedIn(req, res) {
        res.json(req.session.currentUser);
    }

};