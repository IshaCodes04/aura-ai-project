import React, { useState, useEffect } from 'react';
import { 
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { 
    LayoutDashboard, Users, UserBehavior, Compass, Target, 
    Layers, FileText, Settings, HelpCircle, Search, Bell, 
    ArrowUpRight, ArrowDownRight, ChevronDown
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
        <div className="flex items-center justify-center h-screen bg-[#F5F7FA]">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#7C3AED]"></div>
        </div>
    );

    const { summary, trafficOverview } = data;

    return (
        <div className="flex min-h-screen bg-[#F5F7FA] font-sans text-[#1F2937]">
            {/* Sidebar */}
            <aside className="w-[260px] bg-white flex flex-col sticky top-0 h-screen border-r border-gray-100">
                <div className="p-7 mb-2 flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#7C3AED] rounded-lg flex items-center justify-center">
                        <div className="w-4 h-4 bg-white/20 rounded-sm rotate-45"></div>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-[#0F172A]">Growlytics</span>
                </div>

                <div className="px-6 mb-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
                        <input 
                            type="text" 
                            placeholder="Search something" 
                            className="w-full bg-[#F9FAFB] border border-gray-100 rounded-lg pl-9 pr-10 py-2.5 text-xs outline-none"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 bg-white border px-1 rounded">⌘S</span>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    <p className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Navigation</p>
                    <SidebarItem icon={<LayoutDashboard size={18} />} label="Dashboard" active={activeTab === 'Dashboard'} onClick={() => setActiveTab('Dashboard')} />
                    <SidebarItem icon={<Users size={18} />} label="User Behavior" />
                    <SidebarItem icon={<Compass size={18} />} label="Acquisition" />
                    <SidebarItem icon={<Target size={18} />} label="Funnel & Conversion" />
                    <SidebarItem icon={<Layers size={18} />} label="Retention & Engagement" />
                    <SidebarItem icon={<FileText size={18} />} label="Reports" />
                    
                    <div className="pt-6">
                        <p className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Settings</p>
                        <SidebarItem icon={<Settings size={18} />} label="Settings" />
                        <SidebarItem icon={<HelpCircle size={18} />} label="Help Center" />
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-x-hidden">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <button className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm border border-gray-50 text-gray-500">
                            <Bell size={18} />
                        </button>
                        <button className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm border border-gray-50 text-gray-500">
                            <Search size={18} />
                        </button>
                        <div className="flex items-center gap-3 bg-white p-1.5 pr-4 rounded-xl shadow-sm border border-gray-50">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Miguel" className="w-7 h-7 rounded-lg" alt="User" />
                            <span className="text-xs font-bold text-gray-700">Miguel Santos</span>
                            <ChevronDown size={14} className="text-gray-400" />
                        </div>
                    </div>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-4 gap-6 mb-8">
                    <StatCard label="Total visitors" value={summary.totalVisitors} trend="9.8%" icon={<Users size={16} className="text-[#F59E0B]" />} />
                    <StatCard label="Pageviews" value={summary.pageViews} trend="5.9%" icon={<Search size={16} className="text-[#3B82F6]" />} />
                    <StatCard label="Bounce rate" value="47.8%" trend="2.1%" isDown icon={<Layers size={16} className="text-[#10B981]" />} />
                    <StatCard label="Conversion Rate" value="5.2%" trend="1.4%" isDown icon={<Target size={16} className="text-[#8B5CF6]" />} />
                </div>

                <div className="grid grid-cols-3 gap-8 mb-8">
                    {/* Traffic Chart */}
                    <div className="col-span-2 bg-white p-7 rounded-2xl border border-gray-50 shadow-sm relative">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="font-bold text-gray-800">Traffic overview</h3>
                            <button className="flex items-center gap-2 text-xs font-semibold text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                                Last 7 days <ChevronDown size={14} />
                            </button>
                        </div>
                        <div className="mb-4">
                            <h2 className="text-3xl font-bold">{summary.totalVisitors.toLocaleString()}</h2>
                            <p className="text-xs text-green-500 font-bold flex items-center gap-1 mt-1">
                                <ArrowUpRight size={12} /> 15% <span className="text-gray-400 font-normal">from last month</span>
                            </p>
                        </div>
                        <div className="h-[280px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={trafficOverview}>
                                    <defs>
                                        <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.1}/>
                                            <stop offset="95%" stopColor="#7C3AED" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="0" vertical={false} stroke="#F3F4F6" />
                                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#9CA3AF'}} dy={15} />
                                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#9CA3AF'}} />
                                    <Area type="monotone" dataKey="count" stroke="#7C3AED" strokeWidth={2.5} fillOpacity={1} fill="url(#purpleGradient)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Peak Hours Heatmap */}
                    <div className="bg-white p-7 rounded-2xl border border-gray-50 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-gray-800">Peak hours</h3>
                            <button className="text-xs font-semibold text-gray-500 flex items-center gap-1">Last 7 days <ChevronDown size={12} /></button>
                        </div>
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold">4,231 <span className="text-xs text-gray-400 font-normal">visitors in peak hour</span></h2>
                            <div className="flex gap-4 mt-4">
                                <LegendItem color="bg-[#7C3AED]" label="3,000+" />
                                <LegendItem color="bg-[#C4B5FD]" label="1,000-2,000" />
                                <LegendItem color="bg-[#F3F4F6]" label="<1,000" />
                            </div>
                        </div>
                        <div className="flex">
                            <div className="flex flex-col justify-between text-[10px] text-gray-400 pr-3 pb-2 pt-1">
                                <span>9am</span><span>10am</span><span>11am</span><span>12pm</span><span>1pm</span><span>2pm</span><span>3pm</span>
                            </div>
                            <div className="flex-1 grid grid-cols-7 gap-1">
                                {Array.from({ length: 49 }).map((_, i) => (
                                    <div 
                                        key={i} 
                                        className={`aspect-square rounded-[2px] ${
                                            [24, 25, 31, 32, 18, 39].includes(i) ? 'bg-[#7C3AED]' : 
                                            [11, 12, 17, 19, 23, 26, 33, 4, 38].includes(i) ? 'bg-[#C4B5FD]' : 
                                            'bg-[#F3F4F6]'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Table Section */}
                <div className="bg-white rounded-2xl border border-gray-50 shadow-sm">
                    <div className="p-7 flex justify-between items-center border-b border-gray-50">
                        <div className="flex bg-[#F9FAFB] p-1 rounded-xl">
                            <button className="px-5 py-1.5 rounded-lg text-xs font-bold bg-white shadow-sm">Channel</button>
                            <button className="px-5 py-1.5 rounded-lg text-xs font-bold text-gray-400">Source</button>
                            <button className="px-5 py-1.5 rounded-lg text-xs font-bold text-gray-400">Medium</button>
                        </div>
                        <button className="text-xs font-semibold text-gray-500 flex items-center gap-1">Last 7 days <ChevronDown size={14} /></button>
                    </div>
                    <div className="px-7 pt-2 pb-6">
                        <table className="w-full text-left">
                            <thead className="text-[11px] text-gray-400 uppercase tracking-widest border-b border-gray-50">
                                <tr>
                                    <th className="py-4 font-semibold">Channel</th>
                                    <th className="py-4 font-semibold">Visitors</th>
                                    <th className="py-4 font-semibold text-right">Bounce rate</th>
                                    <th className="py-4 font-semibold text-right">Avg. time per session</th>
                                </tr>
                            </thead>
                            <tbody className="text-xs text-gray-700 divide-y divide-gray-50">
                                <TableRow name="Home Page" value="6,150" bounce="40.2%" time="4m 25s" width="85%" />
                                <TableRow name="Investment Strategies for 2024" value="4,320" bounce="55.7%" time="3m 35s" width="60%" />
                                <TableRow name="About Aura AI" value="1,240" bounce="32.1%" time="5m 12s" width="25%" />
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

const SidebarItem = ({ icon, label, active = false, onClick }: any) => (
    <button 
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
            active ? 'bg-[#7C3AED] text-white' : 'text-gray-500 hover:bg-gray-50'
        }`}
    >
        <span className={active ? 'text-white' : 'text-gray-400'}>{icon}</span>
        <span className="text-[13px] font-semibold">{label}</span>
    </button>
);

const StatCard = ({ label, value, trend, icon, isDown = false }: any) => (
    <div className="bg-white p-6 rounded-2xl border border-gray-50 shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-20 h-20 bg-gray-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="mb-4 bg-[#F9FAFB] w-10 h-10 rounded-xl flex items-center justify-center border border-gray-50">{icon}</div>
        <p className="text-[11px] font-bold text-gray-400 mb-1">{label}</p>
        <h4 className="text-2xl font-bold text-gray-900 mb-1">{typeof value === 'number' ? value.toLocaleString() : value}</h4>
        <p className={`text-[10px] font-bold flex items-center gap-1 ${isDown ? 'text-red-500' : 'text-green-500'}`}>
            {isDown ? <ArrowDownRight size={12} /> : <ArrowUpRight size={12} />}
            {trend} <span className="text-gray-400 font-normal">from last month</span>
        </p>
    </div>
);

const LegendItem = ({ color, label }: any) => (
    <div className="flex items-center gap-1.5">
        <div className={`w-3 h-3 rounded-sm ${color}`}></div>
        <span className="text-[10px] font-bold text-gray-400">{label}</span>
    </div>
);

const TableRow = ({ name, value, bounce, time, width }: any) => (
    <tr className="hover:bg-gray-50/50 transition-colors">
        <td className="py-5">
            <div className="flex items-center gap-3">
                <div className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center"><FileText size={14} className="text-gray-400" /></div>
                <span className="font-bold text-gray-800">{name}</span>
            </div>
        </td>
        <td className="py-5">
            <div className="flex items-center gap-3">
                <span className="font-bold w-12">{value}</span>
                <div className="w-32 h-2 bg-[#F3F4F6] rounded-full overflow-hidden">
                    <div className="h-full bg-[#A78BFA] rounded-full" style={{ width }}></div>
                </div>
            </div>
        </td>
        <td className="py-5 text-right font-bold text-gray-500">{bounce}</td>
        <td className="py-5 text-right font-bold text-gray-500">{time}</td>
    </tr>
);

export default AnalyticsDashboard;
