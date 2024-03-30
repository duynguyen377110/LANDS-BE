"use strict"
const express = require('express');
const ControllerRole = require("../../controller/controller-role");
const router = express.Router();

router.get("/all", ControllerRole.getAllRole);

module.exports = router;