"use strict"
const express = require("express");
const validator = require("express-validator");
const ControllerCategory = require("../../controller/controller-category");
const MiddlewareException = require("../../middleware/middleware-exception");
const router = express.Router();

router.post('/', [
    validator
    .check("title").notEmpty()
    .withMessage("Title not empty"),

    validator
    .check("description").notEmpty()
    .withMessage("Description not empty"),
], MiddlewareException.except(ControllerCategory.createCategory));

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
], MiddlewareException.except(ControllerCategory.updateCategory));

router.delete('/',[
    validator
    .check("id").notEmpty()
    .withMessage("Id not empty"),
], MiddlewareException.except(ControllerCategory.deleteCategry));

module.exports = router;