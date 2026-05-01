import { Link } from 'react-router-dom';
import { Check, ArrowRight, Zap, Star, Minus, Sparkles, ShieldCheck } from 'lucide-react';
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
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navbar />

      {/* ─── THEME: LIQUID BACKGROUND (Same as Home) ─── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="liquid-blob absolute opacity-20 dark:opacity-30" style={{ width: '70vw', height: '70vw', top: '-10%', left: '-10%', background: 'linear-gradient(135deg, #FF7A00 0%, #FF0066 100%)' }} />
        <div className="liquid-blob absolute opacity-15 dark:opacity-20" style={{ width: '50vw', height: '50vw', bottom: '0%', right: '0%', animationDelay: '-7s', background: 'linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%)' }} />
      </div>

      <section className="relative z-10 pt-40 pb-20">
        
        {/* ─── CONTENT: HERO (Same punchy style as Home) ─── */}
        <div className="max-w-4xl mx-auto text-center px-6 mb-20">
          <div className="aura-fade-1 inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 backdrop-blur-xl border border-orange-500/20 bg-orange-500/5 text-orange-500 text-[10px] font-black uppercase tracking-[0.3em]">
            <Star className="w-3.5 h-3.5 fill-current animate-pulse" />
            Pricing for Visionaries
          </div>
          <h1 className="aura-fade-2 text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.95]">
            Simple plans. <br />
            <span className="shimmer-text">Infinite flow.</span>
          </h1>
          <p className="aura-fade-3 text-xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed italic">
            "Transparent pricing for minds that move at the speed of light. No hidden costs, just pure intelligence."
          </p>
        </div>

        {/* ─── THEME: STATS STRIP (Mirror of Home Page) ─── */}
        <section className="relative z-10 py-12 px-4 md:px-8 mb-32 border-y border-white/5 bg-white/5 backdrop-blur-md">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-12 md:gap-20 text-center">
              {[
                { val: '500k+', label: 'Daily Syncs' },
                { val: 'No CC', label: 'Required for Free' },
                { val: '256-bit', label: 'SSL Secured' },
                { val: '24/7', label: 'Support Sync' },
              ].map((s, i) => (
                <div key={i}>
                  <div className="text-3xl md:text-4xl font-black text-foreground mb-1">{s.val}</div>
                  <div className="text-muted-foreground text-[10px] font-black uppercase tracking-widest">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── THEME: PRICING CARDS (Glass Cards like Home) ─── */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6 mb-40">
           {plans.map((plan, i) => (
             <div 
               key={plan.name}
               className={`aura-fade-${i+1} relative p-12 rounded-[3.5rem] bg-white/5 backdrop-blur-3xl border border-white/10 flex flex-col hover:-translate-y-2 transition-all duration-500 group ${
                 plan.highlighted ? 'md:scale-105 border-orange-500/30 ring-1 ring-orange-500/20 shadow-2xl' : ''
               }`}
             >
                {plan.highlighted && (
                  <div className="absolute top-8 right-8 px-5 py-1.5 rounded-full text-[10px] font-black text-white uppercase tracking-[0.2em] shadow-xl" style={{ background: 'linear-gradient(135deg, #FF7A00, #FF0066)' }}>
                    Recommended
                  </div>
                )}
                
                <h3 className={`text-3xl font-black mb-2 ${plan.highlighted ? 'text-orange-500' : 'text-foreground'}`}>{plan.name}</h3>
                <p className="text-muted-foreground text-sm font-bold uppercase tracking-widest mb-10 opacity-60">{plan.description}</p>
                
                <div className="flex items-baseline gap-2 mb-12">
                   <span className="text-6xl font-black tracking-tighter text-foreground">${plan.price}</span>
                   <span className="text-muted-foreground text-xs font-black uppercase tracking-widest">{plan.period}</span>
                </div>

                <ul className="space-y-5 mb-12 flex-grow border-t border-white/5 pt-10">
                   {plan.features.map((f, idx) => (
                     <li key={idx} className="flex items-center gap-4 text-sm font-bold">
                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${plan.highlighted ? 'bg-orange-500/20 text-orange-500' : 'bg-white/5 text-white/50'}`}>
                           <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-foreground/70">{f}</span>
                     </li>
                   ))}
                </ul>

                <Link
                  to="/signup"
                  className={`w-full inline-flex items-center justify-center gap-3 py-5 rounded-[2.5rem] font-black text-sm transition-all duration-500 ${
                    plan.highlighted ? 'text-white' : 'border border-white/10 hover:bg-white/10'
                  }`}
                  style={plan.highlighted ? { background: 'linear-gradient(135deg, #FF7A00, #FF0066)', boxShadow: '0 15px 45px -10px rgba(255, 0, 102, 0.5)' } : {}}
                >
                  Choose {plan.name}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Link>
             </div>
           ))}
        </div>

        {/* ─── THEME: COMPARISON TABLE (Mirror Style) ─── */}
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

        {/* ─── THEME: TRUST BAND (Mirror Style) ─── */}
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
