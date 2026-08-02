import React, { useState } from 'react';
import { useSettings } from '../../context/SettingsContext';
import { Plus, Trash2, Tag, Layers } from 'lucide-react';
import { toast } from 'sonner';

const SettingsManager = () => {
  const { scrapTypes, productCategories, addScrapType, deleteScrapType, addCategory, deleteCategory } = useSettings();
  
  const [newScrapType, setNewScrapType] = useState('');
  const [newCategory, setNewCategory] = useState('');

  const handleAddScrapType = (e) => {
    e.preventDefault();
    if (newScrapType.trim()) {
      addScrapType(newScrapType.trim());
      setNewScrapType('');
      toast.success('تم إضافة نوع الخردة بنجاح');
    }
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategory.trim()) {
      addCategory(newCategory.trim());
      setNewCategory('');
      toast.success('تم إضافة القسم بنجاح');
    }
  };

  const handleRemoveScrapType = (type) => {
    if (window.confirm('هل أنت متأكد من حذف هذا النوع؟')) {
      deleteScrapType(type);
      toast.success('تم حذف نوع الخردة');
    }
  };

  const handleRemoveCategory = (category) => {
    if (window.confirm('هل أنت متأكد من حذف هذا القسم؟')) {
      deleteCategory(category);
      toast.success('تم حذف القسم');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">{'إعدادات المنصة'}</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">{'إدارة أنواع الخردة وأقسام المنتجات'}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Scrap Types */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800">
          <div className="flex items-center gap-3 mb-6 border-b border-gray-100 dark:border-slate-800 pb-4">
            <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-lg text-orange-600 dark:text-orange-500">
              <Layers className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{'أنواع الخردة'}</h2>
          </div>

          <form onSubmit={handleAddScrapType} className="flex gap-2 mb-6">
            <input 
              type="text" 
              value={newScrapType}
              onChange={(e) => setNewScrapType(e.target.value)}
              placeholder={'إضافة نوع خردة جديد...'}
              className="flex-grow px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
            />
            <button 
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white p-2.5 rounded-xl transition-colors shadow-sm flex items-center justify-center min-w-[44px]"
            >
              <Plus className="w-5 h-5" />
            </button>
          </form>

          <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
            {scrapTypes.map((type, idx) => (
              <div key={idx} className="flex justify-between items-center bg-gray-50 dark:bg-slate-800 p-3 rounded-xl border border-gray-100 dark:border-slate-700">
                <span className="font-bold text-gray-700 dark:text-gray-300">{type}</span>
                <button 
                  onClick={() => handleRemoveScrapType(type)}
                  className="text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 p-2 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            {scrapTypes.length === 0 && (
              <p className="text-center text-gray-400 dark:text-gray-500 py-4">{'لا توجد أنواع خردة متاحة حالياً'}</p>
            )}
          </div>
        </div>

        {/* Product Categories */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800">
          <div className="flex items-center gap-3 mb-6 border-b border-gray-100 dark:border-slate-800 pb-4">
            <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg text-green-600 dark:text-green-500">
              <Tag className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{'أقسام المنتجات'}</h2>
          </div>

          <form onSubmit={handleAddCategory} className="flex gap-2 mb-6">
            <input 
              type="text" 
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder={'إضافة قسم جديد...'}
              className="flex-grow px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
            />
            <button 
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white p-2.5 rounded-xl transition-colors shadow-sm flex items-center justify-center min-w-[44px]"
            >
              <Plus className="w-5 h-5" />
            </button>
          </form>

          <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
            {productCategories.map((cat, idx) => (
              <div key={idx} className="flex justify-between items-center bg-gray-50 dark:bg-slate-800 p-3 rounded-xl border border-gray-100 dark:border-slate-700">
                <span className="font-bold text-gray-700 dark:text-gray-300">{cat}</span>
                <button 
                  onClick={() => handleRemoveCategory(cat)}
                  className="text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 p-2 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            {productCategories.length === 0 && (
              <p className="text-center text-gray-400 dark:text-gray-500 py-4">{'لا توجد أقسام متاحة'}</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default SettingsManager;
