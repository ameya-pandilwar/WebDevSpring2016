/**
 * Created by ameyapandilwar on 3/16/16.
 */

module.exports = function (app, userModel, formModel) {
    app.get("/api/assignment/form/:formId/field", findAllFieldsForFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldByFieldIdAndFormId);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFormFieldById);
    app.post("/api/assignment/form/:formId/field", createFormField);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFormField);

    function findAllFieldsForFormId(req, res) {
        var formId = req.params.formId;
        var fields = formModel.findAllFieldsForFormId(formId);
        res.json(fields);
    }

    function findFieldByFieldIdAndFormId(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = formModel.findFieldByFieldIdAndFormId(formId, fieldId);
        res.json(field);
    }

    function deleteFormFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = formModel.deleteFormFieldById(formId, fieldId);
        res.json(formModel.findAllFieldsForFormId(formId));
    }

    function createFormField(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        var newField = formModel.createFormField(formId, field);
        res.json(formModel.findAllFieldsForFormId(formId));
    }

    function updateFormField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;
        var newField = formModel.updateFormField(formId, fieldId, field);
        res.json(formModel.findAllFieldsForFormId(formId));
    }

};