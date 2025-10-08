const router = require('express').Router();

// Mock endpoint (works without MongoDB)
router.get('/mock', (req, res) => {
  res.json([
    {
      _id: '507f1f77bcf86cd799439011',
      name: 'Raju',
      categories: ['helper', 'cleaning'],
      dayWage: 600,
      location: { type: 'Point', coordinates: [72.8777, 19.0760] },
      ratingAvg: 4.2,
      jobsCompleted: 15
    },
    {
      _id: '507f1f77bcf86cd799439012',
      name: 'Priya',
      categories: ['cooking', 'helper'],
      dayWage: 800,
      location: { type: 'Point', coordinates: [72.8500, 19.0800] },
      ratingAvg: 4.6,
      jobsCompleted: 23
    }
  ]);
});

// Real nearby endpoint (will work after MongoDB connects)
router.get('/nearby', async (req, res) => {
  try {
    // For now, return mock data until MongoDB connects
    const mockWorkers = [
      {
        _id: '507f1f77bcf86cd799439011',
        name: 'Raju',
        categories: ['helper'],
        dayWage: 600,
        location: { type: 'Point', coordinates: [72.8777, 19.0760] },
        ratingAvg: 4.2,
        jobsCompleted: 15
      }
    ];
    res.json(mockWorkers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
