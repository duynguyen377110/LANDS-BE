"use strict"
const express = require("express");
const ControllerProduct = require("../../controller/controller-product");
const router = express.Router();

router.get("/all", ControllerProduct.getAll);
router.get("/:id", ControllerProduct.getProductById);

module.exports = router;