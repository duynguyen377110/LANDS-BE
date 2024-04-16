"use strict"
const express = require('express');
const ControllerCommonRole = require("../../controller/common/controller-common-role");
const MiddlewareException = require("../../middleware/middleware-exception");
const MiddlewareVerify = require("../../middleware/middleware-verify");
const MiddlewareAuth = require("../../middleware/middleware-auth");
const router = express.Router();

router.get("/all",
    MiddlewareException.except(MiddlewareVerify.adminHeader),
    MiddlewareException.except(MiddlewareAuth.permission),
    MiddlewareException.except(ControllerCommonRole.getAll));

router.get("/amount",
    MiddlewareException.except(MiddlewareVerify.adminHeader),
    MiddlewareException.except(MiddlewareAuth.permission),
    MiddlewareException.except(ControllerCommonRole.getAmount));

router.get("/:id",
    MiddlewareException.except(MiddlewareVerify.adminHeader),
    MiddlewareException.except(MiddlewareAuth.permission),
    MiddlewareException.except(ControllerCommonRole.getRoleById));

module.exports = router;