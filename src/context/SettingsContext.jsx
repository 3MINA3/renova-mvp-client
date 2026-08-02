import React, { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

const INITIAL_CATEGORIES = ['أثاث وديكور', 'أدوات مكتبية', 'أزياء وإكسسوارات', 'إضاءة'];
const INITIAL_SCRAP_TYPES = ['بلاستيك', 'كرتون', 'معادن', 'زيت', 'أخرى'];

export const SettingsProvider = ({ children }) => {
  const [productCategories, setProductCategories] = useState(() => {
    const saved = localStorage.getItem('product_categories');
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });

  const [scrapTypes, setScrapTypes] = useState(() => {
    const saved = localStorage.getItem('scrap_types');
    return saved ? JSON.parse(saved) : INITIAL_SCRAP_TYPES;
  });

  useEffect(() => {
    localStorage.setItem('product_categories', JSON.stringify(productCategories));
  }, [productCategories]);

  useEffect(() => {
    localStorage.setItem('scrap_types', JSON.stringify(scrapTypes));
  }, [scrapTypes]);

  const addCategory = (category) => {
    if (!productCategories.includes(category)) {
      setProductCategories([...productCategories, category]);
    }
  };

  const deleteCategory = (category) => {
    setProductCategories(productCategories.filter(c => c !== category));
  };

  const addScrapType = (type) => {
    if (!scrapTypes.includes(type)) {
      setScrapTypes([...scrapTypes, type]);
    }
  };

  const deleteScrapType = (type) => {
    setScrapTypes(scrapTypes.filter(t => t !== type));
  };

  return (
    <SettingsContext.Provider value={{ 
      productCategories, addCategory, deleteCategory,
      scrapTypes, addScrapType, deleteScrapType
    }}>
      {children}
    </SettingsContext.Provider>
  );
};
