var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var challengeSchema = new Schema({
    name: String,
    slug: String,
    description: String,
    languages: Schema.Types.Mixed,
    created: {type: Date, default: Date.now}
});

var Challenge = mongoose.model('Challenge', challengeSchema);

module.exports = {
    Challenge: Challenge
};