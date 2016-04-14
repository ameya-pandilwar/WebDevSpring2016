/**
 * Created by ameyapandilwar on 3/30/16.
 */

module.exports = function (mongoose) {
    return mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        emails: [String],
        phones: [String],
        roles: [String]
    }, {collection: 'user'});
};