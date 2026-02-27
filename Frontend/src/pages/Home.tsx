import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Brain } from 'lucide-react';
import Navbar from '@/components/Navbar';
import FloatingElements from '@/components/FloatingElements';

const Home = () => {
  const features = [
    {
      icon: Brain,
      title: 'Smart Learning',
      description: 'AI that adapts and learns from your workflow patterns.',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Get instant responses and complete tasks in seconds.',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data is encrypted and never shared with third parties.',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <Navbar />

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingElements />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center px-6 md:px-12 pt-32 pb-12">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Hero Content */}
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-white/10 rounded-full mb-6 border border-transparent dark:border-white/10">
              <span className="w-2 h-2 bg-orange-500 rounded-full" />
              <span className="text-sm text-blue-900 dark:text-white font-semibold">Next-Gen AI Platform</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6" style={{ fontFamily: "'Inter', 'Poppins', sans-serif" }}>
              Aura AI — The<br />
              <span className="text-orange-500">Future of Intelligent</span>
              <br />
              Assistance
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl mb-8 leading-relaxed font-medium" style={{ fontFamily: "'Inter', 'Poppins', sans-serif" }}>
              Build smarter workflows with an AI assistant designed to boost productivity and adapt to your needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup" className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-3 text-lg">
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/login" className="btn-outline inline-flex items-center justify-center gap-2 px-8 py-3 text-lg">
                Sign In
              </Link>
            </div>
          </div>

          {/* Right Side - Feature Cards */}
          <div className="flex flex-col gap-6">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="auth-card p-6 flex items-start gap-4 hover:shadow-lg transition-all duration-300"
              >
                <div className="p-3 rounded-lg gradient-orange shrink-0">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-card-foreground">{feature.title}</h3>
                  <p className="mt-1 text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
