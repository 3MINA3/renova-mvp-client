import React from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { LayoutDashboard, Inbox, Package, LogOut, ShieldCheck, Users, Settings, ShoppingCart, Sun, Moon } from 'lucide-react';

const AdminLayout = () => {
  const { isAuthenticated, isAdmin, logout, user } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  const navItems = [
    { name: 'الرئيسية', path: '/admin', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'العملاء', path: '/admin/users', icon: <Users className="w-5 h-5" /> },
    { name: 'طلبات البيع', path: '/admin/requests', icon: <Inbox className="w-5 h-5" /> },
    { name: 'طلبات الشراء', path: '/admin/orders', icon: <ShoppingCart className="w-5 h-5" /> },
    { name: 'المنتجات', path: '/admin/products', icon: <Package className="w-5 h-5" /> },
    { name: 'الإعدادات', path: '/admin/settings', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300" dir="rtl">
      {/* Sidebar */}
      <aside className="w-72 bg-white dark:bg-slate-900 text-gray-900 dark:text-white flex flex-col shadow-xl z-20 border-l border-gray-100 dark:border-slate-800 transition-colors duration-300">
        <div className="p-6 flex items-center gap-3 border-b border-gray-100 dark:border-slate-800 transition-colors duration-300">
          <div className="bg-green-500 p-2 rounded-lg">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-black text-gray-900 dark:text-white"><span className="font-brand">Renova</span> Admin</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">لوحة التحكم</p>
          </div>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-bold ${
                  isActive 
                    ? 'bg-green-600 text-white shadow-md' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100 dark:border-slate-800 space-y-3 transition-colors duration-300">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 flex items-center justify-center font-bold border border-gray-200 dark:border-slate-700">
              {user?.name?.[0]}
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900 dark:text-white">{user?.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Admin</p>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button 
              onClick={toggleTheme}
              className="flex items-center justify-center gap-2 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white py-2.5 px-3 rounded-xl transition-colors"
              title={isDark ? 'الوضع المضيء' : 'الوضع الليلي'}
            >
              {isDark ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={logout}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-100 dark:bg-slate-800 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400 text-gray-700 dark:text-gray-300 py-2.5 rounded-xl transition-colors text-sm font-bold border border-transparent dark:border-slate-700 hover:border-red-100 dark:hover:border-red-900/50"
            >
              <LogOut className="w-4 h-4" />
              <span>تسجيل الخروج</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
