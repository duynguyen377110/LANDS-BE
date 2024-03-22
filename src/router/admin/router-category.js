"use strict"
const express = require("express");
const ControllerCategory = require("../../controller/controller-category");
const router = express.Router();

router.post('/new', (req, res, next) => {
    console.log('New category');
    return res.status(200).json({status: true, message: 'New category'});
});

module.exports = router;