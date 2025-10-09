const mongoose = require('mongoose');
require('dotenv').config();

async function testConnection() {
    try {
        console.log('Testing MongoDB connection...');
        console.log('URI:', process.env.MONGODB_URI ? 'Found' : 'Missing');
        
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB connected successfully!');
        
        // Test creating a document
        const testSchema = new mongoose.Schema({ name: String });
        const Test = mongoose.model('Test', testSchema);
        
        const doc = await Test.create({ name: 'Connection Test' });
        console.log('✅ Document created:', doc._id);
        
        await mongoose.disconnect();
        console.log('✅ Connection closed');
        process.exit(0);
    } catch (error) {
        console.error('❌ MongoDB connection failed:', error.message);
        process.exit(1);
    }
}

testConnection();
