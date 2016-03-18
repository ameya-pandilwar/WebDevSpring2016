/**
 * Created by ameyapandilwar on 3/7/16.
 */

module.exports = function(app, userModel, formModel) {
    app.get("/api/assignment/user/:userId/form", findAllFormsForUser);
    app.get("/api/assignment/form/:formId", findFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form", createFormForUser);
    app.put("/api/assignment/form/:formId", updateFormById);
    app.get("/api/assignment/form", findAllForms);

    function findAllFormsForUser(req, res) {
        var userId = req.params.userId;
        res.json(formModel.findAllFormsForUser(userId));
    }

    function findFormById(req, res) {
        var formId = req.params.formId;
        res.json(formModel.findFormById(formId));
    }

    function deleteFormById(req, res) {
        var formId = req.params.formId;
        var form = formModel.deleteFormById(formId);
        res.send(formModel.findAllForms());
    }

    function createFormForUser(req, res) {
        var userId = req.params.userId;
        var form = req.body;
        var newForm = formModel.createFormForUser(userId, form);
        res.json(formModel.findAllFormsForUser(userId));
    }

    function updateFormById(req, res) {
        var formId = req.params.formId;
        var form = req.body;
        var updatedForm = formModel.updateFormById(formId, form);
        res.json(formModel.findAllForms());
    }

    function findAllForms(req, res) {
        res.json(formModel.findAllForms());
    }

};
