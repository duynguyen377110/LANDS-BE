'use strict'
const express = require("express");
const ControllerUser = require("../../controller/controller-user");
const router = express.Router();

router.post("/", ControllerUser.createUser);

module.exports = router;