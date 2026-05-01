import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Brain, Cpu, ShieldCheck, Heart, Zap, Globe, Users, Trophy, Code2, Database, Layout, Shield } from 'lucide-react';
import Navbar from '@/components/Navbar';

const About = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden" style={{ fontFamily: "'Inter', 'Poppins', sans-serif" }}>
      <Navbar />

      {/* ─── LIQUID BACKGROUND ─── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="liquid-blob absolute opacity-20 dark:opacity-30" style={{ width: '60vw', height: '60vw', top: '-10%', left: '-10%', background: 'linear-gradient(135deg, #FF7A00 0%, #FF0066 100%)' }} />
        <div className="liquid-blob absolute opacity-10 dark:opacity-20" style={{ width: '40vw', height: '40vw', bottom: '0%', right: '0%', animationDelay: '-5s', background: 'linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%)' }} />
        <div className="liquid-blob absolute opacity-5 dark:opacity-10" style={{ width: '30vw', height: '30vw', top: '40%', right: '15%', animationDelay: '-12s', background: 'linear-gradient(135deg, #FF7A00 0%, #facc15 100%)' }} />
      </div>

      <section className="relative z-10 pt-32 pb-20 px-4 md:px-8">
        
        {/* ─── HERO SECTION ─── */}
        <div className="max-w-4xl mx-auto text-center mb-32">
          <div className="aura-fade-1 inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 backdrop-blur-xl border border-orange-500/20 bg-orange-500/5 text-orange-500 text-sm font-bold tracking-wide uppercase">
            <Sparkles className="w-4 h-4" />
            Our Story & Vision
          </div>
          <h1 className="aura-fade-2 text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-[1.05]">
            We're defining the <br />
            <span className="shimmer-text">future of synergy.</span>
          </h1>
          <p className="aura-fade-3 text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto font-medium">
            Aura AI isn't just a chatbot. It's a living intelligence designed to amplify human potential through speed, memory, and intuition.
          </p>
        </div>

        {/* ─── THE PHILOSOPHY ─── */}
        <div className="max-w-4xl mx-auto mb-32">
          <div className="aura-fade-4 grid md:grid-cols-2 gap-16 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-500 to-rose-500 rounded-[2.5rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
              <div className="relative rounded-[2.5rem] overflow-hidden aspect-square border border-white/10 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1620712943543-bcc4638ef808?q=80&w=1000&auto=format&fit=crop" 
                  alt="AI Human Synergy" 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                  <p className="text-white font-medium text-lg leading-snug italic">"Intelligence is not just about answers, it's about understanding the journey of thought."</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl font-black tracking-tight leading-tight">The Aura <br/><span className="text-orange-500">Philosophy</span></h2>
              <p className="text-muted-foreground text-lg leading-relaxed font-medium">
                Most AI tools today are transactional—you ask, they answer, they forget. We believe intelligence should be <strong>relational</strong>.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed font-medium">
                By integrating long-term vector memory with state-of-the-art reasoning, Aura grows with you. It learns your style, remembers your projects, and becomes an extension of your own mind.
              </p>
              <div className="flex gap-4 pt-4 border-t border-border/50">
                <div className="flex flex-col items-center">
                  <div className="h-10 w-1 bg-orange-500 rounded-full"></div>
                </div>
                <p className="text-foreground font-semibold italic text-lg leading-tight">
                  "Built for the curious, the creators, and the visionaries."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ─── TECHNOLOGY STACK (New Section) ─── */}
        <div className="max-w-5xl mx-auto mb-40">
           <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4 tracking-tight">Built on the <span className="gradient-text-orange">Edge.</span></h2>
            <p className="text-muted-foreground text-lg font-medium">The sophisticated stack that powers every interaction.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Cpu, name: 'Gemini Pro', desc: 'Reasoning Engine' },
              { icon: Database, name: 'Pinecone', desc: 'Vector Memory' },
              { icon: Zap, name: 'WebSocket', desc: 'Real-time Flow' },
              { icon: Shield, name: 'AES-256', desc: 'End-to-End Security' },
            ].map((tech, i) => (
              <div key={i} className="p-8 rounded-3xl border border-white/5 bg-white/5 backdrop-blur-xl text-center group hover:bg-white/10 transition-all duration-500">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <tech.icon className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="font-bold text-lg mb-1">{tech.name}</h3>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-black">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ─── ARCHITECTURE SECTION ─── */}
        <div className="max-w-4xl mx-auto mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4 tracking-tight">The Core Pillars</h2>
            <p className="text-muted-foreground text-lg font-medium">How we bridge the gap between human and machine.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { 
                icon: Brain, 
                title: 'Infinite Memory', 
                desc: 'Powered by Pinecone Vector indexing, Aura never forgets a detail you care about.',
                color: 'text-orange-500',
                bg: 'bg-orange-500/10'
              },
              { 
                icon: Cpu, 
                title: 'Deep Logic', 
                desc: 'Leveraging Google Gemini Pro for complex reasoning and flawless code generation.',
                color: 'text-blue-500',
                bg: 'bg-blue-500/10'
              },
              { 
                icon: Zap, 
                title: 'Instant Flow', 
                desc: 'Zero-latency WebSocket streaming. Because your thoughts wait for no one.',
                color: 'text-yellow-500',
                bg: 'bg-yellow-500/10'
              }
            ].map((pillar, i) => (
              <div key={i} className="group p-8 rounded-3xl border border-border/60 bg-background/50 backdrop-blur-md hover:border-orange-500/30 hover:-translate-y-2 transition-all duration-500">
                <div className={`w-12 h-12 rounded-2xl ${pillar.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <pillar.icon className={`w-6 h-6 ${pillar.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-3">{pillar.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ─── ROADMAP / IMPACT (New Section) ─── */}
        <div className="max-w-4xl mx-auto mb-32">
           <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
               <h2 className="text-4xl font-black mb-6 tracking-tight">The Future of <span className="shimmer-text">Interaction.</span></h2>
               <div className="space-y-6">
                 {[
                   { t: 'Multi-modal Fusion', d: 'Soon Aura will see and hear, understanding your world in 3D.' },
                   { t: 'Autonomous Agents', d: 'Aura won\'t just suggest code; it will build and deploy for you.' },
                   { t: 'Decentralized Memory', d: 'Giving you 100% control over your vector clusters.' },
                 ].map((step, i) => (
                   <div key={i} className="flex gap-4">
                     <div className="w-10 h-10 rounded-full border border-orange-500/30 flex items-center justify-center text-orange-500 font-black text-xs shrink-0">{i+1}</div>
                     <div>
                       <h4 className="font-bold text-foreground">{step.t}</h4>
                       <p className="text-sm text-muted-foreground">{step.d}</p>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
            <div className="p-10 rounded-[3rem] border border-white/10 bg-white/5 backdrop-blur-3xl text-center">
               <Trophy className="w-16 h-16 text-orange-500 mx-auto mb-6" />
               <h3 className="text-2xl font-black mb-2">Community Driven</h3>
               <p className="text-muted-foreground text-sm font-medium leading-relaxed mb-6">
                 We are built by creators, for creators. Our roadmap is defined by the thousands of users who help us shape the future every day.
               </p>
               <div className="flex justify-center -space-x-3">
                 {[1,2,3,4].map(n => (
                   <div key={n} className="w-10 h-10 rounded-full border-2 border-background bg-muted overflow-hidden">
                     <img src={`https://i.pravatar.cc/100?u=${n}`} alt="user" />
                   </div>
                 ))}
                 <div className="w-10 h-10 rounded-full border-2 border-background bg-orange-500 flex items-center justify-center text-white text-[10px] font-bold">+120k</div>
               </div>
            </div>
           </div>
        </div>

        {/* ─── VALUES SECTION ─── */}
        <div className="max-w-4xl mx-auto mb-32 p-10 md:p-16 rounded-[3rem] border border-border/50 bg-muted/20 backdrop-blur-3xl relative overflow-hidden text-center">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <ShieldCheck className="w-32 h-32 text-orange-500" />
          </div>
          <h2 className="text-3xl font-bold mb-6">Privacy as a Foundation</h2>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10 font-medium">
            Your data is your property. Every conversation with Aura is end-to-end encrypted and we never use your personal data to train public models. Trust is our most valuable feature.
          </p>
          <div className="inline-flex items-center gap-2 text-orange-500 font-bold">
            <Heart className="w-5 h-5 fill-current" />
            <span>Built with Integrity</span>
          </div>
        </div>

        {/* ─── FINAL CTA ─── */}
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-8 leading-tight">
            Ready to flow with <br />
            <span className="gradient-text-orange">Liquid Intelligence?</span>
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
              className="inline-flex items-center justify-center px-10 py-4 text-lg font-semibold rounded-2xl border border-border backdrop-blur-md bg-background/50 hover:bg-background/80 hover:-translate-y-1 transition-all duration-300"
            >
              Explore Home
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="relative z-10 border-t border-border/50 py-12 text-center text-muted-foreground">
        <p className="text-sm">© {new Date().getFullYear()} <span className="font-bold text-foreground">Aura AI</span>. Crafting the next dimension of AI interaction.</p>
      </footer>
    </div>
  );
};

export default About;
