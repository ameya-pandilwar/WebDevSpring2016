/**
 * Created by ameyapandilwar on 3/30/16.
 */

module.exports = function (mongoose) {
    var UserSchema = mongoose.Schema({
        _id: String,
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: [String],
        roles: [String]
    }, {collection: 'user'});
    return UserSchema;
};