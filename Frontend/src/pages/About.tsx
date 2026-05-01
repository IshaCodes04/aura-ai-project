import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Brain, Cpu, ShieldCheck, Heart, Zap, Globe, Users, Trophy, Target, Shield, MessageSquare } from 'lucide-react';
import Navbar from '@/components/Navbar';

const About = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navbar />

      {/* ─── LIQUID BACKGROUND (Subtle & Pro) ─── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="liquid-blob absolute opacity-20 dark:opacity-25" style={{ width: '60vw', height: '60vw', top: '-10%', left: '-10%', background: 'linear-gradient(135deg, #FF7A00 0%, #FF0066 100%)' }} />
        <div className="liquid-blob absolute opacity-10 dark:opacity-15" style={{ width: '40vw', height: '40vw', bottom: '10%', right: '5%', animationDelay: '-5s', background: 'linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%)' }} />
      </div>

      <section className="relative z-10 pt-32 pb-20">
        
        {/* ─── HERO SECTION ─── */}
        <div className="max-w-4xl mx-auto text-center px-6 mb-20">
          <div className="aura-fade-1 inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 backdrop-blur-xl border border-orange-500/20 bg-orange-500/5 text-orange-500 text-xs font-bold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            Defining Synergy
          </div>
          <h1 className="aura-fade-2 text-5xl md:text-7xl font-black tracking-tight mb-8 leading-tight">
            The future of <br />
            <span className="shimmer-text">Human Intelligence.</span>
          </h1>
          <p className="aura-fade-3 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto font-medium">
            Aura AI is an ethereal fusion of human creativity and machine precision. We build intelligent systems that don't just answer, but understand.
          </p>
        </div>

        {/* ─── STATS STRIP (Same as Home Page) ─── */}
        <section className="relative z-10 py-10 px-4 md:px-8 mb-32 border-y border-white/5 bg-white/5 backdrop-blur-md">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { stat: '500k+', label: 'Global Users' },
                { stat: '<1s', label: 'Response Time' },
                { stat: '100%', label: 'Privacy Oath' },
                { stat: '24/7', label: 'Availability' },
              ].map(({ stat, label }) => (
                <div key={label}>
                  <div className="text-3xl md:text-4xl font-black text-foreground mb-1">{stat}</div>
                  <div className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── THE MISSION ─── */}
        <div className="max-w-6xl mx-auto px-6 mb-40">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-orange-500/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/3] border border-white/10 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop" 
                  alt="AI Mission" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                />
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl font-black tracking-tight">Our Mission is <br/><span className="text-orange-500 italic">Relational.</span></h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Most AI tools today are transactional—you ask, they answer, they forget. We believe intelligence should be <strong>relational</strong>. 
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                By integrating long-term vector memory with state-of-the-art reasoning, Aura grows with you. It learns your style, remembers your projects, and becomes an extension of your own mind.
              </p>
              <div className="flex gap-4 pt-4 border-t border-white/5">
                <div className="flex flex-col items-center">
                   <div className="h-10 w-1 bg-orange-500 rounded-full"></div>
                </div>
                <p className="text-foreground font-semibold italic text-lg leading-tight italic">
                  "Built for the curious, the creators, and the visionaries."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ─── THE PILLARS (Clean Cards) ─── */}
        <div className="max-w-6xl mx-auto px-6 mb-40">
           <div className="text-center mb-16">
             <h2 className="text-4xl font-black mb-4 tracking-tight">The Core Pillars</h2>
             <p className="text-muted-foreground font-medium">Built on top of a zero-compromise architecture.</p>
           </div>
           <div className="grid md:grid-cols-3 gap-8">
             {[
               { icon: Brain, title: 'Infinite Memory', desc: 'Powered by Pinecone Vector indexing, Aura never forgets a detail you care about.', color: 'text-orange-500' },
               { icon: Cpu, title: 'Deep Logic', desc: 'Leveraging Google Gemini Pro for complex reasoning and flawless code generation.', color: 'text-blue-500' },
               { icon: Zap, title: 'Instant Flow', desc: 'Zero-latency WebSocket streaming. Because your thoughts wait for no one.', color: 'text-purple-500' }
             ].map((p, i) => (
               <div key={i} className="p-10 rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-3xl hover:border-orange-500/30 transition-all duration-500">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                    <p.icon className={`w-6 h-6 ${p.color}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{p.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
               </div>
             ))}
           </div>
        </div>

        {/* ─── TECH STACK (Professional Band) ─── */}
        <div className="max-w-6xl mx-auto px-6 mb-40">
           <div className="grid md:grid-cols-2 gap-20 items-center">
              <div className="order-2 md:order-1 space-y-8">
                <h2 className="text-4xl font-black tracking-tight">Enterprise-Grade <br/><span className="text-orange-500">Technology.</span></h2>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { icon: Shield, t: 'AES-256', d: 'End-to-end data vaulting.' },
                    { icon: Globe, t: 'Global CDN', d: 'Zero lag anywhere on earth.' },
                    { icon: Target, t: 'RAG 2.0', d: 'The latest in vector retrieval.' },
                    { icon: Users, t: 'Multi-User', d: 'Scale seamlessly with your team.' },
                  ].map((item, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex items-center gap-2 mb-1">
                        <item.icon className="w-4 h-4 text-orange-500" />
                        <span className="font-bold text-sm">{item.t}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{item.d}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="order-1 md:order-2 rounded-[2.5rem] overflow-hidden border border-white/10 aspect-square md:aspect-auto md:h-[400px]">
                <img 
                  src="https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1000&auto=format&fit=crop" 
                  alt="Tech Stack" 
                  className="w-full h-full object-cover" 
                />
              </div>
           </div>
        </div>

        {/* ─── SECURITY & PRIVACY ─── */}
        <div className="max-w-4xl mx-auto px-6 mb-40">
          <div className="p-12 md:p-16 rounded-[3rem] border border-border/50 bg-muted/20 backdrop-blur-3xl text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <ShieldCheck className="w-32 h-32 text-orange-500" />
            </div>
            <h2 className="text-3xl font-bold mb-6">Privacy as a Foundation</h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-10 font-medium">
              Your data is your property. Every conversation with Aura is end-to-end encrypted and we never use your personal data to train public models.
            </p>
            <div className="inline-flex items-center gap-2 text-orange-500 font-black tracking-widest text-sm uppercase">
              <Heart className="w-4 h-4 fill-current" />
              <span>Built with Integrity</span>
            </div>
          </div>
        </div>

        {/* ─── FINAL CTA ─── */}
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-8">
            Experience the <br />
            <span className="shimmer-text italic">Aura difference.</span>
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/signup" 
              className="group inline-flex items-center justify-center gap-3 px-10 py-4 text-lg font-bold text-white rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              style={{ background: 'linear-gradient(135deg, #FF7A00, #FF0066)', boxShadow: '0 8px 30px -5px rgba(255, 122, 0, 0.4)' }}
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/" 
              className="inline-flex items-center justify-center px-10 py-4 text-lg font-semibold rounded-2xl border border-border backdrop-blur-md bg-background/50 hover:bg-background/80 transition-all"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/5 py-16 text-center text-muted-foreground">
        <p className="text-xs font-bold tracking-[0.3em] uppercase opacity-30">Aura AI · Human Architecture</p>
      </footer>
    </div>
  );
};

export default About;
