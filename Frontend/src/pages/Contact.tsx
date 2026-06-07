import { useState } from 'react';
import { Mail, Send, MessageSquare, Twitter, Github, Disc as Discord, Zap, ShieldCheck, Globe, Clock, Sparkles, Brain, Lock, Cpu } from 'lucide-react';
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
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden selection:bg-secondary/10 selection:text-foreground text-[14px]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navbar />

      {/* ─── LIQUID BACKGROUND BLOBS ─── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30 dark:opacity-20">
        <div className="liquid-blob absolute" style={{ width: '60vw', height: '60vw', top: '-10%', left: '-10%', background: 'transparent', opacity: 0.15 }} />
        <div className="liquid-blob absolute" style={{ width: '40vw', height: '40vw', bottom: '-5%', right: '-5%', animationDelay: '-7s', background: 'transparent', opacity: 0.1 }} />
      </div>

      <section className="relative z-10 pt-48 pb-8 px-6">
        
        {/* ─── HERO SECTION ─── */}
        <div className="max-w-5xl mx-auto text-center mb-32 px-6">
          <div className="aura-fade-1 inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-8 backdrop-blur-xl border border-secondary/20 bg-secondary/5 shadow-lg">
            <Zap className="w-4 h-4 text-secondary animate-pulse" />
            <span className="text-[10px] font-bold text-secondary/90 uppercase tracking-[0.2em]">The Human Node</span>
          </div>
          <h1 className="aura-fade-2 text-5xl md:text-7xl font-black tracking-tight mb-8 leading-[1.2]" style={{ color: 'hsl(var(--navy-blue))' }}>
            We're here to <br />
            <span className="shimmer-text">solve for you.</span>
          </h1>
          <p className="aura-fade-3 text-lg md:text-xl text-black dark:text-muted-foreground max-w-2xl mx-auto font-semibold leading-relaxed opacity-80">
            Direct communication with the architects behind the intelligence. Ready to scale your vision.
          </p>
        </div>

        {/* ─── CONTACT GRID ─── */}
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 mb-16 items-start">
           {/* Left: Info Bento */}
            <div className="lg:col-span-5 space-y-8">
              <div className="p-12 rounded-[3rem] border border-border/50 bg-white/40 dark:bg-white/5 backdrop-blur-3xl shadow-2xl shadow-black/5 space-y-12">
                 <h3 className="text-4xl font-black tracking-tighter mb-4" style={{ color: 'hsl(var(--navy-blue))' }}>Sync Channels.</h3>
                 
                 {[
                   { icon: Mail, label: 'Communications', val: 'hello@aura-ai.app', color: 'text-secondary', bg: 'bg-secondary/10' },
                   { icon: MessageSquare, label: 'Enterprise & Sales', val: 'sales@aura-ai.app', color: 'text-secondary', bg: 'bg-secondary/10' },
                   { icon: Globe, label: 'Support Network', val: 'Global 24/7', color: 'text-secondary', bg: 'bg-secondary/10' },
                 ].map((item, i) => (
                   <div key={i} className="flex items-center gap-8 group cursor-pointer">
                      <div className={`w-16 h-16 rounded-2xl ${item.bg} border border-border/30 flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-sm`}>
                         <item.icon className={`w-7 h-7 ${item.color}`} />
                      </div>
                      <div>
                         <div className="text-[10px] uppercase font-bold tracking-[0.3em] text-black dark:text-muted-foreground mb-1 opacity-50">{item.label}</div>
                         <div className="text-xl font-bold text-foreground group-hover:text-secondary transition-colors tracking-tight">{item.val}</div>
                      </div>
                   </div>
                 ))}
              </div>

              {/* Quick Node */}
                <div className="p-10 rounded-3xl border border-secondary/20 bg-secondary/5 backdrop-blur-2xl flex items-center gap-8 group relative overflow-hidden shadow-xl shadow-secondary/5">
                  <div className="absolute inset-0 bg-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                 <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center shrink-0 shadow-lg relative z-10 shadow-secondary/40">
                    <Clock className="w-7 h-7 text-white" />
                 </div>
                 <div className="relative z-10">
                    <div className="text-lg font-black text-foreground uppercase tracking-tight">Fast Response</div>
                    <div className="text-xs text-black dark:text-muted-foreground font-semibold italic opacity-70">Sync within 4 hours.</div>
                 </div>
              </div>

              {/* Social Bento */}
              <div className="grid grid-cols-3 gap-6">
                 {[
                   { icon: Twitter, link: '#', hover: 'hover:text-[#C4956A] hover:border-[#C4956A]/30' },
                   { icon: Discord, link: '#', hover: 'hover:text-[#C4956A] hover:border-[#C4956A]/30' },
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
                    <Send className="w-48 h-48 text-secondary -rotate-12 translate-x-12 -translate-y-12" />
                 </div>
                 
                 <h3 className="text-5xl font-black mb-16 tracking-tighter leading-none" style={{ color: 'hsl(var(--navy-blue))' }}>Initiate <span className="shimmer-text">Sync.</span></h3>
                 
                 <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
                    <div className="grid md:grid-cols-2 gap-10">
                       <div className="space-y-4">
                          <label className="text-[10px] font-black uppercase tracking-[0.4em] text-black dark:text-muted-foreground ml-3 opacity-60">Digital Signature</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-background/50 dark:bg-black/20 border border-border/50 rounded-3xl px-8 py-5 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary/50 transition-all duration-500 font-bold"
                            placeholder="Your Name"
                            required
                          />
                       </div>
                       <div className="space-y-4">
                          <label className="text-[10px] font-black uppercase tracking-[0.4em] text-black dark:text-muted-foreground ml-3 opacity-60">Signal Node</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-background/50 dark:bg-black/20 border border-border/50 rounded-3xl px-8 py-5 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary/50 transition-all duration-500 font-bold"
                            placeholder="email@example.com"
                            required
                          />
                       </div>
                    </div>

                    <div className="space-y-4">
                       <label className="text-[10px] font-black uppercase tracking-[0.4em] text-black dark:text-muted-foreground ml-3 opacity-60">Sync Priority</label>
                       <input
                         type="text"
                         name="subject"
                         value={formData.subject}
                         onChange={handleChange}
                         className="w-full bg-background/50 dark:bg-black/20 border border-border/50 rounded-3xl px-8 py-5 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary/50 transition-all duration-500 font-bold"
                         placeholder="Subject"
                         required
                       />
                    </div>

                    <div className="space-y-4">
                       <label className="text-[10px] font-black uppercase tracking-[0.4em] text-black dark:text-muted-foreground ml-3 opacity-60">Message Payload</label>
                       <textarea
                         name="message"
                         value={formData.message}
                         onChange={handleChange}
                         className="w-full bg-background/50 dark:bg-black/20 border border-border/50 rounded-[2.5rem] px-8 py-8 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary/50 transition-all duration-500 resize-none font-bold"
                         placeholder="Describe your vision..."
                         rows={5}
                         required
                       />
                    </div>

                    <button 
                      type="submit" 
                      className="group w-full inline-flex items-center justify-center gap-5 py-7 text-xs font-black uppercase tracking-[0.3em] text-white rounded-3xl transition-all duration-700 hover:-translate-y-2 active:scale-[0.98]"
                      style={{ background: 'hsl(var(--secondary))', boxShadow: '0 20px 50px -15px rgba(0,0,0,0.06)' }}
                    >
                      Transmit Signal
                      <Send className="w-5 h-5 group-hover:translate-x-3 group-hover:-translate-y-2 transition-transform duration-500" />
                    </button>
                 </form>
              </div>
            </div>
        </div>

        {/* ─── TRUST BAND ─── */}
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-16 md:gap-32 opacity-30 px-6 pb-4 grayscale">
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

      {/* ─── AURA TRUST & BRAND SECTION ─── */}
      <section className="relative z-10 py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-secondary mb-6">Trusted by Design</p>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-6" style={{ color: 'hsl(var(--navy-blue))' }}>
              Your signal.<br />
              <span className="shimmer-text">Our priority.</span>
            </h2>
            <p className="text-lg text-black dark:text-muted-foreground max-w-2xl mx-auto font-medium opacity-70 leading-relaxed">
              Behind every message is a team committed to building the most reliable, private, and intelligent AI assistant available anywhere.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[
              {
                icon: Brain,
                title: 'Memory-First AI',
                desc: 'Aura remembers your preferences, projects, and past conversations — delivering responses that feel genuinely personal, not generic.',
              },
              {
                icon: Lock,
                title: 'End-to-End Privacy',
                desc: 'All data is encrypted in transit and at rest. We operate with a strict zero-data-broker policy — your conversations belong only to you.',
              },
              {
                icon: Cpu,
                title: 'Gemini-Powered Core',
                desc: "Built on Google's most advanced reasoning engine, Aura combines frontier intelligence with long-term memory for unmatched depth.",
              },
            ].map((item, i) => (
              <div key={i} className="group p-10 rounded-[3rem] border border-border/40 bg-white/30 dark:bg-white/5 backdrop-blur-2xl hover:border-secondary/40 hover:-translate-y-3 transition-all duration-700 shadow-xl shadow-black/5">
                <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  <item.icon className="w-7 h-7 text-secondary" />
                </div>
                <h3 className="text-xl font-black tracking-tight mb-4" style={{ color: 'hsl(var(--navy-blue))' }}>{item.title}</h3>
                <p className="text-sm text-black dark:text-muted-foreground font-semibold opacity-70 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="relative rounded-[4rem] border border-secondary/20 bg-secondary/5 backdrop-blur-3xl p-16 md:p-20 overflow-hidden text-center shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-transparent pointer-events-none" />
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-secondary mb-6 relative z-10">Not just a tool. A partner.</p>
            <h3 className="text-4xl md:text-6xl font-black tracking-tighter leading-none mb-6 relative z-10" style={{ color: 'hsl(var(--navy-blue))' }}>
              Ready to think<br />
              <span className="shimmer-text">differently?</span>
            </h3>
            <p className="text-base text-black dark:text-muted-foreground font-medium opacity-60 max-w-xl mx-auto mb-10 relative z-10 leading-relaxed">
              Aura AI adapts to your workflow, learns from your habits, and delivers intelligence tailored to who you are — not a one-size-fits-all answer.
            </p>
            <a
              href="/signup"
              className="relative z-10 group inline-flex items-center justify-center gap-4 px-10 py-5 text-sm font-black text-white rounded-[2rem] transition-all duration-500 hover:-translate-y-2"
              style={{ background: 'hsl(var(--secondary))' }}
            >
              Experience Aura Free
              <Sparkles className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>
          </div>

          <p className="text-center text-[11px] font-bold text-muted-foreground opacity-40 mt-16 uppercase tracking-[0.4em]">
            © {new Date().getFullYear()} Aura AI · All rights reserved
          </p>
        </div>
      </section>
    </div>
  );
};

export default Contact;



