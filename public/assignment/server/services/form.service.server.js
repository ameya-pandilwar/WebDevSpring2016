/**
 * Created by ameyapandilwar on 3/7/16.
 */

module.exports = function(app, formModel) {
    app.get("/api/assignment/user/:userId/form", findAllFormsForUser);
    app.get("/api/assignment/form/:formId", findFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form", createFormForUser);
    app.put("/api/assignment/form/:formId", updateFormById);

    function findAllFormsForUser(req, res) {
        formModel.findAllFormsForUser(req.params.userId).then(function(forms) {
            res.json(forms);
        }, function(err) {
            res.status(400).send(err);
        });
    }

    function findFormById(req, res) {
        formModel.findFormById(req.params.formId).then(function(form) {
            res.json(form);
        }, function(err) {
            res.status(400).send(err);
        });
    }

    function deleteFormById(req, res) {
        formModel.deleteFormById(req.params.formId).then(function(form) {
            res.send(200);
        }, function(err) {
            res.status(400).send(err);
        });
    }

    function createFormForUser(req, res) {
        var form = req.body;
        var userId = req.params.userId;
        formModel.createFormForUser(userId, form).then(function(form) {
            res.send(form);
        }, function(err) {
            res.status(400).send(err);
        });
    }

    function updateFormById(req, res) {
        var updatedForm = formModel.updateFormById(req.params.formId, req.body).then(function(form) {
            res.send(200);
        }, function(err) {
            res.status(400).send(err);
        });
    }

};