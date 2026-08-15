import React from 'react';
import { Link } from 'react-router-dom';
import { Recycle, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import TiltCard from './TiltCard';

const springConf = { type: "spring", bounce: 0, duration: 0.6 };

const HeroSection = () => {
  const Arrow = ArrowLeft;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springConf}
      className="relative overflow-hidden rounded-3xl glass dark:glass-dark text-gray-900 dark:text-white shadow-2xl mb-12 border border-white/50 dark:border-slate-800/50"
    >
      <div className="relative p-8 md:p-16 lg:p-20 flex flex-col md:flex-row items-center justify-between gap-10">

        {/* Text Content */}
        <div className="flex-1 space-y-6 z-10 text-center md:text-start">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 dark:bg-stone-800/80 backdrop-blur-md border border-emerald-200 dark:border-emerald-500/30 text-sm font-bold text-emerald-700 dark:text-lime-400 mb-4 shadow-sm dark:shadow-[0_0_15px_rgba(16,185,129,0.15)]">
            <Recycle className="w-4 h-4 animate-spin-slow" />
            <span>شريكك نحو بيئة مستدامة</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black leading-tight text-gray-900 dark:text-white">
            نحو بيئة أنظف و <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-lime-400">مستقبل أفضل</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl leading-relaxed font-medium">
            منصة متخصصة في شراء الخردة المنزلية وإعادة تدويرها إلى منتجات عالية الجودة. انضم إلينا في حماية البيئة وتحقيق ربح.
          </p>

          <div className="pt-6 flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <motion.div whileTap={{ scale: 0.95 }} transition={{ type: "spring", bounce: 0, duration: 0.4 }} className="w-full sm:w-auto">
              <Link
                to="/sell-scrap"
                className="group flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-lg px-8 py-4 rounded-2xl transition-all shadow-lg hover:shadow-emerald-500/25 w-full border border-emerald-400/20"
              >
                <span>ساهم في التدوير</span>
                <Arrow className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Visual Element */}
        <div className="flex-1 hidden md:flex justify-center items-center relative z-10 animate-float">
          <div className="relative w-72 h-72 lg:w-96 lg:h-96 flex items-center justify-center group">
            {/* Simple elegant glow */}
            <div className="absolute inset-0 bg-white/10 blur-3xl rounded-full group-hover:bg-white/20 transition-all duration-700"></div>
            
            {/* Clean White Logo Card */}
            <TiltCard 
              options={{ max: 20, scale: 1.05, glare: true, "max-glare": 0.4 }}
              className="relative z-10 w-64 h-64 lg:w-80 lg:h-80 bg-white rounded-[2rem] shadow-2xl flex items-center justify-center p-6 border-4 border-white/50 overflow-hidden cursor-pointer"
            >
               <img 
                 src={`${import.meta.env.BASE_URL}logo.png`} 
                 alt="Renova Hero Logo" 
                 className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-700" 
               />
            </TiltCard>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroSection;
