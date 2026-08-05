import React from 'react';
import { MapPin } from 'lucide-react';

const AddressSelector = ({ 
  user, 
  addressMode, 
  setAddressMode, 
  newCity, 
  setNewCity, 
  newStreet, 
  setNewStreet 
}) => {
  return (
    <div className="space-y-4">
      <div className="max-h-64 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
        {/* Primary Address */}
        {(user?.address?.city || (user?.address && typeof user.address === 'string')) && (
          <label className="flex items-start gap-3 p-4 border border-gray-200 dark:border-slate-700 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
            <input 
              type="radio" 
              name="addressMode" 
              value="registered" 
              checked={addressMode === 'registered'} 
              onChange={() => setAddressMode('registered')}
              className="mt-1 w-4 h-4 text-green-600 focus:ring-green-500 flex-shrink-0"
            />
            <div>
              <span className="block font-bold text-gray-800 dark:text-white mb-1">{'العنوان الأساسي'}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {user?.address?.city && user?.address?.street 
                  ? `${user.address.city}، ${user.address.street}` 
                  : user.address}
              </span>
            </div>
          </label>
        )}

        {/* Saved Delivery Addresses */}
        {user?.deliveryAddresses?.map((addr, idx) => (
          <label key={idx} className="flex items-start gap-3 p-4 border border-gray-200 dark:border-slate-700 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
            <input 
              type="radio" 
              name="addressMode" 
              value={`delivery_${idx}`} 
              checked={addressMode === `delivery_${idx}`} 
              onChange={() => setAddressMode(`delivery_${idx}`)}
              className="mt-1 w-4 h-4 text-green-600 focus:ring-green-500 flex-shrink-0"
            />
            <div>
              <span className="block font-bold text-gray-800 dark:text-white mb-1">{'عنوان توصيل محفوظ ' + (idx + 1)}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {`${addr.city}، ${addr.street}`}
              </span>
            </div>
          </label>
        ))}

        {/* Add New Address */}
        <label className="flex items-start gap-3 p-4 border border-gray-200 dark:border-slate-700 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
          <input 
            type="radio" 
            name="addressMode" 
            value="new" 
            checked={addressMode === 'new'} 
            onChange={() => setAddressMode('new')}
            className="mt-1 w-4 h-4 text-green-600 focus:ring-green-500 flex-shrink-0"
          />
          <div>
            <span className="block font-bold text-gray-800 dark:text-white mb-1">{'إضافة عنوان توصيل جديد'}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">{'سيتم حفظ هذا العنوان في قائمة عناوينك'}</span>
          </div>
        </label>
      </div>

      {/* New Address Form */}
      {addressMode === 'new' && (
        <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded-xl space-y-3 animate-in fade-in zoom-in-95 duration-200">
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">{'المدينة'} *</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                required
                value={newCity}
                onChange={(e) => setNewCity(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                placeholder={'أدخل المدينة'}
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">{'الشارع'} *</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                required
                value={newStreet}
                onChange={(e) => setNewStreet(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                placeholder={'اسم الشارع أو رقم العمارة'}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressSelector;
