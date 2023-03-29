const express = require('express');
const router = express.Router();

// HANDLES PUBLICALLY VIEWABLE BLOG
const comment_controller   = require('../controllers/commentController' );
const blog_controller      = require('../controllers/blogController'    );
const blog_info_controller = require('../controllers/blogInfoController');

router.get ('/',                                  blog_controller.published_list   );
router.get ('/description',                       blog_info_controller.blog_info   );
router.get ('/post/:id',                          blog_controller.single_post      );
router.get ('/post/:id/comments',                 comment_controller.comment_list  );
router.post('/post/:id/comments/create-comment',  comment_controller.create_comment);

module.exports = router;