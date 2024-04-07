"use strict"
const express = require("express");
const validator = require("express-validator");
const ControllerRole = require("../../controller/controller-role");
const router = express.Router();
const MiddlewareException = require("../../middleware/middleware-exception");

router.post("/" ,[
    validator
    .check("title")
    .notEmpty()
    .withMessage("Title not empty"),
], MiddlewareException.except(ControllerRole.createRole));

router.patch("/",[
    validator
    .check("id").notEmpty()
    .withMessage("Id not empty"),

    validator
    .check("title").notEmpty()
    .withMessage("Title not empty"),
], MiddlewareException.except(ControllerRole.updateRole));


router.delete('/',[
    validator
    .check("id").notEmpty()
    .withMessage("Id not empty"),

], MiddlewareException.except(ControllerRole.deleteRole));

module.exports = router;