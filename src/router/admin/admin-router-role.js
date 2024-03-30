"use strict"
const express = require("express");
const ControllerRole = require("../../controller/controller-role");
const router = express.Router();

router.post("/", ControllerRole.createRole);

module.exports = router;