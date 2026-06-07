import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Brain, Zap, Shield, Globe, Users, Cpu, Lock, Infinity } from 'lucide-react';
import Navbar from '@/components/Navbar';

const About = () => {
  const values = [
    {
      icon: Brain,
      title: 'Context-Aware Intelligence',
      description: 'Aura combines Google Gemini\'s reasoning with long-term vector memory so every response reflects your history, preferences, and goals — not a blank slate.',
      color: '#7A8C5E',
      bg: 'bg-primary/10',
    },
    {
      icon: Shield,
      title: 'Privacy by Design',
      description: 'Your conversations stay private and encrypted. We never sell your data. Trust and transparency are built into every layer of the platform.',
      color: '#7A8C5E',
      bg: 'bg-primary/10',
    },
    {
      icon: Zap,
      title: 'Real-Time Performance',
      description: 'Powered by WebSocket streaming, Aura delivers fast, fluid responses — whether you\'re coding, researching, writing, or brainstorming your next idea.',
      color: '#7A8C5E',
      bg: 'bg-primary/10',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden selection:bg-secondary/10 selection:text-foreground text-[14px]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navbar />

      {/* ─── LIQUID BACKGROUND BLOBS ─── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-30 dark:opacity-20">
        <div className="liquid-blob absolute" style={{ width: '60vw', height: '60vw', top: '-10%', left: '-10%', background: 'transparent', opacity: 0.15 }} />
        <div className="liquid-blob absolute" style={{ width: '40vw', height: '40vw', bottom: '-5%', right: '-5%', animationDelay: '-7s', background: 'transparent', opacity: 0.1 }} />
      </div>

      {/* ─── HERO SECTION ─── */}
      <section className="relative z-10 pt-48 pb-20 px-6 text-center">
        <div className="max-w-5xl mx-auto">
          <div className="aura-fade-1 inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-8 backdrop-blur-xl border border-secondary/20 bg-secondary/5 shadow-lg">
            <Sparkles className="w-4 h-4 text-secondary animate-pulse" />
            <span className="text-[10px] font-bold text-secondary/90 uppercase tracking-[0.2em]">About Aura AI</span>
          </div>

          <h1 className="aura-fade-2 text-5xl md:text-7xl font-black tracking-tight leading-[1.2] mb-8" style={{ color: 'hsl(var(--navy-blue))' }}>
            Intelligent Assistance. <br />
            <span className="shimmer-text">Built for You.</span>
          </h1>

          <p className="aura-fade-3 text-lg md:text-xl text-black dark:text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed font-medium opacity-80">
            Aura AI is a personal AI assistant designed to help you think, create, and work more effectively. From coding and research to writing and planning — Aura adapts to how you work and remembers what matters.
          </p>
        </div>
      </section>

      {/* ─── MISSION SECTION ─── */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative group">
              <div className="absolute -inset-6 rounded-[4rem] opacity-0 group-hover:opacity-0 transition-all duration-700" style={{ backgroundColor: 'transparent' }} />
              <div className="relative rounded-[3rem] overflow-hidden border border-border/50 shadow-2xl group">
                <img 
                  src="https://images.unsplash.com/photo-1620712943543-bcc4628c9757?q=80&w=1000&auto=format&fit=crop" 
                  alt="Aura Vision" 
                  className="w-full aspect-[4/3] object-cover scale-110 group-hover:scale-100 transition-transform duration-1000" 
                />
                <div className="absolute inset-0 opacity-40 group-hover:opacity-30 transition-opacity" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}></div>
                <div className="absolute bottom-10 left-10 right-10 text-white">
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] mb-3 text-secondary">Our Mission</p>
                  <h3 className="text-3xl font-black tracking-tight">Making AI Practical for Everyone</h3>
                </div>
              </div>
            </div>

            <div className="space-y-12">
              <div>
                <h2 className="text-5xl font-black mb-8 tracking-tighter leading-none" style={{ color: 'hsl(var(--navy-blue))' }}>A Smarter Way to <br /><span className="text-secondary">Work with AI.</span></h2>
                <p className="text-lg text-black dark:text-muted-foreground leading-relaxed mb-8 font-semibold opacity-80">
                  Most AI tools give you one-off answers. Aura is different. It uses Pinecone-powered long-term memory and Google Gemini to deliver responses that understand your context — your projects, your style, and your ongoing conversations.
                </p>
                <p className="text-lg text-black dark:text-muted-foreground leading-relaxed font-semibold opacity-80">
                  Whether you are a student preparing for exams, a developer shipping production code, a writer crafting content, or a professional managing daily tasks — Aura brings enterprise-grade intelligence into a simple, accessible experience.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="p-8 rounded-3xl bg-white/40 dark:bg-white/5 border border-border/50 backdrop-blur-2xl hover:border-secondary/30 transition-all group shadow-xl shadow-black/5">
                  <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Users className="text-secondary" size={24} />
                  </div>
                  <h4 className="text-sm font-black uppercase tracking-widest mb-2">User-First Design</h4>
                  <p className="text-xs text-black dark:text-muted-foreground font-semibold opacity-70">Built around real workflows — learning, building, writing, and problem-solving.</p>
                </div>
                <div className="p-8 rounded-3xl bg-white/40 dark:bg-white/5 border border-border/50 backdrop-blur-2xl hover:border-accent/30 transition-all group shadow-xl shadow-black/5">
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Globe className="text-accent" size={24} />
                  </div>
                  <h4 className="text-sm font-black uppercase tracking-widest mb-2">Always Evolving</h4>
                  <p className="text-xs text-black dark:text-muted-foreground font-semibold opacity-70">Continuously improving to deliver faster, smarter, and more reliable assistance.</p>
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
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary mb-6">Our Core Values</p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4" style={{ color: 'hsl(var(--navy-blue))' }}>
              What We <span className="font-light" style={{ color: 'hsl(var(--foreground))' }}>Stand For.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {values.map((val, idx) => (
              <div key={val.title} className="group p-10 rounded-[2.5rem] border border-border/40 bg-white/20 dark:bg-white/5 backdrop-blur-3xl hover:border-secondary/30 hover:-translate-y-4 transition-all duration-700 shadow-2xl shadow-black/5">
                <div className={`w-16 h-16 rounded-2xl ${val.bg} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-inner`}>
                  <div className="rounded-xl p-3 shadow-lg" style={{ background: 'hsl(var(--primary))' }}>
                          <val.icon className="w-7 h-7 text-white" />
                        </div>
                </div>
                <h3 className="text-2xl font-black mb-4 tracking-tight group-hover:text-secondary transition-colors">{val.title}</h3>
                <p className="text-[13px] text-black dark:text-muted-foreground leading-relaxed font-bold opacity-80">{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="relative z-10 pt-16 pb-8 px-6 text-center overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-[0.95]" style={{ color: 'hsl(var(--navy-blue))' }}>
            Ready to work<br />
            <span className="shimmer-text">smarter?</span>
          </h2>
          <p className="text-base text-black dark:text-muted-foreground max-w-xl mx-auto mb-8 font-medium opacity-80 leading-relaxed">
            Join Aura AI today and experience an assistant that learns with you, responds in real time, and keeps your data secure.
          </p>
          <Link
            to="/signup"
            className="group inline-flex items-center justify-center gap-5 px-12 py-6 text-xl font-black text-white rounded-[2.5rem] transition-all duration-500 hover:-translate-y-2"
            style={{ background: 'hsl(var(--secondary))', boxShadow: '0 20px 60px -15px rgba(0,0,0,0.06)' }}
          >
            Get Started Free
            <ArrowRight className="w-7 h-7 group-hover:translate-x-3 transition-transform" />
          </Link>
        </div>
      </section>

      {/* ─── AURA BRAND IDENTITY SECTION ─── */}
      <section className="relative z-10 py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-secondary mb-6">The Aura Difference</p>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-6" style={{ color: 'hsl(var(--navy-blue))' }}>
              Built to <span className="shimmer-text">Evolve.</span>
            </h2>
            <p className="text-lg text-black dark:text-muted-foreground max-w-2xl mx-auto font-medium opacity-70 leading-relaxed">
              Every conversation makes Aura smarter. Every interaction is an opportunity to understand you better. This is AI that doesn't just respond — it <em>remembers</em>.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {[
              { icon: Cpu, stat: '140ms', label: 'Avg. Response Time', desc: 'Lightning-fast inference with zero compromise on quality.' },
              { icon: Lock, stat: '256-bit', label: 'Encryption Standard', desc: 'Military-grade security protecting every conversation.' },
              { icon: Infinity, stat: '∞', label: 'Memory Capacity', desc: 'Pinecone-powered long-term memory that never forgets.' },
              { icon: Globe, stat: '24/7', label: 'Global Uptime', desc: 'Always-on infrastructure with 99.9% availability guarantee.' },
            ].map((item, i) => (
              <div key={i} className="group p-8 rounded-[2.5rem] border border-border/40 bg-white/30 dark:bg-white/5 backdrop-blur-2xl hover:border-secondary/40 hover:-translate-y-3 transition-all duration-700 text-center shadow-xl shadow-black/5">
                <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
                  <item.icon className="w-7 h-7 text-secondary" />
                </div>
                <div className="text-4xl font-black tracking-tighter mb-1" style={{ color: 'hsl(var(--navy-blue))' }}>{item.stat}</div>
                <div className="text-[9px] font-black uppercase tracking-[0.3em] text-secondary mb-4">{item.label}</div>
                <p className="text-[11px] text-black dark:text-muted-foreground font-semibold opacity-60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="relative rounded-[4rem] border border-secondary/20 bg-secondary/5 backdrop-blur-3xl p-16 md:p-24 overflow-hidden text-center shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-transparent pointer-events-none" />
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-secondary mb-6 relative z-10">Our Promise</p>
            <blockquote className="text-3xl md:text-5xl font-black tracking-tight leading-tight mb-8 relative z-10" style={{ color: 'hsl(var(--navy-blue))' }}>
              "We don't just build AI tools.<br />
              <span className="shimmer-text">We build your second brain.</span>"
            </blockquote>
            <p className="text-base text-black dark:text-muted-foreground font-medium opacity-60 max-w-xl mx-auto mb-10 relative z-10 leading-relaxed">
              Aura AI is engineered to be more than a chatbot. It's a persistent, evolving intelligence layer — designed to grow alongside your ambitions.
            </p>
            <Link
              to="/signup"
              className="relative z-10 group inline-flex items-center justify-center gap-4 px-10 py-5 text-sm font-black text-white rounded-[2rem] transition-all duration-500 hover:-translate-y-2"
              style={{ background: 'hsl(var(--secondary))' }}
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <p className="text-center text-[11px] font-bold text-muted-foreground opacity-40 mt-16 uppercase tracking-[0.4em]">
            © {new Date().getFullYear()} Aura AI · All rights reserved
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;



