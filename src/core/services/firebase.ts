import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { 
  getFirestore, 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  addDoc, 
  onSnapshot,
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

export const fetchClientsFromFirestore = async (): Promise<ClientItem[]> => {
  try {
    const q = query(collection(db, CLIENTS_COLLECTION), limit(10));
    const querySnapshot = await getDocs(q);
    const clients: ClientItem[] = [];
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      clients.push({
        id: docSnap.id,
        name: data.name || 'Unnamed Client',
        industry: data.industry || 'Corporate',
        logoUrl: data.logoUrl || data.imageUrl || '',
        createdAt: data.createdAt,
      });
    });
    return clients;
  } catch (error) {
    console.warn("Firestore fetch clients error, falling back to simple query:", error);
    try {
      const fallbackQ = query(collection(db, CLIENTS_COLLECTION), limit(10));
      const querySnapshot = await getDocs(fallbackQ);
      const clients: ClientItem[] = [];
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        clients.push({
          id: docSnap.id,
          name: data.name || 'Unnamed Client',
          industry: data.industry || 'Corporate',
          logoUrl: data.logoUrl || data.imageUrl || '',
          createdAt: data.createdAt,
        });
      });
      return clients;
    } catch (e) {
      console.warn("Fallback fetch clients error:", e);
      return [];
    }
  }
};

export const subscribeToClientsFromFirestore = (callback: (clients: ClientItem[]) => void) => {
  const q = query(collection(db, CLIENTS_COLLECTION), limit(10));
  return onSnapshot(q, (snapshot) => {
    const list: ClientItem[] = snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        name: data.name || 'Unnamed Client',
        industry: data.industry || 'Corporate',
        logoUrl: data.logoUrl || data.imageUrl || '',
        createdAt: data.createdAt,
      };
    });
    callback(list);
  }, (error) => {
    console.warn("Firestore clients snapshot error:", error);
    const fallbackQ = query(collection(db, CLIENTS_COLLECTION), limit(10));
    onSnapshot(fallbackQ, (snapshot) => {
      const list: ClientItem[] = snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          name: data.name || 'Unnamed Client',
          industry: data.industry || 'Corporate',
          logoUrl: data.logoUrl || data.imageUrl || '',
          createdAt: data.createdAt,
        };
      });
      callback(list);
    });
  });
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
export const REVIEWS_COLLECTION = 'reviews';
export const CLIENTS_COLLECTION = 'clients';
export const BANNERS_COLLECTION = 'banners';
export const CATEGORIES_COLLECTION = 'categories';

// Helper Types
export interface CategoryItem {
  id: string;
  name: string;
  slug?: string;
  imageUrl: string;
  description?: string;
  productCount?: number;
  createdAt?: DocumentData;
}

export interface BannerItem {
  id: string;
  title: string;
  subtitle?: string;
  tag?: string;
  imageUrl: string;
  ctaLink?: string;
  position?: 'main' | 'side_top' | 'side_bottom' | string;
  isActive: boolean;
  createdAt?: DocumentData;
}

export interface ClientItem {
  id: string;
  name: string;
  industry?: string;
  logoUrl: string;
  createdAt?: DocumentData;
}
export interface ProductItem {
  id: string;
  name: string;
  category: string;
  type?: string;
  price: number;
  originalPrice?: number;
  description: string;
  specifications: Record<string, string>;
  warranty: string;
  cloudinary_url?: string;
  imageUrl: string;
  galleryUrls?: string[];
  images?: string[];
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

export interface ReviewItem {
  id: string;
  userId?: string;
  userName?: string;
  customerName?: string;
  productId?: string;
  location?: string;
  rating: number;
  comment: string;
  isApproved: boolean;
  createdAt?: DocumentData;
}


// Firestore Helper API
export const fetchProductsFromFirestore = async (categoryFilter?: string, limitCount: number = 12): Promise<ProductItem[]> => {
  try {
    const constraints: QueryConstraint[] = [];
    if (categoryFilter && categoryFilter !== 'All' && categoryFilter !== 'All Products') {
      constraints.push(where('category', '==', categoryFilter));
    }
    if (limitCount > 0) {
      constraints.push(limit(limitCount));
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

export const fetchProductsByTypeFromFirestore = async (type: string, limitCount: number = 12): Promise<ProductItem[]> => {
  try {
    const q = query(
      collection(db, PRODUCTS_COLLECTION),
      where('type', '==', type),
      limit(limitCount)
    );
    const querySnapshot = await getDocs(q);
    const products: ProductItem[] = [];
    querySnapshot.forEach((docSnap) => {
      products.push({ id: docSnap.id, ...docSnap.data() } as ProductItem);
    });
    return products;
  } catch (error) {
    console.warn(`Firestore fetch products by type (${type}) error:`, error);
    return [];
  }
};

export const subscribeToProductsByTypeFromFirestore = (
  type: string,
  callback: (products: ProductItem[]) => void,
  limitCount: number = 12
) => {
  const q = query(
    collection(db, PRODUCTS_COLLECTION),
    where('type', '==', type),
    limit(limitCount)
  );
  return onSnapshot(
    q,
    (snapshot) => {
      const list: ProductItem[] = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      })) as ProductItem[];
      callback(list);
    },
    (error) => {
      console.warn(`Firestore snapshot products by type (${type}) error:`, error);
      fetchProductsByTypeFromFirestore(type, limitCount).then(callback);
    }
  );
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

export const submitReviewToFirestore = async (data: {
  userId?: string;
  userName: string;
  productId: string;
  rating: number;
  comment: string;
}) => {
  return await addDoc(collection(db, REVIEWS_COLLECTION), {
    userId: data.userId || `user_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    userName: data.userName,
    productId: data.productId,
    rating: Number(data.rating),
    comment: data.comment,
    isApproved: false,
    createdAt: serverTimestamp()
  });
};

export const fetchApprovedReviewsForProductFromFirestore = async (productId: string): Promise<ReviewItem[]> => {
  try {
    const q = query(
      collection(db, REVIEWS_COLLECTION),
      where('productId', '==', productId),
      where('isApproved', '==', true)
    );
    const querySnapshot = await getDocs(q);
    const reviews: ReviewItem[] = [];
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      reviews.push({
        id: docSnap.id,
        userId: data.userId || '',
        userName: data.userName || data.customerName || data.name || 'Valued Customer',
        customerName: data.customerName || data.userName || data.name || 'Valued Customer',
        productId: data.productId || productId,
        location: data.location || 'Verified Buyer',
        rating: Number(data.rating) || 5,
        comment: data.comment || '',
        isApproved: data.isApproved !== undefined ? Boolean(data.isApproved) : true,
        createdAt: data.createdAt,
      });
    });
    return reviews;
  } catch (error) {
    console.warn(`Firestore fetch approved reviews for product ${productId} error:`, error);
    try {
      const fallbackQ = query(collection(db, REVIEWS_COLLECTION), where('isApproved', '==', true));
      const snapshot = await getDocs(fallbackQ);
      const reviews: ReviewItem[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        if (data.productId === productId) {
          reviews.push({
            id: docSnap.id,
            userId: data.userId || '',
            userName: data.userName || data.customerName || data.name || 'Valued Customer',
            customerName: data.customerName || data.userName || data.name || 'Valued Customer',
            productId: data.productId || productId,
            location: data.location || 'Verified Buyer',
            rating: Number(data.rating) || 5,
            comment: data.comment || '',
            isApproved: data.isApproved !== undefined ? Boolean(data.isApproved) : true,
            createdAt: data.createdAt,
          });
        }
      });
      return reviews;
    } catch (e) {
      console.warn("Fallback fetch product reviews error:", e);
      return [];
    }
  }
};

export const subscribeToApprovedReviewsForProductFromFirestore = (
  productId: string,
  callback: (reviews: ReviewItem[]) => void
) => {
  const q = query(
    collection(db, REVIEWS_COLLECTION),
    where('productId', '==', productId),
    where('isApproved', '==', true)
  );
  return onSnapshot(
    q,
    (snapshot) => {
      const list: ReviewItem[] = snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          userId: data.userId || '',
          userName: data.userName || data.customerName || data.name || 'Valued Customer',
          customerName: data.customerName || data.userName || data.name || 'Valued Customer',
          productId: data.productId || productId,
          location: data.location || 'Verified Buyer',
          rating: Number(data.rating) || 5,
          comment: data.comment || '',
          isApproved: data.isApproved !== undefined ? Boolean(data.isApproved) : true,
          createdAt: data.createdAt,
        };
      });
      callback(list);
    },
    (error) => {
      console.warn("Firestore product reviews snapshot error:", error);
      fetchApprovedReviewsForProductFromFirestore(productId).then(callback);
    }
  );
};

export const fetchApprovedReviewsFromFirestore = async (): Promise<ReviewItem[]> => {
  try {
    const q = query(collection(db, REVIEWS_COLLECTION), where('isApproved', '==', true), limit(6));
    const querySnapshot = await getDocs(q);
    const reviews: ReviewItem[] = [];
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      reviews.push({
        id: docSnap.id,
        customerName: data.customerName || data.name || 'Valued Customer',
        location: data.location || 'Dhaka',
        rating: Number(data.rating) || 5,
        comment: data.comment || '',
        isApproved: data.isApproved !== undefined ? Boolean(data.isApproved) : true,
        createdAt: data.createdAt,
      });
    });
    return reviews;
  } catch (error) {
    console.warn("Firestore fetch reviews error:", error);
    return [];
  }
};

export const subscribeToApprovedReviewsFromFirestore = (callback: (reviews: ReviewItem[]) => void) => {
  const q = query(collection(db, REVIEWS_COLLECTION), where('isApproved', '==', true), limit(6));
  return onSnapshot(q, (snapshot) => {
    const list: ReviewItem[] = snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        customerName: data.customerName || data.name || 'Valued Customer',
        location: data.location || 'Dhaka',
        rating: Number(data.rating) || 5,
        comment: data.comment || '',
        isApproved: data.isApproved !== undefined ? Boolean(data.isApproved) : true,
        createdAt: data.createdAt,
      };
    });
    callback(list);
  }, (error) => {
    console.warn("Firestore reviews snapshot error:", error);
    const fallbackQ = query(collection(db, REVIEWS_COLLECTION), limit(6));
    onSnapshot(fallbackQ, (snapshot) => {
      const list: ReviewItem[] = snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          customerName: data.customerName || data.name || 'Valued Customer',
          location: data.location || 'Dhaka',
          rating: Number(data.rating) || 5,
          comment: data.comment || '',
          isApproved: data.isApproved !== undefined ? Boolean(data.isApproved) : true,
          createdAt: data.createdAt,
        };
      });
      callback(list);
    });
  });
};

export const fetchBannersFromFirestore = async (): Promise<BannerItem[]> => {
  try {
    const q = query(collection(db, BANNERS_COLLECTION), where('isActive', '==', true), limit(20));
    const querySnapshot = await getDocs(q);
    const banners: BannerItem[] = [];
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      banners.push({
        id: docSnap.id,
        title: data.title || 'Untitled Banner',
        subtitle: data.subtitle || data.description || '',
        tag: data.tag || data.badge || '',
        imageUrl: data.imageUrl || data.image || '',
        ctaLink: data.ctaLink || data.link || '',
        position: data.position || 'main',
        isActive: true,
        createdAt: data.createdAt,
      });
    });
    return banners;
  } catch (error) {
    console.warn("Firestore fetch banners error, falling back to simple query:", error);
    try {
      const fallbackQ = query(collection(db, BANNERS_COLLECTION), limit(20));
      const querySnapshot = await getDocs(fallbackQ);
      const banners: BannerItem[] = [];
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        banners.push({
          id: docSnap.id,
          title: data.title || 'Untitled Banner',
          subtitle: data.subtitle || data.description || '',
          tag: data.tag || data.badge || '',
          imageUrl: data.imageUrl || data.image || '',
          ctaLink: data.ctaLink || data.link || '',
          position: data.position || 'main',
          isActive: true,
          createdAt: data.createdAt,
        });
      });
      return banners;
    } catch (e) {
      console.warn("Fallback fetch banners error:", e);
      return [];
    }
  }
};

export const subscribeToBannersFromFirestore = (callback: (banners: BannerItem[]) => void) => {
  const q = query(collection(db, BANNERS_COLLECTION), where('isActive', '==', true), limit(20));
  return onSnapshot(q, (snapshot) => {
    const list: BannerItem[] = snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        title: data.title || 'Untitled Banner',
        subtitle: data.subtitle || data.description || '',
        tag: data.tag || data.badge || '',
        imageUrl: data.imageUrl || data.image || '',
        ctaLink: data.ctaLink || data.link || '',
        position: data.position || 'main',
        isActive: true,
        createdAt: data.createdAt,
      };
    });
    callback(list);
  }, (error) => {
    console.warn("Firestore banners snapshot error, falling back:", error);
    const fallbackQ = query(collection(db, BANNERS_COLLECTION), limit(20));
    onSnapshot(fallbackQ, (snapshot) => {
      const list: BannerItem[] = snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          title: data.title || 'Untitled Banner',
          subtitle: data.subtitle || data.description || '',
          tag: data.tag || data.badge || '',
          imageUrl: data.imageUrl || data.image || '',
          ctaLink: data.ctaLink || data.link || '',
          position: data.position || 'main',
          isActive: true,
          createdAt: data.createdAt,
        };
      });
      callback(list);
    });
  });
};

export const fetchCategoriesFromFirestore = async (): Promise<CategoryItem[]> => {
  try {
    const q = query(collection(db, CATEGORIES_COLLECTION), limit(30));
    const querySnapshot = await getDocs(q);
    const categories: CategoryItem[] = [];
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      categories.push({
        id: docSnap.id,
        name: data.name || data.title || 'Unnamed Category',
        slug: data.slug || '',
        imageUrl: data.imageUrl || data.image || data.cloudinary_url || '',
        description: data.description || '',
        productCount: Number(data.productCount) || 0,
        createdAt: data.createdAt,
      });
    });
    return categories;
  } catch (error) {
    console.warn("Firestore fetch categories error:", error);
    return [];
  }
};

export const subscribeToCategoriesFromFirestore = (callback: (categories: CategoryItem[]) => void) => {
  const q = query(collection(db, CATEGORIES_COLLECTION), limit(30));
  return onSnapshot(q, (snapshot) => {
    const list: CategoryItem[] = snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        name: data.name || data.title || 'Unnamed Category',
        slug: data.slug || '',
        imageUrl: data.imageUrl || data.image || data.cloudinary_url || '',
        description: data.description || '',
        productCount: Number(data.productCount) || 0,
        createdAt: data.createdAt,
      };
    });
    callback(list);
  }, (error) => {
    console.warn("Firestore categories snapshot error:", error);
    callback([]);
  });
};



