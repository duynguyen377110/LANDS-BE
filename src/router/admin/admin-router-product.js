"use strict"
const express = require("express");
const validator = require("express-validator");
const ControllerAdminProduct = require("../../controller/admin/controller-admin-product");
const MiddlewareException = require("../../middleware/middleware-exception");
const MiddlewareVerify = require("../../middleware/middleware-verify");
const MiddlewareAuth = require("../../middleware/middleware-auth");
const router = express.Router();

router.post("/", [
    validator
    .check("productOwner")
    .notEmpty()
    .withMessage("Product owner not empty"),

    validator
    .check("address")
    .notEmpty()
    .withMessage("Address not empty"),

    validator
    .check("contact")
    .notEmpty()
    .withMessage("Contact not empty"),

    validator
    .check("landArea")
    .notEmpty()
    .withMessage("Land area not empty"),

    validator
    .check("price")
    .notEmpty()
    .withMessage("Price not empty"),

    validator
    .check("category")
    .notEmpty()
    .withMessage("Category not empty"),
],
    MiddlewareException.except(MiddlewareVerify.adminBody),
    MiddlewareException.except(MiddlewareAuth.permission),
    MiddlewareException.except(ControllerAdminProduct.createProduct));

router.patch("/", [
    validator
    .check("id")
    .notEmpty()
    .withMessage("Product id not empty"),

    validator
    .check("productOwner")
    .notEmpty()
    .withMessage("Product owner not empty"),

    validator
    .check("address")
    .notEmpty()
    .withMessage("Address not empty"),

    validator
    .check("contact")
    .notEmpty()
    .withMessage("Contact not empty"),

    validator
    .check("landArea")
    .notEmpty()
    .withMessage("Land area not empty"),

    validator
    .check("price")
    .notEmpty()
    .withMessage("Price not empty"),

    validator
    .check("category")
    .notEmpty()
    .withMessage("Category not empty"),
],
    MiddlewareException.except(MiddlewareVerify.adminBody),
    MiddlewareException.except(MiddlewareAuth.permission),
    MiddlewareException.except(ControllerAdminProduct.updateProduct));

router.delete('/', [
    validator
    .check("id")
    .notEmpty()
    .withMessage("Product not empty"),
],
    MiddlewareException.except(MiddlewareVerify.adminHeader),
    MiddlewareException.except(MiddlewareAuth.permission),
    MiddlewareException.except(ControllerAdminProduct.deleteProduct));

module.exports = router;