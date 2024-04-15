"use strict";
const express = require("express");
const validator = require("express-validator");
const ControllerAdminAccess = require("../../controller/admin/controller-admin-access");
const MiddlewareException = require("../../middleware/middleware-exception");
const MiddlewareVerify = require("../../middleware/middleware-verify");
const MiddlewareAuth = require("../../middleware/middleware-auth");
const router = express.Router();

router.post("/signin", [
    validator
    .check("email")
    .notEmpty()
    .withMessage("E-mail not empty")
    .isEmail()
    .withMessage("E-mail invalid"),

    validator
    .check("password")
    .notEmpty()
    .withMessage("Password not empty")
    .isLength({ min: 6, max: 9 })
    .withMessage("Length of password from 6-9 character.")
    .custom((value) => {
        if (!value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/)) {
            throw new Error("Password have to contain upper case, lower case & number");
        }
        return true;
    })

],
MiddlewareException.except(MiddlewareVerify.userExist),
MiddlewareException.except(MiddlewareAuth.permission),
MiddlewareException.except(ControllerAdminAccess.adminSignin));

router.post("/signout",[
    validator
    .check("email")
    .notEmpty()
    .withMessage("E-mail not empty")
    .isEmail()
    .withMessage("E-mail invalid"),
], MiddlewareException.except(ControllerAdminAccess.adminSignout));

module.exports = router;