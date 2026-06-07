import { Link } from 'react-router-dom';
import { Check, ArrowRight, Star, Minus, ShieldCheck, Cpu, Zap, Lock, Globe } from 'lucide-react';
import Navbar from '@/components/Navbar';

const Pricing = () => {
  const plans = [
    {
      name: 'Starter',
      price: '0',
      period: 'Free Forever',
      description: 'Explore the liquid flow.',
      features: ['50 AI requests per day', 'Basic vector memory', 'Standard support', 'Mobile app sync'],
      highlighted: false
    },
    {
      name: 'Pro',
      price: '29',
      period: 'per month',
      description: 'Unleash full potential.',
      features: ['Unlimited AI requests', 'Infinite vector memory', 'Priority Gemini Pro access', 'Custom personalities', 'Advanced logic'],
      highlighted: true
    },
    {
      name: 'Business',
      price: '99',
      period: 'per month',
      description: 'Scale without limits.',
      features: ['Dedicated workspace', 'Admin controls', 'API access keys', 'SSO Security', '24/7 VIP support'],
      highlighted: false
    },
  ];

  const comparison = [
    { feature: 'Daily Requests', starter: '50', pro: 'Unlimited', business: 'Unlimited' },
    { feature: 'Vector Memory', starter: '100MB', pro: 'Infinite', business: 'Infinite' },
    { feature: 'Model Engine', starter: 'Standard', pro: 'Gemini Pro', business: 'Ultra 2.0' },
    { feature: 'API Access', starter: false, pro: true, business: true },
    { feature: 'Team Sync', starter: false, pro: false, business: true },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden selection:bg-secondary/10 selection:text-foreground text-[14px]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navbar />

      {/* ─── LIQUID BACKGROUND BLOBS ─── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-30 dark:opacity-20">
        <div className="liquid-blob absolute" style={{ width: '60vw', height: '60vw', top: '-10%', left: '-10%', background: 'transparent', opacity: 0.15 }} />
        <div className="liquid-blob absolute" style={{ width: '40vw', height: '40vw', bottom: '-5%', right: '-5%', animationDelay: '-7s', background: 'transparent', opacity: 0.1 }} />
      </div>

      <section className="relative z-10 pt-48 pb-8 px-6">
        
        {/* ─── HERO SECTION ─── */}
        <div className="max-w-4xl mx-auto text-center mb-32 px-6">
          <div className="aura-fade-1 inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-8 backdrop-blur-xl border border-secondary/20 bg-secondary/5 shadow-lg">
            <Star className="w-4 h-4 text-secondary fill-current animate-pulse" />
            <span className="text-[10px] font-black text-secondary/90 uppercase tracking-[0.2em]">Pricing for Visionaries</span>
          </div>
          <h1 className="aura-fade-2 text-4xl md:text-6xl font-black tracking-tight mb-8 leading-[1.2]" style={{ color: 'hsl(var(--navy-blue))' }}>
            Simple plans. <br />
            <span className="shimmer-text">Elite Minds.</span>
          </h1>
          <p className="aura-fade-3 text-lg md:text-xl text-black dark:text-muted-foreground max-w-2xl mx-auto font-semibold leading-relaxed opacity-80">
            Transparent pricing for minds that move at the speed of light. No hidden costs, just pure intelligence.
          </p>
        </div>

        {/* ─── PRICING CARDS ─── */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 mb-24 items-center">
           {plans.map((plan, i) => (
             <div 
               key={plan.name}
               className={`relative p-10 md:p-14 rounded-[3rem] border transition-all duration-700 group flex flex-col h-full hover:-translate-y-4 ${
                 plan.highlighted 
                 ? "bg-white/40 dark:bg-white/5 backdrop-blur-3xl shadow-2xl shadow-secondary/20 border-secondary/30 ring-1 ring-secondary/10 z-20 md:scale-105" 
                 : "bg-white/20 dark:bg-white/[0.02] backdrop-blur-xl border-border/40 hover:border-secondary/20 z-10"
               }`}
             >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-8 py-2.5 rounded-full text-[10px] font-black text-white uppercase tracking-[0.3em] shadow-xl z-30" style={{ background: 'hsl(var(--secondary))' }}>
                    Most Popular
                  </div>
                )}
                
                <div className="mb-10">
                  <h3 className={`text-4xl font-black mb-2 tracking-tight ${plan.highlighted ? 'text-secondary' : 'text-foreground'}`}>{plan.name}</h3>
                  <p className="text-black dark:text-muted-foreground text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">{plan.description}</p>
                </div>
                
                <div className="flex items-baseline gap-2 mb-12">
                   <span className="text-7xl font-black tracking-tighter text-foreground">${plan.price}</span>
                   <span className="text-black dark:text-muted-foreground text-[11px] font-bold uppercase tracking-widest opacity-60">{plan.period}</span>
                </div>

                <div className="space-y-6 mb-16 flex-grow border-t border-border/30 pt-12">
                   {plan.features.map((f, idx) => (
                     <li key={idx} className="flex items-center gap-5 text-[13px] font-bold list-none">
                        <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 border ${plan.highlighted ? 'bg-secondary/10 border-secondary/20 text-secondary' : 'bg-muted/30 border-border/40 text-muted-foreground/60'}`}>
                           <Check className="w-4 h-4 stroke-[3]" />
                        </div>
                        <span className="text-foreground/70 tracking-tight">{f}</span>
                     </li>
                   ))}
                </div>

                <Link
                  to="/signup"
                  className={`w-full inline-flex items-center justify-center gap-4 py-6 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all duration-500 group/btn ${
                    plan.highlighted ? 'text-white' : 'bg-foreground text-background hover:bg-foreground/90'
                  }`}
                  style={plan.highlighted ? { background: 'hsl(var(--secondary))', boxShadow: '0 20px 50px -15px rgba(0,0,0,0.06)' } : {}}
                >
                  Get Started
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                </Link>
             </div>
           ))}
        </div>

        {/* ─── COMPARISON TABLE ─── */}
        <div className="max-w-5xl mx-auto px-6 mb-24">
           <div className="text-center mb-16">
             <h2 className="text-4xl font-black mb-4 tracking-tighter" style={{ color: 'hsl(var(--navy-blue))' }}>Capability Matrix</h2>
             <p className="text-[10px] font-black text-black dark:text-muted-foreground uppercase tracking-[0.4em]">Deep-dive feature analysis</p>
           </div>
           <div className="relative rounded-[3rem] border border-border/50 bg-white/20 dark:bg-white/5 backdrop-blur-3xl overflow-hidden shadow-2xl shadow-black/5">
             <table className="w-full text-left border-collapse relative z-10">
               <thead>
                 <tr className="border-b border-border/50 bg-white/40 dark:bg-black/20">
                   <th className="p-10 text-[10px] font-black uppercase tracking-[0.4em] text-black dark:text-muted-foreground">Capabilities</th>
                   <th className="p-10 text-center text-[10px] font-black uppercase tracking-widest">Starter</th>
                   <th className="p-10 text-center text-[10px] font-black uppercase tracking-widest text-secondary bg-secondary/5">Pro</th>
                   <th className="p-10 text-center text-[10px] font-black uppercase tracking-widest">Business</th>
                 </tr>
               </thead>
               <tbody>
                 {comparison.map((row, i) => (
                   <tr key={i} className="group border-b border-border/30 hover:bg-secondary/[0.03] transition-all duration-300">
                     <td className="p-10 font-black text-sm md:text-base text-foreground/80 group-hover:text-secondary transition-all uppercase tracking-tight">{row.feature}</td>
                     <td className="p-10 text-center font-bold text-black dark:text-muted-foreground/60">{typeof row.starter === 'boolean' ? (row.starter ? <Check className="w-6 h-6 mx-auto text-secondary/80" /> : <Minus className="w-6 h-6 mx-auto opacity-10" />) : row.starter}</td>
                     <td className="p-10 text-center font-bold text-lg text-secondary bg-secondary/[0.01] border-x border-border/30">{typeof row.pro === 'boolean' ? (row.pro ? <Check className="w-7 h-7 mx-auto" /> : <Minus className="w-7 h-7 mx-auto opacity-10" />) : row.pro}</td>
                     <td className="p-10 text-center text-black dark:text-foreground/60 font-bold">{typeof row.business === 'boolean' ? (row.business ? <Check className="w-6 h-6 mx-auto text-secondary/80" /> : <Minus className="w-6 h-6 mx-auto opacity-10" />) : row.business}</td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>

        {/* ─── FINAL CTA ─── */}
        <div className="max-w-4xl mx-auto text-center px-6 pt-8 pb-4">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-8 leading-[0.95]" style={{ color: 'hsl(var(--navy-blue))' }}>
            Scale your <br />
            <span className="shimmer-text">thought.</span>
          </h2>
          <Link 
            to="/signup" 
            className="group inline-flex items-center justify-center gap-5 px-12 py-6 text-xl font-black text-white rounded-[2.5rem] transition-all duration-500 hover:-translate-y-2"
            style={{ background: 'hsl(var(--secondary))' }}
          >
            Start Syncing
            <ArrowRight className="w-7 h-7 group-hover:translate-x-3 transition-transform" />
          </Link>
        </div>
      </section>


      {/* ─── WHY AURA BRAND SECTION ─── */}
      <section className="relative z-10 py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-secondary mb-6">Why Aura</p>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-6" style={{ color: 'hsl(var(--navy-blue))' }}>
              Intelligence that <span className="shimmer-text">compounds.</span>
            </h2>
            <p className="text-lg text-black dark:text-muted-foreground max-w-2xl mx-auto font-medium opacity-70 leading-relaxed">
              Unlike standard AI tools, Aura's memory-first architecture means every conversation builds on the last — making you exponentially more effective over time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[
              {
                icon: Cpu,
                title: 'Powered by Google Gemini',
                desc: 'Access one of the most advanced language models in the world, fine-tuned for your specific use case and communication style.',
              },
              {
                icon: Lock,
                title: 'Your Data. Your Rules.',
                desc: 'Zero data brokering. Zero ads. Your conversations are encrypted and stored only for your benefit — never shared, never sold.',
              },
              {
                icon: Zap,
                title: 'Sub-200ms Responses',
                desc: 'WebSocket-powered real-time streaming so thoughts and answers arrive instantly — keeping you in a state of flow.',
              },
            ].map((item, i) => (
              <div key={i} className="group p-10 rounded-[3rem] border border-border/40 bg-white/30 dark:bg-white/5 backdrop-blur-2xl hover:border-secondary/40 hover:-translate-y-3 transition-all duration-700 shadow-xl shadow-black/5">
                <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  <item.icon className="w-7 h-7 text-secondary" />
                </div>
                <h3 className="text-xl font-black tracking-tight mb-4" style={{ color: 'hsl(var(--navy-blue))' }}>{item.title}</h3>
                <p className="text-sm text-black dark:text-muted-foreground font-semibold opacity-70 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="relative rounded-[4rem] border border-secondary/20 bg-secondary/5 backdrop-blur-3xl p-16 md:p-20 overflow-hidden text-center shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-transparent pointer-events-none" />
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-secondary mb-6 relative z-10">Zero Risk. Infinite Upside.</p>
            <h3 className="text-4xl md:text-6xl font-black tracking-tighter leading-none mb-6 relative z-10" style={{ color: 'hsl(var(--navy-blue))' }}>
              Start free. <span className="shimmer-text">Scale when ready.</span>
            </h3>
            <p className="text-base text-black dark:text-muted-foreground font-medium opacity-60 max-w-xl mx-auto mb-10 relative z-10 leading-relaxed">
              No credit card required. No setup fees. Cancel anytime. Join thousands of users already working smarter with Aura.
            </p>
            <Link
              to="/signup"
              className="relative z-10 group inline-flex items-center justify-center gap-4 px-10 py-5 text-sm font-black text-white rounded-[2rem] transition-all duration-500 hover:-translate-y-2"
              style={{ background: 'hsl(var(--secondary))' }}
            >
              Get Started — It's Free
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

export default Pricing;


