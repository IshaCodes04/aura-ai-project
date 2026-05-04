import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Twitter, Github, Disc as Discord, Zap, ShieldCheck, Globe, Clock, Sparkles } from 'lucide-react';
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
    alert('Signal received. Aura will reach out to you within 4 hours.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden selection:bg-orange-100 selection:text-orange-900" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navbar />

      {/* ─── LIQUID BACKGROUND BLOBS ─── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30 dark:opacity-20">
        <div className="liquid-blob absolute" style={{ width: '60vw', height: '60vw', top: '-10%', left: '-10%', background: 'linear-gradient(135deg, #FF7A00 0%, #FF0066 50%, #9333ea 100%)', opacity: 0.15 }} />
        <div className="liquid-blob absolute" style={{ width: '40vw', height: '40vw', bottom: '-5%', right: '-5%', animationDelay: '-7s', background: 'linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 50%, #ec4899 100%)', opacity: 0.1 }} />
      </div>

      <section className="relative z-10 pt-48 pb-20 px-6">
        
        {/* ─── HERO SECTION ─── */}
        <div className="max-w-5xl mx-auto text-center mb-32 px-6">
          <div className="aura-fade-1 inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-8 backdrop-blur-xl border border-orange-500/20 bg-orange-500/5 shadow-lg">
            <Zap className="w-4 h-4 text-orange-500 animate-pulse" />
            <span className="text-[10px] font-bold text-orange-600 uppercase tracking-[0.2em]">The Human Node</span>
          </div>
          <h1 className="aura-fade-2 text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9] text-foreground">
            We're here to <br />
            <span className="shimmer-text">solve for you.</span>
          </h1>
          <p className="aura-fade-3 text-xl text-muted-foreground max-w-2xl mx-auto font-semibold leading-relaxed opacity-80">
            Direct communication with the architects behind the intelligence. Ready to scale your vision.
          </p>
        </div>

        {/* ─── CONTACT GRID ─── */}
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 mb-40 items-start">
           {/* Left: Info Bento */}
            <div className="lg:col-span-5 space-y-8">
              <div className="p-12 rounded-[3rem] border border-border/50 bg-white/40 dark:bg-white/5 backdrop-blur-3xl shadow-2xl shadow-black/5 space-y-12">
                 <h3 className="text-4xl font-black tracking-tighter text-foreground mb-4">Sync Channels.</h3>
                 
                 {[
                   { icon: Mail, label: 'Communications', val: 'hello@aura-ai.app', color: 'text-orange-500', bg: 'bg-orange-500/10' },
                   { icon: MessageSquare, label: 'Enterprise & Sales', val: 'sales@aura-ai.app', color: 'text-blue-500', bg: 'bg-blue-500/10' },
                   { icon: Globe, label: 'Support Network', val: 'Global 24/7', color: 'text-purple-500', bg: 'bg-purple-500/10' },
                 ].map((item, i) => (
                   <div key={i} className="flex items-center gap-8 group cursor-pointer">
                      <div className={`w-16 h-16 rounded-2xl ${item.bg} border border-border/30 flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-sm`}>
                         <item.icon className={`w-7 h-7 ${item.color}`} />
                      </div>
                      <div>
                         <div className="text-[10px] uppercase font-bold tracking-[0.3em] text-muted-foreground mb-1 opacity-50">{item.label}</div>
                         <div className="text-xl font-bold text-foreground group-hover:text-orange-500 transition-colors tracking-tight">{item.val}</div>
                      </div>
                   </div>
                 ))}
              </div>

              {/* Quick Node */}
              <div className="p-10 rounded-3xl border border-orange-500/20 bg-orange-500/5 backdrop-blur-2xl flex items-center gap-8 group relative overflow-hidden shadow-xl shadow-orange-500/5">
                 <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                 <div className="w-14 h-14 rounded-2xl bg-orange-500 flex items-center justify-center shrink-0 shadow-lg relative z-10 shadow-orange-500/40">
                    <Clock className="w-7 h-7 text-white" />
                 </div>
                 <div className="relative z-10">
                    <div className="text-lg font-black text-foreground uppercase tracking-tight">Fast Response</div>
                    <div className="text-xs text-muted-foreground font-semibold italic opacity-70">Sync within 4 hours.</div>
                 </div>
              </div>

              {/* Social Bento */}
              <div className="grid grid-cols-3 gap-6">
                 {[
                   { icon: Twitter, link: '#', hover: 'hover:text-blue-400 hover:border-blue-400/30' },
                   { icon: Discord, link: '#', hover: 'hover:text-indigo-400 hover:border-indigo-400/30' },
                   { icon: Github, link: '#', hover: 'hover:text-zinc-400 hover:border-zinc-400/30 text-white' },
                 ].map((s, i) => (
                   <a key={i} href={s.link} className={`p-8 rounded-[2.5rem] border border-border/50 bg-white/40 dark:bg-white/5 backdrop-blur-2xl flex items-center justify-center transition-all duration-500 ${s.hover} hover:-translate-y-2 shadow-xl shadow-black/5 group`}>
                      <s.icon className="w-7 h-7 transition-transform group-hover:scale-110" />
                   </a>
                 ))}
              </div>
            </div>

            {/* Right: Signal Transmission Form */}
            <div className="lg:col-span-7">
              <div className="relative p-12 md:p-16 rounded-[4rem] border border-border/50 bg-white/40 dark:bg-white/5 backdrop-blur-3xl shadow-2xl shadow-black/5 group overflow-hidden">
                 <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-all duration-1000">
                    <Send className="w-48 h-48 text-orange-500 -rotate-12 translate-x-12 -translate-y-12" />
                 </div>
                 
                 <h3 className="text-5xl font-black mb-16 tracking-tighter text-foreground leading-none">Initiate <span className="shimmer-text">Sync.</span></h3>
                 
                 <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
                    <div className="grid md:grid-cols-2 gap-10">
                       <div className="space-y-4">
                          <label className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground ml-3 opacity-60">Digital Signature</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-background/50 dark:bg-black/20 border border-border/50 rounded-3xl px-8 py-5 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50 transition-all duration-500 font-bold"
                            placeholder="Your Name"
                            required
                          />
                       </div>
                       <div className="space-y-4">
                          <label className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground ml-3 opacity-60">Signal Node</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-background/50 dark:bg-black/20 border border-border/50 rounded-3xl px-8 py-5 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50 transition-all duration-500 font-bold"
                            placeholder="email@example.com"
                            required
                          />
                       </div>
                    </div>

                    <div className="space-y-4">
                       <label className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground ml-3 opacity-60">Sync Priority</label>
                       <input
                         type="text"
                         name="subject"
                         value={formData.subject}
                         onChange={handleChange}
                         className="w-full bg-background/50 dark:bg-black/20 border border-border/50 rounded-3xl px-8 py-5 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50 transition-all duration-500 font-bold"
                         placeholder="Subject"
                         required
                       />
                    </div>

                    <div className="space-y-4">
                       <label className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground ml-3 opacity-60">Message Payload</label>
                       <textarea
                         name="message"
                         value={formData.message}
                         onChange={handleChange}
                         className="w-full bg-background/50 dark:bg-black/20 border border-border/50 rounded-[2.5rem] px-8 py-8 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50 transition-all duration-500 resize-none font-bold"
                         placeholder="Describe your vision..."
                         rows={5}
                         required
                       />
                    </div>

                    <button 
                      type="submit" 
                      className="group w-full inline-flex items-center justify-center gap-5 py-7 text-xs font-black uppercase tracking-[0.3em] text-white rounded-3xl transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(255,122,0,0.4)] active:scale-[0.98]"
                      style={{ background: 'linear-gradient(135deg, #FF7A00, #FF0066)', boxShadow: '0 20px 50px -15px rgba(255, 122, 0, 0.4)' }}
                    >
                      Transmit Signal
                      <Send className="w-5 h-5 group-hover:translate-x-3 group-hover:-translate-y-2 transition-transform duration-500" />
                    </button>
                 </form>
              </div>
            </div>
        </div>

        {/* ─── TRUST BAND ─── */}
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-16 md:gap-32 opacity-30 px-6 grayscale">
           {[
             { icon: ShieldCheck, t: 'Verified' },
             { icon: Globe, t: 'Global Nodes' },
             { icon: Sparkles, t: 'Elite Support' },
           ].map((node, i) => (
             <div key={i} className="flex items-center gap-4 hover:grayscale-0 transition-all duration-700 cursor-pointer group">
                <node.icon className="w-8 h-8 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-black uppercase tracking-[0.5em]">{node.t}</span>
             </div>
           ))}
        </div>
      </section>

      <footer className="relative z-10 border-t border-border/50 py-24 text-center text-muted-foreground">
        <p className="text-[10px] font-black tracking-[0.5em] uppercase opacity-30 mb-4">Aura AI · Human Interface</p>
        <p className="text-[11px] font-bold opacity-20">© {new Date().getFullYear()} Designed for the Next Dimension.</p>
      </footer>
    </div>
  );
};for the Next Dimension.</p>
      </footer>
    </div>
  );
};

export default Contact;
