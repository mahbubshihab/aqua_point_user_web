import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { 
  getFirestore, 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  serverTimestamp,
  DocumentData,
  QueryConstraint
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDtWGfMVTfYAULRNNxVx3WcRdy_WZaK0MY",
  authDomain: "aqua-point-bd.firebaseapp.com",
  projectId: "aqua-point-bd",
  storageBucket: "aqua-point-bd.firebasestorage.app",
  messagingSenderId: "246078088676",
  appId: "1:246078088676:web:bb45536044ad4bb98393f1",
  measurementId: "G-ZZ31XCB28Z"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);

if (typeof window !== 'undefined') {
  isSupported().then(yes => yes && getAnalytics(app));
}

// Collection References
export const PRODUCTS_COLLECTION = 'products';
export const SERVICES_COLLECTION = 'services';
export const ORDERS_COLLECTION = 'orders';
export const INQUIRIES_COLLECTION = 'inquiries';
export const USERS_COLLECTION = 'users';
export const FAQS_COLLECTION = 'faqs';
export const COMPANY_INFO_COLLECTION = 'company_info';

// Helper Types
export interface ProductItem {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  description: string;
  specifications: Record<string, string>;
  warranty: string;
  cloudinary_url?: string;
  imageUrl: string;
  galleryUrls?: string[];
  stock: number;
  rating?: number;
  featured?: boolean;
  purpose?: string;
  application?: string;
  createdAt?: DocumentData;
}

export interface ServiceBooking {
  id?: string;
  machineType: string;
  customerName: string;
  phone: string;
  address: string;
  preferredDate: string;
  preferredSlot: string;
  problemDescription: string;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  createdAt?: DocumentData;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export interface OrderPayload {
  id?: string;
  customerName: string;
  phone: string;
  email?: string;
  address: string;
  district?: string;
  items: OrderItem[];
  totalAmount: number;
  paymentMethod: 'COD' | 'bKash' | 'Card';
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED';
  createdAt?: DocumentData;
}

export interface InquiryPayload {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  subject: string;
  message: string;
  createdAt?: DocumentData;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface CompanyInfo {
  id: string;
  name: string;
  foundedYear: string;
  founder: string;
  address: string;
  helpline: string;
  email: string;
  description: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  badge?: string;
  icon?: string;
  color?: string;
  bg?: string;
}

// Firestore Helper API
export const fetchProductsFromFirestore = async (categoryFilter?: string): Promise<ProductItem[]> => {
  try {
    const constraints: QueryConstraint[] = [];
    if (categoryFilter && categoryFilter !== 'All') {
      constraints.push(where('category', '==', categoryFilter));
    }
    const q = query(collection(db, PRODUCTS_COLLECTION), ...constraints);
    const querySnapshot = await getDocs(q);
    const products: ProductItem[] = [];
    querySnapshot.forEach((docSnap) => {
      products.push({ id: docSnap.id, ...docSnap.data() } as ProductItem);
    });
    return products;
  } catch (error) {
    console.warn("Firestore fetch error:", error);
    return [];
  }
};

export const fetchProductByIdFromFirestore = async (id: string): Promise<ProductItem | null> => {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as ProductItem;
    }
    return null;
  } catch (error) {
    console.warn("Firestore fetch single product error:", error);
    return null;
  }
};

export const fetchServicesFromFirestore = async (): Promise<ServiceItem[]> => {
  try {
    const q = query(collection(db, SERVICES_COLLECTION));
    const querySnapshot = await getDocs(q);
    const services: ServiceItem[] = [];
    querySnapshot.forEach((docSnap) => {
      services.push({ id: docSnap.id, ...docSnap.data() } as ServiceItem);
    });
    return services;
  } catch (error) {
    console.warn("Firestore fetch services error:", error);
    return [];
  }
};

export const fetchFaqsFromFirestore = async (): Promise<FaqItem[]> => {
  try {
    const q = query(collection(db, FAQS_COLLECTION));
    const querySnapshot = await getDocs(q);
    const faqs: FaqItem[] = [];
    querySnapshot.forEach((docSnap) => {
      faqs.push({ id: docSnap.id, ...docSnap.data() } as FaqItem);
    });
    return faqs;
  } catch (error) {
    console.warn("Firestore fetch faqs error:", error);
    return [];
  }
};

export const fetchCompanyInfoFromFirestore = async (): Promise<CompanyInfo | null> => {
  try {
    const docRef = doc(db, COMPANY_INFO_COLLECTION, 'main');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as CompanyInfo;
    }
    return null;
  } catch (error) {
    console.warn("Firestore fetch company info error:", error);
    return null;
  }
};

export const submitServiceRequestToFirestore = async (data: Omit<ServiceBooking, 'id' | 'status' | 'createdAt'>) => {
  return await addDoc(collection(db, SERVICES_COLLECTION), {
    ...data,
    status: 'PENDING',
    createdAt: serverTimestamp()
  });
};

export const submitOrderToFirestore = async (data: Omit<OrderPayload, 'id' | 'status' | 'createdAt'>) => {
  return await addDoc(collection(db, ORDERS_COLLECTION), {
    ...data,
    status: 'PENDING',
    createdAt: serverTimestamp()
  });
};

export const submitInquiryToFirestore = async (data: Omit<InquiryPayload, 'id' | 'createdAt'>) => {
  return await addDoc(collection(db, INQUIRIES_COLLECTION), {
    ...data,
    createdAt: serverTimestamp()
  });
};
