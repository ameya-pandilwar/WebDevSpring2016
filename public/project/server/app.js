/**
 * Created by ameyapandilwar on 3/8/16.
 */

module.exports = function(app, db, mongoose, aUser, cUser, passport) {
    var courseCatalogModel = require("./models/course.model.js")(db, mongoose);

    var courseService = require("./services/course.service.server.js")(app, courseCatalogModel);
    var userService = require("./services/user.service.server.js")(app, cUser);
    var securityService = require("./../../security/security.js")(app, aUser, cUser, passport);
};