"use strict"
const express = require("express");
const ControllerCategory = require("../../controller/controller-category");
const router = express.Router();

router.post('/new', ControllerCategory.createCategory);

module.exports = router;