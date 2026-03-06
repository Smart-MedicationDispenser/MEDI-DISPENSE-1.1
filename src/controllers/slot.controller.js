const Slot = require("../models/Slot");

// Create slot
exports.createSlot = async (req, res) => {
  try {
    const slot = new Slot(req.body);

    await slot.save();

    res.status(201).json(slot);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get all slots
exports.getSlots = async (req, res) => {
  try {
    const slots = await Slot.find()
      .populate("deviceId")
      .populate("medicationId");

    res.json(slots);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Update stock after dispensing
exports.updateStock = async (req, res) => {
  try {

    const { slotId } = req.params;

    const slot = await Slot.findById(slotId);

    if (!slot) {
      return res.status(404).json({ message: "Slot not found" });
    }

    slot.currentStock -= 1;

    await slot.save();

    res.json(slot);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};