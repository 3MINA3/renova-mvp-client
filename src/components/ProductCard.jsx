import React from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
    
  const favorite = isFavorite(product.id);

  return (
    <div className="group bg-white/70 dark:bg-slate-900 backdrop-blur-md rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-green-900/5 dark:hover:shadow-teal-900/20 transition-all duration-500 flex flex-col h-full relative hover:-translate-y-2 hover:scale-105 active:scale-[0.98] border border-white dark:border-slate-800 cursor-pointer">
      {/* Product Image Container */}
      <div className="relative h-60 w-full overflow-hidden bg-gray-100/50 dark:bg-slate-800/50">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        {/* Overlay gradient for a premium look */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Category Badge */}
        <span className="absolute top-4 right-4 bg-white/80 dark:bg-slate-800/90 px-4 py-1.5 rounded-full text-xs font-bold text-gray-800 dark:text-gray-200 shadow-sm backdrop-blur-md border border-white/50 dark:border-slate-700">
          {product.category}
        </span>
        
        {/* Favorite Button */}
        <button 
          onClick={() => toggleFavorite(product)}
          className="absolute top-4 left-4 p-2.5 rounded-full bg-white/80 dark:bg-slate-800/90 backdrop-blur-md hover:bg-white dark:hover:bg-slate-700 text-gray-400 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-all shadow-sm z-10 border border-white/50 dark:border-slate-700"
          aria-label="Toggle Favorite"
        >
          <Heart className={`w-5 h-5 transition-colors ${favorite ? 'fill-red-500 text-red-500' : ''}`} />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-6 flex flex-col flex-grow relative z-10">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors">{product.name}</h3>
        <div className="relative mb-6">
          <div className="text-sm text-gray-500 dark:text-gray-400 max-h-[45px] group-hover:max-h-[300px] overflow-hidden transition-[max-height] duration-700 ease-in-out leading-relaxed">
            {product.description}
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white/90 dark:from-slate-900/90 to-transparent group-hover:opacity-0 transition-opacity duration-500 pointer-events-none"></div>
        </div>
        
        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 dark:text-gray-500 font-medium mb-1 uppercase tracking-wider">{'السعر'}</span>
            <span className="text-2xl font-black text-gradient-premium">
              {product.price} <span className="text-sm font-bold text-teal-600 dark:text-teal-400">{'ج.م'}</span>
            </span>
          </div>
          <button 
            onClick={() => addToCart(product)}
            className="flex items-center gap-2 bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-200 dark:text-gray-900 text-white px-5 py-3 rounded-2xl transition-all shadow-md hover:shadow-xl transform active:scale-95 group/btn"
          >
            <ShoppingCart className="w-5 h-5 group-hover/btn:rotate-12 transition-transform" />
            <span className="text-sm font-bold">{'أضف للسلة'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
