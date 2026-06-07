import { Link } from 'react-router-dom';
import { ArrowRight, Code2, MessageSquare, Lightbulb, Sparkles, Brain, Zap, Shield, Star } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingElements from '@/components/FloatingElements';

const Home = () => {
  const capabilities = [
    {
      icon: Code2,
      title: 'Code Anything',
      description: 'Write, debug, and refactor any language. From React components to Python scripts — Aura has got you.',
      color: '#7A8C5E',
      bg: 'bg-primary/10',
    },
    {
      icon: MessageSquare,
      title: 'Ask Anything',
      description: 'From quick facts to deep research — ask in plain language. Aura understands context and delivers precise, thoughtful answers every time.',
      color: '#7A8C5E',
      bg: 'bg-primary/10',
    },
    {
      icon: Lightbulb,
      title: 'Brainstorm Everything',
      description: 'Stuck on an idea? Aura is your creative partner. Get content ideas, business plans, or story plots in seconds.',
      color: '#7A8C5E',
      bg: 'bg-primary/10',
    },
    {
      icon: Brain,
      title: 'Remembers You',
      description: 'Aura stores your preferences, past conversations, and key details using long-term vector memory — so every session feels like a continuation, not a restart.',
      color: '#7A8C5E',
      bg: 'bg-primary/10',
    },
    {
      icon: Zap,
      title: 'Instant Responses',
      description: 'Real-time streaming via WebSockets means you see Aura thinking and typing, with zero lag or waiting.',
      color: '#7A8C5E',
      bg: 'bg-primary/10',
    },
    {
      icon: Shield,
      title: 'Private & Secure',
      description: 'Your conversations are yours only. End-to-end encrypted, never shared, never sold. Your trust is everything.',
      color: '#7A8C5E',
      bg: 'bg-primary/10',
    },
  ];

  const useCases = [
    { emoji: '👩‍💻', title: 'Students', desc: 'Get homework help, explanations, and study plans.' },
    { emoji: '🚀', title: 'Developers', desc: 'Code faster, debug smarter, ship with confidence.' },
    { emoji: '✍️', title: 'Writers', desc: 'Overcome writer\'s block and craft compelling stories.' },
    { emoji: '💼', title: 'Professionals', desc: 'Draft emails, reports, and presentations instantly.' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden selection:bg-secondary/10 selection:text-foreground text-[14px]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navbar />
      <FloatingElements />

      {/* ─── HERO SECTION ─── */}
      <section className="relative z-10 min-h-screen flex flex-col justify-center items-center px-6 md:px-12 pt-48 pb-24 text-center overflow-hidden">

        {/* Liquid Blobs Background */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30 dark:opacity-20">
          <div className="liquid-blob absolute" style={{ width: '65vw', height: '65vw', top: '-15%', left: '-20%', background: 'transparent', opacity: 0.15 }} />
          <div className="liquid-blob absolute" style={{ width: '55vw', height: '55vw', bottom: '-10%', right: '-15%', animationDelay: '-7s', background: 'transparent', opacity: 0.1 }} />
          <div className="liquid-blob absolute" style={{ width: '40vw', height: '40vw', top: '25%', right: '10%', animationDelay: '-3s', background: 'transparent', opacity: 0.05 }} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">

          {/* Badge */}
          <div className="aura-fade-1 inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-10 backdrop-blur-xl border border-secondary/20 bg-secondary/5 shadow-lg">
            <Sparkles className="w-4 h-4 text-secondary animate-pulse" />
            <span className="text-[10px] font-black text-secondary/90 uppercase tracking-[0.2em]">The Next Intelligence Cycle</span>
          </div>

          {/* Glowing Aura behind text - removed blur for flat design */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-transparent rounded-full pointer-events-none z-0" />

          {/* Headline */}
          <h1 className="aura-fade-2 text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.2] mb-10 relative z-10" style={{ color: 'hsl(var(--navy-blue))' }}>
            Intelligence <br />
            <span className="shimmer-text">flows with you.</span>
          </h1>

          {/* Subtitle */}
          <p className="aura-fade-3 text-lg md:text-xl text-black dark:text-muted-foreground max-w-2xl mx-auto mb-16 leading-relaxed font-medium opacity-80">
            Aura AI is your professional companion. Engineering logic, sparking creativity, and augmenting memory in one fluid experience.
          </p>

          {/* CTA Buttons */}
          <div className="aura-fade-4 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              to="/signup"
              className="aura-glow-btn group inline-flex items-center justify-center gap-4 px-10 py-5 text-xs font-black uppercase tracking-[0.3em] text-white rounded-3xl transition-all duration-700 hover:-translate-y-2"
              style={{ background: 'hsl(var(--secondary))', boxShadow: '0 20px 50px -15px rgba(232,197,71,0.25)' }}
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
            style={{ width: '600px', height: '600px', bottom: '-10%', left: '-5%', animationDuration: '22s', animationDelay: '-4s', background: 'transparent' }}
          />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-32">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary mb-6">Neural Capabilities</p>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-tight" style={{ color: 'hsl(var(--navy-blue))' }}>
              Everything. <span className="font-light italic" style={{ color: 'hsl(var(--foreground))' }}>Intelligently.</span>
            </h2>
            <p className="text-xl text-black dark:text-muted-foreground max-w-2xl mx-auto font-medium opacity-70">One AI that replaces dozens of tools. Engineering logic, building vision, and augmenting human potential.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((cap, idx) => (
              <div key={cap.title} className="group p-10 rounded-[2.5rem] border border-border/50 bg-white/40 dark:bg-white/[0.03] backdrop-blur-3xl hover:border-secondary/20 hover:-translate-y-3 transition-all duration-700 shadow-xl shadow-black/5" style={{ animationDelay: `${idx * 80}ms` }}>
                <div className={`w-14 h-14 rounded-2xl ${cap.bg} flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500`}>
                  <div className="rounded-xl p-2.5 shadow-lg" style={{ background: cap.color }}>
                    <cap.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-black mb-4 tracking-tight group-hover:text-secondary transition-colors duration-500">{cap.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-medium opacity-80">{cap.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="relative z-10 py-16 px-6 md:px-12 overflow-hidden mb-0" style={{ background: 'hsl(var(--primary))' }}>
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

      <Footer />
    </div>
  );
};

export default Home;



