var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var languageSchema = new Schema({
    name: String,
    slug: String,
    versions: [],
    created: {type: Date, default: Date.now}
});

var Language = mongoose.model('Language', languageSchema);

module.exports = {
    Language: Language
};