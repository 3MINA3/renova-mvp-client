import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrdersContext';
import { useRequests } from '../context/RequestsContext';
import { ShoppingBag, Recycle, Clock, CheckCircle, XCircle, MapPin, Phone } from 'lucide-react';
import { Navigate } from 'react-router-dom';

const MyOrders = () => {
  const { user, isAuthenticated } = useAuth();
  const { orders } = useOrders();
  const { requests } = useRequests();
    const [activeTab, setActiveTab] = useState('purchases');

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Filter user's specific data
  const userOrders = orders.filter(o => o.userId === user.id || o.userEmail === user.email);
  const userRequests = requests.filter(r => r.userId === user.id || r.userName === user.name);

    const getStatusBadge = (status) => {
      switch (status) {
        case 'new':
        case 'pending':
          return (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 border border-orange-100 dark:border-orange-900/50">
              <Clock className="w-3.5 h-3.5" />
              {status === 'new' ? 'جديد' : 'قيد الانتظار'}
            </span>
          );
        case 'processing':
          return (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50">
              <Clock className="w-3.5 h-3.5" />
              {'جاري التجهيز'}
            </span>
          );
        case 'contacted':
          return (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 border border-purple-100 dark:border-purple-900/50">
              <Phone className="w-3.5 h-3.5" />
              {'تم التواصل'}
            </span>
          );
        case 'negotiating':
          return (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 border border-orange-100 dark:border-orange-900/50">
              <Phone className="w-3.5 h-3.5" />
              {'جاري التفاوض'}
            </span>
          );
        case 'shipped':
          return (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 border border-purple-100 dark:border-purple-900/50">
              <MapPin className="w-3.5 h-3.5" />
              {'تم الشحن'}
            </span>
          );
        case 'accepted':
          return (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 border border-teal-100 dark:border-teal-900/50">
              <CheckCircle className="w-3.5 h-3.5" />
              {'مقبول'}
            </span>
          );
        case 'delivered':
        case 'completed':
        case 'approved':
          return (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 border border-green-100 dark:border-green-900/50">
              <CheckCircle className="w-3.5 h-3.5" />
              {status === 'delivered' ? 'تم التوصيل' : 'مكتمل'}
            </span>
          );
        case 'rejected':
        case 'failed':
          return (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/50">
              <XCircle className="w-3.5 h-3.5" />
              {'مرفوض'}
            </span>
          );
        default:
          return null;
      }
    };

  return (
    <div className="max-w-5xl mx-auto py-12 animate-in fade-in duration-500 min-h-[60vh]">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">{'طلباتي'}</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">مرحباً بك، تابع حالة طلباتك وعمليات البيع الخاصة بك.</p>
        </div>
        
        {/* Tabs */}
        <div className="flex p-1 bg-gray-100/80 dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700">
          <button 
            onClick={() => setActiveTab('purchases')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all ${
              activeTab === 'purchases' 
                ? 'bg-white text-teal-600 shadow-sm border border-gray-200' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{'مشترياتي'}</span>
            <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-lg text-xs">{userOrders.length}</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('requests')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all ${
              activeTab === 'requests' 
                ? 'bg-white dark:bg-slate-900 text-green-600 dark:text-green-400 shadow-sm border border-gray-200 dark:border-slate-600' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            }`}
          >
            <Recycle className="w-4 h-4" />
            <span>{'طلبات بيع الخرده'}</span>
            <span className="bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-lg text-xs">{userRequests.length}</span>
          </button>
        </div>
      </div>

      {activeTab === 'purchases' && (
        <div className="space-y-4">
          {userOrders.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 dark:bg-slate-800 rounded-3xl border border-gray-100 dark:border-slate-700 border-dashed">
              <ShoppingBag className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400 font-medium text-lg">{'لا توجد طلبات شراء حالياً'}</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {userOrders.map(order => (
                <div key={order.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 hover:shadow-md transition-all">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4 pb-4 border-b border-gray-50 dark:border-slate-800">
                    <div>
                      <span className="text-xs font-bold text-gray-400 dark:text-gray-500 block mb-1">{'رقم الطلب'}</span>
                      <span className="font-mono font-bold text-gray-800 dark:text-gray-200">#{order.id}</span>
                    </div>
                    <div>{getStatusBadge(order.status)}</div>
                  </div>

                  {/* Delivery Info */}
                  <div className="mb-4 pb-4 border-b border-gray-50 dark:border-slate-800 flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex items-start gap-2 flex-1">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-xs font-bold text-gray-400 block">عنوان التوصيل</span>
                        <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{order.address || 'غير محدد'}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 md:w-1/3">
                      <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <div>
                        <span className="text-xs font-bold text-gray-400 block">رقم التواصل</span>
                        <span className="text-sm font-bold text-gray-700 dark:text-gray-300" dir="ltr">{order.phone || 'غير محدد'}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 items-center justify-between">
                    <div className="flex flex-wrap gap-3">
                      {order.items?.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 bg-gray-50 dark:bg-slate-800 p-2 pr-4 rounded-xl border border-gray-100 dark:border-slate-700">
                          <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover" />
                          <div>
                            <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{item.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{item.quantity}x</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="text-end min-w-[120px]">
                      <span className="text-xs font-bold text-gray-400 dark:text-gray-500 block mb-1">{'إجمالي الطلب'}</span>
                      <span className="text-xl font-black text-teal-600 dark:text-teal-400">{order.totalAmount || order.total} {'ج.م'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'requests' && (
        <div className="space-y-4">
          {userRequests.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 dark:bg-slate-800 rounded-3xl border border-gray-100 dark:border-slate-700 border-dashed">
              <Recycle className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400 font-medium text-lg">لا يوجد لديك طلبات بيع خردة</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {userRequests.map(request => (
                <div key={request.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="text-xs font-bold text-gray-400 dark:text-gray-500 block mb-1">{'نوع الخردة'}</span>
                        <span className="font-bold text-gray-900 dark:text-white text-lg">{request.type}</span>
                      </div>
                      {getStatusBadge(request.status)}
                    </div>
                    
                    <div className="flex flex-col gap-4 mb-4">
                      <div className="flex justify-between items-center bg-gray-50 dark:bg-slate-800 p-3 rounded-xl border border-gray-100 dark:border-slate-700">
                        <span className="text-xs font-bold text-gray-400 dark:text-gray-500">{'التاريخ'}</span>
                        <span className="font-bold text-gray-800 dark:text-gray-200" dir="ltr">{new Date(request.date).toLocaleDateString()}</span>
                      </div>
                      {request.determinedPrice && (
                        <div className="bg-teal-50 dark:bg-teal-900/20 p-3 rounded-xl border border-teal-100 dark:border-teal-900/50 flex justify-between items-center">
                          <span className="text-xs font-bold text-teal-600 dark:text-teal-400">{'السعر المطلوب'}</span>
                          <span className="font-black text-teal-700 dark:text-teal-300">{request.determinedPrice} ج.م</span>
                        </div>
                      )}
                      <div className="bg-gray-50 dark:bg-slate-800 p-3 rounded-xl border border-gray-100 dark:border-slate-700 flex flex-col md:flex-row gap-4">
                        <div className="flex items-start gap-2 flex-1">
                          <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="text-xs font-bold text-gray-400 block">عنوان الاستلام</span>
                            <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{request.address || 'غير محدد'}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 md:w-1/3">
                          <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <div>
                            <span className="text-xs font-bold text-gray-400 block">رقم التواصل</span>
                            <span className="text-sm font-bold text-gray-700 dark:text-gray-300" dir="ltr">{request.phone || 'غير محدد'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {request.description && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-slate-800 p-3 rounded-xl border border-gray-100 dark:border-slate-700">{request.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default MyOrders;
