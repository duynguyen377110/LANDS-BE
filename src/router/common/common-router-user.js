"user strict"
const express = require("express");
const ControllerCommonUser = require("../../controller/common/controller-common-user");
const MiddlewareException = require("../../middleware/middleware-exception");
const router = express.Router();

router.get("/all", MiddlewareException.except(ControllerCommonUser.getAll));
router.get("/:id", MiddlewareException.except(ControllerCommonUser.getUserById));

module.exports = router;