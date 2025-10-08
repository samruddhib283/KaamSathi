const router = require('express').Router();

// Mock shifts storage (in production, use MongoDB)
let shifts = [];
let nextId = 1;

// Create a new shift/booking
router.post('/', async (req, res) => {
  try {
    const shift = {
      _id: (nextId++).toString(),
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    shifts.push(shift);
    console.log('New shift created:', shift);
    res.status(201).json(shift);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all shifts (for testing)
router.get('/', (req, res) => {
  res.json(shifts);
});

module.exports = router;
