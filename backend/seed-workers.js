const mongoose = require('mongoose');
const Worker = require('./models/worker');
require('dotenv').config();

const workers = [
  {
    name: 'Raju Kumar',
    phone: '+91-9876543210',
    email: 'raju.kumar@email.com',
    categories: ['helper', 'cleaning'],
    dayWage: 600,
    location: {
      type: 'Point',
      coordinates: [72.8777, 19.0760], // [lng, lat] - Mumbai
      address: 'Andheri West, Mumbai'
    },
    ratingAvg: 4.2,
    ratingCount: 15,
    jobsCompleted: 15,
    bio: 'Experienced helper and cleaner with 3 years of experience',
    skills: ['house cleaning', 'office cleaning', 'general help']
  },
  {
    name: 'Priya Sharma',
    phone: '+91-9876543211',
    email: 'priya.sharma@email.com',
    categories: ['cooking', 'helper'],
    dayWage: 800,
    location: {
      type: 'Point',
      coordinates: [72.8500, 19.0800], // Bandra, Mumbai
      address: 'Bandra West, Mumbai'
    },
    ratingAvg: 4.6,
    ratingCount: 23,
    jobsCompleted: 23,
    bio: 'Professional cook specializing in North Indian cuisine',
    skills: ['north indian cooking', 'south indian cooking', 'meal prep']
  },
  {
    name: 'Suresh Patil',
    phone: '+91-9876543212',
    categories: ['delivery', 'helper'],
    dayWage: 500,
    location: {
      type: 'Point',
      coordinates: [72.8900, 19.0900], // Powai, Mumbai
      address: 'Powai, Mumbai'
    },
    ratingAvg: 4.0,
    ratingCount: 8,
    jobsCompleted: 8,
    bio: 'Fast and reliable delivery person with own vehicle',
    skills: ['document delivery', 'grocery shopping', 'courier services']
  },
  {
    name: 'Lakshmi Nair',
    phone: '+91-9876543213',
    categories: ['cleaning', 'cooking'],
    dayWage: 700,
    location: {
      type: 'Point',
      coordinates: [72.8400, 19.0500], // Juhu, Mumbai
      address: 'Juhu, Mumbai'
    },
    ratingAvg: 4.8,
    ratingCount: 32,
    jobsCompleted: 32,
    bio: 'Experienced housekeeper and cook with excellent references',
    skills: ['deep cleaning', 'home cooking', 'laundry', 'ironing']
  }
];

async function seedWorkers() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing workers
    await Worker.deleteMany({});
    console.log('🗑️  Cleared existing workers');

    // Insert new workers
    const insertedWorkers = await Worker.insertMany(workers);
    console.log(`✅ Added ${insertedWorkers.length} workers to database:`);
    
    insertedWorkers.forEach(worker => {
      console.log(`   - ${worker.name} (${worker.categories.join(', ')}) - ₹${worker.dayWage}/day`);
    });

    await mongoose.disconnect();
    console.log('✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
}

seedWorkers();
