import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Brain, Cpu, Zap, Globe, ShieldCheck, Heart, Users, MessageSquare, Twitter, Github, Disc as Discord } from 'lucide-react';
import Navbar from '@/components/Navbar';

const About = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navbar />

      {/* ─── THEME: LIQUID BACKGROUND (Same as Home) ─── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="liquid-blob absolute opacity-20 dark:opacity-30" style={{ width: '70vw', height: '70vw', top: '-10%', left: '-10%', background: 'linear-gradient(135deg, #FF7A00 0%, #FF0066 100%)' }} />
        <div className="liquid-blob absolute opacity-15 dark:opacity-20" style={{ width: '50vw', height: '50vw', bottom: '0%', right: '0%', animationDelay: '-7s', background: 'linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%)' }} />
      </div>

      <section className="relative z-10 pt-40 pb-20">
        
        {/* ─── HERO ─── */}
        <div className="max-w-4xl mx-auto text-center px-6 mb-24">
          <div className="aura-fade-1 inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 backdrop-blur-xl border border-orange-500/20 bg-orange-500/5 text-orange-500 text-[10px] font-black uppercase tracking-[0.3em]">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            The Aura Genesis
          </div>
          <h1 className="aura-fade-2 text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.95]">
            Redefining <br />
            <span className="shimmer-text">Human Connection.</span>
          </h1>
          <p className="aura-fade-3 text-xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
            Aura AI isn't just an assistant. It's the first relational intelligence that truly grows with your mind.
          </p>
        </div>

        {/* ─── STATS STRIP ─── */}
        <section className="relative z-10 py-12 px-4 md:px-8 mb-32 border-y border-white/5 bg-white/5 backdrop-blur-md">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { stat: '500k+', label: 'Global Minds' },
                { stat: '<1s', label: 'Sync Speed' },
                { stat: '100%', label: 'Privacy Oath' },
                { stat: '24/7', label: 'Availability' },
              ].map(({ stat, label }) => (
                <div key={label}>
                  <div className="text-3xl md:text-4xl font-black text-foreground mb-1">{stat}</div>
                  <div className="text-muted-foreground text-[10px] font-black uppercase tracking-widest">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CORE PILLARS (Enhanced & Impressive) ─── */}
        <div className="max-w-6xl mx-auto px-6 mb-40">
           <div className="text-center mb-20">
             <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter uppercase italic">
               Core <span className="text-orange-500">Pillars</span>
             </h2>
             <div className="h-1.5 w-32 bg-gradient-to-r from-orange-500 to-rose-500 mx-auto rounded-full"></div>
           </div>
           
           <div className="grid md:grid-cols-3 gap-10">
             {[
               { icon: Brain, title: 'Infinite Memory', desc: 'Stores your context as fluid mathematical clusters for instant recall.', color: 'text-orange-500', glow: 'group-hover:shadow-[0_0_50px_-10px_rgba(255,122,0,0.4)]' },
               { icon: Cpu, title: 'Deep Logic', desc: 'Powered by Gemini Pro for complex reasoning and flawless code logic.', color: 'text-blue-500', glow: 'group-hover:shadow-[0_0_50px_-10px_rgba(14,165,233,0.4)]' },
               { icon: Zap, title: 'Instant Flow', desc: 'Zero-latency WebSocket streams for real-time synchronization.', color: 'text-purple-500', glow: 'group-hover:shadow-[0_0_50px_-10px_rgba(168,85,247,0.4)]' }
             ].map((p, i) => (
               <div key={i} className={`group relative p-12 rounded-[3.5rem] border border-white/10 bg-white/5 backdrop-blur-3xl transition-all duration-700 hover:-translate-y-4 hover:border-white/20 ${p.glow}`}>
                  <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <p.icon className={`w-10 h-10 ${p.color} animate-pulse`} />
                  </div>
                  <h3 className="text-3xl font-black mb-4 tracking-tight">{p.title}</h3>
                  <p className="text-muted-foreground font-bold text-lg leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity">{p.desc}</p>
               </div>
             ))}
           </div>
        </div>

        {/* ─── MISSION SECTION ─── */}
        <div className="max-w-6xl mx-auto px-6 mb-48">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="relative group">
              <div className="absolute -inset-10 bg-orange-500/10 rounded-full blur-[100px] opacity-50 group-hover:opacity-80 transition-opacity"></div>
              <div className="relative rounded-[4rem] overflow-hidden aspect-square border border-white/10 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1620712943543-bcc4638ef808?q=80&w=1000&auto=format&fit=crop" 
                  alt="Aura AI Synergy" 
                  className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" 
                />
              </div>
            </div>
            <div className="space-y-10">
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.1]">The Vision of <br/><span className="text-orange-500 italic">Relational Intelligence.</span></h2>
              <p className="text-xl text-muted-foreground leading-relaxed font-semibold opacity-80">
                Aura learns your style, remembers your projects, and grows from a tool into a thinking partner. It is the extension of your own potential.
              </p>
              <div className="pt-4 border-t border-white/10 flex items-center gap-4">
                 <Heart className="text-orange-500 fill-current w-8 h-8 animate-bounce" />
                 <span className="text-xl font-black italic tracking-tight">Built for the future creators.</span>
              </div>
            </div>
          </div>
        </div>

        {/* ─── FINAL CTA SECTION (Ultra Impressive) ─── */}
        <div className="max-w-5xl mx-auto text-center px-6 mb-20">
          <div className="relative p-20 rounded-[5rem] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-3xl group shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)]">
             <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-rose-500/10 opacity-50 group-hover:opacity-100 transition-opacity duration-1000"></div>
             
             <h2 className="relative z-10 text-5xl md:text-8xl font-black tracking-tighter mb-12 leading-[0.95]">
               Ready for <br />
               <span className="shimmer-text italic">Infinite Synergy?</span>
             </h2>
             
             <Link 
               to="/signup" 
               className="relative z-10 group inline-flex items-center justify-center gap-5 px-14 py-7 text-3xl font-black text-white rounded-[3rem] transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_25px_80px_rgba(255,122,0,0.6)] active:scale-95"
               style={{ background: 'linear-gradient(135deg, #FF7A00, #FF0066)' }}
             >
               Initiate Sync
               <ArrowRight className="w-8 h-8 group-hover:translate-x-3 transition-transform" />
             </Link>
          </div>
        </div>
      </section>

      {/* ─── UPDATED FOOTER (Clean & Pro) ─── */}
      <footer className="relative z-10 border-t border-white/10 pt-20 pb-16 px-6 bg-background/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
           <div className="text-center md:text-left">
              <h3 className="text-2xl font-black mb-2 tracking-tighter">Aura AI</h3>
              <p className="text-muted-foreground text-sm font-bold uppercase tracking-widest opacity-40">Digital Humanity · Human Architecture</p>
           </div>
           
           <div className="flex gap-6">
              {[Twitter, Github, Discord].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-orange-500/20 hover:border-orange-500/50 transition-all duration-300">
                  <Icon className="w-5 h-5 text-foreground/70" />
                </a>
              ))}
           </div>

           <div className="text-center md:text-right">
              <div className="text-[10px] font-black tracking-[0.5em] uppercase opacity-20 mb-2">Syncing globally</div>
              <p className="text-xs font-bold opacity-30 italic">© {new Date().getFullYear()} Designed for the Next Dimension.</p>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
