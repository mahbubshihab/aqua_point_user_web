import { 
  db, 
  PRODUCTS_COLLECTION, 
  SERVICES_COLLECTION, 
  ORDERS_COLLECTION, 
  INQUIRIES_COLLECTION, 
  FAQS_COLLECTION, 
  COMPANY_INFO_COLLECTION 
} from './firebase';
import { collection, getDocs, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { REAL_PRODUCTS, REAL_SERVICES, REAL_FAQS, REAL_COMPANY_INFO } from './seedFirestore';

export const cleanAndReseedDatabase = async (): Promise<{
  deletedCounts: Record<string, number>;
  reseededCounts: Record<string, number>;
  success: boolean;
  errors: any[];
}> => {
  const errors: any[] = [];
  const deletedCounts: Record<string, number> = {};
  const reseededCounts: Record<string, number> = {};

  console.log('🧹 Starting Complete Clean & Re-seed for Cloud Firestore (aqua-point-bd)...');

  const collectionsToClean = [
    PRODUCTS_COLLECTION,
    SERVICES_COLLECTION,
    FAQS_COLLECTION,
    COMPANY_INFO_COLLECTION,
    ORDERS_COLLECTION,
    INQUIRIES_COLLECTION,
  ];

  // 1. Purge all documents from all specified collections
  for (const colName of collectionsToClean) {
    try {
      console.log(`🗑️ Clearing collection: '${colName}'...`);
      const snapshot = await getDocs(collection(db, colName));
      let count = 0;
      for (const docSnap of snapshot.docs) {
        await deleteDoc(doc(db, colName, docSnap.id));
        count++;
      }
      deletedCounts[colName] = count;
      console.log(`✅ Cleared ${count} documents from '${colName}'.`);
    } catch (err) {
      console.error(`❌ Error clearing collection '${colName}':`, err);
      errors.push({ action: 'delete_collection', collection: colName, error: err });
    }
  }

  // 2. Re-seed Products (19 authentic items)
  console.log(`🌱 Re-seeding ${REAL_PRODUCTS.length} authentic products into '${PRODUCTS_COLLECTION}'...`);
  let productsCount = 0;
  for (const product of REAL_PRODUCTS) {
    try {
      const docRef = doc(db, PRODUCTS_COLLECTION, product.id);
      await setDoc(docRef, product);
      productsCount++;
    } catch (err) {
      console.error(`❌ Error seeding product ${product.id}:`, err);
      errors.push({ action: 'seed_product', id: product.id, error: err });
    }
  }
  reseededCounts[PRODUCTS_COLLECTION] = productsCount;

  // 3. Re-seed Services
  console.log(`🌱 Re-seeding ${REAL_SERVICES.length} services into '${SERVICES_COLLECTION}'...`);
  let servicesCount = 0;
  for (const service of REAL_SERVICES) {
    try {
      const docRef = doc(db, SERVICES_COLLECTION, service.id);
      await setDoc(docRef, service);
      servicesCount++;
    } catch (err) {
      console.error(`❌ Error seeding service ${service.id}:`, err);
      errors.push({ action: 'seed_service', id: service.id, error: err });
    }
  }
  reseededCounts[SERVICES_COLLECTION] = servicesCount;

  // 4. Re-seed FAQs
  console.log(`🌱 Re-seeding ${REAL_FAQS.length} FAQs into '${FAQS_COLLECTION}'...`);
  let faqsCount = 0;
  for (const faq of REAL_FAQS) {
    try {
      const docRef = doc(db, FAQS_COLLECTION, faq.id);
      await setDoc(docRef, faq);
      faqsCount++;
    } catch (err) {
      console.error(`❌ Error seeding faq ${faq.id}:`, err);
      errors.push({ action: 'seed_faq', id: faq.id, error: err });
    }
  }
  reseededCounts[FAQS_COLLECTION] = faqsCount;

  // 5. Re-seed Company Info
  console.log(`🌱 Re-seeding company info into '${COMPANY_INFO_COLLECTION}'...`);
  let companyCount = 0;
  try {
    const docRef = doc(db, COMPANY_INFO_COLLECTION, REAL_COMPANY_INFO.id);
    await setDoc(docRef, REAL_COMPANY_INFO);
    companyCount++;
  } catch (err) {
    console.error(`❌ Error seeding company info:`, err);
    errors.push({ action: 'seed_company_info', id: REAL_COMPANY_INFO.id, error: err });
  }
  reseededCounts[COMPANY_INFO_COLLECTION] = companyCount;

  const isSuccess = errors.length === 0;
  console.log(`🎉 Database reset finished with ${errors.length} errors.`);

  return {
    deletedCounts,
    reseededCounts,
    success: isSuccess,
    errors
  };
};

if (typeof require !== 'undefined' && require.main === module) {
  cleanAndReseedDatabase()
    .then((res) => {
      console.log('Result:', JSON.stringify(res, null, 2));
      process.exit(res.success ? 0 : 1);
    })
    .catch((err) => {
      console.error('Unhandled error:', err);
      process.exit(1);
    });
}
