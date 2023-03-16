const express = require('express');
const router = express.Router();

// ONLY BLOG ADMIN CAN ACCESS
const blog_post_controller = require('../controllers/blogPostController');
const blog_controller = require('../controllers/blogController');
const comment_controller = require('../controllers/commentController');

router.post('/',                     blog_controller.all_posts_list   );
router.get ('/post/:id',             blog_controller.single_post_all  );
router.post('/post/create',          blog_post_controller.create_post );
router.get ('/post/:id/update',      blog_post_controller.update_get  );
router.post('/post/:id/update',      blog_post_controller.update_post );
router.post('/post/:id/delete',      blog_post_controller.delete_post );
router.post('/post/:id/:cid/delete', comment_controller.delete_comment);

module.exports = router;