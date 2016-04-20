/**
 * Created by ameyapandilwar on 3/7/16.
 */

module.exports = function(app, db, mongoose, aUser, cUser, passport) {
    var formModel = require("./models/form.model.js")(db, mongoose);
    var fieldModel = require("./models/field.model.js")(formModel);

    var userService = require("./services/user.service.server.js")(app, aUser);
    var formService = require("./services/form.service.server.js")(app, formModel);
    var fieldService = require("./services/field.service.server.js")(app, fieldModel);
    var securityService = require("./../../security/security.js")(app, aUser, cUser, passport);
};