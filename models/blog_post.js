const mongoose = require('mongoose');
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    title:      { type: String, required: true },
    body:       { type: String, required: true },
    published:  { type: Boolean, required: true },
    date:       { type: Date, default: Date.now, required: true },
}, {
    toObject:   { virtuals: true },
    toJSON:     { virtuals: true }
})

BlogPostSchema.virtual('date_formatted').get(function() {
    return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATE_MED);
})

// Add virtual. Use function() to access 'this'.
BlogPostSchema.virtual('url').get(function() {
    return `/blog/post/${this._id}`;
})

module.exports = mongoose.model('BlogPost', BlogPostSchema);