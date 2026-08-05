import React from 'react';
import { Link } from 'react-router-dom';
import { Recycle, Globe, MessageCircle, Share2, Mail } from 'lucide-react';

const Footer = () => {
  
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 mt-20 border-t border-gray-800 relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl -z-10"></div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-12">
          
          {/* Brand & Description */}
          <div className="lg:w-1/3">
            <Link to="/" className="flex items-center gap-2 group w-fit mb-4">
              <div className="bg-gradient-to-tr from-green-500 to-teal-500 text-white p-2 rounded-xl group-hover:rotate-180 transition-transform duration-500 shadow-lg shadow-green-500/20">
                <Recycle className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black font-brand text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400 tracking-tight">
                Renova
              </span>
            </Link>
            <p className="text-gray-400 leading-relaxed text-sm">
              نجمع خردتك لنبني مستقبلاً أنظف. منصتك الأولى لبيع الخردة وإعادة تدويرها بأسعار تنافسية للمساهمة في بيئة مستدامة.
            </p>
          </div>

          {/* Links and Contact side-by-side */}
          <div className="flex flex-wrap sm:flex-nowrap gap-12 lg:gap-24 lg:w-2/3 lg:justify-end">
            
            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold mb-6 text-lg">روابط سريعة</h4>
              <ul className="space-y-4 text-sm">
                <li>
                  <Link to="/sell-scrap" className="text-gray-400 hover:text-green-400 transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500/50"></span>
                    بيع خردة
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-gray-400 hover:text-green-400 transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500/50"></span>
                    تسوق المنتجات المعاد تدويرها
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-400 hover:text-green-400 transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50"></span>
                    اتصل بنا
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact & Socials */}
            <div>
              <h4 className="text-white font-bold mb-6 text-lg">تواصل معنا</h4>
              <div className="flex flex-col gap-5 text-sm text-gray-400">
                <p className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer">
                  <Mail className="w-4 h-4 text-teal-500" />
                  <span dir="ltr">support@renova.com</span>
                </p>
                
                <div className="flex items-center gap-3">
                  <a href="#!" aria-label="Facebook" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all transform hover:-translate-y-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#!" aria-label="Twitter" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-500 hover:text-white transition-all transform hover:-translate-y-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#!" aria-label="Share" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-500 hover:text-white transition-all transform hover:-translate-y-1">
                    <Share2 className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} <span className="font-brand text-gray-400">Renova</span>. جميع الحقوق محفوظة.</p>
          <div className="flex gap-6">
            <Link to="#" className="hover:text-white transition-colors">سياسة الخصوصية</Link>
            <Link to="#" className="hover:text-white transition-colors">الشروط والأحكام</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
