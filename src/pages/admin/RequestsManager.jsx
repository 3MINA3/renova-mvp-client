import React, { useState } from 'react';
import { useRequests } from '../../context/RequestsContext';
import { CheckCircle, XCircle, Trash2, Inbox, Recycle, User, MapPin, Phone, FileText, Image as ImageIcon, X } from 'lucide-react';
import { toast } from 'sonner';

const RequestsManager = () => {
  const { requests, updateRequestStatus, deleteRequest } = useRequests();
  const [filter, setFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  
  const filteredRequests = requests.filter(req => {
    if (filter === 'all') return true;
    return req.status === filter;
  });

  const handleStatusChange = (id, newStatus) => {
    updateRequestStatus(id, newStatus);
    toast.success('تم تحديث حالة الطلب');
  };

  const handleDelete = (id) => {
    if (window.confirm('هل أنت متأكد من رغبتك في حذف هذا الطلب؟ لا يمكن التراجع عن هذه الخطوة.')) {
      deleteRequest(id);
      toast.success('تم حذف الطلب بنجاح');
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'new':
      case 'pending':
        return <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-500 px-3 py-1.5 rounded-full text-xs font-bold border border-blue-200 dark:border-blue-800">جديد</span>;
      case 'contacted':
        return <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 px-3 py-1.5 rounded-full text-xs font-bold border border-purple-200 dark:border-purple-800">تم التواصل</span>;
      case 'negotiating':
        return <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-500 px-3 py-1.5 rounded-full text-xs font-bold border border-orange-200 dark:border-orange-800">جاري التفاوض</span>;
      case 'accepted':
      case 'approved':
        return <span className="bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 px-3 py-1.5 rounded-full text-xs font-bold border border-teal-200 dark:border-teal-800">مقبول</span>;
      case 'rejected':
        return <span className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-3 py-1.5 rounded-full text-xs font-bold border border-red-200 dark:border-red-800">مرفوض</span>;
      case 'completed':
        return <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-500 px-3 py-1.5 rounded-full text-xs font-bold border border-green-200 dark:border-green-800">مكتمل</span>;
      default:
        return status;
    }
  };

  const statuses = [
    { id: 'all', label: 'الكل' },
    { id: 'new', label: 'جديد' },
    { id: 'contacted', label: 'تم التواصل' },
    { id: 'negotiating', label: 'جاري التفاوض' },
    { id: 'accepted', label: 'مقبول' },
    { id: 'rejected', label: 'مرفوض' },
    { id: 'completed', label: 'مكتمل' }
  ];

  return (
    <div className="space-y-6 pb-10 animate-in fade-in duration-500">
      
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">طلبات بيع الخردة</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">إدارة طلبات المستخدمين لبيع الخردة الخاصة بهم</p>
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

            {filteredRequests.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-16 text-center shadow-sm border border-gray-100 dark:border-slate-800">
          <div className="bg-gray-50 dark:bg-slate-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Inbox className="w-10 h-10 text-gray-300 dark:text-gray-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">لا يوجد طلبات حالياً</h3>
          <p className="text-gray-500 dark:text-gray-400">ستظهر الطلبات هنا فور قيام المستخدمين بتقديمها.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {filteredRequests.map((req) => (
            <div key={req.id} className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 hover:shadow-md transition-all overflow-hidden flex flex-col">
              
                            <div className="p-6 border-b border-gray-50 dark:border-slate-800 flex items-center justify-between bg-gray-50/50 dark:bg-slate-800/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-green-500 to-teal-500 text-white flex items-center justify-center shadow-sm flex-shrink-0">
                    <Recycle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-gray-400 dark:text-gray-500 block">رقم الطلب</span>
                    <span className="font-mono font-bold text-gray-800 dark:text-gray-200">#{req.id}</span>
                  </div>
                </div>
                <div>{getStatusBadge(req.status)}</div>
              </div>

                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                
                                <div className="space-y-4">
                  <h4 className="font-bold text-gray-700 dark:text-gray-300 border-b border-gray-100 dark:border-slate-800 pb-2">بيانات الخردة</h4>
                  
                  <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-2xl space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500 dark:text-gray-400 font-bold">النوع</span>
                      <span className="font-bold text-gray-900 dark:text-white bg-white dark:bg-slate-700 px-3 py-1 rounded-lg border border-gray-200 dark:border-slate-600 shadow-sm">{req.type}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500 dark:text-gray-400 font-bold">التاريخ</span>
                      <span className="font-bold text-gray-900 dark:text-white" dir="ltr">{new Date(req.date).toLocaleDateString()}</span>
                    </div>
                    {req.determinedPrice && (
                      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-slate-700 flex justify-between items-center">
                        <span className="text-xs text-teal-600 dark:text-teal-400 font-bold">السعر المطلوب</span>
                        <span className="font-black text-lg text-teal-700 dark:text-teal-300">{req.determinedPrice} ج.م</span>
                      </div>
                    )}
                  </div>
                </div>

                                <div className="space-y-4">
                  <h4 className="font-bold text-gray-700 dark:text-gray-300 border-b border-gray-100 dark:border-slate-800 pb-2">بيانات العميل</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gray-50 dark:bg-slate-800 text-gray-400 dark:text-gray-500">
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-gray-400 dark:text-gray-500">الاسم</span>
                        <span className="font-bold text-gray-800 dark:text-gray-200">{req.userName}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gray-50 dark:bg-slate-800 text-gray-400 dark:text-gray-500">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-gray-400 dark:text-gray-500">الهاتف</span>
                        <span className="font-bold text-gray-800 dark:text-gray-200" dir="ltr">{req.phone}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-gray-50 dark:bg-slate-800 text-gray-400 dark:text-gray-500">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-gray-400 dark:text-gray-500">العنوان</span>
                        <span className="text-sm font-bold text-gray-800 dark:text-gray-200 leading-snug block">{req.address}</span>
                      </div>
                    </div>
                  </div>
                </div>

                                {(req.description || req.image) && (
                  <div className="md:col-span-2 mt-2 space-y-4">
                    <h4 className="font-bold text-gray-700 dark:text-gray-300 border-b border-gray-100 dark:border-slate-800 pb-2">تفاصيل إضافية</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {req.description && (
                        <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 p-4 rounded-xl flex items-start gap-3">
                          <FileText className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="block text-xs font-bold text-amber-600 dark:text-amber-500 mb-1">وصف العميل</span>
                            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{req.description}</p>
                          </div>
                        </div>
                      )}
                      
                      {req.image && (
                        <button 
                          onClick={() => setSelectedImage(req.image)}
                          className="bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 p-2 rounded-xl flex items-center justify-center h-32 overflow-hidden group relative block transition-all w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                        >
                          <img src={req.image} alt="صورة الخردة" className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300" />
                          <div className="absolute inset-2 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                            <span className="text-white text-xs font-bold flex items-center gap-1"><ImageIcon className="w-4 h-4"/> عرض مكبر</span>
                          </div>
                        </button>
                      )}
                    </div>
                  </div>
                )}
                
              </div>

                            <div className="p-4 bg-gray-50 dark:bg-slate-800/50 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between gap-3 mt-auto">
                <div className="flex items-center gap-2 flex-1">
                  <span className="text-xs font-bold text-gray-500 dark:text-gray-400">تحديث الحالة:</span>
                  <select
                    value={req.status === 'pending' ? 'new' : (req.status === 'approved' ? 'accepted' : req.status)}
                    onChange={(e) => handleStatusChange(req.id, e.target.value)}
                    className="flex-1 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 text-sm font-bold rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                  >
                    {statuses.filter(s => s.id !== 'all').map(s => (
                      <option key={s.id} value={s.id}>{s.label}</option>
                    ))}
                  </select>
                </div>
                <button 
                  onClick={() => handleDelete(req.id)}
                  className="p-2 ml-auto text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                  title="حذف الطلب نهائياً"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

            {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full h-auto max-h-[90vh] flex flex-col items-center justify-center">
            <button 
              onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
              className="absolute -top-12 right-0 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-colors backdrop-blur-sm"
            >
              <X className="w-6 h-6" />
            </button>
            <img 
              src={selectedImage} 
              alt="صورة مكبرة" 
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestsManager;
