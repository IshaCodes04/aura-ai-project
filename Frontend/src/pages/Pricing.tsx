import { Link } from 'react-router-dom';
import { Check, ArrowRight, Zap, ShieldCheck, HelpCircle, Star, Minus } from 'lucide-react';
import Navbar from '@/components/Navbar';

const Pricing = () => {
  const plans = [
    {
      name: 'Starter',
      price: '0',
      period: 'Free Forever',
      description: 'Perfect for exploring Aura AI',
      features: ['50 AI requests per day', 'Basic memory access', 'Standard support', 'Mobile app access'],
      color: 'border-white/10',
    },
    {
      name: 'Pro',
      price: '29',
      period: 'per month',
      description: 'For power users & creators',
      features: ['Unlimited AI requests', 'Infinite vector memory', 'Priority Gemini access', 'Custom AI personalities', 'Advanced code generation'],
      highlighted: true,
      color: 'border-orange-500/50',
    },
    {
      name: 'Business',
      price: '99',
      period: 'per month',
      description: 'For teams & developers',
      features: ['Dedicated workspace', 'Admin dashboard', 'API access keys', 'SSO & Security features', '24/7 Priority support'],
      color: 'border-white/10',
    },
  ];

  const comparison = [
    { feature: 'Daily Requests', starter: '50', pro: 'Unlimited', business: 'Unlimited' },
    { feature: 'Vector Memory', starter: '100MB', pro: 'Infinite', business: 'Infinite' },
    { feature: 'Model Engine', starter: 'Gemini Flash', pro: 'Gemini Pro', business: 'Gemini Ultra' },
    { feature: 'API Access', starter: false, pro: true, business: true },
    { feature: 'Team Collaboration', starter: false, pro: false, business: true },
    { feature: 'Custom Training', starter: false, pro: 'Basic', business: 'Advanced' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden" style={{ fontFamily: "'Inter', 'Poppins', sans-serif" }}>
      <Navbar />

      {/* ─── LIQUID BACKGROUND ─── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="liquid-blob absolute opacity-20 dark:opacity-30" style={{ width: '60vw', height: '60vw', top: '-10%', left: '-10%', background: 'linear-gradient(135deg, #FF7A00 0%, #FF0066 100%)' }} />
        <div className="liquid-blob absolute opacity-10 dark:opacity-20" style={{ width: '40vw', height: '40vw', bottom: '0%', right: '-5%', animationDelay: '-5s', background: 'linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%)' }} />
      </div>

      <section className="relative z-10 pt-32 pb-20 px-4 md:px-8">
        {/* HERO */}
        <div className="max-w-4xl mx-auto w-full text-center mb-24">
          <div className="aura-fade-1 inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 backdrop-blur-xl border border-orange-500/20 bg-orange-500/5 text-orange-500 text-sm font-bold uppercase tracking-widest">
            <Star className="w-4 h-4 fill-current" />
            Pricing for Visionaries
          </div>
          <h1 className="aura-fade-2 text-5xl md:text-7xl font-black tracking-tight mb-8 leading-tight">
            Scale your thought <br />
            <span className="shimmer-text">at the speed of light.</span>
          </h1>
          <p className="aura-fade-3 text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
            Invest in the most advanced AI memory engine. Simple, powerful, and built for growth.
          </p>
        </div>

        {/* PRICING CARDS */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 mb-32">
          {plans.map((plan, i) => (
            <div 
              key={plan.name}
              className={`aura-fade-${i+1} relative rounded-[3rem] p-1 overflow-hidden transition-all duration-500 group ${
                plan.highlighted ? 'md:-translate-y-4 hover:-translate-y-6 scale-105' : 'hover:-translate-y-2'
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${plan.highlighted ? 'from-orange-500 via-rose-500 to-purple-600' : 'from-white/20 to-white/5'} opacity-20 group-hover:opacity-100 transition-opacity`}></div>
              <div className="relative h-full bg-background/60 backdrop-blur-3xl rounded-[2.9rem] p-10 border border-white/10">
                <h3 className="text-2xl font-black mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-8 font-semibold">{plan.description}</p>
                <div className="mb-8">
                  <span className="text-6xl font-black text-foreground">${plan.price}</span>
                  <span className="text-muted-foreground text-sm ml-2 font-black uppercase tracking-tighter">{plan.period}</span>
                </div>
                <ul className="space-y-4 mb-10 border-t border-white/5 pt-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm font-medium">
                      <Check className="w-4 h-4 text-orange-500" />
                      <span className="text-foreground/70">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/signup"
                  className={`w-full inline-flex items-center justify-center gap-3 py-5 rounded-2xl font-black text-sm transition-all duration-300 ${
                    plan.highlighted ? 'text-white' : 'border border-white/10 hover:bg-white/10'
                  }`}
                  style={plan.highlighted ? { background: 'linear-gradient(135deg, #FF7A00, #FF0066)', boxShadow: '0 15px 35px -10px rgba(255, 122, 0, 0.6)' } : {}}
                >
                  Choose {plan.name}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* COMPARISON TABLE (Ultimate Refinement) */}
        <div className="max-w-5xl mx-auto mb-40 aura-fade-up">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">The Fine <span className="text-orange-500 italic text-3xl md:text-5xl">Print.</span></h2>
            <p className="text-xl text-muted-foreground font-medium">Every detail matters when you're building the future.</p>
          </div>
          
          <div className="relative rounded-[3rem] border border-white/10 bg-white/5 backdrop-blur-3xl overflow-hidden shadow-2xl">
            {/* Subtle Gradient Glow for Pro Column Background */}
            <div className="absolute top-0 bottom-0 left-[50%] right-[25%] md:left-[50%] md:right-[25%] bg-orange-500/5 pointer-events-none border-x border-orange-500/10"></div>

            <table className="w-full text-left border-collapse relative z-10">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="p-8 md:p-10 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Capabilities</th>
                  <th className="p-8 md:p-10 text-center">
                    <span className="text-sm font-black uppercase tracking-widest text-foreground/60">Starter</span>
                  </th>
                  <th className="p-8 md:p-10 text-center">
                    <span className="text-sm font-black uppercase tracking-widest text-orange-500 drop-shadow-[0_0_10px_rgba(255,122,0,0.3)]">Pro</span>
                  </th>
                  <th className="p-8 md:p-10 text-center">
                    <span className="text-sm font-black uppercase tracking-widest text-foreground/60">Business</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr key={i} className="group border-b border-white/5 hover:bg-white/[0.03] transition-all duration-300">
                    <td className="p-8 md:p-10">
                      <div className="font-bold text-lg text-foreground/80 group-hover:text-foreground transition-colors">{row.feature}</div>
                    </td>
                    <td className="p-8 md:p-10 text-center">
                      <div className="flex justify-center font-medium text-muted-foreground">
                        {typeof row.starter === 'boolean' ? (row.starter ? <Check className="w-5 h-5 text-green-500/70" /> : <Minus className="w-5 h-5 opacity-10" />) : row.starter}
                      </div>
                    </td>
                    <td className="p-8 md:p-10 text-center bg-orange-500/[0.02]">
                      <div className="flex justify-center font-black text-orange-500 drop-shadow-sm">
                        {typeof row.pro === 'boolean' ? (row.pro ? <Check className="w-6 h-6 animate-pulse" /> : <Minus className="w-6 h-6 opacity-10" />) : row.pro}
                      </div>
                    </td>
                    <td className="p-8 md:p-10 text-center">
                      <div className="flex justify-center font-medium text-foreground/70">
                        {typeof row.business === 'boolean' ? (row.business ? <Check className="w-5 h-5 text-green-500/70" /> : <Minus className="w-5 h-5 opacity-10" />) : row.business}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ (Professional Enhancement) */}
        <div className="max-w-4xl mx-auto mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">Frequently Asked <span className="text-orange-500">Questions</span></h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { q: 'Can I change plans anytime?', a: 'Yes, you can upgrade or downgrade your plan at any time from your dashboard settings instantly.' },
              { q: 'What is Vector Memory?', a: 'It is Aura\'s ability to store and retrieve your long-term conversation context using high-dimensional embeddings.' },
              { q: 'Do you offer a free trial?', a: 'The Starter plan is free forever. For Pro features, we offer a 7-day money-back guarantee.' },
              { q: 'Is my data secure?', a: 'Absolutely. We use industry-standard AES-256 encryption and never share your data with third parties.' },
            ].map((faq, i) => (
              <div key={i} className="p-8 rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-md">
                <h4 className="text-lg font-bold mb-3 flex items-center gap-2 text-foreground">
                  <HelpCircle className="w-5 h-5 text-orange-500" />
                  {faq.q}
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* TRUST BADGE BAR */}
        <div className="max-w-4xl mx-auto text-center border-t border-white/10 pt-16">
          <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all">
            <ShieldCheck className="w-12 h-12" />
            <div className="text-2xl font-black tracking-tighter">SECURE CLOUD</div>
            <div className="text-2xl font-black tracking-tighter">GDPR COMPLIANT</div>
            <div className="text-2xl font-black tracking-tighter">256-BIT SSL</div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-border/50 py-12 text-center text-muted-foreground">
        <p className="text-sm">© {new Date().getFullYear()} <span className="font-bold text-foreground">Aura AI</span>. Empowering creators worldwide.</p>
      </footer>
    </div>
  );
};

export default Pricing;
