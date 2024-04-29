"user strict"
const express = require("express");
const ControllerCommonUser = require("../../controller/common/controller-common-user");
const MiddlewareException = require("../../middleware/middleware-exception");
const MiddlewareVerify = require("../../middleware/middleware-verify");
const MiddlewareAuth = require("../../middleware/middleware-auth");
const router = express.Router();

router.get("/all",
    MiddlewareException.except(MiddlewareVerify.adminHeader),
    MiddlewareException.except(MiddlewareAuth.permission),
    MiddlewareException.except(ControllerCommonUser.getAll));

router.get("/amount",
    MiddlewareException.except(MiddlewareVerify.adminHeader),
    MiddlewareException.except(MiddlewareAuth.permission),
    MiddlewareException.except(ControllerCommonUser.getAmount));

router.get("/:start/:limit",
    MiddlewareException.except(MiddlewareVerify.adminHeader),
    MiddlewareException.except(MiddlewareAuth.permission),
    MiddlewareException.except(ControllerCommonUser.getUserLimit));

router.get("/:id",
    MiddlewareException.except(MiddlewareVerify.adminHeader),
    MiddlewareException.except(MiddlewareAuth.permission),
    MiddlewareException.except(ControllerCommonUser.getUserById));

module.exports = router;