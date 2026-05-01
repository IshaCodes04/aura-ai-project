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
      <section className="relative z-10 border-y border-border/50 bg-muted/30 py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <p className="text-center text-sm font-semibold text-muted-foreground tracking-widest uppercase mb-8">
            Powered by Next-Generation Tech
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
             <div className="text-xl font-bold font-mono text-blue-500">React 18</div>
             <div className="text-xl font-bold font-mono text-green-500">Node.js</div>
             <div className="text-xl font-bold font-mono text-purple-500">Google Gemini</div>
             <div className="text-xl font-bold font-mono text-green-600">MongoDB</div>
             <div className="text-xl font-bold font-mono text-indigo-500">Pinecone Vector</div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="relative z-10 py-24 px-6 md:px-12 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Everything you need. <span className="text-orange-500">In one brain.</span></h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Aura AI isn't just a chatbot. It's a complete intelligent ecosystem designed to handle your most complex workflows.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Capability 1 */}
            <div className="auth-card p-8 group hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">💻</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">Masterful Coding</h3>
              <p className="text-muted-foreground leading-relaxed">From debugging complex React components to writing robust Node.js backends, Aura understands your stack and writes clean, production-ready code.</p>
            </div>
            
            {/* Capability 2 */}
            <div className="auth-card p-8 group hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">🧠</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">Long-Term Memory</h3>
              <p className="text-muted-foreground leading-relaxed">Powered by Pinecone Vector DB, Aura remembers your past conversations. It doesn't just answer; it learns your context over time.</p>
            </div>

            {/* Capability 3 */}
            <div className="auth-card p-8 group hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">Real-time Speed</h3>
              <p className="text-muted-foreground leading-relaxed">Built on a highly optimized Socket.io architecture, you get streaming responses instantly. No more waiting for loaders to finish.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-20 bg-orange-500 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-black mb-2">0ms</div>
              <div className="text-orange-100 font-medium tracking-wide uppercase text-sm">Latency Feel</div>
            </div>
            <div>
              <div className="text-5xl font-black mb-2">Infinite</div>
              <div className="text-orange-100 font-medium tracking-wide uppercase text-sm">Memory Capacity</div>
            </div>
            <div>
              <div className="text-5xl font-black mb-2">100%</div>
              <div className="text-orange-100 font-medium tracking-wide uppercase text-sm">Data Privacy</div>
            </div>
            <div>
              <div className="text-5xl font-black mb-2">24/7</div>
              <div className="text-orange-100 font-medium tracking-wide uppercase text-sm">Availability</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="relative z-10 py-32 px-6 md:px-12 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-5xl font-bold mb-6">Ready to step into the future?</h2>
          <p className="text-xl text-muted-foreground mb-10">Join the next generation of builders, creators, and thinkers who are scaling their minds with Aura AI.</p>
          <Link to="/signup" className="btn-primary inline-flex items-center justify-center gap-2 px-10 py-4 text-xl rounded-full shadow-[0_0_40px_rgba(249,115,22,0.3)] hover:shadow-[0_0_60px_rgba(249,115,22,0.5)] transition-all">
            Start Chatting Now
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="relative z-10 border-t border-border/50 py-8 text-center text-muted-foreground">
        <p>© {new Date().getFullYear()} Aura AI. Built with ❤️ for the future.</p>
      </footer>

    </div>
  );
};

export default Home;
