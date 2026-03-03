const mongoose = require('mongoose');

const dispenseEventSchema = new mongoose.Schema({
  deviceId: { type: String, required: true },
  medicationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Medication' },
  timestampUTC: { type: Date, default: Date.now },
  expectedMass: Number,
  measuredMass: Number,
  aiConfidence: Number,
  aiClass: String,
  verifiedCount: Number,
  status: { type: String },
  errorCode: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('DispenseEvent', dispenseEventSchema);