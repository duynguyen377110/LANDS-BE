"use strict"
const express = require("express");
const ControllerProduct = require("../../controller/controller-product");
const MiddlewareException = require("../../middleware/middleware-exception");
const router = express.Router();

router.post("/", MiddlewareException.except(ControllerProduct.uploadProductThumb));
router.patch("/", MiddlewareException.except(ControllerProduct.uploadProductThumb));
router.delete('/', MiddlewareException.except(ControllerProduct.deleteProductThumb));

module.exports = router;