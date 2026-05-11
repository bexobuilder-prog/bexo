export type View = 
  | 'dashboard' 
  | 'profile' 
  | 'customer-history' 
  | 'ecommerce' 
  | 'sales' 
  | 'product' 
  | 'supplier' 
  | 'category' 
  | 'payment-method' 
  | 'website-settings'
  | 'packages'
  | 'support'
  | 'storefront'
  | 'admin-dashboard'
  | 'admin-users'
  | 'admin-packages'
  | 'admin-payments'
  | 'admin-ecommerce'
  | 'admin-products'
  | 'admin-orders'
  | 'admin-support'
  | 'admin-settings'
  | 'admin-security'
  | 'admin-notifications';

export interface User {
  id: string;
  name: string;
  businessName: string;
  email: string;
  phone: string;
  packageStatus: 'Active' | 'Expired' | 'Blocked' | 'Pending';
  registrationDate: string;
  domainUrl?: string;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  lastLogin?: string;
  status: 'Active' | 'Blocked' | 'Suspended';
}

export interface Package {
  id: string;
  name: string;
  duration: '1 Month' | '2 Months' | '3 Months' | '6 Months' | '1 Year' | 'Lifetime';
  price: number;
  status: 'Active' | 'Disabled';
  features: string[];
}

export interface PaymentRequest {
  id: string;
  userId: string;
  userName: string;
  packageId: string;
  packageName: string;
  amount: number;
  paymentMethod: 'bKash' | 'Nagad' | 'Rocket' | 'Cash On Delivery';
  transactionId?: string;
  lastFourDigits?: string;
  screenshot?: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  requestDate: string;
}

export interface Product {
  id: string;
  name: string;
  productCode: string;
  category: string;
  purchasePrice: number;
  salePrice: number;
  regularPrice: number;
  stock: number;
  discount: number;
  image: string;
  images?: string[];
  warehouse?: string;
  variants?: {
    name: string;
    isMandatory: boolean;
    options: string[];
  }[];
}

export interface Category {
  id: string;
  name: string;
  image?: string;
}

export interface Transaction {
  id: string;
  type: 'sale' | 'purchase' | 'expense';
  amount: number;
  date: string;
  category: string;
  status: 'completed' | 'pending' | 'cancelled';
  contactName: string;
}

export interface Stakeholder {
  id: string;
  type: 'customer' | 'supplier';
  name: string;
  email: string;
  phone: string;
  totalTransactions: number;
  balance: number;
  note?: string;
  address?: string;
  joinDate: string;
  gender?: string;
  previousDue?: number;
  totalDeposits?: number;
}

export interface Domain {
  id: string;
  url: string;
  template: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
}

export interface PaymentMethod {
  id: string;
  title: string;
  icon?: string;
  paymentType: string;
  debitAccount: string;
  status: 'Active' | 'Inactive';
  multipleTypes: boolean;
  provider: string;
}
