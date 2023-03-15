const Comment = require('../models/comment');
const BlogPost = require('../models/blog_post');
const { body, validationResult } = require('express-validator');

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
                            body: results.body
                        })
                    })
            })
            .catch(err => {
                if(err) return next(err);
            })
}]

