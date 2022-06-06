const express = require("express");
const router = express.Router();
const { Controller } = require("../controllers/report-controller");

router.get("/", Controller.allReport);

module.exports = router;
