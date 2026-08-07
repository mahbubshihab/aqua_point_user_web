const fs = require('fs');
const path = require('path');

const PRODUCTS = [
  {
    id: 'livotec-open-7-stage',
    slug: 'livotec_open',
    sourceUrl: 'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129962/products/bk5cbd4igkaufmlunbou.webp'
  },
  {
    id: 'livotec-stand-7-stage',
    slug: 'livotec_stand',
    sourceUrl: 'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129964/products/ivm2ttc4yqejgdqfotii.webp'
  },
  {
    id: 'eureka-classic-7-stage',
    slug: 'eureka_classic',
    sourceUrl: 'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129967/products/hufoztb3mojvhzm5hnip.webp'
  },
  {
    id: 'puro-plus-6-stage',
    slug: 'puro_plus',
    sourceUrl: 'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129969/products/htlm8asvbxmifbdkxnxq.webp'
  },
  {
    id: 'fighter-elite-7-stage',
    slug: 'fighter_elite',
    sourceUrl: 'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129971/products/mgcwiy3nq6tzyu6juaia.webp'
  },
  {
    id: 'fighter-1-0-7-stage',
    slug: 'fighter_1_0',
    sourceUrl: 'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129973/products/dewuc6aahclrdp3oopwc.webp'
  },
  {
    id: 'livotec-7-stage-cabinet-ro',
    slug: 'livotec_7_stage_cabinet',
    sourceUrl: 'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129975/products/bsgaesvaohhoo1tnnmky.webp'
  },
  {
    id: 'glass-door-cabinet-ro',
    slug: 'glass_door_cabinet',
    sourceUrl: 'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129977/products/oxo8lbok09tbubbhfwdv.webp'
  },
  {
    id: 'modern-cabinet-filter',
    slug: 'modern_cabinet_filter',
    sourceUrl: 'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129979/products/v2gjwzzytb1zfxxviuzp.webp'
  },
  {
    id: 'slim-cabinet-purifier',
    slug: 'slim_cabinet_purifier',
    sourceUrl: 'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129980/products/taobkrlmudanfqkm3juc.webp'
  },
  {
    id: 'pure-x-100-gpd-ro-dispenser',
    slug: 'pure_x_100_gpd',
    sourceUrl: 'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129982/products/vydwh1f3whz3opnq3xvw.webp'
  },
  {
    id: 'heron-hot-cold-filter-dispenser',
    slug: 'heron_hot_cold',
    sourceUrl: 'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129984/products/ojkvc4daccv5tbjbkfyd.webp'
  },
  {
    id: 'table-top-water-dispenser',
    slug: 'table_top_dispenser',
    sourceUrl: 'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129986/products/zjyffa7nfazd9o7cj3s9.webp'
  },
  {
    id: 'puryca-premium-water-filter',
    slug: 'puryca_premium',
    sourceUrl: 'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129988/products/ph7ek0a9y5gdfspwu42u.webp'
  },
  {
    id: 'pp-sediment-filter-cartridge',
    slug: 'pp_sediment_filter',
    sourceUrl: 'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129991/products/ydypolpgamimprtnjqlt.webp'
  },
  {
    id: 'cto-carbon-block-filter-cartridge',
    slug: 'cto_carbon_block',
    sourceUrl: 'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129993/products/gipp2udr5r0wd1lnugh5.webp'
  },
  {
    id: 'high-quality-ro-membrane-75-gpd',
    slug: 'ro_membrane_75_gpd',
    sourceUrl: 'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129995/products/jezun2zfy4fq7labcyjq.webp'
  },
  {
    id: '500-lph-commercial-ro-plant',
    slug: '500_lph_commercial_ro',
    sourceUrl: 'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129997/products/ffxupyrmzlhmayyplseq.webp'
  },
  {
    id: '1000-lph-industrial-ro-plant',
    slug: '1000_lph_industrial_ro',
    sourceUrl: 'https://res.cloudinary.com/rvoym2gw/image/upload/v1786130000/products/zgmcryf60lcwvlpbaaoc.webp'
  }
];

async function uploadImage(prod) {
  const formData = new FormData();
  formData.append('file', prod.sourceUrl);
  formData.append('upload_preset', 'aqua_point');
  formData.append('folder', 'products');
  formData.append('asset_folder', 'products');
  formData.append('public_id', prod.slug);

  const res = await fetch('https://api.cloudinary.com/v1_1/rvoym2gw/image/upload', {
    method: 'POST',
    body: formData
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to upload ${prod.id}: ${res.status} ${text}`);
  }

  const data = await res.json();
  return data;
}

async function main() {
  console.log(`Starting Cloudinary upload for ${PRODUCTS.length} products...`);
  const results = {};

  for (const prod of PRODUCTS) {
    try {
      console.log(`Uploading ${prod.id} (${prod.slug})...`);
      const data = await uploadImage(prod);
      console.log(`Uploaded ${prod.id} -> ${data.secure_url}`);
      if (!data.secure_url.includes('/products/')) {
        console.warn(`WARNING: secure_url for ${prod.id} does NOT contain /products/!`);
      }
      results[prod.id] = {
        id: prod.id,
        slug: prod.slug,
        secure_url: data.secure_url,
        public_id: data.public_id
      };
    } catch (err) {
      console.error(`Error uploading ${prod.id}:`, err);
    }
  }

  fs.writeFileSync(
    path.join(__dirname, 'uploadedCloudinaryProducts.json'),
    JSON.stringify(results, null, 2)
  );

  console.log('Upload complete. Output saved to uploadedCloudinaryProducts.json');
}

main().catch(console.error);
