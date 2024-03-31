"use strict"
const express = require('express');
const ControllerRole = require("../../controller/controller-role");
const router = express.Router();

router.get("/all", ControllerRole.getAllRole);
router.get("/:id", ControllerRole.getRoleById);

module.exports = router;