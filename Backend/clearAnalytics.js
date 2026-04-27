require('dotenv').config();
const mongoose = require('mongoose');

async function clearAnalytics() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        const Analytics = mongoose.model('Analytics', new mongoose.Schema({}, { strict: false }));
        
        const result = await Analytics.deleteMany({});
        console.log(`🗑️ Successfully cleared ${result.deletedCount} old analytics records.`);
        
        await mongoose.disconnect();
        console.log('✅ Disconnected from MongoDB');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error clearing analytics:', error);
        process.exit(1);
    }
}

clearAnalytics();
