const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/authentication");
const user = require("./user");
const item = require("./item");
const manufacture = require("./manufacture");
const transaction = require("./transaction");
const report = require("./report");

router.use("/user", user);
router.use(authentication);
router.use("/item", item);
router.use("/manufacture", manufacture);
router.use("/trasaction", transaction);
router.use("/report", report);

module.exports = router;
