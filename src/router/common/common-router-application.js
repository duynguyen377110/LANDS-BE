"use strict"
const express = require("express");
const ControllerApplication = require("../../controller/common/controller-common-application");
const MiddlewareException = require("../../middleware/middleware-exception");
const router = express.Router();

router.get("/android/v1", MiddlewareException.except(ControllerApplication.downAndroid));

module.exports = router;