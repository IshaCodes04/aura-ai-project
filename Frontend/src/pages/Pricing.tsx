import { Link } from 'react-router-dom';
import { Check, ArrowRight, Zap, ShieldCheck, HelpCircle, Star, Minus, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';

const Pricing = () => {
  const plans = [
    {
      name: 'Starter',
      price: '0',
      period: 'Free Forever',
      description: 'Perfect for exploring Aura AI',
      features: ['50 AI requests per day', 'Basic memory access', 'Standard reasoning', 'Mobile app access'],
    },
    {
      name: 'Pro',
      price: '29',
      period: 'per month',
      description: 'For power users & creators',
      features: ['Unlimited AI requests', 'Infinite vector memory', 'Priority Gemini access', 'Custom personalities', 'Advanced code logic'],
      highlighted: true,
    },
    {
      name: 'Business',
      price: '99',
      period: 'per month',
      description: 'For teams & developers',
      features: ['Dedicated workspace', 'Admin dashboard', 'API access keys', 'SSO Security', '24/7 Priority support'],
    },
  ];

  const comparison = [
    { feature: 'Daily Requests', starter: '50', pro: 'Unlimited', business: 'Unlimited' },
    { feature: 'Vector Memory', starter: '100MB', pro: 'Infinite', business: 'Infinite' },
    { feature: 'Model Engine', starter: 'Gemini Flash', pro: 'Gemini Pro', business: 'Gemini Ultra' },
    { feature: 'API Access', starter: false, pro: true, business: true },
    { feature: 'Team Sync', starter: false, pro: false, business: true },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navbar />

      {/* ─── LIQUID BACKGROUND ─── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="liquid-blob absolute opacity-20 dark:opacity-25" style={{ width: '60vw', height: '60vw', top: '-10%', left: '-10%', background: 'linear-gradient(135deg, #FF7A00 0%, #FF0066 100%)' }} />
        <div className="liquid-blob absolute opacity-10 dark:opacity-15" style={{ width: '40vw', height: '40vw', bottom: '10%', right: '5%', animationDelay: '-5s', background: 'linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%)' }} />
      </div>

      <section className="relative z-10 pt-32 pb-20 px-4 md:px-8">
        
        {/* HERO */}
        <div className="max-w-4xl mx-auto w-full text-center mb-20">
          <div className="aura-fade-1 inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 backdrop-blur-xl border border-orange-500/20 bg-orange-500/5 text-orange-500 text-xs font-bold tracking-widest uppercase">
            <Star className="w-3.5 h-3.5 fill-current" />
            Transparent Value
          </div>
          <h1 className="aura-fade-2 text-5xl md:text-7xl font-black tracking-tight mb-8 leading-tight">
            Simple plans for <br />
            <span className="shimmer-text">limitless minds.</span>
          </h1>
          <p className="aura-fade-3 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
            Choose the perfect plan to amplify your workflow. From curious individuals to scaling enterprises.
          </p>
        </div>

        {/* STATS STRIP */}
        <section className="relative z-10 py-10 px-4 md:px-8 mb-24 border-y border-white/5 bg-white/5 backdrop-blur-md">
           <div className="max-w-4xl mx-auto">
             <div className="flex flex-wrap justify-center gap-12 md:gap-20 text-center">
                {[
                  { val: '500k+', label: 'Daily Users' },
                  { val: 'No CC', label: 'Required for Free' },
                  { val: '256-bit', label: 'SSL Secured' },
                  { val: '24/7', label: 'Expert Support' },
                ].map((s, i) => (
                  <div key={i}>
                    <div className="text-2xl font-black text-foreground mb-0.5">{s.val}</div>
                    <div className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest">{s.label}</div>
                  </div>
                ))}
             </div>
           </div>
        </section>

        {/* PRICING CARDS (Clean Home-Style) */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 mb-32">
          {plans.map((plan, i) => (
            <div 
              key={plan.name}
              className={`relative rounded-[2.5rem] p-10 bg-white/5 backdrop-blur-3xl border border-white/10 transition-all duration-500 hover:-translate-y-2 group ${
                plan.highlighted ? 'md:scale-105 border-orange-500/30 ring-1 ring-orange-500/20 shadow-2xl' : ''
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-6 right-6 px-4 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-widest" style={{ background: 'linear-gradient(135deg, #FF7A00, #FF0066)' }}>
                  Recommended
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-muted-foreground text-sm mb-8 font-medium">{plan.description}</p>
              <div className="mb-8">
                <span className="text-5xl font-black text-foreground">${plan.price}</span>
                <span className="text-muted-foreground text-sm ml-2 font-bold uppercase tracking-tighter">{plan.period}</span>
              </div>
              <ul className="space-y-4 mb-12 flex-grow border-t border-white/5 pt-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm font-medium">
                    <Check className={`w-4 h-4 ${plan.highlighted ? 'text-orange-500' : 'text-muted-foreground'}`} />
                    <span className="text-foreground/70">{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/signup"
                className={`w-full inline-flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-sm transition-all duration-300 ${
                  plan.highlighted ? 'text-white' : 'border border-white/10 hover:bg-white/10'
                }`}
                style={plan.highlighted ? { background: 'linear-gradient(135deg, #FF7A00, #FF0066)', boxShadow: '0 8px 25px -5px rgba(255, 122, 0, 0.4)' } : {}}
              >
                Choose {plan.name}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        {/* COMPARISON TABLE (Balanced UI) */}
        <div className="max-w-5xl mx-auto mb-40">
           <div className="text-center mb-16">
             <h2 className="text-4xl font-black tracking-tight mb-4">Detailed Comparison</h2>
             <p className="text-muted-foreground">Every capability, broken down by plan.</p>
           </div>
           <div className="rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-3xl overflow-hidden shadow-xl">
             <table className="w-full text-left border-collapse">
               <thead>
                 <tr className="border-b border-white/10 bg-white/5">
                   <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Capabilities</th>
                   <th className="p-8 text-center text-[10px] font-black uppercase tracking-widest">Starter</th>
                   <th className="p-8 text-center text-[10px] font-black uppercase tracking-widest text-orange-500">Pro</th>
                   <th className="p-8 text-center text-[10px] font-black uppercase tracking-widest">Business</th>
                 </tr>
               </thead>
               <tbody>
                 {comparison.map((row, i) => (
                   <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                     <td className="p-8 font-bold text-foreground/80">{row.feature}</td>
                     <td className="p-8 text-center text-sm font-medium">{typeof row.starter === 'boolean' ? (row.starter ? <Check className="w-4 h-4 mx-auto text-green-500/50" /> : <Minus className="w-4 h-4 mx-auto opacity-10" />) : row.starter}</td>
                     <td className="p-8 text-center text-sm font-black text-orange-500 bg-orange-500/[0.02]">{typeof row.pro === 'boolean' ? (row.pro ? <Check className="w-5 h-5 mx-auto" /> : <Minus className="w-5 h-5 mx-auto opacity-10" />) : row.pro}</td>
                     <td className="p-8 text-center text-sm font-medium">{typeof row.business === 'boolean' ? (row.business ? <Check className="w-4 h-4 mx-auto text-green-500/50" /> : <Minus className="w-4 h-4 mx-auto opacity-10" />) : row.business}</td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>

        {/* FAQ GRID */}
        <div className="max-w-4xl mx-auto mb-32 px-6">
           <div className="text-center mb-16">
             <h2 className="text-4xl font-black tracking-tight mb-4">Pricing FAQ</h2>
           </div>
           <div className="grid md:grid-cols-2 gap-6">
             {[
               { q: 'Can I cancel anytime?', a: 'Yes, cancel your subscription at any time from your dashboard. No strings attached.' },
               { q: 'Is there a free trial?', a: 'Our Starter plan is free forever. For Pro, we offer a 14-day satisfaction guarantee.' },
               { q: 'What is vector memory?', a: 'It is the "Digital Brain" of Aura that stores your context for months of recall.' },
               { q: 'Can I upgrade later?', a: 'Absolutely. Upgrade instantly and only pay the pro-rated difference.' },
             ].map((faq, i) => (
               <div key={i} className="p-8 rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-3xl">
                 <h4 className="text-lg font-bold mb-2 flex items-center gap-2">
                   <HelpCircle className="w-4 h-4 text-orange-500" />
                   {faq.q}
                 </h4>
                 <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
               </div>
             ))}
           </div>
        </div>

        {/* FINAL CTA */}
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-8">
            Ready to scale <br />
            <span className="shimmer-text">your thought?</span>
          </h2>
          <Link 
            to="/signup" 
            className="group inline-flex items-center justify-center gap-4 px-12 py-5 text-2xl font-black text-white rounded-[2.5rem] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(255,122,0,0.5)]"
            style={{ background: 'linear-gradient(135deg, #FF7A00, #FF0066)' }}
          >
            Get Started Free
            <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/5 py-16 text-center text-muted-foreground">
        <p className="text-xs font-bold tracking-[0.3em] uppercase opacity-30">Aura AI · Digital Value</p>
      </footer>
    </div>
  );
};

export default Pricing;
