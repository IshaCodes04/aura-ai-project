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
      <section className="relative z-10 min-h-[95vh] flex flex-col justify-center items-center px-4 md:px-12 pt-32 pb-16 text-center overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-orange-500/10 rounded-full blur-[100px] pointer-events-none z-0"></div>
        
        <div className="max-w-4xl mx-auto w-full relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted/50 backdrop-blur-md rounded-full mb-8 border border-border">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-xs md:text-sm font-medium tracking-wide text-foreground/80">Meet Your Personal AI</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black text-foreground leading-[1.1] mb-6 tracking-tight">
            Ask <span className="text-transparent bg-clip-text gradient-orange">anything.</span>
          </h1>
          
          <p className="text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed font-medium px-4">
            Aura AI answers questions, writes code, and helps you brainstorm. Your incredibly smart, personalized companion is ready to chat.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 px-6">
            <Link to="/signup" className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 text-lg rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-1 transition-all w-full sm:w-auto">
              Start Chatting <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Massive Realistic Chat Mockup */}
        <div className="max-w-5xl mx-auto w-full relative z-20 px-2 md:px-0">
           <div className="w-full bg-background/80 dark:bg-card/80 backdrop-blur-2xl border border-border rounded-2xl md:rounded-[2rem] shadow-2xl overflow-hidden transform transition-transform duration-700 hover:scale-[1.01]">
             {/* Window Header */}
             <div className="flex items-center gap-2 px-6 py-4 border-b border-border bg-muted/30">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div className="mx-auto text-xs font-semibold text-muted-foreground uppercase tracking-widest pr-8">Aura AI Companion</div>
             </div>
             
             {/* Chat Area */}
             <div className="p-5 md:p-10 space-y-6 text-left bg-background/50">
                <div className="flex gap-3 md:gap-4 items-end justify-end">
                  <div className="bg-orange-500 text-white px-4 md:px-5 py-3 rounded-2xl rounded-br-none text-sm md:text-base shadow-sm max-w-[85%] md:max-w-[70%]">
                    Can you explain how Quantum Computing works in simple terms?
                  </div>
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs md:text-sm font-bold shrink-0 shadow-sm ring-2 ring-background">U</div>
                </div>

                <div className="flex gap-3 md:gap-4 items-end">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full gradient-orange flex items-center justify-center text-white text-xs md:text-sm font-bold shrink-0 shadow-sm ring-2 ring-background">A</div>
                  <div className="bg-muted border border-border px-4 md:px-6 py-4 rounded-2xl rounded-bl-none text-sm md:text-base shadow-sm max-w-[90%] md:max-w-[80%] text-foreground/90 leading-relaxed">
                    <p className="mb-3">Imagine you're flipping a coin. It can either be heads (1) or tails (0). That's how normal computers work with bits.</p>
                    <p>But a <b>Quantum Computer</b> uses <i>qubits</i>. It's like a spinning coin—it can be heads, tails, or anywhere in between, all at the same time! This allows it to solve incredibly complex problems much faster. 🚀</p>
                  </div>
                </div>
             </div>
             
             {/* Input Area */}
             <div className="p-4 md:p-6 bg-card border-t border-border">
                <div className="flex items-center bg-background border border-border rounded-xl px-4 py-3 shadow-sm">
                   <span className="text-muted-foreground mr-3">✨</span>
                   <span className="text-muted-foreground text-sm flex-1 opacity-70">Ask Aura anything...</span>
                   <div className="w-8 h-8 rounded-lg gradient-orange flex items-center justify-center shadow-md"><ArrowRight className="w-4 h-4 text-white" /></div>
                </div>
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
