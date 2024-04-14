"use strict"
const express = require('express');
const validator = require("express-validator");
const ControllerCommonAccess = require("../../controller/common/controller-common-access");
const MiddlewareException = require("../../middleware/middleware-exception");
const router = express.Router();

router.post('/signup', MiddlewareException.except(ControllerCommonAccess.signup));
router.post('/signout',[
    validator
    .check("email")
    .notEmpty()
    .withMessage("E-mail not empty")
    .isEmail()
    .withMessage("E-mail invalid"),
], MiddlewareException.except(ControllerCommonAccess.signout));

module.exports = router;
