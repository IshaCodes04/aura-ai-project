const Analytics = require('../models/analytics.model');

exports.trackEvent = async (req, res) => {
    try {
        const { eventType, eventData, path, browser, device, os } = req.body;
        
        const newEvent = new Analytics({
            userId: req.user ? req.user._id : null,
            eventType,
            eventData,
            path,
            browser,
            device,
            os,
            ip: req.ip
        });

        await newEvent.save();

        // Emit real-time update if socket is available
        const io = req.app.get('socketio');
        if (io) {
            io.emit('new_analytics_event', newEvent);
        }

        res.status(201).json({ success: true });
    } catch (error) {
        console.error('Analytics tracking error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getAnalyticsSummary = async (req, res) => {
    try {
        const now = new Date();
        const last24h = new Date(now - 24 * 60 * 60 * 1000);
        const last7d = new Date(now - 7 * 24 * 60 * 60 * 1000);

        // Total Page Views
        const pageViews = await Analytics.countDocuments({ eventType: 'page_view' });

        // Total Messages (AI Activity)
        const totalMessages = await Analytics.countDocuments({ eventType: 'chat_message' });

        // User count (Unique IPs/UserIDs)
        const uniqueVisitors = await Analytics.distinct('ip');
        const totalVisitors = uniqueVisitors.length;

        // Traffic overview (last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const trafficData = await Analytics.aggregate([
            { $match: { eventType: 'page_view', timestamp: { $gte: sevenDaysAgo } } },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { "_id": 1 } }
        ]);

        // Browser distribution
        const browserData = await Analytics.aggregate([
            { $group: { _id: "$browser", count: { $sum: 1 } } }
        ]);

        // Interaction summary for the table
        const chatEvents = await Analytics.countDocuments({ eventType: 'chat_message' });
        const imageEvents = await Analytics.countDocuments({ eventType: 'image_generation' });

        res.status(200).json({
            summary: {
                totalVisitors,
                pageViews,
                activeUsers,
                bounceRate: "42.5%", // Placeholder for now
                conversionRate: "12.3%" // Placeholder for now
            },
            trafficOverview,
            browserStats
        });
    } catch (error) {
        console.error('Analytics summary error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
