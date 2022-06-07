const express = require("express");
const router = express.Router();
const { Controller } = require("../controllers/transaction-controller");

router.post("/", Controller.createTransaction);
router.get("/", Controller.allTransaction);
// router.put("/:id", Controller.editTransaction);
router.patch("/:id", Controller.editStatusTransaction);
router.delete("/:id", Controller.deleteTransaction);

module.exports = router;
