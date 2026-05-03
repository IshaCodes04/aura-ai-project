import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Brain, Zap, Shield, Globe, Users } from 'lucide-react';
import Navbar from '@/components/Navbar';

const About = () => {
  const values = [
    {
      icon: Brain,
      title: 'Cognitive Synergy',
      description: 'We don\'t just build tools; we build extensions of the human mind. Aura is designed to think with you, not just for you.',
      color: 'from-orange-500 to-rose-500',
      bg: 'bg-orange-500/10',
    },
    {
      icon: Shield,
      title: 'Uncompromising Trust',
      description: 'Privacy isn\'t a feature; it\'s our foundation. Your data is encrypted, isolated, and remains yours forever.',
      color: 'from-blue-500 to-cyan-500',
      bg: 'bg-blue-500/10',
    },
    {
      icon: Zap,
      title: 'Infinite Velocity',
      description: 'Built on edge-computing and WebSockets, Aura delivers intelligence at the speed of thought. Zero lag, pure flow.',
      color: 'from-yellow-400 to-orange-500',
      bg: 'bg-yellow-500/10',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden" style={{ fontFamily: "'Inter', 'Poppins', sans-serif" }}>
      <Navbar />

      {/* ─── LIQUID BACKGROUND (Sync with Home) ─── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="liquid-blob absolute" style={{ width: '60vw', height: '60vw', maxWidth: '750px', maxHeight: '750px', top: '-15%', left: '-20%', background: 'linear-gradient(135deg, #FF7A00 0%, #FF0066 50%, #9333ea 100%)', opacity: 0.15 }} />
        <div className="liquid-blob absolute" style={{ width: '50vw', height: '50vw', maxWidth: '650px', maxHeight: '650px', bottom: '-10%', right: '-15%', animationDelay: '-7s', animationDuration: '20s', background: 'linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 50%, #ec4899 100%)', opacity: 0.1 }} />
        <div className="liquid-blob absolute" style={{ width: '30vw', height: '30vw', maxWidth: '400px', maxHeight: '400px', top: '20%', right: '10%', animationDelay: '-3s', background: 'linear-gradient(135deg, #10b981 0%, #0ea5e9 100%)', opacity: 0.05 }} />
      </div>

      {/* ─── HERO SECTION ─── */}
      <section className="relative z-10 pt-40 pb-20 px-4 md:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="aura-fade-1 inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-8 backdrop-blur-xl border border-white/20 dark:border-white/10 bg-white/40 dark:bg-white/5 shadow-lg">
            <Sparkles className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-semibold text-foreground/90 tracking-wide">Our Story & Vision</span>
          </div>

          <h1 className="aura-fade-2 text-5xl md:text-7xl font-black tracking-tight leading-[1.05] mb-8">
            <span className="block text-foreground">Beyond Artificial.</span>
            <span className="shimmer-text block">Purely Personal.</span>
          </h1>

          <p className="aura-fade-3 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            Aura AI was born from a simple question: What if technology didn't just solve problems, but understood the person behind them?
          </p>
        </div>
      </section>

      {/* ─── MISSION SECTION (Bento Style) ─── */}
      <section className="relative z-10 py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-500 to-pink-500 rounded-[2.5rem] opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-500"></div>
              <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1620712943543-bcc4628c9757?q=80&w=1000&auto=format&fit=crop" 
                  alt="Aura Vision" 
                  className="w-full aspect-[4/3] object-cover scale-105 group-hover:scale-100 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <p className="text-sm font-bold uppercase tracking-widest mb-2 text-orange-400">The Mission</p>
                  <h3 className="text-2xl font-black">Democratizing Intelligence</h3>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-black mb-6 tracking-tight">Evolving the <span className="text-orange-500">Digital Soul.</span></h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  In a world of generic responses, Aura stands for depth. We've integrated <strong>Pinecone Long-Term Memory</strong> with <strong>Google Gemini's reasoning</strong> to create an AI that doesn't just clear its cache—it learns your preferences, your style, and your goals.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our goal is to make professional-grade AI accessible to everyone, from students drafting their first thesis to developers building the next unicorn.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                  <Users className="w-8 h-8 text-orange-500 mb-4" />
                  <h4 className="font-bold mb-1">Human Centric</h4>
                  <p className="text-xs text-muted-foreground">Designed for real people, not just data points.</p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                  <Globe className="w-8 h-8 text-blue-500 mb-4" />
                  <h4 className="font-bold mb-1">Global Scale</h4>
                  <p className="text-xs text-muted-foreground">Intelligence that transcends borders and languages.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CORE VALUES ─── */}
      <section className="relative z-10 py-28 px-4 md:px-8">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-500 mb-4">Our Values</p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
              Built on <span className="text-muted-foreground font-light">Integrity.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {values.map((val, idx) => (
              <div key={val.title} className="group p-8 rounded-3xl border border-border/70 bg-background/60 backdrop-blur-md hover:border-orange-500/30 hover:-translate-y-2 transition-all duration-500">
                <div className={`w-14 h-14 rounded-2xl ${val.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <div className={`bg-gradient-to-br ${val.color} rounded-xl p-2.5`}>
                    <val.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-orange-500 transition-colors">{val.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS STRIP ─── */}
      <section className="relative z-10 py-10 px-4 md:px-8 overflow-hidden" style={{ background: 'linear-gradient(135deg, #FF7A00 0%, #FF8C00 60%, #FF6B00 100%)' }}>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            {[
              { stat: '99.9%', label: 'Uptime' },
              { stat: '256-bit', label: 'Encryption' },
              { stat: 'Gemini', label: 'Core Engine' },
              { stat: 'Pinecone', label: 'Memory Lab' },
            ].map(({ stat, label }) => (
              <div key={label}>
                <div className="text-2xl md:text-3xl font-black mb-1">{stat}</div>
                <div className="text-white/80 text-[10px] font-bold uppercase tracking-wider">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative z-10 py-32 px-4 md:px-8 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="liquid-blob absolute opacity-5 dark:opacity-15"
            style={{ width: '800px', height: '800px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', animationDuration: '20s', animationDelay: '-5s', background: 'linear-gradient(135deg, #FF7A00, #FF0066, #9333ea)' }}
          />
        </div>
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-8">
            Be part of the<br />
            <span className="shimmer-text">Evolution.</span>
          </h2>
          <Link
            to="/signup"
            className="group inline-flex items-center justify-center gap-3 px-12 py-5 text-xl font-bold text-white rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            style={{ background: 'linear-gradient(135deg, #FF7A00, #FF0066, #9333ea)', boxShadow: '0 15px 40px -10px rgba(255, 0, 102, 0.4)' }}
          >
            Start Your Journey
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      <footer className="relative z-10 border-t border-border/50 py-12 px-4 text-center">
        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} <span className="font-bold text-foreground">Aura AI</span>. Crafting the Future of Personal Intelligence.
        </p>
      </footer>
    </div>
  );
};

export default About;
