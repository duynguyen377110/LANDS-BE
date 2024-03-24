"use strict"
const express = require("express");
const ControllerCategory = require("../../controller/controller-category");
const router = express.Router();

router.get("/all", ControllerCategory.getAllCategory);


module.exports = router;