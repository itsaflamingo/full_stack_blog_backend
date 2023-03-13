const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    title:    { type: String, required: true },
    body:     { type: String, required: true },
    date:     { type: Date, default: Date.now, required: true },
})

// 
BlogPostSchema.virtual('url').get(function() {
    return `/blog/post/${this._id}`;
})

module.exports = mongoose.model('BlogPost', BlogPostSchema);