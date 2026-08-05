import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrdersContext';
import { Trash2, Plus, Minus, CreditCard, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { PurchaseOrder } from '../models';
import AddressSelector from '../components/AddressSelector';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, cartTotal } = useCart();
  const { isAuthenticated, user, updateUser } = useAuth();
  const { addOrder } = useOrders();
    
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [addressMode, setAddressMode] = useState('registered');
  const [newCity, setNewCity] = useState('');
  const [newStreet, setNewStreet] = useState('');

  const handleCheckoutClick = () => {
    if (!isAuthenticated) {
      toast.error('يرجى تسجيل الدخول أولاً لإتمام الطلب لتتمكن من إضافة بيانات التوصيل');
      return;
    }

    if (!user?.address?.city && !user?.address?.street) {
      setAddressMode('new');
    } else {
      setAddressMode('registered');
    }

    setIsCheckingOut(true);
  };

  const submitOrder = (e) => {
    e.preventDefault();
    
    let finalAddress = '';
    if (addressMode === 'registered') {
      if (user?.address?.city && user?.address?.street) {
        finalAddress = `${user.address.city}، ${user.address.street}`;
      } else if (user?.address && typeof user.address === 'string') {
        finalAddress = user.address;
      } else {
        toast.error('لا يوجد عنوان مسجل. يرجى إدخال عنوان جديد.');
        return;
      }
    } else if (addressMode.startsWith('delivery_')) {
      const index = parseInt(addressMode.split('_')[1], 10);
      const selectedDelivery = user?.deliveryAddresses?.[index];
      if (selectedDelivery) {
        finalAddress = `${selectedDelivery.city}، ${selectedDelivery.street}`;
      } else {
        toast.error('العنوان المحدد غير صالح');
        return;
      }
    } else if (addressMode === 'new') {
      if (!newCity || !newStreet) {
        toast.error('الرجاء تعبئة بيانات العنوان الجديد');
        return;
      }
      finalAddress = `${newCity}، ${newStreet}`;
      
      const updatedDeliveryAddresses = [...(user?.deliveryAddresses || []), { city: newCity, street: newStreet }];
      // Save the new address to the user's deliveryAddresses list
      updateUser(user?.id, { 
        deliveryAddresses: updatedDeliveryAddresses
      });
      toast.success('تم حفظ العنوان الجديد في ملفك الشخصي');
    }

    const purchaseOrder = new PurchaseOrder({
      id: Date.now().toString(),
      date: new Date(),
      status: 'pending',
      totalAmount: cartTotal
    });

    const orderData = {
      ...purchaseOrder,
      userId: user?.id,
      userEmail: user?.email,
      userName: user?.name,
      address: finalAddress,
      phone: user?.phoneNumbers?.[0] || user?.phone || 'غير متوفر',
      items: cart,
    };

    addOrder(orderData);
    clearCart();
    setIsCheckingOut(false);
    setNewCity('');
    setNewStreet('');
    toast.success('تم إرسال الطلب بنجاح!');
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500 dark:text-gray-400">
        <div className="bg-gray-50 dark:bg-slate-800 p-6 rounded-full mb-6">
          <ShoppingBag className="w-20 h-20 text-gray-300 dark:text-gray-600" />
        </div>
        <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">سلة المشتريات فارغة</h2>
        <p className="mb-8">تصفح منتجاتنا وأضف ما تحتاجه هنا.</p>
        <Link 
          to="/" 
          className="bg-gradient-to-r from-green-600 to-teal-500 hover:from-green-700 hover:to-teal-600 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          تصفح المنتجات
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-3 border-b border-gray-100 dark:border-slate-800 pb-4">
        <ShoppingBag className="w-8 h-8 text-teal-600 dark:text-teal-500" />
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">سلة المشتريات</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-5">
          {cart.map((item) => (
            <div key={item.id} className="group flex flex-col sm:flex-row items-center bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-slate-800 gap-5">
              <div className="relative w-28 h-28 flex-shrink-0">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover rounded-xl bg-gray-50 dark:bg-slate-800"
                />
              </div>
              <div className="flex-grow text-center sm:text-start">
                <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-1">{item.name}</h3>
                <span className="text-teal-600 dark:text-teal-400 font-bold">{item.price} ج.م</span>
              </div>
              
              {/* Quantity Controls */}
              <div className="flex items-center gap-3 bg-gray-50 dark:bg-slate-800 p-2 rounded-xl border border-gray-100 dark:border-slate-700">
                <button 
                  onClick={() => updateQuantity(item.id, 1)}
                  className="p-1.5 hover:bg-white dark:hover:bg-slate-700 rounded-lg text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:shadow-sm transition-all"
                  aria-label="Increase Quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <span className="w-6 text-center font-bold text-gray-800 dark:text-white">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, -1)}
                  className="p-1.5 hover:bg-white dark:hover:bg-slate-700 rounded-lg text-gray-600 dark:text-gray-300 hover:text-red-500 hover:shadow-sm transition-all"
                  aria-label="Decrease Quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
              </div>

              {/* Total per item & Delete */}
              <div className="flex items-center gap-4 min-w-[140px] justify-end">
                <div className="flex flex-col text-start">
                  <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">الإجمالي</span>
                  <span className="font-black text-gray-800 dark:text-white">{item.price * item.quantity} ج.م</span>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-colors"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary & Checkout Form */}
        <div className="lg:sticky lg:top-24 h-fit">
          <div className="bg-white dark:bg-slate-900 p-7 rounded-3xl shadow-lg shadow-gray-100/50 dark:shadow-none border border-gray-100 dark:border-slate-800 space-y-6">
            
            <div className="border-b border-gray-100 dark:border-slate-800 pb-5 flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-900 dark:text-white">الإجمالي</span>
                <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-500">
                  {cartTotal} <span className="text-lg">ج.م</span>
                </span>
              </div>
            </div>

            {!isCheckingOut ? (
              <button 
                onClick={handleCheckoutClick}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-teal-500 hover:from-green-700 hover:to-teal-600 text-white px-6 py-4 rounded-xl font-bold transition-all shadow-md hover:shadow-lg transform active:scale-95 mt-6"
              >
                <CreditCard className="w-5 h-5" />
                <span>إتمام الطلب</span>
              </button>
            ) : (
              <form onSubmit={submitOrder} className="space-y-4 animate-in slide-in-from-top-4 duration-300">
                <h3 className="font-bold text-gray-800 dark:text-white border-b border-gray-100 dark:border-slate-800 pb-2">بيانات التوصيل</h3>
                
                <AddressSelector 
                  user={user}
                  addressMode={addressMode}
                  setAddressMode={setAddressMode}
                  newCity={newCity}
                  setNewCity={setNewCity}
                  newStreet={newStreet}
                  setNewStreet={setNewStreet}
                />

                <div className="pt-2 flex gap-3">
                  <button 
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-green-600 to-teal-500 hover:from-green-700 hover:to-teal-600 text-white px-4 py-3 rounded-xl font-bold transition-all shadow-md transform active:scale-95"
                  >
                    تأكيد الطلب
                  </button>
                  <button 
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-gray-300 px-4 py-3 rounded-xl font-bold transition-all"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
