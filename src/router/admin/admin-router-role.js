"use strict"
const express = require("express");
const validator = require("express-validator");
const ControllerAdminRole = require("../../controller/admin/controller-admin-role");
const MiddlewareException = require("../../middleware/middleware-exception");
const MiddlewareVerify = require("../../middleware/middleware-verify");
const MiddlewareAuth = require("../../middleware/middleware-auth");
const router = express.Router();

router.post("/" ,[
    validator
    .check("title")
    .notEmpty()
    .withMessage("Title not empty"),

    validator
    .check("slug")
    .notEmpty()
    .withMessage("Slug not empty"),
],
    MiddlewareException.except(MiddlewareVerify.adminHeader),
    MiddlewareException.except(MiddlewareAuth.permission),
    MiddlewareException.except(ControllerAdminRole.createRole));

router.patch("/",[
    validator
    .check("id").notEmpty()
    .withMessage("Id not empty"),

    validator
    .check("title").notEmpty()
    .withMessage("Title not empty"),

    validator
    .check("slug")
    .notEmpty()
    .withMessage("Slug not empty"),
],
    MiddlewareException.except(MiddlewareVerify.adminHeader),
    MiddlewareException.except(MiddlewareAuth.permission),
    MiddlewareException.except(ControllerAdminRole.updateRole));


router.delete('/',[
    validator
    .check("id").notEmpty()
    .withMessage("Id not empty"),

],
    MiddlewareException.except(MiddlewareVerify.adminHeader),
    MiddlewareException.except(MiddlewareAuth.permission),
    MiddlewareException.except(ControllerAdminRole.deleteRole));

module.exports = router;