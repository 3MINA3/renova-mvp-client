import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

const INITIAL_MOCK_PRODUCTS = [
  {
    id: 1,
    name: 'طقم كراسي من إطارات السيارات',
    category: 'أثاث وديكور',
    price: 1500,
    description: 'طقم جلوس مريح وأنيق مصنوع يدوياً من إطارات السيارات المعاد تدويرها، مثالي للحدائق والأماكن المفتوحة.',
    image: 'https://images.unsplash.com/photo-1536553896016-0925c47796d1?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    name: 'دفتر ملاحظات من ورق مُعاد تدويره',
    category: 'أدوات مكتبية',
    price: 85,
    description: 'دفتر بتصميم كلاسيكي يحتوي على 200 صفحة من الورق المعاد تدويره 100%، خالي من المواد الكيميائية.',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    name: 'نجفة إضاءة من المواسير النحاسية',
    category: 'إضاءة',
    price: 850,
    description: 'وحدة إضاءة ذات طابع صناعي (Industrial) مصنوعة من بواقي مواسير النحاس الخردة وتضفي لمسة عصرية.',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e9d15?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    name: 'حقيبة قماشية من بقايا الجينز',
    category: 'أزياء وإكسسوارات',
    price: 250,
    description: 'حقيبة عملية وقوية للاستخدام اليومي، تمت حياكتها بعناية من بقايا مصانع الجينز للحفاظ على البيئة.',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 5,
    name: 'مزهرية من زجاجات معُاد تشكيلها',
    category: 'أثاث وديكور',
    price: 120,
    description: 'ديكور زجاجي فريد تم صنعه عن طريق صهر وتشكيل الزجاجات القديمة ليعطي ألواناً جذابة.',
    image: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 6,
    name: 'مقلمة مكتب من علب الكانز',
    category: 'أدوات مكتبية',
    price: 45,
    description: 'منظم أدوات مكتبية ملون وعملي مصنوع من علب المشروبات الغازية المعاد تدويرها بشكل آمن.',
    image: 'https://images.unsplash.com/photo-1506806732259-39c2d0268443?auto=format&fit=crop&w=800&q=80',
  }
];

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    try {
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
      // We can't easily import toast here if it's not available, 
      // but we can alert the user.
      if (e.name === 'QuotaExceededError' || e.message.includes('quota')) {
        alert('حدث خطأ: حجم الصورة كبير جداً، الذاكرة ممتلئة! يرجى اختيار صورة أصغر حجماً.');
        // Revert the last added product if storage fails
        setProducts(products.slice(0, -1));
      }
    }
  }, [products]);

  // Sync products across different browser tabs
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
