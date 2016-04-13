/**
 * Created by ameyapandilwar on 4/1/16.
 */

'use strict';
var _ = require('lodash');

module.exports = function(formModel) {

    var Form = formModel.getModel();

    function findFieldsByFormId(formId) {
        return Form
            .findById(formId)
            .then(
                function(form) {
                    return form.fields;
                }
            );
    }

    function findFieldByFormIdAndFieldId(formId, fieldId) {
        return Form
            .findById(formId)
            .then(
                function(form) {
                    return form.fields.id(fieldId);
                }
            );
    }

    function deleteFieldByFormIdAndFieldId(formId, fieldId) {
        return Form
            .findById(formId)
            .then(
                function(form){
                    form.fields.id(fieldId).remove();
                    return form.save();
                }
            );
    }

    function createFieldInForm(formId, field) {
        return Form.findById(formId)
            .then(
                function(form) {
                    form.fields.push(field);
                    return form.save();
                }
            );
    }

    function updateFieldInForm(formId, fieldId, field) {
        return Form
            .findById(formId)
            .then(
                function(form){
                    var fieldToUpdate = form.fields.id(fieldId);
                    _.extend(fieldToUpdate, field);
                    return form.save();
                }
            );
    }

    function updateFieldsInForm(formId, fields) {
        return Form
            .findById(formId)
            .then(
                function(form) {
                    form.fields = fields;
                    return form.save();
                }
            );
    }

    function sortField(formId, startIndex, endIndex) {
        var deferred = q.defer();

        form.findById(formId, function(err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                var userForm = doc;
                userForm.fields.splice(endIndex,0,userForm.fields.splice(startIndex,1)[0]);
                form.update(
                    {"_id": formId},
                    {$set:{"fields": userForm.fields}},
                    function(err, doc) {
                        if(err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    }
                );
            }
        });

        return deferred.promise;
    }

    return {
        findAllFieldsForFormId: findFieldsByFormId,
        findFormFieldById: findFieldByFormIdAndFieldId,
        deleteFormFieldById: deleteFieldByFormIdAndFieldId,
        createFormField: createFieldInForm,
        updateFormField: updateFieldInForm,
        updateFormFields: updateFieldsInForm,
        sortField: sortField
    }
};