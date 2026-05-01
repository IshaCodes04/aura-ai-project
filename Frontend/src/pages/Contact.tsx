import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Twitter, Github, Disc as Discord, Zap, ShieldCheck, Globe, Clock } from 'lucide-react';
import Navbar from '@/components/Navbar';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Signal received. Aura will reach out to you within 4 business hours.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden selection:bg-orange-500/30" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navbar />

      {/* ─── LIQUID BACKGROUND ─── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="liquid-blob absolute opacity-20 dark:opacity-30" style={{ width: '80vw', height: '80vw', top: '-20%', left: '-20%', background: 'linear-gradient(135deg, #FF7A00 0%, #FF0066 100%)' }} />
        <div className="liquid-blob absolute opacity-10 dark:opacity-20" style={{ width: '60vw', height: '60vw', bottom: '-10%', right: '-10%', animationDelay: '-5s', background: 'linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%)' }} />
      </div>

      <section className="relative z-10 pt-40 pb-28 px-6">
        
        {/* ─── HERO SECTION ─── */}
        <div className="max-w-4xl mx-auto w-full text-center mb-32">
          <div className="aura-fade-1 inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-10 backdrop-blur-3xl border border-white/10 bg-white/5 text-orange-500 text-[10px] font-black uppercase tracking-[0.3em] shadow-xl">
             <Zap className="w-4 h-4 animate-pulse" />
             The Human Node
          </div>
          <h1 className="aura-fade-2 text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.95]">
            We're here to <br />
            <span className="shimmer-text italic">solve for you.</span>
          </h1>
          <p className="aura-fade-3 text-xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed italic">
            "Direct communication with the architects behind the intelligence."
          </p>
        </div>

        {/* ─── CONTACT BENTO GRID ─── */}
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10 mb-40 items-start">
           {/* Left Column: Info Nodes */}
           <div className="lg:col-span-5 space-y-8 aura-fade-left">
              <div className="p-12 rounded-[3.5rem] border border-white/10 bg-white/5 backdrop-blur-3xl shadow-xl space-y-12">
                 <h3 className="text-3xl font-black mb-10 tracking-tight">Access Points.</h3>
                 
                 {[
                   { icon: Mail, label: 'Communications', val: 'hello@aura-ai.app', color: 'text-orange-500' },
                   { icon: MessageSquare, label: 'Enterprise & Sales', val: 'sales@aura-ai.app', color: 'text-blue-500' },
                   { icon: MapPin, label: 'Physical HQ', val: 'San Francisco, CA', color: 'text-purple-500' },
                 ].map((item, i) => (
                   <div key={i} className="flex items-center gap-6 group cursor-pointer">
                      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-orange-500/50 transition-all duration-500 shadow-xl">
                         <item.icon className={`w-7 h-7 ${item.color}`} />
                      </div>
                      <div>
                         <div className="text-[10px] uppercase font-black tracking-[0.4em] text-muted-foreground mb-1.5 opacity-60">{item.label}</div>
                         <div className="text-xl font-bold text-foreground group-hover:text-orange-500 transition-colors">{item.val}</div>
                      </div>
                   </div>
                 ))}
              </div>

              {/* Response Time Node */}
              <div className="p-10 rounded-[3rem] border border-orange-500/20 bg-orange-500/5 backdrop-blur-3xl flex items-center gap-6 group overflow-hidden relative">
                 <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1.5s]"></div>
                 <div className="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(255,122,0,0.5)]">
                    <Clock className="w-6 h-6 text-white" />
                 </div>
                 <div>
                    <div className="text-lg font-black text-foreground">Rapid Response</div>
                    <div className="text-sm text-muted-foreground font-bold italic">Active Nodes: 4hr sync time guaranteed.</div>
                 </div>
              </div>

              {/* Social Nodes */}
              <div className="grid grid-cols-3 gap-6">
                 {[
                   { icon: Twitter, link: '#', c: 'hover:bg-blue-500' },
                   { icon: Discord, link: '#', c: 'hover:bg-indigo-600' },
                   { icon: Github, link: '#', c: 'hover:bg-zinc-800' },
                 ].map((s, i) => (
                   <a key={i} href={s.link} className={`p-8 rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-3xl flex items-center justify-center transition-all duration-500 ${s.c} hover:-translate-y-3 shadow-xl`}>
                      <s.icon className="w-7 h-7 text-white" />
                   </a>
                 ))}
              </div>
           </div>

           {/* Right Column: Signal Transmission Form */}
           <div className="lg:col-span-7 aura-fade-right">
              <div className="relative p-12 md:p-16 rounded-[4.5rem] border border-white/10 bg-white/5 backdrop-blur-3xl shadow-2xl group overflow-hidden">
                 <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Send className="w-32 h-32 text-orange-500" />
                 </div>
                 
                 <h3 className="text-4xl font-black mb-12 tracking-tight italic">Initiate <span className="text-orange-500">Sync.</span></h3>
                 
                 <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                    <div className="grid md:grid-cols-2 gap-8">
                       <div className="space-y-3">
                          <label className="text-[11px] font-black uppercase tracking-[0.4em] text-muted-foreground ml-2">Digital Signature</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-[2rem] px-8 py-5 text-foreground placeholder:text-muted-foreground/20 focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500/40 transition-all duration-500"
                            placeholder="John Doe"
                            required
                          />
                       </div>
                       <div className="space-y-3">
                          <label className="text-[11px] font-black uppercase tracking-[0.4em] text-muted-foreground ml-2">Signal Node (Email)</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-[2rem] px-8 py-5 text-foreground placeholder:text-muted-foreground/20 focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500/40 transition-all duration-500"
                            placeholder="john@future.io"
                            required
                          />
                       </div>
                    </div>

                    <div className="space-y-3">
                       <label className="text-[11px] font-black uppercase tracking-[0.4em] text-muted-foreground ml-2">Sync Priority (Subject)</label>
                       <input
                         type="text"
                         name="subject"
                         value={formData.subject}
                         onChange={handleChange}
                         className="w-full bg-white/5 border border-white/10 rounded-[2rem] px-8 py-5 text-foreground placeholder:text-muted-foreground/20 focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500/40 transition-all duration-500"
                         placeholder="Enterprise Logic Sync"
                         required
                       />
                    </div>

                    <div className="space-y-3">
                       <label className="text-[11px] font-black uppercase tracking-[0.4em] text-muted-foreground ml-2">Message Payload</label>
                       <textarea
                         name="message"
                         value={formData.message}
                         onChange={handleChange}
                         className="w-full bg-white/5 border border-white/10 rounded-[3rem] px-8 py-8 text-foreground placeholder:text-muted-foreground/20 focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500/40 transition-all duration-500 resize-none"
                         placeholder="What's your vision?"
                         rows={5}
                         required
                       />
                    </div>

                    <button 
                      type="submit" 
                      className="group w-full inline-flex items-center justify-center gap-4 py-7 text-2xl font-black text-white rounded-[3rem] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_-10px_rgba(255,0,102,0.5)]"
                      style={{ background: 'linear-gradient(135deg, #FF7A00, #FF0066)' }}
                    >
                      Transmit Signal
                      <Send className="w-6 h-6 group-hover:translate-x-3 group-hover:-translate-y-2 transition-transform" />
                    </button>
                 </form>
              </div>
           </div>
        </div>

        {/* TRUST NODES BAND */}
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-16 md:gap-24 opacity-30 px-6">
           {[
             { icon: ShieldCheck, t: 'Verified' },
             { icon: Globe, t: 'Global Nodes' },
             { icon: Zap, t: 'Instant Sync' },
           ].map((node, i) => (
             <div key={i} className="flex items-center gap-3 grayscale hover:grayscale-0 transition-all duration-500">
                <node.icon className="w-6 h-6" />
                <span className="text-[10px] font-black uppercase tracking-[0.5em]">{node.t}</span>
             </div>
           ))}
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/5 py-24 text-center text-muted-foreground">
        <p className="text-[10px] font-black tracking-[0.5em] uppercase opacity-20">Aura AI · Human Interface</p>
      </footer>
    </div>
  );
};

export default Contact;
