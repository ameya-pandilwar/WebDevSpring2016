/**
 * Created by ameyapandilwar on 3/30/16.
 */

module.exports = function (mongoose) {
    var FieldSchema = require("./field.schema.server.js")(mongoose);

    var FormSchema = mongoose.Schema({
        _id: String,
        userId: String,
        title: String,
        fields: FieldSchema,
        created: Date,
        update: Date
    }, {collection: 'form'});
    return FormSchema;
}