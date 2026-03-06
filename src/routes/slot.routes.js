const express = require("express");

const router = express.Router();

const slotController = require("../controllers/slot.controller");


router.post("/", slotController.createSlot);

router.get("/", slotController.getSlots);

router.put("/dispense/:slotId", slotController.updateStock);


module.exports = router;