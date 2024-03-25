"use strict"
const express = require("express");
const ControllerCategory = require("../../controller/controller-category");
const router = express.Router();

router.get('/amount', ControllerCategory.getAmount);
router.get("/all", ControllerCategory.getAllCategory);
router.get("/:id", ControllerCategory.getCategoryById);


module.exports = router;