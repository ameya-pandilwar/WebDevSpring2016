/**
 * Created by ameyapandilwar on 3/7/16.
 */

module.exports = function(app, userModel) {
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", findUser);
    app.get("/api/assignment/user/:id", findUserById);
    app.put("/api/assignment/user/:id", updateUserById);
    app.delete("/api/assignment/user/:id", deleteUserById);

    function createUser(req, res) {
        var user = req.body;
        res.json(userModel.createUser(user));
    }

    function findUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        if (username && password) {
            res.json(userModel.findUserByCredentials({'username': username, 'password': password}));
        } else if (username) {
            res.json(userModel.findUserByUsername(username));
        } else {
            res.json(userModel.findAllUsers());
        }
    }

    function findUserById(req, res) {
        var id = req.params.id;
        var user = userModel.findUserById(id);
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

};