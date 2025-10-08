const mongoose = require('mongoose');

const WorkerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: String,
  categories: [String], // e.g., ["cleaning","helper","delivery"]
  dayWage: Number,
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], index: '2dsphere' } // [lng, lat]
  },
  ratingAvg: { type: Number, default: 0 },
  jobsCompleted: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Worker', WorkerSchema);
