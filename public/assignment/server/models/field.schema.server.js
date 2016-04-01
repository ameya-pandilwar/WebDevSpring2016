/**
 * Created by ameyapandilwar on 3/30/16.
 */

module.exports = function (mongoose) {
    var FieldSchema = mongoose.Schema({
        _id: String,
        label: String,
        type: {
            type: String,
            enum: ['TEXT', 'EMAIL', 'TEXTAREA', 'PASSWORD', 'OPTIONS', 'DATE', 'RADIOS', 'CHECKBOXES']
        },
        placeholder: String,
        options: [
            {
                label: String,
                value: String
            }]
    }, {collection: 'field'});
    return FieldSchema;
}