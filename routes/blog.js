const express = require('express');
const router = express.Router();

// HANDLES PUBLICALLY VIEWABLE BLOG
router.get('/', (req, res) => {
    res.json({
        message: 'blog front page!'
    })
})

const comment_controller = require('../controllers/commentController');

router.post('/post/:id/create-comment', comment_controller.create_comment);

module.exports = router;