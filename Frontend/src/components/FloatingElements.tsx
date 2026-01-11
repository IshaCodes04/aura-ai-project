import { Sparkles, Zap, Diamond } from 'lucide-react';

const FloatingElements = () => {
  return (
    <>
      {/* Colorful Floating Sparkles */}
      <div className="absolute top-1/4 left-[15%] floating-element opacity-60">
        <Sparkles className="w-8 h-8 text-orange-400" />
      </div>

      {/* Blue Zap */}
      <div className="absolute top-1/3 left-[30%] floating-element-delayed opacity-70">
        <Zap className="w-6 h-6 text-blue-400" />
      </div>

      {/* Orange Sparkle */}
      <div className="absolute top-[20%] left-[40%] sparkle opacity-60">
        <Sparkles className="w-5 h-5 text-orange-300" />
      </div>

      {/* Green Diamond */}
      <div className="absolute bottom-1/3 left-[10%] floating-element opacity-50">
        <Diamond className="w-7 h-7 text-green-400" />
      </div>

      {/* Pink Sparkles */}
      <div className="absolute top-[45%] left-[5%] floating-element-delayed opacity-60">
        <Sparkles className="w-6 h-6 text-pink-400" />
      </div>

      {/* Blue Sparkles Small */}
      <div className="absolute top-[15%] left-[25%] sparkle opacity-70">
        <Sparkles className="w-4 h-4 text-blue-300" />
      </div>

      {/* Purple Zap */}
      <div className="absolute top-[40%] left-[35%] sparkle opacity-60" style={{ animationDelay: '-1s' }}>
        <Zap className="w-5 h-5 text-purple-400" />
      </div>

      {/* Orange Diamond */}
      <div className="absolute top-[55%] left-[20%] floating-element opacity-50">
        <Diamond className="w-6 h-6 text-orange-500" />
      </div>

      {/* Yellow Zap */}
      <div className="absolute bottom-[40%] left-[38%] floating-element-delayed opacity-60">
        <Zap className="w-5 h-5 text-yellow-400" />
      </div>

      {/* Cyan Sparkles */}
      <div className="absolute bottom-[20%] right-[15%] floating-element opacity-50">
        <Sparkles className="w-7 h-7 text-cyan-400" />
      </div>

      {/* Rose Diamond */}
      <div className="absolute top-[60%] right-[20%] floating-element-delayed opacity-60">
        <Diamond className="w-6 h-6 text-rose-400" />
      </div>
    </>
  );
};

export default FloatingElements;
