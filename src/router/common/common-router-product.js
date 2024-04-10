"use strict"
const express = require("express");
const ControllerCommonProduct = require("../../controller/common/controller-common-product");
const MiddlewareException = require("../../middleware/middleware-exception");
const router = express.Router();

router.get("/all", MiddlewareException.except(ControllerCommonProduct.getAll));
router.get("/:id", MiddlewareException.except(ControllerCommonProduct.getProductById));

module.exports = router;