"use strict"
const express = require('express');
const ControllerRole = require("../../controller/controller-role");
const MiddlewareException = require("../../middleware/middleware-exception");
const router = express.Router();

router.get("/all", MiddlewareException.except(ControllerRole.getAllRole));
router.get("/:id", ControllerRole.getRoleById);

module.exports = router;