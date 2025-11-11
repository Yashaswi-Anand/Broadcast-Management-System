const mongoose = require('mongoose');

const broadcastSchema = new mongoose.Schema({
  campaignName: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Broadcast', broadcastSchema);
