"user strict"
const express = require("express");
const ControllerCommonUser = require("../../controller/common/controller-common-user");
const router = express.Router();

router.get("/all", ControllerCommonUser.getAll);
router.get("/:id", ControllerCommonUser.getUserById);

module.exports = router;