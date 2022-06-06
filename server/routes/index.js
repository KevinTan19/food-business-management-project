const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/authentication");
const user = require("./user");
router.use("/user", user);
router.use(authentication);

module.exports = router;
