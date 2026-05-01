import { Link } from 'react-router-dom';
import { ArrowRight, Code2, MessageSquare, Lightbulb, Sparkles, Brain, Zap, Shield, Star } from 'lucide-react';
import Navbar from '@/components/Navbar';

const Home = () => {
  const capabilities = [
    {
      icon: Code2,
      title: 'Code Anything',
      description: 'Write, debug, and refactor any language. From React components to Python scripts — Aura has got you.',
      color: 'from-blue-500 to-cyan-500',
      bg: 'bg-blue-500/10',
    },
    {
      icon: MessageSquare,
      title: 'Ask Anything',
      description: 'Science, history, philosophy, or just daily life questions — no topic is too big or too small for Aura.',
      color: 'from-purple-500 to-pink-500',
      bg: 'bg-purple-500/10',
    },
    {
      icon: Lightbulb,
      title: 'Brainstorm Everything',
      description: 'Stuck on an idea? Aura is your creative partner. Get content ideas, business plans, or story plots in seconds.',
      color: 'from-orange-500 to-rose-500',
      bg: 'bg-orange-500/10',
    },
    {
      icon: Brain,
      title: 'Remembers You',
      description: 'Powered by Pinecone Vector memory, Aura learns from every conversation and personalizes responses just for you.',
      color: 'from-emerald-500 to-teal-500',
      bg: 'bg-emerald-500/10',
    },
    {
      icon: Zap,
      title: 'Instant Responses',
      description: 'Real-time streaming via WebSockets means you see Aura thinking and typing, with zero lag or waiting.',
      color: 'from-yellow-400 to-orange-500',
      bg: 'bg-yellow-500/10',
    },
    {
      icon: Shield,
      title: 'Private & Secure',
      description: 'Your conversations are yours only. End-to-end encrypted, never shared, never sold. Your trust is everything.',
      color: 'from-slate-500 to-blue-600',
      bg: 'bg-slate-500/10',
    },
  ];

  const useCases = [
    { emoji: '👩‍💻', title: 'Students', desc: 'Get homework help, explanations, and study plans.' },
    { emoji: '🚀', title: 'Developers', desc: 'Code faster, debug smarter, ship with confidence.' },
    { emoji: '✍️', title: 'Writers', desc: 'Overcome writer\'s block and craft compelling stories.' },
    { emoji: '💼', title: 'Professionals', desc: 'Draft emails, reports, and presentations instantly.' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden" style={{ fontFamily: "'Inter', 'Poppins', sans-serif" }}>
      <Navbar />

      {/* ─── HERO SECTION ─── */}
      <section className="relative z-10 min-h-screen flex flex-col justify-center items-center px-4 md:px-8 pt-28 pb-20 text-center overflow-hidden">

        {/* Liquid Blobs Background */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <div
            className="liquid-blob absolute"
            style={{
              width: '55vw', height: '55vw',
              maxWidth: '700px', maxHeight: '700px',
              top: '-10%', left: '-15%',
              background: 'linear-gradient(135deg, #FF7A00 0%, #FF0066 50%, #9333ea 100%)',
            }}
          />
          <div
            className="liquid-blob absolute"
            style={{
              width: '45vw', height: '45vw',
              maxWidth: '600px', maxHeight: '600px',
              bottom: '-5%', right: '-10%',
              animationDelay: '-7s',
              animationDuration: '20s',
              background: 'linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 50%, #ec4899 100%)',
            }}
          />
          <div
            className="liquid-blob absolute"
            style={{
              width: '30vw', height: '30vw',
              maxWidth: '400px', maxHeight: '400px',
              top: '40%', right: '20%',
              animationDelay: '-3s',
              animationDuration: '12s',
              background: 'linear-gradient(135deg, #10b981 0%, #0ea5e9 100%)',
            }}
          />
        </div>

        {/* Frosted Glass Content */}
        <div className="relative z-10 max-w-5xl mx-auto">

          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-10 backdrop-blur-xl border border-white/20 dark:border-white/10 bg-white/40 dark:bg-white/5 shadow-lg">
            <Sparkles className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-semibold text-foreground/90 tracking-wide">The AI companion for everyone</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] mb-8">
            <span className="block text-foreground">Intelligence</span>
            <span
              className="block"
              style={{ background: 'linear-gradient(135deg, #FF7A00, #FF0066, #9333ea)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
            >
              that flows with you.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
            Aura AI is your personal, conversational AI companion. Ask questions, get code, spark ideas — all in one beautiful chat experience.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/signup"
              className="group inline-flex items-center justify-center gap-3 px-10 py-4 text-lg font-bold text-white rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              style={{ background: 'linear-gradient(135deg, #FF7A00, #FF0066)', boxShadow: '0 8px 30px -5px rgba(255, 122, 0, 0.4)' }}
            >
              Start Chatting Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold rounded-2xl border border-border backdrop-blur-md bg-background/50 hover:bg-background/80 hover:-translate-y-1 transition-all duration-300"
            >
              Learn More
            </Link>
          </div>

          {/* Social Proof */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
            </div>
            <span>Loved by students, developers & creators</span>
          </div>
        </div>

        {/* Scroll Hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-1.5">
            <div className="w-1.5 h-2.5 bg-muted-foreground/40 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* ─── USE CASES ─── */}
      <section className="relative z-10 py-20 px-4 md:px-8 bg-muted/20 border-y border-border/50 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="liquid-blob absolute opacity-5 dark:opacity-10"
            style={{ width: '500px', height: '500px', top: '-20%', right: '-5%', animationDuration: '18s', background: 'linear-gradient(135deg, #FF7A00, #9333ea)' }}
          />
        </div>
        <div className="max-w-5xl mx-auto relative z-10">
          <p className="text-center text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-12">Built for every kind of mind</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {useCases.map((uc) => (
              <div key={uc.title} className="group p-6 rounded-2xl text-center border border-border/70 bg-background/60 backdrop-blur-md hover:border-orange-500/40 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 cursor-default">
                <div className="text-4xl mb-3">{uc.emoji}</div>
                <h3 className="font-bold text-base mb-1">{uc.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{uc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CAPABILITIES ─── */}
      <section className="relative z-10 py-28 px-4 md:px-8 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="liquid-blob absolute opacity-5 dark:opacity-10"
            style={{ width: '600px', height: '600px', bottom: '-10%', left: '-5%', animationDuration: '22s', animationDelay: '-4s', background: 'linear-gradient(135deg, #0ea5e9, #8b5cf6)' }}
          />
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-500 mb-4">What Aura can do</p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
              Everything. <span className="text-muted-foreground font-light">Intelligently.</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">One AI that replaces dozens of tools. Ask, create, build, learn — Aura flows with every need.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap) => (
              <div key={cap.title} className="group p-7 rounded-2xl border border-border/70 bg-background/60 backdrop-blur-md hover:border-border hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
                <div className={`w-12 h-12 rounded-xl ${cap.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <div className={`bg-gradient-to-br ${cap.color} rounded-lg p-2`}>
                    <cap.icon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">{cap.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{cap.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── INTERACTIVE PREVIEW ─── */}
      <section className="relative z-10 py-28 px-4 md:px-8 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="liquid-blob absolute opacity-5 dark:opacity-10"
            style={{ width: '700px', height: '700px', top: '0', right: '-10%', animationDelay: '-10s', animationDuration: '25s', background: 'linear-gradient(135deg, #FF0066, #FF7A00)' }}
          />
        </div>
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-purple-500 mb-4">See it in action</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">A chat that <span style={{ background: 'linear-gradient(135deg, #FF7A00, #FF0066)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>feels alive.</span></h2>
          </div>

          {/* Chat Preview */}
          <div className="rounded-3xl overflow-hidden border border-border/70 shadow-2xl bg-background/80 backdrop-blur-2xl">
            {/* Window bar */}
            <div className="flex items-center gap-2 px-6 py-4 bg-muted/40 border-b border-border">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <div className="flex-1 flex justify-center">
                <div className="px-4 py-1 rounded-full bg-background/70 text-xs text-muted-foreground font-medium border border-border/50">aura-ai.app · New Chat</div>
              </div>
            </div>
            {/* Messages */}
            <div className="p-6 md:p-10 space-y-6">
              {/* User message */}
              <div className="flex gap-3 justify-end">
                <div className="max-w-[80%] px-5 py-3.5 rounded-2xl rounded-br-sm text-white text-sm leading-relaxed" style={{ background: 'linear-gradient(135deg, #FF7A00, #FF0066)' }}>
                  Hey Aura, can you write me a function in Python to reverse a string?
                </div>
                <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0 ring-2 ring-background shadow">U</div>
              </div>
              {/* AI message */}
              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 ring-2 ring-background shadow" style={{ background: 'linear-gradient(135deg, #FF7A00, #FF0066)' }}>A</div>
                <div className="max-w-[85%] bg-muted/60 border border-border/60 px-5 py-4 rounded-2xl rounded-bl-sm text-sm leading-relaxed space-y-3">
                  <p>Of course! Here's a clean Python function to reverse a string:</p>
                  <div className="bg-background rounded-xl p-4 border border-border font-mono text-xs leading-6 overflow-x-auto">
                    <span className="text-blue-500">def</span> <span className="text-yellow-500">reverse_string</span>(<span className="text-orange-400">text</span>:<span className="text-blue-400"> str</span>) -&gt; <span className="text-blue-400">str</span>:<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">"""Reverses a given string."""</span><br />
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-green-500">return</span> text[<span className="text-orange-400">::-1</span>]<br /><br />
                    <span className="text-gray-400"># Example</span><br />
                    <span className="text-green-500">print</span>(reverse_string(<span className="text-orange-400">"Hello Aura"</span>)) <span className="text-gray-500"># Output: aruA olleH</span>
                  </div>
                  <p className="text-muted-foreground">The <code className="text-orange-500 bg-orange-500/10 px-1 rounded">::-1</code> slice is a pythonic way to reverse any sequence. Let me know if you want a loop-based version too! 🐍</p>
                </div>
              </div>
              {/* Prompt Bar */}
              <div className="flex items-center gap-3 bg-muted/30 border border-border/60 rounded-2xl px-5 py-3.5 mt-4">
                <span className="text-muted-foreground text-base">✨</span>
                <span className="flex-1 text-sm text-muted-foreground/60 font-medium">Ask Aura anything — code, questions, ideas...</span>
                <div className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FF7A00, #FF0066)' }}>
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="relative z-10 py-24 px-4 md:px-8 overflow-hidden" style={{ background: 'linear-gradient(135deg, #FF7A00 0%, #FF0066 50%, #9333ea 100%)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {[
              { stat: '∞', label: 'Memory Capacity' },
              { stat: '<1s', label: 'Response Time' },
              { stat: '100%', label: 'Privacy First' },
              { stat: '24/7', label: 'Always Available' },
            ].map(({ stat, label }) => (
              <div key={label}>
                <div className="text-5xl md:text-6xl font-black mb-2">{stat}</div>
                <div className="text-white/70 text-sm font-semibold uppercase tracking-widest">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative z-10 py-32 px-4 md:px-8 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="liquid-blob absolute opacity-5 dark:opacity-15"
            style={{ width: '800px', height: '800px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', animationDuration: '20s', animationDelay: '-5s', background: 'linear-gradient(135deg, #FF7A00, #FF0066, #9333ea)' }}
          />
        </div>
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-6">
            Ready to meet<br />
            <span style={{ background: 'linear-gradient(135deg, #FF7A00, #FF0066, #9333ea)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              your Aura?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
            Join thousands of curious minds who chat, create, and learn with Aura AI every day.
          </p>
          <Link
            to="/signup"
            className="group inline-flex items-center justify-center gap-3 px-12 py-5 text-xl font-bold text-white rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            style={{ background: 'linear-gradient(135deg, #FF7A00, #FF0066, #9333ea)', boxShadow: '0 15px 40px -10px rgba(255, 0, 102, 0.4)' }}
          >
            Get Started — It's Free
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="mt-6 text-sm text-muted-foreground">No credit card required. Sign up in seconds.</p>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="relative z-10 border-t border-border/50 py-10 px-4 text-center">
        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} <span className="font-bold text-foreground">Aura AI</span>. Built with ❤️ · Powered by Google Gemini + Pinecone.
        </p>
      </footer>
    </div>
  );
};

export default Home;
