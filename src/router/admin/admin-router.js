"use strict"
const express = require("express");
const multer = require("multer");
const UtilCloudinary = require("../../utils/util-cloudinary");
const routerAccess = require("./admin-router-access");
const routerRole = require("./admin-router-role");
const routerUser = require("./admin-router-user");
const routerCategory = require("./admin-router-category");
const routerProduct = require("./admin-router-product");
const router = express.Router();

router.use("/access", routerAccess);
router.use('/role', routerRole);
router.use("/user", routerUser);

router.use("/category",
    multer({storage: UtilCloudinary.configStorage('categories')}).any('photos'),
    routerCategory);

router.use("/product",
    multer({storage: UtilCloudinary.configStorage('products')}).any('photos'),
    routerProduct);

module.exports = router;