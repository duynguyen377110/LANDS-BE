"use strict"
const express = require('express');
const multer = require("multer");
const UtilCloudinary = require("../utils/util-cloudinary");
const router = express.Router();
const CommonRouterAccess = require("./common/common-router-access");

// ACCESS
const AdminRouterAccess = require("./admin/admin-router-access");
router.use("/admin/access", AdminRouterAccess);
router.use('/common/access', CommonRouterAccess);

// ROLE
const AdminRouterRole = require("./admin/admin-router-role");
const CommonRouterRole = require("./common/common-router-role");
router.use('/admin/role', AdminRouterRole);
router.use('/common/role', CommonRouterRole);

// USER
const AdminRouterUser = require("./admin/admin-router-user");
const CommonRouterUser = require("./common/common-router-user");
router.use("/admin/user", AdminRouterUser);
router.use("/common/user", CommonRouterUser);

// CATEGORY
const CommonRouterCategory = require("./common/common-router-category");
const AdminRouterCategory = require("./admin/admin-router-category");
const MobileRouterCategory = require("./mobile/mobile-router-category");

router.use("/common/category", CommonRouterCategory);
router.use('/admin/category',
    multer({storage: UtilCloudinary.configStorage('categories')}).any('photos'),
    AdminRouterCategory);
router.use('/mobile/category', MobileRouterCategory);

// PRODUCT
const CommonRouterProduct = require("./common/common-router-product");
const AdminRouterProduct = require("./admin/admin-router-product");

router.use("/common/product", CommonRouterProduct);
router.use('/admin/product',
    multer({storage: UtilCloudinary.configStorage('products')}).any('photos'),
    AdminRouterProduct);


// router.use((error, req, res, next) => {
//     return res.status(500).json({status: false, message: 'Internal server failed'});
// })

// router.use((req, res, next) => {
//     return res.status(404).json({status: false, message: 'Not found request'});
// })

module.exports = router;