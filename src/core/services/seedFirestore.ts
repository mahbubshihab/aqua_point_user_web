import { db, PRODUCTS_COLLECTION, SERVICES_COLLECTION } from './firebase';
import { doc, setDoc, collection } from 'firebase/firestore';

export const FAQS_COLLECTION = 'faqs';
export const COMPANY_INFO_COLLECTION = 'company_info';

export const REAL_PRODUCTS = [
  {
    id: 'livotec-open-7-stage',
    name: 'Livotec Open (7 Stage RO)',
    category: 'RO Purifiers',
    price: 16200,
    originalPrice: 19500,
    warranty: '1 Year Electrical',
    stock: 15,
    stockStatus: 'In Stock',
    cloudinary_url: 'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129962/products/bk5cbd4igkaufmlunbou.webp',
    imageUrl: 'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129962/products/bk5cbd4igkaufmlunbou.webp',
    galleryUrls: [
      'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129962/products/bk5cbd4igkaufmlunbou.webp'
    ],
    description: '7-stage Reverse Osmosis drinking water purification system featuring an open frame structure for effortless maintenance and high-output mineral purification.',
    specifications: {
      'Stages': '7 Stage (PP, CTO, GAC, RO Membrane, Mineral, Taste Filter, Alkaline)',
      'Capacity': '75 GPD (approx 12L/hr)',
      'Warranty': '1 Year Electrical',
      'Stock Status': 'In Stock'
    },
    featured: true,
    rating: 4.9
  },
  {
    id: 'livotec-stand-7-stage',
    name: 'Livotec Stand (7 Stage RO)',
    category: 'RO Purifiers',
    price: 17500,
    originalPrice: 20000,
    warranty: '1 Year Electrical',
    stock: 12,
    stockStatus: 'In Stock',
    cloudinary_url: 'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129964/products/ivm2ttc4yqejgdqfotii.webp',
    imageUrl: 'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129964/products/ivm2ttc4yqejgdqfotii.webp',
    galleryUrls: [
      'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129964/products/ivm2ttc4yqejgdqfotii.webp'
    ],
    description: 'Sturdy standing frame 7-stage RO water purifier with integrated pressure gauge, mineral infusion, and high-efficiency membrane.',
    specifications: {
      'Stages': '7 Stage RO System',
      'Structure': 'Heavy Duty Stand Frame',
      'Warranty': '1 Year Electrical',
      'Stock Status': 'In Stock'
    },
    featured: true,
    rating: 4.9
  },
  {
    id: 'eureka-classic-7-stage',
    name: 'Eureka Classic (7 Stage RO)',
    category: 'RO Purifiers',
    price: 14500,
    originalPrice: 17000,
    warranty: '1 Year Electrical',
    stock: 20,
    stockStatus: 'In Stock',
    cloudinary_url: 'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129967/products/hufoztb3mojvhzm5hnip.webp',
    imageUrl: 'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129967/products/hufoztb3mojvhzm5hnip.webp',
    galleryUrls: [
      'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129967/products/hufoztb3mojvhzm5hnip.webp'
    ],
    description: 'Reliable household 7-stage RO purifier engineered for maximum TDS reduction and crisp drinking water.',
    specifications: {
      'Stages': '7 Stage Filtration',
      'Capacity': '75 GPD',
      'Warranty': '1 Year Electrical',
      'Stock Status': 'In Stock'
    },
    featured: true,
    rating: 4.8
  },
  {
    id: 'puro-plus-6-stage',
    name: 'Puro Plus (6 Stage RO+UV+UF)',
    category: 'Cabinet Purifiers',
    price: 14500,
    originalPrice: 17500,
    warranty: '1 Year Electrical',
    stock: 18,
    stockStatus: 'In Stock',
    cloudinary_url: 'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129969/products/htlm8asvbxmifbdkxnxq.webp',
    imageUrl: 'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129969/products/htlm8asvbxmifbdkxnxq.webp',
    galleryUrls: [
      'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129969/products/htlm8asvbxmifbdkxnxq.webp'
    ],
    description: 'Compact 6-stage cabinet purifier integrating RO, UV sterilizer, and UF membrane for 100% safe drinking water.',
    specifications: {
      'Stages': '6 Stage (RO+UV+UF)',
      'Type': 'Enclosed Cabinet',
      'Warranty': '1 Year Electrical',
      'Stock Status': 'In Stock'
    },
    featured: true,
    rating: 4.8
  },
  {
    id: 'fighter-elite-7-stage',
    name: 'Fighter Elite (7 Stage RO+UV+UF)',
    category: 'Cabinet Purifiers',
    price: 14500,
    originalPrice: 17500,
    warranty: '1 Year Electrical',
    stock: 15,
    stockStatus: 'In Stock',
    cloudinary_url: 'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129971/products/mgcwiy3nq6tzyu6juaia.webp',
    imageUrl: 'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129971/products/mgcwiy3nq6tzyu6juaia.webp',
    galleryUrls: [
      'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129971/products/mgcwiy3nq6tzyu6juaia.webp'
    ],
    description: 'Feature-packed 7-stage cabinet purifier with multi-layer barrier protecting against pathogens and heavy metals.',
    specifications: {
      'Stages': '7 Stage (RO+UV+UF)',
      'Type': 'Cabinet Filter',
      'Warranty': '1 Year Electrical',
      'Stock Status': 'In Stock'
    },
    featured: false,
    rating: 4.9
  },
  {
    id: 'fighter-1-0-7-stage',
    name: 'Fighter 1.0 (7 Stage RO+UV+UF)',
    category: 'Cabinet Purifiers',
    price: 15500,
    originalPrice: 18500,
    warranty: '1 Year Electrical',
    stock: 10,
    stockStatus: 'In Stock',
    cloudinary_url: 'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129973/products/dewuc6aahclrdp3oopwc.webp',
    imageUrl: 'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129973/products/dewuc6aahclrdp3oopwc.webp',
    galleryUrls: [
      'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129973/products/dewuc6aahclrdp3oopwc.webp'
    ],
    description: 'Next-generation Fighter 1.0 cabinet purifier with high-flow booster pump and automatic flush valve.',
    specifications: {
      'Stages': '7 Stage (RO+UV+UF)',
      'Model': 'Fighter 1.0',
      'Warranty': '1 Year Electrical',
      'Stock Status': 'In Stock'
    },
    featured: false,
    rating: 4.9
  },
  {
    id: 'livotec-7-stage-cabinet-ro',
    name: 'Livotec 7 Stage Cabinet RO',
    category: 'Cabinet Purifiers',
    price: 25500,
    originalPrice: 29000,
    warranty: '1 Year Electrical',
    stock: 8,
    stockStatus: 'In Stock',
    cloudinary_url: 'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129975/products/bsgaesvaohhoo1tnnmky.webp',
    imageUrl: 'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129975/products/bsgaesvaohhoo1tnnmky.webp',
    galleryUrls: [
      'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129975/products/bsgaesvaohhoo1tnnmky.webp'
    ],
    description: 'Top-tier 7-stage enclosed Livotec cabinet RO purifier with luxury tempered glass aesthetics and digital TDS display.',
    specifications: {
      'Stages': '7 Stage RO Cabinet',
      'Warranty': '1 Year Electrical',
      'Stock Status': 'In Stock'
    },
    featured: true,
    rating: 5.0
  },
  {
    id: 'glass-door-cabinet-ro',
    name: 'Glass Door Cabinet RO',
    category: 'Cabinet Purifiers',
    price: 17500,
    originalPrice: 21000,
    warranty: '1 Year Electrical',
    stock: 14,
    stockStatus: 'In Stock',
    cloudinary_url: 'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129977/products/oxo8lbok09tbubbhfwdv.webp',
    imageUrl: 'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129977/products/oxo8lbok09tbubbhfwdv.webp',
    galleryUrls: [
      'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129977/products/oxo8lbok09tbubbhfwdv.webp'
    ],
    description: 'Designer tempered glass front panel cabinet RO water purifier with internal food-grade storage tank.',
    specifications: {
      'Front Panel': 'Tempered Glass',
      'Stages': '7 Stage RO',
      'Warranty': '1 Year Electrical',
      'Stock Status': 'In Stock'
    },
    featured: false,
    rating: 4.8
  },
  {
    id: 'modern-cabinet-filter',
    name: 'Modern Cabinet Filter',
    category: 'Cabinet Purifiers',
    price: 15200,
    originalPrice: 18000,
    warranty: '1 Year Electrical',
    stock: 16,
    stockStatus: 'In Stock',
    cloudinary_url: 'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129979/products/v2gjwzzytb1zfxxviuzp.webp',
    imageUrl: 'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129979/products/v2gjwzzytb1zfxxviuzp.webp',
    galleryUrls: [
      'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129979/products/v2gjwzzytb1zfxxviuzp.webp'
    ],
    description: 'Sleek modern cabinet design with high-capacity filter cartridges and quiet operation.',
    specifications: {
      'Type': 'Modern Cabinet',
      'Warranty': '1 Year Electrical',
      'Stock Status': 'In Stock'
    },
    featured: false,
    rating: 4.7
  },
  {
    id: 'slim-cabinet-purifier',
    name: 'Slim Cabinet Purifier',
    category: 'Cabinet Purifiers',
    price: 13800,
    originalPrice: 16500,
    warranty: '1 Year Electrical',
    stock: 22,
    stockStatus: 'In Stock',
    cloudinary_url: 'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129980/products/taobkrlmudanfqkm3juc.webp',
    imageUrl: 'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129980/products/taobkrlmudanfqkm3juc.webp',
    galleryUrls: [
      'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129980/products/taobkrlmudanfqkm3juc.webp'
    ],
    description: 'Ultra-slim footprint cabinet purifier engineered for modern urban apartments and compact kitchens.',
    specifications: {
      'Profile': 'Ultra Slim',
      'Warranty': '1 Year Electrical',
      'Stock Status': 'In Stock'
    },
    featured: false,
    rating: 4.7
  },
  {
    id: 'pure-x-100-gpd-ro-dispenser',
    name: 'Pure X 100 GPD RO Dispenser',
    category: 'Water Dispensers',
    price: 19500,
    originalPrice: 23000,
    warranty: '1 Year Electrical',
    stock: 7,
    stockStatus: 'In Stock',
    cloudinary_url: 'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129982/products/vydwh1f3whz3opnq3xvw.webp',
    imageUrl: 'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129982/products/vydwh1f3whz3opnq3xvw.webp',
    galleryUrls: [
      'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129982/products/vydwh1f3whz3opnq3xvw.webp'
    ],
    description: '100 GPD commercial grade water dispenser with high recovery RO system for heavy daily demand.',
    specifications: {
      'Capacity': '100 GPD (Gallons Per Day)',
      'Type': 'RO Water Dispenser',
      'Warranty': '1 Year Electrical',
      'Stock Status': 'In Stock'
    },
    featured: true,
    rating: 4.9
  },
  {
    id: 'heron-hot-cold-filter-dispenser',
    name: 'Heron Hot & Cold Filter Dispenser',
    category: 'Water Dispensers',
    price: 21000,
    originalPrice: 25000,
    warranty: '1 Year Electrical',
    stock: 9,
    stockStatus: 'In Stock',
    cloudinary_url: 'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129984/products/ojkvc4daccv5tbjbkfyd.webp',
    imageUrl: 'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129984/products/ojkvc4daccv5tbjbkfyd.webp',
    galleryUrls: [
      'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129984/products/ojkvc4daccv5tbjbkfyd.webp'
    ],
    description: 'Dual temperature hot & cold water filter dispenser with compressor cooling and safety hot tap.',
    specifications: {
      'Functions': 'Hot & Cold Water',
      'Cooling': 'Compressor Cooling',
      'Warranty': '1 Year Electrical',
      'Stock Status': 'In Stock'
    },
    featured: true,
    rating: 4.9
  },
  {
    id: 'table-top-water-dispenser',
    name: 'Table Top Water Dispenser',
    category: 'Water Dispensers',
    price: 18500,
    originalPrice: 21500,
    warranty: '1 Year Electrical',
    stock: 11,
    stockStatus: 'In Stock',
    cloudinary_url: 'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129986/products/zjyffa7nfazd9o7cj3s9.webp',
    imageUrl: 'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129986/products/zjyffa7nfazd9o7cj3s9.webp',
    galleryUrls: [
      'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129986/products/zjyffa7nfazd9o7cj3s9.webp'
    ],
    description: 'Countertop water dispenser providing instant purified drinking water without taking floor space.',
    specifications: {
      'Mounting': 'Countertop / Table Top',
      'Warranty': '1 Year Electrical',
      'Stock Status': 'In Stock'
    },
    featured: false,
    rating: 4.8
  },
  {
    id: 'puryca-premium-water-filter',
    name: 'Puryca Premium Water Filter',
    category: 'Filters & Cartridges',
    price: 4900,
    originalPrice: 6000,
    warranty: '6 Months',
    stock: 30,
    stockStatus: 'In Stock',
    cloudinary_url: 'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129988/products/ph7ek0a9y5gdfspwu42u.webp',
    imageUrl: 'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129988/products/ph7ek0a9y5gdfspwu42u.webp',
    galleryUrls: [
      'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129988/products/ph7ek0a9y5gdfspwu42u.webp'
    ],
    description: 'Premium multi-stage filter system delivering crystal clear drinking water and mineral enhancement.',
    specifications: {
      'Category': 'Filters & Cartridges',
      'Warranty': '6 Months',
      'Stock Status': 'In Stock'
    },
    featured: false,
    rating: 4.8
  },
  {
    id: 'pp-sediment-filter-cartridge',
    name: '10" / 20" PP Sediment Filter Cartridge',
    category: 'Filters & Cartridges',
    price: 450,
    originalPrice: 600,
    purpose: 'Removes dirt, rust, sand',
    warranty: '6 Months',
    stock: 100,
    stockStatus: 'In Stock',
    cloudinary_url: 'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129991/products/ydypolpgamimprtnjqlt.webp',
    imageUrl: 'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129991/products/ydypolpgamimprtnjqlt.webp',
    galleryUrls: [
      'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129991/products/ydypolpgamimprtnjqlt.webp'
    ],
    description: 'High density 5-micron polypropylene sediment cartridge for trapping rust, silt, scale, and sand particles.',
    specifications: {
      'Purpose': 'Removes dirt, rust, sand',
      'Size': '10" / 20" Standard',
      'Micron Rating': '5 Micron',
      'Stock Status': 'In Stock'
    },
    featured: true,
    rating: 4.9
  },
  {
    id: 'cto-carbon-block-filter-cartridge',
    name: 'CTO Carbon Block Filter Cartridge',
    category: 'Filters & Cartridges',
    price: 750,
    originalPrice: 950,
    purpose: 'Removes chlorine & odor',
    warranty: '6 Months',
    stock: 85,
    stockStatus: 'In Stock',
    cloudinary_url: 'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129993/products/gipp2udr5r0wd1lnugh5.webp',
    imageUrl: 'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129993/products/gipp2udr5r0wd1lnugh5.webp',
    galleryUrls: [
      'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129993/products/gipp2udr5r0wd1lnugh5.webp'
    ],
    description: 'Extruded coconut shell activated carbon block cartridge eliminating chlorine, odor, bad taste, and organic compounds.',
    specifications: {
      'Purpose': 'Removes chlorine & odor',
      'Material': 'Coconut Shell Activated Carbon',
      'Stock Status': 'In Stock'
    },
    featured: false,
    rating: 4.8
  },
  {
    id: 'high-quality-ro-membrane-75-gpd',
    name: 'High-Quality RO Membrane 75 GPD',
    category: 'Filters & Cartridges',
    price: 2200,
    originalPrice: 2800,
    purpose: 'Removes 99% dissolved solids',
    warranty: '6 Months',
    stock: 50,
    stockStatus: 'In Stock',
    cloudinary_url: 'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129995/products/jezun2zfy4fq7labcyjq.webp',
    imageUrl: 'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129995/products/jezun2zfy4fq7labcyjq.webp',
    galleryUrls: [
      'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129995/products/jezun2zfy4fq7labcyjq.webp'
    ],
    description: 'High-rejection 75 GPD reverse osmosis membrane filtering out 99% of dissolved solids, heavy metals, arsenic, and bacteria.',
    specifications: {
      'Purpose': 'Removes 99% dissolved solids',
      'Flow Rate': '75 GPD',
      'Desalination Rate': '98%',
      'Stock Status': 'In Stock'
    },
    featured: true,
    rating: 5.0
  },
  {
    id: '500-lph-commercial-ro-plant',
    name: '500 LPH Commercial RO Plant',
    category: 'Industrial RO Plants',
    price: 125000,
    originalPrice: 145000,
    application: 'Commercial',
    warranty: '1 Year Electrical',
    stock: 3,
    stockStatus: 'In Stock',
    cloudinary_url: 'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129997/products/ffxupyrmzlhmayyplseq.webp',
    imageUrl: 'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129997/products/ffxupyrmzlhmayyplseq.webp',
    galleryUrls: [
      'https://res.cloudinary.com/rvoym2gw/image/upload/v1786129997/products/ffxupyrmzlhmayyplseq.webp'
    ],
    description: '500 Liters Per Hour heavy-duty commercial reverse osmosis plant with stainless steel frame, high-pressure pump, and pre-filtration vessels.',
    specifications: {
      'Capacity': '500 LPH',
      'Application': 'Commercial',
      'Pump': '1.5 HP High Pressure Pump',
      'Frame': 'SS 304 Stainless Steel',
      'Warranty': '1 Year Electrical'
    },
    featured: true,
    rating: 5.0
  },
  {
    id: '1000-lph-industrial-ro-plant',
    name: '1000 LPH Industrial RO Plant',
    category: 'Industrial RO Plants',
    price: 245000,
    originalPrice: 280000,
    application: 'Factories',
    warranty: '1 Year Electrical',
    stock: 2,
    stockStatus: 'In Stock',
    cloudinary_url: 'https://res.cloudinary.com/rvoym2gw/image/upload/v1786130000/products/zgmcryf60lcwvlpbaaoc.webp',
    imageUrl: 'https://res.cloudinary.com/rvoym2gw/image/upload/v1786130000/products/zgmcryf60lcwvlpbaaoc.webp',
    galleryUrls: [
      'https://res.cloudinary.com/rvoym2gw/image/upload/v1786130000/products/zgmcryf60lcwvlpbaaoc.webp'
    ],
    description: '1000 Liters Per Hour industrial scale water purification plant designed for factories, food processing, pharmaceutical, and large residential complexes.',
    specifications: {
      'Capacity': '1000 LPH',
      'Application': 'Factories',
      'Control Panel': 'Automatic Microprocessor',
      'Membranes': 'Dual 4040 RO Membranes',
      'Warranty': '1 Year Electrical'
    },
    featured: true,
    rating: 5.0
  }
];

export const REAL_SERVICES = [
  {
    id: 'free-water-quality-testing',
    title: 'Free Water Quality Testing',
    description: 'Free TDS, pH, and hardness testing at your doorstep in Dhaka to evaluate water safety.',
    badge: '100% Free Service',
    icon: 'TestTube'
  },
  {
    id: 'professional-installation',
    title: 'Professional Installation',
    description: 'Certified expert technician setup for all residential purifiers, dispensers, and commercial plants.',
    badge: 'Free on ৳15k+ Orders',
    icon: 'Cpu'
  },
  {
    id: 'servicing-on-demand-repair',
    title: 'Servicing & On-Demand Repair',
    description: 'Rapid 24-hour response maintenance, leak repair, and filter replacement on-call.',
    badge: '2-Hour Dispatch',
    icon: 'Wrench'
  },
  {
    id: 'filter-replacement-amc',
    title: 'Filter Replacement & AMC',
    description: 'Annual Maintenance Contracts (AMC) ensuring scheduled genuine filter changes and zero breakdown hassle.',
    badge: '365 Days Guarantee',
    icon: 'Shield'
  },
  {
    id: 'industrial-plant-consulting',
    title: 'Industrial Plant Consulting',
    description: 'Custom design, engineering, and turnkey installation of commercial & industrial RO plants (500 to 10,000+ LPH).',
    badge: 'Custom Engineering',
    icon: 'Building'
  }
];

export const REAL_FAQS = [
  {
    id: 'faq-1',
    question: 'How often should I change my water purifier filters?',
    answer: 'PP sediment and CTO carbon filters should generally be replaced every 6 to 9 months, while the RO membrane usually lasts 18 to 24 months depending on feed water TDS.'
  },
  {
    id: 'faq-2',
    question: 'Do you offer free water testing before purchasing?',
    answer: 'Yes, Aqua Point BD provides free doorstep TDS and water quality testing in Dhaka to help you select the exact purification system needed.'
  },
  {
    id: 'faq-3',
    question: 'What warranty comes with Aqua Point BD products?',
    answer: 'All standard RO purifiers and dispensers come with a 1-Year Electrical Components Warranty plus dedicated after-sales support.'
  },
  {
    id: 'faq-4',
    question: 'Can Aqua Point BD install industrial RO plants for commercial buildings?',
    answer: 'Absolutely! We design, deliver, and maintain custom commercial and industrial RO plants ranging from 500 LPH to 10,000+ LPH for factories, schools, and hospitals.'
  },
  {
    id: 'faq-5',
    question: 'How can I book a servicing appointment?',
    answer: 'You can book directly via our online Service Booking page or call our helpline at 01780-885841 / 09613 700 750.'
  }
];

export const REAL_COMPANY_INFO = {
  id: 'main',
  name: 'Aqua Point BD',
  foundedYear: '2007',
  founder: 'Enjamamul Haque (Kiron)',
  address: 'House 72, Janata Housing Road, 3 Ring Road, Dhaka 1219',
  helpline: '01780-885841 / 09613 700 750',
  email: 'aquabd112@gmail.com',
  description: 'Founded in 2007 by Enjamamul Haque (Kiron), Aqua Point BD is Bangladesh’s trusted provider of domestic RO purifiers, cabinet filters, dispensers, genuine cartridges, and commercial RO plants.'
};

export const seedAquaPointDatabase = async (): Promise<{ success: boolean; seededCount: number; errors: any[] }> => {
  const errors: any[] = [];
  let seededCount = 0;

  console.log('Beginning Firestore seeding for project aqua-point-bd...');

  // 1. Seed Products
  for (const product of REAL_PRODUCTS) {
    try {
      const docRef = doc(db, PRODUCTS_COLLECTION, product.id);
      await setDoc(docRef, product, { merge: true });
      seededCount++;
    } catch (err) {
      console.error(`Error seeding product ${product.id}:`, err);
      errors.push({ type: 'product', id: product.id, error: err });
    }
  }

  // 2. Seed Services
  for (const service of REAL_SERVICES) {
    try {
      const docRef = doc(db, SERVICES_COLLECTION, service.id);
      await setDoc(docRef, service, { merge: true });
      seededCount++;
    } catch (err) {
      console.error(`Error seeding service ${service.id}:`, err);
      errors.push({ type: 'service', id: service.id, error: err });
    }
  }

  // 3. Seed FAQs
  for (const faq of REAL_FAQS) {
    try {
      const docRef = doc(db, FAQS_COLLECTION, faq.id);
      await setDoc(docRef, faq, { merge: true });
      seededCount++;
    } catch (err) {
      console.error(`Error seeding faq ${faq.id}:`, err);
      errors.push({ type: 'faq', id: faq.id, error: err });
    }
  }

  // 4. Seed Company Info
  try {
    const docRef = doc(db, COMPANY_INFO_COLLECTION, REAL_COMPANY_INFO.id);
    await setDoc(docRef, REAL_COMPANY_INFO, { merge: true });
    seededCount++;
  } catch (err) {
    console.error('Error seeding company info:', err);
    errors.push({ type: 'company_info', id: REAL_COMPANY_INFO.id, error: err });
  }

  console.log(`Seeding complete. Successfully wrote ${seededCount} items with ${errors.length} errors.`);
  return { success: errors.length === 0, seededCount, errors };
};

// Self-executing CLI runner when executed via node / tsx
if (typeof require !== 'undefined' && require.main === module) {
  seedAquaPointDatabase()
    .then((res) => {
      console.log('Seeding result:', res);
      process.exit(res.success ? 0 : 1);
    })
    .catch((err) => {
      console.error('Unhandled seed error:', err);
      process.exit(1);
    });
}
