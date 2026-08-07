import { db, PRODUCTS_COLLECTION, ProductItem } from './firebase';
import { collection, getDocs, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { REAL_PRODUCTS } from './seedFirestore';

export const purgeMockProducts = async (): Promise<{
  deletedCount: number;
  reseededCount: number;
  finalCount: number;
  deletedIds: string[];
  errors: any[];
}> => {
  const errors: any[] = [];
  const deletedIds: string[] = [];
  let deletedCount = 0;
  let reseededCount = 0;

  console.log('🚀 Starting Firestore Cleanup for project aqua-point-bd...');
  console.log('📦 Authentic Product Target Count:', REAL_PRODUCTS.length);

  const authenticIds = new Set(REAL_PRODUCTS.map((p) => p.id));

  // 1. Fetch current documents in products collection
  try {
    const querySnapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
    console.log(`🔍 Found ${querySnapshot.size} total documents in Firestore '${PRODUCTS_COLLECTION}' collection.`);

    for (const docSnap of querySnapshot.docs) {
      const data = docSnap.data() as Partial<ProductItem>;
      const docId = docSnap.id;
      
      const isAuthenticId = authenticIds.has(docId);
      const hasMockName = 
        (data.name && (data.name.toLowerCase().includes('sample') || data.name.toLowerCase().includes('mock')));
      const hasUnsplashImage = 
        (data.imageUrl && data.imageUrl.includes('unsplash.com')) ||
        (data.cloudinary_url && data.cloudinary_url.includes('unsplash.com')) ||
        (data.galleryUrls && data.galleryUrls.some((url) => url.includes('unsplash.com')));
      const hasNonCloudinaryImage = 
        (data.imageUrl && !data.imageUrl.includes('res.cloudinary.com/rvoym2gw/')) ||
        (data.cloudinary_url && !data.cloudinary_url.includes('res.cloudinary.com/rvoym2gw/'));

      // If document is not in authentic list OR contains mock characteristics, delete it
      if (!isAuthenticId || hasMockName || hasUnsplashImage || hasNonCloudinaryImage) {
        console.log(`🗑️ Deleting mock/invalid document: ID=${docId}, Name="${data.name}"`);
        try {
          await deleteDoc(doc(db, PRODUCTS_COLLECTION, docId));
          deletedCount++;
          deletedIds.push(docId);
        } catch (err) {
          console.error(`❌ Error deleting document ${docId}:`, err);
          errors.push({ action: 'delete', id: docId, error: err });
        }
      }
    }
  } catch (err) {
    console.error('❌ Error fetching Firestore products collection:', err);
    errors.push({ action: 'fetch_collection', error: err });
  }

  // 2. Re-seed & verify that ONLY authentic products exist in Firestore
  console.log('🌱 Re-seeding / verifying authentic products in Firestore...');
  for (const product of REAL_PRODUCTS) {
    try {
      const docRef = doc(db, PRODUCTS_COLLECTION, product.id);
      await setDoc(docRef, product, { merge: false }); // merge: false replaces completely to avoid lingering mock fields
      reseededCount++;
    } catch (err) {
      console.error(`❌ Error writing authentic product ${product.id}:`, err);
      errors.push({ action: 'reseed', id: product.id, error: err });
    }
  }

  // 3. Final verification count
  let finalCount = 0;
  try {
    const finalSnapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
    finalCount = finalSnapshot.size;
    console.log(`✅ Final document count in '${PRODUCTS_COLLECTION}' collection: ${finalCount}`);
  } catch (err) {
    console.error('❌ Error getting final count:', err);
  }

  return {
    deletedCount,
    reseededCount,
    finalCount,
    deletedIds,
    errors
  };
};

// Self-executing runner
if (typeof require !== 'undefined' && require.main === module) {
  purgeMockProducts()
    .then((res) => {
      console.log('🎉 Cleanup summary:', JSON.stringify(res, null, 2));
      process.exit(res.errors.length === 0 ? 0 : 1);
    })
    .catch((err) => {
      console.error('💥 Unhandled cleanup error:', err);
      process.exit(1);
    });
}
