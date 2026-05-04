import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Brain, Zap, Shield, Globe, Users } from 'lucide-react';
import Navbar from '@/components/Navbar';

const About = () => {
  const values = [
    {
      icon: Brain,
      title: 'Cognitive Synergy',
      description: 'We don\'t just build tools; we build extensions of the human mind. Aura is designed to think with you, not just for you.',
      color: 'from-[#FF7A00] to-[#FF0066]',
      bg: 'bg-orange-500/10',
    },
    {
      icon: Shield,
      title: 'Uncompromising Trust',
      description: 'Privacy isn\'t a feature; it\'s our foundation. Your data is encrypted, isolated, and remains yours forever.',
      color: 'from-[#0ea5e9] to-[#8b5cf6]',
      bg: 'bg-blue-500/10',
    },
    {
      icon: Zap,
      title: 'Infinite Velocity',
      description: 'Built on edge-computing and WebSockets, Aura delivers intelligence at the speed of thought. Zero lag, pure flow.',
      color: 'from-[#9333ea] to-[#FF0066]',
      bg: 'bg-purple-500/10',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden selection:bg-orange-100 selection:text-orange-900" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navbar />

      {/* ─── LIQUID BACKGROUND BLOBS ─── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-30 dark:opacity-20">
        <div className="liquid-blob absolute" style={{ width: '60vw', height: '60vw', top: '-10%', left: '-10%', background: 'linear-gradient(135deg, #FF7A00 0%, #FF0066 50%, #9333ea 100%)', opacity: 0.15 }} />
        <div className="liquid-blob absolute" style={{ width: '40vw', height: '40vw', bottom: '-5%', right: '-5%', animationDelay: '-7s', background: 'linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 50%, #ec4899 100%)', opacity: 0.1 }} />
      </div>

      {/* ─── HERO SECTION ─── */}
      <section className="relative z-10 pt-48 pb-20 px-6 text-center">
        <div className="max-w-5xl mx-auto">
          <div className="aura-fade-1 inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-8 backdrop-blur-xl border border-orange-500/20 bg-orange-500/5 shadow-lg">
            <Sparkles className="w-4 h-4 text-orange-500 animate-pulse" />
            <span className="text-[10px] font-bold text-orange-600 uppercase tracking-[0.2em]">Our Story & Vision</span>
          </div>

          <h1 className="aura-fade-2 text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8 text-foreground">
            Beyond Artificial. <br />
            <span className="shimmer-text">Purely Personal.</span>
          </h1>

          <p className="aura-fade-3 text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed font-medium opacity-80">
            Aura AI was born from a simple question: What if technology didn't just solve problems, but understood the person behind them?
          </p>
        </div>
      </section>

      {/* ─── MISSION SECTION ─── */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative group">
              <div className="absolute -inset-6 bg-gradient-to-r from-orange-500/20 to-pink-500/20 rounded-[4rem] opacity-30 blur-3xl group-hover:opacity-50 transition-all duration-700"></div>
              <div className="relative rounded-[3rem] overflow-hidden border border-border/50 shadow-2xl group">
                <img 
                  src="https://images.unsplash.com/photo-1620712943543-bcc4628c9757?q=80&w=1000&auto=format&fit=crop" 
                  alt="Aura Vision" 
                  className="w-full aspect-[4/3] object-cover scale-110 group-hover:scale-100 transition-transform duration-1000" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                <div className="absolute bottom-10 left-10 right-10 text-white">
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] mb-3 text-orange-400">The Mission</p>
                  <h3 className="text-3xl font-black tracking-tight">Democratizing Intelligence</h3>
                </div>
              </div>
            </div>

            <div className="space-y-12">
              <div>
                <h2 className="text-5xl font-black mb-8 tracking-tighter leading-none text-foreground">Evolving the <br /><span className="text-orange-500">Digital Soul.</span></h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8 font-semibold opacity-80">
                  In a world of generic responses, Aura stands for depth. We've integrated Pinecone Long-Term Memory with Google Gemini's reasoning to create an AI that learns your preferences, style, and goals.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed font-semibold opacity-80">
                  Our goal is to make professional-grade AI accessible to everyone, from students drafting their first thesis to developers building the next unicorn.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="p-8 rounded-3xl bg-white/40 dark:bg-white/5 border border-border/50 backdrop-blur-2xl hover:border-orange-500/30 transition-all group shadow-xl shadow-black/5">
                  <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Users className="text-orange-500" size={24} />
                  </div>
                  <h4 className="text-sm font-black uppercase tracking-widest mb-2">Human Centric</h4>
                  <p className="text-xs text-muted-foreground font-semibold opacity-70">Designed for real people, not just data points.</p>
                </div>
                <div className="p-8 rounded-3xl bg-white/40 dark:bg-white/5 border border-border/50 backdrop-blur-2xl hover:border-orange-500/30 transition-all group shadow-xl shadow-black/5">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Globe className="text-blue-500" size={24} />
                  </div>
                  <h4 className="text-sm font-black uppercase tracking-widest mb-2">Global Scale</h4>
                  <p className="text-xs text-muted-foreground font-semibold opacity-70">Intelligence that transcends borders and languages.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CORE VALUES ─── */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-24">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500 mb-6">Our Core Values</p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground mb-4">
              Built on <span className="text-muted-foreground font-light">Integrity.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {values.map((val, idx) => (
              <div key={val.title} className="group p-10 rounded-[2.5rem] border border-border/40 bg-white/20 dark:bg-white/5 backdrop-blur-3xl hover:border-orange-500/30 hover:-translate-y-4 transition-all duration-700 shadow-2xl shadow-black/5">
                <div className={`w-16 h-16 rounded-2xl ${val.bg} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-inner`}>
                  <div className={`bg-gradient-to-br ${val.color} rounded-xl p-3 shadow-lg`}>
                    <val.icon className="w-7 h-7 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-black mb-4 tracking-tight group-hover:text-orange-500 transition-colors">{val.title}</h3>
                <p className="text-[13px] text-muted-foreground leading-relaxed font-bold opacity-80">{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="relative z-10 py-48 px-6 text-center overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-6xl md:text-8xl font-black tracking-tight mb-12 leading-[0.9]">
            Be part of the<br />
            <span className="shimmer-text">Evolution.</span>
          </h2>
          <Link
            to="/signup"
            className="group inline-flex items-center justify-center gap-5 px-14 py-7 text-2xl font-black text-white rounded-[2.5rem] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(255,122,0,0.5)]"
            style={{ background: 'linear-gradient(135deg, #FF7A00, #FF0066, #9333ea)', boxShadow: '0 20px 60px -15px rgba(255, 0, 102, 0.4)' }}
          >
            Start Your Journey
            <ArrowRight className="w-8 h-8 group-hover:translate-x-3 transition-transform" />
          </Link>
        </div>
      </section>

      <footer className="relative z-10 border-t border-border/50 py-24 text-center text-muted-foreground">
        <p className="text-[10px] font-black tracking-[0.5em] uppercase opacity-30 mb-4">Aura AI · Digital Intelligence</p>
        <p className="text-[11px] font-bold opacity-20">© {new Date().getFullYear()} Designed for the Next Dimension.</p>
      </footer>
    </div>
  );
};

export default About;
