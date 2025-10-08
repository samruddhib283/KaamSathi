// Load environment FIRST (absolute path to backend/.env)
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Basic diagnostics to confirm env is loaded
console.log('CWD:', process.cwd());
console.log('ENV path used:', path.join(__dirname, '.env'));
console.log('MONGODB_URI present?', !!process.env.MONGODB_URI);
console.log('URI head:', (process.env.MONGODB_URI || '').slice(0, 40));

// Middleware
app.use(cors());
app.use(express.json());

// Validate URI before connecting
const URI = process.env.MONGODB_URI;
if (!URI) {
  console.error('MONGODB_URI is missing. Check backend/.env and remove any quotes/angle brackets.');
  process.exit(1);
}

// Mongo connection
mongoose
  .connect(URI)
  .then(() => console.log('Mongo connected'))
  .catch((e) => console.error('Mongo error:', e.message));

// Health check
app.get('/health', (_, res) => res.json({ ok: true }));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('API on', PORT));


//wire
// Routes

app.use('/workers', require('./routes/workers'));
app.use('/shifts', require('./routes/shifts'));

