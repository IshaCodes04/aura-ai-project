import { Link } from 'react-router-dom';
import { Check, ArrowRight, Sparkles, Zap } from 'lucide-react';
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

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden" style={{ fontFamily: "'Inter', 'Poppins', sans-serif" }}>
      <Navbar />

      {/* ─── LIQUID BACKGROUND ─── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="liquid-blob absolute opacity-20 dark:opacity-30" style={{ width: '60vw', height: '60vw', top: '-10%', left: '-10%', background: 'linear-gradient(135deg, #FF7A00 0%, #FF0066 100%)' }} />
        <div className="liquid-blob absolute opacity-10 dark:opacity-20" style={{ width: '40vw', height: '40vw', bottom: '0%', right: '-5%', animationDelay: '-5s', background: 'linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%)' }} />
      </div>

      <section className="relative z-10 pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto w-full text-center mb-20">
          <div className="aura-fade-1 inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 backdrop-blur-xl border border-white/10 bg-white/5 text-orange-500 text-sm font-bold uppercase tracking-widest">
            <Zap className="w-4 h-4" />
            Simple & Honest
          </div>
          <h1 className="aura-fade-2 text-5xl md:text-7xl font-black tracking-tight mb-8 leading-tight">
            Plans for every <br />
            <span className="shimmer-text">level of genius.</span>
          </h1>
          <p className="aura-fade-3 text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
            Choose the perfect plan to amplify your workflow. No hidden fees, cancel anytime.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, i) => (
            <div 
              key={plan.name}
              className={`aura-fade-${i+1} relative rounded-[2.5rem] p-1 overflow-hidden transition-all duration-500 group ${
                plan.highlighted ? 'md:-translate-y-4 hover:-translate-y-6' : 'hover:-translate-y-2'
              }`}
            >
              {/* Card Border Glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${plan.highlighted ? 'from-orange-500 via-rose-500 to-purple-600' : 'from-white/20 to-white/5'} opacity-20 group-hover:opacity-100 transition-opacity`}></div>
              
              <div className="relative h-full bg-background/60 backdrop-blur-3xl rounded-[2.4rem] p-8 md:p-10 border border-white/10">
                {plan.highlighted && (
                  <div className="absolute top-6 right-6 px-4 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-widest" style={{ background: 'linear-gradient(135deg, #FF7A00, #FF0066)' }}>
                    Most Popular
                  </div>
                )}

                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-8 font-medium">{plan.description}</p>

                <div className="mb-8">
                  <span className="text-5xl font-black text-foreground">${plan.price}</span>
                  <span className="text-muted-foreground text-sm ml-2 font-bold">{plan.period}</span>
                </div>

                <ul className="space-y-4 mb-10">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm font-medium">
                      <div className="p-1 rounded-full bg-orange-500/10 text-orange-500">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="text-foreground/80">{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/signup"
                  className={`w-full inline-flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-sm transition-all duration-300 ${
                    plan.highlighted 
                      ? 'text-white shadow-lg' 
                      : 'border border-white/10 hover:bg-white/10'
                  }`}
                  style={plan.highlighted ? { background: 'linear-gradient(135deg, #FF7A00, #FF0066)', boxShadow: '0 10px 30px -10px rgba(255, 122, 0, 0.5)' } : {}}
                >
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* ─── BOTTOM BANNER ─── */}
        <div className="max-w-4xl mx-auto p-12 rounded-[3rem] border border-white/10 bg-white/5 backdrop-blur-3xl text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-3xl bg-orange-500/10 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-orange-500" />
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-4">Need a custom plan?</h2>
          <p className="text-muted-foreground text-lg mb-8">We offer specialized enterprise solutions for large organizations. Let's build something great together.</p>
          <Link to="/contact" className="text-orange-500 font-black text-lg flex items-center justify-center gap-2 group">
            Talk to our team <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </section>

      <footer className="relative z-10 border-t border-border/50 py-12 text-center text-muted-foreground">
        <p className="text-sm">© {new Date().getFullYear()} <span className="font-bold text-foreground">Aura AI</span>. Transparent pricing for infinite ideas.</p>
      </footer>
    </div>
  );
};

export default Pricing;
