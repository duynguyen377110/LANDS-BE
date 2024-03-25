"use strict"
const express = require('express');
const router = express.Router();
const CommonRouterAccess = require("./common/common-router-access");

// CATEGORY
const CommonRouterCategory = require("./common/common-router-category");
const AdminRouterCategory = require("./admin/admin-router-category");
const MobileRouterCategory = require("./mobile/mobile-router-category");

router.use('/common-access', CommonRouterAccess);

// CATEGORY
router.use("/common/category", CommonRouterCategory);
router.use('/admin/category', AdminRouterCategory);
router.use('/mobile/category', MobileRouterCategory);

// router.use((error, req, res, next) => {
//     return res.status(500).json({status: false, message: 'Internal server failed'});
// })

// router.use((req, res, next) => {
//     return res.status(404).json({status: false, message: 'Not found request'});
// })

module.exports = router;