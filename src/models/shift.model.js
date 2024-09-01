
const mongoose = require('mongoose');

const ShiftSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  day: { type: String, required: true }, // Example: 'Monday'
  startTime: { type: String }, // Actual shift start time
  endTime: { type: String }, // Actual shift end time
  enteredAt: { type: Date }, // Timestamp when the user enters the shift
  exitedAt: { type: Date }, // Timestamp when the user exits the shift
  status: { type: String, enum: ['pending', 'active', 'completed'], default: 'pending' },
  workedHours: { type: Number, default: 0 } // Hours worked during the shift
});

module.exports = mongoose.model('Shift', ShiftSchema);
