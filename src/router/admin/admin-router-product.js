"use strict"
const express = require("express");
const ControllerAdminProduct = require("../../controller/admin/controller-admin-product");
const MiddlewareException = require("../../middleware/middleware-exception");
const router = express.Router();

router.post("/", MiddlewareException.except(ControllerAdminProduct.createProduct));
router.patch("/", MiddlewareException.except(ControllerAdminProduct.updateProduct));
router.delete('/', MiddlewareException.except(ControllerAdminProduct.deleteProduct));

module.exports = router;