import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import Navbar from '@/components/Navbar';
import FloatingElements from '@/components/FloatingElements';

const Pricing = () => {
  const plans = [
    {
      name: 'Starter',
      price: 'Free',
      period: '',
      description: 'Perfect for getting started',
      features: ['5 AI requests per day', 'Basic support', 'Community access'],
    },
    {
      name: 'Pro',
      price: '$29',
      period: '/month',
      description: 'For professional users',
      features: ['Unlimited AI requests', 'Priority support', 'Advanced features', 'Custom integrations'],
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For large teams',
      features: ['Dedicated support', 'Custom solutions', 'On-premise deployment', 'SLA guaranteed'],
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <Navbar />

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingElements />
      </div>

      <section className="relative z-10 min-h-screen flex items-center px-6 md:px-12 pt-32 pb-12">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-16">
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Simple, Transparent<br />
              <span className="text-orange-500">Pricing</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
              Choose the perfect plan for your needs. No hidden fees, cancel anytime.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan) => (
              <div 
                key={plan.name}
                className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
                  plan.highlighted 
                    ? 'md:scale-105 ring-2 ring-orange-500 shadow-xl' 
                    : 'hover:shadow-lg'
                } auth-card`}
              >
                {/* Card Content */}
                <div className="relative flex flex-col h-full">
                  {plan.highlighted && (
                    <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      POPULAR
                    </div>
                  )}

                  {/* Plan Name */}
                  <h3 className="text-3xl font-bold text-card-foreground mb-2 pt-4">{plan.name}</h3>
                  
                  {/* Description */}
                  <p className="text-muted-foreground text-sm font-medium mb-8">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="mb-8">
                    <div className="text-5xl font-bold text-card-foreground">
                      {plan.price}
                    </div>
                    {plan.period && (
                      <div className="text-muted-foreground text-sm font-medium mt-2">
                        {plan.period}
                      </div>
                    )}
                  </div>

                  {/* Features List */}
                  <ul className="space-y-4 mb-10 grow">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <div className="p-1 rounded-full gradient-orange shrink-0 mt-0.5">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-muted-foreground font-medium">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button 
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                      plan.highlighted 
                        ? 'btn-primary' 
                        : 'btn-outline'
                    }`}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/" className="btn-primary inline-flex items-center gap-2">
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
