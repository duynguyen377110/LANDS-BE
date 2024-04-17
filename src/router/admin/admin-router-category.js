"use strict"
const express = require("express");
const validator = require("express-validator");
const ControllerAdminCategory = require("../../controller/admin/controller-admin-category");
const MiddlewareException = require("../../middleware/middleware-exception");
const MiddlewareVerify = require("../../middleware/middleware-verify");
const MiddlewareAuth = require("../../middleware/middleware-auth");
const router = express.Router();

router.post('/', [
    validator
    .check("title").notEmpty()
    .withMessage("Title not empty"),

    validator
    .check("description").notEmpty()
    .withMessage("Description not empty"),
],
    MiddlewareException.except(MiddlewareVerify.adminBody),
    MiddlewareException.except(MiddlewareAuth.permission),
    MiddlewareException.except(ControllerAdminCategory.createCategory));

router.patch('/',[
    validator
    .check("id").notEmpty()
    .withMessage("Id not empty"),

    validator
    .check("title").notEmpty()
    .withMessage("Title not empty"),

    validator
    .check("description").notEmpty()
    .withMessage("Description not empty"),
],
    MiddlewareException.except(MiddlewareVerify.adminBody),
    MiddlewareException.except(MiddlewareAuth.permission),
    MiddlewareException.except(ControllerAdminCategory.updateCategory));

router.delete('/',[
    validator
    .check("id").notEmpty()
    .withMessage("Id not empty"),
],
    MiddlewareException.except(MiddlewareVerify.adminHeader),
    MiddlewareException.except(MiddlewareAuth.permission),
    MiddlewareException.except(ControllerAdminCategory.deleteCategry));

module.exports = router;