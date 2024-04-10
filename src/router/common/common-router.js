"use strict"
const express = require("express");
const routerRole = require("./common-router-role");
const routerUser = require("./common-router-user");
const router = express.Router();

router.use("/role", routerRole);
router.use("/user", routerUser);

module.exports = router;