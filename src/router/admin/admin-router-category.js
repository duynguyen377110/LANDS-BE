"use strict"
const express = require("express");
const validator = require("express-validator");
const ControllerAdminCategory = require("../../controller/admin/controller-admin-category");
const MiddlewareException = require("../../middleware/middleware-exception");
const router = express.Router();

router.post('/', [
    validator
    .check("title").notEmpty()
    .withMessage("Title not empty"),

    validator
    .check("description").notEmpty()
    .withMessage("Description not empty"),
], MiddlewareException.except(ControllerAdminCategory.createCategory));

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
], MiddlewareException.except(ControllerAdminCategory.updateCategory));

router.delete('/',[
    validator
    .check("id").notEmpty()
    .withMessage("Id not empty"),
], MiddlewareException.except(ControllerAdminCategory.deleteCategry));

module.exports = router;