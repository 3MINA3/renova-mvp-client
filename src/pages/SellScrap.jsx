import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRequests } from '../context/RequestsContext';
import { useSettings } from '../context/SettingsContext';
import { useNavigate, Link } from 'react-router-dom';
import { Recycle, AlertCircle, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { SellOrder } from '../models';
import AddressSelector from '../components/AddressSelector';
import { compressImage } from '../utils/imageUtils';

const SellScrap = () => {
  const { isAuthenticated, user, updateUser } = useAuth();
  const { addRequest } = useRequests();
  const { scrapTypes } = useSettings();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    type: '',
    determinedPrice: '',
    description: '',
    image: ''
  });

  const [addressMode, setAddressMode] = useState('registered');
  const [newCity, setNewCity] = useState('');
  const [newStreet, setNewStreet] = useState('');

  const [imageMode, setImageMode] = useState('file');
  const [imageInfo, setImageInfo] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const { compressedDataUrl, imageInfo } = await compressImage(file);
        setImageInfo(imageInfo);
        setFormData(prev => ({ ...prev, image: compressedDataUrl }));
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let finalAddress = '';
    if (addressMode === 'registered') {
      if (user?.address?.city && user?.address?.street) {
        finalAddress = `${user.address.city}، ${user.address.street}`;
      } else if (user?.address && typeof user.address === 'string') {
        finalAddress = user.address;
      } else {
        toast.error('لا يوجد عنوان مسجل. يرجى إدخال عنوان جديد.');
        return;
      }
    } else if (addressMode.startsWith('delivery_')) {
      const index = parseInt(addressMode.split('_')[1], 10);
      const selectedDelivery = user.deliveryAddresses[index];
      if (selectedDelivery) {
        finalAddress = `${selectedDelivery.city}، ${selectedDelivery.street}`;
      } else {
        toast.error('العنوان المحدد غير صالح');
        return;
      }
    } else if (addressMode === 'new') {
      if (!newCity || !newStreet) {
        toast.error('الرجاء تعبئة بيانات العنوان الجديد');
        return;
      }
      finalAddress = `${newCity}، ${newStreet}`;
      
      const updatedDeliveryAddresses = [...(user.deliveryAddresses || []), { city: newCity, street: newStreet }];
      updateUser(user.id, { 
        deliveryAddresses: updatedDeliveryAddresses
      });
      toast.success('تم حفظ العنوان الجديد في ملفك الشخصي');
    }

    if (formData.type && formData.determinedPrice && formData.description && finalAddress) {
      const newSellOrder = new SellOrder({
        id: Date.now().toString(),
        address: finalAddress,
        description: formData.description,
        determinedPrice: Number(formData.determinedPrice),
        status: 'pending',
        image: formData.image,
        type: formData.type,
        userId: user.id,
        userName: user.name,
        phone: user?.phoneNumbers?.[0] || user?.phone || 'غير متوفر',
      });

      addRequest(newSellOrder);
      toast.success('تم إرسال طلبك بنجاح! سيتم التواصل معك قريباً.');
      navigate('/');
    } else {
      toast.error('الرجاء تعبئة جميع الحقول المطلوبة');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto py-20 text-center">
        <div className="bg-orange-100 dark:bg-orange-900/30 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-orange-500 shadow-sm">
          <AlertCircle className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">{'يجب تسجيل الدخول أولاً'}</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
          {'لتتمكن من إرسال طلب بيع خردة، يرجى تسجيل الدخول لحسابك. هذا يساعدنا في تأمين عمليات البيع وسهولة التواصل معك.'}
        </p>
        <div className="flex gap-4 justify-center">
          <Link 
            to="/login" 
            className="bg-gray-900 hover:bg-black text-white px-8 py-3.5 rounded-xl font-bold transition-colors shadow-md"
          >
            {'تسجيل الدخول'}
          </Link>
          <Link 
            to="/register" 
            className="bg-white hover:bg-gray-50 text-gray-900 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white border border-gray-200 dark:border-slate-700 px-8 py-3.5 rounded-xl font-bold transition-colors"
          >
            {'إنشاء حساب'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-12">
      <div className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-800">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-green-500 to-teal-500 text-white mb-4 shadow-lg">
            <Recycle className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-3">{'طلب بيع خردة'}</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">{'حول الخردة التي لا تحتاجها إلى أموال وساهم في الحفاظ على البيئة من خلال إعادة تدويرها.'}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">{'نوع الخردة'} *</label>
              <select 
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 dark:border-slate-700 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all outline-none bg-gray-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-700 dark:text-white"
                required
              >
                <option value="">-- {'نوع الخردة'} --</option>
                {scrapTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
                {scrapTypes.length === 0 && <option value="" disabled>{'لا توجد أنواع خردة متاحة حالياً'}</option>}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">{'السعر المطلوب (ج.م)'} *</label>
              <input 
                type="number" 
                name="determinedPrice"
                value={formData.determinedPrice}
                onChange={handleChange}
                min="1"
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 dark:border-slate-700 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all outline-none bg-gray-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-700 dark:text-white"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">{'وصف الطلب'} *</label>
            <textarea 
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-3.5 rounded-xl border border-gray-200 dark:border-slate-700 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all outline-none bg-gray-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-700 dark:text-white resize-none"
              required
            ></textarea>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-gray-800 dark:text-white border-b border-gray-100 dark:border-slate-800 pb-2 mb-4">{'مكان استلام الخردة'}</h3>
            <AddressSelector 
              user={user}
              addressMode={addressMode}
              setAddressMode={setAddressMode}
              newCity={newCity}
              setNewCity={setNewCity}
              newStreet={newStreet}
              setNewStreet={setNewStreet}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">{'صورة الخردة (اختياري)'}</label>
            
            <div className="flex gap-2 mb-4 bg-gray-50 dark:bg-slate-800 p-1.5 rounded-xl border border-gray-100 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setImageMode('file')}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${imageMode === 'file' ? 'bg-white dark:bg-slate-700 shadow-sm text-green-700 dark:text-green-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
              >
                {'رفع من الجهاز'}
              </button>
              <button
                type="button"
                onClick={() => setImageMode('url')}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${imageMode === 'url' ? 'bg-white dark:bg-slate-700 shadow-sm text-green-700 dark:text-green-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
              >
                {'رابط (URL)'}
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {imageMode === 'url' ? (
                <div className="relative">
                  <ImageIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type="url" 
                    name="image"
                    value={formData.image && !formData.image.startsWith('data:') ? formData.image : ''}
                    onChange={(e) => {
                      handleChange(e);
                      setImageInfo(null);
                    }}
                    placeholder="https://example.com/image.jpg"
                    className="w-full pr-10 pl-4 py-3.5 rounded-xl border border-gray-200 dark:border-slate-700 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all outline-none bg-gray-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-700 dark:text-white"
                    dir="ltr"
                  />
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 dark:file:bg-green-900/30 dark:file:text-green-400 dark:hover:file:bg-green-900/50"
                  />
                  {imageInfo && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 flex justify-between bg-gray-50 dark:bg-slate-800 p-2 rounded-lg border border-gray-100 dark:border-slate-700">
                      <span>{'حجم الصورة الأصلي:'} <span className="font-bold text-gray-700 dark:text-gray-300">{imageInfo.originalSize}</span></span>
                      <span>{'الأبعاد:'} <span className="font-bold text-gray-700 dark:text-gray-300">{imageInfo.dimensions}</span></span>
                    </div>
                  )}
                </div>
              )}

              {formData.image && (
                <div className="mt-2 relative inline-block">
                  <img 
                    src={formData.image} 
                    alt="Preview" 
                    className="w-24 h-24 rounded-xl object-cover border-2 border-gray-100 shadow-sm"
                  />
                </div>
              )}
            </div>
          </div>



          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-green-600 to-teal-500 hover:from-green-700 hover:to-teal-600 text-white font-bold py-4 rounded-xl transition-all shadow-md hover:shadow-lg transform active:scale-95 text-lg mt-6 flex items-center justify-center gap-2"
          >
            <Recycle className="w-5 h-5" />
            <span>{'إرسال الطلب'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SellScrap;
