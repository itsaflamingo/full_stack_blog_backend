const BlogInfo = require('../models/blog_info')

const { body, validationResult } = require('express-validator');

exports.blog_info = (req, res, next) => {
    BlogInfo.find({})
        .exec()
            .then(result => res.json(result))
            .catch(err => next(err))
}

exports.create_blog_info = [
    // Sanitize and trim
    body('picture', 'Picture must not be empty.')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('description', 'Description must not be empty')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    (req, res, next) => {
        // Extract validation errors from request
        const errors = validationResult(req);

        // Create new blog post object with sanitized and trimmed data
        const blogInfo = new BlogInfo({
            picture:     req.body.picture,
            description: req.body.description,
        })
        // Handle errors - if errors array is not empty
        if(!errors.isEmpty()) {
            // Return error
            return errors;
        }
        // Data from form is valid, save blog post and return as json
        blogInfo.save()
            .then(results => {
                res.json({
                    picture:     results.picture,
                    description: results.description,
                })
            })
            .catch(err => {
                return next(err);
            })
}]

exports.edit_blog_info = [
    // Sanitize and trim
    body('picture', 'Picture must not be empty.')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('description', 'Description must not be empty')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        
        // If errors array is not empty, handle error
        if(!errors.isEmpty()) {
            const err = new Error('Description post not found');
            err.status = 404;
            return next(err);
        }
        // Otherwise save updated post and update record
        BlogInfo.findOneAndUpdate({ _id: req.params.id }, {$set: {
            picture:     req.body.picture, 
            description: req.body.description, 
            _id:         req.params.id 
        }}, { new: true })
            .then(bloginfo => {
                // blog post not found
                if(!bloginfo) {
                    return res.status(404).json({ message: 'Blog info not found' });
                }
                // Successful: send updated book as json object
                res.json({
                    picture:     bloginfo.picture,
                    description: bloginfo.description,
                    _id:         bloginfo._id
                })
            })
            .catch(err => next(err))
    }]