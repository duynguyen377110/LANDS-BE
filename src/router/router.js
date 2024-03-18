"use strict"
const express = require('express');
const router = express.Router();
const CommonRouterAccess = require("./common/common-router-access");

router.use('/common-access', CommonRouterAccess);

module.exports = router;