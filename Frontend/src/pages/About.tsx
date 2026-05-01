import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Brain, Cpu, Zap, Heart } from 'lucide-react';
import Navbar from '@/components/Navbar';

const About = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden" style={{ fontFamily: "'Inter', 'Poppins', sans-serif" }}>
      <Navbar />

      {/* ─── HOME PAGE STYLE: LIQUID BACKGROUND ─── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="liquid-blob absolute opacity-20 dark:opacity-30" style={{ width: '60vw', height: '60vw', top: '-10%', left: '-10%', background: 'linear-gradient(135deg, #FF7A00 0%, #FF0066 100%)' }} />
        <div className="liquid-blob absolute opacity-10 dark:opacity-20" style={{ width: '40vw', height: '40vw', bottom: '0%', right: '-5%', animationDelay: '-5s', background: 'linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%)' }} />
      </div>

      <section className="relative z-10 pt-32 pb-20">
        
        {/* ─── HOME PAGE STYLE: HERO ─── */}
        <div className="max-w-4xl mx-auto text-center px-6 mb-20">
          <div className="aura-fade-1 inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 backdrop-blur-xl border border-orange-500/20 bg-orange-500/5 text-orange-500 text-sm font-bold uppercase tracking-widest">
            <Sparkles className="w-4 h-4 animate-pulse" />
            Our Vision
          </div>
          <h1 className="aura-fade-2 text-5xl md:text-7xl font-black tracking-tight mb-8 leading-tight">
            The future of <br />
            <span className="shimmer-text">Human Intelligence.</span>
          </h1>
          <p className="aura-fade-3 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
            Aura AI is an ethereal fusion of human creativity and machine precision. We build intelligent systems that don't just answer, but understand.
          </p>
        </div>

        {/* ─── HOME PAGE STYLE: STATS STRIP ─── */}
        <section className="relative z-10 py-12 px-4 md:px-8 mb-32 border-y border-white/5 bg-white/5 backdrop-blur-md">
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

        {/* ─── HOME PAGE STYLE: FEATURE CARDS (Bento Grid) ─── */}
        <div className="max-w-6xl mx-auto px-6 mb-40">
           <div className="text-center mb-16">
             <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">Core Pillars</h2>
           </div>
           <div className="grid md:grid-cols-3 gap-8">
             {[
               { icon: Brain, title: 'Infinite Memory', desc: 'Powered by Pinecone Vector indexing, Aura never forgets a detail you care about.' },
               { icon: Cpu, title: 'Deep Logic', desc: 'Leveraging Google Gemini Pro for complex reasoning and flawless code generation.' },
               { icon: Zap, title: 'Instant Flow', desc: 'Zero-latency WebSocket streaming. Because your thoughts wait for no one.' }
             ].map((p, i) => (
               <div key={i} className="p-10 rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-3xl hover:bg-white/10 transition-all duration-300">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                    <p.icon className="w-6 h-6 text-orange-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{p.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
               </div>
             ))}
           </div>
        </div>

        {/* ─── HOME PAGE STYLE: IMAGE/CONTENT SECTION ─── */}
        <div className="max-w-6xl mx-auto px-6 mb-40">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/3] border border-white/10 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop" 
                alt="AI Mission" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl font-black tracking-tight">Our Mission is <span className="text-orange-500 italic">Relational.</span></h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Most AI tools today are transactional—you ask, they answer, they forget. We believe intelligence should be <strong>relational</strong>. 
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                By integrating long-term vector memory with state-of-the-art reasoning, Aura grows with you. It learns your style, remembers your projects, and becomes an extension of your own mind.
              </p>
              <div className="pt-4 border-t border-white/5 flex items-center gap-4">
                 <Heart className="text-orange-500 fill-current w-6 h-6" />
                 <span className="text-lg font-bold italic">Built for the future creators.</span>
              </div>
            </div>
          </div>
        </div>

        {/* ─── HOME PAGE STYLE: CTA SECTION ─── */}
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-8">
            Ready for <br />
            <span className="shimmer-text">Infinite Synergy?</span>
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
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/5 py-16 text-center text-muted-foreground">
        <p className="text-xs font-bold tracking-[0.3em] uppercase opacity-30">Aura AI · Human Architecture</p>
        <p className="text-[10px] font-bold opacity-10 mt-2">© {new Date().getFullYear()} Designed for the Next Dimension.</p>
      </footer>
    </div>
  );
};

export default About;
