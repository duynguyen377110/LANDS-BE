"use strict"
const express = require("express");
const ControllerProduct = require("../../controller/controller-product");
const router = express.Router();

router.post("/", ControllerProduct.createProduct);

module.exports = router;