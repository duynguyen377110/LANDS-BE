"use strict"
const express = require("express");
const ControllerCategory = require("../../controller/controller-category");
const router = express.Router();

router.post('/', ControllerCategory.uploadCategoryThumb);
router.patch('/', ControllerCategory.uploadCategoryThumb);
router.delete('/', ControllerCategory.deleteCategoryThumb);

module.exports = router;