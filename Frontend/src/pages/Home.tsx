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
      <section className="relative z-10 min-h-[95vh] flex flex-col justify-center items-center px-6 md:px-12 pt-32 pb-20 text-center">
        {/* Glow Background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0">
           <div className="w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] bg-gradient-to-r from-orange-500/20 to-rose-500/20 blur-[120px] rounded-full animate-pulse" style={{ animationDuration: '8s' }}></div>
        </div>

        <div className="max-w-5xl mx-auto w-full relative z-10">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-background/50 backdrop-blur-xl rounded-full mb-8 border border-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.15)]">
            <span className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
            <span className="text-sm font-bold tracking-wide uppercase bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-rose-500">Aura AI 2.0 is Live</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl lg:text-[6rem] font-black text-foreground leading-[1.05] mb-8 tracking-tight" style={{ fontFamily: "'Inter', 'Poppins', sans-serif" }}>
            Think it. <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-rose-500">Aura builds it.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
            The intelligent companion that doesn't just chat—it creates, analyzes, and remembers. Your personal supercomputer is ready.
          </p>
          
          {/* Big Mock Input Bar */}
          <div className="max-w-3xl mx-auto relative group mb-16">
             <div className="absolute -inset-1.5 bg-gradient-to-r from-orange-500 to-rose-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-300"></div>
             <div className="relative flex items-center bg-white/90 dark:bg-black/60 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-2xl p-2 shadow-2xl">
               <div className="pl-5 pr-2 py-5 flex-1 text-left flex items-center gap-4">
                  <span className="text-3xl animate-bounce" style={{ animationDuration: '2s' }}>✨</span>
                  <span className="text-lg md:text-xl text-foreground/50 font-medium font-mono type-writer-effect">Build a sleek React dashboard...</span>
               </div>
               <Link to="/signup" className="hidden md:flex bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white px-10 py-5 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-orange-500/50 hover:-translate-y-0.5 items-center gap-2">
                 Generate <ArrowRight className="w-6 h-6" />
               </Link>
             </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:hidden">
            <Link to="/signup" className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 text-xl w-full rounded-xl shadow-lg shadow-orange-500/30">
              Get Started Free <ArrowRight className="w-5 h-5" />
            </Link>
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
