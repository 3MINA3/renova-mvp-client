import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import HeroSection from '../components/HeroSection';
import { useProducts } from '../context/ProductContext';
import { useSettings } from '../context/SettingsContext';
import { motion, AnimatePresence } from 'framer-motion';

const springConf = { type: "spring", bounce: 0, duration: 0.4 };

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

            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 py-4">
        {CATEGORIES.map(category => (
          <motion.button
            key={category}
            onClick={() => setActiveCategory(category)}
            whileTap={{ scale: 0.95 }}
            transition={springConf}
            className={`px-6 py-2.5 rounded-full font-bold text-sm transition-colors shadow-sm ${activeCategory === category
                ? 'bg-gray-900 text-white dark:bg-green-600 dark:text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-100 dark:bg-slate-800 dark:text-gray-300 dark:border-slate-700 dark:hover:bg-slate-700'
              }`}
          >
            {category === 'All' ? 'الكل' : category}
          </motion.button>
        ))}
      </div>

            {filteredProducts.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20 text-gray-500 dark:text-gray-400"
        >
          <p className="text-xl font-bold">لا توجد منتجات حالياً</p>
        </motion.div>
      ) : (
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 xl:gap-8"
        >
          <AnimatePresence>
            {filteredProducts.map((product, index) => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ ...springConf, delay: index * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

    </div>
  );
};

export default Home;
