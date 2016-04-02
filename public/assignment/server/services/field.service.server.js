/**
 * Created by ameyapandilwar on 3/16/16.
 */

module.exports = function (app, fieldModel) {
    app.get("/api/assignment/form/:formId/field", findAllFieldsForFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldByFieldIdAndFormId);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFormFieldById);
    app.post("/api/assignment/form/:formId/field", createFormField);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFormField);
    app.put("/api/assignment/form/:formId/fields", updateFormFields);


    function findAllFieldsForFormId(req, res) {
        fieldModel.findAllFieldsForFormId(req.params.formId).then(function(fields) {
            res.json(fields);
        }, function(err) {
            res.status(400).send(err);
        });
    }

    function findFieldByFieldIdAndFormId(req, res) {
        fieldModel.findFieldByFieldIdAndFormId(req.params.formId, req.params.fieldId).then(function(fields) {
            res.json(fields);
        }, function(err) {
            res.status(400).send(err);
        });
    }

    function deleteFormFieldById(req, res) {
        fieldModel.deleteFormFieldById(req.params.formId, req.params.fieldId).then(function(fields) {
            res.json(200);
        }, function(err) {
            res.status(400).send(err);
        });
    }

    function createFormField(req, res) {
        fieldModel.createFormField(req.params.formId, req.body).then(function(form) {
            res.json(form);
        }, function(err) {
            res.status(400).send(err);
        });
    }

    function updateFormField(req, res) {
        fieldModel.updateFormField(req.params.formId, req.params.fieldId, req.body).then(function(fields) {
            res.json(200);
        }, function(err) {
            res.status(400).send(err);
        });
    }

    function updateFormFields(req, res) {
        fieldModel.updateFormFields(req.params.formId, req.body).then(function(fields) {
            res.json(200);
        }, function(err) {
            res.status(400).send(err);
        });
    }

};