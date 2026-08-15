import React from 'react';
import { motion } from 'framer-motion';

const LiquidBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-20">
      {/* Base mesh gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-gray-50 to-emerald-50 dark:from-slate-950 dark:via-gray-900 dark:to-teal-950/20"></div>
      
      {/* Animated Liquid Blobs */}
      <motion.div
        animate={{
          x: [0, 100, -50, 0],
          y: [0, 50, -100, 0],
          scale: [1, 1.2, 0.8, 1],
          rotate: [0, 90, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-[10%] left-[20%] w-[40rem] h-[40rem] bg-teal-300/30 dark:bg-teal-700/20 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen opacity-70"
      />
      
      <motion.div
        animate={{
          x: [0, -120, 80, 0],
          y: [0, -80, 120, 0],
          scale: [1, 0.8, 1.3, 1],
          rotate: [360, 180, 90, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-[10%] right-[20%] w-[35rem] h-[35rem] bg-emerald-300/30 dark:bg-emerald-700/20 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen opacity-70"
      />
      
      <motion.div
        animate={{
          x: [0, 80, -100, 0],
          y: [0, 150, -50, 0],
          scale: [1, 1.4, 0.9, 1],
          rotate: [0, 180, 270, 360],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-[40%] right-[40%] w-[30rem] h-[30rem] bg-lime-300/20 dark:bg-lime-700/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen opacity-70"
      />
    </div>
  );
};

export default LiquidBackground;
