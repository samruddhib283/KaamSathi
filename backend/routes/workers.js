const router = require('express').Router();
const Worker = require('../models/worker');

// Get nearby workers (with real MongoDB query)
router.get('/nearby', async (req, res) => {
  try {
    const { lat, lng, radius_km = 5 } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({ error: 'Latitude and longitude required' });
    }

    // Convert radius from km to meters for MongoDB
    const radiusInMeters = radius_km * 1000;

    const workers = await Worker.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: radiusInMeters
        }
      },
      isAvailable: true
    }).limit(10);

    console.log(`Found ${workers.length} workers near (${lat}, ${lng}) within ${radius_km}km`);
    res.json(workers);
  } catch (error) {
    console.error('Nearby workers error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get all workers (fallback)
router.get('/all', async (req, res) => {
  try {
    const workers = await Worker.find({ isAvailable: true }).limit(20);
    res.json(workers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Keep mock endpoint for testing
router.get('/mock', (req, res) => {
  res.json([
    {
      _id: '507f1f77bcf86cd799439011',
      name: 'Raju (Mock)',
      categories: ['helper'],
      dayWage: 600,
      location: { type: 'Point', coordinates: [72.8777, 19.0760] },
      ratingAvg: 4.2,
      jobsCompleted: 15
    }
  ]);
});

module.exports = router;
