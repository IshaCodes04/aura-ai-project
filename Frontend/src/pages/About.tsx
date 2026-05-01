import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Brain, Cpu, ShieldCheck, Heart, Zap, Globe, Users, Trophy, Code2, Database, Layout, Shield } from 'lucide-react';
import Navbar from '@/components/Navbar';

const About = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden" style={{ fontFamily: "'Inter', 'Poppins', sans-serif" }}>
      <Navbar />

      {/* ─── INTENSE LIQUID BACKGROUND ─── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="liquid-blob absolute opacity-30 dark:opacity-50" style={{ width: '85vw', height: '85vw', top: '-25%', left: '-20%', background: 'linear-gradient(135deg, #FF7A00 0%, #FF0066 50%, #9333ea 100%)' }} />
        <div className="liquid-blob absolute opacity-20 dark:opacity-30" style={{ width: '65vw', height: '65vw', bottom: '-10%', right: '0%', animationDelay: '-5s', background: 'linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 50%, #ec4899 100%)' }} />
        <div className="liquid-blob absolute opacity-10 dark:opacity-20" style={{ width: '40vw', height: '40vw', top: '35%', right: '15%', animationDelay: '-12s', background: 'linear-gradient(135deg, #FF7A00 0%, #facc15 100%)' }} />
      </div>

      <section className="relative z-10 pt-40 pb-20 px-4 md:px-8">
        
        {/* ─── HERO SECTION ─── */}
        <div className="max-w-5xl mx-auto text-center mb-40">
          <div className="aura-fade-1 inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-10 backdrop-blur-3xl border border-orange-500/20 bg-orange-500/5 text-orange-500 shadow-xl">
            <Sparkles className="w-5 h-5 animate-spin-slow" />
            <span className="text-xs font-black uppercase tracking-[0.3em]">The Aura Legacy</span>
          </div>
          <h1 className="aura-fade-2 text-7xl md:text-9xl font-black tracking-tighter mb-10 leading-[0.9]">
            Where code <br />
            <span className="shimmer-text italic">meets soul.</span>
          </h1>
          <p className="aura-fade-3 text-2xl md:text-3xl text-muted-foreground leading-relaxed max-w-3xl mx-auto font-medium italic">
            "We aren't building a tool. We are building the first intelligence that truly remembers you."
          </p>
        </div>

        {/* ─── THE PHILOSOPHY (Glow Card Style) ─── */}
        <div className="max-w-6xl mx-auto mb-40">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="aura-fade-left relative group p-[2px] rounded-[4rem] overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-rose-500 to-purple-600 opacity-30 group-hover:opacity-100 transition-opacity duration-1000"></div>
              <div className="relative rounded-[3.9rem] overflow-hidden aspect-square border border-white/10">
                <img 
                  src="https://images.unsplash.com/photo-1620712943543-bcc4638ef808?q=80&w=1000&auto=format&fit=crop" 
                  alt="AI Human Synergy" 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-12">
                  <p className="text-white font-black text-2xl md:text-3xl leading-tight italic">"Intelligence is not just about answers, it's about the journey of understanding."</p>
                </div>
              </div>
            </div>
            <div className="space-y-10 aura-fade-right">
              <div className="space-y-4">
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight">The Aura <br/><span className="gradient-text-orange italic">Philosophy</span></h2>
                <div className="h-2 w-32 bg-gradient-to-r from-orange-500 to-rose-500 rounded-full"></div>
              </div>
              <p className="text-xl text-muted-foreground leading-relaxed font-semibold">
                Most AI tools today are transactional—you ask, they answer, they forget. We believe intelligence should be <strong>relational</strong>.
              </p>
              <p className="text-xl text-muted-foreground leading-relaxed font-semibold">
                By integrating long-term vector memory with state-of-the-art reasoning, Aura grows with you. It learns your style, remembers your projects, and becomes an extension of your own mind.
              </p>
              <div className="pt-6">
                 <Link to="/signup" className="text-orange-500 font-black text-3xl flex items-center gap-4 group">
                   Join the Synergy <ArrowRight className="w-8 h-8 group-hover:translate-x-4 transition-transform" />
                 </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ─── TECHNOLOGY STACK (Glow Grid) ─── */}
        <div className="max-w-6xl mx-auto mb-40">
           <div className="text-center mb-20">
            <h2 className="text-5xl font-black mb-6 tracking-tight">Built on the <span className="text-orange-500">Bleeding Edge.</span></h2>
            <p className="text-xl text-muted-foreground font-bold">The sophisticated stack that powers every liquid interaction.</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Cpu, name: 'Gemini Pro', desc: 'Reasoning Engine', color: 'from-orange-500/40 to-rose-500/40' },
              { icon: Database, name: 'Pinecone', desc: 'Vector Memory', color: 'from-blue-500/40 to-cyan-500/40' },
              { icon: Zap, name: 'WebSockets', desc: 'Real-time Flow', color: 'from-yellow-500/40 to-orange-500/40' },
              { icon: Shield, name: 'Encryption', desc: 'AES-256 Vault', color: 'from-purple-500/40 to-pink-500/40' },
            ].map((tech, i) => (
              <div key={i} className="group relative p-[1px] rounded-[3rem] overflow-hidden transition-all duration-500 hover:-translate-y-4">
                <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-20 group-hover:opacity-100 transition-opacity`}></div>
                <div className="relative p-10 rounded-[2.9rem] bg-background/80 backdrop-blur-3xl border border-white/5 text-center">
                  <div className={`w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform`}>
                    <tech.icon className="w-8 h-8 text-orange-500" />
                  </div>
                  <h3 className="font-black text-2xl mb-2">{tech.name}</h3>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground font-black opacity-60">{tech.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── ROADMAP (Interactive Path) ─── */}
        <div className="max-w-6xl mx-auto mb-40">
           <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="aura-fade-up">
               <h2 className="text-5xl md:text-7xl font-black mb-10 tracking-tighter">The Future is <br/><span className="shimmer-text">Liquid.</span></h2>
               <div className="space-y-10">
                 {[
                   { t: 'Multi-modal Vision', d: 'Soon Aura will see and perceive the world just as you do.' },
                   { t: 'Autonomous Coding', d: 'Aura won\'t just suggest logic; it will build entire ecosystems.' },
                   { t: 'Decentralized Intelligence', d: 'Giving you 100% ownership over your neural clusters.' },
                 ].map((step, i) => (
                   <div key={i} className="flex gap-8 group">
                     <div className="w-14 h-14 rounded-full border-2 border-orange-500/50 bg-orange-500/10 flex items-center justify-center text-orange-500 font-black text-xl shrink-0 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all">{i+1}</div>
                     <div>
                       <h4 className="font-black text-2xl text-foreground mb-1">{step.t}</h4>
                       <p className="text-lg text-muted-foreground font-medium">{step.d}</p>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
            <div className="relative aura-fade-up">
               <div className="absolute -inset-10 bg-orange-500/10 rounded-full blur-[100px] animate-pulse"></div>
               <div className="relative p-12 md:p-16 rounded-[4rem] border border-white/10 bg-white/5 backdrop-blur-3xl text-center shadow-2xl overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-rose-500/10 opacity-50"></div>
                  <Trophy className="relative z-10 w-24 h-24 text-orange-500 mx-auto mb-10 group-hover:scale-110 transition-transform" />
                  <h3 className="relative z-10 text-4xl font-black mb-4 tracking-tight">User Driven</h3>
                  <p className="relative z-10 text-lg text-muted-foreground font-bold leading-relaxed mb-10">
                    Aura is built by the dreamers of the digital world. Join 120,000+ creators shaping the future.
                  </p>
                  <div className="relative z-10 flex justify-center -space-x-4">
                    {[1,2,3,4,5].map(n => (
                      <div key={n} className="w-14 h-14 rounded-full border-4 border-background bg-muted overflow-hidden shadow-2xl">
                        <img src={`https://i.pravatar.cc/150?u=about-${n}`} alt="user" />
                      </div>
                    ))}
                    <div className="w-14 h-14 rounded-full border-4 border-background bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center text-white text-xs font-black">+120k</div>
                  </div>
               </div>
            </div>
           </div>
        </div>

        {/* ─── VALUES (Hyper-Glow Card) ─── */}
        <div className="max-w-5xl mx-auto mb-40 relative group">
           <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-rose-500 to-purple-600 rounded-[4rem] blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
           <div className="relative p-16 md:p-24 rounded-[4rem] border border-white/10 bg-background/60 backdrop-blur-3xl text-center">
              <ShieldCheck className="w-24 h-24 text-orange-500 mx-auto mb-10 animate-pulse" />
              <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter">Privacy as an <span className="text-orange-500">Oath.</span></h2>
              <p className="text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-12 font-bold italic">
                "In a world where data is sold, Aura is a vault. Every thought you sync is encrypted, private, and yours alone."
              </p>
              <div className="flex justify-center items-center gap-4 text-orange-500 font-black text-xl uppercase tracking-widest">
                <Heart className="w-8 h-8 fill-current" />
                <span>Built with Integrity</span>
              </div>
           </div>
        </div>

        {/* ─── FINAL CALL TO ACTION ─── */}
        <div className="max-w-4xl mx-auto text-center aura-fade-up">
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-12 leading-[0.95]">
            Ready to <br />
            <span className="shimmer-text italic">join the flow?</span>
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link 
              to="/signup" 
              className="group inline-flex items-center justify-center gap-4 px-12 py-5 text-2xl font-black text-white rounded-[2.5rem] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(255,122,0,0.5)]"
              style={{ background: 'linear-gradient(135deg, #FF7A00, #FF0066)' }}
            >
              Get Started Free
              <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link 
              to="/" 
              className="inline-flex items-center justify-center px-12 py-5 text-xl font-bold rounded-[2.5rem] border border-white/10 backdrop-blur-xl bg-white/5 hover:bg-white/10 hover:-translate-y-2 transition-all duration-500"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="relative z-10 border-t border-white/5 py-20 text-center text-muted-foreground">
        <p className="text-xs font-black tracking-[0.4em] uppercase opacity-30">Aura AI · Digital Legacy</p>
      </footer>
    </div>
  );
};

export default About;
