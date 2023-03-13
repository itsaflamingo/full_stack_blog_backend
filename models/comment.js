const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    name:     { type: String, required: true },
    body:     { type: String, required: true },
    date:     { type: Date, default: Date.now, required: true },
    blogPost: { type: Schema.Types.ObjectId, ref: 'BlogPost', required: true }
})

module.exports = mongoose.model('Comment', CommentSchema);