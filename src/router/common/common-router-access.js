"use strict"
const express = require('express');
const ControllerAccess = require("../../controller/controller-access");
const router = express.Router();

router.post('/signup', ControllerAccess.clientSignup);
router.post('/signin', ControllerAccess.clientSignin);

module.exports = router;
