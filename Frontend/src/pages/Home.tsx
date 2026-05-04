import { Link } from 'react-router-dom';
import { ArrowRight, Code2, MessageSquare, Lightbulb, Sparkles, Brain, Zap, Shield, Star } from 'lucide-react';
import Navbar from '@/components/Navbar';

const Home = () => {
  const capabilities = [
    {
      icon: Code2,
      title: 'Code Anything',
      description: 'Write, debug, and refactor any language. From React components to Python scripts — Aura has got you.',
      color: 'from-blue-500 to-cyan-500',
      bg: 'bg-blue-500/10',
    },
    {
      icon: MessageSquare,
      title: 'Ask Anything',
      description: 'Science, history, philosophy, or just daily life questions — no topic is too big or too small for Aura.',
      color: 'from-purple-500 to-pink-500',
      bg: 'bg-purple-500/10',
    },
    {
      icon: Lightbulb,
      title: 'Brainstorm Everything',
      description: 'Stuck on an idea? Aura is your creative partner. Get content ideas, business plans, or story plots in seconds.',
      color: 'from-orange-500 to-rose-500',
      bg: 'bg-orange-500/10',
    },
    {
      icon: Brain,
      title: 'Remembers You',
      description: 'Powered by Pinecone Vector memory, Aura learns from every conversation and personalizes responses just for you.',
      color: 'from-emerald-500 to-teal-500',
      bg: 'bg-emerald-500/10',
    },
    {
      icon: Zap,
      title: 'Instant Responses',
      description: 'Real-time streaming via WebSockets means you see Aura thinking and typing, with zero lag or waiting.',
      color: 'from-yellow-400 to-orange-500',
      bg: 'bg-yellow-500/10',
    },
    {
      icon: Shield,
      title: 'Private & Secure',
      description: 'Your conversations are yours only. End-to-end encrypted, never shared, never sold. Your trust is everything.',
      color: 'from-slate-500 to-blue-600',
      bg: 'bg-slate-500/10',
    },
  ];

  const useCases = [
    { emoji: '👩‍💻', title: 'Students', desc: 'Get homework help, explanations, and study plans.' },
    { emoji: '🚀', title: 'Developers', desc: 'Code faster, debug smarter, ship with confidence.' },
    { emoji: '✍️', title: 'Writers', desc: 'Overcome writer\'s block and craft compelling stories.' },
    { emoji: '💼', title: 'Professionals', desc: 'Draft emails, reports, and presentations instantly.' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden selection:bg-orange-100 selection:text-orange-900" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navbar />

      {/* ─── HERO SECTION ─── */}
      <section className="relative z-10 min-h-screen flex flex-col justify-center items-center px-6 md:px-12 pt-32 pb-24 text-center overflow-hidden">

        {/* Liquid Blobs Background */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30 dark:opacity-20">
          <div className="liquid-blob absolute" style={{ width: '65vw', height: '65vw', top: '-15%', left: '-20%', background: 'linear-gradient(135deg, #FF7A00 0%, #FF0066 50%, #9333ea 100%)', opacity: 0.15 }} />
          <div className="liquid-blob absolute" style={{ width: '55vw', height: '55vw', bottom: '-10%', right: '-15%', animationDelay: '-7s', background: 'linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 50%, #ec4899 100%)', opacity: 0.1 }} />
          <div className="liquid-blob absolute" style={{ width: '40vw', height: '40vw', top: '25%', right: '10%', animationDelay: '-3s', background: 'linear-gradient(135deg, #10b981 0%, #0ea5e9 100%)', opacity: 0.05 }} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">

          {/* Badge */}
          <div className="aura-fade-1 inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-10 backdrop-blur-xl border border-orange-500/20 bg-orange-500/5 shadow-lg">
            <Sparkles className="w-4 h-4 text-orange-500 animate-pulse" />
            <span className="text-[10px] font-black text-orange-600 uppercase tracking-[0.2em]">The Next Intelligence Cycle</span>
          </div>

          {/* Headline */}
          <h1 className="aura-fade-2 text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] mb-10">
            Intelligence <br />
            <span className="shimmer-text">flows with you.</span>
          </h1>

          {/* Subtitle */}
          <p className="aura-fade-3 text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-16 leading-relaxed font-medium opacity-80">
            Aura AI is your professional companion. Engineering logic, sparking creativity, and augmenting memory in one fluid experience.
          </p>

          {/* CTA Buttons */}
          <div className="aura-fade-4 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              to="/signup"
              className="aura-glow-btn group inline-flex items-center justify-center gap-4 px-10 py-5 text-xs font-black uppercase tracking-[0.3em] text-white rounded-3xl transition-all duration-700 hover:-translate-y-2"
              style={{ background: 'linear-gradient(135deg, #FF7A00, #FF0066)', boxShadow: '0 20px 50px -15px rgba(255, 122, 0, 0.4)' }}
            >
              Start Free Sync
              <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform duration-500" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 text-xs font-black uppercase tracking-[0.3em] rounded-3xl border border-border/50 backdrop-blur-2xl bg-white/40 dark:bg-white/5 hover:bg-white/60 dark:hover:bg-white/10 hover:-translate-y-2 transition-all duration-700"
            >
              Learn More
            </Link>
          </div>
        </div>

      </section>

      {/* ─── CAPABILITIES ─── */}
      <section className="relative z-10 py-40 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="liquid-blob absolute opacity-5 dark:opacity-10"
            style={{ width: '600px', height: '600px', bottom: '-10%', left: '-5%', animationDuration: '22s', animationDelay: '-4s', background: 'linear-gradient(135deg, #0ea5e9, #8b5cf6)' }}
          />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-32">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500 mb-6">Neural Capabilities</p>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-tight text-foreground">
              Everything. <span className="text-muted-foreground font-light italic">Intelligently.</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium opacity-70">One AI that replaces dozens of tools. Engineering logic, building vision, and augmenting human potential.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((cap, idx) => (
              <div key={cap.title} className="group p-10 rounded-[2.5rem] border border-border/50 bg-white/40 dark:bg-white/[0.03] backdrop-blur-3xl hover:border-orange-500/20 hover:-translate-y-3 transition-all duration-700 shadow-xl shadow-black/5" style={{ animationDelay: `${idx * 80}ms` }}>
                <div className={`w-14 h-14 rounded-2xl ${cap.bg} flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500`}>
                  <div className={`bg-gradient-to-br ${cap.color} rounded-xl p-2.5 shadow-lg`}>
                    <cap.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-black mb-4 tracking-tight group-hover:text-orange-500 transition-colors duration-500">{cap.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-medium opacity-80">{cap.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="relative z-10 py-16 px-6 md:px-12 overflow-hidden" style={{ background: 'linear-gradient(135deg, #FF7A00 0%, #FF0066 100%)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center text-white">
            {[
              { stat: '∞', label: 'Neural Capacity' },
              { stat: '<140ms', label: 'Sync Latency' },
              { stat: '100%', label: 'Privacy Flow' },
              { stat: '24/7', label: 'Node Uptime' },
            ].map(({ stat, label }) => (
              <div key={label} className="group">
                <div className="text-4xl md:text-5xl font-black mb-2 tracking-tighter group-hover:scale-110 transition-transform duration-500">{stat}</div>
                <div className="text-white/70 text-[10px] font-black uppercase tracking-[0.3em]">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative z-10 py-48 px-6 md:px-12 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="liquid-blob absolute opacity-10 dark:opacity-20"
            style={{ width: '80vw', height: '80vw', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', animationDuration: '20s', animationDelay: '-5s', background: 'linear-gradient(135deg, #FF7A00, #FF0066, #9333ea)' }}
          />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-10 leading-[0.9]">
            Meet <br />
            <span className="shimmer-text">your Aura.</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-16 leading-relaxed font-medium opacity-70 max-w-2xl mx-auto">
            Join the elite minds who chat, create, and build with Aura AI every single cycle.
          </p>
          <Link
            to="/signup"
            className="group inline-flex items-center justify-center gap-5 px-14 py-6 text-xs font-black uppercase tracking-[0.4em] text-white rounded-3xl transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(255,0,102,0.4)]"
            style={{ background: 'linear-gradient(135deg, #FF7A00, #FF0066, #9333ea)', boxShadow: '0 20px 50px -10px rgba(255, 0, 102, 0.4)' }}
          >
            Initiate Access
            <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition-transform duration-500" />
          </Link>
          <p className="mt-8 text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] opacity-40 italic">No credentials required for initial sync.</p>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="relative z-10 border-t border-border/50 py-20 px-6 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground opacity-30 mb-4">Aura AI · Human-Centric Intelligence</p>
        <p className="text-[11px] font-bold text-muted-foreground opacity-20">
          © {new Date().getFullYear()} Designed for the Next Dimension.
        </p>
      </footer>
    </div>
  );
};
    </div>
  );
};

export default Home;
