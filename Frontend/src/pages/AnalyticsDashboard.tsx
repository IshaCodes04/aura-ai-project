import React, { useState, useEffect } from 'react';
import { 
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
    AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';
import { 
    Users, Eye, MousePointer2, TrendingUp, Activity, 
    Globe, Smartphone, Laptop, Clock, ArrowUpRight, ArrowDownRight 
} from 'lucide-react';
import axios from 'axios';
import { io } from 'socket.io-client';

const API_URL = import.meta.env.VITE_BACKEND_URL || "https://aura-ai-a4wr.onrender.com";
const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

const AnalyticsDashboard = () => {
    const [data, setData] = useState<any>(null);
    const [liveEvents, setLiveEvents] = useState<any[]>([]);

    useEffect(() => {
        fetchAnalytics();

        const socket = io(API_URL, { withCredentials: true });

        socket.on('new_analytics_event', (event) => {
            setLiveEvents(prev => [event, ...prev].slice(0, 10));
            // Optionally re-fetch summary data or update state locally
            fetchAnalytics(); 
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const fetchAnalytics = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/analytics/summary`, {
                withCredentials: true
            });
            setData(response.data);
        } catch (error) {
            console.error("Error fetching analytics:", error);
        }
    };

    if (!data) return <div className="flex items-center justify-center h-screen bg-[#0a0a0a] text-white">Loading Analytics...</div>;

    const { summary, trafficOverview, browserStats } = data;

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white p-4 md:p-8 font-sans">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
                        Analytics Dashboard
                    </h1>
                    <p className="text-gray-400">Real-time insights for Aura AI</p>
                </div>
                <div className="flex items-center gap-2 bg-[#1a1a1a] px-4 py-2 rounded-full border border-gray-800">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm font-medium">Live System</span>
                </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard 
                    title="Total Visitors" 
                    value={summary.totalVisitors.toLocaleString()} 
                    change="+12.5%" 
                    icon={<Users className="w-6 h-6 text-purple-400" />} 
                    isUp={true}
                />
                <StatCard 
                    title="Pageviews" 
                    value={summary.pageViews.toLocaleString()} 
                    change="+5.9%" 
                    icon={<Eye className="w-6 h-6 text-blue-400" />} 
                    isUp={true}
                />
                <StatCard 
                    title="Bounce Rate" 
                    value={summary.bounceRate} 
                    change="-2.1%" 
                    icon={<Activity className="w-6 h-6 text-green-400" />} 
                    isUp={false}
                />
                <StatCard 
                    title="Conversion Rate" 
                    value={summary.conversionRate} 
                    change="+1.4%" 
                    icon={<TrendingUp className="w-6 h-6 text-orange-400" />} 
                    isUp={true}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Traffic Overview Chart */}
                <div className="lg:col-span-2 bg-[#111111] p-6 rounded-2xl border border-gray-800 shadow-xl">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold">Traffic Overview</h2>
                        <select className="bg-[#1a1a1a] border border-gray-700 rounded-lg px-3 py-1 text-sm outline-none">
                            <option>Last 7 days</option>
                            <option>Last 30 days</option>
                        </select>
                    </div>
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={trafficOverview}>
                                <defs>
                                    <linearGradient id="colorVis" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                                <XAxis dataKey="date" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Area 
                                    type="monotone" 
                                    dataKey="count" 
                                    stroke="#8b5cf6" 
                                    strokeWidth={3}
                                    fillOpacity={1} 
                                    fill="url(#colorVis)" 
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Browser Stats */}
                <div className="bg-[#111111] p-6 rounded-2xl border border-gray-800 shadow-xl">
                    <h2 className="text-xl font-semibold mb-6">Device Distribution</h2>
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={browserStats}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {browserStats.map((entry: any, index: number) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-4 space-y-3">
                        {browserStats.map((item: any, index: number) => (
                            <div key={item.name} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                                    <span className="text-sm text-gray-300">{item.name || 'Unknown'}</span>
                                </div>
                                <span className="text-sm font-bold">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Real-time Events */}
            <div className="mt-8 bg-[#111111] p-6 rounded-2xl border border-gray-800 shadow-xl overflow-hidden">
                <h2 className="text-xl font-semibold mb-6">Live Activity Feed</h2>
                <div className="space-y-4">
                    {liveEvents.length > 0 ? liveEvents.map((event, i) => (
                        <div key={i} className="flex items-center gap-4 p-3 bg-[#1a1a1a] rounded-xl border border-gray-800 animate-in fade-in slide-in-from-left-4 duration-500">
                            <div className="p-2 bg-purple-500/10 rounded-lg">
                                <Activity className="w-5 h-5 text-purple-400" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm">
                                    <span className="font-semibold text-gray-200">{event.eventType === 'page_view' ? 'Page Visited' : event.eventType}</span>
                                    <span className="mx-2 text-gray-500">•</span>
                                    <span className="text-gray-400">{event.path}</span>
                                </p>
                            </div>
                            <div className="text-xs text-gray-500">
                                {new Date(event.timestamp).toLocaleTimeString()}
                            </div>
                        </div>
                    )) : (
                        <div className="text-center py-8 text-gray-500">Waiting for live events...</div>
                    )}
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, change, icon, isUp }: any) => (
    <div className="bg-[#111111] p-6 rounded-2xl border border-gray-800 shadow-lg hover:border-purple-500/50 transition-all duration-300 group">
        <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-[#1a1a1a] rounded-xl group-hover:scale-110 transition-transform duration-300">
                {icon}
            </div>
            <div className={`flex items-center gap-1 text-sm font-medium ${isUp ? 'text-green-400' : 'text-red-400'}`}>
                {isUp ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {change}
            </div>
        </div>
        <h3 className="text-gray-400 text-sm font-medium mb-1">{title}</h3>
        <div className="text-2xl font-bold">{value}</div>
    </div>
);

export default AnalyticsDashboard;
