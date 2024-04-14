"use strict"
const express = require('express');
const validator = require("express-validator");
const ControllerCommonAccess = require("../../controller/common/controller-common-access");
const MiddlewareException = require("../../middleware/middleware-exception");
const router = express.Router();

router.post('/signup',[
    validator
    .check("fullName")
    .notEmpty()
    .withMessage("User name not empty"),
    
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
    }),
    
    validator
    .check("phone")
    .isLength({ min: 9, max: 12 })
    .withMessage("Length of phone number from 9 - 12. and is number")
    .isMobilePhone()
    .withMessage("Your input is not type of phone number"),
    
    validator
    .check("address")
    .notEmpty()
    .withMessage("Address not empty"),
], MiddlewareException.except(ControllerCommonAccess.signup));

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

], MiddlewareException.except(ControllerCommonAccess.signin));

router.post('/signout',[
    validator
    .check("email")
    .notEmpty()
    .withMessage("E-mail not empty")
    .isEmail()
    .withMessage("E-mail invalid"),
], MiddlewareException.except(ControllerCommonAccess.signout));

module.exports = router;
