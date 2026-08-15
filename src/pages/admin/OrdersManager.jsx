import React, { useState } from 'react';
import { useOrders } from '../../context/OrdersContext';
import { ShoppingBag, CheckCircle, XCircle, Clock, MapPin, Phone, User, Package } from 'lucide-react';
import { toast } from 'sonner';

const OrdersManager = () => {
  const { orders, updateOrderStatus } = useOrders();
    const [filter, setFilter] = useState('all');

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    return order.status === filter;
  });

  const handleStatusUpdate = (id, status) => {
    updateOrderStatus(id, status);
    toast.success('تم تحديث حالة الطلب بنجاح');
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'pending':
        return <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-500 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1"><Clock className="w-3 h-3"/> قيد الانتظار</span>;
      case 'processing':
        return <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-500 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1"><Clock className="w-3 h-3"/> جاري التجهيز</span>;
      case 'shipped':
        return <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1"><MapPin className="w-3 h-3"/> تم الشحن</span>;
      case 'delivered':
      case 'completed':
        return <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-500 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1"><CheckCircle className="w-3 h-3"/> تم التوصيل</span>;
      case 'rejected':
      case 'failed':
        return <span className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1"><XCircle className="w-3 h-3"/> مرفوض</span>;
      default:
        return null;
    }
  };

  const statuses = [
    { id: 'all', label: 'الكل' },
    { id: 'pending', label: 'قيد الانتظار' },
    { id: 'processing', label: 'جاري التجهيز' },
    { id: 'shipped', label: 'تم الشحن' },
    { id: 'delivered', label: 'تم التوصيل' },
    { id: 'rejected', label: 'مرفوض' }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">إدارة طلبات الشراء</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">متابعة وإدارة طلبات شراء المنتجات من المتجر</p>
        </div>
        
                <div className="w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 custom-scrollbar">
          <div className="flex bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 p-1 min-w-max">
            {statuses.map(s => (
              <button 
                key={s.id}
                onClick={() => setFilter(s.id)}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${filter === s.id ? 'bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800/50'}`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm">
          <ShoppingBag className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-500 dark:text-gray-400">لا توجد طلبات شراء حالياً</h3>
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredOrders.map(order => (
            <div key={order.id} className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-800">
              
                            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6 border-b border-gray-100 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">#{order.id}</h3>
                    <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end mr-4">
                    <span className="text-xs text-gray-400">إجمالي الطلب</span>
                    <span className="font-black text-xl text-teal-600">{order.totalAmount || order.total} ج.م</span>
                  </div>
                  {getStatusBadge(order.status)}
                </div>
              </div>

                            <div className="grid md:grid-cols-2 gap-6">
                
                                <div className="space-y-4">
                  <h4 className="font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" /> العميل
                  </h4>
                  <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-xl space-y-3 text-sm">
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">الاسم:</span>
                      <span className="font-bold mr-2 dark:text-gray-200">{order.userName}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 dark:text-gray-400">البريد الإلكتروني:</span>
                      <span className="font-bold text-gray-900 dark:text-white">{order.userEmail}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1"><Phone className="w-3 h-3"/> رقم الهاتف:</span>
                      <span className="font-bold text-gray-900 dark:text-white" dir="ltr">{order.phone}</span>
                    </div>
                    <div className="flex items-start justify-between">
                      <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1"><MapPin className="w-3 h-3"/> عنوان التوصيل (بالتفصيل):</span>
                      <span className="font-bold text-gray-900 dark:text-white text-end max-w-[60%]">{order.address}</span>
                    </div>
                  </div>
                </div>

                                <div className="space-y-4">
                  <h4 className="font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <Package className="w-4 h-4 text-gray-400" /> العناصر
                  </h4>
                  <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-xl space-y-3 max-h-48 overflow-y-auto">
                    {order.items.map(item => (
                      <div key={item.id} className="flex justify-between items-center border-b border-gray-200 dark:border-slate-700 last:border-0 pb-2 last:pb-0">
                        <div className="flex items-center gap-3">
                          <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover bg-white dark:bg-slate-700" />
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-gray-800 dark:text-gray-200 line-clamp-1">{item.name}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{item.quantity} x {item.price} ج.م</span>
                          </div>
                        </div>
                        <span className="font-bold text-gray-900 dark:text-white">{item.quantity * item.price} ج.م</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

                            <div className="p-4 bg-gray-50 dark:bg-slate-800/50 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between gap-3 mt-auto">
                <div className="flex items-center gap-2 flex-1">
                  <span className="text-xs font-bold text-gray-500 dark:text-gray-400">تحديث الحالة:</span>
                  <select
                    value={order.status === 'completed' ? 'delivered' : (order.status === 'failed' ? 'rejected' : order.status)}
                    onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                    className="flex-1 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 text-sm font-bold rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                  >
                    {statuses.filter(s => s.id !== 'all').map(s => (
                      <option key={s.id} value={s.id}>{s.label}</option>
                    ))}
                  </select>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersManager;
