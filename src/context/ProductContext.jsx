import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

const INITIAL_MOCK_PRODUCTS = [
  {
    id: 1,
    name: 'جهاز تقليب مغناطيسي ReNova',
    category: 'أجهزة علمية مجددة',
    price: 1299,
    description: 'جهاز تقليب مغناطيسي عملي واقتصادي مُعاد تدويره من مكونات إلكترونية مستردة، مزود بسرعة قابلة للتعديل. مثالي للمعامل التعليمية وطلاب STEM، ويساهم في تقليل النفايات الإلكترونية.',
    image: '/renova-mvp-client/renova-stirrer.jpg',
  },
  {
    id: 2,
    name: 'كيسة كمبيوتر معدنية (مجددة)',
    category: 'قطع كمبيوتر مجددة',
    price: 450,
    description: 'كيسة متينة وواسعة تم تجديدها بالكامل، تسمح بتهوية ممتازة لمكونات الجهاز، وبحالة جيدة جداً.',
    image: '/renova-mvp-client/case.png',
  },
  {
    id: 3,
    name: 'معالج Core i5 جيل رابع (مجدد)',
    category: 'قطع كمبيوتر مجددة',
    price: 1100,
    description: 'معالج قوي للاستخدام المكتبي والألعاب المتوسطة، تم اختباره وتجديده ليعمل بثبات ودون مشاكل حرارة.',
    image: '/renova-mvp-client/cpu.png',
  },
  {
    id: 4,
    name: 'شاشة كمبيوتر 19 بوصة (مجددة)',
    category: 'ملحقات مجددة',
    price: 850,
    description: 'شاشة LED مجددة خالية من العيوب، تقدم ألوان زاهية ومناسبة للعمل اليومي المكتبي والمذاكرة.',
    image: '/renova-mvp-client/monitor.png',
  }
];

const CURRENT_DATA_VERSION = 'v3.3';

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    try {
      const savedVersion = localStorage.getItem('product_data_version');
      if (savedVersion !== CURRENT_DATA_VERSION) {
        localStorage.setItem('product_data_version', CURRENT_DATA_VERSION);
        return INITIAL_MOCK_PRODUCTS;
      }

      const saved = localStorage.getItem('products');
      return saved ? JSON.parse(saved) : INITIAL_MOCK_PRODUCTS;
    } catch (e) {
      console.error('Failed to parse products from local storage', e);
      return INITIAL_MOCK_PRODUCTS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('products', JSON.stringify(products));
    } catch (e) {
      console.error('Storage full:', e);
      if (e.name === 'QuotaExceededError' || e.message.includes('quota')) {
        alert('حدث خطأ: حجم الصورة كبير جداً، الذاكرة ممتلئة! يرجى اختيار صورة أصغر حجماً.');
        setProducts(products.slice(0, -1));
      }
    }
  }, [products]);

  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === 'products') {
        setProducts(e.newValue ? JSON.parse(e.newValue) : INITIAL_MOCK_PRODUCTS);
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const addProduct = (product) => {
    const newProduct = product.id ? product : { ...product, id: Date.now() };
    setProducts([...products, newProduct]);
  };

  const updateProduct = (id, updatedData) => {
    setProducts(products.map(p => p.id === id ? { ...p, ...updatedData } : p));
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
