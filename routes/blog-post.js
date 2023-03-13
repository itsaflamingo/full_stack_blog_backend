const express = require('express');
const router = express.Router();

router.post('/create', (req, res, next) => {
    
})

router.post('/update', (req, res, next) => {
    res.json({
        message: 'You updated a blog post!'
    })
})

router.post('/delete', (req, res, next) => {
    res.json({
        message: 'You deleted a blog post!'
    })
})

module.exports = router;