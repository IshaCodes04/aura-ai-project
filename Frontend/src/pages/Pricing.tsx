import { Link } from 'react-router-dom';
import { Check, ArrowRight, Zap, Star, Minus, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';

const Pricing = () => {
  const plans = [
    {
      name: 'Starter',
      price: '0',
      period: 'Free Forever',
      description: 'Explore the liquid flow.',
      features: ['50 AI requests per day', 'Basic vector memory', 'Standard reasoning', 'Mobile app sync'],
      gradient: 'from-blue-500/20 to-cyan-500/20',
      border: 'hover:border-blue-500/50'
    },
    {
      name: 'Pro',
      price: '29',
      period: 'per month',
      description: 'Unleash full potential.',
      features: ['Unlimited AI requests', 'Infinite vector memory', 'Priority Gemini Pro access', 'Custom personalities', 'Advanced code logic'],
      highlighted: true,
      gradient: 'from-orange-500/20 via-rose-500/20 to-purple-600/20',
      border: 'border-orange-500/50 hover:border-orange-500'
    },
    {
      name: 'Business',
      price: '99',
      period: 'per month',
      description: 'Scale without limits.',
      features: ['Dedicated workspace', 'Admin controls', 'API access keys', 'SSO Security', '24/7 VIP support'],
      gradient: 'from-purple-500/20 to-pink-500/20',
      border: 'hover:border-purple-500/50'
    },
  ];

  const comparison = [
    { feature: 'Daily Requests', starter: '50', pro: 'Unlimited', business: 'Unlimited' },
    { feature: 'Vector Memory', starter: '100MB', pro: 'Infinite', business: 'Infinite' },
    { feature: 'Model Engine', starter: 'Flash', pro: 'Pro 1.5', business: 'Ultra 2.0' },
    { feature: 'API Access', starter: false, pro: true, business: true },
    { feature: 'Team Sync', starter: false, pro: false, business: true },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden" style={{ fontFamily: "'Inter', 'Poppins', sans-serif" }}>
      <Navbar />

      {/* ─── ULTRA-INTENSE LIQUID BACKGROUND ─── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="liquid-blob absolute opacity-30 dark:opacity-50" style={{ width: '80vw', height: '80vw', top: '-20%', left: '-20%', background: 'linear-gradient(135deg, #FF7A00 0%, #FF0066 50%, #9333ea 100%)' }} />
        <div className="liquid-blob absolute opacity-20 dark:opacity-30" style={{ width: '60vw', height: '60vw', bottom: '-10%', right: '-10%', animationDelay: '-7s', background: 'linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 50%, #ec4899 100%)' }} />
      </div>

      <section className="relative z-10 pt-40 pb-20 px-4 md:px-8">
        {/* HERO */}
        <div className="max-w-5xl mx-auto text-center mb-24">
          <div className="aura-fade-1 inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-8 backdrop-blur-3xl border border-white/20 bg-white/5 shadow-[0_0_20px_rgba(255,122,0,0.2)]">
            <Sparkles className="w-4 h-4 text-orange-500 animate-pulse" />
            <span className="text-xs font-black text-foreground/90 tracking-[0.2em] uppercase">Premium Intelligence</span>
          </div>
          <h1 className="aura-fade-2 text-6xl md:text-8xl font-black tracking-tighter mb-10 leading-[0.95]">
            Simple pricing. <br />
            <span className="shimmer-text italic">Infinite power.</span>
          </h1>
          <p className="aura-fade-3 text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-medium">
            Invest in your most valuable asset: <span className="text-foreground">Time.</span> Choose a plan that grows with your ambition.
          </p>
        </div>

        {/* PRICING CARDS (Home Page Style) */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 mb-40">
          {plans.map((plan, i) => (
            <div 
              key={plan.name}
              className={`aura-fade-${i+1} group relative rounded-[3.5rem] p-[2px] transition-all duration-700 ${
                plan.highlighted ? 'md:-translate-y-6 scale-105 shadow-[0_40px_100px_-20px_rgba(255,122,0,0.3)]' : 'hover:-translate-y-3'
              }`}
            >
              {/* Animated Border Gradient */}
              <div className={`absolute inset-0 rounded-[3.5rem] bg-gradient-to-br ${plan.highlighted ? 'from-orange-500 via-rose-500 to-purple-600' : 'from-white/20 via-white/5 to-white/20'} opacity-30 group-hover:opacity-100 transition-opacity duration-700 animate-gradient-xy`}></div>
              
              <div className={`relative h-full rounded-[3.4rem] p-12 bg-background/80 backdrop-blur-3xl border border-white/5 flex flex-col`}>
                {plan.highlighted && (
                  <div className="absolute top-8 right-8 px-5 py-1.5 rounded-full text-[10px] font-black text-white uppercase tracking-[0.2em]" style={{ background: 'linear-gradient(135deg, #FF7A00, #FF0066)' }}>
                    Most Popular
                  </div>
                )}

                <div className="mb-8">
                  <h3 className={`text-3xl font-black mb-2 ${plan.highlighted ? 'text-orange-500' : 'text-foreground'}`}>{plan.name}</h3>
                  <p className="text-muted-foreground text-sm font-bold uppercase tracking-widest">{plan.description}</p>
                </div>

                <div className="mb-10">
                  <div className="flex items-baseline gap-1">
                    <span className="text-6xl font-black tracking-tighter text-foreground">${plan.price}</span>
                    <span className="text-muted-foreground text-sm font-bold uppercase tracking-widest">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-5 mb-12 flex-grow border-t border-white/5 pt-10">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-4 text-sm font-semibold group/item">
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-300 ${plan.highlighted ? 'bg-orange-500/20 text-orange-500 group-hover/item:scale-125' : 'bg-white/5 text-white/50'}`}>
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-foreground/70 group-hover/item:text-foreground transition-colors">{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/signup"
                  className={`w-full inline-flex items-center justify-center gap-3 py-5 rounded-[2rem] font-black text-sm transition-all duration-500 ${
                    plan.highlighted ? 'text-white' : 'border border-white/10 hover:bg-white/10'
                  }`}
                  style={plan.highlighted ? { background: 'linear-gradient(135deg, #FF7A00, #FF0066)', boxShadow: '0 15px 45px -10px rgba(255, 0, 102, 0.5)' } : {}}
                >
                  Choose {plan.name}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* COMPARISON TABLE (Ultra-Modern) */}
        <div className="max-w-5xl mx-auto mb-40 aura-fade-up">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Capabilities <span className="text-orange-500 italic">Sync.</span></h2>
            <div className="h-1.5 w-32 bg-gradient-to-r from-orange-500 to-rose-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="relative rounded-[4rem] border border-white/10 bg-white/5 backdrop-blur-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-purple-500/5 pointer-events-none"></div>
            <table className="w-full text-left border-collapse relative z-10">
              <thead>
                <tr className="border-b border-white/10 bg-white/10">
                  <th className="p-10 text-xs font-black uppercase tracking-[0.4em] text-muted-foreground/60">Features Matrix</th>
                  <th className="p-10 text-center text-sm font-black uppercase tracking-widest text-foreground/40">Starter</th>
                  <th className="p-10 text-center text-sm font-black uppercase tracking-widest text-orange-500 bg-orange-500/5 border-x border-white/10">Pro</th>
                  <th className="p-10 text-center text-sm font-black uppercase tracking-widest text-foreground/40">Business</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr key={i} className="group border-b border-white/5 hover:bg-white/[0.04] transition-all duration-300">
                    <td className="p-10">
                      <div className="font-bold text-xl text-foreground/80 group-hover:text-foreground group-hover:translate-x-2 transition-all">{row.feature}</div>
                    </td>
                    <td className="p-10 text-center">
                      <div className="flex justify-center font-bold text-muted-foreground">{typeof row.starter === 'boolean' ? (row.starter ? <Check className="w-6 h-6 text-green-500/50" /> : <Minus className="w-6 h-6 opacity-10" />) : row.starter}</div>
                    </td>
                    <td className="p-10 text-center bg-orange-500/[0.03] border-x border-white/5">
                      <div className="flex justify-center font-black text-xl text-orange-500 drop-shadow-[0_0_15px_rgba(255,122,0,0.4)]">{typeof row.pro === 'boolean' ? (row.pro ? <Check className="w-7 h-7" /> : <Minus className="w-7 h-7 opacity-10" />) : row.pro}</div>
                    </td>
                    <td className="p-10 text-center text-foreground/60 font-bold">
                      <div className="flex justify-center">{typeof row.business === 'boolean' ? (row.business ? <Check className="w-6 h-6 text-green-500/50" /> : <Minus className="w-6 h-6 opacity-10" />) : row.business}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ (Professional Grid) */}
        <div className="max-w-5xl mx-auto text-center border-t border-white/10 pt-32">
           <h2 className="text-4xl font-black mb-20 tracking-tight">Common <span className="gradient-text-orange">Curiosities.</span></h2>
           <div className="grid md:grid-cols-2 gap-8 text-left">
              {[
                { q: 'Can I change plans anytime?', a: 'Absolute fluidity. Upgrade or downgrade instantly from your command center.' },
                { q: 'What is Vector Memory?', a: 'Aura\'s infinite digital recall. It stores your context as mathematical flows for instant retrieval.' },
                { q: 'Is there a free trial?', a: 'Starter is free forever. Experience Pro with a 14-day zero-risk period.' },
                { q: 'How secure is my data?', a: 'Locked behind AES-256 liquid encryption. Your thoughts remain your property, always.' },
              ].map((faq, i) => (
                <div key={i} className="p-10 rounded-[3rem] border border-white/10 bg-white/5 backdrop-blur-3xl hover:bg-white/10 transition-all duration-500">
                  <h4 className="text-xl font-bold mb-4 flex items-center gap-3">
                    <Zap className="w-5 h-5 text-orange-500" />
                    {faq.q}
                  </h4>
                  <p className="text-muted-foreground text-lg leading-relaxed font-medium">{faq.a}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 py-20 text-center text-muted-foreground">
        <p className="text-sm font-bold tracking-[0.3em] uppercase opacity-30 mb-4">Aura AI · Digital Intelligence</p>
        <p className="text-xs">© {new Date().getFullYear()} Designed for the Future.</p>
      </footer>
    </div>
  );
};

export default Pricing;
