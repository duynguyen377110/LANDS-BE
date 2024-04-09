"use strict"
const express = require("express");
const ControllerCategory = require("../../controller/controller-category");
const MiddlewareException = require("../../middleware/middleware-exception");
const router = express.Router();

router.post('/', MiddlewareException.except(ControllerCategory.createCategory));
router.patch('/', MiddlewareException.except(ControllerCategory.uploadCategoryThumb));
router.delete('/', MiddlewareException.except(ControllerCategory.deleteCategoryThumb));

module.exports = router;