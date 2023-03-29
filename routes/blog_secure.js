const express = require('express');
const router = express.Router();

// ONLY BLOG ADMIN CAN ACCESS
const blog_post_controller = require('../controllers/blogPostController');
const blog_controller      = require('../controllers/blogController'    );
const comment_controller   = require('../controllers/commentController' );
const blog_info_controller = require('../controllers/blogInfoController');

router.get  ('/',                     blog_controller.all_posts_list       );
router.get  ('/post/:id',             blog_controller.single_post_all      );
router.post ('/post/create',          blog_post_controller.create_post     );
router.get  ('/post/:id/update',      blog_post_controller.update_get      );
router.patch('/post/:id/update',      blog_post_controller.update_post     );
router.post ('/post/:id/delete',      blog_post_controller.delete_post     );
router.post ('/post/:id/:cid/delete', comment_controller.delete_comment    );
router.post ('/description',          blog_info_controller.create_blog_info);
router.get  ('/description',          blog_info_controller.blog_info       );
router.patch('/description/:id',      blog_info_controller.edit_blog_info  );

module.exports = router;