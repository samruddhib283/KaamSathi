const router = require('express').Router();
const Shift = require('../models/Shift');
const Worker = require('../models/worker');

// Create a new shift/booking
router.post('/', async (req, res) => {
  try {
    const shift = new Shift(req.body);
    const savedShift = await shift.save();
    
    // Populate worker details
    await savedShift.populate('workerId', 'name phone categories dayWage');
    
    console.log('New shift created:', savedShift._id);
    res.status(201).json(savedShift);
  } catch (error) {
    console.error('Shift creation error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get all shifts
router.get('/', async (req, res) => {
  try {
    const shifts = await Shift.find()
      .populate('workerId', 'name phone categories dayWage')
      .sort({ createdAt: -1 });
    res.json(shifts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
