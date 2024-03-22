"use strict"
const express = require('express');
const router = express.Router();
const CommonRouterAccess = require("./common/common-router-access");
const AdminRouterCategory = require("./admin/router-category");
const MobileRouterCategory = require("./mobile/router-category");

router.use('/common-access', CommonRouterAccess);
router.use('/admin/category', AdminRouterCategory);
router.use('/mobile/category', MobileRouterCategory);

// router.use((error, req, res, next) => {
//     return res.status(500).json({status: false, message: 'Internal server failed'});
// })

// router.use((req, res, next) => {
//     return res.status(404).json({status: false, message: 'Not found request'});
// })

module.exports = router;