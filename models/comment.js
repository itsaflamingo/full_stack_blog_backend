const mongoose = require('mongoose');
const { DateTime } = require("luxon");
const he = require('he');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    name:     { type: String, required: true },
    body:     { type: String, required: true },
    date:     { type: Date, default: Date.now, required: true },
    blogPost: { type: Schema.Types.ObjectId, ref: 'BlogPost', required: true }
}, {
    toObject: { virtuals: true },
    toJSON:   { virtuals: true }
});

CommentSchema.path('body').set(function (body) {
    return he.decode(body);
  });  

CommentSchema.path('name').set(function (name) {
  return he.decode(name);
});  

CommentSchema.virtual('date_formatted').get(function() {
    return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATE_MED);
});

// Add virtual. Use function() to access 'this'.
CommentSchema.virtual('cid').get(function() {
    return this._id;
});

CommentSchema.virtual('url').get(function() {
    return `/blog/post/${this.blogPost._id}/${this.cid}`;
});

module.exports = mongoose.model('Comment', CommentSchema);