import { Link } from 'react-router-dom';
import { Check, ArrowRight, Zap, Star, Minus, Sparkles, ShieldCheck } from 'lucide-react';
import Navbar from '@/components/Navbar';

const Pricing = () => {
  const plans = [
    {
      name: 'Starter',
      price: '0',
      period: 'Free Forever',
      description: 'Ideal for curiosity & explorers.',
      features: ['50 AI requests per day', 'Basic context recall', 'Community support', 'Desktop & Mobile sync'],
      cta: 'Start Free',
      highlighted: false
    },
    {
      name: 'Pro',
      price: '29',
      period: 'per month',
      description: 'The standard for creators.',
      features: ['Unlimited AI requests', 'Infinite vector memory', 'Priority Gemini Pro access', 'Custom personality nodes', 'Early feature beta'],
      cta: 'Get Started',
      highlighted: true
    },
    {
      name: 'Enterprise',
      price: '99',
      period: 'per month',
      description: 'Powering high-growth teams.',
      features: ['Dedicated AI clusters', 'SSO & Advanced Security', 'API & Webhook access', '24/7 Dedicated Support', 'SLA Guarantee'],
      cta: 'Contact Sales',
      highlighted: false
    },
  ];

  const comparison = [
    { feature: 'Response Speed', starter: 'Standard', pro: 'Ultra-Fast', enterprise: 'Instant' },
    { feature: 'Memory Cluster', starter: '100MB', pro: 'Infinite', enterprise: 'Infinite' },
    { feature: 'API Access', starter: false, pro: true, enterprise: true },
    { feature: 'Admin Controls', starter: false, pro: false, enterprise: true },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden selection:bg-orange-500/30" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navbar />

      {/* ─── LIQUID BACKGROUND ─── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="liquid-blob absolute opacity-20 dark:opacity-30" style={{ width: '70vw', height: '70vw', top: '-10%', left: '-10%', background: 'linear-gradient(135deg, #FF7A00 0%, #FF0066 100%)' }} />
        <div className="liquid-blob absolute opacity-10 dark:opacity-20" style={{ width: '50vw', height: '50vw', bottom: '0%', right: '0%', animationDelay: '-7s', background: 'linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%)' }} />
      </div>

      <section className="relative z-10 pt-40 pb-28 px-6 md:px-12">
        {/* HEADER */}
        <div className="max-w-4xl mx-auto text-center mb-24">
          <div className="aura-fade-1 inline-flex items-center gap-2 px-5 py-2 rounded-full mb-10 backdrop-blur-3xl border border-white/10 bg-white/5 text-orange-500 text-[10px] font-black uppercase tracking-[0.3em] shadow-xl">
             <Sparkles className="w-4 h-4 animate-pulse" />
             Elevate Your Mind
          </div>
          <h1 className="aura-fade-2 text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.95]">
            Simple plans. <br />
            <span className="shimmer-text italic">Profound impact.</span>
          </h1>
          <p className="aura-fade-3 text-xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
            Choose the plan that fits your ambition. No hidden costs. Just pure, unadulterated intelligence.
          </p>
        </div>

        {/* PRICING GRID (Bento Style) */}
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8 items-stretch mb-40">
           {plans.map((plan, i) => (
             <div 
               key={plan.name}
               className={`aura-fade-${i+1} group relative p-10 md:p-12 rounded-[3.5rem] bg-white/5 backdrop-blur-3xl border border-white/10 transition-all duration-700 flex flex-col justify-between ${
                 plan.highlighted ? 'border-orange-500/40 ring-1 ring-orange-500/20 shadow-[0_30px_100px_-20px_rgba(255,122,0,0.3)] md:scale-105' : 'hover:border-white/20'
               }`}
             >
                {plan.highlighted && (
                   <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-2 rounded-full text-[10px] font-black text-white uppercase tracking-[0.2em] shadow-2xl" style={{ background: 'linear-gradient(135deg, #FF7A00, #FF0066)' }}>
                     Most Popular Choice
                   </div>
                )}
                
                <div>
                   <h3 className={`text-3xl font-black mb-2 ${plan.highlighted ? 'text-orange-500' : 'text-foreground'}`}>{plan.name}</h3>
                   <p className="text-muted-foreground text-sm font-semibold mb-10 opacity-70 italic">{plan.description}</p>
                   
                   <div className="flex items-baseline gap-2 mb-12">
                      <span className="text-6xl font-black tracking-tighter">${plan.price}</span>
                      <span className="text-muted-foreground text-xs font-black uppercase tracking-widest">{plan.period}</span>
                   </div>

                   <ul className="space-y-5 mb-12">
                      {plan.features.map((f, idx) => (
                        <li key={idx} className="flex items-center gap-4 text-sm font-bold">
                           <div className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 ${plan.highlighted ? 'bg-orange-500 text-white shadow-[0_0_15px_rgba(255,122,0,0.5)]' : 'bg-white/10 text-white/50'}`}>
                              <Check className="w-3.5 h-3.5" />
                           </div>
                           <span className="text-foreground/80">{f}</span>
                        </li>
                      ))}
                   </ul>
                </div>

                <Link
                  to={plan.name === 'Enterprise' ? '/contact' : '/signup'}
                  className={`group relative w-full inline-flex items-center justify-center gap-3 py-5 rounded-[2rem] font-black text-sm transition-all duration-500 overflow-hidden ${
                    plan.highlighted ? 'text-white' : 'border border-white/10 hover:bg-white/10'
                  }`}
                  style={plan.highlighted ? { background: 'linear-gradient(135deg, #FF7A00, #FF0066)' } : {}}
                >
                  <span className="relative z-10">{plan.cta}</span>
                  <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-2 transition-transform" />
                  {plan.highlighted && (
                     <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  )}
                </Link>
             </div>
           ))}
        </div>

        {/* COMPARISON BAND */}
        <div className="max-w-4xl mx-auto mb-40">
           <div className="text-center mb-16">
              <h2 className="text-4xl font-black mb-4">The Nitty Gritty.</h2>
              <div className="h-1.5 w-24 bg-orange-500/50 mx-auto rounded-full"></div>
           </div>
           <div className="rounded-[3rem] border border-white/10 bg-white/5 backdrop-blur-3xl overflow-hidden shadow-2xl">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                       <th className="p-10 text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground">Capabilities</th>
                       <th className="p-10 text-center text-xs font-black uppercase">Free</th>
                       <th className="p-10 text-center text-xs font-black uppercase text-orange-500">Pro</th>
                       <th className="p-10 text-center text-xs font-black uppercase">Elite</th>
                    </tr>
                 </thead>
                 <tbody>
                    {comparison.map((row, idx) => (
                      <tr key={idx} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                         <td className="p-10 font-black text-lg text-foreground/80 group-hover:text-foreground transition-colors">{row.feature}</td>
                         <td className="p-10 text-center font-bold text-muted-foreground">{typeof row.starter === 'boolean' ? (row.starter ? <Check className="w-5 h-5 mx-auto text-green-500/50" /> : <Minus className="w-5 h-5 mx-auto opacity-10" />) : row.starter}</td>
                         <td className="p-10 text-center font-black text-orange-500 bg-orange-500/[0.02]">{typeof row.pro === 'boolean' ? (row.pro ? <Check className="w-6 h-6 mx-auto" /> : <Minus className="w-6 h-6 mx-auto opacity-10" />) : row.pro}</td>
                         <td className="p-10 text-center font-bold text-foreground/70">{typeof row.enterprise === 'boolean' ? (row.enterprise ? <Check className="w-5 h-5 mx-auto text-green-500/50" /> : <Minus className="w-5 h-5 mx-auto opacity-10" />) : row.enterprise}</td>
                      </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>

        {/* TRUST SECTION */}
        <div className="max-w-4xl mx-auto text-center p-16 rounded-[4rem] border border-white/5 bg-white/5 backdrop-blur-3xl">
           <div className="flex justify-center mb-8">
              <ShieldCheck className="w-16 h-16 text-orange-500 animate-pulse" />
           </div>
           <h3 className="text-3xl font-black mb-6 italic">Secure Intelligence.</h3>
           <p className="text-muted-foreground text-lg mb-12 font-medium leading-relaxed">
             Aura uses end-to-end encryption for every thought you sync. Your data is your property, isolated in private clusters and never sold.
           </p>
           <div className="flex flex-wrap justify-center gap-12 opacity-30 font-black tracking-[0.4em] text-[10px] uppercase">
              <span>PCI Compliant</span>
              <span>AES-256 Bit</span>
              <span>SOC2 Type II</span>
           </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/5 py-20 text-center text-muted-foreground">
        <p className="text-[10px] font-black tracking-[0.5em] uppercase opacity-20">Aura AI · Digital Sovereignty</p>
      </footer>
    </div>
  );
};

export default Pricing;
