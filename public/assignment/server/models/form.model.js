/**
 * Created by ameyapandilwar on 3/7/16.
 */

var forms = require("./form.mock.json");

module.exports = function() {

    var api = {
        createFormField: createFormField,
        createFormForUser: createFormForUser,
        deleteFormFieldById: deleteFormFieldById,
        deleteFormById: deleteFormById,
        findAllFormsForUser: findAllFormsForUser,
        findFormById: findFormById,
        findAllForms: findAllForms,
        findFormByTitle: findFormByTitle,
        findAllFieldsById: findAllFieldsById,
        findFormFieldById: findFormFieldById,
        updateFormField: updateFormField,
        updateFormById: updateFormById
    };

    return api;

    function createFormForUser(userId, form) {
        var newForm = {
            _id: (new Date).getTime(),
            title: form.title,
            userId: userId,
            fields: form.fields
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
            existingForm.fields = newForm.fields;
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

    function findAllFieldsById(formId) {
        var form = findFormById(formId);
        if (!form) {
            return form.fields;
        }

        return [];
    }

    function findFormFieldById(formId, fieldId) {
        var fields = findAllFieldsById(formId);
        if (!fields) {
            for (var f in fields) {
                if (fields[f] == fieldId) {
                    return fields[f];
                }
            }
        }

        return null;
    }

    function deleteFormFieldById(formId, fieldId) {
        var field = findFormFieldById(formId, fieldId);
        var fields = findAllFieldsById(formId);
        if (!field) {
            fields.splice(fields.indexOf(field), 1);
        }
        return null;
    }

    function createFormField(formId, field) {
        var newField = {
            _id: (new Date).getTime(),
            label: field.label,
            type: field.type,
            placeholder: field.placeholder,
            options: field.options
        };

        var fields = findAllFieldsById(formId);
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
        if (!fieldTemp) {
            fieldTemp._id = field._id;
            fieldTemp.label = field.label;
            fieldTemp.type = field.type;
            fieldTemp.placeholder = field.placeholder;
            fieldTemp.options = field.options;
            return fieldTemp;
        } else {
            return null;
        }
    }

};