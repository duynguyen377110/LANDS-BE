"use strict"
const express = require("express");
const ControllerProduct = require("../../controller/controller-product");
const router = express.Router();

router.post("/", ControllerProduct.createProduct);
router.patch("/", ControllerProduct.updateProduct);
router.delete('/', ControllerProduct.deleteProductThumb);

module.exports = router;