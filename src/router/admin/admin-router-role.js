"use strict"
const express = require("express");
const validator = require("express-validator");
const ControllerAdminRole = require("../../controller/admin/controller-admin-role");
const router = express.Router();
const MiddlewareException = require("../../middleware/middleware-exception");

router.post("/" ,[
    validator
    .check("title")
    .notEmpty()
    .withMessage("Title not empty"),
], MiddlewareException.except(ControllerAdminRole.createRole));

router.patch("/",[
    validator
    .check("id").notEmpty()
    .withMessage("Id not empty"),

    validator
    .check("title").notEmpty()
    .withMessage("Title not empty"),
], MiddlewareException.except(ControllerAdminRole.updateRole));


router.delete('/',[
    validator
    .check("id").notEmpty()
    .withMessage("Id not empty"),

], MiddlewareException.except(ControllerAdminRole.deleteRole));

module.exports = router;