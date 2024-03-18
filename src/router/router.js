"use strict"
const router = require('express').Router();

router.get('/', (req, res, next) => {
    return res.status(200).json({status: true, message: 'User true'});
})

// Routes
router.get('/api/users', (req, res) => {
    res.json([{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]);
  });

module.exports = router;