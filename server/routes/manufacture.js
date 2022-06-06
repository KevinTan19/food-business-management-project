const express = require("express");
const router = express.Router();
const { Controller } = require("../controllers/manufacture-controller");

router.post("/", Controller.createManufacture);
router.get("/", Controller.allManufacture);
router.put("/:id", Controller.editManufacture);
router.delete("/:id", Controller.deleteManufacture);

module.exports = router;
