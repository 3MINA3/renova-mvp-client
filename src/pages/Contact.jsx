import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  
  return (
    <div className="max-w-4xl mx-auto py-16 animate-in fade-in duration-500">
      
      <div className="text-center mb-16 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-teal-50 dark:bg-teal-900/20 rounded-full blur-3xl -z-10"></div>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">اتصل بنا</h1>
        <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">نحن هنا لمساعدتك. أرسل لنا استفسارك وسنقوم بالرد عليك في أقرب وقت.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        
        {/* Contact Info Cards */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-slate-800 text-center flex flex-col items-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="w-16 h-16 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-6 shadow-sm">
            <Phone className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">رقم الهاتف</h3>
          <p className="text-lg text-gray-600 dark:text-gray-400 font-mono font-medium hover:text-teal-600 dark:hover:text-teal-400 transition-colors cursor-pointer" dir="ltr">+20 123 456 7890</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-slate-800 text-center flex flex-col items-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="w-16 h-16 rounded-full bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center mb-6 shadow-sm">
            <Mail className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">البريد الإلكتروني</h3>
          <p className="text-lg text-gray-600 dark:text-gray-400 font-medium hover:text-green-600 dark:hover:text-green-400 transition-colors cursor-pointer">support@renova.com</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-slate-800 text-center flex flex-col items-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6 shadow-sm">
            <MapPin className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">عنوان التوصيل (بالتفصيل)</h3>
          <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">القاهرة، مصر</p>
        </div>

      </div>
    </div>
  );
};

export default Contact;
