"user strict"
const express = require("express");
const ControllerUser = require("../../controller/controller-user");
const router = express.Router();

router.get("/all", ControllerUser.getAll);


module.exports = router;