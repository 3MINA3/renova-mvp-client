import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Recycle } from 'lucide-react';
import { motion } from 'framer-motion';

const springConf = { type: "spring", bounce: 0, duration: 0.4 };

const FloatingActionButton = () => {
    const location = useLocation();

  // Don't show FAB on admin routes or if we are already on the sell-scrap page
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isSellScrapRoute = location.pathname === '/sell-scrap';

  if (isAdminRoute || isSellScrapRoute) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      transition={springConf}
      className="fixed bottom-6 z-50 shadow-2xl animate-pulse-glow rounded-full"
      style={{ right: '1.5rem' }}
    >
      <Link 
        to="/sell-scrap"
        className="group flex items-center justify-center gap-3 bg-emerald-500/80 dark:bg-emerald-600/80 backdrop-blur-xl saturate-200 border border-white/20 text-white font-bold px-6 py-4 rounded-full transition-colors duration-300"
        aria-label="بيع خردة"
      >
        <div className="relative">
          <Recycle className="w-6 h-6 group-hover:rotate-180 transition-transform duration-700" />
        </div>
        <span className="text-lg whitespace-nowrap">بيع خردة</span>
      </Link>
    </motion.div>
  );
};

export default FloatingActionButton;
