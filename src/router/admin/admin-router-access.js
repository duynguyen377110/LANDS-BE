"use strict";
const express = require("express");
const ControllerAccess = require("../../controller/controller-access");
const router = express.Router();

router.post("/signin", ControllerAccess.adminSignin);
router.post("/signout", ControllerAccess.adminSignout);

module.exports = router;