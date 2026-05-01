import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Brain, Cpu, ShieldCheck, Heart, Zap, Globe, Users, Trophy, Code2, MessageSquare, Lightbulb } from 'lucide-react';
import Navbar from '@/components/Navbar';

const About = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden" style={{ fontFamily: "'Inter', 'Poppins', sans-serif" }}>
      <Navbar />

      {/* ─── ENHANCED LIQUID BACKGROUND ─── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="liquid-blob absolute opacity-25 dark:opacity-40" style={{ width: '70vw', height: '70vw', top: '-15%', left: '-15%', background: 'linear-gradient(135deg, #FF7A00 0%, #FF0066 50%, #9333ea 100%)' }} />
        <div className="liquid-blob absolute opacity-15 dark:opacity-25" style={{ width: '50vw', height: '50vw', bottom: '-10%', right: '-5%', animationDelay: '-7s', background: 'linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 50%, #ec4899 100%)' }} />
        <div className="liquid-blob absolute opacity-10 dark:opacity-15" style={{ width: '35vw', height: '35vw', top: '25%', right: '10%', animationDelay: '-15s', background: 'linear-gradient(135deg, #10b981 0%, #0ea5e9 100%)' }} />
      </div>

      <section className="relative z-10 pt-40 pb-28 px-4 md:px-8">
        
        {/* ─── HERO SECTION ─── */}
        <div className="max-w-5xl mx-auto text-center mb-32">
          <div className="aura-fade-1 inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-10 backdrop-blur-xl border border-white/20 bg-white/5 shadow-2xl">
            <Sparkles className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-bold text-foreground/90 tracking-widest uppercase">The Revolution of Thought</span>
          </div>
          <h1 className="aura-fade-2 text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-10 leading-[0.95]">
            Meet the <br />
            <span className="shimmer-text">Digital Soul.</span>
          </h1>
          <p className="aura-fade-3 text-xl md:text-3xl text-muted-foreground leading-relaxed max-w-3xl mx-auto font-medium">
            Aura AI is an ethereal fusion of human creativity and machine precision. We don't build tools; we build partners.
          </p>
        </div>

        {/* ─── STATS GRID (Impressive) ─── */}
        <div className="aura-fade-4 max-w-5xl mx-auto mb-40">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-1 rounded-[3rem] border border-white/10 bg-white/5 backdrop-blur-3xl shadow-2xl">
            {[
              { val: '500k+', label: 'Global Users', color: 'text-orange-500' },
              { val: '120k+', label: 'Daily Creators', color: 'text-pink-500' },
              { val: '100%', label: 'Privacy First', color: 'text-purple-500' },
              { val: '24/7', label: 'Availability', color: 'text-blue-500' },
            ].map((s, i) => (
              <div key={i} className="p-10 text-center group hover:bg-white/5 rounded-[2.5rem] transition-all duration-500">
                <div className={`text-4xl md:text-5xl font-black mb-2 transition-transform group-hover:scale-110 ${s.color}`}>{s.val}</div>
                <div className="text-[10px] uppercase tracking-[0.3em] font-black text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── HOW IT WORKS (The Brain) ─── */}
        <div className="max-w-5xl mx-auto mb-40">
          <div className="text-center mb-20 aura-fade-up">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">How Aura <span className="text-orange-500 italic">Thinks.</span></h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Beyond simple algorithms lies a sophisticated neural architecture designed for empathy and accuracy.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: Brain, 
                title: 'Neural Memory', 
                desc: 'Utilizing Pinecone Vector databases to ensure every context, every project, and every word you share is remembered forever.',
                gradient: 'from-orange-500 to-rose-500'
              },
              { 
                icon: Cpu, 
                title: 'Gemini Core', 
                desc: 'Powered by the latest Google Gemini models, delivering unprecedented reasoning that feels indistinguishable from human logic.',
                gradient: 'from-blue-500 to-indigo-600'
              },
              { 
                icon: Zap, 
                title: 'Fluid Stream', 
                desc: 'Our WebSocket architecture ensures that Aura starts responding the millisecond you stop thinking. Instant. Liquid.',
                gradient: 'from-purple-500 to-pink-500'
              }
            ].map((item, i) => (
              <div key={i} className="group relative p-1 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:-translate-y-4">
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-20 group-hover:opacity-40 transition-opacity`}></div>
                <div className="relative h-full p-10 bg-background/80 backdrop-blur-xl rounded-[2.4rem] border border-white/10 flex flex-col items-center text-center">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-8 shadow-lg group-hover:rotate-6 transition-transform`}>
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── THE PHILOSOPHY SECTION (Professional & Poetic) ─── */}
        <div className="max-w-5xl mx-auto mb-40">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1 space-y-10 aura-fade-left">
              <div className="space-y-4">
                <h2 className="text-5xl md:text-6xl font-black leading-tight">Our Mission is <br/><span className="gradient-text-orange">Humanity.</span></h2>
                <div className="h-2 w-24 bg-orange-500 rounded-full"></div>
              </div>
              <div className="space-y-6 text-xl text-muted-foreground leading-relaxed font-medium">
                <p>We believe that AI should not replace humans, but instead, liberate them. By handling the mundane, the technical, and the repetitive, Aura gives you the space to dream bigger.</p>
                <p>Aura is built on the pillars of <strong>Transparency</strong>, <strong>Integrity</strong>, and <strong>Innovation</strong>. We are here to make sure the future of intelligence is as kind as it is smart.</p>
              </div>
              <div className="pt-4">
                <Link to="/signup" className="inline-flex items-center gap-4 text-orange-500 text-2xl font-black group">
                  Start the Journey <ArrowRight className="w-8 h-8 group-hover:translate-x-3 transition-transform" />
                </Link>
              </div>
            </div>
            <div className="order-1 lg:order-2 relative aura-fade-right">
              <div className="absolute -inset-10 bg-orange-500/10 rounded-full blur-[100px] animate-pulse"></div>
              <div className="relative rounded-[3rem] overflow-hidden border border-white/20 shadow-[0_50px_100px_-20px_rgba(255,122,0,0.3)] aspect-[4/5] group">
                <img 
                  src="https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1000&auto=format&fit=crop" 
                  alt="Aura Visualization" 
                  className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-12">
                  <div>
                    <div className="text-orange-500 font-black text-xs uppercase tracking-[0.4em] mb-2">Philosophy</div>
                    <div className="text-white text-3xl font-bold italic leading-tight">"Where code meets the soul."</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── FINAL CALL TO ACTION ─── */}
        <div className="max-w-4xl mx-auto text-center aura-fade-up">
          <div className="relative p-16 md:p-24 rounded-[4rem] border border-white/10 bg-white/5 backdrop-blur-3xl overflow-hidden shadow-2xl">
             {/* Inner Glow */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-orange-500/10 blur-[80px]"></div>
             
             <h2 className="relative z-10 text-5xl md:text-7xl font-black tracking-tighter mb-10 leading-tight">
               Experience the <br />
               <span className="shimmer-text italic">Evolution.</span>
             </h2>
             <p className="relative z-10 text-xl text-muted-foreground mb-12 max-w-2xl mx-auto font-medium">
               Join 500,000+ users who have already found their digital soulmate. Aura is waiting for you.
             </p>
             <div className="relative z-10 flex flex-col sm:flex-row justify-center gap-6">
               <Link 
                 to="/signup" 
                 className="group inline-flex items-center justify-center gap-4 px-12 py-5 text-2xl font-black text-white rounded-3xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(255,122,0,0.5)]"
                 style={{ background: 'linear-gradient(135deg, #FF7A00, #FF0066)', boxShadow: '0 15px 40px -10px rgba(255, 0, 102, 0.4)' }}
               >
                 Sign Up Now
                 <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
               </Link>
               <Link 
                 to="/" 
                 className="inline-flex items-center justify-center px-10 py-5 text-xl font-bold rounded-3xl border border-white/20 backdrop-blur-md bg-white/5 hover:bg-white/10 hover:-translate-y-2 transition-all duration-300"
               >
                 Back to Home
               </Link>
             </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="relative z-10 border-t border-white/10 py-16 text-center text-muted-foreground">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-base mb-2">© {new Date().getFullYear()} <span className="font-black text-foreground">AURA AI</span></p>
          <p className="text-sm font-medium tracking-widest uppercase opacity-50">Built for the future · Powered by Intelligence</p>
        </div>
      </footer>
    </div>
  );
};

export default About;
