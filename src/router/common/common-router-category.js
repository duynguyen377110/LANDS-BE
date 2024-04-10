"use strict"
const express = require("express");
const ControllerCommonCategory = require("../../controller/common/controller-common-category");
const MiddlewareException = require("../../middleware/middleware-exception");
const router = express.Router();

router.get('/amount', MiddlewareException.except(ControllerCommonCategory.getAmount));
router.get("/all", MiddlewareException.except(ControllerCommonCategory.getAllCategory));
router.get("/:id", MiddlewareException.except(ControllerCommonCategory.getCategoryById));


module.exports = router;