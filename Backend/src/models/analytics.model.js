const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null // null for anonymous users
    },
    eventType: {
        type: String,
        required: true,
        enum: ['page_view', 'button_click', 'session_start', 'chat_message', 'image_generation']
    },
    eventData: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },
    path: String,
    browser: String,
    device: String,
    os: String,
    ip: String,
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Analytics', analyticsSchema);
