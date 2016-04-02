/**
 * Created by ameyapandilwar on 3/7/16.
 */

var q = require('q');
var uuid = require('node-uuid');

module.exports = function(db, mongoose) {

    var FormSchema = require("./form.schema.server.js")(mongoose);

    var FormModel = mongoose.model('Form', FormSchema);

    var api = {
        createFormForUser: createFormForUser,
        deleteFormById: deleteFormById,
        findAllFormsForUser: findAllFormsForUser,
        findFormById: findFormById,
        findAllForms: findAllForms,
        findFormByTitle: findFormByTitle,
        updateFormById: updateFormById,
        getModel: getModel
    };

    return api;

    function getModel() {
        return FormModel;
    }


    function createFormForUser(userId, form) {
        var deferred = q.defer();

        form.userId = userId;
        form.fields = [];

        FormModel.create(form, function(err, res) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(res);
            }
        });

        return deferred.promise;
    }

    function findAllFormsForUser(userId) {
        return FormModel.find({userId: userId});
    }

    function findFormById(id) {
        return FormModel.findById(id);
    }

    function findAllForms() {
        var deferred = q.defer();

        FormModel.find(
            function(err, res) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(res);
                }
            });

        return deferred.promise;
    }

    function deleteFormById(id) {
        var deferred = q.defer();

        FormModel.remove({_id: id},
            function(err, res) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(res);
                }
            });

        return deferred.promise;
    }

    function updateFormById(id, form) {
        var deferred = q.defer();

        FormModel.update(
            {_id: id},
            {$set: form},
            function (err, res) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(res);
                }
            });

        return deferred.promise;
    }

    function findFormByTitle(title) {
        return FormModel.findOne({title: title});
    }

};