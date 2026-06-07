import { Sparkles, Zap, Diamond } from 'lucide-react';

const FloatingElements = () => {
  return (
    <>
      {/* Colorful Floating Sparkles */}
      <div className="absolute top-1/4 left-[5%] md:left-[10%] floating-element opacity-40">
        <Sparkles className="w-8 h-8 text-secondary/70 blur-[1px]" />
      </div>

      {/* Glassmorphic Floating Card 1 - Code snippet feel */}
      <div className="absolute top-[20%] right-[10%] floating-element hidden lg:block">
        <div className="p-6 rounded-3xl border border-white/20 bg-white/5 backdrop-blur-2xl shadow-2xl rotate-3">
          <div className="flex gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-[#E8C547]/40" />
            <div className="w-2 h-2 rounded-full bg-secondary/30" />
            <div className="w-2 h-2 rounded-full bg-[#7A8C5E]/40" />
          </div>
          <div className="space-y-2">
            <div className="h-1.5 w-24 bg-secondary/30 rounded" />
            <div className="h-1.5 w-32 bg-[#7A8C5E]/20 rounded" />
            <div className="h-1.5 w-20 bg-[#C4956A]/20 rounded" />
          </div>
        </div>
      </div>

      {/* Glassmorphic Floating Card 2 - Chat bubble feel */}
      <div className="absolute bottom-[30%] left-[8%] floating-element-delayed hidden lg:block">
        <div className="p-5 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-2xl shadow-2xl -rotate-6 max-w-[180px]">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-6 h-6 rounded-full" style={{ background: 'hsl(var(--primary))' }} />
            <div className="h-2 w-16 bg-white/20 rounded" />
          </div>
          <div className="h-1.5 w-full bg-white/10 rounded mb-1" />
          <div className="h-1.5 w-3/4 bg-white/10 rounded" />
        </div>
      </div>

      {/* Aura Spark Zap */}
      <div className="absolute top-1/3 left-[25%] floating-element-delayed opacity-30">
        <Zap className="w-6 h-6 text-secondary/80" />
      </div>

      {/* Green Diamond */}
      <div className="absolute bottom-1/4 right-[20%] floating-element opacity-30">
        <Diamond className="w-7 h-7 text-secondary" />
      </div>

      {/* Neural Link Nodes */}
      <div className="absolute top-[15%] left-[20%] opacity-20 hidden md:block">
        <div className="relative">
          <div className="w-3 h-3 rounded-full bg-secondary" />
          <div className="absolute top-1.5 left-3 w-20 h-[1px] rotate-12" style={{ background: 'transparent' }} />
        </div>
      </div>
    </>
  );
};

export default FloatingElements;


