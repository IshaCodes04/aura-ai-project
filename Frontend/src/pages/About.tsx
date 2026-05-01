import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Brain, Cpu, Zap, Globe, Users, Trophy, Target, ShieldCheck, Heart, Lightbulb } from 'lucide-react';
import Navbar from '@/components/Navbar';

const About = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden selection:bg-orange-500/30" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navbar />

      {/* ─── LIQUID BACKGROUND ─── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="liquid-blob absolute opacity-20 dark:opacity-30" style={{ width: '80vw', height: '80vw', top: '-15%', left: '-15%', background: 'linear-gradient(135deg, #FF7A00 0%, #FF0066 100%)' }} />
        <div className="liquid-blob absolute opacity-10 dark:opacity-20" style={{ width: '60vw', height: '60vw', bottom: '0%', right: '0%', animationDelay: '-10s', background: 'linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%)' }} />
      </div>

      <section className="relative z-10 pt-40 pb-28">
        
        {/* ─── HERO SECTION ─── */}
        <div className="max-w-5xl mx-auto text-center px-6 mb-32">
          <div className="aura-fade-1 inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-10 backdrop-blur-3xl border border-white/10 bg-white/5 text-orange-500 text-[10px] font-black uppercase tracking-[0.3em] shadow-xl">
             <Lightbulb className="w-4 h-4 animate-pulse" />
             The Dawn of Synergy
          </div>
          <h1 className="aura-fade-2 text-6xl md:text-9xl font-black tracking-tighter mb-10 leading-[0.9]">
            We're building <br />
            <span className="shimmer-text italic">Digital Legacy.</span>
          </h1>
          <p className="aura-fade-3 text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto font-medium italic">
            "Aura AI isn't just a platform; it's the first neural extension that truly grows with you."
          </p>
        </div>

        {/* ─── THE MISSION (Visual Story) ─── */}
        <div className="max-w-6xl mx-auto px-6 mb-48">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="aura-fade-left relative group">
              <div className="absolute -inset-10 bg-orange-500/10 rounded-full blur-[100px] group-hover:opacity-100 opacity-50 transition-opacity"></div>
              <div className="relative rounded-[3.5rem] overflow-hidden aspect-[4/5] border border-white/10 shadow-[0_50px_100px_-20px_rgba(255,122,0,0.3)]">
                <img 
                  src="https://images.unsplash.com/photo-1620712943543-bcc4638ef808?q=80&w=1000&auto=format&fit=crop" 
                  alt="Aura Visualization" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[2s] group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-12">
                   <div className="space-y-2">
                      <div className="text-orange-500 font-black text-xs uppercase tracking-[0.4em]">Philosophy</div>
                      <h4 className="text-white text-3xl font-bold leading-tight italic">"Where code meets the soul."</h4>
                   </div>
                </div>
              </div>
            </div>
            
            <div className="aura-fade-right space-y-10">
              <div className="space-y-4">
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.1]">The Relational <br/><span className="text-orange-500 italic">Evolution.</span></h2>
                <div className="h-2 w-32 bg-orange-500 rounded-full"></div>
              </div>
              <div className="space-y-8 text-xl text-muted-foreground leading-relaxed font-semibold">
                <p>
                  Most AI tools are transactional. You ask, they answer, they forget. Aura is different. We've pioneered <strong>Relational Intelligence</strong>.
                </p>
                <p>
                  By integrating infinite vector clusters with state-of-the-art reasoning, Aura remembers your projects, your style, and your vision. It grows from a tool into a partner.
                </p>
                <Link to="/signup" className="text-orange-500 font-black text-3xl flex items-center gap-4 group pt-4">
                   Initiate Sync <ArrowRight className="w-8 h-8 group-hover:translate-x-4 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ─── THE CORE PILLARS (Bento Style) ─── */}
        <div className="max-w-6xl mx-auto px-6 mb-48">
           <div className="text-center mb-20">
             <h2 className="text-5xl font-black tracking-tighter mb-4">Our Core Foundations</h2>
             <div className="h-1.5 w-24 bg-white/10 mx-auto rounded-full"></div>
           </div>
           
           <div className="grid md:grid-cols-12 gap-8">
              {[
                { 
                  icon: Brain, 
                  title: 'Vector Memory', 
                  desc: 'Powered by Pinecone RAG, storing your context as fluid mathematical clusters for instant recall.',
                  col: 'md:col-span-8',
                  bg: 'bg-orange-500/10 border-orange-500/20'
                },
                { 
                  icon: Cpu, 
                  title: 'Gemini Pro', 
                  desc: 'The latest reasoning engine from Google, tuned for empathy and logic.',
                  col: 'md:col-span-4',
                  bg: 'bg-white/5 border-white/10'
                },
                { 
                  icon: Zap, 
                  title: 'Real-time Flow', 
                  desc: 'Zero-latency WebSocket streams for instantaneous synchronization of thought.',
                  col: 'md:col-span-4',
                  bg: 'bg-white/5 border-white/10'
                },
                { 
                  icon: Globe, 
                  title: 'Global Node', 
                  desc: 'Distributed across 50+ edge locations to ensure your assistant is always by your side.',
                  col: 'md:col-span-8',
                  bg: 'bg-blue-500/10 border-blue-500/20'
                },
              ].map((p, i) => (
                <div key={i} className={`${p.col} p-12 rounded-[3.5rem] border ${p.bg} backdrop-blur-3xl hover:-translate-y-2 transition-all duration-500 group`}>
                   <div className="w-16 h-16 rounded-[2rem] bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                      <p.icon className="w-8 h-8 text-orange-500" />
                   </div>
                   <h3 className="text-3xl font-black mb-4">{p.title}</h3>
                   <p className="text-muted-foreground text-lg font-bold leading-relaxed">{p.desc}</p>
                </div>
              ))}
           </div>
        </div>

        {/* ─── PRIVACY OATH ─── */}
        <div className="max-w-4xl mx-auto px-6 mb-48 text-center relative group">
           <div className="absolute -inset-10 bg-orange-500/5 rounded-full blur-[120px] opacity-100 transition-opacity"></div>
           <div className="relative p-16 md:p-24 rounded-[4rem] border border-white/5 bg-background/50 backdrop-blur-3xl shadow-2xl">
              <ShieldCheck className="w-24 h-24 text-orange-500 mx-auto mb-12 animate-pulse" />
              <h2 className="text-5xl font-black tracking-tighter mb-8 leading-tight">Privacy is our <span className="text-orange-500">Oath.</span></h2>
              <p className="text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-12 font-bold italic">
                "We never sell your data. We never use your private clusters to train public models. Trust is not a feature; it's our foundation."
              </p>
              <div className="flex justify-center items-center gap-4 text-orange-500 font-black text-xl uppercase tracking-[0.3em]">
                 <Heart className="w-8 h-8 fill-current" />
                 <span>Crafted with Integrity</span>
              </div>
           </div>
        </div>

        {/* ─── FINAL CALL TO ACTION ─── */}
        <div className="max-w-5xl mx-auto text-center px-6">
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-12 leading-[0.95]">
            Ready to <br />
            <span className="shimmer-text italic">join the flow?</span>
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link 
              to="/signup" 
              className="group inline-flex items-center justify-center gap-5 px-14 py-6 text-2xl font-black text-white rounded-[2.5rem] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(255,122,0,0.5)]"
              style={{ background: 'linear-gradient(135deg, #FF7A00, #FF0066)' }}
            >
              Initiate Sync
              <ArrowRight className="w-8 h-8 group-hover:translate-x-3 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/5 py-24 text-center text-muted-foreground">
        <p className="text-[10px] font-black tracking-[0.5em] uppercase opacity-30 mb-4">Aura AI · Digital Humanity</p>
        <p className="text-xs font-bold opacity-20">© {new Date().getFullYear()} Designed for the Next Dimension.</p>
      </footer>
    </div>
  );
};

export default About;
