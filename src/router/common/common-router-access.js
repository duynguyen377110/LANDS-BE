"use strict"
const express = require('express');
const router = express.Router();

router.post('/signup', (req, res, next) => {
    console.log(req.body);
    return res.status(200).json({status: true, message: 'This is the response from bro layer /example'});
})

module.exports = router;
