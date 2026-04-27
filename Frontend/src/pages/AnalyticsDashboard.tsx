import React, { useState, useEffect } from 'react';
import { 
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, Cell
} from 'recharts';
import { 
    LayoutDashboard, Users, UserCheck, MousePointer2, 
    BarChart3, PieChart as PieChartIcon, Settings, HelpCircle,
    Search, Bell, ArrowUpRight, ArrowDownRight, MoreHorizontal,
    Globe, Smartphone, Laptop, Clock, Filter
} from 'lucide-react';
import axios from 'axios';
import { io } from 'socket.io-client';

const API_URL = import.meta.env.VITE_BACKEND_URL || "https://aura-ai-a4wr.onrender.com";

const AnalyticsDashboard = () => {
    const [data, setData] = useState<any>(null);
    const [activeTab, setActiveTab] = useState('Dashboard');

    useEffect(() => {
        fetchAnalytics();
        const socket = io(API_URL, { withCredentials: true });
        socket.on('new_analytics_event', () => fetchAnalytics());
        return () => { socket.disconnect(); };
    }, []);

    const fetchAnalytics = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/analytics/summary`, { withCredentials: true });
            setData(response.data);
        } catch (error) {
            console.error("Error fetching analytics:", error);
        }
    };

    if (!data) return (
        <div className="flex items-center justify-center h-screen bg-[#F9FAFB]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6366F1]"></div>
        </div>
    );

    const { summary, trafficOverview } = data;

    return (
        <div className="flex min-h-screen bg-[#F9FAFB] font-sans text-[#1F2937]">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden lg:flex flex-col sticky top-0 h-screen">
                <div className="p-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#6366F1] rounded-lg flex items-center justify-center text-white font-bold">A</div>
                    <span className="text-xl font-bold tracking-tight">AuraAnalytics</span>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    <SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" active={activeTab === 'Dashboard'} onClick={() => setActiveTab('Dashboard')} />
                    <SidebarItem icon={<Users size={20} />} label="User Behavior" active={activeTab === 'Behavior'} onClick={() => setActiveTab('Behavior')} />
                    <SidebarItem icon={<Globe size={20} />} label="Acquisition" active={activeTab === 'Acquisition'} />
                    <SidebarItem icon={<BarChart3 size={20} />} label="Retention" active={activeTab === 'Retention'} />
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <SidebarItem icon={<Settings size={20} />} label="Settings" />
                    <SidebarItem icon={<HelpCircle size={20} />} label="Help Center" />
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-x-hidden">
                {/* Top Header */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
                    <div className="relative w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search something..." 
                            className="w-full bg-gray-50 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-[#6366F1]/20 outline-none"
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full relative">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Isha" className="w-8 h-8 rounded-full border border-gray-200" alt="Avatar" />
                            <span className="text-sm font-semibold">Admin</span>
                        </div>
                    </div>
                </header>

                <div className="p-8 space-y-8 max-w-7xl mx-auto">
                    <div className="flex justify-between items-end">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                            <p className="text-gray-500 text-sm">Welcome back, here's what's happening today.</p>
                        </div>
                        <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                            <Filter size={16} /> Filter Data
                        </button>
                    </div>

                    {/* Stat Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard label="Total Visitors" value={summary.totalVisitors} trend="+9.8%" icon={<Users className="text-orange-500" />} color="bg-orange-50" />
                        <StatCard label="Pageviews" value={summary.pageViews} trend="+5.9%" icon={<MousePointer2 className="text-blue-500" />} color="bg-blue-50" />
                        <StatCard label="Bounce Rate" value="47.8%" trend="-2.1%" icon={<BarChart3 className="text-green-500" />} color="bg-green-50" isDown />
                        <StatCard label="Conversion Rate" value="5.2%" trend="+1.4%" icon={<UserCheck className="text-purple-500" />} color="bg-purple-50" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Traffic Overview */}
                        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="font-bold text-lg">Traffic overview</h3>
                                <select className="text-sm bg-gray-50 border-none rounded-lg px-3 py-1 outline-none">
                                    <option>Last 7 days</option>
                                    <option>Last 30 days</option>
                                </select>
                            </div>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={trafficOverview}>
                                        <defs>
                                            <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#6366F1" stopOpacity={0.1}/>
                                                <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                                        <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9CA3AF'}} dy={10} />
                                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9CA3AF'}} />
                                        <Tooltip 
                                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                        />
                                        <Area type="monotone" dataKey="count" stroke="#6366F1" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Peak Hours (Heatmap Style Bar Chart) */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <h3 className="font-bold text-lg mb-6">Peak hours</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500 text-xs">Based on last 7 days</span>
                                    <div className="flex gap-2">
                                        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#6366F1]"></div> <span className="text-[10px]">High</span></div>
                                        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#E0E7FF]"></div> <span className="text-[10px]">Low</span></div>
                                    </div>
                                </div>
                                {/* Heatmap Grid Simulation */}
                                <div className="grid grid-cols-7 gap-1">
                                    {Array.from({ length: 42 }).map((_, i) => (
                                        <div 
                                            key={i} 
                                            className={`aspect-square rounded-sm transition-all hover:scale-110 cursor-pointer ${
                                                [10, 11, 12, 17, 18, 19, 24, 25, 26, 31].includes(i) ? 'bg-[#6366F1]' : 
                                                [3, 4, 15, 16, 22, 23, 30].includes(i) ? 'bg-[#818CF8]' : 
                                                'bg-[#F3F4F6]'
                                            }`}
                                        />
                                    ))}
                                </div>
                                <div className="pt-4 border-t border-gray-50">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium">Top active hour</span>
                                        <span className="text-sm font-bold">12:00 PM - 2:00 PM</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Channel Table */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                            <h3 className="font-bold text-lg">Acquisition Channels</h3>
                            <button className="text-[#6366F1] text-sm font-semibold flex items-center gap-1">
                                View full report <ArrowUpRight size={14} />
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold">Channel</th>
                                        <th className="px-6 py-4 font-semibold">Visitors</th>
                                        <th className="px-6 py-4 font-semibold">Bounce Rate</th>
                                        <th className="px-6 py-4 font-semibold">Avg. Session</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50 text-sm">
                                    <ChannelRow name="Direct Traffic" value="2,450" bounce="42.5%" session="3m 45s" color="bg-[#6366F1]" width="75%" />
                                    <ChannelRow name="Organic Search" value="1,820" bounce="38.2%" session="4m 12s" color="bg-[#818CF8]" width="60%" />
                                    <ChannelRow name="Social Media" value="940" bounce="55.1%" session="2m 08s" color="bg-[#A5B4FC]" width="35%" />
                                    <ChannelRow name="Referral" value="420" bounce="29.4%" session="5m 30s" color="bg-[#C7D2FE]" width="15%" />
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

const SidebarItem = ({ icon, label, active = false, onClick }: any) => (
    <button 
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
            active ? 'bg-[#6366F1] text-white shadow-lg shadow-[#6366F1]/20' : 'text-gray-500 hover:bg-gray-50'
        }`}
    >
        <span className={active ? 'text-white' : 'text-gray-400 group-hover:text-[#6366F1]'}>{icon}</span>
        <span className="text-sm font-semibold">{label}</span>
    </button>
);

const StatCard = ({ label, value, trend, icon, color, isDown = false }: any) => (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
            <div className={`p-2.5 rounded-xl ${color}`}>
                {icon}
            </div>
            <div className={`flex items-center gap-0.5 text-xs font-bold ${isDown ? 'text-red-500' : 'text-green-500'}`}>
                {isDown ? <ArrowDownRight size={14} /> : <ArrowUpRight size={14} />}
                {trend}
            </div>
        </div>
        <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">{label}</p>
        <h4 className="text-2xl font-bold text-gray-900">{typeof value === 'number' ? value.toLocaleString() : value}</h4>
        <p className="text-[10px] text-gray-400 mt-1">vs last month</p>
    </div>
);

const ChannelRow = ({ name, value, bounce, session, color, width }: any) => (
    <tr className="hover:bg-gray-50/50 transition-colors">
        <td className="px-6 py-4">
            <div className="flex items-center gap-3">
                <div className={`w-2 h-8 rounded-full ${color}`}></div>
                <span className="font-semibold">{name}</span>
            </div>
        </td>
        <td className="px-6 py-4">
            <div className="flex flex-col gap-1.5">
                <span className="font-bold">{value}</span>
                <div className="w-32 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full ${color}`} style={{ width }}></div>
                </div>
            </div>
        </td>
        <td className="px-6 py-4 text-gray-600 font-medium">{bounce}</td>
        <td className="px-6 py-4 text-gray-600 font-medium">{session}</td>
    </tr>
);

export default AnalyticsDashboard;
