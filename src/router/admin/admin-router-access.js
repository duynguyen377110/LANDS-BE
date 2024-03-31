"use strict";
const express = require("express");
const ControllerAccess = require("../../controller/controller-access");
const router = express.Router();

router.post("/signin", ControllerAccess.adminSignin);

module.exports = router;