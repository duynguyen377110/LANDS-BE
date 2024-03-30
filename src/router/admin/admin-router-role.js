"use strict"
const express = require("express");
const ControllerRole = require("../../controller/controller-role");
const router = express.Router();

router.post("/", ControllerRole.createRole);
router.delete('/', ControllerRole.deleteRole);

module.exports = router;