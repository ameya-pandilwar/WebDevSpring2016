/**
 * Created by ameyapandilwar on 3/30/16.
 */

module.exports = function (mongoose) {
    return mongoose.Schema({
        label: String,
        type: {
            type: String,
            default: 'TEXT',
            enum: ['TEXT', 'TEXTAREA', 'EMAIL', 'PASSWORD', 'OPTIONS', 'DATE', 'RADIOS', 'CHECKBOXES']
        },
        placeholder: String,
        options: [{
            label: String,
            value: String
        }]
    }, {collection: 'field'});
};