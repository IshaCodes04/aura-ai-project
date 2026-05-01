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

          {/* Right Side - Visuals & Features */}
          <div className="relative flex flex-col gap-6 mt-10 lg:mt-0">
            {/* Mock Chat Interface (Glassmorphism) */}
            <div className="absolute -top-12 -right-8 w-72 md:w-80 bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-5 rounded-2xl shadow-2xl z-20 transform rotate-3 hover:rotate-0 transition-transform duration-500 hidden md:block">
              <div className="flex items-center gap-3 mb-4 border-b border-white/10 pb-3">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="space-y-4">
                <div className="flex gap-3 items-end">
                  <div className="w-8 h-8 rounded-full gradient-orange flex items-center justify-center text-white text-xs font-bold shrink-0">A</div>
                  <div className="bg-muted px-4 py-2 rounded-2xl rounded-bl-none text-sm shadow-sm">
                    How can I help you build today? 🚀
                  </div>
                </div>
                <div className="flex gap-3 items-end justify-end">
                  <div className="bg-orange-500 text-white px-4 py-2 rounded-2xl rounded-br-none text-sm shadow-sm">
                    Write a React component for a dashboard.
                  </div>
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0">U</div>
                </div>
              </div>
            </div>

            {/* Feature Cards */}
            <div className="flex flex-col gap-5 relative z-10 md:mt-48 lg:mt-32">
              {features.map((feature, index) => (
                <div 
                  key={feature.title}
                  className="auth-card p-5 flex items-start gap-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white/80 dark:bg-card/80 backdrop-blur-lg"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="p-3 rounded-xl gradient-orange shrink-0 shadow-md">
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-card-foreground">{feature.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By / Stats Section */}
      <section className="relative z-10 border-t border-border/50 bg-muted/30 py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <p className="text-center text-sm font-semibold text-muted-foreground tracking-widest uppercase mb-8">
            Empowering Next-Generation Creators
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
             <div className="text-xl font-bold font-mono">React</div>
             <div className="text-xl font-bold font-mono">Node.js</div>
             <div className="text-xl font-bold font-mono">Gemini AI</div>
             <div className="text-xl font-bold font-mono">MongoDB</div>
             <div className="text-xl font-bold font-mono">Pinecone</div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
