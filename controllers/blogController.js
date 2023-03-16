const BlogPost = require('../models/blog_post');

// VIEW POSTS 
// View all published posts
exports.published_list = (req, res, next) => {
    BlogPost.find({ published: true }, 'title body date')
        .sort({ date: 1 })
        .exec()
            .then(result => res.json(result))
            .catch(err => next(err))
}
// View all published and unpublished posts
exports.all_posts_list = (req, res, next) => {
    BlogPost.find({}, 'title body date')
        .sort({ date: 1 })
        .exec()
            .then(result => res.json(result))
            .catch(err => next(err))
}
// View single published post
exports.single_post = (req, res, next) => {
    BlogPost.find({ _id: req.params.id, published: true }, 'title body date')
        .exec()
            .then(result => res.json(result))
            .catch(err => next(err))
}
// View single published & unpublished post
exports.single_post_all = (req, res, next) => {
    BlogPost.find({ _id: req.params.id }, 'title body date')
        .exec()
            .then(result => res.json(result))
            .catch(err => next(err))
}