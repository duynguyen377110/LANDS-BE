"use strict"
const express = require('express');
const ControllerAccess = require("../../controller/controller-access");
const router = express.Router();

router.post('/signup', ControllerAccess.clientSignup);

module.exports = router;
