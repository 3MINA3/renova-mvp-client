import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Register from './pages/Register';
import SellScrap from './pages/SellScrap';
import Contact from './pages/Contact';
import MyOrders from './pages/MyOrders';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import RequestsManager from './pages/admin/RequestsManager';
import OrdersManager from './pages/admin/OrdersManager';
import ProductsManager from './pages/admin/ProductsManager';
import UsersManager from './pages/admin/UsersManager';
import SettingsManager from './pages/admin/SettingsManager';
import Footer from './components/Footer';
import FloatingActionButton from './components/FloatingActionButton';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className={`min-h-screen flex flex-col font-cairo ${isAdminRoute ? '' : 'bg-gray-50 dark:bg-slate-950 transition-colors duration-300'}`} dir="rtl">
      {/* Hide Navbar and Footer on Admin Routes */}
      {!isAdminRoute && <Navbar />}
      
      <main className={isAdminRoute ? '' : 'flex-grow container mx-auto px-4 py-8'}>
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/sell-scrap" element={<SellScrap />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/my-orders" element={<MyOrders />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<UsersManager />} />
            <Route path="requests" element={<RequestsManager />} />
            <Route path="orders" element={<OrdersManager />} />
            <Route path="products" element={<ProductsManager />} />
            <Route path="settings" element={<SettingsManager />} />
          </Route>
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}
      <FloatingActionButton />
    </div>
  );
}

export default App;
