import { Link } from 'react-router-dom';
import { Check, ArrowRight, Star, Minus, ShieldCheck } from 'lucide-react';
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
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden selection:bg-orange-100 selection:text-orange-900" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navbar />

      {/* ─── LIQUID BACKGROUND BLOBS ─── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-30 dark:opacity-20">
        <div className="liquid-blob absolute" style={{ width: '60vw', height: '60vw', top: '-10%', left: '-10%', background: 'linear-gradient(135deg, #FF7A00 0%, #FF0066 50%, #9333ea 100%)', opacity: 0.15 }} />
        <div className="liquid-blob absolute" style={{ width: '40vw', height: '40vw', bottom: '-5%', right: '-5%', animationDelay: '-7s', background: 'linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 50%, #ec4899 100%)', opacity: 0.1 }} />
      </div>

      <section className="relative z-10 pt-40 pb-20 px-6">
        
        {/* ─── HERO SECTION ─── */}
        <div className="max-w-4xl mx-auto text-center mb-32 px-6">
          <div className="aura-fade-1 inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-8 backdrop-blur-xl border border-orange-500/20 bg-orange-500/5 shadow-lg">
            <Star className="w-4 h-4 text-orange-500 fill-current animate-pulse" />
            <span className="text-[10px] font-black text-orange-600 uppercase tracking-[0.2em]">Pricing for Visionaries</span>
          </div>
          <h1 className="aura-fade-2 text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9] text-foreground">
            Simple plans. <br />
            <span className="shimmer-text">Infinite flow.</span>
          </h1>
          <p className="aura-fade-3 text-xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed opacity-80">
            Transparent pricing for minds that move at the speed of light. No hidden costs, just pure intelligence.
          </p>
        </div>

        {/* ─── PRICING CARDS ─── */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 mb-40 items-center">
           {plans.map((plan, i) => (
             <div 
               key={plan.name}
               className={`relative p-10 md:p-14 rounded-[3rem] border transition-all duration-700 group flex flex-col h-full hover:-translate-y-4 ${
                 plan.highlighted 
                 ? "bg-white/40 dark:bg-white/5 backdrop-blur-3xl shadow-2xl shadow-orange-500/20 border-orange-500/30 ring-1 ring-orange-500/10 z-20 md:scale-105" 
                 : "bg-white/20 dark:bg-white/[0.02] backdrop-blur-xl border-border/40 hover:border-orange-500/20 z-10"
               }`}
             >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-8 py-2.5 rounded-full text-[10px] font-black text-white uppercase tracking-[0.3em] shadow-xl z-30" style={{ background: 'linear-gradient(135deg, #FF7A00, #FF0066)' }}>
                    Most Popular
                  </div>
                )}
                
                <div className="mb-10">
                  <h3 className={`text-4xl font-black mb-2 tracking-tight ${plan.highlighted ? 'text-orange-500' : 'text-foreground'}`}>{plan.name}</h3>
                  <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.2em] opacity-60">{plan.description}</p>
                </div>
                
                <div className="flex items-baseline gap-2 mb-12">
                   <span className="text-7xl font-black tracking-tighter text-foreground">${plan.price}</span>
                   <span className="text-muted-foreground text-[11px] font-black uppercase tracking-widest opacity-60">{plan.period}</span>
                </div>

                <div className="space-y-6 mb-16 flex-grow border-t border-border/30 pt-12">
                   {plan.features.map((f, idx) => (
                     <li key={idx} className="flex items-center gap-5 text-[13px] font-bold list-none">
                        <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 border ${plan.highlighted ? 'bg-orange-500/10 border-orange-500/20 text-orange-500' : 'bg-muted/30 border-border/40 text-muted-foreground/60'}`}>
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
                  style={plan.highlighted ? { background: 'linear-gradient(135deg, #FF7A00, #FF0066)', boxShadow: '0 20px 50px -15px rgba(255, 0, 102, 0.4)' } : {}}
                >
                  Get Started
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                </Link>
             </div>
           ))}
        </div>

        {/* ─── COMPARISON TABLE ─── */}
        <div className="max-w-5xl mx-auto px-6 mb-40">
           <div className="text-center mb-16">
             <h2 className="text-4xl font-black mb-4 tracking-tighter text-foreground">Capability Matrix</h2>
             <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em]">Deep-dive feature analysis</p>
           </div>
           <div className="relative rounded-[3rem] border border-border/50 bg-white/20 dark:bg-white/5 backdrop-blur-3xl overflow-hidden shadow-2xl shadow-black/5">
             <table className="w-full text-left border-collapse relative z-10">
               <thead>
                 <tr className="border-b border-border/50 bg-white/40 dark:bg-black/20">
                   <th className="p-10 text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground">Capabilities</th>
                   <th className="p-10 text-center text-[10px] font-black uppercase tracking-widest">Starter</th>
                   <th className="p-10 text-center text-[10px] font-black uppercase tracking-widest text-orange-500 bg-orange-500/5">Pro</th>
                   <th className="p-10 text-center text-[10px] font-black uppercase tracking-widest">Business</th>
                 </tr>
               </thead>
               <tbody>
                 {comparison.map((row, i) => (
                   <tr key={i} className="group border-b border-border/30 hover:bg-orange-500/[0.02] transition-all duration-300">
                     <td className="p-10 font-black text-sm md:text-base text-foreground/80 group-hover:text-orange-500 transition-all uppercase tracking-tight">{row.feature}</td>
                     <td className="p-10 text-center font-bold text-muted-foreground/60">{typeof row.starter === 'boolean' ? (row.starter ? <Check className="w-6 h-6 mx-auto text-green-500/50" /> : <Minus className="w-6 h-6 mx-auto opacity-10" />) : row.starter}</td>
                     <td className="p-10 text-center font-black text-lg text-orange-500 bg-orange-500/[0.01] border-x border-border/30">{typeof row.pro === 'boolean' ? (row.pro ? <Check className="w-7 h-7 mx-auto" /> : <Minus className="w-7 h-7 mx-auto opacity-10" />) : row.pro}</td>
                     <td className="p-10 text-center text-foreground/60 font-bold">{typeof row.business === 'boolean' ? (row.business ? <Check className="w-6 h-6 mx-auto text-green-500/50" /> : <Minus className="w-6 h-6 mx-auto opacity-10" />) : row.business}</td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>

        {/* ─── FINAL CTA ─── */}
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-12 leading-[0.95]">
            Scale your <br />
            <span className="shimmer-text">thought.</span>
          </h2>
          <Link 
            to="/signup" 
            className="group inline-flex items-center justify-center gap-5 px-14 py-7 text-2xl font-black text-white rounded-[2.5rem] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(255,122,0,0.4)]"
            style={{ background: 'linear-gradient(135deg, #FF7A00, #FF0066)' }}
          >
            Start Syncing
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

export default Pricing;
