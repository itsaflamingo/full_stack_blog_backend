const BlogPost = require('../models/blog_post');

const { body, validationResult } = require('express-validator');
const async = require("async");

// POST request for blog backend
exports.create_post = [
    // Sanitize and trim
    body('title', 'Title must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
    body('body', 'Body must not be empty')
    .trim()
    .isLength({ min: 1 })
    .escape(),
    (req, res, next) => {
        // Extract validation errors from request
        const errors = validationResult(req);

        // Create new blog post object with sanitized and trimmed data
        const blogPost = new BlogPost({
            title:     req.body.title,
            body:      req.body.body,
            published: req.body.published
        })
        // Handle errors - if errors array is not empty
        if(!errors.isEmpty()) {
            // Return error
            return errors;
        }
        // Data from form is valid, save blog post
        blogPost.save()
            .then(results => {
                res.json({
                    title:     results.title,
                    body:      results.body,
                    published: results.published,
                    date:      results.date_formatted
                })
            })
            .catch(err => {
                return next(err);
            })
}]

exports.update_get = (req, res, next) => {
    // Async functions that execute sequentially 
    async.waterfall([
        // Get selected blog post by id in parameter
        function (callback) {
          BlogPost.findById(req.params.id)
            .then(blog_post => {
            callback(null, blog_post);
          }).catch(err => {
            callback(err);
          });
        },
        function (blog_post, callback) {
          if (blog_post === null) {
            const err = new Error('Blog post not found');
            err.status = 404;
            return callback(err);
          }
          callback(null, blog_post);
        }
      ],
      function (err, results) {
        if (err) return next(err);
        res.json({
          title:     results.title,
          body:      results.body,
          published: results.published,
          date:      results.date_formatted
        });
      }
    )}

exports.update_post = [
    // Validate and sanitize fields
    body('title', 'Title must not be empty.')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('body', 'Body must not be empty')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    // Process request
    (req, res, next) => {
        // Extract validation errors from request
        const errors = validationResult(req);
        
        // If errors array is not empty, handle error
        if(!errors.isEmpty()) {
            const err = new Error('Blog post not found');
            err.status = 404;
            return next(err);
        }
        // Otherwise save updated post and update record
        BlogPost.findOneAndUpdate({ _id: req.params.id }, { $set: {
            title:     req.body.title, 
            body:      req.body.body, 
            published: true, 
            _id:       req.params.id 
        }}, { new: true })
            .then(blogpost => {
                // blog post not found
                if(!blogpost) {
                    return res.status(404).json({ message: 'Blog post not found' });
                }
                // Successful: send updated book as json object
                res.json({
                    title: blogpost.title,
                    body:  blogpost.body,
                    date:  blogpost.date_formatted,
                    _id:   blogpost._id
                })
            })
            .catch(err => next(err))
    }]

exports.delete_post = (req, res, next) => {
    BlogPost.findByIdAndDelete(req.params.id)
        .then(blogpost => {
            if(!blogpost) {
                return res.status(404).json({ message: 'Blog post not found' });
            }
            res.json({ message: 'Blog post deleted successfully' });
        })
        .catch(err => next(err))
}
