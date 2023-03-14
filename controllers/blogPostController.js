const BlogPost = require('../models/blog_post');

const { body, validationResult } = require('express-validator');
const async = require("async");

// POST request for blog backend
exports.create_post = [
    // sanitize and trim
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
                    published: results.published
                })
            })
            .catch(err => {
                return next(err);
            })
}]

exports.update_get = (req, res, next) => {
    async.waterfall([
        function (callback) {
          const query = BlogPost.findById(req.params.id);
          query.then((blog_post) => {
            callback(null, blog_post);
          }).catch((err) => {
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
        },
      ],
      function (err, results) {
        if (err) return next(err);
        res.json({
          title: results.title,
          body: results.body,
          published: results.published,
        });
      }
    );
  };
  
exports.update_post = (req, res, next) => {
    res.json({
        message: 'update post'
    })
}
exports.delete_post = (req, res, next) => {
    res.json({
        message: 'You deleted a blog post!'
    })
}
