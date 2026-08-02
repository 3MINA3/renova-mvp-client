import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Trash2, Edit, Save, X, Phone, MapPin, Calendar, Key, Mail, User as UserIcon } from 'lucide-react';
import { toast } from 'sonner';
import { User, Address } from '../../models';

const UsersManager = () => {
  const { registeredUsers, updateUser, deleteUser, user: currentUser } = useAuth();
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({ 
    name: '', 
    email: '', 
    password: '',
    primaryPhone: '',
    dateOfBirth: '',
    city: '',
    street: '',
    deliveryAddresses: []
  });
  
  // Re-instantiate users to get the getter methods like `age`
  const usersToDisplay = registeredUsers.map(u => {
    const userObj = new User(u);
    userObj.password = u.password;
    userObj.role = u.role;
    return userObj;
  });

  const handleEdit = (user) => {
    setEditingId(user.id);
    setEditFormData({ 
      name: user.name || '', 
      email: user.email || '', 
      password: user.password || '',
      primaryPhone: user.phoneNumbers && user.phoneNumbers.length > 0 ? user.phoneNumbers[0] : '',
      dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : '',
      city: user.address?.city || '',
      street: user.address?.street || '',
      deliveryAddresses: user.deliveryAddresses ? JSON.parse(JSON.stringify(user.deliveryAddresses)) : []
    });
  };

  const handleSave = (id) => {
    if (!editFormData.name || !editFormData.email || !editFormData.password) {
      toast.error('الاسم، البريد، وكلمة المرور مطلوبة');
      return;
    }

    const phoneNumbers = [];
    if (editFormData.primaryPhone?.trim()) phoneNumbers.push(editFormData.primaryPhone.trim());

    const updatedUser = new User({
      id: id,
      name: editFormData.name,
      email: editFormData.email,
      phoneNumbers: phoneNumbers,
      dateOfBirth: editFormData.dateOfBirth,
      address: new Address({ city: editFormData.city, street: editFormData.street })
    });
    updatedUser.deliveryAddresses = editFormData.deliveryAddresses;

    const success = updateUser(id, { ...updatedUser, password: editFormData.password });
    if (success) {
      toast.success('تم تحديث بيانات المستخدم بنجاح');
      setEditingId(null);
    } else {
      toast.error('هذا البريد الإلكتروني مستخدم بالفعل');
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('هل أنت متأكد من رغبتك في حذف هذا المستخدم؟ لا يمكن التراجع عن هذه الخطوة.')) {
      deleteUser(id);
      toast.success('تم حذف حساب المستخدم');
    }
  };

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">{'إدارة العملاء'}</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">{'استعراض وإدارة حسابات العملاء المسجلين في المنصة وتعديل بياناتهم بكل سهولة.'}</p>
      </div>

      {usersToDisplay.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-16 text-center shadow-sm border border-gray-100 dark:border-slate-800">
          <UserIcon className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">{'لا يوجد عملاء مسجلين حالياً.'}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {usersToDisplay.map((user) => (
            <div key={user.id} className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 hover:shadow-md transition-all overflow-hidden flex flex-col">
              
              {editingId === user.id ? (
                /* Edit Mode Card */
                <div className="p-6 flex-1 flex flex-col gap-4 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-extrabold text-lg text-teal-600 dark:text-teal-400">{'تعديل بيانات المستخدم'}</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">الاسم</label>
                      <div className="relative">
                        <UserIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={editFormData.name}
                          onChange={(e) => setEditFormData({...editFormData, name: e.target.value})}
                          className="w-full pr-9 pl-3 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-teal-500 dark:text-white"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">البريد الإلكتروني</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="email"
                          value={editFormData.email}
                          onChange={(e) => setEditFormData({...editFormData, email: e.target.value})}
                          className="w-full pl-9 pr-3 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-teal-500 dark:text-white text-left"
                          dir="ltr"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">كلمة المرور</label>
                      <div className="relative">
                        <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={editFormData.password}
                          onChange={(e) => setEditFormData({...editFormData, password: e.target.value})}
                          className="w-full pl-9 pr-3 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-teal-500 dark:text-white text-left"
                          dir="ltr"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">الهاتف الأساسي</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={editFormData.primaryPhone}
                          onChange={(e) => setEditFormData({...editFormData, primaryPhone: e.target.value})}
                          className="w-full pl-9 pr-3 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-teal-500 dark:text-white text-left"
                          dir="ltr"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">تاريخ الميلاد</label>
                      <div className="relative">
                        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="date"
                          value={editFormData.dateOfBirth}
                          onChange={(e) => setEditFormData({...editFormData, dateOfBirth: e.target.value})}
                          className="w-full pr-9 pl-3 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-teal-500 dark:text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">المدينة (أساسي)</label>
                        <input
                          type="text"
                          value={editFormData.city}
                          onChange={(e) => setEditFormData({...editFormData, city: e.target.value})}
                          className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-teal-500 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">الشارع (أساسي)</label>
                        <input
                          type="text"
                          value={editFormData.street}
                          onChange={(e) => setEditFormData({...editFormData, street: e.target.value})}
                          className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-teal-500 dark:text-white"
                        />
                      </div>
                    </div>

                    {/* Extra Addresses */}
                    {editFormData.deliveryAddresses && editFormData.deliveryAddresses.length > 0 && (
                      <div className="mt-4 border-t border-gray-100 dark:border-slate-800 pt-4">
                        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-3">العناوين الإضافية المحفوظة</label>
                        <div className="space-y-3 max-h-48 overflow-y-auto custom-scrollbar pl-1">
                          {editFormData.deliveryAddresses.map((addr, idx) => (
                            <div key={idx} className="p-3 bg-gray-50 dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 relative group">
                              <button 
                                type="button"
                                onClick={() => {
                                  const newAddrs = [...editFormData.deliveryAddresses];
                                  newAddrs.splice(idx, 1);
                                  setEditFormData({...editFormData, deliveryAddresses: newAddrs});
                                }}
                                className="absolute top-2 left-2 text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 p-1 rounded-md transition-colors"
                              >
                                <X className="w-3 h-3" />
                              </button>
                              <div className="grid grid-cols-2 gap-3 mb-1">
                                <div>
                                  <label className="block text-[10px] font-bold text-gray-400 mb-1">المدينة</label>
                                  <input
                                    type="text"
                                    value={addr.city}
                                    onChange={(e) => {
                                      const newAddrs = [...editFormData.deliveryAddresses];
                                      newAddrs[idx].city = e.target.value;
                                      setEditFormData({...editFormData, deliveryAddresses: newAddrs});
                                    }}
                                    className="w-full px-2 py-1.5 text-sm bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg outline-none focus:ring-1 focus:ring-teal-500 dark:text-white"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[10px] font-bold text-gray-400 mb-1">الشارع</label>
                                  <input
                                    type="text"
                                    value={addr.street}
                                    onChange={(e) => {
                                      const newAddrs = [...editFormData.deliveryAddresses];
                                      newAddrs[idx].street = e.target.value;
                                      setEditFormData({...editFormData, deliveryAddresses: newAddrs});
                                    }}
                                    className="w-full px-2 py-1.5 text-sm bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg outline-none focus:ring-1 focus:ring-teal-500 dark:text-white"
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-slate-800">
                    <button onClick={() => handleSave(user.id)} className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">
                      <Save className="w-4 h-4" />
                      حفظ
                    </button>
                    <button onClick={() => setEditingId(null)} className="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">
                      <X className="w-4 h-4" />
                      إلغاء
                    </button>
                  </div>
                </div>
              ) : (
                /* View Mode Card */
                <>
                  <div className="p-6 border-b border-gray-50 dark:border-slate-800 flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-400 text-white flex items-center justify-center font-extrabold text-2xl shadow-sm flex-shrink-0">
                      {user.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-extrabold text-lg text-gray-900 dark:text-white truncate">{user.name}</h3>
                      <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 mt-1" dir="ltr">
                        <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="text-sm truncate">{user.email}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-4 flex-1">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-gray-50 dark:bg-slate-800 text-gray-400 dark:text-gray-500 mt-0.5">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-gray-400 dark:text-gray-500 mb-0.5">أرقام الهواتف</span>
                        {user.phoneNumbers && user.phoneNumbers.length > 0 ? (
                          <div className="flex flex-wrap gap-1.5" dir="ltr">
                            {user.phoneNumbers.map((phone, idx) => (
                              <span key={idx} className="bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 text-xs font-bold px-2 py-1 rounded-md">
                                {phone}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">غير متوفر</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-gray-50 dark:bg-slate-800 text-gray-400 dark:text-gray-500 mt-0.5">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div className="w-full">
                        <span className="block text-xs font-bold text-gray-400 dark:text-gray-500 mb-2">العناوين المحفوظة</span>
                        <div className="space-y-2 w-full">
                          {/* Primary Address */}
                          <div className="bg-gray-50 dark:bg-slate-800 p-2.5 rounded-lg border border-gray-100 dark:border-slate-700">
                            <span className="block text-[10px] font-bold text-teal-600 dark:text-teal-400 mb-1">العنوان الأساسي</span>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                              {user.address?.city && user.address?.street 
                                ? `${user.address.city}، ${user.address.street}` 
                                : (user.address?.city || user.address?.street || (typeof user.address === 'string' ? user.address : 'غير متوفر'))}
                            </p>
                          </div>
                          
                          {/* Saved Addresses */}
                          {user.deliveryAddresses && user.deliveryAddresses.length > 0 && (
                            <div className="space-y-2 mt-2">
                              {user.deliveryAddresses.map((addr, idx) => (
                                <div key={idx} className="bg-gray-50 dark:bg-slate-800 p-2.5 rounded-lg border border-gray-100 dark:border-slate-700">
                                  <span className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 mb-1">عنوان محفوظ {idx + 1}</span>
                                  <p className="text-sm text-gray-700 dark:text-gray-300">
                                    {addr.city}، {addr.street}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-gray-50 dark:bg-slate-800 text-gray-400 dark:text-gray-500 mt-0.5">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-gray-400 dark:text-gray-500 mb-0.5">تاريخ الميلاد (العمر)</span>
                        <p className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                          <span dir="ltr">{user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : 'غير متوفر'}</span>
                          {user.age !== null && (
                            <span className="bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 text-xs font-extrabold px-2 py-0.5 rounded-full border border-teal-100 dark:border-teal-900/50">
                              {user.age} سنة
                            </span>
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-gray-50 dark:bg-slate-800 text-gray-400 dark:text-gray-500 mt-0.5">
                        <Key className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-gray-400 dark:text-gray-500 mb-0.5">كلمة المرور</span>
                        <p className="text-sm font-mono text-gray-600 dark:text-gray-400" dir="ltr">{user.password || '---'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 dark:bg-slate-800/50 flex items-center gap-3 justify-end border-t border-gray-100 dark:border-slate-800">
                    <button 
                      onClick={() => handleEdit(user)} 
                      className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-xl transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      تعديل
                    </button>
                    {currentUser.id !== user.id && (
                      <button 
                        onClick={() => handleDelete(user.id)} 
                        className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        حذف
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UsersManager;
