import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Download,
  Printer,
  Eye,
  RefreshCw,
  SlidersHorizontal,
  BarChart3, 
  Box, 
  ChevronDown, 
  ChevronLeft,
  ChevronRight, 
  CreditCard, 
  Users, 
  Package as PackageIcon, 
  ShoppingCart, 
  TrendingUp, 
  Truck, 
  Settings, 
  LogOut, 
  Copy,
  Minus,
  Search, 
  Bell, 
  Plus, 
  Check,
  X,
  Edit,
  Filter, 
  MoreVertical,
  LayoutDashboard,
  Store,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  History,
  ShieldCheck,
  User as UserIcon,
  ShoppingBag,
  Globe,
  Tag,
  Image as ImageIcon,
  Truck as ShipIcon,
  FileText,
  Trash2,
  CreditCard as FinanceIcon,
  Smartphone,
  LifeBuoy,
  MessageSquare,
  PhoneCall,
  Mail,
  Headphones,
  Send,
  HelpCircle,
  Shirt,
  Watch,
  Zap,
  ArrowLeft
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { cn } from "./lib/utils";
import { View, Product, Transaction, Stakeholder, Domain, Category, PaymentMethod, User, Package, PaymentRequest } from "./types";
import { 
  AdminSidebar, 
  AdminDashboardView, 
  AdminUserManagementView, 
  AdminPackageManagementView, 
  AdminPaymentVerificationView, 
  AdminEcommerceControlView, 
  AdminProductMonitoringView, 
  AdminOrderControlView, 
  AdminSupportManagementView, 
  AdminSettingsView, 
  AdminSecurityLogsView, 
  AdminNotificationSystemView,
  MOCK_USERS,
  MOCK_PACKAGES,
  MOCK_PAYMENTS
} from "./adminComponents";

// --- Mock Data ---
const MOCK_SALES_DATA = [
  { name: 'Mon', sales: 4000, purchase: 2400 },
  { name: 'Tue', sales: 3000, purchase: 1398 },
  { name: 'Wed', sales: 2000, purchase: 9800 },
  { name: 'Thu', sales: 2780, purchase: 3908 },
  { name: 'Fri', sales: 1890, purchase: 4800 },
  { name: 'Sat', sales: 2390, purchase: 3800 },
  { name: 'Sun', sales: 3490, purchase: 4300 },
];

const MOCK_PROFIT_LOSS = [
  { name: 'Expenses', value: 400, color: '#EF4444' },
  { name: 'Profit', value: 300, color: '#10B981' },
  { name: 'Reinvest', value: 300, color: '#3B82F6' },
];

const MOCK_PRODUCTS: Product[] = [
  { 
    id: "1", 
    name: "3.5L Cold Water and Juice Dispenser with Push Tap (China) 1514 mr", 
    productCode: "1514 mr", 
    category: "Appliances", 
    purchasePrice: 300, 
    salePrice: 420, 
    regularPrice: 550,
    stock: 100, 
    discount: 0,
    image: "https://images.unsplash.com/photo-1627483262769-04d0a140148a?w=100&auto=format&fit=crop&q=60" 
  },
  { 
    id: "2", 
    name: "CLEAN 8018 Sweepin Robot mr1213", 
    productCode: "mr1213", 
    category: "Home Gear", 
    purchasePrice: 670, 
    salePrice: 850, 
    regularPrice: 990,
    stock: 20, 
    discount: 0,
    image: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=100&auto=format&fit=crop&q=60" 
  },
  { 
    id: "3", 
    name: "Insulated 304 Stainless Steel Smart Temperature Display Touch Water Cup", 
    productCode: "MR 1212", 
    category: "Kitchen", 
    purchasePrice: 310, 
    salePrice: 390, 
    regularPrice: 450,
    stock: 500, 
    discount: 0,
    image: "https://images.unsplash.com/photo-1574340537443-4f9e1616c802?w=100&auto=format&fit=crop&q=60" 
  },
  { 
    id: "4", 
    name: "সুনদরবনের প্রাকৃতীক চাকের মধু / P1197 as", 
    productCode: "P1197 as", 
    category: "Food", 
    purchasePrice: 640, 
    salePrice: 820, 
    regularPrice: 950,
    stock: 20, 
    discount: 0,
    image: "https://images.unsplash.com/photo-1559181567-c3190cb9959b?w=100&auto=format&fit=crop&q=60" 
  },
  { 
    id: "5", 
    name: "Plug in Quran V2 (114 Surah) / 1375MR", 
    productCode: "1375MR", 
    category: "Electronics", 
    purchasePrice: 630, 
    salePrice: 780, 
    regularPrice: 850,
    stock: 18, 
    discount: 0,
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=100&auto=format&fit=crop&q=60" 
  },
];

const MOCK_CUSTOMERS: Stakeholder[] = [
  { id: "4189", type: "customer", name: "MD SAZZAD", email: "mdsazzadhossinsh@gmail.com", phone: "01409032641", totalTransactions: 12, balance: 0, note: "", address: "Dhaka", joinDate: "2025-10-12", gender: "unknown", previousDue: 0, totalDeposits: 0 },
  { id: "4190", type: "customer", name: "Sayed Golam Sorowar", email: "syedgshifat1988@gmail.com", phone: "01770370567", totalTransactions: 8, balance: 0, note: "", address: "Dhaka", joinDate: "2025-10-31", gender: "male", previousDue: 0, totalDeposits: 0 },
  { id: "4191", type: "customer", name: "kiuam uddin", email: "Mmkiuam@gmail.com", phone: "01829058819", totalTransactions: 24, balance: 0, note: "", address: "Chittagong", joinDate: "2025-11-05", gender: "male", previousDue: 0, totalDeposits: 0 },
  { id: "4192", type: "customer", name: "জাসন", email: "", phone: "01976494862", totalTransactions: 5, balance: 0, note: "", address: "Dhaka", joinDate: "2025-11-11", gender: "unknown", previousDue: 0, totalDeposits: 0 },
  { id: "4193", type: "customer", name: "hbcjcv", email: "hgjhkb@gmail.com", phone: "01756815233", totalTransactions: 1, balance: 0, note: "", address: "Sylhet", joinDate: "2025-12-07", gender: "unknown", previousDue: 0, totalDeposits: 0 },
  { id: "4194", type: "customer", name: "fgvsege", email: "", phone: "sdgsdg", totalTransactions: 0, balance: 0, note: "", address: "Rajshahi", joinDate: "2025-12-08", gender: "unknown", previousDue: 0, totalDeposits: 0 },
  { id: "4195", type: "customer", name: "bsdfbdf", email: "bdfbdsffbd@hgdshgdf.cvbnc", phone: "bdbfdfb", totalTransactions: 0, balance: 0, note: "", address: "Khulna", joinDate: "2025-12-08", gender: "unknown", previousDue: 0, totalDeposits: 0 },
  { id: "4196", type: "customer", name: "Mamun", email: "almamun32250@gmail.com", phone: "01648832250", totalTransactions: 3, balance: 0, note: "", address: "Dhaka", joinDate: "2025-12-29", gender: "male", previousDue: 0, totalDeposits: 0 },
  { id: "4197", type: "customer", name: "h", email: "", phone: "0177753213", totalTransactions: 0, balance: 0, note: "", address: "Comilla", joinDate: "2026-01-07", gender: "unknown", previousDue: 0, totalDeposits: 0 },
];

// --- Utilities ---
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    minimumFractionDigits: 0,
  }).format(amount).replace("BDT", "৳");
};

// --- Components ---

const Sidebar = ({ activeView, setView, isOpen, onClose, onLogout, trialDaysLeft }: { activeView: View, setView: (v: View) => void, isOpen?: boolean, onClose?: () => void, onLogout?: () => void, trialDaysLeft?: number }) => {
  const sections = [
    {
      title: "Favorites",
      items: [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
        { id: "ecommerce", label: "Ecommerce", icon: Store },
      ]
    },
    {
      title: "Main Operations",
      items: [
        { id: "sales", label: "Sales", icon: CreditCard },
        { id: "product", label: "Product", icon: PackageIcon },
        { id: "category", label: "Category", icon: Filter },
      ]
    },
    {
      title: "Stakeholders",
      items: [
        { id: "customer-history", label: "Customer History", icon: History },
        { id: "supplier", label: "Supplier", icon: Users },
      ]
    },
    {
      title: "Settings & Profile",
      items: [
        { id: "profile", label: "Profile", icon: UserIcon },
        { id: "payment-method", label: "Payment Method", icon: FinanceIcon },
        { id: "website-settings", label: "Website Settings", icon: Settings },
      ]
    },
    {
      title: "Support & Help",
      items: [
        { id: "support", label: "Support System", icon: LifeBuoy },
      ]
    }
  ];

  const sidebarContent = (
    <>
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center shadow-lg shadow-brand-600/20">
            <TrendingUp className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-black text-white tracking-tighter">BexoBuilder</span>
        </div>
        {onClose && (
          <button onClick={onClose} className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors">
            <MoreVertical className="w-5 h-5 rotate-90" />
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-8 scrollbar-hide">
        {sections.map((section) => (
          <div key={section.title}>
            <h3 className="px-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 opacity-50">
              {section.title}
            </h3>
            <ul className="space-y-1.5">
              {section.items.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setView(item.id as View);
                      if (onClose) onClose();
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 group",
                      activeView === item.id 
                        ? "bg-brand-600 text-white shadow-xl shadow-brand-600/30 ring-1 ring-white/10" 
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <item.icon className={cn("w-4 h-4 transition-transform group-hover:scale-110", activeView === item.id ? "text-white" : "text-slate-500")} />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-white/5 bg-brand-950/50 backdrop-blur-md space-y-4">
        {trialDaysLeft !== undefined && (
          <div className="px-4 py-3 bg-white/5 rounded-2xl border border-white/10">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[9px] font-black text-brand-400 uppercase tracking-widest">Free Trial</span>
              <span className="text-[9px] font-black text-white uppercase tracking-widest">{trialDaysLeft} Days left</span>
            </div>
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-brand-500 transition-all duration-1000" 
                style={{ width: `${(trialDaysLeft / 7) * 100}%` }}
              />
            </div>
          </div>
        )}
        <button 
          onClick={() => {
            setView('packages');
            if (onClose) onClose();
          }}
          className={cn(
            "flex items-center gap-3 px-4 py-4 w-full text-[10px] font-black uppercase tracking-[0.2em] transition-all group rounded-xl",
            activeView === 'packages' ? "bg-brand-600 text-white" : "text-slate-500 hover:text-white hover:bg-white/5"
          )}
        >
          <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center transition-colors", activeView === 'packages' ? "bg-white/20" : "bg-white/5 group-hover:bg-brand-600/20")}>
            <ShieldCheck className="w-4 h-4" />
          </div>
          প্যাকেজ (Packages)
        </button>
        <button 
          onClick={onLogout}
          className="flex items-center gap-3 px-4 py-4 w-full text-[10px] font-black text-slate-500 hover:text-rose-500 uppercase tracking-[0.2em] transition-all group"
        >
          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-rose-500/10 transition-colors">
            <LogOut className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          </div>
          Sign Out Portal
        </button>
      </div>
    </>
  );

  return (
    <>
      <aside className="hidden lg:flex w-64 bg-brand-950 text-slate-300 h-screen sticky top-0 flex-col border-r border-white/5 shrink-0">
        {sidebarContent}
      </aside>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="lg:hidden fixed inset-0 bg-brand-950/80 backdrop-blur-md z-[150]"
            />
            <motion.aside 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="lg:hidden fixed inset-y-0 left-0 w-[280px] bg-brand-950 text-slate-300 z-[200] flex flex-col shadow-2xl border-r border-white/5"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

const Topbar = ({ userEmail, onMenuOpen, trialDaysLeft }: { userEmail: string, onMenuOpen: () => void, trialDaysLeft: number }) => {
  return (
    <header className="h-16 md:h-20 bg-brand-600 px-4 md:px-8 flex items-center justify-between sticky top-0 z-[100] shadow-xl shadow-brand-600/10">
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={onMenuOpen}
          className="lg:hidden p-3 bg-white/10 border border-white/20 rounded-2xl text-white active:scale-90 transition-all hover:bg-white/20"
        >
          <div className="w-5 h-4 flex flex-col justify-between">
            <div className="h-0.5 w-full bg-current rounded-full" />
            <div className="h-0.5 w-full bg-current rounded-full" />
            <div className="h-0.5 w-full bg-current rounded-full" />
          </div>
        </button>
        
        <div className="hidden lg:flex items-center gap-3 px-5 py-2 bg-white/10 rounded-full border border-white/10 backdrop-blur-md">
           <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
           <p className="text-[10px] font-black text-white uppercase tracking-widest">{trialDaysLeft} Days Remaining in Free Trial</p>
        </div>

        <div className="hidden sm:flex items-center gap-4 bg-white/10 border border-white/10 px-5 py-2.5 rounded-2xl w-full max-w-sm transition-all focus-within:bg-white/20">
          <Search className="w-4 h-4 text-white/60 shrink-0" />
          <input 
            type="text" 
            placeholder="SEARCH ECOSYSTEM..." 
            className="bg-transparent border-none outline-none text-xs font-bold w-full text-white placeholder:text-white/40 uppercase tracking-widest"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        <div className="flex items-center gap-2 md:gap-4">
          <button className="relative p-2.5 text-white/80 hover:text-white transition-all hidden sm:flex bg-white/10 rounded-xl border border-white/10">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-3.5 h-3.5 bg-rose-500 text-white text-[8px] font-black rounded-full flex items-center justify-center border-2 border-brand-600">
              3
            </span>
          </button>
        </div>
        <div className="h-8 w-[1px] bg-white/10 hidden md:block" />
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] font-black text-white uppercase tracking-tighter">Root System</p>
            <p className="text-[8px] font-bold text-white/60">{userEmail}</p>
          </div>
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-white flex items-center justify-center text-brand-600 ring-4 ring-white/10 shadow-xl group cursor-pointer overflow-hidden transform hover:scale-105 transition-all">
            <UserIcon className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
          </div>
        </div>
      </div>
    </header>
  );
};

const MobileNav = ({ activeView, setView }: { activeView: View, setView: (v: View) => void }) => {
  const items = [
    { id: "dashboard", label: "Home", icon: LayoutDashboard },
    { id: "sales", label: "Sales", icon: CreditCard },
    { id: "product", label: "Inventory", icon: PackageIcon },
    { id: "ecommerce", label: "App", icon: Store },
    { id: "profile", label: "Profile", icon: UserIcon },
  ];

  return (
    <nav className="lg:hidden fixed bottom-6 left-6 right-6 z-[100] bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-2 flex items-center justify-around">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => setView(item.id as View)}
          className={cn(
            "flex flex-col items-center gap-1 p-3 rounded-2xl transition-all duration-300 relative",
            activeView === item.id 
              ? "text-brand-600 bg-brand-50" 
              : "text-slate-400 hover:text-brand-600 hover:bg-slate-50"
          )}
        >
          <item.icon className="w-5 h-5" />
          <span className="text-[8px] font-black uppercase tracking-widest">{item.label}</span>
          {activeView === item.id && (
            <motion.div 
              layoutId="nav-dot"
              className="absolute -top-1 w-1 h-1 bg-brand-600 rounded-full"
            />
          )}
        </button>
      ))}
    </nav>
  );
}

const KPICard = ({ label, value, trend, trendValue, icon: Icon, color }: any) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <div className={cn("p-3 rounded-2xl", color)}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className={cn(
        "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full",
        trend === 'up' ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
      )}>
        {trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
        {trendValue}%
      </div>
    </div>
    <h3 className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">{label}</h3>
    <p className="text-2xl font-black text-slate-900">{value}</p>
  </div>
);

const DashboardView = () => (
  <div className="animate-in fade-in duration-500">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
      <div>
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">System Overview</h2>
        <p className="text-sm md:text-base text-slate-500 font-medium">Welcome back, manager!</p>
      </div>
      <button className="bg-brand-600 text-white px-5 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-brand-700 transition-all shadow-lg shadow-blue-600/20 active:scale-95">
        <Plus className="w-4 h-4" /> New Transaction
      </button>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
      <KPICard label="Today's Sales" value={formatCurrency(125400)} trend="up" trendValue={12} icon={CreditCard} color="bg-brand-600" />
      <KPICard label="Active Products" value="1,248" trend="up" trendValue={5} icon={PackageIcon} color="bg-brand-950" />
      <KPICard label="Total Orders" value="842" trend="up" trendValue={24} icon={ShoppingBag} color="bg-indigo-600" />
      <KPICard label="Total Profit" value={formatCurrency(84100)} trend="up" trendValue={8} icon={BarChart3} color="bg-emerald-600" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 md:gap-8">
      <div className="space-y-6 md:space-y-8">
        <div className="bg-white p-5 md:p-8 rounded-[32px] border border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Sales & Purchase Trends</h3>
            <div className="flex gap-2">
              <button className="flex-1 sm:flex-none px-4 py-1.5 bg-slate-100 rounded-lg text-xs font-bold text-slate-600">Weekly</button>
              <button className="flex-1 sm:flex-none px-4 py-1.5 border border-slate-200 rounded-lg text-xs font-bold text-slate-400">Monthly</button>
            </div>
          </div>
          <div className="h-[280px] md:h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_SALES_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 10, fontWeight: 600}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 10, fontWeight: 600}} tickFormatter={(v) => `৳${v/1000}k`} />
                <Tooltip 
                  cursor={{fill: '#F8FAFC'}}
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="sales" fill="#2563EB" radius={[4, 4, 0, 0]} barSize={16} />
                <Bar dataKey="purchase" fill="#0F172A" radius={[4, 4, 0, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-5 md:p-8 rounded-[32px] border border-slate-200">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Top Customers</h3>
            <button className="text-brand-600 font-bold text-sm hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {MOCK_CUSTOMERS.map((cust) => (
              <div key={cust.id} className="flex items-center justify-between p-3 md:p-4 hover:bg-slate-50 rounded-2xl transition-colors border border-transparent hover:border-slate-100">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-100 rounded-xl flex items-center justify-center font-bold text-slate-600 text-sm">
                    {cust.name.split(' ').map(n=>n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm md:text-base">{cust.name}</p>
                    <p className="text-[10px] font-medium text-slate-500 truncate max-w-[120px] sm:max-w-none">{cust.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900 text-xs md:text-sm">{cust.totalTransactions} Orders</p>
                  <p className={cn("text-[10px] md:text-xs font-bold", cust.balance >= 0 ? "text-emerald-600" : "text-rose-600")}>
                    {formatCurrency(Math.abs(cust.balance))}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6 md:space-y-8">
        <div className="bg-white p-5 md:p-8 rounded-[32px] border border-slate-200 lg:sticky lg:top-24">
          <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-8">Financial Health</h3>
          <div className="h-[200px] md:h-[250px] mb-8">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={MOCK_PROFIT_LOSS}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {MOCK_PROFIT_LOSS.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3">
            {MOCK_PROFIT_LOSS.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{backgroundColor: item.color}}></div>
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">{item.name}</span>
                </div>
                <span className="text-xs font-black text-slate-900">{item.value}%</span>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-8 border-t border-slate-100">
             <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-2xl">
               <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
               <p className="text-[10px] font-bold text-emerald-800 leading-tight">
                 Healthy growth phase: 12% increase since last audit.
               </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const InventoryView = ({ products, setProducts, categories }: { products: Product[], setProducts: React.Dispatch<React.SetStateAction<Product[]>>, categories: Category[] }) => {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  
  // Form State
  const [newProduct, setNewProduct] = useState({
    name: "",
    purchasePrice: "",
    salePrice: "",
    regularPrice: "",
    stock: "",
    discount: "",
    category: "",
    sku: "",
    description: "",
    unitType: "Pcs (পিস)",
    image: "",
    images: [] as string[]
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setNewProduct(prev => {
            const newImages = [...prev.images, reader.result as string].slice(0, 12);
            return { 
              ...prev, 
              images: newImages,
              image: prev.image || (reader.result as string)
            };
          });
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const [variants, setVariants] = useState([
    { id: "1", name: "Size", isMandatory: true, options: ["M", "L", "XL"] }
  ]);

  const addVariant = () => {
    setVariants([...variants, { id: Math.random().toString(), name: "", isMandatory: false, options: [""] }]);
  };

  const removeVariant = (id: string) => {
    setVariants(variants.filter(v => v.id !== id));
  };

  const updateVariantName = (id: string, name: string) => {
    setVariants(variants.map(v => v.id === id ? { ...v, name } : v));
  };

  const toggleMandatory = (id: string) => {
    setVariants(variants.map(v => v.id === id ? { ...v, isMandatory: !v.isMandatory } : v));
  };

  const addOption = (variantId: string) => {
    setVariants(variants.map(v => v.id === variantId ? { ...v, options: [...v.options, ""] } : v));
  };

  const updateOption = (variantId: string, optIndex: number, value: string) => {
    setVariants(variants.map(v => {
      if (v.id === variantId) {
        const newOptions = [...v.options];
        newOptions[optIndex] = value;
        return { ...v, options: newOptions };
      }
      return v;
    }));
  };

  const removeOption = (variantId: string, optIndex: number) => {
    setVariants(variants.map(v => {
      if (v.id === variantId) {
        const newOptions = v.options.filter((_, i) => i !== optIndex);
        return { ...v, options: newOptions };
      }
      return v;
    }));
  };

  const handleSaveProduct = () => {
    if (!newProduct.name || !newProduct.sku) return;

    const product: Product = {
      id: Math.random().toString(),
      name: newProduct.name,
      productCode: newProduct.sku,
      category: newProduct.category || "General",
      purchasePrice: parseFloat(newProduct.purchasePrice) || 0,
      salePrice: parseFloat(newProduct.salePrice) || 0,
      regularPrice: parseFloat(newProduct.regularPrice) || parseFloat(newProduct.salePrice) || 0,
      stock: parseInt(newProduct.stock) || 0,
      discount: parseFloat(newProduct.discount) || 0,
      image: newProduct.image || (newProduct.images[0] || ""),
      images: newProduct.images,
      variants: variants.filter(v => v.name && v.options.some(opt => opt.trim() !== ""))
    };

    setProducts([product, ...products]);
    setIsAddingProduct(false);
    // Reset form
    setNewProduct({
      name: "",
      purchasePrice: "",
      salePrice: "",
      regularPrice: "",
      stock: "",
      discount: "",
      category: "",
      sku: "",
      description: "",
      unitType: "Pcs (পিস)",
      image: "",
      images: []
    });
    setVariants([
      { id: "1", name: "Size", isMandatory: true, options: ["M", "L", "XL"] }
    ]);
  };

  if (isAddingProduct) {
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => setIsAddingProduct(false)}
            className="flex items-center gap-2 text-slate-400 hover:text-brand-600 transition-colors font-black uppercase tracking-widest text-[10px]"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to List
          </button>
          <h2 className="text-xl font-black text-slate-900 uppercase tracking-tighter">ক্রিয়েট নিউ প্রোডাক্ট (CREATE NEW PRODUCT)</h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left Column: Image Upload & Barcode */}
          <div className="w-full lg:w-[350px] space-y-6">
            <div className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 text-center">ছবি আপলোড করুন (UPLOAD IMAGES)</p>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*"
                multiple
                onChange={handleImageUpload}
              />
              <div className="grid grid-cols-3 gap-3">
                {[...Array(12)].map((_, i) => {
                  const img = newProduct.images[i];
                  return (
                    <div 
                      key={i}
                      onClick={() => !img && fileInputRef.current?.click()}
                      className={cn(
                        "aspect-square rounded-2xl flex items-center justify-center transition-all cursor-pointer group overflow-hidden border-2",
                        img 
                          ? "bg-white border-slate-100" 
                          : "bg-slate-50 border-dashed border-slate-200 hover:border-brand-400 hover:bg-brand-50"
                      )}
                    >
                      {img ? (
                        <div className="relative w-full h-full group/img">
                           <img src={img} alt={`Preview ${i}`} className="w-full h-full object-cover" />
                           <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const updated = newProduct.images.filter((_, idx) => idx !== i);
                                  setNewProduct({
                                    ...newProduct, 
                                    images: updated, 
                                    image: i === 0 ? (updated[0] || "") : newProduct.image
                                  });
                                }}
                                className="p-1.5 bg-white rounded-full text-rose-500 shadow-xl hover:scale-110 active:scale-90 transition-all"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                           </div>
                           {i === 0 && (
                             <div className="absolute top-1.5 left-1.5 bg-[#f95707] text-white text-[7px] font-black uppercase px-2 py-0.5 rounded-full shadow-sm">Main</div>
                           )}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-1">
                          <ImageIcon className="w-5 h-5 text-slate-200 group-hover:text-brand-400 transition-colors" />
                          <span className="text-[7px] font-black text-slate-300 group-hover:text-brand-400 uppercase tracking-tighter">
                            {i === 0 ? "Main" : `Slot ${i + 1}`}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="mt-8 p-6 bg-slate-50 rounded-[24px] border border-slate-100 flex flex-col items-center justify-center gap-3">
                <div className="flex gap-1">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className={cn("w-1 h-12 bg-slate-800 rounded-full", i % 3 === 0 ? "w-2" : "w-0.5")} />
                  ))}
                </div>
                <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest opacity-40">{newProduct.sku || 'SKU-XXXXXX'}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Form Data */}
          <div className="flex-1 space-y-6">
            <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
              <div className="flex border-b border-slate-100 bg-slate-50/50">
                <button className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-brand-600 border-b-2 border-brand-600 bg-white">প্রোডাক্ট তথ্য</button>
              </div>
              
              <div className="p-8 space-y-8">
                {/* Product Name */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">প্রোডাক্টের নাম (PRODUCT NAME)</label>
                    <span className="text-[10px] font-bold text-slate-300">{newProduct.name.length} / 250</span>
                  </div>
                  <input 
                    type="text" 
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    placeholder="প্রোডাক্টের নাম লিখুন..." 
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-xs font-bold text-slate-800 placeholder:text-slate-300 focus:bg-white focus:border-brand-600 transition-all outline-none"
                  />
                </div>

                {/* Variants */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-black text-slate-900 uppercase tracking-widest">প্রোডাক্ট ভেরিয়েন্ট (সাইজ, কালার ইত্যাদি)</label>
                    <button onClick={addVariant} className="text-[10px] font-black text-brand-600 uppercase tracking-widest hover:underline">+ এড ভেরিয়েন্ট</button>
                  </div>
                  
                  {variants.map((v) => (
                    <div key={v.id} className="bg-slate-50 p-6 rounded-[24px] border border-slate-100 space-y-6 relative group">
                      <button onClick={() => removeVariant(v.id)} className="absolute top-4 right-4 text-slate-300 hover:text-rose-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="flex items-center justify-between">
                        <div className="flex-1 max-w-sm">
                          <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-2">ভেরিয়েন্ট নাম (উদা: SIZE, COLOR)</p>
                          <input 
                            type="text" 
                            value={v.name}
                            onChange={(e) => updateVariantName(v.id, e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800" 
                          />
                        </div>
                        <div className="flex items-center gap-3">
                          <div 
                            onClick={() => toggleMandatory(v.id)}
                            className={cn(
                              "w-10 h-5 rounded-full p-1 relative cursor-pointer shadow-inner transition-colors",
                              v.isMandatory ? "bg-brand-600" : "bg-slate-300"
                            )}
                          >
                            <motion.div 
                              animate={{ x: v.isMandatory ? 20 : 0 }}
                              className="w-3 h-3 bg-white rounded-full" 
                            />
                          </div>
                          <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">বাধ্যতামূলক (MANDATORY)</span>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="space-y-2">
                          {v.options.map((opt, optIdx) => (
                            <div key={optIdx} className="flex gap-2">
                              <input 
                                type="text" 
                                value={opt} 
                                onChange={(e) => updateOption(v.id, optIdx, e.target.value)}
                                placeholder={`Option ${optIdx + 1}`}
                                className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800" 
                              />
                              <button 
                                onClick={() => removeOption(v.id, optIdx)}
                                className="w-12 h-10 bg-slate-200 text-slate-400 rounded-xl flex items-center justify-center hover:bg-slate-300 hover:text-rose-500 transition-colors"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                        <button 
                          onClick={() => addOption(v.id)}
                          className="w-full bg-white border-2 border-dashed border-slate-200 p-4 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:border-brand-400 hover:text-brand-600 transition-all font-bold"
                        >
                          + এড অপশন (ADD MORE OPTION) +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Technical Details Area */}
                <div className="space-y-3 pt-6">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">বিস্তারিত তথ্য (টেকনিক্যাল ডিটেইলস)</label>
                  <textarea 
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                    placeholder="প্রোডাক্টের বিস্তারিত স্পেসিফিকেশন..." 
                    className="w-full h-32 bg-slate-50 border border-slate-100 rounded-[24px] p-6 text-xs font-bold text-slate-800 placeholder:text-slate-300 focus:bg-white focus:border-brand-600 transition-all outline-none resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Price & Quantity Section */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch pt-4">
               {/* Quantity Card */}
               <div className="md:col-span-4 bg-[#f95707] rounded-[40px] p-8 text-white flex flex-col justify-between shadow-2xl shadow-orange-600/30">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60">স্টক পরিমাণ (QUANTITY)</p>
                    <p className="text-7xl font-black tracking-tighter leading-none">{newProduct.stock || '0'}</p>
                  </div>
                  <div className="flex justify-between border-t border-white/10 pt-6">
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-40">অবস্থা (STATUS)</p>
                    <p className="text-[10px] font-black uppercase tracking-widest">
                      {parseInt(newProduct.stock) > 0 ? 'ইন স্টক' : 'স্টক নেই'}
                    </p>
                  </div>
               </div>

               {/* Inputs Grid */}
               <div className="md:col-span-8 grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">ক্রয় মূল্য (৳) / PURCHASE PRICE</label>
                    <input 
                      type="number" 
                      value={newProduct.purchasePrice}
                      onChange={(e) => setNewProduct({...newProduct, purchasePrice: e.target.value})}
                      placeholder="ক্রয়মূল্য লিখুন" 
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-xs font-bold text-slate-800 outline-none focus:bg-white focus:border-brand-600 transition-all font-mono" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">বিক্রয় মূল্য (৳) / SELLING PRICE</label>
                    <input 
                      type="number" 
                      value={newProduct.salePrice}
                      onChange={(e) => setNewProduct({...newProduct, salePrice: e.target.value})}
                      placeholder="বিক্রয়মূল্য লিখুন" 
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-xs font-bold text-slate-800 outline-none focus:bg-white focus:border-brand-600 transition-all font-mono" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">পুরানো মূল্য (৳) / REGULAR PRICE</label>
                    <input 
                      type="number" 
                      value={newProduct.regularPrice}
                      onChange={(e) => setNewProduct({...newProduct, regularPrice: e.target.value})}
                      placeholder="পুরানো মূল্য লিখুন" 
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-xs font-bold text-slate-800 outline-none focus:bg-white focus:border-brand-600 transition-all font-mono" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">মজুদ পরিমাণ / TOTAL STOCK</label>
                    <input 
                      type="number" 
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                      placeholder="0" 
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-xs font-bold text-slate-800 outline-none focus:bg-white focus:border-brand-600 transition-all font-mono" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">ইউনিট টাইপ / UNIT TYPE</label>
                    <select 
                      value={newProduct.unitType}
                      onChange={(e) => setNewProduct({...newProduct, unitType: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-xs font-bold text-slate-800 outline-none appearance-none cursor-pointer"
                    >
                       <option>Pcs (পিস)</option>
                       <option>Kg (কেজি)</option>
                       <option>Box (বক্স)</option>
                       <option>Litre (লিটার)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">ডিসকাউন্ট (৳) / DISCOUNT</label>
                    <input 
                      type="number" 
                      value={newProduct.discount}
                      onChange={(e) => setNewProduct({...newProduct, discount: e.target.value})}
                      placeholder="0" 
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-xs font-bold text-slate-800 outline-none focus:bg-white focus:border-brand-600 transition-all font-mono" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">ক্যাটাগরি / CATEGORY</label>
                    <select 
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-xs font-bold text-slate-800 outline-none appearance-none cursor-pointer"
                    >
                       <option value="">সিলেক্ট ক্যাটাগরি</option>
                       {categories.map(cat => (
                         <option key={cat.id} value={cat.name}>{cat.name}</option>
                       ))}
                    </select>
                  </div>
               </div>
            </div>

            {/* SKU Input */}
            <div className="bg-slate-50 p-8 rounded-[32px] border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8 mt-8">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-slate-300 shadow-sm border border-slate-100">
                  <Box className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">SKU / প্রোডাক্ট কোড</p>
                  <p className="text-xs font-black text-slate-900 uppercase tracking-tight">আপনার প্রোডাক্টের জন্য একটি অনন্য কোড দিন</p>
                </div>
              </div>
              <input 
                type="text" 
                value={newProduct.sku}
                onChange={(e) => setNewProduct({...newProduct, sku: e.target.value})}
                placeholder="SKU-XXX" 
                className="bg-white border border-slate-200 rounded-2xl px-8 py-5 text-sm font-black text-slate-900 outline-none focus:border-brand-600 transition-all uppercase tracking-widest w-full md:w-64 text-center placeholder:opacity-20 shadow-sm" 
              />
            </div>

            {/* Save Buttons */}
            <div className="flex gap-4 pt-12">
              <button 
                onClick={handleSaveProduct}
                disabled={!newProduct.name || !newProduct.sku}
                className="flex-1 bg-brand-600 disabled:opacity-50 disabled:grayscale text-white py-6 rounded-[24px] font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-brand-600/30 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
              >
                 সংরক্ষণ ও পাবলিশ করুন (SAVE & PUBLISH PRODUCT)
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500">
      {/* Top Action Bar */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-6 bg-white p-4 rounded-2xl border border-slate-200">
        <div className="flex items-center gap-4 bg-slate-50 border border-slate-100 px-4 py-2.5 rounded-xl w-full lg:max-w-md">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input 
            type="text" 
            placeholder="Search" 
            className="bg-transparent border-none outline-none text-sm font-medium w-full text-slate-900 placeholder:text-slate-400"
          />
        </div>
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <button className="flex-1 lg:flex-none px-5 py-2.5 bg-white border border-slate-200 rounded-xl font-bold text-xs uppercase tracking-widest text-slate-600 flex items-center justify-center gap-2 hover:bg-slate-50 transition-all">
            <Download className="w-4 h-4" /> Download
          </button>
          <button className="flex-1 lg:flex-none px-5 py-2.5 bg-white border border-slate-200 rounded-xl font-bold text-xs uppercase tracking-widest text-slate-600 flex items-center justify-center gap-2 hover:bg-slate-50 transition-all">
            <Printer className="w-4 h-4" /> Print
          </button>
          <button 
            onClick={() => setIsAddingProduct(true)}
            className="flex-1 lg:flex-none bg-brand-600 text-white px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-brand-700 transition-all shadow-lg shadow-brand-600/20 active:scale-95"
          >
            <Plus className="w-4 h-4" /> Create New
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-visible">
        <div className="overflow-x-auto scrollbar-hide rounded-[32px]">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100/50">
                <th className="px-6 py-5 w-12">
                   <div className="w-4 h-4 border-2 border-slate-200 rounded cursor-pointer hover:border-brand-600 transition-colors" />
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-900 uppercase tracking-widest">SL.</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-900 uppercase tracking-widest">Product Name</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-900 uppercase tracking-widest">Product Code</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-900 uppercase tracking-widest">Purchase Price</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-900 uppercase tracking-widest">Sale Price</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-900 uppercase tracking-widest">Stock</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-900 uppercase tracking-widest">Discount</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-900 uppercase tracking-widest text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-sm">
              {products.map((prod, index) => (
                <tr key={prod.id} className="hover:bg-slate-50/30 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="w-4 h-4 border-2 border-slate-200 rounded" />
                  </td>
                  <td className="px-6 py-5 font-bold text-slate-600">{index + 1}</td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-100 rounded-lg overflow-hidden border border-slate-100 shadow-sm shrink-0">
                         <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <p className="font-bold text-slate-900 text-xs max-w-xs">{prod.name}</p>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-xs font-bold text-slate-600">{prod.productCode}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-xs font-bold text-slate-600">{prod.purchasePrice.toFixed(2)}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-xs font-bold text-slate-600">{prod.salePrice.toFixed(2)}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-xs font-bold text-slate-600">{prod.stock}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-xs font-bold text-slate-600">{prod.discount.toFixed(2)}</span>
                  </td>
                  <td className="px-6 py-5 text-center relative">
                    <button 
                      onClick={() => setActiveMenuId(activeMenuId === prod.id ? null : prod.id)}
                      className="p-2 text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                    >
                      <SlidersHorizontal className="w-4 h-4" />
                    </button>

                    <AnimatePresence>
                      {activeMenuId === prod.id && (
                        <>
                          <div className="fixed inset-0 z-[80]" onClick={() => setActiveMenuId(null)} />
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-[0_20px_70px_rgba(0,0,0,0.15)] border border-slate-100 p-2 z-[90] origin-top-right ring-1 ring-slate-100"
                          >
                            <button className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-brand-600 rounded-xl transition-all group">
                              <Eye className="w-4 h-4 text-slate-400 group-hover:text-brand-600" />
                              View
                            </button>
                            <button 
                              onClick={() => {
                                // Simple sync feedback: Increment stock by 10
                                const updated = products.map(p => p.id === prod.id ? {...p, stock: p.stock + 10 } : p);
                                setProducts(updated);
                                setActiveMenuId(null);
                              }}
                              className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-brand-600 rounded-xl transition-all group"
                            >
                              <RefreshCw className={cn("w-4 h-4 text-slate-400 group-hover:text-brand-600", activeMenuId === prod.id && "animate-spin-slow")} />
                              Sync Stock
                            </button>
                            <div className="h-[1px] bg-slate-50 my-1" />
                            <button 
                              onClick={() => {
                                // Logic to delete product
                                setProducts(products.filter(p => p.id !== prod.id));
                                setActiveMenuId(null);
                              }}
                              className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-rose-500 hover:bg-rose-50 rounded-xl transition-all group"
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </button>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const CategoryView = ({ categories, setCategories }: { categories: Category[], setCategories: React.Dispatch<React.SetStateAction<Category[]>> }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [newCat, setNewCat] = useState({ name: "", image: "" });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    if (!newCat.name) return;
    setCategories([...categories, { id: Math.random().toString(), name: newCat.name, image: newCat.image }]);
    setNewCat({ name: "", image: "" });
    setIsAdding(false);
  };

  const handleUpdate = () => {
    if (!editingCategory || !editingCategory.name) return;
    setCategories(categories.map(c => c.id === editingCategory.id ? editingCategory : c));
    setEditingCategory(null);
  };

  const handleDelete = (id: string) => {
    setCategories(categories.filter(c => c.id !== id));
    setActiveMenuId(null);
    setSelectedIds(prev => prev.filter(selectedId => selectedId !== id));
  };

  const handleBulkDelete = () => {
    setCategories(categories.filter(c => !selectedIds.includes(c.id)));
    setSelectedIds([]);
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === categories.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(categories.map(c => c.id));
    }
  };

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isEdit: boolean = false) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isEdit && editingCategory) {
          setEditingCategory({ ...editingCategory, image: reader.result as string });
        } else {
          setNewCat(prev => ({ ...prev, image: reader.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Manage Categories</h2>
          <p className="text-slate-500 font-medium">Create and organize product categories.</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-6 bg-white p-4 rounded-2xl border border-slate-200">
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <button 
            disabled={selectedIds.length === 0}
            onClick={handleBulkDelete}
            className={cn(
              "px-5 py-2.5 bg-white border border-slate-200 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all",
              selectedIds.length > 0 ? "text-rose-500 border-rose-100 bg-rose-50 hover:bg-rose-100" : "text-slate-300 cursor-not-allowed"
            )}
          >
            <Trash2 className="w-4 h-4" /> Delete ({selectedIds.length})
          </button>
        </div>
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <button className="flex-1 lg:flex-none px-5 py-2.5 bg-white border border-slate-200 rounded-xl font-bold text-xs uppercase tracking-widest text-slate-600 flex items-center justify-center gap-2 hover:bg-slate-50 transition-all">
            <Download className="w-4 h-4" /> Download
          </button>
          <button className="flex-1 lg:flex-none px-5 py-2.5 bg-white border border-slate-200 rounded-xl font-bold text-xs uppercase tracking-widest text-slate-600 flex items-center justify-center gap-2 hover:bg-slate-50 transition-all">
            <Printer className="w-4 h-4" /> Print
          </button>
          <button 
            onClick={() => setIsAdding(true)}
            className="flex-1 lg:flex-none bg-brand-600 text-white px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-brand-700 transition-all shadow-lg shadow-brand-600/20 active:scale-95"
          >
            <Plus className="w-4 h-4" /> Create New
          </button>
        </div>
      </div>

      {isAdding && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-brand-950/40 backdrop-blur-sm animate-in fade-in duration-300">
           <motion.div 
             initial={{ scale: 0.9, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             className="bg-white w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl"
           >
              <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Add New Category</h3>
                <button onClick={() => setIsAdding(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                  <Plus className="w-6 h-6 rotate-45" />
                </button>
              </div>
              <div className="p-8 space-y-6">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Icon / Image</label>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-24 h-24 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center cursor-pointer hover:border-brand-400 hover:bg-brand-50 transition-all overflow-hidden group"
                  >
                    {newCat.image ? (
                      <img src={newCat.image} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="w-6 h-6 text-slate-300 group-hover:text-brand-400" />
                    )}
                  </div>
                  <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e)} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Category Name</label>
                  <input 
                    type="text" 
                    value={newCat.name}
                    onChange={(e) => setNewCat({ ...newCat, name: e.target.value })}
                    placeholder="Enter category name..."
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold text-slate-800 focus:bg-white focus:border-brand-600 outline-none transition-all"
                  />
                </div>
                <button 
                  onClick={handleSave}
                  className="w-full bg-brand-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-brand-600/20 hover:bg-brand-700 active:scale-95 transition-all mt-4"
                >
                  Save Category
                </button>
              </div>
           </motion.div>
        </div>
      )}

      {editingCategory && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-brand-950/40 backdrop-blur-sm animate-in fade-in duration-300">
           <motion.div 
             initial={{ scale: 0.9, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             className="bg-white w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl"
           >
              <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Edit Category</h3>
                <button onClick={() => setEditingCategory(null)} className="text-slate-400 hover:text-slate-600 transition-colors">
                  <Plus className="w-6 h-6 rotate-45" />
                </button>
              </div>
              <div className="p-8 space-y-6">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Icon / Image</label>
                  <div 
                    onClick={() => editFileInputRef.current?.click()}
                    className="w-24 h-24 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center cursor-pointer hover:border-brand-400 hover:bg-brand-50 transition-all overflow-hidden group"
                  >
                    {editingCategory.image ? (
                      <img src={editingCategory.image} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="w-6 h-6 text-slate-300 group-hover:text-brand-400" />
                    )}
                  </div>
                  <input type="file" ref={editFileInputRef} className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, true)} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Category Name</label>
                  <input 
                    type="text" 
                    value={editingCategory.name}
                    onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                    placeholder="Enter category name..."
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold text-slate-800 focus:bg-white focus:border-brand-600 outline-none transition-all"
                  />
                </div>
                <button 
                  onClick={handleUpdate}
                  className="w-full bg-brand-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-brand-600/20 hover:bg-brand-700 active:scale-95 transition-all mt-4"
                >
                  Update Category
                </button>
              </div>
           </motion.div>
        </div>
      )}

      <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100/50">
                <th className="px-8 py-5 w-12 text-center">
                   <button 
                     onClick={toggleSelectAll}
                     className={cn(
                       "w-4 h-4 border-2 rounded transition-all mx-auto",
                       selectedIds.length === categories.length && categories.length > 0
                        ? "bg-brand-600 border-brand-600" 
                        : "border-slate-200"
                     )}
                   >
                     {selectedIds.length === categories.length && categories.length > 0 && <Check className="w-3 h-3 text-white" />}
                   </button>
                </th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-900 uppercase tracking-widest">SL.</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-900 uppercase tracking-widest">Category Name</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-900 uppercase tracking-widest">inventory.Icon</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-900 uppercase tracking-widest">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {categories.map((cat, index) => (
                <tr key={cat.id} className={cn("hover:bg-slate-50/30 transition-colors group", selectedIds.includes(cat.id) && "bg-slate-50/50")}>
                  <td className="px-8 py-5 text-center">
                    <button 
                      onClick={() => toggleSelect(cat.id)}
                      className={cn(
                        "w-4 h-4 border-2 rounded transition-all mx-auto",
                        selectedIds.includes(cat.id) ? "bg-brand-600 border-brand-600" : "border-slate-200"
                      )}
                    >
                      {selectedIds.includes(cat.id) && <Check className="w-3 h-3 text-white" />}
                    </button>
                  </td>
                  <td className="px-8 py-5 font-bold text-slate-600">{index + 1}</td>
                  <td className="px-8 py-5">
                    <p className="font-bold text-slate-900 text-sm">{cat.name}</p>
                  </td>
                  <td className="px-8 py-5">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl overflow-hidden border border-slate-100 shadow-sm flex items-center justify-center">
                       {cat.image ? (
                         <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                       ) : (
                         <ImageIcon className="w-5 h-5 text-slate-300" />
                       )}
                    </div>
                  </td>
                  <td className="px-8 py-5 relative">
                    <button 
                      onClick={() => setActiveMenuId(activeMenuId === cat.id ? null : cat.id)}
                      className={cn(
                        "p-2.5 rounded-xl transition-all",
                        activeMenuId === cat.id ? "bg-brand-600 text-white" : "bg-slate-50 text-slate-900 hover:bg-slate-100"
                      )}
                    >
                      <SlidersHorizontal className="w-4 h-4" />
                    </button>

                    {activeMenuId === cat.id && (
                      <>
                        <div className="fixed inset-0 z-[80]" onClick={() => setActiveMenuId(null)} />
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-[90] origin-top-right ring-1 ring-slate-100"
                        >
                          <button 
                            onClick={() => {
                              setEditingCategory(cat);
                              setActiveMenuId(null);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-brand-600 rounded-xl transition-all group"
                          >
                            <Edit className="w-4 h-4 text-slate-400 group-hover:text-brand-600" />
                            Edit
                          </button>
                          <div className="h-[1px] bg-slate-50 my-1" />
                          <button 
                            onClick={() => handleDelete(cat.id)}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-rose-500 hover:bg-rose-50 rounded-xl transition-all group"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </motion.div>
                      </>
                    )}
                  </td>
                </tr>
              ))}
              {categories.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-20 text-center">
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No categories found.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="flex items-center justify-end gap-2 mt-8">
         <button className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 hover:text-brand-600 transition-colors">
           <ChevronLeft className="w-4 h-4" />
         </button>
         <div className="w-10 h-10 bg-white border-2 border-brand-600 rounded-xl flex items-center justify-center text-brand-600 font-black text-sm">1</div>
         <button className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 hover:text-brand-600 transition-colors">
           <ChevronRight className="w-4 h-4" />
         </button>
      </div>
    </div>
  );
};

const StakeholdersView = ({ 
  type, 
  stakeholders, 
  setStakeholders 
}: { 
  type: 'customers' | 'suppliers', 
  stakeholders: Stakeholder[], 
  setStakeholders: React.Dispatch<React.SetStateAction<Stakeholder[]>> 
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [viewingStakeholder, setViewingStakeholder] = useState<Stakeholder | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [stakeholderToEdit, setStakeholderToEdit] = useState<Stakeholder | null>(null);
  const [activeDetailTab, setActiveDetailTab] = useState('Overview');

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    gender: "unknown",
    address: "",
    balance: 0,
    previousDue: 0,
    note: ""
  });

  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      gender: "unknown",
      address: "",
      balance: 0,
      previousDue: 0,
      note: ""
    });
  };

  const handleCreate = () => {
    if (!formData.name || !formData.phone) return;
    const newStakeholder: Stakeholder = {
      id: Math.floor(Math.random() * 10000).toString(),
      type: type === 'customers' ? 'customer' : 'supplier',
      ...formData,
      totalTransactions: 0,
      joinDate: new Date().toISOString().split('T')[0]
    };
    setStakeholders([...stakeholders, newStakeholder]);
    setIsCreating(false);
    resetForm();
  };

  const handleUpdate = () => {
    if (!stakeholderToEdit || !formData.name || !formData.phone) return;
    setStakeholders(stakeholders.map(s => 
      s.id === stakeholderToEdit.id ? { ...s, ...formData } : s
    ));
    setStakeholderToEdit(null);
    resetForm();
  };

  const startEdit = (s: Stakeholder) => {
    setStakeholderToEdit(s);
    setFormData({
      name: s.name,
      phone: s.phone,
      email: s.email || "",
      gender: s.gender || "unknown",
      address: s.address || "",
      balance: s.balance,
      previousDue: s.previousDue || 0,
      note: s.note || ""
    });
    setActiveMenuId(null);
  };

  const filtered = stakeholders.filter(s => 
    s.type === (type === 'customers' ? 'customer' : 'supplier') &&
    (s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     s.phone.includes(searchTerm) || 
     s.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const toggleSelectAll = () => {
    if (selectedIds.length === filtered.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filtered.map(s => s.id));
    }
  };

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleBulkDelete = () => {
    setStakeholders(prev => prev.filter(s => !selectedIds.includes(s.id)));
    setSelectedIds([]);
  };

  const handleDelete = (id: string) => {
    setStakeholders(prev => prev.filter(s => s.id !== id));
    setActiveMenuId(null);
    setSelectedIds(prev => prev.filter(i => i !== id));
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">{type === 'customers' ? 'Customers List' : 'Supplier Network'}</h2>
            <p className="text-slate-500 font-medium">Manage your {type} and their full financial engagement.</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm mb-8 space-y-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
           <div className="flex items-center gap-3 w-full lg:w-auto">
             <button 
               disabled={selectedIds.length === 0}
               onClick={handleBulkDelete}
               className={cn(
                 "px-5 py-2.5 bg-white border border-slate-200 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all",
                 selectedIds.length > 0 ? "text-rose-500 border-rose-100 bg-rose-50 hover:bg-rose-100" : "text-slate-300 cursor-not-allowed"
               )}
             >
               <Trash2 className="w-4 h-4" /> Delete ({selectedIds.length})
             </button>
             <div className="relative flex-1 lg:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text"
                  placeholder="Search by name, phone, email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-xl pl-11 pr-4 py-2.5 text-xs font-bold text-slate-700 focus:bg-white focus:border-brand-600 outline-none transition-all"
                />
             </div>
           </div>

           <div className="flex items-center gap-3 w-full lg:w-auto">
             <button className="flex-1 lg:flex-none px-5 py-2.5 bg-white border border-slate-200 rounded-xl font-bold text-xs uppercase tracking-widest text-slate-600 flex items-center justify-center gap-2 hover:bg-slate-50 transition-all">
               <Download className="w-4 h-4" /> Download
             </button>
             <button className="flex-1 lg:flex-none px-5 py-2.5 bg-white border border-slate-200 rounded-xl font-bold text-xs uppercase tracking-widest text-slate-600 flex items-center justify-center gap-2 hover:bg-slate-50 transition-all">
               <Printer className="w-4 h-4" /> Print
             </button>
             <button 
               onClick={() => {
                 resetForm();
                 setIsCreating(true);
               }}
               className="flex-1 lg:flex-none bg-brand-600 text-white px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-brand-700 transition-all shadow-lg shadow-brand-600/20 active:scale-95"
             >
               <Plus className="w-4 h-4" /> Create New
             </button>
           </div>
        </div>

        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100/50">
                <th className="px-6 py-5 w-12 text-center">
                   <button 
                     onClick={toggleSelectAll}
                     className={cn(
                       "w-4 h-4 border-2 rounded transition-all mx-auto flex items-center justify-center",
                       selectedIds.length === filtered.length && filtered.length > 0
                        ? "bg-brand-600 border-brand-600" 
                        : "border-slate-200"
                     )}
                   >
                     {selectedIds.length === filtered.length && filtered.length > 0 && <Check className="w-3 h-3 text-white font-black" />}
                   </button>
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-900 uppercase tracking-widest">SL.</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-900 uppercase tracking-widest">Customer Name</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-900 uppercase tracking-widest">Note/Remarks</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-900 uppercase tracking-widest">Phone Number</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-900 uppercase tracking-widest">Email</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-900 uppercase tracking-widest">Balance</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-900 uppercase tracking-widest">Date</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-900 uppercase tracking-widest">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((cust, index) => (
                <tr key={cust.id} className={cn("hover:bg-slate-50/30 transition-all group", selectedIds.includes(cust.id) && "bg-slate-50/50")}>
                  <td className="px-6 py-5 text-center">
                    <button 
                      onClick={() => toggleSelect(cust.id)}
                      className={cn(
                        "w-4 h-4 border-2 rounded transition-all mx-auto flex items-center justify-center",
                        selectedIds.includes(cust.id) ? "bg-brand-600 border-brand-600" : "border-slate-200"
                      )}
                    >
                      {selectedIds.includes(cust.id) && <Check className="w-3 h-3 text-white font-black" />}
                    </button>
                  </td>
                  <td className="px-6 py-5 font-bold text-slate-400 text-xs">{index + 1}</td>
                  <td className="px-6 py-5">
                    <p className="font-bold text-slate-900 text-sm uppercase tracking-tight">{cust.name}</p>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-slate-400 text-xs font-medium italic">{cust.note || "—"}</p>
                  </td>
                  <td className="px-6 py-5">
                    <p className="font-bold text-slate-600 text-sm">{cust.phone}</p>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-slate-400 text-xs font-medium">{cust.email || "—"}</p>
                  </td>
                  <td className="px-6 py-5">
                    <div className={cn(
                      "inline-flex items-center px-3 py-1 rounded-lg text-xs font-black",
                      cust.balance === 0 ? "bg-slate-100 text-slate-400" :
                      cust.balance > 0 ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                    )}>
                      {cust.balance}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-slate-400 text-xs font-bold">{cust.joinDate}</p>
                  </td>
                  <td className="px-6 py-5 relative">
                    <button 
                      onClick={() => setActiveMenuId(activeMenuId === cust.id ? null : cust.id)}
                      className={cn(
                        "p-2.5 rounded-xl transition-all",
                        activeMenuId === cust.id ? "bg-brand-600 text-white shadow-lg" : "bg-slate-50 text-slate-900 hover:bg-slate-100"
                      )}
                    >
                      <SlidersHorizontal className="w-4 h-4" />
                    </button>

                    <AnimatePresence>
                      {activeMenuId === cust.id && (
                        <>
                          <div className="fixed inset-0 z-40" onClick={() => setActiveMenuId(null)} />
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-50 origin-top-right ring-1 ring-slate-100"
                          >
                            <button 
                              onClick={() => {
                                setViewingStakeholder(cust);
                                setActiveMenuId(null);
                              }}
                              className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-brand-600 rounded-xl transition-all group"
                            >
                              <Eye className="w-4 h-4 text-slate-400 group-hover:text-brand-600" />
                              View
                            </button>
                            <button 
                              onClick={() => startEdit(cust)}
                              className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-brand-600 rounded-xl transition-all group"
                            >
                              <Edit className="w-4 h-4 text-slate-400 group-hover:text-brand-600" />
                              Edit
                            </button>
                            <div className="h-px bg-slate-50 my-1" />
                            <button 
                              onClick={() => handleDelete(cust.id)}
                              className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-rose-500 hover:bg-rose-50 rounded-xl transition-all group"
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </button>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                   <td colSpan={9} className="py-32 text-center">
                     <div className="flex flex-col items-center gap-3 opacity-20">
                       <Users className="w-12 h-12" />
                       <p className="text-xl font-black uppercase tracking-widest">No customers found</p>
                     </div>
                   </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-end gap-2 mt-8 pt-6 border-t border-slate-50">
           <button className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 hover:text-brand-600 transition-colors">
             <ChevronLeft className="w-4 h-4" />
           </button>
           <div className="w-10 h-10 bg-brand-600 border-2 border-brand-600 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-lg shadow-brand-600/20">1</div>
           <button className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 hover:text-brand-600 transition-colors">
             <ChevronRight className="w-4 h-4" />
           </button>
        </div>
      </div>

      <AnimatePresence>
        {(isCreating || stakeholderToEdit) && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-brand-950/40 backdrop-blur-sm animate-in fade-in duration-300">
             <motion.div 
               initial={{ scale: 0.9, opacity: 0, y: 20 }}
               animate={{ scale: 1, opacity: 1, y: 0 }}
               exit={{ scale: 0.9, opacity: 0, y: 20 }}
               className="bg-white w-full max-w-2xl rounded-[32px] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
             >
                <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                    {isCreating ? `Add New ${type === 'customers' ? 'Customer' : 'Supplier'}` : `Edit ${type === 'customers' ? 'Customer' : 'Supplier'}`}
                  </h3>
                  <button 
                    onClick={() => {
                      setIsCreating(false);
                      setStakeholderToEdit(null);
                    }} 
                    className="text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <Plus className="w-6 h-6 rotate-45" />
                  </button>
                </div>

                <div className="p-8 space-y-6 overflow-y-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                        <span className="text-rose-500 mr-1">*</span> {type === 'customers' ? 'Customer' : 'Supplier'} Name
                      </label>
                      <input 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Full Name"
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-xs font-bold text-slate-800 focus:bg-white focus:border-brand-600 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                         <span className="text-rose-500 mr-1">*</span> Phone Number
                      </label>
                      <div className="relative">
                        <Smartphone className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                        <input 
                          type="text" 
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="01xxxxxxxxx"
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-5 py-4 text-xs font-bold text-slate-800 focus:bg-white focus:border-brand-600 outline-none transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Email Address</label>
                      <input 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="example@mail.com"
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-xs font-bold text-slate-800 focus:bg-white focus:border-brand-600 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                        <span className="text-rose-500 mr-1">*</span> Gender
                      </label>
                      <select 
                        value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-xs font-bold text-slate-800 focus:bg-white focus:border-brand-600 outline-none transition-all appearance-none cursor-pointer"
                      >
                         <option value="unknown">Unknown</option>
                         <option value="male">Male</option>
                         <option value="female">Female</option>
                         <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Full Address</label>
                    <textarea 
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Street, City, Postcode..."
                      rows={2}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-xs font-bold text-slate-800 focus:bg-white focus:border-brand-600 outline-none transition-all resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block underline decoration-brand-600/30">
                        <span className="text-rose-500 mr-1">*</span> Current Balance (৳)
                      </label>
                      <input 
                        type="number" 
                        value={formData.balance}
                        onChange={(e) => setFormData({ ...formData, balance: Number(e.target.value) })}
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-xs font-black text-emerald-600 focus:bg-white focus:border-emerald-600 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block underline decoration-rose-600/30">
                        <span className="text-rose-500 mr-1">*</span> Previous Due (৳)
                      </label>
                      <input 
                        type="number" 
                        value={formData.previousDue}
                        onChange={(e) => setFormData({ ...formData, previousDue: Number(e.target.value) })}
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-xs font-black text-rose-600 focus:bg-white focus:border-rose-600 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Note / Remarks</label>
                    <textarea 
                      value={formData.note}
                      onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                      placeholder="..."
                      rows={3}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-xs font-bold text-slate-800 focus:bg-white focus:border-brand-600 outline-none transition-all resize-none"
                    />
                  </div>
                </div>

                <div className="p-8 border-t border-slate-100 bg-slate-50/50 shrink-0">
                  <button 
                    onClick={isCreating ? handleCreate : handleUpdate}
                    className="w-full bg-brand-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-brand-600/20 hover:bg-brand-700 active:scale-95 transition-all"
                  >
                    {isCreating ? `Create ${type === 'customers' ? 'Customer' : 'Supplier'}` : `Update ${type === 'customers' ? 'Customer' : 'Supplier'}`}
                  </button>
                </div>
             </motion.div>
          </div>
        )}

        {viewingStakeholder && (
          <div className="fixed inset-0 z-[200] bg-white flex flex-col overflow-hidden animate-in fade-in duration-300">
            <div className="h-20 border-b border-slate-100 px-8 flex items-center justify-between bg-white sticky top-0 z-10">
               <button 
                 onClick={() => setViewingStakeholder(null)}
                 className="p-3 hover:bg-slate-50 rounded-2xl transition-all text-slate-400 hover:text-slate-900"
               >
                 <Plus className="w-6 h-6 rotate-45" />
               </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 md:p-12">
               <div className="max-w-6xl mx-auto">
                  <div className="mb-12">
                     <h2 className="text-4xl font-black text-slate-900 tracking-tight uppercase">{viewingStakeholder.name}</h2>
                  </div>

                  <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden flex flex-col mb-12">
                     <div className="flex border-b border-slate-100 bg-slate-50/50">
                        {['Overview', 'Order History', 'Account Deposits'].map(tab => (
                          <button
                            key={tab}
                            onClick={() => setActiveDetailTab(tab)}
                            className={cn(
                              "px-8 py-5 text-xs font-black uppercase tracking-widest transition-all border-b-2",
                              activeDetailTab === tab 
                                ? "text-brand-600 border-brand-600 bg-white" 
                                : "text-slate-400 border-transparent hover:text-slate-600"
                            )}
                          >
                            {tab}
                          </button>
                        ))}
                     </div>

                     <div className="p-8 md:p-12">
                        {activeDetailTab === 'Overview' && (
                          <div className="space-y-12">
                             <div>
                                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-8 flex items-center gap-2">
                                   <UserIcon className="w-4 h-4 text-brand-600" />
                                   Customer Information
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 border border-slate-100 rounded-[24px] overflow-hidden">
                                   {[
                                     { label: 'Customer ID', value: viewingStakeholder.id },
                                     { label: 'Gender', value: viewingStakeholder.gender || 'unknown' },
                                     { label: 'Email', value: viewingStakeholder.email || '—', icon: <Bell className="w-3 h-3 rotate-180" /> },
                                     { label: 'Phone', value: viewingStakeholder.phone, icon: <Smartphone className="w-3 h-3" /> },
                                     { label: 'Address', value: viewingStakeholder.address, icon: <Globe className="w-3 h-3" /> },
                                     { label: 'Join Date', value: viewingStakeholder.joinDate },
                                   ].map((item, i) => (
                                     <div key={i} className="p-6 border border-slate-50 bg-white group hover:bg-slate-50/50 transition-colors">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">{item.label}</p>
                                        <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                                           {item.icon && <span className="opacity-40">{item.icon}</span>}
                                           {item.value}
                                        </div>
                                     </div>
                                   ))}
                                </div>
                             </div>

                             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="p-8 bg-slate-50/50 border border-slate-100 rounded-[32px]">
                                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Total Deposits</p>
                                   <p className="text-4xl font-black text-slate-900">{formatCurrency(viewingStakeholder.totalDeposits || 0)}</p>
                                </div>
                                <div className="p-8 bg-slate-50/50 border border-slate-100 rounded-[32px]">
                                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Previous Due</p>
                                   <p className="text-4xl font-black text-slate-900">{formatCurrency(viewingStakeholder.previousDue || 0)}</p>
                                </div>
                             </div>
                          </div>
                        )}

                        {activeDetailTab !== 'Overview' && (
                          <div className="py-24 text-center">
                             <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <History className="w-10 h-10 text-slate-200" />
                             </div>
                             <p className="text-xs font-black text-slate-400 uppercase tracking-widest leading-loose">
                                Recording activity for this period...<br />
                                All secure transactions are logged here after encryption.
                             </p>
                          </div>
                        )}
                     </div>
                  </div>
               </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PaymentMethodsView = ({ 
  paymentMethods, 
  setPaymentMethods 
}: { 
  paymentMethods: PaymentMethod[], 
  setPaymentMethods: React.Dispatch<React.SetStateAction<PaymentMethod[]>> 
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [methodToEdit, setMethodToEdit] = useState<PaymentMethod | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    paymentType: "",
    debitAccount: "",
    status: "Active" as "Active" | "Inactive",
    multipleTypes: false,
    provider: "",
    icon: ""
  });

  const resetForm = () => {
    setFormData({
      title: "",
      paymentType: "",
      debitAccount: "",
      status: "Active",
      multipleTypes: false,
      provider: "",
      icon: ""
    });
  };

  const handleCreate = () => {
    if (!formData.title || !formData.debitAccount) return;
    const newMethod: PaymentMethod = {
      id: Math.floor(Math.random() * 10000).toString(),
      ...formData
    };
    setPaymentMethods([...paymentMethods, newMethod]);
    setIsCreating(false);
    resetForm();
  };

  const handleUpdate = () => {
    if (!methodToEdit || !formData.title) return;
    setPaymentMethods(paymentMethods.map(m => 
      m.id === methodToEdit.id ? { ...m, ...formData } : m
    ));
    setMethodToEdit(null);
    resetForm();
  };

  const startEdit = (m: PaymentMethod) => {
    setMethodToEdit(m);
    setFormData({
      title: m.title,
      paymentType: m.paymentType,
      debitAccount: m.debitAccount,
      status: m.status,
      multipleTypes: m.multipleTypes,
      provider: m.provider,
      icon: m.icon || ""
    });
    setActiveMenuId(null);
  };

  const handleDelete = (id: string) => {
    setPaymentMethods(prev => prev.filter(m => m.id !== id));
    setActiveMenuId(null);
    setSelectedIds(prev => prev.filter(i => i !== id));
  };

  const filtered = paymentMethods.filter(m => 
    m.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filtered.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filtered.map(m => m.id));
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-4 border-b border-slate-100 gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Payment Methods</h2>
            <p className="text-slate-500 font-medium">Manage how your customers engage with financial transactions.</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm mb-8 space-y-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
           <div className="flex items-center gap-3 w-full lg:w-auto">
             <button 
               disabled={selectedIds.length === 0}
               className={cn(
                 "px-5 py-2.5 bg-white border border-slate-200 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all",
                 selectedIds.length > 0 ? "text-rose-500 border-rose-100 bg-rose-50 hover:bg-rose-100" : "text-slate-300 cursor-not-allowed"
               )}
             >
               <Trash2 className="w-4 h-4" /> Delete ({selectedIds.length})
             </button>
             <div className="relative flex-1 lg:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text"
                  placeholder="Search payment methods..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-xl pl-11 pr-4 py-2.5 text-xs font-bold text-slate-700 focus:bg-white focus:border-brand-600 outline-none transition-all"
                />
             </div>
           </div>

           <div className="flex items-center gap-3 w-full lg:w-auto">
             <button className="flex-1 lg:flex-none px-5 py-2.5 bg-white border border-slate-200 rounded-xl font-bold text-xs uppercase tracking-widest text-slate-600 flex items-center justify-center gap-2 hover:bg-slate-50 transition-all">
               <Download className="w-4 h-4" /> Download
             </button>
             <button className="flex-1 lg:flex-none px-5 py-2.5 bg-white border border-slate-200 rounded-xl font-bold text-xs uppercase tracking-widest text-slate-600 flex items-center justify-center gap-2 hover:bg-slate-50 transition-all">
               <Printer className="w-4 h-4" /> Print
             </button>
             <button 
               onClick={() => {
                 resetForm();
                 setIsCreating(true);
               }}
               className="flex-1 lg:flex-none bg-brand-600 text-white px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-brand-700 transition-all shadow-lg shadow-brand-600/20 active:scale-95"
             >
               <Plus className="w-4 h-4" /> Create New
             </button>
           </div>
        </div>

        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100/50">
                <th className="px-6 py-5 w-12 text-center">
                   <button 
                     onClick={toggleSelectAll}
                     className={cn(
                       "w-4 h-4 border-2 rounded transition-all mx-auto flex items-center justify-center",
                       selectedIds.length === filtered.length && filtered.length > 0
                        ? "bg-brand-600 border-brand-600" 
                        : "border-slate-200"
                     )}
                   >
                     {selectedIds.length === filtered.length && filtered.length > 0 && <Check className="w-3 h-3 text-white font-black" />}
                   </button>
                </th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-900 uppercase tracking-widest">SL.</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-900 uppercase tracking-widest text-center">Icon</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-900 uppercase tracking-widest">Payment Type</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-900 uppercase tracking-widest">Debit Account</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-900 uppercase tracking-widest">Status</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-900 uppercase tracking-widest">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((method, index) => (
                <tr key={method.id} className={cn("hover:bg-slate-50/30 transition-all group", selectedIds.includes(method.id) && "bg-slate-50/50")}>
                  <td className="px-6 py-5 text-center">
                    <button 
                      onClick={() => toggleSelect(method.id)}
                      className={cn(
                        "w-4 h-4 border-2 rounded transition-all mx-auto flex items-center justify-center",
                        selectedIds.includes(method.id) ? "bg-brand-600 border-brand-600" : "border-slate-200"
                      )}
                    >
                      {selectedIds.includes(method.id) && <Check className="w-3 h-3 text-white font-black" />}
                    </button>
                  </td>
                  <td className="px-6 py-5 font-bold text-slate-400 text-xs">{index + 1}</td>
                  <td className="px-6 py-5">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg mx-auto flex items-center justify-center overflow-hidden">
                       {method.icon ? <img src={method.icon} className="w-full h-full object-cover" /> : <Wallet className="w-5 h-5 text-slate-300" />}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <p className="font-bold text-slate-900 text-sm uppercase tracking-tight">{method.title}</p>
                  </td>
                  <td className="px-6 py-5">
                    <p className="font-bold text-slate-600 text-sm">{method.debitAccount}</p>
                  </td>
                  <td className="px-6 py-5">
                    <div className={cn(
                      "inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest",
                      method.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                    )}>
                      {method.status}
                    </div>
                  </td>
                  <td className="px-6 py-5 relative">
                    <button 
                      onClick={() => setActiveMenuId(activeMenuId === method.id ? null : method.id)}
                      className={cn(
                        "p-2.5 rounded-xl transition-all",
                        activeMenuId === method.id ? "bg-brand-600 text-white shadow-lg" : "bg-slate-50 text-slate-900 hover:bg-slate-100"
                      )}
                    >
                      <SlidersHorizontal className="w-4 h-4" />
                    </button>

                    <AnimatePresence>
                      {activeMenuId === method.id && (
                        <>
                          <div className="fixed inset-0 z-40" onClick={() => setActiveMenuId(null)} />
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-50 origin-top-right ring-1 ring-slate-100"
                          >
                            <button 
                              onClick={() => startEdit(method)}
                              className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-brand-600 rounded-xl transition-all group"
                            >
                              <Edit className="w-4 h-4 text-slate-400 group-hover:text-brand-600" />
                              Edit
                            </button>
                            <div className="h-px bg-slate-50 my-1" />
                            <button 
                              onClick={() => handleDelete(method.id)}
                              className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-rose-500 hover:bg-rose-50 rounded-xl transition-all group"
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </button>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {(isCreating || methodToEdit) && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-brand-950/40 backdrop-blur-sm animate-in fade-in duration-300">
             <motion.div 
               initial={{ scale: 0.9, opacity: 0, y: 20 }}
               animate={{ scale: 1, opacity: 1, y: 0 }}
               exit={{ scale: 0.9, opacity: 0, y: 20 }}
               className="bg-white w-full max-w-2xl rounded-[32px] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
             >
                <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                    {isCreating ? "Add Payment Method" : "Edit Payment Method"}
                  </h3>
                  <button 
                    onClick={() => {
                      setIsCreating(false);
                      setMethodToEdit(null);
                    }} 
                    className="text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <Plus className="w-6 h-6 rotate-45" />
                  </button>
                </div>

                <div className="p-8 space-y-8 overflow-y-auto">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Icon</label>
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-slate-50 border border-slate-100 border-dashed rounded-2xl flex items-center justify-center overflow-hidden">
                           {formData.icon ? <img src={formData.icon} className="w-full h-full object-cover" /> : <ImageIcon className="w-6 h-6 text-slate-300" />}
                        </div>
                        <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl font-bold text-xs uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2">
                           <Download className="w-4 h-4 rotate-180" /> Select File
                        </button>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                          <span className="text-rose-500 mr-1">*</span> Title
                        </label>
                        <input 
                          type="text" 
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          placeholder="e.g. Cash On Delivari"
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-xs font-bold text-slate-800 focus:bg-white focus:border-brand-600 outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                          <span className="text-rose-500 mr-1">*</span> Debit Account
                        </label>
                        <select 
                          value={formData.debitAccount}
                          onChange={(e) => setFormData({ ...formData, debitAccount: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-xs font-bold text-slate-800 focus:bg-white focus:border-brand-600 outline-none transition-all appearance-none cursor-pointer"
                        >
                           <option value="">Select Account</option>
                           <option value="Cash(101)">Cash(101)</option>
                           <option value="Bank(102)">Bank(102)</option>
                           <option value="Mobile Wallet(103)">Mobile Wallet(103)</option>
                        </select>
                      </div>
                   </div>

                   <div className="grid grid-cols-2 gap-8">
                      <div className="flex flex-col gap-3">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Multiple Types</label>
                         <button 
                           onClick={() => setFormData({ ...formData, multipleTypes: !formData.multipleTypes })}
                           className={cn(
                             "w-12 h-6 rounded-full transition-all relative",
                             formData.multipleTypes ? "bg-brand-600" : "bg-slate-200"
                           )}
                         >
                            <div className={cn(
                              "w-4 h-4 bg-white rounded-full absolute top-1 transition-all",
                              formData.multipleTypes ? "right-1" : "left-1"
                            )} />
                         </button>
                      </div>
                      <div className="flex flex-col gap-3">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Status</label>
                         <button 
                           onClick={() => setFormData({ ...formData, status: formData.status === "Active" ? "Inactive" : "Active" })}
                           className={cn(
                             "w-12 h-6 rounded-full transition-all relative",
                             formData.status === "Active" ? "bg-brand-600" : "bg-slate-200"
                           )}
                         >
                            <div className={cn(
                              "w-4 h-4 bg-white rounded-full absolute top-1 transition-all",
                              formData.status === "Active" ? "right-1" : "left-1"
                            )} />
                         </button>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                          <span className="text-rose-500 mr-1">*</span> Payment Type
                        </label>
                        <select 
                          value={formData.paymentType}
                          onChange={(e) => setFormData({ ...formData, paymentType: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-xs font-bold text-slate-800 focus:bg-white focus:border-brand-600 outline-none transition-all appearance-none cursor-pointer"
                        >
                           <option value="">Select a type</option>
                           <option value="Cash On Delivari">Cash On Delivery</option>
                           <option value="Online Payment">Online Payment</option>
                           <option value="Bank Transfer">Bank Transfer</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                          <span className="text-rose-500 mr-1">*</span> Provider
                        </label>
                        <select 
                          value={formData.provider}
                          onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-xs font-bold text-slate-800 focus:bg-white focus:border-brand-600 outline-none transition-all appearance-none cursor-pointer"
                        >
                           <option value="">Select a provider</option>
                           <option value="Self">Self</option>
                           <option value="SSLCommerz">SSLCommerz</option>
                           <option value="bkash">bkash</option>
                           <option value="Nagad">Nagad</option>
                        </select>
                      </div>
                   </div>
                </div>

                <div className="p-8 border-t border-slate-100 bg-slate-50/50 shrink-0">
                  <button 
                    onClick={isCreating ? handleCreate : handleUpdate}
                    className="w-full bg-brand-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-brand-600/20 hover:bg-brand-700 active:scale-95 transition-all"
                  >
                    {isCreating ? "Add Payment Method" : "Update Payment Method"}
                  </button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SupportView = () => {
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketMessage, setTicketMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [wasSent, setWasSent] = useState(false);

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject || !ticketMessage) return;
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setWasSent(true);
      setTicketSubject("");
      setTicketMessage("");
      setTimeout(() => setWasSent(false), 5000);
    }, 1500);
  };

  const contactChannels = [
    {
      title: "Live Support",
      description: "Chat with our human experts right now.",
      icon: MessageSquare,
      action: "Start Chat",
      color: "bg-emerald-500",
      link: "https://wa.me/8801700000000"
    },
    {
      title: "Phone Support",
      description: "Call us anytime for urgent assistance.",
      icon: PhoneCall,
      action: "Call Now",
      color: "bg-brand-600",
      link: "tel:+8801700000000"
    },
    {
      title: "Email Support",
      description: "Send us a detailed inquiry via email.",
      icon: Mail,
      action: "Email Us",
      color: "bg-slate-900",
      link: "mailto:support@bajarbari.ai"
    }
  ];

  return (
    <div className="animate-in fade-in duration-500 max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-12 gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Technical Support</h2>
          <p className="text-slate-500 font-medium text-lg">We are here to ensure your business runs smoothly 24/7.</p>
        </div>
        <div className="flex -space-x-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-slate-100 flex items-center justify-center overflow-hidden shadow-sm">
              <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="avatar" />
            </div>
          ))}
          <div className="w-12 h-12 rounded-full border-4 border-white bg-brand-600 flex items-center justify-center text-white text-xs font-bold shadow-lg z-10">
            +12
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {contactChannels.map((channel, i) => (
          <motion.a
            key={i}
            href={channel.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm hover:shadow-xl hover:border-brand-100 transition-all group"
          >
            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg", channel.color)}>
              <channel.icon className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-black text-slate-900 mb-2 group-hover:text-brand-600 transition-colors uppercase tracking-tight">{channel.title}</h4>
            <p className="text-slate-500 text-sm font-medium mb-6 leading-relaxed">{channel.description}</p>
            <div className="flex items-center gap-2 text-brand-600 font-bold text-xs uppercase tracking-widest">
              {channel.action} <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.a>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <div className="bg-white p-10 rounded-[40px] border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -mr-32 -mt-32 blur-3xl opacity-50" />
            <div className="relative z-10">
               <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center text-brand-600">
                     <FileText className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Open a Support Ticket</h3>
               </div>

               <form onSubmit={handleTicketSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">Subject</label>
                    <input 
                      type="text" 
                      value={ticketSubject}
                      onChange={(e) => setTicketSubject(e.target.value)}
                      placeholder="What do you need help with?"
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold text-slate-800 focus:bg-white focus:border-brand-600 outline-none transition-all placeholder:text-slate-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">Detailed Message</label>
                    <textarea 
                      rows={5}
                      value={ticketMessage}
                      onChange={(e) => setTicketMessage(e.target.value)}
                      placeholder="Please describe your issue in detail..."
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold text-slate-800 focus:bg-white focus:border-brand-600 outline-none transition-all placeholder:text-slate-300 resize-none"
                    />
                  </div>
                  <button 
                    disabled={isSubmitting || wasSent}
                    className={cn(
                      "w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2",
                      wasSent 
                        ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" 
                        : "bg-brand-600 text-white shadow-xl shadow-brand-600/20 hover:bg-brand-700 active:scale-[0.98]"
                    )}
                  >
                    {isSubmitting ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : wasSent ? (
                      <>
                        <Check className="w-4 h-4" /> Message Sent Successfully
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> Submit Support Request
                      </>
                    )}
                  </button>
               </form>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
           <div className="bg-brand-950 p-8 rounded-[40px] text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-800 rounded-full -mr-16 -mt-16 blur-xl opacity-30" />
              <Headphones className="w-12 h-12 text-brand-400 mb-6" />
              <h4 className="text-2xl font-black mb-2 tracking-tight">Need a Personalized Walkthrough?</h4>
              <p className="text-brand-300 text-sm font-medium mb-8 leading-relaxed">Schedule a 15-minute onboarding session with our technical team to optimize your workflow.</p>
              <button className="w-full bg-white text-brand-950 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-brand-50 transition-all flex items-center justify-center gap-2">
                Book a Live Session <ArrowUpRight className="w-4 h-4" />
              </button>
           </div>

           <div className="bg-white p-8 rounded-[32px] border border-slate-200">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-brand-600" />
                Frequently Asked Questions
              </h4>
              <div className="space-y-4">
                 {[
                   "How to update domain settings?",
                   "Changing order status flow",
                   "Integrating payment gateways",
                   "Bulk product import guide"
                 ].map((faq, i) => (
                   <button key={i} className="w-full text-left p-4 rounded-2xl border border-slate-50 hover:bg-slate-50 transition-all flex items-center justify-between group">
                      <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900">{faq}</span>
                      <ChevronRight className="w-3 h-3 text-slate-300 group-hover:text-brand-600 group-hover:translate-x-1 transition-all" />
                   </button>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const StorefrontView = ({ onBack, products }: { onBack: () => void, products: Product[] }) => {
  const [activeCategory, setActiveCategory] = useState("All Items");
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(0);

  const categories = [
    { name: "Electronics", icon: Smartphone, color: "bg-blue-50 text-blue-600" },
    { name: "Fashion", icon: Shirt, color: "bg-rose-50 text-rose-600" },
    { name: "Accessories", icon: Watch, color: "bg-amber-50 text-amber-600" },
    { name: "Smart Tech", icon: Zap, color: "bg-indigo-50 text-indigo-600" },
    { name: "Home Living", icon: Box, color: "bg-emerald-50 text-emerald-600" },
    { name: "All Items", icon: LayoutDashboard, color: "bg-slate-50 text-slate-600" },
  ];

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === "All Items" || p.category.toLowerCase().includes(activeCategory.toLowerCase());
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 animate-in fade-in duration-500 pb-20">
      {/* Search Header */}
      <div className="bg-white px-6 py-4 sticky top-0 z-50 border-b border-slate-100 flex items-center gap-4">
        <button onClick={onBack} className="p-2 hover:bg-slate-50 rounded-xl transition-all">
          <ChevronLeft className="w-6 h-6 text-slate-900" />
        </button>
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-10 pr-4 py-3 text-sm font-bold outline-none ring-2 ring-transparent focus:ring-brand-600/10 focus:border-brand-600 transition-all"
          />
        </div>
        <div className="relative">
          <ShoppingCart className="w-6 h-6 text-slate-900" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-brand-600 rounded-full text-[10px] flex items-center justify-center text-white font-black">{cartCount}</div>
        </div>
      </div>

      {/* Hero Slider */}
      <div className="p-6">
        <div className="w-full h-48 md:h-80 bg-brand-950 rounded-[32px] relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-900/50 to-transparent z-10" />
          <img 
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=2070" 
            className="absolute inset-0 w-full h-full object-cover grayscale opacity-50 group-hover:scale-110 transition-transform duration-1000"
            alt="promo"
          />
          <div className="relative z-20 h-full flex flex-col justify-center px-10 max-w-lg">
            <span className="text-brand-400 font-black text-[10px] uppercase tracking-[0.3em] mb-4">#New Arrival</span>
            <h2 className="text-3xl md:text-5xl font-black text-white leading-none mb-6 tracking-tight">Super Sale Up To 50% OFF!</h2>
            <p className="text-brand-100/60 text-sm font-bold mb-8">Upgrade your lifestyle with our premium electronics and gadgets collection.</p>
            <button className="w-max px-8 py-4 bg-white text-brand-950 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-brand-50 transition-all shadow-xl shadow-brand-600/10">
              Shop Now
            </button>
          </div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {[0, 1, 2].map(i => (
              <div key={i} className={cn("w-2 h-2 rounded-full transition-all", i === 0 ? "bg-white w-6" : "bg-white/30")} />
            ))}
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="px-6 mb-12">
        <div className="flex items-center justify-between mb-8">
           <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Shop by Category</h3>
           <button onClick={() => setActiveCategory("All Items")} className="text-[10px] font-black text-brand-600 uppercase tracking-widest hover:underline">View All</button>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((cat, i) => (
            <div 
              key={i} 
              onClick={() => setActiveCategory(cat.name)}
              className="flex flex-col items-center gap-3 shrink-0 cursor-pointer group"
            >
               <div className={cn(
                 "w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all group-hover:scale-110 group-hover:shadow-lg", 
                 cat.color,
                 activeCategory === cat.name && "ring-4 ring-brand-600/20 scale-110"
               )}>
                  <cat.icon className="w-6 h-6 md:w-8 md:h-8" />
               </div>
               <span className={cn(
                 "text-[10px] md:text-xs font-black uppercase tracking-tighter transition-colors",
                 activeCategory === cat.name ? "text-brand-600" : "text-slate-600 group-hover:text-brand-600"
               )}>{cat.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Flash Sale / Product Grid */}
      <div className="px-6 mb-12">
        <div className="flex items-center justify-between mb-8">
           <div className="flex items-center gap-4">
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                {activeCategory === "All Items" ? "Flash Sale" : activeCategory}
              </h3>
              <div className="flex gap-2">
                 {['04', '22', '15'].map((t, i) => (
                   <div key={i} className="bg-rose-500 text-white w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black">
                     {t}
                   </div>
                 ))}
              </div>
           </div>
           <button onClick={() => setActiveCategory("All Items")} className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-brand-600 transition-colors">See More</button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-[24px] md:rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
              <div className="aspect-square bg-slate-50 rounded-2xl mb-4 overflow-hidden relative">
                {product.image ? (
                  <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 shadow-inner" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <PackageIcon className="w-10 h-10 text-slate-200" />
                  </div>
                )}
                <div className="absolute top-2 right-2 md:top-3 md:right-3 p-2 bg-white/80 backdrop-blur-sm rounded-xl text-slate-400 hover:text-rose-500 transition-colors cursor-pointer">
                   <History className="w-4 h-4" />
                </div>
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{product.category}</p>
              <h4 className="text-xs md:text-sm font-black text-slate-900 mb-3 truncate transition-colors group-hover:text-brand-600">{product.name}</h4>
              <div className="flex items-center justify-between mt-auto">
                <div>
                   <p className="text-lg font-black text-slate-900 tracking-tighter">৳ {product.salePrice}</p>
                   {product.regularPrice > product.salePrice && (
                     <p className="text-[10px] font-bold text-slate-400 line-through">৳ {product.regularPrice}</p>
                   )}
                </div>
                <button 
                  onClick={() => setCartCount(prev => prev + 1)}
                  className="p-3 bg-brand-600 text-white rounded-xl shadow-lg shadow-brand-600/20 hover:scale-110 transition-all active:scale-95"
                >
                   <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          {filteredProducts.length === 0 && (
            <div className="col-span-full py-20 text-center opacity-40">
               <Search className="w-12 h-12 mx-auto mb-4" />
               <p className="font-bold uppercase tracking-widest text-xs">No products found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const EcommerceView = ({ products, setProducts, setView, setBrowsingDomain, domains, setDomains, settings, setSettings }: { 
  products: Product[], 
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>, 
  setView: (v: View) => void, 
  setBrowsingDomain: (d: Domain | null) => void, 
  domains: Domain[], 
  setDomains: React.Dispatch<React.SetStateAction<Domain[]>>,
  settings: any,
  setSettings: React.Dispatch<React.SetStateAction<any>>
}) => {
  const [activeTab, setActiveTab] = useState("settings");
  const [activeSubTab, setActiveSubTab] = useState("general");
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const logoInputRef = useRef<HTMLInputElement>(null);
  const iconInputRef = useRef<HTMLInputElement>(null);
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'logo' | 'icon') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSettings(prev => ({ ...prev, [field]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const [isAddingDomain, setIsAddingDomain] = useState(false);
  const [domainType, setDomainType] = useState<'SUBDOMAIN' | 'CUSTOM'>('SUBDOMAIN');
  const [newDomainUrl, setNewDomainUrl] = useState("");
  const [domainError, setDomainError] = useState("");
  
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [copiedDomainId, setCopiedDomainId] = useState<string | null>(null);

  const handleCopyLink = (url: string, id: string) => {
    // Generate a simulated persistent link
    const fullUrl = `${window.location.origin}${window.location.pathname}?shop=${url}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedDomainId(id);
    setTimeout(() => setCopiedDomainId(null), 2000);
  };

  const handleAddDomain = () => {
    if (!newDomainUrl) return;

    let finalInput = newDomainUrl.trim().toLowerCase();
    let finalUrl = "";

    if (domainType === 'SUBDOMAIN') {
      // Ensure no spaces or special chars for subdomain
      const cleanName = finalInput.replace(/[^a-z0-9-]/g, '');
      if (!cleanName) {
        setDomainError("Invalid shop name.");
        return;
      }
      finalUrl = `${cleanName}.bexobuilder`;
    } else {
      // Basic domain validation
      const domainRegex = /^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}$/;
      if (!domainRegex.test(finalInput)) {
        setDomainError("Please enter a valid domain (e.g. myshop.com)");
        return;
      }
      finalUrl = finalInput;
    }
    
    // Check if domain already exists
    const domainExists = domains.some(d => d.url.toLowerCase() === finalUrl.toLowerCase());
    
    if (domainExists) {
      setDomainError("This domain is already registered. Please try another one.");
      return;
    }

    const newDomain: Domain = {
      id: Math.random().toString(36).substr(2, 9),
      url: finalUrl,
      type: domainType,
      template: "Modern",
      status: 'ACTIVE',
      createdAt: new Date().toLocaleString(),
    };
    setDomains([...domains, newDomain]);
    setNewDomainUrl("");
    setDomainError("");
    setIsAddingDomain(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const tabs = [
    { id: "settings", label: "Settings", icon: Settings },
    { id: "domain", label: "Domain", icon: Globe },
    { id: "slider", label: "Slider", icon: ImageIcon },
  ];

  const subTabs = [
    { id: "general", label: "General Settings" },
  ];

  const handleDeleteDomain = (id: string) => {
    setDomains(domains.filter(d => d.id !== id));
    setActiveMenuId(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="animate-in fade-in duration-500 relative">
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-10 left-1/2 -translate-x-1/2 z-[1000] bg-emerald-600 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl flex items-center gap-3 border border-emerald-500"
          >
            <ShieldCheck className="w-5 h-5" />
            Settings updated successfully
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mb-8">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Ecommerce Management</h2>
        <p className="text-slate-500 font-medium tracking-tight">আপনার অনলাইন স্টোরটি এখান থেকে নিয়ন্ত্রণ করুন।</p>
      </div>

      <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm flex flex-col min-h-screen">
        {/* Top Level Tabs */}
        <div className="flex border-b border-slate-100 overflow-x-auto scrollbar-hide bg-slate-50/50">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-8 py-5 text-[11px] font-black uppercase tracking-widest whitespace-nowrap flex items-center gap-3 transition-all border-b-2",
                activeTab === tab.id 
                  ? "text-brand-600 border-brand-600 bg-white" 
                  : "text-slate-400 border-transparent hover:text-slate-600"
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-8 md:p-12 pb-64">
          <div className="flex items-center justify-between mb-10 pb-6 border-b border-slate-100">
            <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">
              Control Panel
            </h3>
          </div>

          {activeTab === "settings" && (
            <div className="space-y-10">
              {/* Sub-tabs */}
              <div className="flex border-b border-slate-100 overflow-x-auto scrollbar-hide mb-8">
                {subTabs.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => setActiveSubTab(sub.id)}
                    className={cn(
                      "px-6 py-4 text-xs font-black uppercase tracking-widest transition-all border-b-2 whitespace-nowrap",
                      activeSubTab === sub.id 
                        ? "text-brand-600 border-brand-600" 
                        : "text-slate-400 border-transparent hover:text-slate-600"
                    )}
                  >
                    {sub.label}
                  </button>
                ))}
              </div>

              {activeSubTab === "general" && (
                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight">General Settings</h4>
                    <button 
                      onClick={() => setIsEditing(!isEditing)}
                      className={cn(
                        "px-6 py-2.5 bg-slate-50 border rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-sm",
                        isEditing ? "border-brand-600 bg-brand-50 text-brand-600" : "border-slate-200 hover:bg-white hover:border-brand-600 hover:text-brand-600"
                      )}
                    >
                      <Settings className={cn("w-4 h-4", isEditing && "animate-spin-slow")} /> 
                      {isEditing ? "Editing Mode" : "Edit Settings"}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block">Logo</label>
                      <input 
                        type="file" 
                        ref={logoInputRef} 
                        className="hidden" 
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'logo')}
                      />
                      <div 
                        onClick={() => isEditing && logoInputRef.current?.click()}
                        className={cn(
                          "w-full h-64 bg-slate-50 border border-slate-200 rounded-[32px] flex items-center justify-center p-8 overflow-hidden group transition-all",
                          isEditing ? "cursor-pointer hover:bg-slate-100 border-dashed border-2" : "cursor-default"
                        )}
                      >
                         {settings.logo ? (
                           <img src={settings.logo} alt="Logo" className="max-w-full max-h-full object-contain" />
                         ) : (
                           <div className="w-full h-full border-2 border-dashed border-slate-200 rounded-[24px] flex flex-col items-center justify-center text-slate-300">
                              <Plus className="w-10 h-10 mb-2 opacity-50 group-hover:scale-110 transition-transform" />
                              <p className="text-[10px] uppercase font-black tracking-widest">Upload Logo</p>
                           </div>
                         )}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block">Site Icon</label>
                      <input 
                        type="file" 
                        ref={iconInputRef} 
                        className="hidden" 
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'icon')}
                      />
                      <div 
                        onClick={() => isEditing && iconInputRef.current?.click()}
                        className={cn(
                          "w-48 h-48 bg-slate-50 border border-slate-200 rounded-full flex items-center justify-center p-4 overflow-hidden group transition-all",
                          isEditing ? "cursor-pointer hover:bg-slate-100 border-dashed border-2" : "cursor-default"
                        )}
                      >
                         {settings.icon ? (
                           <img src={settings.icon} alt="Icon" className="w-full h-full object-cover rounded-full" />
                         ) : (
                           <div className="w-full h-full border-2 border-dashed border-slate-200 rounded-full flex flex-col items-center justify-center text-slate-300">
                              <Plus className="w-8 h-8 opacity-50 group-hover:scale-110 transition-transform" />
                           </div>
                         )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block px-1">Site Title</label>
                      <input 
                        type="text" 
                        disabled={!isEditing}
                        value={settings.siteTitle}
                        onChange={(e) => setSettings({...settings, siteTitle: e.target.value})}
                        placeholder="Site name"
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-brand-600/10 focus:border-brand-600 outline-none transition-all disabled:opacity-50"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block px-1">Description</label>
                      <textarea 
                        rows={1}
                        disabled={!isEditing}
                        value={settings.description}
                        onChange={(e) => setSettings({...settings, description: e.target.value})}
                        placeholder="Site short description..."
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-brand-600/10 focus:border-brand-600 outline-none transition-all resize-none disabled:opacity-50"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block px-1">Contact Email</label>
                      <input 
                        type="email" 
                        disabled={!isEditing}
                        value={settings.email}
                        onChange={(e) => setSettings({...settings, email: e.target.value})}
                        placeholder="email@business.com"
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-brand-600/10 focus:border-brand-600 outline-none transition-all disabled:opacity-50"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block px-1">Contact Phone</label>
                      <input 
                        type="tel" 
                        disabled={!isEditing}
                        value={settings.phone}
                        onChange={(e) => setSettings({...settings, phone: e.target.value})}
                        placeholder="01xxxxxxxxx"
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-brand-600/10 focus:border-brand-600 outline-none transition-all disabled:opacity-50"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block px-1">FB-Link</label>
                      <input 
                        type="text" 
                        disabled={!isEditing}
                        value={settings.facebook}
                        onChange={(e) => setSettings({...settings, facebook: e.target.value})}
                        placeholder="https://facebook.com/..."
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-brand-600/10 focus:border-brand-600 outline-none transition-all disabled:opacity-50"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block px-1">Instagram Link</label>
                      <input 
                        type="text" 
                        disabled={!isEditing}
                        value={settings.instagram}
                        onChange={(e) => setSettings({...settings, instagram: e.target.value})}
                        placeholder="https://instagram.com/..."
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-brand-600/10 focus:border-brand-600 outline-none transition-all disabled:opacity-50"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block px-1">Youtube Link</label>
                      <input 
                        type="text" 
                        disabled={!isEditing}
                        value={settings.youtube}
                        onChange={(e) => setSettings({...settings, youtube: e.target.value})}
                        placeholder="https://youtube.com/..."
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-brand-600/10 focus:border-brand-600 outline-none transition-all disabled:opacity-50"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block px-1">Address</label>
                      <textarea 
                        rows={1}
                        disabled={!isEditing}
                        value={settings.address}
                        onChange={(e) => setSettings({...settings, address: e.target.value})}
                        placeholder="Business address"
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-brand-600/10 focus:border-brand-600 outline-none transition-all resize-none disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <div className="pt-10 flex justify-end">
                    <button 
                      onClick={handleSave}
                      disabled={!isEditing}
                      className="px-12 py-5 bg-brand-600 text-white rounded-3xl font-black text-xs uppercase tracking-[0.2em] hover:bg-brand-700 transition-all shadow-2xl shadow-brand-600/30 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Save All Changes
                    </button>
                  </div>
                </div>
              )}

              {activeSubTab !== "general" && (
                <div className="flex-1 flex flex-col items-center justify-center text-center opacity-40 py-20 animate-in fade-in duration-300">
                  <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                    <Settings className="w-10 h-10 text-slate-400 animate-spin-slow" />
                  </div>
                  <h5 className="text-xl font-black text-slate-900 uppercase tracking-tight">{activeSubTab} Ecosystem</h5>
                  <p className="text-sm font-bold text-slate-500 mt-2">The architecture for this module is being refined.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "domain" && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center justify-between">
                <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Domain Management</h4>
                <button 
                  onClick={() => setIsAddingDomain(!isAddingDomain)}
                  className="px-8 py-3 bg-brand-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-3 hover:bg-brand-700 transition-all shadow-lg shadow-brand-600/25 active:scale-95"
                >
                  <Plus className="w-4 h-4" /> Add Domain
                </button>
              </div>

              {isAddingDomain && (
                <div className="bg-slate-50 p-10 rounded-[40px] border border-slate-200 animate-in zoom-in-95 duration-300 relative shadow-2xl shadow-slate-200/50">
                  <div className="absolute top-6 right-6">
                    <button onClick={() => setIsAddingDomain(false)} className="p-2 hover:bg-white rounded-xl transition-all">
                       <X className="w-6 h-6 text-slate-400" />
                    </button>
                  </div>
                  
                  <div className="flex flex-col gap-8">
                    <div>
                      <h5 className="text-[11px] font-black text-brand-600 uppercase tracking-[0.2em] mb-4 px-2">Choose Domain Type</h5>
                      <div className="flex gap-4 p-1 bg-white border border-slate-200 rounded-2xl w-fit">
                        <button 
                          onClick={() => { setDomainType('SUBDOMAIN'); setDomainError(""); }}
                          className={cn(
                            "px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                            domainType === 'SUBDOMAIN' ? "bg-brand-600 text-white shadow-lg shadow-brand-600/30" : "text-slate-400 hover:text-slate-600"
                          )}
                        >
                          Free Subdomain
                        </button>
                        <button 
                          onClick={() => { setDomainType('CUSTOM'); setDomainError(""); }}
                          className={cn(
                            "px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                            domainType === 'CUSTOM' ? "bg-brand-600 text-white shadow-lg shadow-brand-600/30" : "text-slate-400 hover:text-slate-600"
                          )}
                        >
                          Custom Domain
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-1 space-y-3">
                        <div className="relative">
                          <input 
                            type="text" 
                            value={newDomainUrl}
                            onChange={(e) => {
                              setNewDomainUrl(e.target.value);
                              if (domainError) setDomainError("");
                            }}
                            placeholder={domainType === 'SUBDOMAIN' ? "shop-name" : "myshop.com"}
                            className={cn(
                              "w-full px-8 py-5 bg-white border rounded-2xl text-base font-bold outline-none transition-all",
                              domainType === 'SUBDOMAIN' ? "pr-36" : "pr-8",
                              domainError 
                                ? "border-rose-500 focus:ring-4 focus:ring-rose-600/10" 
                                : "border-slate-200 focus:ring-4 focus:ring-brand-600/10 focus:border-brand-600"
                            )}
                          />
                          {domainType === 'SUBDOMAIN' && (
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest pointer-events-none">
                               .bexobuilder
                            </div>
                          )}
                        </div>
                        {domainError && (
                          <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest mt-2 px-2">
                            {domainError}
                          </p>
                        )}
                        <p className="text-[10px] font-bold text-slate-400 px-2 italic">
                          {domainType === 'SUBDOMAIN' ? (
                            <>Visitor link: <span className="text-brand-600 font-black">{newDomainUrl.trim().replace(/[^a-z0-9-]/g, '').toLowerCase() || 'myshop'}.bexobuilder</span></>
                          ) : (
                            <>Connect your existing domain to Bexobuilder.</>
                          )}
                        </p>
                      </div>
                      <button 
                        onClick={handleAddDomain}
                        className="px-10 py-5 bg-brand-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-brand-700 transition-all shadow-xl shadow-brand-600/20 active:scale-95 self-start"
                      >
                        {domainType === 'SUBDOMAIN' ? "Create Free Link" : "Activate Domain"}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-6">
                <h5 className="text-xl font-black text-slate-800 uppercase tracking-tight">Existing Domains</h5>
                <div className="bg-white border border-slate-100 rounded-[32px] overflow-visible mb-12">
                  <div className="scrollbar-hide overflow-visible">
                    <table className="w-full text-[11px] font-black uppercase tracking-widest min-w-[800px]">
                      <thead>
                        <tr className="border-b border-slate-100 bg-slate-50/50">
                          <th className="px-8 py-6 text-left text-slate-400 font-black">Domain</th>
                          <th className="px-8 py-6 text-left text-slate-400 font-black">Type</th>
                          <th className="px-8 py-6 text-left text-slate-400 font-black">Template</th>
                          <th className="px-8 py-6 text-left text-slate-400 font-black">Status</th>
                          <th className="px-8 py-6 text-left text-slate-400 font-black">Created</th>
                          <th className="px-8 py-6 text-right text-slate-400 font-black pr-12">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {domains.map((domain) => (
                          <tr key={domain.id} className="group hover:bg-slate-50/20 transition-all">
                            <td className="px-8 py-8">
                              <button 
                                onClick={() => setBrowsingDomain(domain)}
                                className="text-slate-700 font-black lowercase tracking-tight hover:text-brand-600 hover:underline decoration-2 underline-offset-4 transition-all flex items-center gap-2 group/link"
                              >
                                {domain.url}
                                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                              </button>
                            </td>
                            <td className="px-8 py-8">
                               <span className={cn(
                                 "px-3 py-1.5 rounded-lg text-[9px] font-black tracking-widest uppercase border transition-all",
                                 domain.type === 'CUSTOM' ? "bg-brand-50 text-brand-600 border-brand-100" : "bg-slate-50 text-slate-400 border-slate-100"
                               )}>
                                 {domain.type || 'SUBDOMAIN'}
                               </span>
                            </td>
                            <td className="px-8 py-8 text-slate-400 font-black">{domain.template}</td>
                            <td className="px-8 py-8">
                              <span className="px-4 py-2 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-xl text-[10px] font-black tracking-widest shadow-sm">
                                {domain.status}
                              </span>
                            </td>
                            <td className="px-8 py-8 text-slate-500 font-bold">{domain.createdAt}</td>
                            <td className="px-8 py-8 text-right relative pr-12">
                              <div className="flex justify-end">
                                <button 
                                  onClick={() => setActiveMenuId(activeMenuId === domain.id ? null : domain.id)}
                                  className={cn(
                                    "p-3 rounded-2xl transition-all shadow-sm active:scale-95",
                                    activeMenuId === domain.id ? "bg-brand-600 text-white" : "bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                                  )}
                                >
                                  <SlidersHorizontal className="w-4 h-4" />
                                </button>
                              </div>

                              <AnimatePresence>
                                {activeMenuId === domain.id && (
                                  <>
                                    <div className="fixed inset-0 z-[80]" onClick={() => setActiveMenuId(null)} />
                                    <motion.div 
                                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                      animate={{ opacity: 1, scale: 1, x: 0 }}
                                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                      className="absolute right-0 top-full mt-2 w-64 bg-white rounded-[32px] shadow-[0_20px_70px_rgba(0,0,0,0.25)] border border-slate-100 p-2.5 z-[90] origin-top-right ring-1 ring-slate-100"
                                    >
                                      <button 
                                        onClick={() => {
                                          setBrowsingDomain(domain);
                                          setActiveMenuId(null);
                                        }}
                                        className="w-full flex items-center gap-4 px-4 py-4 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 rounded-[24px] transition-all group"
                                      >
                                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors">
                                          <Globe className="w-5 h-5" />
                                        </div>
                                        Browse Store
                                      </button>
                                      <button 
                                        onClick={() => handleCopyLink(domain.url, domain.id)}
                                        className="w-full flex items-center gap-4 px-4 py-4 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 rounded-[24px] transition-all group"
                                      >
                                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors">
                                          {copiedDomainId === domain.id ? <Check className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
                                        </div>
                                        {copiedDomainId === domain.id ? "Link Copied!" : "Copy Store Link"}
                                      </button>
                                      <div className="h-px bg-slate-50 my-2 mx-4" />
                                      <button 
                                        onClick={() => handleDeleteDomain(domain.id)}
                                        className="w-full flex items-center gap-4 px-4 py-4 text-[10px] font-black uppercase tracking-widest text-rose-500 hover:bg-rose-50 rounded-[24px] transition-all group"
                                      >
                                        <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-400 group-hover:bg-rose-100 group-hover:text-rose-600 transition-colors">
                                          <Trash2 className="w-5 h-5" />
                                        </div>
                                        Delete Domain
                                      </button>
                                    </motion.div>
                                  </>
                                )}
                              </AnimatePresence>
                            </td>
                          </tr>
                        ))}
                        {domains.length === 0 && (
                          <tr>
                            <td colSpan={5} className="px-8 py-32 text-center text-slate-300 font-black uppercase tracking-widest">
                              <div className="flex flex-col items-center gap-4">
                                <Globe className="w-12 h-12 opacity-20" />
                                No domains listed in your ecosystem.
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "slider" && (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-32 animate-in fade-in duration-300">
              <div className="w-24 h-24 bg-brand-50 rounded-[32px] flex items-center justify-center mb-8 border border-brand-100">
                <ImageIcon className="w-10 h-10 text-brand-600" />
              </div>
              <h4 className="text-lg font-black text-slate-800 uppercase tracking-tight mb-2">Slider Management</h4>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest max-w-xs">
                Configure your store banners and promotional sliders from this module.
              </p>
            </div>
          )}

          {activeTab !== "settings" && activeTab !== "domain" && activeTab !== "slider" && (
            <div className="flex-1 flex flex-col items-center justify-center text-center opacity-40 py-24 animate-in fade-in duration-300">
              <div className="w-24 h-24 bg-slate-100 rounded-[32px] flex items-center justify-center mb-8">
                 <Store className="w-12 h-12 text-slate-400" />
              </div>
              <h5 className="text-2xl font-black text-slate-900 uppercase tracking-tight">{activeTab} Interface</h5>
              <p className="text-sm font-bold text-slate-500 mt-4 max-w-sm mx-auto">This section is currently being architected for maximum performance and user engagement.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const StorefrontPreview = ({ domain, products, onClose, settings, isPublic = false }: { domain: Domain, products: Product[], onClose: () => void, settings: any, isPublic?: boolean }) => {
  const [cart, setCart] = useState<{product: Product, quantity: number}[]>([]);
  const [activeCategory, setActiveCategory] = useState("All Items");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [customerInfo, setCustomerInfo] = useState({ name: "", phone: "", address: "", paymentMethod: "Cash On Delivery" });

  const categories = [
    { name: "Electronics", icon: Smartphone, color: "bg-blue-50 text-blue-600" },
    { name: "Fashion", icon: Shirt, color: "bg-rose-50 text-rose-600" },
    { name: "Accessories", icon: Watch, color: "bg-amber-50 text-amber-600" },
    { name: "Smart Tech", icon: Zap, color: "bg-indigo-50 text-indigo-600" },
    { name: "Home Living", icon: Box, color: "bg-emerald-50 text-emerald-600" },
    { name: "All Items", icon: LayoutDashboard, color: "bg-slate-50 text-slate-600" },
  ];

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === "All Items" || p.category.toLowerCase().includes(activeCategory.toLowerCase());
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const cartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  const cartTotal = cart.reduce((acc, curr) => acc + (curr.product.salePrice * curr.quantity), 0);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.product.id !== id));
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep(3); // Show success
    setTimeout(() => {
      setIsCheckoutOpen(false);
      setCart([]);
      setCheckoutStep(1);
    }, 3000);
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[500] bg-white overflow-y-auto selection:bg-brand-600 selection:text-white"
    >
      {/* Simulation Header */}
      {!isPublic && (
        <div className="bg-slate-900 text-white px-4 py-2 flex items-center justify-between sticky top-0 z-[510]">
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-widest opacity-60">Visitor Mode (Customer Console)</span>
           </div>
           <button 
             onClick={onClose}
             className="text-[9px] font-black uppercase tracking-widest bg-white/10 px-3 py-1 rounded-lg hover:bg-white/20 transition-all font-mono"
           >
             [X] EXIT STORE & RETURN TO DASHBOARD
           </button>
        </div>
      )}

      <div className="min-h-screen">
        {/* Search Header */}
        <div className={cn(
          "bg-white/90 backdrop-blur-md px-6 py-6 sticky z-[509] border-b border-slate-100 flex items-center gap-4 justify-between lg:px-12",
          !isPublic ? "top-[28px]" : "top-0"
        )}>
          <div className="flex items-center gap-4">
             <h1 className="text-xl md:text-2xl font-black text-brand-950 uppercase tracking-tighter">
               {settings.siteTitle.split(' ')[0]}<span className="text-brand-600">{settings.siteTitle.split(' ').slice(1).join('') ? `.${settings.siteTitle.split(' ').slice(1).join('')}` : '.com'}</span>
             </h1>
          </div>

        <div className="flex-1 max-w-2xl relative hidden md:block">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search products, brands and more..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-100 rounded-3xl pl-14 pr-6 py-4 text-sm font-bold outline-none ring-offset-2 focus:ring-4 focus:ring-brand-600/10 focus:border-brand-600 transition-all"
          />
        </div>

        <div className="flex items-center gap-6">
           <div className="hidden lg:flex flex-col text-right items-end">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Store URL</span>
              <span className="text-xs font-bold text-slate-900 lowercase tracking-tight">{domain.url}</span>
           </div>
           <div className="relative cursor-pointer group" onClick={() => setIsCheckoutOpen(true)}>
              <ShoppingCart className="w-6 h-6 text-slate-900 group-hover:scale-110 transition-transform" />
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-brand-600 text-white rounded-full text-[10px] font-black flex items-center justify-center border-2 border-white">
                {cartCount}
              </div>
           </div>
           <button className="px-6 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-slate-950/10 active:scale-95 transition-all">
             Log In
           </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-white scrollbar-hide pb-20">
        {/* Banner Section */}
        <div className="p-4 md:p-8">
           <div className="w-full h-56 md:h-[450px] bg-slate-100 rounded-[40px] relative overflow-hidden group shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2070" 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                alt="banner"
              />
              <div className="absolute inset-0 bg-black/20" />
              <div className="relative z-10 h-full flex flex-col justify-center px-12 md:px-24">
                <span className="bg-brand-600 text-white font-black text-[10px] uppercase tracking-[0.3em] px-4 py-2 rounded-full w-max mb-6 animate-in slide-in-from-left duration-500">#Big Fashion Sale</span>
                <h2 className="text-4xl md:text-7xl font-black text-white leading-[0.9] mb-6 tracking-tighter max-w-md animate-in slide-in-from-left-4 duration-700">
                  Limited Time Offer! <br /> Up to 50% OFF!
                </h2>
                <p className="text-white/80 text-sm md:text-lg font-bold mb-10 tracking-tight animate-in slide-in-from-left-8 duration-1000">Redefine your everyday style with our premium essentials.</p>
                <div className="flex gap-4">
                  <button className="px-10 py-5 bg-white text-slate-950 rounded-3xl font-black text-[11px] uppercase tracking-widest shadow-2xl hover:bg-brand-50 transition-all active:scale-95">Shop Now</button>
                  <button className="px-10 py-5 bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-3xl font-black text-[11px] uppercase tracking-widest hover:bg-white/30 transition-all active:scale-95">Explore Collection</button>
                </div>
              </div>
           </div>
        </div>

        {/* Categories Section */}
        <div className="px-8 mb-16">
           <div className="flex gap-4 md:gap-10 overflow-x-auto pb-6 scrollbar-hide py-4 px-2">
              {categories.map((cat, i) => (
                <div 
                  key={i} 
                  onClick={() => setActiveCategory(cat.name)}
                  className="flex flex-col items-center gap-4 shrink-0 cursor-pointer group"
                >
                   <div className={cn(
                     "w-16 h-16 md:w-24 md:h-24 rounded-full flex items-center justify-center transition-all group-hover:scale-110 group-hover:shadow-xl shadow-sm border border-slate-50", 
                     cat.color,
                     activeCategory === cat.name && "ring-4 ring-brand-600/20 scale-110 shadow-lg"
                   )}>
                      <cat.icon className="w-6 h-6 md:w-10 md:h-10 transition-transform group-hover:rotate-6" />
                   </div>
                   <span className={cn(
                     "text-[10px] md:text-xs font-black uppercase tracking-tighter transition-colors",
                     activeCategory === cat.name ? "text-brand-600" : "text-slate-950 hover:text-brand-600"
                   )}>{cat.name}</span>
                </div>
              ))}
           </div>
        </div>

        {/* Product Grid Section */}
        <div className="px-8 pb-32">
           <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-6">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-rose-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-rose-500/20">
                       <Zap className="w-5 h-5 fill-current" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
                      {activeCategory === "All Items" ? "Flash Sale" : activeCategory}
                    </h3>
                 </div>
                 <div className="flex items-center gap-3 bg-rose-50 px-4 py-2 rounded-2xl border border-rose-100">
                    <div className="flex gap-2">
                       {['04', '22', '15'].map((t, i) => (
                          <React.Fragment key={i}>
                             <div className="text-xs font-black text-rose-600">{t}</div>
                             {i < 2 && <div className="text-xs font-black text-rose-300">:</div>}
                          </React.Fragment>
                       ))}
                    </div>
                 </div>
              </div>
              <button 
                onClick={() => setActiveCategory("All Items")}
                className="px-8 py-4 bg-slate-50 text-slate-500 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-brand-600 hover:text-white transition-all active:scale-95"
              >
                All Items
              </button>
           </div>

           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {filteredProducts.map((product) => (
                <div 
                  key={product.id} 
                  className="bg-white p-5 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-2xl transition-all group relative overflow-hidden"
                >
                  <div 
                    onClick={() => setSelectedProduct(product)}
                    className="aspect-[4/5] bg-slate-50 rounded-[30px] mb-6 overflow-hidden relative border border-slate-50 cursor-pointer"
                  >
                    {product.image ? (
                      <img 
                        src={product.image} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <PackageIcon className="w-12 h-12 text-slate-200" />
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-2.5 rounded-2xl text-slate-400 hover:text-rose-500 transition-colors shadow-sm cursor-pointer active:scale-90">
                       <History className="w-5 h-5" />
                    </div>
                    <div className="absolute top-4 left-4">
                       <div className="bg-brand-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl text-[9px] font-black text-white uppercase tracking-widest border border-white/10">
                          {product.category}
                       </div>
                    </div>
                  </div>
                  
                  <div className="px-2">
                    <div className="mb-6">
                       <h4 onClick={() => setSelectedProduct(product)} className="text-xs md:text-sm font-black text-slate-950 mb-1 truncate group-hover:text-brand-600 transition-colors cursor-pointer">{product.name}</h4>
                       <div className="w-full h-1 bg-slate-50 rounded-full mt-2 overflow-hidden">
                          <div className={cn("h-full bg-brand-600 rounded-full", (product.stock > 10 ? "w-2/3" : "w-1/3"))} />
                       </div>
                       <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">Only {product.stock} Items Left</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xl font-black text-brand-950 tracking-tighter">৳ {product.salePrice}</p>
                        {product.regularPrice > product.salePrice && (
                          <p className="text-[10px] font-bold text-slate-400 line-through">৳ {product.regularPrice}</p>
                        )}
                      </div>
                      <button 
                        onClick={() => addToCart(product)}
                        className="p-3.5 bg-brand-600 text-white rounded-[20px] shadow-lg shadow-brand-600/20 hover:scale-110 active:scale-90 transition-all font-black text-[10px]"
                      >
                         <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
           </div>
           
           {filteredProducts.length === 0 && (
             <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                   <Search className="w-8 h-8 text-slate-300" />
                </div>
                <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight">No products found</h4>
                <p className="text-slate-500 font-medium">Try searching for something else or change the category.</p>
             </div>
           )}
        </div>
      </div>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
             <motion.div 
               initial={{ scale: 0.9, opacity: 0, y: 20 }}
               animate={{ scale: 1, opacity: 1, y: 0 }}
               exit={{ scale: 0.9, opacity: 0, y: 20 }}
               className="bg-white w-full max-w-4xl rounded-[40px] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
             >
                <div className="md:w-1/2 bg-slate-50 relative p-8 flex items-center justify-center">
                   {selectedProduct.image ? (
                     <img src={selectedProduct.image} className="w-full h-auto max-h-[400px] object-contain drop-shadow-2xl" alt={selectedProduct.name} />
                   ) : (
                     <PackageIcon className="w-32 h-32 text-slate-200" />
                   )}
                   <button onClick={() => setSelectedProduct(null)} className="absolute top-6 left-6 p-3 bg-white rounded-2xl shadow-lg">
                      <ChevronLeft className="w-6 h-6 text-slate-900" />
                   </button>
                </div>
                <div className="md:w-1/2 p-10 flex flex-col">
                   <div className="mb-8">
                     <span className="px-4 py-2 bg-brand-50 text-brand-600 rounded-xl text-[10px] font-black uppercase tracking-widest">{selectedProduct.category}</span>
                     <h3 className="text-3xl font-black text-slate-900 mt-4 mb-2 tracking-tight leading-tight">{selectedProduct.name}</h3>
                     <div className="flex items-center gap-4">
                        <span className="text-3xl font-black text-brand-600 tracking-tighter">৳ {selectedProduct.salePrice}</span>
                        {selectedProduct.regularPrice > selectedProduct.salePrice && (
                          <span className="text-lg font-bold text-slate-400 line-through italic">৳ {selectedProduct.regularPrice}</span>
                        )}
                     </div>
                   </div>
                   
                   <div className="space-y-6 mb-10 overflow-y-auto">
                     <div>
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Description</h4>
                        <p className="text-sm font-medium text-slate-600 leading-relaxed">
                          Premium quality {selectedProduct.name} from our latest collection. 
                          Built for performance and reliability. Get yours today at {domain.url}. 
                          Limited stock available!
                        </p>
                     </div>
                     <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <Zap className="w-5 h-5 text-rose-500" />
                        <span className="text-xs font-bold text-slate-700">Express Shipping Available (2-3 Days)</span>
                     </div>
                   </div>

                   <div className="mt-auto flex gap-4">
                      <button 
                        onClick={() => {
                          addToCart(selectedProduct);
                          setSelectedProduct(null);
                        }}
                        className="flex-1 py-5 bg-slate-100 text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all"
                      >
                         Add To Cart
                      </button>
                      <button 
                        onClick={() => {
                          addToCart(selectedProduct);
                          setIsCheckoutOpen(true);
                          setSelectedProduct(null);
                        }}
                        className="flex-[2] py-5 bg-brand-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-brand-600/20 hover:bg-brand-700 transition-all"
                      >
                         Buy It Now
                      </button>
                   </div>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Cart & Checkout Sidebar */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-[400] flex justify-end">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setIsCheckoutOpen(false)}
               className="absolute inset-0 bg-black/40 backdrop-blur-sm"
             />
             <motion.div 
               initial={{ x: "100%" }}
               animate={{ x: 0 }}
               exit={{ x: "100%" }}
               transition={{ type: "spring", damping: 30, stiffness: 300 }}
               className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col"
             >
                <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center text-white">
                         <ShoppingCart className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Your Cart</h3>
                   </div>
                   <button onClick={() => setIsCheckoutOpen(false)} className="p-2 hover:bg-slate-50 rounded-xl">
                      <X className="w-6 h-6 text-slate-400" />
                   </button>
                </div>

                <div className="flex-1 overflow-y-auto p-8 space-y-6">
                   {checkoutStep === 1 ? (
                     <>
                       {cart.length === 0 ? (
                         <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                            <ShoppingBag className="w-16 h-16 mb-4" />
                            <p className="font-bold">Your cart is empty</p>
                         </div>
                       ) : (
                         <div className="space-y-6">
                            {cart.map((item) => (
                              <div key={item.product.id} className="flex gap-4 group">
                                 <div className="w-20 h-20 bg-slate-50 rounded-2xl overflow-hidden shrink-0">
                                    <img src={item.product.image} className="w-full h-full object-cover" alt={item.product.name} />
                                 </div>
                                 <div className="flex-1">
                                    <h4 className="font-black text-slate-900 text-sm tracking-tight">{item.product.name}</h4>
                                    <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">{item.product.category}</p>
                                    <div className="flex items-center justify-between mt-3">
                                       <span className="font-black text-brand-600">৳ {item.product.salePrice}</span>
                                       <div className="flex items-center gap-4">
                                          <button onClick={() => removeFromCart(item.product.id)} className="text-[10px] font-black text-rose-500 uppercase tracking-widest hover:underline">Remove</button>
                                          <span className="bg-slate-50 px-3 py-1 rounded-lg text-xs font-black">x{item.quantity}</span>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                            ))}
                         </div>
                       )}
                     </>
                   ) : checkoutStep === 2 ? (
                     <form id="checkout-form" onSubmit={handleCheckout} className="space-y-6">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block px-1">Full Name</label>
                           <input 
                             required
                             type="text" 
                             value={customerInfo.name}
                             onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                             placeholder="Enter your name"
                             className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:bg-white focus:border-brand-600 transition-all"
                           />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block px-1">Phone Number</label>
                           <input 
                             required
                             type="tel" 
                             value={customerInfo.phone}
                             onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                             placeholder="Enter phone number"
                             className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:bg-white focus:border-brand-600 transition-all"
                           />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block px-1">Shipping Address</label>
                           <textarea 
                             required
                             rows={4}
                             value={customerInfo.address}
                             onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                             placeholder="Street, House, City..."
                             className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:bg-white focus:border-brand-600 transition-all resize-none"
                           />
                        </div>
                        <div className="space-y-3">
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block px-1">Payment Method</label>
                           <div className="grid grid-cols-2 gap-3">
                              {['Cash On Delivery', 'bKash'].map((m) => (
                                <button 
                                  key={m}
                                  type="button"
                                  onClick={() => setCustomerInfo({...customerInfo, paymentMethod: m})}
                                  className={cn(
                                    "p-4 rounded-2xl border text-[10px] font-black uppercase tracking-widest transition-all",
                                    customerInfo.paymentMethod === m ? "bg-brand-600 text-white border-brand-600 shadow-lg shadow-brand-600/20" : "bg-slate-50 text-slate-400 border-slate-100 hover:border-brand-200"
                                  )}
                                >
                                  {m}
                                </button>
                              ))}
                           </div>
                        </div>
                     </form>
                   ) : (
                     <div className="h-full flex flex-col items-center justify-center text-center">
                        <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-6 animate-bounce">
                           <Check className="w-10 h-10" />
                        </div>
                        <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-2">Order Confirmed!</h4>
                        <p className="text-slate-500 font-medium">Thank you for your purchase. We'll contact you soon.</p>
                     </div>
                   )}
                </div>

                {cart.length > 0 && checkoutStep !== 3 && (
                  <div className="p-8 border-t border-slate-100 bg-slate-50/50">
                     <div className="space-y-4 mb-8">
                        <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                           <span>Subtotal</span>
                           <span>৳ {cartTotal}</span>
                        </div>
                        <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                           <span>Shipping</span>
                           <span>৳ 60</span>
                        </div>
                        <div className="h-px bg-slate-200" />
                        <div className="flex justify-between text-xl font-black text-slate-900 tracking-tight">
                           <span>Total</span>
                           <span className="text-brand-600">৳ {cartTotal + 60}</span>
                        </div>
                     </div>
                     {checkoutStep === 1 ? (
                        <button 
                          onClick={() => setCheckoutStep(2)}
                          className="w-full py-5 bg-brand-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-brand-600/20 hover:bg-brand-700 transition-all flex items-center justify-center gap-2"
                        >
                           Go To Checkout <ChevronRight className="w-4 h-4" />
                        </button>
                     ) : (
                        <div className="flex gap-4">
                           <button 
                            onClick={() => setCheckoutStep(1)}
                            className="flex-1 py-5 bg-white border border-slate-200 text-slate-600 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all"
                           >
                             Back
                           </button>
                           <button 
                            form="checkout-form"
                            type="submit"
                            className="flex-[2] py-5 bg-brand-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-brand-600/20 hover:bg-brand-700 transition-all"
                           >
                             Confirm Order
                           </button>
                        </div>
                     )}
                  </div>
                )}
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  </motion.div>
  );
};

const PackagesView = () => {
  const plans = [
    { duration: "১ মাস", price: 350, originalPrice: 500, label: "Basic", color: "bg-slate-100", textColor: "text-slate-600" },
    { duration: "২ মাস", price: 650, originalPrice: 1000, label: "Starter", color: "bg-blue-50", textColor: "text-blue-600" },
    { duration: "৩ মাস", price: 950, originalPrice: 1500, label: "Popular", color: "bg-indigo-50", textColor: "text-indigo-600", recommended: true },
    { duration: "৬ মাস", price: 1800, originalPrice: 3000, label: "Advanced", color: "bg-brand-50", textColor: "text-brand-600" },
    { duration: "১ বছর", price: 3200, originalPrice: 6000, label: "Business", color: "bg-emerald-50", textColor: "text-emerald-600" },
    { duration: "আজীবন (Lifetime)", price: 6000, originalPrice: 15000, label: "VIP", color: "bg-brand-950", textColor: "text-white", vip: true },
  ];

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-10 text-center sm:text-left">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">সাবস্ক্রিপশন প্যাকেজসমূহ</h2>
        <p className="text-slate-500 font-bold mt-2">আপনার ব্যবসার প্রয়োজন অনুযায়ী সেরা প্যাকেজটি বেছে নিন।</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={cn(
              "p-8 rounded-[40px] border border-slate-200 shadow-sm relative overflow-hidden group cursor-pointer transition-all hover:shadow-2xl hover:scale-[1.02]",
              plan.recommended ? "ring-4 ring-brand-600/10 border-brand-600" : "",
              plan.vip ? plan.color : "bg-white"
            )}
          >
            {plan.recommended && (
              <div className="absolute top-6 right-6 px-3 py-1 bg-brand-600 rounded-full text-[10px] font-black text-white uppercase tracking-widest shadow-lg shadow-brand-600/20">
                Recommended
              </div>
            )}
            
            <div className={cn("inline-block px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6", plan.vip ? "bg-white/10 text-white" : "bg-slate-100 text-slate-400")}>
              {plan.label} Plan
            </div>

            <h3 className={cn("text-2xl font-black mb-1", plan.vip ? "text-white" : "text-slate-900")}>{plan.duration}</h3>
            <div className="flex items-baseline gap-2 mb-6">
              <span className={cn("text-4xl font-black", plan.vip ? "text-white" : "text-slate-900")}>{formatCurrency(plan.price)}</span>
              <span className={cn("text-sm font-bold line-through opacity-50", plan.vip ? "text-white" : "text-slate-400")}>{formatCurrency(plan.originalPrice)}</span>
            </div>

            <div className="space-y-4 mb-8">
              <div className={cn("flex items-center gap-3", plan.vip ? "text-white/80" : "text-slate-500")}>
                <ShieldCheck className="w-4 h-4 text-brand-500" />
                <span className="text-xs font-bold">সকল প্রিমিয়াম ফিচার</span>
              </div>
              <div className={cn("flex items-center gap-3", plan.vip ? "text-white/80" : "text-slate-500")}>
                <ShieldCheck className="w-4 h-4 text-brand-500" />
                <span className="text-xs font-bold">২৪/৭ কাস্টমার সাপোর্ট</span>
              </div>
               {plan.vip && (
                <div className="flex items-center gap-3 text-brand-400">
                  <Plus className="w-4 h-4" />
                  <span className="text-xs font-black uppercase tracking-widest">ফুল কাস্টমাইজেশন সুবিধা</span>
                </div>
              )}
            </div>

            <button className={cn(
              "w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all",
              plan.vip 
                ? "bg-white text-brand-950 hover:bg-slate-100" 
                : plan.recommended
                  ? "bg-brand-600 text-white hover:bg-brand-700 shadow-xl shadow-brand-600/20"
                  : "bg-slate-900 text-white hover:bg-slate-800"
            )}>
              এখনই কিনুন
            </button>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 p-10 bg-brand-950 text-white rounded-[48px] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-600/10 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="relative z-10 text-center md:text-left">
          <h3 className="text-2xl font-black mb-2 uppercase tracking-tight">প্যাকেজ কাস্টমাইজ করতে চান?</h3>
          <p className="text-brand-400 font-bold">আপনার ব্যবসার প্রয়োজন অনুযায়ী সব ফিচার পেতে যোগাযোগ করুন আমাদের টিমের সাথে।</p>
        </div>
        <button className="relative z-10 px-8 py-4 bg-brand-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-brand-700 transition-all shadow-xl shadow-brand-600/20 active:scale-95 whitespace-nowrap">
           Contact Sales
        </button>
      </div>
    </div>
  );
};



export default function App() {
  // Initialize state from localStorage
  const getInitialDomains = (): Domain[] => {
    const saved = localStorage.getItem('bexobuilder_domains');
    if (!saved) return [];
    try {
      const parsed = JSON.parse(saved) as Domain[];
      return parsed.map(d => ({
        ...d,
        type: d.type || (d.url.endsWith('.bexobuilder') ? 'SUBDOMAIN' : 'CUSTOM')
      }));
    } catch (e) {
      return [];
    }
  };

  const [activeView, setView] = useState<View>("dashboard");
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [stakeholders, setStakeholders] = useState<Stakeholder[]>(MOCK_CUSTOMERS);
  const [browsingDomain, setBrowsingDomain] = useState<Domain | null>(null);
  const [domains, setDomains] = useState<Domain[]>(getInitialDomains());

  const getInitialSettings = () => {
    const saved = localStorage.getItem('bexobuilder_settings');
    return saved ? JSON.parse(saved) : {
      siteTitle: "Bexo Builder Marketplace",
      description: "Your comprehensive solutions for modern business growth and management.",
      email: "support@bexobuilder.io",
      phone: "+880 1700-000000",
      facebook: "https://facebook.com/bexobuilder",
      instagram: "https://instagram.com/bexobuilder",
      youtube: "https://youtube.com/@bexobuilder",
      address: "Bexo Tower, Dhaka, Bangladesh",
      logo: "",
      icon: ""
    };
  };

  const [settings, setSettings] = useState(getInitialSettings());

  // Handle persistence
  useEffect(() => {
    localStorage.setItem('bexobuilder_domains', JSON.stringify(domains));
  }, [domains]);

  useEffect(() => {
    localStorage.setItem('bexobuilder_settings', JSON.stringify(settings));
  }, [settings]);

  // Check for public store routing
  const [publicStoreDomain, setPublicStoreDomain] = useState<Domain | null>(null);
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const shopUrl = params.get('shop');
    if (shopUrl) {
      const found = domains.find(d => d.url === shopUrl);
      if (found) {
        setPublicStoreDomain(found);
      }
    }
  }, [domains]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { id: "1", title: "Cash On Delivari", paymentType: "Cash On Delivari", debitAccount: "Cash(101)", status: "Active", multipleTypes: false, provider: "Self" }
  ]);
  const [categories, setCategories] = useState<Category[]>([
    { id: "1", name: "গ্যাজেট" },
    { id: "2", name: "টুলস ও এক্সেসরিজ" },
    { id: "3", name: "beslet" },
    { id: "4", name: "সুন্দরবনের মধু" },
  ]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isSuperAdminLoggedIn, setIsSuperAdminLoggedIn] = useState(false);
  const [adminAccessCode, setAdminAccessCode] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [phone, setPhone] = useState("");
  const [registrationDate] = useState(new Date());

  // Super Admin Data
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [packages, setPackages] = useState<Package[]>(MOCK_PACKAGES);
  const [paymentRequests, setPaymentRequests] = useState<PaymentRequest[]>(MOCK_PAYMENTS);

  const daysUsed = Math.floor((new Date().getTime() - registrationDate.getTime()) / (1000 * 60 * 60 * 24));
  const trialDaysLeft = Math.max(0, 7 - daysUsed);
  const isTrialActive = trialDaysLeft > 0;
  
  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAdminMode) {
      if (email === "admin@bexobuilder.com" && password === "admin123" && adminAccessCode === "778899") {
        setIsSuperAdminLoggedIn(true);
        setView("admin-dashboard");
      } else {
        alert("Invalid Admin Credentials");
      }
    } else {
      if (email && password) {
        setIsLoggedIn(true);
      }
    }
  };

  if (publicStoreDomain) {
    return (
      <StorefrontPreview 
        domain={publicStoreDomain} 
        products={products} 
        onClose={() => {}} // No closing for public visitors
        settings={settings}
        isPublic={true}
      />
    );
  }

  if (browsingDomain) {
    return (
      <StorefrontPreview 
        domain={browsingDomain} 
        products={products} 
        onClose={() => setBrowsingDomain(null)} 
        settings={settings}
      />
    );
  }

  if (isSuperAdminLoggedIn) {
    return (
      <div className="flex min-h-screen bg-slate-50 font-sans selection:bg-brand-600 selection:text-white">
        <AdminSidebar activeView={activeView} setView={setView} onLogout={() => setIsSuperAdminLoggedIn(false)} />
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
            <div className="flex items-center gap-4">
              <ShieldCheck className="text-brand-600 w-6 h-6" />
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Super Admin Panel</h2>
            </div>
            <div className="flex items-center gap-4">
               <div className="text-right hidden sm:block">
                  <p className="text-sm font-black text-slate-900">System Administrator</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Platform Controller</p>
               </div>
               <div className="w-10 h-10 bg-brand-950 rounded-xl flex items-center justify-center text-white font-black">
                 SA
               </div>
            </div>
          </header>
          
          <main className="flex-1 overflow-y-auto p-4 md:p-10 pb-32 lg:pb-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeView}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {activeView === "admin-dashboard" && <AdminDashboardView users={users} payments={paymentRequests} />}
                {activeView === "admin-users" && <AdminUserManagementView users={users} setUsers={setUsers} />}
                {activeView === "admin-packages" && <AdminPackageManagementView packages={packages} setPackages={setPackages} />}
                {activeView === "admin-payments" && <AdminPaymentVerificationView requests={paymentRequests} setRequests={setPaymentRequests} setUsers={setUsers} />}
                {activeView === "admin-ecommerce" && <AdminEcommerceControlView users={users} setUsers={setUsers} />}
                {activeView === "admin-products" && <AdminProductMonitoringView />}
                {activeView === "admin-orders" && <AdminOrderControlView />}
                {activeView === "admin-support" && <AdminSupportManagementView />}
                {activeView === "admin-settings" && <AdminSettingsView />}
                {activeView === "admin-security" && <AdminSecurityLogsView />}
                {activeView === "admin-notifications" && <AdminNotificationSystemView />}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-brand-950 flex items-center justify-center p-6 selection:bg-brand-600 selection:text-white">
        <div className="w-full max-w-md bg-white rounded-[40px] p-10 shadow-2xl overflow-hidden relative group">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-600 to-indigo-600" />
          
          <div className="flex justify-center mb-10">
            <div className="w-16 h-16 bg-brand-600 rounded-2xl flex items-center justify-center rotate-6 group-hover:rotate-0 transition-transform duration-500 shadow-xl shadow-blue-500/20">
               <TrendingUp className="text-white w-10 h-10" />
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-slate-900 mb-2 uppercase tracking-tight">
              {isRegistering ? "নতুন একাউন্ট" : "BexoBuilder"}
            </h1>
            <p className="text-slate-500 font-medium tracking-tight">
              {isRegistering ? "আপনার বিজনেস ডিজিটাল করুন আমাদের সাথে।" : "আপনার ই-মেইল এবং পাসওয়ার্ড দিয়ে লগইন করুন।"}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            {isRegistering && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-300 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest px-1">আপনার নাম (Full Name)</label>
                  <input 
                    type="text" 
                    required={isRegistering}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="নাম লিখুন"
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-brand-600/10 focus:border-brand-600 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest px-1">বিজনেস নাম (Business Name)</label>
                  <input 
                    type="text" 
                    required={isRegistering}
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="কোম্পানির নাম লিখুন"
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-brand-600/10 focus:border-brand-600 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest px-1">মোবাইল নাম্বার (Phone)</label>
                  <input 
                    type="tel" 
                    required={isRegistering}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="০১৭xxxxxxxx"
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-brand-600/10 focus:border-brand-600 outline-none transition-all"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest px-1">{isAdminMode ? "Admin Email" : "Business Email"}</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isAdminMode ? "admin@bexobuilder.com" : "admin@business.com"}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-brand-600/10 focus:border-brand-600 outline-none transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest px-1">{isAdminMode ? "Admin Password" : "Password"}</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-brand-600/10 focus:border-brand-600 outline-none transition-all"
              />
            </div>

            {isAdminMode && (
              <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest px-1">Secret Access Code</label>
                <input 
                  type="text" 
                  required
                  value={adminAccessCode}
                  onChange={(e) => setAdminAccessCode(e.target.value)}
                  placeholder="XXXXXX"
                  className="w-full px-5 py-4 bg-slate-50 border border-brand-600/30 rounded-2xl text-sm font-bold tracking-widest focus:ring-4 focus:ring-brand-600/10 focus:border-brand-600 outline-none transition-all text-center"
                />
              </div>
            )}

          {!isRegistering && !isAdminMode && (
              <div className="flex items-center justify-between px-1 py-1">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-brand-600 focus:ring-brand-600" />
                  <span className="text-xs font-bold text-slate-500 group-hover:text-slate-900 transition-colors">মনে রাখুন</span>
                </label>
                <a href="#" className="text-xs font-bold text-brand-600 hover:underline">Forgot?</a>
              </div>
            )}

            <button 
              type="submit"
              className={cn(
                "w-full py-4 rounded-2xl font-bold transition-all shadow-xl flex items-center justify-center gap-2 active:scale-[0.98]",
                isAdminMode ? "bg-brand-950 text-white shadow-brand-950/30" : "bg-brand-600 text-white shadow-blue-500/30 hover:bg-brand-700"
              )}
            >
              <ShieldCheck className={cn("w-5 h-5", isAdminMode ? "block" : "hidden")} />
              {isAdminMode ? "Verify Access" : (isRegistering ? "রেজিস্ট্রেশন করুন" : "লগইন করুন")}
            </button>
          </form>

          <div className="mt-8 text-center flex flex-col gap-4">
            {!isAdminMode && (
              <button 
                onClick={() => setIsRegistering(!isRegistering)}
                className="text-xs font-black text-brand-600 uppercase tracking-widest hover:underline"
              >
                {isRegistering ? "লগইন এ ফিরে যান" : "নতুন বিজনেস রেজিস্ট্রেশন করুন"}
              </button>
            )}

            {isAdminMode ? (
               <button 
                  onClick={() => setIsAdminMode(false)}
                  className="text-xs font-black text-slate-400 uppercase tracking-widest hover:text-slate-600"
               >
                 Go Back to User Login
               </button>
            ) : (
               <button 
                  onClick={() => setIsAdminMode(true)}
                  className="text-[10px] font-bold text-slate-300 uppercase tracking-widest hover:text-brand-600 transition-colors opacity-50 hover:opacity-100"
               >
                 App Developer
               </button>
            )}
          </div>

          <p className="text-center mt-8 text-xs font-bold text-slate-500 uppercase tracking-widest italic opacity-40">
            Powered by BexoBuilder Unified Engine
          </p>
        </div>
      </div>
    );
  }

  if (!isTrialActive && activeView !== "profile") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-10 md:p-14 rounded-[48px] border border-slate-200 shadow-2xl max-w-2xl w-full"
        >
          <div className="w-24 h-24 bg-rose-50 text-rose-500 rounded-[32px] flex items-center justify-center mx-auto mb-10 shadow-lg shadow-rose-200/50">
            <CreditCard className="w-10 h-10" />
          </div>
          <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter uppercase">ফ্রি ট্রায়াল শেষ (Trial Expired)</h2>
          <p className="text-slate-500 font-bold mb-12 text-lg">
            আপনার ৭ দিনের ফ্রি ট্রায়ালটি শেষ হয়েছে। সিস্টেমটি সচল রাখতে একটি সাবস্ক্রিপশন প্যাকেজ কিনুন।
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12 text-left">
            <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-200 hover:border-brand-600 transition-all group cursor-pointer">
               <span className="inline-block px-3 py-1 bg-white border border-slate-200 rounded-full text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4">Silver Plan</span>
               <p className="text-3xl font-black text-slate-900 mb-1">৳ ৫০০<span className="text-sm font-bold text-slate-400"> / মাস</span></p>
               <p className="text-xs text-slate-500 font-bold mt-4 leading-relaxed line-clamp-2">১০ জন সাপ্লায়ার ও সীমিত প্রোডাক্ট ব্যবহারের সুবিধা।</p>
            </div>
            <div className="p-8 bg-brand-950 text-white rounded-[32px] ring-8 ring-brand-600/10 relative overflow-hidden group cursor-pointer transform hover:scale-105 transition-all">
               <div className="absolute top-0 right-0 w-32 h-32 bg-brand-600/10 rounded-full -mr-16 -mt-16 blur-2xl" />
               <span className="inline-block px-3 py-1 bg-brand-600 rounded-full text-[9px] font-black text-white uppercase tracking-widest mb-4">Recommended</span>
               <p className="text-3xl font-black mb-1">৳ ১,২০০<span className="text-sm font-bold text-brand-400"> / মাস</span></p>
               <p className="text-xs opacity-70 font-bold mt-4 leading-relaxed line-clamp-2">আনলিমিটেড প্রোডাক্ট ও ভিআইপি কাস্টমার সাপোর্ট।</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex-1 bg-brand-600 text-white py-5 rounded-3xl font-black hover:bg-brand-700 transition-all shadow-2xl shadow-brand-600/20 text-sm uppercase tracking-widest">
              আনলক করুন (Upgrade)
            </button>
            <button 
              onClick={() => setIsLoggedIn(false)}
              className="px-8 py-5 bg-white border border-slate-200 text-slate-600 rounded-3xl font-black hover:bg-slate-50 transition-all text-sm uppercase tracking-widest"
            >
              Sign Out
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans selection:bg-brand-600 selection:text-white">
      <SpeedInsights />
      <Sidebar 
        activeView={activeView} 
        setView={setView} 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        onLogout={() => setIsLoggedIn(false)}
      />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Topbar userEmail={email} onMenuOpen={() => setIsSidebarOpen(true)} trialDaysLeft={trialDaysLeft} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-10 pb-32 lg:pb-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {activeView === "dashboard" && <DashboardView />}
              {activeView === "ecommerce" && <EcommerceView products={products} setProducts={setProducts} setView={setView} setBrowsingDomain={setBrowsingDomain} domains={domains} setDomains={setDomains} settings={settings} setSettings={setSettings} />}
              {activeView === "sales" && (
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-12">
                   <div className="w-24 h-24 bg-brand-600 rounded-[32px] flex items-center justify-center mb-8 shadow-2xl shadow-brand-600/30">
                      <CreditCard className="w-10 h-10 text-white" />
                   </div>
                   <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-4">Sales System Active</h2>
                   <p className="text-slate-500 font-bold max-w-sm mx-auto mb-8 text-lg">
                     The point of sale terminal is ready. Your inventory is synced and ready for transactions.
                   </p>
                   <button 
                     onClick={() => setView('ecommerce')}
                     className="px-12 py-5 bg-brand-600 text-white rounded-[24px] font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-brand-600/20"
                   >
                     Go to Storefront
                   </button>
                </div>
              )}
              {activeView === "product" && <InventoryView products={products} setProducts={setProducts} categories={categories} />}
              {activeView === "category" && <CategoryView categories={categories} setCategories={setCategories} />}
              {activeView === "packages" && <PackagesView />}
              {activeView === "customer-history" && <StakeholdersView type="customers" stakeholders={stakeholders} setStakeholders={setStakeholders} />}
              {activeView === "supplier" && <StakeholdersView type="suppliers" stakeholders={stakeholders} setStakeholders={setStakeholders} />}
              {activeView === "payment-method" && <PaymentMethodsView paymentMethods={paymentMethods} setPaymentMethods={setPaymentMethods} />}
              {activeView === "support" && <SupportView />}
              {activeView === "storefront" && <StorefrontView onBack={() => setView("website-settings")} products={products} />}
              {activeView === "website-settings" && <EcommerceView products={products} setProducts={setProducts} setView={setView} setBrowsingDomain={setBrowsingDomain} domains={domains} setDomains={setDomains} settings={settings} setSettings={setSettings} />}
              {activeView === "profile" && (
                <div className="flex flex-col items-center justify-center h-[60vh] text-center p-12">
                   <div className="w-24 h-24 bg-brand-600 rounded-full flex items-center justify-center mb-6">
                      <UserIcon className="w-10 h-10 text-white" />
                   </div>
                   <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-2">User Profile</h2>
                   <p className="text-slate-500 font-medium max-w-sm mx-auto">
                     Manage your account security, personal information, and preferences.
                   </p>
                </div>
              )}
              {activeView !== "dashboard" && activeView !== "sales" && activeView !== "ecommerce" && activeView !== "product" && activeView !== "customer-history" && activeView !== "supplier" && activeView !== "website-settings" && activeView !== "profile" && activeView !== "category" && activeView !== "packages" && activeView !== "payment-method" && activeView !== "support" && activeView !== "storefront" && (
                <div className="flex flex-col items-center justify-center h-[60vh] text-center p-12">
                   <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6 animate-pulse">
                      <LayoutDashboard className="w-10 h-10 text-slate-300" />
                   </div>
                   <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-2">Module: {activeView.toUpperCase()}</h2>
                   <p className="text-slate-500 font-medium max-w-sm mx-auto">
                     This module is currently being synchronized with the cloud core. Please check back in a moment or continue with the Dashboard.
                   </p>
                   <button 
                     onClick={() => setView('dashboard')}
                     className="mt-8 px-8 py-3 bg-white border border-slate-200 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all shadow-sm"
                   >
                     Back to Overview
                   </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}


