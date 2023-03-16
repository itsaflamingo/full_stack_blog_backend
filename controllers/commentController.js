const Comment = require('../models/comment');
const BlogPost = require('../models/blog_post');
const { body, validationResult } = require('express-validator');

exports.comment_list = (req, res, next) => {
    Comment.find({ blogPost: req.params.id }, 'name body date')
        .sort({ date: 1 })
        .exec()
            .then(result => res.json(result))
            .catch(err => next(err))
}

exports.create_comment = [
    // Sanitize
    body('name', 'Name must not be empty.')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('body', 'Body must not be empty.')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    (req, res, next) => {
        // Get blog post ID from params
        // Find blog post by ID 
        BlogPost.findById(req.params.id)
            .exec()
            .then(blogpost => {
                if(!blogpost) {
                    const err = new Error('Blog post not found');
                    err.status = 404;
                    return next(err);
                }

                // Create new comment object with sanitized data
                const comment = new Comment({
                    name:     req.body.name,
                    body:     req.body.body,
                    blogPost: blogpost._id
                })

                // Extract validation errors from request
                const errors = validationResult(req);
    
                // Handle errors
                if(!errors.isEmpty()) {
                    return errors;
                }
                // Data from form is valid, save comment
                comment.save()
                    .then(results => {
                        res.json({
                            name: results.name,
                            body: results.body,
                            date: results.date_formatted
                        })
                    })
            })
            .catch(err => {
                if(err) return next(err);
            })
}]

exports.delete_comment = (req, res, next) => {
    Comment.findByIdAndDelete(req.params.cid)
        .then(comment => {
            if(!comment) {
                return res.status(404).json({ message: 'Comment not found' })
            }
            res.json({ message: 'Comment deleted successfully' });
        })
        .catch(err => next(err));
}

