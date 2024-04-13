"use strict"
const express = require('express');
const ControllerCommonAccess = require("../../controller/common/controller-common-access");
const router = express.Router();

router.post('/signup', ControllerCommonAccess.signup);

module.exports = router;
