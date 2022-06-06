const express = require("express");
const router = express.Router();
const { Controller } = require("../controllers/item-controller");

router.post("/", Controller.createItem);
router.get("/", Controller.allItem);
router.put("/:id", Controller.editItem);
router.patch("/:id", Controller.editStatusItem);
router.delete("/:id", Controller.deleteItem);

module.exports = router;
