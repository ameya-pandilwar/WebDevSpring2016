/**
 * Created by ameyapandilwar on 3/7/16.
 */

var q = require('q');
var uuid = require('node-uuid');

module.exports = function(db, mongoose) {

    var FormSchema = require("./form.schema.server.js")(mongoose);

    var FormModel = mongoose.model('FormModel', FormSchema);

    var api = {
        createFormField: createFormField,
        createFormForUser: createFormForUser,
        deleteFormFieldById: deleteFormFieldById,
        deleteFormById: deleteFormById,
        findAllFormsForUser: findAllFormsForUser,
        findFormById: findFormById,
        findAllForms: findAllForms,
        findFormByTitle: findFormByTitle,
        findAllFieldsForFormId: findAllFieldsForFormId,
        findFormFieldById: findFormFieldById,
        updateFormField: updateFormField,
        updateFormById: updateFormById,
        updateFormFields: updateFormFields
    };

    return api;

    function createFormForUser(userId, form) {
        var newForm = {
            _id: (new Date).getTime().toString(),
            title: form.title,
            userId: userId,
            fields: []
        };

        forms.push(newForm);
        return newForm;
    }

    function findAllFormsForUser(userId) {
        var res = [];
        for (var f in forms) {
            if (forms[f].userId == userId) {
                res.push(forms[f]);
            }
        }

        return res;
    }

    function findFormById(formId) {
        for (var f in forms) {
            if (forms[f]._id == formId) {
                return forms[f];
            }
        }

        return null;
    }

    function findAllForms() {
        return forms;
    }

    function deleteFormById(formId) {
        var form = findFormById(formId);
        if (form) {
            forms.splice(forms.indexOf(form), 1);
        }
        return null;
    }

    function updateFormById(formId, newForm) {
        var existingForm = findFormById(formId);
        if (existingForm) {
            existingForm.title = newForm.title;
            existingForm.userId = newForm.userId;
            existingForm.fields = newForm.fields ? newForm.fields : [];
            return existingForm;
        } else {
            return null;
        }
    }

    function findFormByTitle(title) {
        for (var f in forms) {
            if (forms[f].title == title) {
                return forms[f];
            }
        }

        return null;
    }

    function findAllFieldsForFormId(formId) {
        var form = findFormById(formId);
        if (form) {
            return form.fields;
        }

        return [];
    }

    function findFormFieldById(formId, fieldId) {
        var fields = findAllFieldsForFormId(formId);
        if (fields) {
            for (var f in fields) {
                if (fields[f]._id == fieldId) {
                    return fields[f];
                }
            }
        }

        return null;
    }

    function deleteFormFieldById(formId, fieldId) {
        var field = findFormFieldById(formId, fieldId);
        var fields = findAllFieldsForFormId(formId);
        if (field) {
            fields.splice(fields.indexOf(field), 1);
        }
        return null;
    }

    function createFormField(formId, field) {
        var newField = {
            _id: (new Date).getTime().toString(),
            label: field.label,
            type: field.type,
            placeholder: field.placeholder,
            options: field.options
        };

        var fields = findAllFieldsForFormId(formId);
        fields.push(newField);

        var form = findFormById(formId);
        var newForm = {
            _id: form._id,
            title: form.title,
            userId: form.userId,
            fields: fields
        };

        updateFormById(formId, newForm);

        return newField;
    }

    function updateFormField(formId, fieldId, field) {
        var fieldTemp = findFormFieldById(formId, fieldId);
        if (fieldTemp) {
            fieldTemp.label = field.label;
            fieldTemp.placeholder = field.placeholder;
            fieldTemp.options = field.options;
            return fieldTemp;
        } else {
            return null;
        }
    }

    function updateFormFields(formId, fields) {
        var form = findFormById(formId);
        var updatedForm = {
            _id: form._id,
            title: form.title,
            userId: form.userId,
            fields: fields
        };
        return updateFormById(formId, updatedForm);
    }

};