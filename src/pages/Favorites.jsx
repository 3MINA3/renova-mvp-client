import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import ProductCard from '../components/ProductCard';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const { favorites } = useFavorites();
  
  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500 dark:text-gray-400">
        <Heart className="w-24 h-24 mb-6 text-gray-300 dark:text-gray-600" />
        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">لا توجد مفضلات بعد</h2>
        <p className="mb-6">العناصر التي تعجبك ستظهر هنا.</p>
        <Link 
          to="/" 
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          تصفح المنتجات
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-8 border-b dark:border-slate-800 pb-4">
        <Heart className="w-8 h-8 text-red-500 fill-red-500" />
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">المفضلة</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favorites.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
