import { ProductItem } from '../services/firebase';
import { SAMPLE_PRODUCT_IMAGES } from '../services/cloudinary';

export const SAMPLE_PRODUCTS: ProductItem[] = [
  {
    id: 'ro-supreme-01',
    name: 'Aqua Point Supreme RO + UV + UF Purifier',
    category: 'RO Purifiers',
    price: 18500,
    originalPrice: 22000,
    description: '7-stage smart filtration system with TDS controller, alkaline mineralizer, and automated backwash. Keeps water pristine and 99.99% pathogen free.',
    specifications: {
      'Capacity': '12 Liters / Hour',
      'Filtration Stages': '7 Stages (Sediment, Carbon, RO Membrane, UV, UF, Mineral, TDS)',
      'Storage Tank': '10 Liters Stainless Steel',
      'TDS Range': 'Up to 2000 PPM',
      'Power Consumption': '36W'
    },
    warranty: '2 Years Full On-Site Warranty + 3 Free Servicings',
    imageUrl: SAMPLE_PRODUCT_IMAGES.roPurifier,
    galleryUrls: [
      SAMPLE_PRODUCT_IMAGES.roPurifier,
      SAMPLE_PRODUCT_IMAGES.mineralPurifier,
      SAMPLE_PRODUCT_IMAGES.membrane
    ],
    stock: 25,
    rating: 4.9,
    featured: true
  },
  {
    id: 'ro-ultra-mineral-02',
    name: 'Aqua Point Mineral Guard RO System',
    category: 'RO Purifiers',
    price: 14500,
    originalPrice: 17000,
    description: 'Advanced mineral retention technology with active copper and zinc infusion for healthy drinking water.',
    specifications: {
      'Capacity': '10 Liters / Hour',
      'Filtration Stages': '6 Stages',
      'Storage Tank': '8 Liters Food Grade Plastic',
      'TDS Range': 'Up to 1500 PPM',
      'Power Consumption': '30W'
    },
    warranty: '1 Year Comprehensive Warranty',
    imageUrl: SAMPLE_PRODUCT_IMAGES.mineralPurifier,
    galleryUrls: [
      SAMPLE_PRODUCT_IMAGES.mineralPurifier,
      SAMPLE_PRODUCT_IMAGES.filterCartridge
    ],
    stock: 18,
    rating: 4.8,
    featured: true
  },
  {
    id: 'filter-carbon-03',
    name: 'Aqua Point Activated Carbon Block Filter',
    category: 'Water Filters',
    price: 1200,
    originalPrice: 1500,
    description: '100% pure coconut shell carbon block filter for maximum odor, chlorine, and organic compound removal.',
    specifications: {
      'Size': '10 Inch Standard',
      'Material': 'Coconut Shell Activated Carbon',
      'Lifespan': '6-8 Months',
      'Micron Rating': '5 Micron'
    },
    warranty: 'Replacement Guarantee against defect',
    imageUrl: SAMPLE_PRODUCT_IMAGES.filterCartridge,
    stock: 150,
    rating: 4.7,
    featured: true
  },
  {
    id: 'ro-industrial-plant-04',
    name: 'Aqua Point Commercial RO Plant 500 LPH',
    category: 'Industrial RO Plants',
    price: 145000,
    originalPrice: 165000,
    description: 'Heavy duty commercial reverse osmosis plant for factories, hospitals, residential buildings, and restaurants.',
    specifications: {
      'Capacity': '500 Liters / Hour',
      'Membrane Type': '4040 Dow Filmtec RO Membrane',
      'Pump': 'VCN High Pressure Pump 1.5 HP',
      'Frame': 'SS 304 Stainless Steel Frame',
      'Control Panel': 'Automatic Microprocessor Controller'
    },
    warranty: '2 Years Commercial Warranty & Free Installation',
    imageUrl: SAMPLE_PRODUCT_IMAGES.industrialRo,
    stock: 5,
    rating: 5.0,
    featured: true
  },
  {
    id: 'spare-membrane-05',
    name: 'Aqua Point High-Flow 75 GPD RO Membrane',
    category: 'Spare Parts',
    price: 2400,
    originalPrice: 2800,
    description: 'Original high-rejection thin film composite membrane removing up to 98% dissolved solids.',
    specifications: {
      'Flow Rate': '75 GPD (Gallons Per Day)',
      'Desalination Rate': '97%-98%',
      'Operating Pressure': '60-80 PSI'
    },
    warranty: '6 Months Guarantee',
    imageUrl: SAMPLE_PRODUCT_IMAGES.membrane,
    stock: 80,
    rating: 4.8,
    featured: false
  },
  {
    id: 'uv-sterilizer-06',
    name: 'Aqua Point UV Chamber Disinfection Module',
    category: 'Spare Parts',
    price: 3200,
    originalPrice: 3800,
    description: 'Stainless steel UV sterilizer chamber with Phillips UV lamp for instantaneous bacterial sterilization.',
    specifications: {
      'Chamber Material': 'SS 304 Stainless Steel',
      'Lamp Power': '11W Philips UV Tube',
      'Flow Rate': '1-2 GPM'
    },
    warranty: '1 Year Warranty',
    imageUrl: SAMPLE_PRODUCT_IMAGES.uvSterilizer,
    stock: 45,
    rating: 4.9,
    featured: false
  }
];
