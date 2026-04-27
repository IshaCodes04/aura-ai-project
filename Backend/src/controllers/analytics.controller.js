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

        // 1. Total Visitors (Unique IPs)
        const totalVisitors = await Analytics.distinct('ip').countDocuments();

        // 2. Pageviews
        const pageViews = await Analytics.countDocuments({ eventType: 'page_view' });

        // 3. Active Users (last 24h)
        const activeUsers = await Analytics.distinct('userId', { timestamp: { $gte: last24h }, userId: { $ne: null } }).countDocuments();

        // 4. Traffic Overview (Daily for last 7 days)
        const trafficOverview = await Analytics.aggregate([
            { $match: { timestamp: { $gte: last7d }, eventType: 'page_view' } },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
                    visitors: { $addToSet: "$ip" }
                }
            },
            {
                $project: {
                    date: "$_id",
                    count: { $size: "$visitors" },
                    _id: 0
                }
            },
            { $sort: { date: 1 } }
        ]);

        // 5. Browser Distribution
        const browserStats = await Analytics.aggregate([
            { $group: { _id: "$browser", count: { $sum: 1 } } },
            { $project: { name: "$_id", value: "$count", _id: 0 } }
        ]);

        res.json({
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
