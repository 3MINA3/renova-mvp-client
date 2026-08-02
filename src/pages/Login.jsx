import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, UserPlus } from 'lucide-react';
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      if (!validateEmail(email)) {
        toast.error('الرجاء إدخال بريد إلكتروني صحيح');
        return;
      }

      const success = loginUser(email, password);
      if (success) {
        toast.success('تم تسجيل الدخول بنجاح');
        navigate('/');
      } else {
        toast.error('البريد الإلكتروني أو كلمة المرور غير صحيحة');
      }
    } else {
      toast.error('الرجاء إدخال البريد الإلكتروني وكلمة المرور');
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 animate-in fade-in zoom-in-95 duration-500">
      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-800 relative overflow-hidden">
        
        {/* Decorative background for premium feel */}
        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-teal-50 dark:bg-teal-900/20 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-40 h-40 bg-green-50 dark:bg-green-900/20 rounded-full blur-3xl -z-10"></div>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-green-500 to-teal-500 text-white mb-4 shadow-lg">
            <LogIn className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            {'تسجيل الدخول'}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            {'مرحباً بك مجدداً في سوق Renova'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 animate-in slide-in-from-right-8 duration-300">
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">{'البريد الإلكتروني'}</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all outline-none bg-gray-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-700 dark:text-white"
              dir="ltr"
            />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">{'كلمة المرور'}</label>
              <Link 
                to="/contact"
                className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
              >
                {'نسيت كلمة المرور؟'}
              </Link>
            </div>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all outline-none bg-gray-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-700 dark:text-white"
              dir="ltr"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-gray-900 to-black hover:from-black hover:to-gray-900 text-white font-bold py-3.5 rounded-xl transition-all shadow-md transform active:scale-95 flex items-center justify-center gap-2 mt-4"
          >
            <span>{'دخول'}</span>
          </button>
        </form>

        <div className="mt-8 text-center border-t border-gray-100 dark:border-slate-800 pt-6">
          <p className="text-gray-500 dark:text-gray-400 mb-3">{'ليس لديك حساب؟'}</p>
          <Link 
            to="/register" 
            className="inline-flex items-center justify-center gap-2 text-teal-600 hover:text-teal-700 font-bold transition-colors"
          >
            <UserPlus className="w-4 h-4" />
            <span>{'إنشاء حساب جديد'}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
