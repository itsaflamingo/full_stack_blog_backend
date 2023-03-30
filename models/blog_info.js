const mongoose = require('mongoose');
const he = require('he');

const Schema = mongoose.Schema;

const BlogInfoSchema = new Schema({
    picture:      { type: String, required: true },
    description:  { type: String, required: true },
});

// Middleware to decode the picture URL before saving the document
BlogInfoSchema.pre('save', function (next) {
    // Check if the picture field has been modified
    if (this.isModified('picture')) {
      // Decode the URL using the he library
      this.picture = he.decode(this.picture);
    }
    // Call the next middleware
    next();
  });

// Add virtual. Use function() to access 'this'.
BlogInfoSchema.virtual('url').get(function() {
    return `/description/${this._id}`;
});

module.exports = mongoose.model('BlogInfo', BlogInfoSchema);