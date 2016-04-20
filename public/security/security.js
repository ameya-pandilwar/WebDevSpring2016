/**
 * Created by ameyapandilwar on 4/20/16.
 */

module.exports = function(app, aUserModel, cUserModel, passport) {

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        if (user.hasOwnProperty('phones')) {
            aUserModel.findUserById(user._id).then(function(user) {
                done(null, user);
            }, function(err) {
                done(err, null);
            });
        } else if (user.hasOwnProperty('courses')) {
            cUserModel.findUserById(user._id).then(function(user) {
                done(null, user);
            }, function(err) {
                done(err, null);
            });
        }
    }
};