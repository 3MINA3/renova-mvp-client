import React, { useState } from 'react';
import { User } from '../models';
import { Save, UserPlus, Phone, MapPin, Calendar, Mail, User as UserIcon } from 'lucide-react';
import { toast } from 'sonner';

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    city: '',
    street: ''
  });

  const [createdUser, setCreatedUser] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.dateOfBirth) {
      return toast.error('يرجى تعبئة الحقول الأساسية (الاسم، الإيميل، تاريخ الميلاد)');
    }

    const phoneNumbers = formData.phone 
      ? formData.phone.split(',').map(p => p.trim()).filter(p => p) 
      : [];

    const newUser = new User({
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      phoneNumbers: phoneNumbers,
      dateOfBirth: formData.dateOfBirth,
      address: {
        id: Date.now() + 1,
        city: formData.city,
        street: formData.street
      }
    });


    setCreatedUser(newUser);
    toast.success('تم إنشاء المستخدم بنجاح! تم حساب العمر: ' + newUser.age);
    
    setFormData({
      name: '', email: '', phone: '', dateOfBirth: '', city: '', street: ''
    });
  };

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-800" dir="rtl">
      <div className="flex items-center gap-3 mb-6 border-b border-gray-100 dark:border-slate-800 pb-4">
        <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-xl text-green-600 dark:text-green-400">
          <UserPlus className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">إضافة مستخدم جديد</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">قم بإدخال بيانات المستخدم وتاريخ الميلاد لحساب العمر تلقائياً</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="name" className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
              <UserIcon className="w-4 h-4 text-gray-400" />
              الاسم الكامل
            </label>
            <input 
              id="name"
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="مثال: أحمد محمد"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
              <Mail className="w-4 h-4 text-gray-400" />
              البريد الإلكتروني
            </label>
            <input 
              id="email"
              type="email" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="ahmed@example.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all text-left"
              dir="ltr"
            />
          </div>

          <div>
            <label htmlFor="phone" className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
              <Phone className="w-4 h-4 text-gray-400" />
              رقم الهاتف (يمكن إضافة أكثر من رقم مفصول بفاصلة)
            </label>
            <input 
              id="phone"
              type="text" 
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              placeholder="01012345678, 01234567890"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all text-left"
              dir="ltr"
            />
          </div>

          <div>
            <label htmlFor="dateOfBirth" className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              تاريخ الميلاد
            </label>
            <input 
              id="dateOfBirth"
              type="date" 
              value={formData.dateOfBirth}
              onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 dark:border-slate-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-gray-400" />
            بيانات العنوان
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="city" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">المدينة</label>
              <input 
                id="city"
                type="text" 
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
                placeholder="مثال: القاهرة"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
              />
            </div>
            <div>
              <label htmlFor="street" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">الشارع</label>
              <input 
                id="street"
                type="text" 
                value={formData.street}
                onChange={(e) => setFormData({...formData, street: e.target.value})}
                placeholder="مثال: شارع النيل"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-gray-100 dark:border-slate-800">
          <button 
            type="submit"
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-sm hover:shadow-md transform active:scale-95"
          >
            <Save className="w-5 h-5" />
            <span>حفظ المستخدم</span>
          </button>
        </div>
      </form>

            {createdUser && (
        <div className="mt-8 bg-gray-50 dark:bg-slate-800 p-6 rounded-2xl border border-green-200 dark:border-green-900">
          <h3 className="text-lg font-bold text-green-800 dark:text-green-400 mb-4">تم إنشاء المستخدم بنجاح!</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-500 dark:text-gray-400 block mb-1">الاسم:</span>
              <span className="font-bold text-gray-900 dark:text-white">{createdUser.name}</span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400 block mb-1">العمر المحسوب:</span>
              <span className="font-bold text-green-600">{createdUser.age} سنة</span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400 block mb-1">الهاتف:</span>
              <span className="font-bold text-gray-900 dark:text-white" dir="ltr">{createdUser.phoneNumbers.join(' - ')}</span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400 block mb-1">المدينة:</span>
              <span className="font-bold text-gray-900 dark:text-white">{createdUser.address.city}</span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400 block mb-1">الشارع:</span>
              <span className="font-bold text-gray-900 dark:text-white">{createdUser.address.street}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserForm;
