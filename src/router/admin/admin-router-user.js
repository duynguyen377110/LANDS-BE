'use strict'
const express = require("express");
const validator = require("express-validator");
const ControllerAdminUser = require("../../controller/admin/controller-admin-user");
const MiddlewareException = require("../../middleware/middleware-exception");
const router = express.Router();

router.post("/", [
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

    validator
    .check("role")
    .notEmpty()
    .withMessage("User role not empty")

], MiddlewareException.except(ControllerAdminUser.createUser));

router.patch("/",[
    validator
    .check("id")
    .notEmpty()
    .withMessage("User token not empty"),

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
    .check("phone")
    .isLength({ min: 9, max: 12 })
    .withMessage("Length of phone number from 9 - 12. and is number")
    .isMobilePhone()
    .withMessage("Your input is not type of phone number"),

    validator
    .check("address")
    .notEmpty()
    .withMessage("Address not empty"),

    validator
    .check("role")
    .notEmpty()
    .withMessage("User role not empty")
], MiddlewareException.except(ControllerAdminUser.updateUser));

router.delete("/",[
    validator
    .check("id")
    .notEmpty()
    .withMessage("User token not empty"),
], MiddlewareException.except(ControllerAdminUser.deleteUser));

module.exports = router;