"use strict"
const express = require("express");
const routerRole = require("./common-router-role");
const routerUser = require("./common-router-user");
const routerCategory = require("./common-router-category");
const routerProduct = require("./common-router-product");
const router = express.Router();

router.use("/role", routerRole);
router.use("/user", routerUser);
router.use("/category", routerCategory);
router.use("/product", routerProduct);

module.exports = router;