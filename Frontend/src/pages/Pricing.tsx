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
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden" style={{ fontFamily: "'Inter', 'Poppins', sans-serif" }}>
      <Navbar />

      {/* ─── LIQUID BACKGROUND (Sync with Home) ─── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="liquid-blob absolute" style={{ width: '60vw', height: '60vw', maxWidth: '750px', maxHeight: '750px', top: '-15%', left: '-20%', background: 'linear-gradient(135deg, #FF7A00 0%, #FF0066 50%, #9333ea 100%)', opacity: 0.15 }} />
        <div className="liquid-blob absolute" style={{ width: '50vw', height: '50vw', maxWidth: '650px', maxHeight: '650px', bottom: '-10%', right: '-15%', animationDelay: '-7s', animationDuration: '20s', background: 'linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 50%, #ec4899 100%)', opacity: 0.1 }} />
      </div>

      <section className="relative z-10 pt-40 pb-20">
        
        {/* ─── HERO SECTION ─── */}
        <div className="max-w-4xl mx-auto text-center px-6 mb-20">
          <div className="aura-fade-1 inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-8 backdrop-blur-xl border border-white/20 dark:border-white/10 bg-white/40 dark:bg-white/5 shadow-lg">
            <Star className="w-4 h-4 text-orange-500 fill-current animate-pulse" />
            <span className="text-sm font-semibold text-foreground/90 tracking-wide">Pricing for Visionaries</span>
          </div>
          <h1 className="aura-fade-2 text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.95]">
            Simple plans. <br />
            <span className="shimmer-text">Infinite flow.</span>
          </h1>
          <p className="aura-fade-3 text-xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed italic">
            "Transparent pricing for minds that move at the speed of light. No hidden costs, just pure intelligence."
          </p>
        </div>

        {/* ─── STATS STRIP ─── */}
        <section className="relative z-10 px-4 md:px-8 mb-32">
          <div className="max-w-5xl mx-auto">
            <div className="p-8 md:p-12 rounded-[3rem] border border-border/50 bg-card/30 backdrop-blur-2xl shadow-sm">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center">
                {[
                  { val: '500k+', label: 'Daily Syncs', color: 'text-orange-500' },
                  { val: 'No CC', label: 'Required', color: 'text-foreground' },
                  { val: '256-bit', label: 'SSL Secured', color: 'text-foreground' },
                  { val: '24/7', label: 'Always Live', color: 'text-orange-500' },
                ].map((s, i) => (
                  <div key={i} className="text-center group">
                    <div className={`text-4xl md:text-5xl font-black mb-2 tracking-tighter transition-transform group-hover:scale-105 duration-300 ${s.color}`}>{s.val}</div>
                    <div className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.3em] opacity-60">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── PRICING CARDS ─── */}
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 px-6 mb-40 items-center">
           {plans.map((plan, i) => (
             <div 
               key={plan.name}
               className={`relative p-10 md:p-12 rounded-[3rem] border transition-all duration-500 group flex flex-col h-full ${
                 plan.highlighted 
                 ? "bg-background shadow-[0_30px_70px_-20px_rgba(255,122,0,0.25)] border-orange-500/30 ring-1 ring-orange-500/10 z-20 md:scale-105" 
                 : "bg-card/40 backdrop-blur-xl border-border/50 hover:border-orange-500/20 hover:shadow-2xl z-10"
               }`}
             >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full text-[11px] font-black text-white uppercase tracking-[0.2em] shadow-xl z-30" style={{ background: 'linear-gradient(135deg, #FF7A00, #FF0066)' }}>
                    Most Popular
                  </div>
                )}
                
                <div className="mb-8">
                  <h3 className={`text-3xl font-black mb-2 tracking-tight ${plan.highlighted ? 'text-orange-500' : 'text-foreground'}`}>{plan.name}</h3>
                  <p className="text-muted-foreground text-xs font-bold uppercase tracking-[0.2em] opacity-70">{plan.description}</p>
                </div>
                
                <div className="flex items-baseline gap-1 mb-10">
                   <span className="text-6xl font-black tracking-tighter text-foreground">${plan.price}</span>
                   <span className="text-muted-foreground text-[10px] font-black uppercase tracking-widest">{plan.period}</span>
                </div>

                <div className="space-y-5 mb-12 flex-grow border-t border-border/50 pt-10">
                   {plan.features.map((f, idx) => (
                     <li key={idx} className="flex items-center gap-4 text-sm font-semibold list-none">
                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${plan.highlighted ? 'bg-orange-500/20 text-orange-500' : 'bg-muted text-muted-foreground'}`}>
                           <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                        <span className="text-foreground/80">{f}</span>
                     </li>
                   ))}
                </div>

                <Link
                  to="/signup"
                  className={`w-full inline-flex items-center justify-center gap-3 py-5 rounded-2xl font-black text-sm transition-all duration-300 group/btn ${
                    plan.highlighted ? 'text-white' : 'bg-foreground text-background hover:opacity-90'
                  }`}
                  style={plan.highlighted ? { background: 'linear-gradient(135deg, #FF7A00, #FF0066)', boxShadow: '0 15px 45px -10px rgba(255, 0, 102, 0.4)' } : {}}
                >
                  Get Started
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1.5 transition-transform" />
                </Link>
             </div>
           ))}
        </div>

        {/* ─── COMPARISON TABLE ─── */}
        <div className="max-w-5xl mx-auto px-6 mb-40">
           <div className="text-center mb-16">
             <h2 className="text-4xl font-black mb-4 tracking-tight">Capability Matrix</h2>
           </div>
           <div className="relative rounded-[3.5rem] border border-white/10 bg-white/5 backdrop-blur-3xl overflow-hidden shadow-2xl">
             <table className="w-full text-left border-collapse relative z-10">
               <thead>
                 <tr className="border-b border-white/10 bg-white/10">
                   <th className="p-10 text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground">Capabilities</th>
                   <th className="p-10 text-center text-xs font-black uppercase">Starter</th>
                   <th className="p-10 text-center text-xs font-black uppercase text-orange-500 bg-orange-500/5">Pro</th>
                   <th className="p-10 text-center text-xs font-black uppercase">Business</th>
                 </tr>
               </thead>
               <tbody>
                 {comparison.map((row, i) => (
                   <tr key={i} className="group border-b border-white/5 hover:bg-white/[0.04] transition-all duration-300">
                     <td className="p-10 font-bold text-xl text-foreground/80 group-hover:text-foreground transition-all">{row.feature}</td>
                     <td className="p-10 text-center font-bold text-muted-foreground">{typeof row.starter === 'boolean' ? (row.starter ? <Check className="w-6 h-6 mx-auto text-green-500/50" /> : <Minus className="w-6 h-6 mx-auto opacity-10" />) : row.starter}</td>
                     <td className="p-10 text-center font-black text-xl text-orange-500 bg-orange-500/[0.02] border-x border-white/5">{typeof row.pro === 'boolean' ? (row.pro ? <Check className="w-7 h-7 mx-auto" /> : <Minus className="w-7 h-7 mx-auto opacity-10" />) : row.pro}</td>
                     <td className="p-10 text-center text-foreground/60 font-bold">{typeof row.business === 'boolean' ? (row.business ? <Check className="w-6 h-6 mx-auto text-green-500/50" /> : <Minus className="w-6 h-6 mx-auto opacity-10" />) : row.business}</td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>

        {/* ─── TRUST BAND ─── */}
        <div className="max-w-4xl mx-auto px-6 mb-40 text-center">
           <div className="p-16 rounded-[4rem] border border-white/5 bg-white/5 backdrop-blur-3xl relative overflow-hidden">
              <ShieldCheck className="w-20 h-20 text-orange-500 mx-auto mb-10 animate-pulse" />
              <h2 className="text-4xl font-black mb-6 tracking-tighter">Security by <span className="shimmer-text">Oath.</span></h2>
              <p className="text-xl text-muted-foreground leading-relaxed font-bold italic">
                "We secure your intelligence like it's our own. Every thought is AES-256 encrypted and isolated in private clusters."
              </p>
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
            className="group inline-flex items-center justify-center gap-4 px-12 py-6 text-2xl font-black text-white rounded-[2.5rem] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(255,122,0,0.5)]"
            style={{ background: 'linear-gradient(135deg, #FF7A00, #FF0066)' }}
          >
            Start Syncing
            <ArrowRight className="w-8 h-8 group-hover:translate-x-3 transition-transform" />
          </Link>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/5 py-24 text-center text-muted-foreground">
        <p className="text-[10px] font-black tracking-[0.5em] uppercase opacity-20 mb-4">Aura AI · Digital Intelligence</p>
        <p className="text-xs font-bold opacity-10">© {new Date().getFullYear()} Designed for the Next Dimension.</p>
      </footer>
    </div>
  );
};

export default Pricing;
