const mongoose = require('mongoose');
const he = require('he');

const Schema = mongoose.Schema;

const BlogInfoSchema = new Schema({
    picture:      { type: String, required: true },
    description:  { type: String, required: true },
});

// Setter function for picture field, called whenever value is set for the field
BlogInfoSchema.path('picture').set(function (url) {
    return he.decode(url);
  });  

// Add virtual. Use function() to access 'this'.
BlogInfoSchema.virtual('url').get(function() {
    return `/description/${this._id}`;
});

module.exports = mongoose.model('BlogInfo', BlogInfoSchema);