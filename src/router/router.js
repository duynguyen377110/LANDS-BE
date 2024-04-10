"use strict"
const express = require('express');
const multer = require("multer");
const UtilCloudinary = require("../utils/util-cloudinary");
const CommonRouterAccess = require("./common/common-router-access");
const router = express.Router();

// ACCESS
const AdminRouterAccess = require("./admin/admin-router-access");
router.use("/admin/access", AdminRouterAccess);
router.use('/common/access', CommonRouterAccess);

// ROLE
const CommonRouterRole = require("./common/common-router-role");
router.use('/common/role', CommonRouterRole);

// USER
// const AdminRouterUser = require("./admin/admin-router-user");
const CommonRouterUser = require("./common/common-router-user");
// router.use("/admin/user", AdminRouterUser);
router.use("/common/user", CommonRouterUser);

// CATEGORY
const CommonRouterCategory = require("./common/common-router-category");
const MobileRouterCategory = require("./mobile/mobile-router-category");

router.use("/common/category", CommonRouterCategory);
router.use('/mobile/category', MobileRouterCategory);

// PRODUCT
const CommonRouterProduct = require("./common/common-router-product");
router.use("/common/product", CommonRouterProduct);

module.exports = router;