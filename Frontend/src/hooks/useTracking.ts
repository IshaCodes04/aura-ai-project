import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL || "https://aura-ai-a4wr.onrender.com";

export const useTracking = () => {
    const location = useLocation();

    const trackEvent = async (eventType: string, eventData = {}) => {
        try {
            const browserData = {
                path: window.location.pathname,
                browser: navigator.userAgent.split(' ')[0], // Simple browser detection
                device: /Mobi|Android/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop',
                os: navigator.platform,
                eventType,
                eventData
            };

            await axios.post(`${API_URL}/api/analytics/track`, browserData, {
                withCredentials: true
            });
        } catch (error) {
            // Silently fail to not disrupt user experience
            console.error('Tracking failed:', error);
        }
    };

    // Track page views automatically on route change
    useEffect(() => {
        trackEvent('page_view', { title: document.title });
    }, [location.pathname]);

    return { trackEvent };
};
