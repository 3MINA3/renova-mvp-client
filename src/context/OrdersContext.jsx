import React, { createContext, useContext, useState, useEffect } from 'react';

const OrdersContext = createContext();

export const useOrders = () => useContext(OrdersContext);

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('purchase_orders');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to parse purchase_orders from local storage', e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('purchase_orders', JSON.stringify(orders));
    } catch (e) {
      console.error('Storage full:', e);
      if (e.name === 'QuotaExceededError' || e.message.includes('quota')) {
        alert('حدث خطأ: مساحة التخزين ممتلئة! لا يمكن حفظ المزيد من الطلبات.');
      }
    }
  }, [orders]);

  const addOrder = (orderData) => {
    const newOrder = orderData.id ? { ...orderData } : {
      id: Date.now(),
      ...orderData,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    if (!newOrder.createdAt && !newOrder.date) {
        newOrder.createdAt = new Date().toISOString();
    }
    setOrders([newOrder, ...orders]);
  };

  const updateOrderStatus = (id, newStatus) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status: newStatus } : order
    ));
  };

  return (
    <OrdersContext.Provider value={{ orders, addOrder, updateOrderStatus }}>
      {children}
    </OrdersContext.Provider>
  );
};
