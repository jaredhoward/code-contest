var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var submitionSchema = new Schema({
    user: Schema.Types.Mixed,
    challenge: Schema.Types.Mixed,
    language: Schema.Types.Mixed,
    file: Schema.Types.Mixed,
    results: [],
    created: {type: Date, default: Date.now}
});

var Submition = mongoose.model('Submition', submitionSchema);

module.exports = {
    Submition: Submition
};