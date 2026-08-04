import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Heart, LogIn, LogOut, Recycle, Sun, Moon, Package } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { cartCount } = useCart();
  const { favorites } = useFavorites();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl sticky top-0 z-50 border-b border-gray-100 dark:border-slate-800/80 shadow-sm transition-colors duration-300">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="relative flex items-center justify-center p-[2px] rounded-[16px] group transition-all duration-500 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]">
          {/* Animated Gradient Border */}
          <div className="absolute inset-0 rounded-[16px] bg-gradient-to-r from-emerald-500 via-teal-500 to-lime-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Inner Logo Container */}
          <div className="relative bg-white dark:bg-slate-900 rounded-[14px] overflow-hidden p-1 z-10">
            <img 
              src="/logo.png" 
              alt="Renova Logo" 
              className="h-10 md:h-14 w-auto object-contain transition-transform duration-700 group-hover:scale-[1.03] rounded-xl" 
            />
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-3 sm:gap-5 md:gap-8">

          <button
            onClick={toggleTheme}
            className="relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-600 dark:text-gray-300"
            title={isDark ? 'الوضع المضيء' : 'الوضع الليلي'}
          >
            {isDark ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5" />}
          </button>

          <Link
            to="/favorites"
            className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 hover:bg-gray-100 dark:hover:bg-slate-800 ${isActive('/favorites') ? 'text-red-500 bg-red-50 dark:bg-red-900/20 dark:text-red-400' : 'text-gray-600 dark:text-gray-300'}`}
            title={'المفضلة'}
          >
            <Heart className={`w-5 h-5 ${isActive('/favorites') ? 'fill-red-500' : ''}`} />
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white shadow-sm">
                {favorites.length}
              </span>
            )}
          </Link>

          <Link
            to="/cart"
            className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 hover:bg-gray-100 dark:hover:bg-slate-800 ${isActive('/cart') ? 'text-teal-600 bg-teal-50 dark:bg-teal-900/20 dark:text-teal-400' : 'text-gray-600 dark:text-gray-300'}`}
            title={'السلة'}
          >
            <ShoppingCart className={`w-5 h-5 ${isActive('/cart') ? 'fill-teal-600' : ''}`} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-teal-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white shadow-sm">
                {cartCount}
              </span>
            )}
          </Link>

          <div className="h-6 w-px bg-gray-200 dark:bg-slate-700 hidden md:block"></div>

          {isAuthenticated ? (
            <div className="flex items-center gap-2 sm:gap-4">
              <Link
                to="/my-orders"
                className={`flex items-center gap-2 text-sm font-bold px-3 py-2 rounded-xl transition-all ${isActive('/my-orders') ? 'text-teal-600 bg-teal-50 dark:bg-teal-900/20 dark:text-teal-400' : 'text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-gray-50 dark:hover:bg-slate-800'}`}
                title={'طلباتي'}
              >
                <Package className={`w-5 h-5 ${isActive('/my-orders') ? 'fill-teal-600/20' : ''}`} />
                <span className="hidden sm:inline">{'طلباتي'}</span>
              </Link>

              <span className="text-sm font-bold text-gray-700 dark:text-gray-300 hidden lg:inline-block">{'مرحباً'}، {user.name}</span>
              <button
                onClick={logout}
                className="flex items-center gap-2 text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 bg-gray-50 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-900/30 px-3 py-2 rounded-xl transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden md:inline">{'تسجيل الخروج'}</span>
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 dark:text-gray-900 text-white px-5 py-2.5 rounded-xl transition-all shadow-md hover:shadow-lg transform active:scale-95 text-sm font-bold"
            >
              <LogIn className="w-4 h-4" />
              <span>{'تسجيل الدخول'}</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
