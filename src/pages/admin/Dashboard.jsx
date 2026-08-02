import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useProducts } from '../../context/ProductContext';
import { useRequests } from '../../context/RequestsContext';
import { useOrders } from '../../context/OrdersContext';
import { Users, Package, Inbox, ShoppingCart, Activity, TrendingUp, DollarSign } from 'lucide-react';

const Dashboard = () => {
  const { registeredUsers } = useAuth();
  const { products } = useProducts();
  const { requests } = useRequests();
  const { orders } = useOrders();
  
  // Calculate total revenue from delivered orders
  const totalRevenue = orders
    .filter(o => ['delivered', 'completed'].includes(o.status))
    .reduce((sum, order) => sum + (parseFloat(order.totalAmount || order.total) || 0), 0);

  // Overview Stats
  const overviewStats = [
    { 
      title: 'إجمالي العملاء', 
      value: registeredUsers.length, 
      icon: <Users className="w-8 h-8 text-blue-500" />,
      bg: "bg-blue-50 dark:bg-blue-900/30",
      trend: "+12%"
    },
    { 
      title: 'المنتجات المعروضة', 
      value: products.length, 
      icon: <Package className="w-8 h-8 text-emerald-500" />,
      bg: "bg-emerald-50 dark:bg-emerald-900/30",
      trend: "+5%"
    },
    { 
      title: 'إجمالي المبيعات', 
      value: `${totalRevenue.toLocaleString()} ج.م`, 
      icon: <DollarSign className="w-8 h-8 text-teal-500" />,
      bg: "bg-teal-50 dark:bg-teal-900/30",
      trend: "+18%"
    },
    { 
      title: 'إجمالي العمليات', 
      value: requests.length + orders.length, 
      icon: <Activity className="w-8 h-8 text-purple-500" />,
      bg: "bg-purple-50 dark:bg-purple-900/30",
      trend: "+24%"
    }
  ];

  const orderStats = [
    { id: 'pending', label: 'قيد الانتظار', count: orders.filter(o => o.status === 'pending').length, color: 'bg-orange-500 text-orange-500', bar: 'bg-orange-100 dark:bg-orange-900/30' },
    { id: 'processing', label: 'جاري التجهيز', count: orders.filter(o => o.status === 'processing').length, color: 'bg-blue-500 text-blue-500', bar: 'bg-blue-100 dark:bg-blue-900/30' },
    { id: 'shipped', label: 'تم الشحن', count: orders.filter(o => o.status === 'shipped').length, color: 'bg-purple-500 text-purple-500', bar: 'bg-purple-100 dark:bg-purple-900/30' },
    { id: 'delivered', label: 'تم التوصيل', count: orders.filter(o => ['delivered', 'completed'].includes(o.status)).length, color: 'bg-green-500 text-green-500', bar: 'bg-green-100 dark:bg-green-900/30' },
    { id: 'rejected', label: 'مرفوض', count: orders.filter(o => ['rejected', 'failed'].includes(o.status)).length, color: 'bg-red-500 text-red-500', bar: 'bg-red-100 dark:bg-red-900/30' },
  ];

  const requestStats = [
    { id: 'new', label: 'جديد', count: requests.filter(r => ['new', 'pending'].includes(r.status)).length, color: 'bg-orange-500 text-orange-500', bar: 'bg-orange-100 dark:bg-orange-900/30' },
    { id: 'contacted', label: 'تم التواصل', count: requests.filter(r => r.status === 'contacted').length, color: 'bg-indigo-500 text-indigo-500', bar: 'bg-indigo-100 dark:bg-indigo-900/30' },
    { id: 'negotiating', label: 'جاري التفاوض', count: requests.filter(r => r.status === 'negotiating').length, color: 'bg-yellow-500 text-yellow-500', bar: 'bg-yellow-100 dark:bg-yellow-900/30' },
    { id: 'accepted', label: 'مقبول', count: requests.filter(r => r.status === 'accepted').length, color: 'bg-teal-500 text-teal-500', bar: 'bg-teal-100 dark:bg-teal-900/30' },
    { id: 'completed', label: 'مكتمل', count: requests.filter(r => ['completed', 'approved'].includes(r.status)).length, color: 'bg-green-500 text-green-500', bar: 'bg-green-100 dark:bg-green-900/30' },
    { id: 'rejected', label: 'مرفوض', count: requests.filter(r => ['rejected', 'failed'].includes(r.status)).length, color: 'bg-red-500 text-red-500', bar: 'bg-red-100 dark:bg-red-900/30' },
  ];

  const StatProgress = ({ item, total }) => {
    const percentage = total === 0 ? 0 : Math.round((item.count / total) * 100);
    return (
      <div className="flex items-center justify-between mb-4 last:mb-0 group">
        <div className="flex items-center gap-3 w-1/3">
          <div className={`w-3 h-3 rounded-full ${item.color.split(' ')[0]}`}></div>
          <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{item.label}</span>
        </div>
        <div className="flex-1 mx-4 h-2.5 rounded-full overflow-hidden bg-gray-100 dark:bg-slate-800 relative">
          <div 
            className={`absolute top-0 right-0 h-full rounded-full ${item.color.split(' ')[0]} transition-all duration-1000 ease-out`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <div className="w-16 text-left flex items-center justify-end gap-2">
          <span className="text-sm font-bold text-gray-900 dark:text-white">{item.count}</span>
          <span className="text-xs text-gray-400">({percentage}%)</span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">{'الرئيسية والإحصائيات'}</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">{'نظرة عامة على نشاط المنصة وحالة الطلبات.'}</p>
        </div>
      </div>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 hover:shadow-md transition-shadow flex items-center gap-5">
            <div className={`w-16 h-16 rounded-2xl flex flex-shrink-0 items-center justify-center ${stat.bg}`}>
              {stat.icon}
            </div>
            <div>
              <h3 className="text-gray-500 dark:text-gray-400 text-xs font-bold mb-1">{stat.title}</h3>
              <p className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Orders Breakdown */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 flex items-center justify-center">
                <ShoppingCart className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-gray-900 dark:text-white">طلبات الشراء</h2>
                <p className="text-xs text-gray-500 mt-1">تفصيل حالات المبيعات المتجر</p>
              </div>
            </div>
            <div className="text-center">
              <span className="block text-2xl font-black text-indigo-600">{orders.length}</span>
              <span className="text-xs font-bold text-gray-400">إجمالي الطلبات</span>
            </div>
          </div>
          
          <div className="space-y-2 mt-6">
            {orderStats.map((item, idx) => (
              <StatProgress key={idx} item={item} total={orders.length} />
            ))}
          </div>
        </div>

        {/* Requests Breakdown */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center">
                <Inbox className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-gray-900 dark:text-white">طلبات بيع الخردة</h2>
                <p className="text-xs text-gray-500 mt-1">تفصيل حالات استلام الخردة</p>
              </div>
            </div>
            <div className="text-center">
              <span className="block text-2xl font-black text-emerald-600">{requests.length}</span>
              <span className="text-xs font-bold text-gray-400">إجمالي الطلبات</span>
            </div>
          </div>
          
          <div className="space-y-2 mt-6">
            {requestStats.map((item, idx) => (
              <StatProgress key={idx} item={item} total={requests.length} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
