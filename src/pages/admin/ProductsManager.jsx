import React, { useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import { useSettings } from '../../context/SettingsContext';
import { Plus, Edit, Trash2, X, Save, Package } from 'lucide-react';
import { toast } from 'sonner';
import { Product } from '../../models';

const ProductsManager = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const { productCategories } = useSettings();
    
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [imageMode, setImageMode] = useState('file');
  const [imageInfo, setImageInfo] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    image: '',
    description: ''
  });

  const resetForm = () => {
    setFormData({ name: '', category: '', price: '', image: '', description: '' });
    setIsEditing(false);
    setEditingId(null);
    setImageInfo(null);
  };

  const handleEdit = (product) => {
    setFormData(product);
    setEditingId(product.id);
    setIsEditing(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const originalSizeMB = (file.size / (1024 * 1024)).toFixed(2);
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          setImageInfo({
            originalSize: originalSizeMB + ' MB',
            dimensions: `${img.width}x${img.height}`
          });
          
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 800;
          
          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
          setFormData(prev => ({ ...prev, image: compressedDataUrl }));
        };
        img.onerror = () => {
          alert('حدث خطأ أثناء قراءة الصورة. يرجى تجربة صورة أخرى.');
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name) return toast.error('يرجى إدخال اسم المنتج');
    if (!formData.category) return toast.error('يرجى اختيار القسم');
    if (!formData.price) return toast.error('يرجى إدخال السعر');
    if (!formData.description) return toast.error('يرجى إدخال الوصف');
    if (!editingId && !formData.image) return toast.error('يرجى رفع صورة للمنتج');

    if (editingId) {
      const updatedProduct = new Product({
        ...formData,
        id: editingId,
        price: Number(formData.price)
      });
      updateProduct(editingId, { ...formData, ...updatedProduct });
      toast.success('تم تحديث المنتج بنجاح');
    } else {
      const newProduct = new Product({
        ...formData,
        id: Date.now().toString(),
        price: Number(formData.price)
      });
      addProduct({ ...formData, ...newProduct });
      toast.success('تم إضافة المنتج بنجاح');
    }
    resetForm();
  };

  const handleDelete = (id) => {
    if (window.confirm('هل أنت متأكد من رغبتك في حذف هذا المنتج؟')) {
      deleteProduct(id);
      toast.success('تم حذف المنتج');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">إدارة المنتجات</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">إدارة منتجات المتجر، إضافة منتجات جديدة أو تعديل الحالية</p>
        </div>
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl font-bold transition-colors shadow-sm"
          >
            <Plus className="w-5 h-5" />
            <span>إضافة منتج</span>
          </button>
        )}
      </div>

      {isEditing && (
        <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-800">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {editingId ? 'تعديل منتج' : 'منتج جديد'}
            </h2>
            <button onClick={resetForm} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 p-2 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">اسم المنتج</label>
                <input 
                  id="name"
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                />
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">القسم</label>
                <select 
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                >
                  <option value="">-- القسم --</option>
                  {productCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                  {productCategories.length === 0 && <option value="" disabled>لا توجد أقسام متاحة</option>}
                </select>
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">السعر (ج.م)</label>
                <input 
                  id="price"
                  type="number" 
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                />
              </div>

              <div>
                <label htmlFor="image" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">صورة المنتج</label>
                
                                <div className="flex gap-2 mb-4 bg-gray-50 dark:bg-slate-800 p-1.5 rounded-xl border border-gray-100 dark:border-slate-700">
                  <button
                    type="button"
                    onClick={() => setImageMode('file')}
                    className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${imageMode === 'file' ? 'bg-white dark:bg-slate-700 shadow-sm text-green-700 dark:text-green-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
                  >
                    رفع من الجهاز
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageMode('url')}
                    className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${imageMode === 'url' ? 'bg-white dark:bg-slate-700 shadow-sm text-green-700 dark:text-green-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
                  >
                    رابط (URL)
                  </button>
                </div>

                <div className="flex flex-col gap-4">
                  {imageMode === 'url' ? (
                    <input 
                      id="image"
                      type="url" 
                      value={formData.image && !formData.image.startsWith('data:') ? formData.image : ''}
                      onChange={(e) => {
                        setFormData({...formData, image: e.target.value});
                        setImageInfo(null);
                      }}
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                      dir="ltr"
                    />
                  ) : (
                    <div className="flex flex-col gap-2">
                      <input 
                        id="image"
                        type="file" 
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 dark:file:bg-green-900/30 dark:file:text-green-400 dark:hover:file:bg-green-900/50"
                      />
                      {imageInfo && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 flex justify-between bg-gray-50 dark:bg-slate-800 p-2 rounded-lg border border-gray-100 dark:border-slate-700">
                          <span>حجم الصورة الأصلي: <span className="font-bold text-gray-700 dark:text-gray-300">{imageInfo.originalSize}</span></span>
                          <span>الأبعاد: <span className="font-bold text-gray-700 dark:text-gray-300">{imageInfo.dimensions}</span></span>
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
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">الوصف</label>
              <textarea 
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all resize-none"
                rows="3"
              ></textarea>
            </div>

            <div className="flex gap-3 justify-end pt-4 border-t border-gray-100 dark:border-slate-800">
              <button 
                type="button" 
                onClick={resetForm}
                className="px-6 py-2.5 rounded-xl font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              >
                إلغاء
              </button>
              <button 
                type="submit"
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-xl font-bold transition-colors shadow-sm transform active:scale-95"
              >
                <Save className="w-5 h-5" />
                <span>حفظ التغييرات</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {!isEditing && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden">
          {products.length === 0 ? (
            <div className="p-12 text-center flex flex-col items-center">
              <div className="bg-gray-50 dark:bg-slate-800 p-6 rounded-full mb-4">
                <Package className="w-12 h-12 text-gray-300 dark:text-gray-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">لا يوجد منتجات متاحة</h3>
              <p className="text-gray-500 dark:text-gray-400">أضف المنتج الأول للمتجر الآن</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-start" dir="rtl">
                <thead className="text-xs text-gray-700 dark:text-gray-300 uppercase bg-gray-50 dark:bg-slate-800 border-b border-gray-100 dark:border-slate-700">
                  <tr>
                    <th className="px-6 py-4 font-bold">اسم المنتج</th>
                    <th className="px-6 py-4 font-bold">القسم</th>
                    <th className="px-6 py-4 font-bold">السعر</th>
                    <th className="px-6 py-4 font-bold text-end">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b border-gray-50 dark:border-slate-800 hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover bg-gray-100 dark:bg-slate-800" />
                          <span className="font-bold text-gray-900 dark:text-white">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{product.category}</td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-green-600">{product.price} ج.م</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 justify-end">
                          <button 
                            onClick={() => handleEdit(product)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(product.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductsManager;
