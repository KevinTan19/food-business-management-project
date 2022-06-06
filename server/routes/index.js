const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/authentication");
const user = require("./user");
const item = require("./item");
const manufacture = require("./manufacture");

router.use("/user", user);
router.use(authentication);
router.use("/item", item);
router.use("/manufacture", manufacture);

module.exports = router;
