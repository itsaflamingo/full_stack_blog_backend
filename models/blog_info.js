const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BlogInfoSchema = new Schema({
    picture:      { type: String, required: true },
    description:  { type: String, required: true },
});

// Add virtual. Use function() to access 'this'.
BlogInfoSchema.virtual('url').get(function() {
    return `/description/${this._id}`;
});

module.exports = mongoose.model('BlogInfo', BlogInfoSchema);