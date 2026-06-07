import React, { useState, useEffect } from 'react';
import { 
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { 
    LayoutDashboard, Users, Activity, Compass, Target, 
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
        <div className="flex items-center justify-center h-screen bg-background">
            <div className="relative">
                <div className="absolute inset-0 bg-secondary/20 blur-xl rounded-full animate-pulse" />
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary relative"></div>
            </div>
        </div>
    );

    const { summary, trafficOverview } = data;

    return (
        <div className="flex min-h-screen bg-background text-foreground relative overflow-hidden selection:bg-secondary/10 selection:text-foreground">
            {/* ─── LIQUID BACKGROUND BLOBS ─── */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-30 dark:opacity-10">
                <div className="liquid-blob absolute" style={{ width: '50vw', height: '50vw', top: '-15%', right: '-10%', background: 'transparent', opacity: 0.15 }} />
                <div className="liquid-blob absolute" style={{ width: '40vw', height: '40vw', bottom: '5%', left: '-5%', animationDelay: '-8s', background: 'transparent', opacity: 0.1 }} />
            </div>

            {/* Sidebar */}
            <aside className="w-[280px] bg-white/40 dark:bg-black/20 backdrop-blur-3xl flex flex-col sticky top-0 h-screen border-r border-border/50 z-20">
                <div className="p-8 mb-2 flex items-center gap-4">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-secondary/20 blur-lg rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-xl transform group-hover:rotate-12 transition-transform" style={{ background: 'hsl(var(--primary))' }}>
                            <LayoutDashboard className="text-white" size={20} />
                        </div>
                    </div>
                    <div>
                        <span className="text-xl font-bold tracking-tighter text-foreground block">Aura <span className="shimmer-text">Core</span></span>
                        <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Intelligence v2</span>
                    </div>
                </div>

                <div className="px-6 mb-8">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-secondary transition-colors" size={14} />
                        <input 
                            type="text" 
                            placeholder="Find metrics..." 
                            className="w-full bg-background/50 border border-border/50 rounded-xl pl-11 pr-4 py-3 text-xs outline-none focus:border-secondary/50 focus:ring-4 focus:ring-secondary/5 transition-all font-medium"
                        />
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    <p className="px-4 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4 opacity-40">Pulse Center</p>
                    <SidebarItem icon={<LayoutDashboard size={18} />} label="Overview" active={activeTab === 'Dashboard'} onClick={() => setActiveTab('Dashboard')} />
                    <SidebarItem icon={<Sparkles size={18} />} label="AI Evolution" />
                    <SidebarItem icon={<Users size={18} />} label="User Journeys" />
                    <SidebarItem icon={<Target size={18} />} label="Targeting" />
                    
                    <div className="pt-8">
                        <p className="px-4 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-4 opacity-50">System</p>
                        <SidebarItem icon={<Settings size={18} />} label="Engine Config" />
                        <SidebarItem icon={<HelpCircle size={18} />} label="Support" />
                    </div>
                </nav>

                <div className="p-6">
                    <div className="p-4 rounded-2xl border border-secondary/20" style={{ background: 'hsl(var(--primary) / 0.06)' }}>
                        <p className="text-[10px] font-black text-secondary/90 uppercase tracking-widest mb-1">Compute Power</p>
                        <div className="h-1.5 w-full bg-secondary/10 rounded-full overflow-hidden mt-2">
                            <div className="h-full w-[65%] rounded-full" style={{ background: 'hsl(var(--primary))' }}></div>
                        </div>
                        <p className="text-[9px] font-bold text-muted-foreground mt-2 uppercase tracking-tighter">65% Resource Usage</p>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-10 overflow-x-hidden relative z-10">
                {/* Header */}
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tighter leading-none mb-2" style={{ color: 'hsl(var(--navy-blue))' }}>Metrics <span className="shimmer-text">Sync</span></h1>
                        <p className="text-sm font-semibold text-black dark:text-muted-foreground uppercase tracking-widest opacity-60">Global Intelligence Oversight</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-border/50 rounded-2xl">
                            <div className="w-2 h-2 rounded-full bg-secondary/80 animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-foreground/70">Live Stream</span>
                        </div>
                        <button className="w-12 h-12 flex items-center justify-center bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-border/50 text-foreground hover:text-secondary transition-all hover:scale-110 active:scale-95 shadow-xl shadow-black/5">
                            <Bell size={20} />
                        </button>
                        <div className="flex items-center gap-3 bg-white/60 dark:bg-white/5 backdrop-blur-xl p-1.5 pr-5 rounded-2xl border border-border/50 shadow-xl shadow-black/5 group cursor-pointer hover:border-secondary/30 transition-all">
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-xs shadow-lg transform group-hover:scale-105 transition-transform" style={{ background: 'hsl(var(--primary))' }}>
                                A
                            </div>
                            <div>
                                <span className="text-[11px] font-bold text-foreground block uppercase tracking-wider">Aura Admin</span>
                                <span className="text-[9px] font-semibold text-secondary uppercase tracking-widest">Master Node</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    <StatCard label="Inbound Traffic" value={summary.totalVisitors} trend="+12.5%" icon={<Users size={20} />} />
                    <StatCard label="Neural Messages" value={summary.totalMessages || 0} trend="Live" icon={<Cpu size={20} />} />
                    <StatCard label="Visual Impressions" value={summary.pageViews} trend="Global" icon={<Layers size={20} />} />
                    <StatCard label="Verified Identities" value={summary.totalUsers || 0} trend="Secure" icon={<Database size={20} />} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-12">
                    {/* Traffic Chart */}
                    <div className="lg:col-span-2 bg-white/40 dark:bg-white/5 backdrop-blur-3xl p-8 rounded-[2.5rem] border border-border/50 shadow-2xl shadow-black/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 blur-[100px] -mr-32 -mt-32 pointer-events-none" />
                        
                        <div className="flex justify-between items-center mb-10 relative z-10">
                            <div>
                                <h3 className="text-xl font-bold tracking-tight" style={{ color: 'hsl(var(--navy-blue))' }}>Intelligence Flow</h3>
                                <p className="text-[10px] font-semibold text-black dark:text-muted-foreground uppercase tracking-[0.2em] mt-1 opacity-50">Real-time Traffic Synthesis</p>
                            </div>
                            <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-foreground/60 bg-background/50 px-4 py-2.5 rounded-xl border border-border/50 hover:border-secondary/30 transition-all">
                                Last Cycle <ChevronDown size={14} className="text-secondary" />
                            </button>
                        </div>
                        
                        <div className="flex items-end gap-6 mb-12 relative z-10">
                            <h2 className="text-5xl font-black tracking-tighter leading-none" style={{ color: 'hsl(var(--navy-blue))' }}>{summary.totalVisitors.toLocaleString()}</h2>
                            <div className="flex flex-col mb-1">
                                <div className="flex items-center gap-1.5 text-secondary text-[10px] font-bold uppercase tracking-widest">
                                    <ArrowUpRight size={14} className="stroke-[3]" />
                                    Active Nodes
                                </div>
                                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-tighter opacity-40">Syncing Globally</span>
                            </div>
                        </div>
                        
                        <div className="h-[280px] relative z-10">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={trafficOverview}>
                                    {/* removed gradient defs - using flat primary color */}
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" opacity={0.05} />
                                    <XAxis 
                                        dataKey="date" 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{fontSize: 9, fill: 'currentColor', opacity: 0.3, fontWeight: 700}} 
                                        dy={10}
                                    />
                                    <YAxis 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{fontSize: 9, fill: 'currentColor', opacity: 0.3, fontWeight: 700}} 
                                    />
                                    <Tooltip 
                                        contentStyle={{ 
                                            backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                                            backdropFilter: 'blur(20px)',
                                            borderRadius: '20px',
                                            border: '1px solid rgba(0,0,0,0.05)',
                                            boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)',
                                            fontSize: '10px',
                                            fontWeight: '900'
                                        }}
                                    />
                                        <Area 
                                        type="monotone" 
                                        dataKey="count" 
                                        stroke="#7A8C5E" 
                                        strokeWidth={4} 
                                        fill="#7A8C5E" 
                                        fillOpacity={0.08}
                                        animationDuration={2000}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Peak Activity */}
                    <div className="bg-white/40 dark:bg-white/5 backdrop-blur-3xl p-8 rounded-[2.5rem] border border-border/50 shadow-2xl shadow-black/5 flex flex-col">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-xl font-black tracking-tight" style={{ color: 'hsl(var(--navy-blue))' }}>Sync Peaks</h3>
                            <button className="text-[10px] font-black uppercase tracking-widest text-secondary flex items-center gap-1">Detailed <ChevronDown size={14} /></button>
                        </div>
                        <div className="mb-10">
                            <div className="flex items-baseline gap-2">
                                <h2 className="text-4xl font-black tracking-tighter" style={{ color: 'hsl(var(--navy-blue))' }}>{summary.peakHourCount || 0}</h2>
                                <span className="text-[10px] font-black text-black dark:text-muted-foreground uppercase tracking-widest">Events / Cycle</span>
                            </div>
                            <div className="flex gap-4 mt-6">
                                <LegendItem color="bg-accent" label="Critical" />
                                <LegendItem color="bg-secondary" label="Optimal" />
                                <LegendItem color="bg-muted/40" label="Idle" />
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col">
                            <div className="flex-1 grid grid-cols-7 gap-1.5">
                                {Array.from({ length: 42 }).map((_, i) => (
                                    <div 
                                        key={i} 
                                        className={`aspect-square rounded-md transition-all duration-500 hover:scale-125 cursor-pointer shadow-sm ${
                                            (summary.totalVisitors > 0 && i % 7 === 0) ? '' : 
                                            (summary.totalVisitors > 0 && i % 3 === 0) ? 'bg-secondary/20' : 
                                            'bg-muted/20'
                                        }`}
                                        style={summary.totalVisitors > 0 && i % 7 === 0 ? { background: 'hsl(var(--primary))', boxShadow: '0 6px 18px rgba(122,140,94,0.12)' } : undefined}
                                    />
                                ))}
                            </div>
                            <div className="flex justify-between text-[9px] font-black text-muted-foreground uppercase tracking-widest mt-6">
                                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* AI Activity Table */}
                <div className="bg-white/40 dark:bg-white/5 backdrop-blur-3xl rounded-[2.5rem] border border-border/50 shadow-2xl shadow-black/5 overflow-hidden">
                    <div className="p-8 flex justify-between items-center border-b border-border/40">
                        <div className="flex bg-background/50 p-1.5 rounded-2xl border border-border/50">
                            <button className="px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest bg-white shadow-xl text-secondary/90 transition-all">Neural Activity</button>
                            <button className="px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-all">User Nodes</button>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2 hover:text-foreground transition-all">
                                Archive Access <ChevronDown size={14} className="text-secondary" />
                            </button>
                        </div>
                    </div>
                    <div className="px-8 pt-4 pb-10 overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="text-[10px] text-muted-foreground uppercase tracking-[0.25em] border-b border-border/40">
                                <tr>
                                    <th className="py-6 font-black">Neural Vector</th>
                                    <th className="py-6 font-black">Event Flow</th>
                                    <th className="py-6 font-black text-right">Accuracy</th>
                                    <th className="py-6 font-black text-right">Latency</th>
                                </tr>
                            </thead>
                            <tbody className="text-xs divide-y divide-border/30">
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
        className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group ${
            active ? 'text-white shadow-xl shadow-secondary/20 translate-x-1' : 'text-foreground/60 hover:bg-secondary/5 hover:text-secondary hover:translate-x-1'
        }`}
        style={active ? { background: 'hsl(var(--primary))' } : undefined}
    >
        <span className={`${active ? 'text-white' : 'text-muted-foreground group-hover:text-secondary'} transition-colors`}>{icon}</span>
        <span className="text-[13px] font-bold uppercase tracking-widest">{label}</span>
    </button>
);

const StatCard = ({ label, value, trend, icon }: any) => (
    <div className="bg-white/40 dark:bg-white/5 backdrop-blur-3xl p-8 rounded-[2.25rem] border border-border/50 shadow-2xl shadow-black/5 relative overflow-hidden group hover:-translate-y-2 transition-all duration-500">
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: 'rgba(122,140,94,0.08)', borderRadius: '50%', filter: 'none' }} />
        
        <div className="mb-6 w-14 h-14 rounded-2xl flex items-center justify-center text-secondary/90 border border-secondary/20 group-hover:scale-110 transition-transform duration-500" style={{ backgroundColor: 'rgba(122,140,94,0.08)' }}>
            {icon}
        </div>
        
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-2 opacity-50">{label}</p>
        <h4 className="text-4xl font-black mb-4 tracking-tighter" style={{ color: 'hsl(var(--navy-blue))' }}>{typeof value === 'number' ? value.toLocaleString() : value}</h4>
        
        <div className="flex items-center justify-between mt-auto">
            <div className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest flex items-center gap-1.5 bg-secondary/10 text-secondary`}>
                <ArrowUpRight size={12} className="stroke-[3]" />
                {trend}
            </div>
            <span className="text-[9px] font-semibold text-muted-foreground uppercase tracking-tighter opacity-40">vs Last Cycle</span>
        </div>
    </div>
);

const LegendItem = ({ color, label }: any) => (
    <div className="flex items-center gap-2">
        <div className={`w-2.5 h-2.5 rounded-full ${color} shadow-sm shadow-black/10`}></div>
        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{label}</span>
    </div>
);

const TableRow = ({ name, value, rate, time, width }: any) => (
    <tr className="group hover:bg-secondary/5 transition-all">
        <td className="py-6">
            <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-secondary border border-secondary/20 group-hover:scale-110 transition-transform" style={{ backgroundColor: 'rgba(122,140,94,0.08)' }}>
                    <Sparkles size={16} />
                </div>
                <span className="text-sm font-bold text-foreground tracking-tight">{name}</span>
            </div>
        </td>
        <td className="py-6">
            <div className="flex items-center gap-6">
                <span className="text-sm font-bold text-foreground min-w-[3rem]">{value}</span>
                    <div className="w-48 h-2 bg-muted/20 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width, background: 'hsl(var(--primary))' }}></div>
                </div>
            </div>
        </td>
        <td className="py-6 text-right font-bold text-foreground/70 uppercase tracking-widest">{rate}</td>
        <td className="py-6 text-right font-bold text-secondary/70 tracking-widest">{time}</td>
    </tr>
);

export default AnalyticsDashboard;



