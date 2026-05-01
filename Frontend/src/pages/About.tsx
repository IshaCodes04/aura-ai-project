import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Brain, Cpu, Zap, Globe, ShieldCheck, Heart, Users } from 'lucide-react';
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
        
        {/* ─── CONTENT: HERO (Same punchy style as Home) ─── */}
        <div className="max-w-4xl mx-auto text-center px-6 mb-20">
          <div className="aura-fade-1 inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 backdrop-blur-xl border border-orange-500/20 bg-orange-500/5 text-orange-500 text-[10px] font-black uppercase tracking-[0.3em]">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            Our Digital Core
          </div>
          <h1 className="aura-fade-2 text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.95]">
            Where code <br />
            <span className="shimmer-text">meets intuition.</span>
          </h1>
          <p className="aura-fade-3 text-xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed italic">
            "Aura AI isn't just an assistant. It's the first relational intelligence that truly grows with your mind."
          </p>
        </div>

        {/* ─── THEME: STATS STRIP (Mirror of Home Page) ─── */}
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

        {/* ─── CONTENT: MISSION SECTION ─── */}
        <div className="max-w-6xl mx-auto px-6 mb-40">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-orange-500/10 rounded-[3rem] blur-3xl opacity-50"></div>
              <div className="relative rounded-[3rem] overflow-hidden aspect-square border border-white/10 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1620712943543-bcc4638ef808?q=80&w=1000&auto=format&fit=crop" 
                  alt="Aura AI Synergy" 
                  className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" 
                />
              </div>
            </div>
            <div className="space-y-8">
              <h2 className="text-5xl font-black tracking-tight leading-tight">The Vision of <br/><span className="text-orange-500 italic">Relational AI.</span></h2>
              <div className="h-2 w-32 bg-orange-500 rounded-full"></div>
              <p className="text-xl text-muted-foreground leading-relaxed font-semibold">
                Most AI tools today are transactional—you ask, they answer, they forget. We believe intelligence should be <strong>relational</strong>.
              </p>
              <p className="text-xl text-muted-foreground leading-relaxed font-semibold">
                Aura learns your style, remembers your projects, and grows from a tool into a thinking partner. It is the extension of your own potential.
              </p>
              <div className="pt-4 border-t border-white/5 flex items-center gap-4">
                 <Heart className="text-orange-500 fill-current w-6 h-6" />
                 <span className="text-lg font-black italic tracking-tight">Built with integrity for the visionaries.</span>
              </div>
            </div>
          </div>
        </div>

        {/* ─── THEME: CAPABILITY GRID (Bento-style like Home) ─── */}
        <div className="max-w-6xl mx-auto px-6 mb-40">
           <div className="text-center mb-16">
             <h2 className="text-4xl font-black mb-4 tracking-tight">Core Pillars</h2>
           </div>
           <div className="grid md:grid-cols-3 gap-8">
             {[
               { icon: Brain, title: 'Infinite Memory', desc: 'Stores your context as fluid mathematical clusters for instant recall.', color: 'text-orange-500' },
               { icon: Cpu, title: 'Deep Logic', desc: 'Powered by Gemini Pro for complex reasoning and flawless code logic.', color: 'text-blue-500' },
               { icon: Zap, title: 'Instant Flow', desc: 'Zero-latency WebSocket streams for real-time synchronization.', color: 'text-purple-500' }
             ].map((p, i) => (
               <div key={i} className="p-12 rounded-[3rem] border border-white/10 bg-white/5 backdrop-blur-3xl hover:border-orange-500/30 transition-all duration-500 group">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                    <p.icon className={`w-8 h-8 ${p.color}`} />
                  </div>
                  <h3 className="text-2xl font-black mb-4">{p.title}</h3>
                  <p className="text-muted-foreground font-bold text-lg leading-relaxed">{p.desc}</p>
               </div>
             ))}
           </div>
        </div>

        {/* ─── CONTENT: ROADMAP SECTION ─── */}
        <div className="max-w-4xl mx-auto px-6 mb-40">
           <div className="p-16 rounded-[4rem] border border-white/5 bg-white/5 backdrop-blur-3xl text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-5">
                 <Globe className="w-40 h-40 text-orange-500" />
              </div>
              <h2 className="text-4xl font-black mb-6 tracking-tighter">Join the <span className="shimmer-text">Global Sync.</span></h2>
              <p className="text-xl text-muted-foreground leading-relaxed mb-12 font-medium">
                We are building the first decentralized intelligence network. From autonomous coding to multi-modal vision, the future of Aura is infinite.
              </p>
              <div className="flex justify-center -space-x-3">
                 {[1,2,3,4,5].map(n => (
                   <div key={n} className="w-14 h-14 rounded-full border-4 border-background bg-muted overflow-hidden">
                     <img src={`https://i.pravatar.cc/150?u=about-${n}`} alt="user" />
                   </div>
                 ))}
                 <div className="w-14 h-14 rounded-full border-4 border-background bg-orange-500 flex items-center justify-center text-white text-xs font-black">+120k</div>
              </div>
           </div>
        </div>

        {/* ─── FINAL CTA ─── */}
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-12 leading-[0.95]">
            Ready for <br />
            <span className="shimmer-text">Infinite Synergy?</span>
          </h2>
          <Link 
            to="/signup" 
            className="group inline-flex items-center justify-center gap-4 px-12 py-6 text-2xl font-black text-white rounded-[2.5rem] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(255,0,102,0.5)]"
            style={{ background: 'linear-gradient(135deg, #FF7A00, #FF0066)' }}
          >
            Initiate Sync
            <ArrowRight className="w-8 h-8 group-hover:translate-x-3 transition-transform" />
          </Link>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/5 py-24 text-center text-muted-foreground">
        <p className="text-[10px] font-black tracking-[0.5em] uppercase opacity-20 mb-4">Aura AI · Digital Humanity</p>
        <p className="text-xs font-bold opacity-10">© {new Date().getFullYear()} Designed for the Next Dimension.</p>
      </footer>
    </div>
  );
};

export default About;
