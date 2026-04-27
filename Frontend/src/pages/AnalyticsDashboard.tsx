import React, { useState, useEffect } from 'react';
import { 
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { 
    LayoutDashboard, Users, UserBehavior, Compass, Target, 
    Layers, FileText, Settings, HelpCircle, Search, Bell, 
    ArrowUpRight, ArrowDownRight, ChevronDown, Sparkles, Cpu, Database
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
        <div className="flex items-center justify-center h-screen bg-[#FFFFFF]">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#F97316]"></div>
        </div>
    );

    const { summary, trafficOverview } = data;

    return (
        <div className="flex min-h-screen bg-[#FDFDFD] font-sans text-[#1F2937]">
            {/* Sidebar */}
            <aside className="w-[260px] bg-white flex flex-col sticky top-0 h-screen border-r border-gray-100">
                <div className="p-7 mb-2 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/20">
                        <span className="text-white font-bold text-lg">A</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-[#0F172A]">Aura AI</span>
                </div>

                <div className="px-6 mb-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
                        <input 
                            type="text" 
                            placeholder="Search something" 
                            className="w-full bg-[#FAFAFA] border border-gray-100 rounded-lg pl-9 pr-10 py-2.5 text-xs outline-none focus:border-orange-200 transition-colors"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 bg-white border px-1 rounded">⌘S</span>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    <p className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Navigation</p>
                    <SidebarItem icon={<LayoutDashboard size={18} />} label="Dashboard" active={activeTab === 'Dashboard'} onClick={() => setActiveTab('Dashboard')} />
                    <SidebarItem icon={<Sparkles size={18} />} label="AI Performance" />
                    <SidebarItem icon={<Database size={18} />} label="Memory Index" />
                    <SidebarItem icon={<Users size={18} />} label="User Behavior" />
                    <SidebarItem icon={<Compass size={18} />} label="Acquisition" />
                    
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
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Aura AI Analytics</h1>
                    <div className="flex items-center gap-4">
                        <button className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm border border-gray-50 text-gray-500 hover:text-orange-500 transition-colors">
                            <Bell size={18} />
                        </button>
                        <div className="flex items-center gap-3 bg-white p-1.5 pr-4 rounded-xl shadow-sm border border-gray-50">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" className="w-7 h-7 rounded-lg bg-orange-100" alt="User" />
                            <span className="text-xs font-bold text-gray-700">Admin Panel</span>
                            <ChevronDown size={14} className="text-gray-400" />
                        </div>
                    </div>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-4 gap-6 mb-8">
                    <StatCard label="Total visitors" value={summary.totalVisitors} trend="9.8%" icon={<Users size={16} className="text-orange-500" />} />
                    <StatCard label="AI Messages" value={summary.totalMessages || 0} trend="Real-time" icon={<Cpu size={16} className="text-orange-500" />} />
                    <StatCard label="Page Views" value={summary.pageViews} trend="Today" icon={<Layers size={16} className="text-orange-500" />} />
                    <StatCard label="Total Users" value={summary.totalUsers || 0} trend="Active" icon={<Database size={16} className="text-orange-500" />} />
                </div>

                <div className="grid grid-cols-3 gap-8 mb-8">
                    {/* Traffic Chart */}
                    <div className="col-span-2 bg-white p-7 rounded-2xl border border-gray-50 shadow-sm relative">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="font-bold text-gray-800">Traffic Overview</h3>
                            <button className="flex items-center gap-2 text-xs font-semibold text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                                Last 7 days <ChevronDown size={14} />
                            </button>
                        </div>
                        <div className="mb-4">
                            <h2 className="text-3xl font-bold">{summary.totalVisitors.toLocaleString()}</h2>
                            <p className="text-xs text-orange-500 font-bold flex items-center gap-1 mt-1">
                                <ArrowUpRight size={12} /> Active <span className="text-gray-400 font-normal">users tracking</span>
                            </p>
                        </div>
                        <div className="h-[280px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={trafficOverview}>
                                    <defs>
                                        <linearGradient id="orangeGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#F97316" stopOpacity={0.1}/>
                                            <stop offset="95%" stopColor="#F97316" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="0" vertical={false} stroke="#F3F4F6" />
                                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#9CA3AF'}} dy={15} />
                                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#9CA3AF'}} />
                                    <Area type="monotone" dataKey="count" stroke="#F97316" strokeWidth={2.5} fillOpacity={1} fill="url(#orangeGradient)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Peak Hours Heatmap */}
                    <div className="bg-white p-7 rounded-2xl border border-gray-50 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-gray-800">Peak Hours</h3>
                            <button className="text-xs font-semibold text-gray-500 flex items-center gap-1">Last 7 days <ChevronDown size={12} /></button>
                        </div>
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold">{summary.peakHourCount || 0} <span className="text-xs text-gray-400 font-normal">events in peak hour</span></h2>
                            <div className="flex gap-4 mt-4">
                                <LegendItem color="bg-orange-500" label="High" />
                                <LegendItem color="bg-orange-200" label="Medium" />
                                <LegendItem color="bg-gray-50" label="Low" />
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
                                        className={`aspect-square rounded-[2px] transition-all hover:scale-110 cursor-pointer ${
                                            (summary.totalVisitors > 0 && i % 7 === 0) ? 'bg-orange-500' : 
                                            (summary.totalVisitors > 0 && i % 3 === 0) ? 'bg-orange-200' : 
                                            'bg-gray-50'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* AI Activity Table */}
                <div className="bg-white rounded-2xl border border-gray-50 shadow-sm">
                    <div className="p-7 flex justify-between items-center border-b border-gray-50">
                        <div className="flex bg-[#F9FAFB] p-1 rounded-xl">
                            <button className="px-5 py-1.5 rounded-lg text-xs font-bold bg-white shadow-sm text-orange-600">AI Usage</button>
                            <button className="px-5 py-1.5 rounded-lg text-xs font-bold text-gray-400">Users</button>
                        </div>
                        <button className="text-xs font-semibold text-gray-500 flex items-center gap-1">Last 7 days <ChevronDown size={14} /></button>
                    </div>
                    <div className="px-7 pt-2 pb-6">
                        <table className="w-full text-left">
                            <thead className="text-[11px] text-gray-400 uppercase tracking-widest border-b border-gray-50">
                                <tr>
                                    <th className="py-4 font-semibold">Interaction Type</th>
                                    <th className="py-4 font-semibold">Total Events</th>
                                    <th className="py-4 font-semibold text-right">Success Rate</th>
                                    <th className="py-4 font-semibold text-right">Avg. Response Time</th>
                                </tr>
                            </thead>
                            <tbody className="text-xs text-gray-700 divide-y divide-gray-50">
                                {(data.interactions || []).map((inter: any, idx: number) => (
                                    <TableRow key={idx} name={inter.name} value={inter.count} rate={inter.rate} time={inter.time} width={`${Math.min(inter.count * 10, 100)}%`} />
                                ))}
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
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
            active ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'text-gray-500 hover:bg-orange-50'
        }`}
    >
        <span className={active ? 'text-white' : 'text-gray-400 group-hover:text-orange-500'}>{icon}</span>
        <span className="text-[13px] font-semibold">{label}</span>
    </button>
);

const StatCard = ({ label, value, trend, icon, isDown = false }: any) => (
    <div className="bg-white p-6 rounded-2xl border border-gray-50 shadow-sm relative overflow-hidden group hover:border-orange-100 transition-colors">
        <div className="absolute top-0 right-0 w-20 h-20 bg-orange-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="mb-4 bg-orange-50 w-10 h-10 rounded-xl flex items-center justify-center border border-orange-100/50">{icon}</div>
        <p className="text-[11px] font-bold text-gray-400 mb-1">{label}</p>
        <h4 className="text-2xl font-bold text-gray-900 mb-1">{typeof value === 'number' ? value.toLocaleString() : value}</h4>
        <p className={`text-[10px] font-bold flex items-center gap-1 ${isDown ? 'text-red-500' : 'text-orange-500'}`}>
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

const TableRow = ({ name, value, rate, time, width }: any) => (
    <tr className="hover:bg-orange-50/20 transition-colors">
        <td className="py-5">
            <div className="flex items-center gap-3">
                <div className="w-7 h-7 bg-orange-50 rounded-lg flex items-center justify-center"><Sparkles size={14} className="text-orange-400" /></div>
                <span className="font-bold text-gray-800">{name}</span>
            </div>
        </td>
        <td className="py-5">
            <div className="flex items-center gap-3">
                <span className="font-bold w-12">{value}</span>
                <div className="w-32 h-2 bg-gray-50 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-400 rounded-full" style={{ width }}></div>
                </div>
            </div>
        </td>
        <td className="py-5 text-right font-bold text-gray-500">{rate}</td>
        <td className="py-5 text-right font-bold text-gray-500">{time}</td>
    </tr>
);

export default AnalyticsDashboard;
