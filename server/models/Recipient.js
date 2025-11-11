const mongoose = require('mongoose');

const recipientSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'sent', 'delivered', 'failed'],
    default: 'pending'
  },
  campaignId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Broadcast',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Recipient', recipientSchema);
