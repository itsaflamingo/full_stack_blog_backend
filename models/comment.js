const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    name:     { type: String, required: true },
    body:     { type: String, required: true },
    date:     { type: Date, default: Date.now, required: true },
    blogPost: { type: Schema.Types.ObjectId, ref: 'BlogPost', required: true }
})

// Add virtual. Use function() to access 'this'.
CommentSchema.virtual('cid').get(function() {
    return this._id;
})

CommentSchema.virtual('url').get(function() {
    return `/blog/post/${this.blogPost._id}/${this.cid}`;
})

module.exports = mongoose.model('Comment', CommentSchema);