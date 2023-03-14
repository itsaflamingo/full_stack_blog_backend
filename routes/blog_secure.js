const express = require('express');
const router = express.Router();

const blog_post_controller = require('../controllers/blogPostController');

router.post('/post/create', blog_post_controller.create_post);
router.post('/post/update', blog_post_controller.update_post);
router.post('/post/delete', blog_post_controller.delete_post);

module.exports = router;