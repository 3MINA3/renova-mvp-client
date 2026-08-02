import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import HeroSection from '../components/HeroSection';
import { useProducts } from '../context/ProductContext';
import { useSettings } from '../context/SettingsContext';

const Home = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const { products } = useProducts();
  const { productCategories } = useSettings();

  const CATEGORIES = ['All', ...productCategories];

  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter(product => product.category === activeCategory);

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-12">
      <HeroSection />

      {/* Category Filter */}
      <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 py-4">
        {CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 shadow-sm ${activeCategory === category
                ? 'bg-gray-900 text-white dark:bg-green-600 dark:text-white scale-105 shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-100 dark:bg-slate-800 dark:text-gray-300 dark:border-slate-700 dark:hover:bg-slate-700'
              }`}
          >
            {category === 'All' ? 'الكل' : category}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 text-gray-500 dark:text-gray-400">
          <p className="text-xl font-bold">{'لا توجد منتجات حالياً'}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 xl:gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
};

export default Home;
