const express = require('express');
const router = express.Router();

const comment_controller = require('../controllers/commentController');
const blog_controller = require('../controllers/blogController');

// HANDLES PUBLICALLY VIEWABLE BLOG
router.get('/', (req, res) => {
    res.json({
        message: 'blog front page!'
    })
})

router.get('/post/:id',                 comment_controller.comment_list);
router.post('/post/:id/create-comment', comment_controller.create_comment);


module.exports = router;