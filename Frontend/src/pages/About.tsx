import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import FloatingElements from '@/components/FloatingElements';

const About = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <Navbar />

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingElements />
      </div>

      {/* Content Section */}
      <section className="relative z-10 pt-32 pb-12">
        
        {/* Header */}
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center mb-20">
          <h1 className="text-5xl lg:text-7xl font-black text-foreground mb-6 tracking-tight">
            Meet <span className="text-transparent bg-clip-text gradient-orange">Aura AI</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto font-medium">
            We are building the most intuitive, fast, and personalized AI companion for developers and creators around the world.
          </p>
        </div>

        {/* The Story Section */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-24 grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl font-bold mb-6">The Story Behind Aura</h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                Aura AI wasn't built just to be another chatbot. It was born out of frustration with slow, generic, and forgetful AI tools. We wanted an assistant that feels alive—one that remembers your past conversations, understands your code structure, and responds instantly.
              </p>
              <p>
                By combining the raw intelligence of Google's Gemini models with the incredible long-term memory capabilities of Pinecone Vector Databases, Aura bridges the gap between a temporary script and a lifelong digital companion.
              </p>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative rounded-3xl overflow-hidden aspect-video border border-white/10 shadow-2xl group">
              <div className="absolute inset-0 bg-linear-to-br from-orange-500/20 to-blue-600/20 mix-blend-overlay z-10 group-hover:opacity-50 transition-opacity"></div>
              <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop" alt="AI Abstract" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
        </div>

        {/* The Architecture */}
        <div className="bg-muted/30 border-y border-border/50 py-24 mb-24">
          <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
            <h2 className="text-3xl font-bold mb-16">The Brain Architecture</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="auth-card p-8 bg-background/50 hover:-translate-y-2 transition-transform">
                <div className="text-4xl mb-4">🧠</div>
                <h3 className="text-xl font-bold mb-2">Gemini Engine</h3>
                <p className="text-muted-foreground text-sm">State-of-the-art multimodal reasoning, capable of writing code, analyzing logic, and engaging in deep human-like conversation.</p>
              </div>
              <div className="auth-card p-8 bg-background/50 hover:-translate-y-2 transition-transform">
                <div className="text-4xl mb-4">📚</div>
                <h3 className="text-xl font-bold mb-2">Pinecone Vector Memory</h3>
                <p className="text-muted-foreground text-sm">Every chat is embedded as a dense vector. Aura retrieves context from weeks ago in milliseconds.</p>
              </div>
              <div className="auth-card p-8 bg-background/50 hover:-translate-y-2 transition-transform">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-bold mb-2">Socket WebSockets</h3>
                <p className="text-muted-foreground text-sm">Real-time bidirectional data streams ensure you see Aura typing exactly as it thinks, zero lag.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Bottom */}
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl font-bold mb-6">Experience the difference.</h2>
          <div className="mt-8 flex justify-center gap-4">
            <Link to="/signup" className="btn-primary inline-flex items-center gap-2 px-8 py-3">
              Join Aura Free
            </Link>
            <Link to="/" className="btn-outline inline-flex items-center gap-2 px-8 py-3">
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="relative z-10 border-t border-border/50 py-8 text-center text-muted-foreground">
        <p>© {new Date().getFullYear()} Aura AI. Built with ❤️ for the future.</p>
      </footer>
    </div>
  );
};

export default About;
