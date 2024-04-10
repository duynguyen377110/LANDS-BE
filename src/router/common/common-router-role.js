"use strict"
const express = require('express');
const ControllerCommonRole = require("../../controller/common/controller-common-role");
const MiddlewareException = require("../../middleware/middleware-exception");
const router = express.Router();

router.get("/all", MiddlewareException.except(ControllerCommonRole.getAll));
router.get("/:id", MiddlewareException.except(ControllerCommonRole.getRoleById));

module.exports = router;