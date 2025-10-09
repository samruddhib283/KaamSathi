const mongoose = require('mongoose');

const WorkerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: String,
  categories: [{ 
    type: String, 
    enum: ['cleaning', 'delivery', 'helper', 'cooking', 'gardening', 'repair', 'painting'] 
  }],
  dayWage: { type: Number, required: true },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], index: '2dsphere' }, // [lng, lat]
    address: String
  },
  ratingAvg: { type: Number, default: 0, min: 0, max: 5 },
  ratingCount: { type: Number, default: 0 },
  jobsCompleted: { type: Number, default: 0 },
  isAvailable: { type: Boolean, default: true },
  bio: String,
  skills: [String]
}, { 
  timestamps: true 
});

// Create geospatial index for location-based queries
WorkerSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Worker', WorkerSchema);
