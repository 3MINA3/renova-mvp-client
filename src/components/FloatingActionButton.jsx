import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Recycle } from 'lucide-react';

const FloatingActionButton = () => {
    const location = useLocation();

  // Don't show FAB on admin routes or if we are already on the sell-scrap page
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isSellScrapRoute = location.pathname === '/sell-scrap';

  if (isAdminRoute || isSellScrapRoute) return null;

  return (
    <Link 
      to="/sell-scrap"
      className="fixed bottom-6 z-50 group flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-400 hover:to-teal-400 text-white font-bold px-6 py-4 rounded-full shadow-2xl hover:shadow-green-500/50 transform active:scale-95 transition-all duration-300 animate-pulse-glow"
      style={{
        right: '1.5rem', // RTL fix
      }}
      aria-label="بيع خردة"
    >
      <div className="relative">
        <Recycle className="w-6 h-6 group-hover:rotate-180 transition-transform duration-700" />
      </div>
      <span className="text-lg whitespace-nowrap">بيع خردة</span>
    </Link>
  );
};

export default FloatingActionButton;
