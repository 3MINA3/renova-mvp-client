import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'admin@renova.com' && password === 'admin') {
      const mockAdmin = { id: 99, name: 'مدير النظام', email, role: 'admin' };
      const mockToken = 'mock-admin-token-999';
      login(mockAdmin, mockToken);
      toast.success('تم تسجيل الدخول بصلاحيات الإدارة');
      navigate('/admin');
    } else {
      toast.error('بيانات الدخول غير صحيحة.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex items-center justify-center p-4 transition-colors duration-300">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-slate-800">
        <div className="text-center mb-8">
          <div className="bg-gray-900 dark:bg-slate-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-white shadow-md">
            <ShieldCheck className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white">بوابة الإدارة</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">تسجيل الدخول للوحة تحكم Renova</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">البريد الإلكتروني للإدارة</label>
            <input 
              id="email"
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-gray-900 dark:focus:ring-slate-700 focus:border-gray-900 dark:focus:border-slate-700 outline-none transition-shadow bg-gray-50 dark:bg-slate-800 dark:text-white"
              dir="ltr"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">كلمة المرور</label>
            <input 
              id="password"
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-gray-900 dark:focus:ring-slate-700 focus:border-gray-900 dark:focus:border-slate-700 outline-none transition-shadow bg-gray-50 dark:bg-slate-800 dark:text-white"
              dir="ltr"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-gray-900 dark:bg-slate-800 hover:bg-black dark:hover:bg-slate-700 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-md transform active:scale-95 mt-6"
          >
            دخول للوحة التحكم
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
