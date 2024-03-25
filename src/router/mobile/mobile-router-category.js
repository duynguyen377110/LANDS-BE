"use strict"
const express = require('express');
const router = express.Router();
const ControllerCategory = require("../../controller/controller-category");

router.get('/', ControllerCategory.getAllCategory);

module.exports = router;