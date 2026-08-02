import React from 'react';
import { Link } from 'react-router-dom';
import { Recycle, ArrowLeft } from 'lucide-react';

const HeroSection = () => {
  const Arrow = ArrowLeft;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-stone-900 via-stone-800 to-emerald-950 text-white shadow-2xl mb-12 border border-emerald-900/30">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-emerald-500/20 blur-3xl animate-pulse-glow"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-lime-500/20 blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
      
      <div className="relative p-8 md:p-16 lg:p-20 flex flex-col md:flex-row items-center justify-between gap-10">
        
        {/* Text Content */}
        <div className="flex-1 space-y-6 z-10 text-center md:text-start">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-800/80 backdrop-blur-sm border border-emerald-500/30 text-sm font-bold text-lime-400 mb-4 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
            <Recycle className="w-4 h-4 animate-spin-slow" />
            <span>شريكك نحو بيئة مستدامة</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black leading-tight">
            {'نحو بيئة أنظف و'} <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-lime-400">{'مستقبل أفضل'}</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed">
            {'منصة متخصصة في شراء الخردة المنزلية وإعادة تدويرها إلى منتجات عالية الجودة. انضم إلينا في حماية البيئة وتحقيق ربح.'}
          </p>
          
          <div className="pt-6 flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <Link 
              to="/sell-scrap" 
              className="group flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-600 to-lime-600 hover:from-emerald-500 hover:to-lime-500 text-white font-bold text-lg px-8 py-4 rounded-2xl transition-all shadow-lg hover:shadow-emerald-500/25 transform active:scale-95 w-full sm:w-auto border border-emerald-400/20"
            >
              <span>{'ساهم في التدوير'}</span>
              <Arrow className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Visual Element */}
        <div className="flex-1 hidden md:flex justify-center items-center relative z-10 animate-float">
          <div className="relative w-72 h-72 lg:w-96 lg:h-96">
            {/* 3D-like stacked boxes for a premium tech feel */}
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-600 to-lime-400 rounded-3xl transform rotate-6 opacity-40 blur-xl"></div>
            <div className="absolute inset-0 bg-stone-900/80 backdrop-blur-xl rounded-3xl border border-emerald-500/20 shadow-2xl flex items-center justify-center overflow-hidden">
              <div className="grid grid-cols-2 gap-4 p-8 opacity-90">
                <div className="w-16 h-16 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"></div>
                <div className="w-16 h-16 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 transform translate-y-4"></div>
                <div className="w-16 h-16 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 transform -translate-y-4"></div>
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/30 backdrop-blur-sm border border-emerald-400/50 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)] transform scale-110">
                  <Recycle className="w-8 h-8 text-lime-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
