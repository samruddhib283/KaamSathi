const mongoose = require('mongoose');

const ShiftSchema = new mongoose.Schema({
  workerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Worker', required: true },
  customerName: { type: String, required: true },
  customerPhone: { type: String, required: true },
  customerEmail: String,
  
  startDate: { type: Date, required: true },
  duration: { type: Number, required: true }, // days
  category: { type: String, required: true },
  description: String,
  address: { type: String, required: true },
  
  totalAmount: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'accepted', 'rejected', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  
  rating: { type: Number, min: 1, max: 5 },
  feedback: String,
  
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded'],
    default: 'pending'
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Shift', ShiftSchema);
