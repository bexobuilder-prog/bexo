import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Users, 
  Package, 
  CreditCard, 
  Store, 
  ShoppingBag, 
  MessageSquare, 
  Settings, 
  ShieldCheck, 
  Bell, 
  Search, 
  Filter, 
  MoreVertical, 
  TrendingUp, 
  Check, 
  X, 
  Trash2, 
  Edit, 
  Eye, 
  Lock, 
  Unlock, 
  Mail, 
  ExternalLink,
  ChevronRight,
  TrendingDown,
  LayoutDashboard,
  Plus,
  Globe,
  Send
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { cn } from "./lib/utils";
import { User, Package as PackageType, PaymentRequest } from "./types";

// --- Mock Admin Data ---
export const MOCK_USERS: User[] = [
  { 
    id: "U001", 
    name: "Rahat Hossain", 
    businessName: "Rahat Electronics", 
    email: "rahat@example.com", 
    phone: "01712345678", 
    packageStatus: "Active", 
    registrationDate: "2026-01-15", 
    domainUrl: "rahat-elec.bexobuilder.com", 
    totalProducts: 45, 
    totalOrders: 120, 
    totalRevenue: 54000, 
    status: "Active" 
  },
  { 
    id: "U002", 
    name: "Kamal Ahmed", 
    businessName: "Kamal's Boutique", 
    email: "kamal@example.com", 
    phone: "01812345678", 
    packageStatus: "Expired", 
    registrationDate: "2025-12-10", 
    domainUrl: "kamalboutique.com", 
    totalProducts: 120, 
    totalOrders: 450, 
    totalRevenue: 125000, 
    status: "Active" 
  },
  { 
    id: "U003", 
    name: "Sumon Khan", 
    businessName: "Gadget BD", 
    email: "sumon@example.com", 
    phone: "01912345678", 
    packageStatus: "Active", 
    registrationDate: "2026-03-05", 
    domainUrl: "gadgetbd.shop", 
    totalProducts: 12, 
    totalOrders: 5, 
    totalRevenue: 2400, 
    status: "Blocked" 
  },
  { 
    id: "U004", 
    name: "Nabila Akter", 
    businessName: "Nabila Fashion", 
    email: "nabila@example.com", 
    phone: "01312345678", 
    packageStatus: "Pending", 
    registrationDate: "2026-05-01", 
    totalProducts: 0, 
    totalOrders: 0, 
    totalRevenue: 0, 
    status: "Active" 
  }
];

export const MOCK_PACKAGES: PackageType[] = [
  { id: "P1", name: "Basic", duration: "1 Month", price: 500, status: "Active", features: ["100 Products", "Standard Support"] },
  { id: "P2", name: "Premium", duration: "1 Month", price: 1200, status: "Active", features: ["Unlimited Products", "Priority Support", "Custom Domain"] },
  { id: "P3", name: "Enterprise", duration: "1 Year", price: 10000, status: "Active", features: ["All Premium Features", "White Label", "24/7 Phone Support"] },
  { id: "P4", name: "Lifetime Access", duration: "Lifetime", price: 25000, status: "Active", features: ["One-time payment", "All future updates"] }
];

export const MOCK_PAYMENTS: PaymentRequest[] = [
  { 
    id: "PY001", 
    userId: "U004", 
    userName: "Nabila Akter", 
    packageId: "P2", 
    packageName: "Premium", 
    amount: 1200, 
    paymentMethod: "bKash", 
    transactionId: "BK12345678", 
    lastFourDigits: "5566", 
    status: "Pending", 
    requestDate: "2026-05-08 14:30" 
  }
];

// --- Sub-components for Admin Panel ---

export const AdminSidebar = ({ activeView, setView, onLogout }: { activeView: string, setView: (v: any) => void, onLogout: () => void }) => {
  const adminSections = [
    {
      title: "Navigation",
      items: [
        { id: "admin-dashboard", label: "Dashboard", icon: LayoutDashboard },
        { id: "admin-users", label: "User Management", icon: Users },
        { id: "admin-packages", label: "Package Control", icon: Package },
        { id: "admin-payments", label: "Payment Verification", icon: CreditCard },
      ]
    },
    {
      title: "Content Control",
      items: [
        { id: "admin-ecommerce", label: "Website Control", icon: Store },
        { id: "admin-products", label: "Product Monitoring", icon: ShoppingBag },
        { id: "admin-orders", label: "Order & Sales", icon: TrendingUp },
      ]
    },
    {
      title: "Support & Comm",
      items: [
        { id: "admin-support", label: "Support Center", icon: MessageSquare },
        { id: "admin-notifications", label: "Notifications", icon: Bell },
      ]
    },
    {
      title: "Platform",
      items: [
        { id: "admin-settings", label: "System Settings", icon: Settings },
        { id: "admin-security", label: "Security & Logs", icon: ShieldCheck },
      ]
    }
  ];

  return (
    <aside className="hidden lg:flex w-72 bg-brand-950 text-slate-300 h-screen sticky top-0 flex-col border-r border-white/5 shrink-0">
      <div className="p-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-xl shadow-brand-600/20 rotate-3 transform group-hover:rotate-0 transition-transform">
            <TrendingUp className="text-brand-950 w-7 h-7" />
          </div>
          <div>
             <h1 className="text-xl font-black text-white tracking-widest uppercase">Bexo</h1>
             <p className="text-[10px] font-black text-brand-400 uppercase tracking-[0.3em]">Administrator</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-6 py-2 space-y-8 scrollbar-hide">
        {adminSections.map((section) => (
          <div key={section.title}>
            <h3 className="px-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">
              {section.title}
            </h3>
            <ul className="space-y-1.5">
              {section.items.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setView(item.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all group",
                      activeView === item.id 
                        ? "bg-brand-600 text-white shadow-xl shadow-brand-600/30 ring-1 ring-white/10" 
                        : "text-slate-500 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <item.icon className={cn("w-4 h-4 transition-transform group-hover:scale-110", activeView === item.id ? "text-white" : "text-slate-600")} />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="p-6">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-4 rounded-2xl text-[11px] font-black text-rose-500 hover:bg-rose-500/10 uppercase tracking-widest transition-all group border border-rose-500/20"
        >
          <Lock className="w-4 h-4" />
          Terminate Session
        </button>
      </div>
    </aside>
  );
};

export const AdminDashboardView = ({ users, payments }: { users: User[], payments: PaymentRequest[] }) => {
  const stats = [
    { label: "Total Users", value: users.length, icon: Users, color: "bg-blue-500" },
    { label: "Pending Payments", value: payments.filter(p => p.status === "Pending").length, icon: CreditCard, color: "bg-amber-500" },
    { label: "Total Revenue", value: "৳ 1,84,300", icon: TrendingUp, color: "bg-emerald-500" },
    { label: "Critical Alerts", value: 3, icon: ShieldCheck, color: "bg-rose-500" },
  ];

  const adminSalesData = [
    { name: 'Jan', sales: 45000 },
    { name: 'Feb', sales: 52000 },
    { name: 'Mar', sales: 38000 },
    { name: 'Apr', sales: 65000 },
    { name: 'May', sales: 48000 },
  ];

  return (
    <div className="animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg", stat.color)}>
              <stat.icon className="w-6 h-6" />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        <div className="lg:col-span-2 bg-white p-10 rounded-[40px] border border-slate-200 shadow-sm">
           <div className="flex items-center justify-between mb-10">
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Revenue Analytics</h3>
              <select className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-xs font-bold text-slate-600 outline-none">
                 <option>Last 6 Months</option>
                 <option>Active Users Only</option>
              </select>
           </div>
           <div className="h-[350px]">
             <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={adminSalesData}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '16px' }}
                  />
                  <Area type="monotone" dataKey="sales" stroke="#2563eb" strokeWidth={4} fillOpacity={1} fill="url(#colorSales)" />
                </AreaChart>
             </ResponsiveContainer>
           </div>
        </div>

        <div className="bg-brand-950 p-10 rounded-[40px] text-white overflow-hidden relative">
           <div className="absolute top-0 right-0 w-64 h-64 bg-brand-800 rounded-full -mr-32 -mt-32 blur-3xl opacity-20" />
           <h3 className="text-xl font-black mb-8 tracking-tight uppercase relative z-10">Platform Vitality</h3>
           <div className="space-y-8 relative z-10">
             <div>
               <div className="flex justify-between items-center mb-3">
                 <span className="text-[10px] font-black text-brand-400 uppercase tracking-widest">Active Packages</span>
                 <span className="text-xs font-bold">82%</span>
               </div>
               <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                 <div className="h-full bg-brand-500 w-[82%]" />
               </div>
             </div>
             <div>
               <div className="flex justify-between items-center mb-3">
                 <span className="text-[10px] font-black text-brand-400 uppercase tracking-widest">Support Response</span>
                 <span className="text-xs font-bold">95%</span>
               </div>
               <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                 <div className="h-full bg-emerald-500 w-[95%]" />
               </div>
             </div>
             <div>
               <div className="flex justify-between items-center mb-3">
                 <span className="text-[10px] font-black text-brand-400 uppercase tracking-widest">Server Uptime</span>
                 <span className="text-xs font-bold">99.9%</span>
               </div>
               <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                 <div className="h-full bg-indigo-500 w-[99.9%]" />
               </div>
             </div>
           </div>

           <div className="mt-12 p-6 bg-white/5 rounded-3xl border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                 <ShieldCheck className="w-5 h-5 text-emerald-400" />
                 <span className="text-xs font-black uppercase tracking-widest">Security Status</span>
              </div>
              <p className="text-[10px] font-medium text-brand-300 leading-relaxed">
                All systems functional. Real-time threat detection is active. SSL Certificates valid.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export const AdminUserManagementView = ({ users, setUsers }: { users: User[], setUsers: React.Dispatch<React.SetStateAction<User[]>> }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.businessName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleUserStatus = (id: string, current: string) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: current === "Active" ? "Blocked" : "Active" } : u));
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">User Management</h2>
          <p className="text-slate-500 font-medium tracking-tight">Full control over 4,520 registered business owners.</p>
        </div>
        <div className="relative w-full md:w-96">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
           <input 
             type="text" 
             placeholder="Search by name or business..."
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
             className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold shadow-sm focus:border-brand-600 outline-none transition-all"
           />
        </div>
      </div>

      <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Merchant</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Business Detail</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Package Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Performance</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-7">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center font-black text-brand-600 shadow-sm group-hover:scale-110 transition-transform">
                         {user.name.charAt(0)}
                       </div>
                       <div>
                          <p className="font-black text-slate-900 text-sm tracking-tight">{user.name}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{user.phone}</p>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-7">
                     <p className="font-bold text-slate-700 text-xs">{user.businessName}</p>
                     <p className="text-[10px] font-medium text-slate-400 flex items-center gap-1 mt-1">
                        <Mail className="w-3 h-3" /> {user.email}
                     </p>
                  </td>
                  <td className="px-8 py-7">
                     <div className={cn(
                       "inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
                       user.packageStatus === "Active" ? "bg-emerald-50 text-emerald-600" : 
                       user.packageStatus === "Expired" ? "bg-rose-50 text-rose-600" : "bg-slate-50 text-slate-500"
                     )}>
                       {user.packageStatus}
                     </div>
                     <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase">Joined: {user.registrationDate}</p>
                  </td>
                  <td className="px-8 py-7">
                     <div className="flex items-center gap-4 text-xs font-bold text-slate-600">
                        <div className="flex flex-col">
                           <span className="text-[10px] text-slate-400 uppercase">Products</span>
                           {user.totalProducts}
                        </div>
                        <div className="flex flex-col">
                           <span className="text-[10px] text-slate-400 uppercase">Orders</span>
                           {user.totalOrders}
                        </div>
                     </div>
                  </td>
                  <td className="px-8 py-7 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:bg-brand-50 hover:text-brand-600 transition-all">
                         <Eye className="w-4 h-4" />
                       </button>
                       <button 
                         onClick={() => toggleUserStatus(user.id, user.status)}
                         className={cn(
                           "p-2.5 rounded-xl transition-all",
                           user.status === "Active" ? "bg-emerald-50 text-emerald-500 hover:bg-rose-50 hover:text-rose-500" : "bg-rose-50 text-rose-500 hover:bg-emerald-50 hover:text-emerald-500"
                         )}
                       >
                         {user.status === "Active" ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                       </button>
                       <button className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:bg-rose-50 hover:text-rose-500 transition-all">
                         <Trash2 className="w-4 h-4" />
                       </button>
                    </div>
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

export const AdminPackageManagementView = ({ packages, setPackages }: { packages: PackageType[], setPackages: React.Dispatch<React.SetStateAction<PackageType[]>> }) => {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Package Control</h2>
          <p className="text-slate-500 font-medium tracking-tight">Configure subscription tiers and market pricing.</p>
        </div>
        <button className="bg-brand-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-brand-600/20 flex items-center gap-2 hover:bg-brand-700 active:scale-95 transition-all">
          <Plus className="w-4 h-4" /> Create Package
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {packages.map((pkg) => (
          <div key={pkg.id} className="bg-white p-10 rounded-[40px] border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-40 group-hover:opacity-100 transition-opacity">
               <button className="text-slate-400 hover:text-brand-600 transition-colors">
                  <Edit className="w-5 h-5" />
               </button>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600">
                <Package className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-black text-slate-900 tracking-tight uppercase">{pkg.name}</h4>
            </div>
            <p className="text-4xl font-black text-slate-900 mb-6 tracking-tighter">৳ {pkg.price}<span className="text-sm font-bold text-slate-400 uppercase"> / {pkg.duration}</span></p>
            
            <div className="space-y-4 mb-10">
               {pkg.features.map((feature, i) => (
                 <div key={i} className="flex items-center gap-3 text-xs font-bold text-slate-600">
                    <Check className="w-4 h-4 text-emerald-500" />
                    {feature}
                 </div>
               ))}
            </div>

            <div className="flex items-center justify-between pt-8 border-t border-slate-50">
               <span className={cn(
                 "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
                 pkg.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-slate-50 text-slate-400"
               )}>
                 Status: {pkg.status}
               </span>
               <button 
                 onClick={() => setPackages(packages.map(p => p.id === pkg.id ? { ...p, status: p.status === "Active" ? "Disabled" : "Active" } : p))}
                 className="text-[10px] font-black text-brand-600 uppercase tracking-widest hover:underline"
               >
                 {pkg.status === "Active" ? "Disable Tier" : "Activate Tier"}
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const AdminPaymentVerificationView = ({ requests, setRequests, setUsers }: { requests: PaymentRequest[], setRequests: React.Dispatch<React.SetStateAction<PaymentRequest[]>>, setUsers: React.Dispatch<React.SetStateAction<User[]>> }) => {
  
  const handleApprove = (req: PaymentRequest) => {
     setRequests(requests.map(r => r.id === req.id ? { ...r, status: "Approved" } : r));
     setUsers(prev => prev.map(u => u.id === req.userId ? { ...u, packageStatus: "Active" } : u));
  };

  const handleReject = (id: string) => {
     setRequests(requests.map(r => r.id === id ? { ...r, status: "Rejected" } : r));
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-10">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Payment Verification</h2>
        <p className="text-slate-500 font-medium tracking-tight">Approve or reject manual financial deposits from users.</p>
      </div>

      <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Transaction Info</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">User Details</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {requests.map((req) => (
                <tr key={req.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-7">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 font-black text-xs">
                         {req.paymentMethod.charAt(0)}
                       </div>
                       <div>
                          <p className="font-black text-slate-900 text-sm tracking-tight">{req.paymentMethod}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">TxID: {req.transactionId || "N/A"}</p>
                          <p className="text-[9px] font-black text-indigo-600 uppercase tracking-widest mt-1">Last 4: {req.lastFourDigits}</p>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-7">
                     <p className="font-black text-slate-700 text-xs">{req.userName}</p>
                     <p className="text-[10px] font-bold text-brand-600 uppercase tracking-widest mt-1">{req.packageName} Package</p>
                     <p className="text-[9px] font-medium text-slate-400 mt-2 italic">{req.requestDate}</p>
                  </td>
                  <td className="px-8 py-7">
                     <p className="font-black text-slate-900 text-sm tracking-tighter">৳ {req.amount}</p>
                  </td>
                  <td className="px-8 py-7">
                     <div className={cn(
                       "inline-flex items-center px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest",
                       req.status === "Pending" ? "bg-amber-50 text-amber-600 ring-1 ring-amber-200/50" : 
                       req.status === "Approved" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                     )}>
                       {req.status}
                     </div>
                  </td>
                  <td className="px-8 py-7 text-right">
                    {req.status === "Pending" ? (
                      <div className="flex items-center justify-end gap-3">
                         <button 
                           onClick={() => handleReject(req.id)}
                           className="flex-1 max-w-[100px] px-4 py-2.5 bg-rose-50 text-rose-500 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                         >
                           Reject
                         </button>
                         <button 
                           onClick={() => handleApprove(req)}
                           className="flex-1 max-w-[100px] px-4 py-2.5 bg-emerald-500 text-white rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
                         >
                           Approve
                         </button>
                      </div>
                    ) : (
                      <button disabled className="px-4 py-2.5 bg-slate-50 text-slate-300 rounded-xl font-black text-[9px] uppercase tracking-widest cursor-not-allowed">
                        Finalized
                      </button>
                    )}
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

export const AdminEcommerceControlView = ({ users, setUsers }: { users: User[], setUsers: React.Dispatch<React.SetStateAction<User[]>> }) => {
   const domains = users.filter(u => u.domainUrl);

   return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-10">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Website Control</h2>
        <p className="text-slate-500 font-medium tracking-tight">Monitor and control individual store domains across the platform.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {domains.map((user) => (
          <div key={user.id} className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm hover:shadow-xl transition-all">
             <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600">
                   <Globe className="w-6 h-6" />
                </div>
                <div className={cn(
                  "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
                  user.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                )}>
                  {user.status}
                </div>
             </div>
             <h4 className="text-lg font-black text-slate-900 mb-1 tracking-tight truncate">{user.domainUrl}</h4>
             <p className="text-xs font-bold text-slate-400 mb-8 border-b border-slate-50 pb-4">{user.businessName}</p>
             
             <div className="flex flex-col gap-3">
                <button className="w-full bg-slate-950 text-white py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-800 transition-all">
                  <ExternalLink className="w-4 h-4" /> View Storefront
                </button>
                <button 
                  onClick={() => setUsers(prev => prev.map(u => u.id === user.id ? { ...u, status: u.status === "Active" ? "Suspended" : "Active" } : u))}
                  className={cn(
                    "w-full py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all",
                    user.status === "Active" ? "bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white" : "bg-emerald-50 text-emerald-500 hover:bg-emerald-500 hover:text-white"
                  )}
                >
                  {user.status === "Active" ? "Suspend Website" : "Reactivate Website"}
                </button>
             </div>
          </div>
        ))}
      </div>
    </div>
   );
};

export const AdminProductMonitoringView = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-12">
    <div className="w-24 h-24 bg-brand-950 rounded-[32px] flex items-center justify-center mb-8 shadow-2xl">
      <ShoppingBag className="w-10 h-10 text-brand-400" />
    </div>
    <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-4">Global Product Monitor</h2>
    <p className="text-slate-500 font-bold max-w-sm mx-auto mb-8 text-lg leading-relaxed">
      Scanning 14,204 active products for policy compliance. All listings are currently categorized and monitored.
    </p>
    <div className="flex gap-4">
      <button className="px-8 py-4 bg-brand-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-brand-600/20">
        Run Compliance Scan
      </button>
    </div>
  </div>
);

export const AdminOrderControlView = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-12">
    <div className="w-24 h-24 bg-indigo-600 rounded-[32px] flex items-center justify-center mb-8 shadow-2xl shadow-indigo-600/30">
      <TrendingUp className="w-10 h-10 text-white" />
    </div>
    <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-4">Master Sales Ledger</h2>
    <p className="text-slate-500 font-bold max-w-sm mx-auto mb-8 text-lg leading-relaxed">
      Aggregation of all platform sales across 4,500+ merchants. Total volume analyzed: ৳ 45.2M.
    </p>
    <button className="px-8 py-4 bg-slate-950 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all hover:bg-slate-800">
      Generate Gross Revenue Report
    </button>
  </div>
);

export const AdminSupportManagementView = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-12">
    <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-emerald-500/30">
      <MessageSquare className="w-10 h-10 text-white" />
    </div>
    <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-4">Triage Control</h2>
    <p className="text-slate-500 font-bold max-w-sm mx-auto mb-8 text-lg leading-relaxed">
      The support nerve center is clearing tickets. Active conversations: 12. Unsolved: 2.
    </p>
    <div className="flex gap-4">
      <div className="px-6 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Open Tickets</p>
         <p className="text-2xl font-black text-emerald-500">12</p>
      </div>
      <div className="px-6 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Solved Today</p>
         <p className="text-2xl font-black text-blue-500">45</p>
      </div>
    </div>
  </div>
);

export const AdminSettingsView = () => (
  <div className="animate-in fade-in duration-500 max-w-4xl mx-auto py-10">
    <div className="mb-12">
      <h2 className="text-4xl font-black text-slate-900 tracking-tight uppercase mb-4">Platform Configuration</h2>
      <p className="text-slate-500 font-medium text-lg leading-relaxed">Root level settings for the Bexo Builder Unified Engine.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white p-10 rounded-[40px] border border-slate-200 shadow-sm space-y-8">
         <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center text-brand-600">
               <Settings className="w-5 h-5" />
            </div>
            <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight">Core Settings</h4>
         </div>
         <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block px-1">Platform Name</label>
              <input type="text" defaultValue="Bexo Builder" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold text-slate-800 focus:bg-white outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block px-1">System Version</label>
              <input type="text" readOnly value="V 4.2.0-ULTRA" className="w-full bg-slate-100 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-bold text-slate-400 cursor-not-allowed" />
            </div>
            <div className="flex items-center justify-between p-4 bg-rose-50 rounded-2xl">
               <div>
                  <p className="text-xs font-black text-rose-600 uppercase tracking-widest">Maintenance Mode</p>
                  <p className="text-[10px] font-bold text-rose-400">Suspend all client stores</p>
               </div>
               <button className="w-12 h-6 bg-slate-200 rounded-full relative">
                 <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all" />
               </button>
            </div>
         </div>
      </div>

      <div className="bg-brand-950 p-10 rounded-[40px] text-white space-y-8">
         <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-brand-400">
               <Lock className="w-5 h-5" />
            </div>
            <h4 className="text-xl font-black uppercase tracking-tight">Master Auth</h4>
         </div>
         <div className="space-y-6">
            <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
               <p className="text-[10px] font-black text-brand-400 uppercase tracking-widest mb-2">2FA Status</p>
               <p className="text-xs font-bold text-emerald-400">Multi-factor Authentication Active</p>
            </div>
            <button className="w-full bg-brand-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-brand-600/20 hover:bg-brand-700 transition-all">
               Update Master Access Code
            </button>
            <p className="text-[10px] font-medium text-brand-300 italic opacity-50 px-2 leading-relaxed">
              Caution: Modifying root authentication parameters may require manual hardware reset.
            </p>
         </div>
      </div>
    </div>
  </div>
);

export const AdminSecurityLogsView = () => (
  <div className="animate-in fade-in duration-500">
     <div className="mb-10">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Security Logs</h2>
        <p className="text-slate-500 font-medium tracking-tight">Real-time audit trail of all administrative and system events.</p>
     </div>
     
     <div className="bg-brand-950 rounded-[40px] p-10 font-mono overflow-hidden relative">
        <div className="absolute bottom-0 right-0 p-8 opacity-10">
           <Filter className="w-48 h-48 text-white" />
        </div>
        <div className="space-y-4 relative z-10">
           {[
             { time: "2026-05-10 01:22:45", event: "SYSTEM_ACCESS_GRANTED", user: "SA-001", ip: "192.168.1.1", status: "AUTH_SUCCESS" },
             { time: "2026-05-10 01:15:20", event: "PACKAGE_REVENUE_SYNC", user: "CRON_SERVICE", ip: "10.0.0.4", status: "COMPLETED" },
             { time: "2026-05-10 00:58:32", event: "UNAUTHORIZED_LOGIN_ATTEMPT", user: "UNKNOWN", ip: "203.0.113.15", status: "BLOCKED" },
             { time: "2026-05-09 23:45:10", event: "USER_STATUS_UPDATED", user: "SA-001", ip: "192.168.1.1", status: "U-4192_SUSPENDED" },
             { time: "2026-05-09 22:30:15", event: "GLOBAL_CACHE_PURGED", user: "SA-001", ip: "192.168.1.1", status: "SUCCESS" },
           ].map((log, i) => (
             <div key={i} className="flex flex-col md:flex-row gap-4 py-3 border-b border-white/5 text-[10px] lg:text-xs">
                <span className="text-slate-500 font-bold shrink-0">[{log.time}]</span>
                <span className={cn(
                  "font-black px-2 py-0.5 rounded uppercase tracking-widest shrink-0",
                  log.status === "BLOCKED" ? "bg-rose-500/20 text-rose-500" : "bg-emerald-500/20 text-emerald-500"
                )}>{log.event}</span>
                <span className="text-brand-400 font-bold">BY: {log.user}</span>
                <span className="text-slate-400 opacity-60">IP: {log.ip}</span>
                <span className="text-slate-300 ml-auto font-black">{log.status}</span>
             </div>
           ))}
        </div>
     </div>
  </div>
);

export const AdminNotificationSystemView = () => (
  <div className="animate-in fade-in duration-500 max-w-3xl mx-auto">
     <div className="mb-10">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Broadcast Control</h2>
        <p className="text-slate-500 font-medium tracking-tight">Push system-wide announcements to all active business owners.</p>
     </div>
     
     <div className="bg-white p-12 rounded-[48px] border border-slate-200 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16" />
        <div className="relative z-10 space-y-8">
           <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-600/20">
                 <Bell className="w-7 h-7" />
              </div>
              <div>
                 <h4 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Platform Alert</h4>
                 <p className="text-xs font-bold text-slate-400">Recipients: 4,520 Merchant Dashboards</p>
              </div>
           </div>

           <div className="space-y-6">
              <div className="space-y-3">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Alert Subject</label>
                 <input type="text" placeholder="e.g. Server Maintenance Notice" className="w-full bg-slate-50 border border-slate-100 rounded-3xl px-8 py-5 text-sm font-bold text-slate-800 focus:bg-white outline-none placeholder:text-slate-300 transition-all shadow-sm" />
              </div>
              <div className="space-y-3">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Broadcast Message</label>
                 <textarea rows={5} placeholder="Type your announcement here..." className="w-full bg-slate-50 border border-slate-100 rounded-[32px] px-8 py-6 text-sm font-bold text-slate-800 focus:bg-white outline-none placeholder:text-slate-300 transition-all shadow-sm resize-none" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                 <div className="p-6 bg-slate-50 rounded-3xl flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Pin to Dashboard</span>
                    <button className="w-12 h-6 bg-brand-600 rounded-full relative">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                    </button>
                 </div>
                 <div className="p-6 bg-slate-50 rounded-3xl flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Email Blast</span>
                    <button className="w-12 h-6 bg-slate-200 rounded-full relative">
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                    </button>
                 </div>
              </div>

              <button className="w-full bg-brand-600 text-white py-6 rounded-[32px] font-black text-xs uppercase tracking-widest shadow-2xl shadow-brand-600/30 hover:bg-brand-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                 <Send className="w-4 h-4" /> Deploy Broadcast Message
              </button>
           </div>
        </div>
     </div>
  </div>
);
