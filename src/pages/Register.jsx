import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, LogIn, Phone, Calendar, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { User, Address } from '../models';
import { motion } from 'framer-motion';

const springConf = { type: "spring", bounce: 0, duration: 0.4 };

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');

  const { registerUser } = useAuth();
  const navigate = useNavigate();
  
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
    return re.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && password && confirmPassword && phone && dateOfBirth && city && street) {
      if (!validateEmail(email)) {
        toast.error('الرجاء إدخال بريد إلكتروني صحيح');
        return;
      }

      if (!validatePassword(password)) {
        toast.error('كلمة المرور ضعيفة. يجب أن تحتوي على 8 أحرف على الأقل، وحرف ورقم واحد على الأقل.');
        return;
      }

      if (password !== confirmPassword) {
        toast.error('كلمتا المرور غير متطابقتين');
        return;
      }

      const phoneNumbersArray = [phone];

      const newUser = new User({
        id: Date.now().toString(),
        name,
        email,
        phoneNumbers: phoneNumbersArray,
        dateOfBirth,
        address: new Address({ city, street })
      });

      const response = registerUser({ ...newUser, password });
      if (response.success) {
        toast.success('تم إنشاء الحساب بنجاح');
        navigate('/');
      } else {
        toast.error(response.message || 'هذا البريد الإلكتروني مستخدم بالفعل');
      }
    } else {
      toast.error('الرجاء إكمال جميع الحقول');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springConf}
      className="max-w-md mx-auto py-12"
    >
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl saturate-150 p-8 rounded-3xl shadow-xl border border-gray-100/50 dark:border-slate-800/80 relative overflow-hidden">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-green-500 to-teal-500 text-white mb-4 shadow-lg">
            <UserPlus className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">إنشاء حساب جديد</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">انضم إلينا وابدأ في حماية البيئة</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">الاسم الكامل *</label>
            <input 
              id="name"
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all outline-none bg-gray-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-700 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">البريد الإلكتروني *</label>
            <input 
              id="email"
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all outline-none bg-gray-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-700 dark:text-white"
              dir="ltr"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">رقم الهاتف *</label>
            <div className="relative">
              <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                id="phone"
                type="tel" 
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pr-10 pl-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all outline-none bg-gray-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-700 dark:text-white"
                dir="ltr"
              />
            </div>
          </div>

          <div>
            <label htmlFor="dateOfBirth" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">تاريخ الميلاد *</label>
            <div className="relative">
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                id="dateOfBirth"
                type="date" 
                required
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="w-full pr-10 pl-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all outline-none bg-gray-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-700 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="city" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">المدينة *</label>
              <input 
                id="city"
                type="text" 
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all outline-none bg-gray-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-700 dark:text-white"
              />
            </div>
            <div>
              <label htmlFor="street" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">الشارع *</label>
              <input 
                id="street"
                type="text" 
                required
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all outline-none bg-gray-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-700 dark:text-white"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">كلمة المرور *</label>
            <input 
              id="password"
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all outline-none bg-gray-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-700 dark:text-white"
              dir="ltr"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">تأكيد كلمة المرور *</label>
            <input 
              id="confirmPassword"
              type="password" 
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all outline-none bg-gray-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-700 dark:text-white"
              dir="ltr"
            />
          </div>

          <motion.button 
            whileTap={{ scale: 0.95 }}
            transition={springConf}
            type="submit" 
            className="w-full bg-gradient-to-r from-gray-900 to-black hover:from-black hover:to-gray-900 text-white font-bold py-3.5 rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 mt-4"
          >
            <span>إنشاء حساب</span>
          </motion.button>
        </form>

        <div className="mt-8 text-center border-t border-gray-100 dark:border-slate-800 pt-6">
          <p className="text-gray-500 dark:text-gray-400 mb-3">لديك حساب بالفعل؟</p>
          <Link 
            to="/login" 
            className="inline-flex items-center justify-center gap-2 text-teal-600 hover:text-teal-700 font-bold transition-colors"
          >
            <LogIn className="w-4 h-4" />
            <span>تسجيل الدخول</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Register;
