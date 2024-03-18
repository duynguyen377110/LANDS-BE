"use strict"
const express = require('express');
const router = express.Router();

router.get('/example', (req, res, next) => {
  console.log('Has request');
    return res.status(200).json({status: true, message: 'This is the response from /example'});
})

// Routes
router.get('/api/users', (req, res) => {
    return res.json([{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]);
});

module.exports = router;