const express = require('express');
const router = express.Router();

// HANDLES PUBLICALLY VIEWABLE BLOG
router.get('/', (req, res) => {
    res.json({
        message: 'blog front page!'
    })
})


module.exports = router;