import React, { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

const INITIAL_CATEGORIES = ['أجهزة علمية مجددة', 'قطع كمبيوتر مجددة', 'ملحقات مجددة'];
const INITIAL_SCRAP_TYPES = ['بلاستيك', 'كرتون', 'معادن', 'زيت', 'أخرى'];

const CURRENT_SETTINGS_VERSION = 'v3.0';

export const SettingsProvider = ({ children }) => {
  const [productCategories, setProductCategories] = useState(() => {
    // Force update if data version changes
    const savedVersion = localStorage.getItem('settings_data_version');
    if (savedVersion !== CURRENT_SETTINGS_VERSION) {
      localStorage.setItem('settings_data_version', CURRENT_SETTINGS_VERSION);
      return INITIAL_CATEGORIES;
    }

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
