"user strict"
const express = require("express");
const ControllerUser = require("../../controller/controller-user");
const router = express.Router();

router.get("/all", ControllerUser.getAll);
router.get("/:id", ControllerUser.getUserById);

module.exports = router;