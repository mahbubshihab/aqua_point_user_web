import React from 'react';
import { HeroSlider } from '@/features/home/HeroSlider';
import { CategoriesSection } from '@/features/home/CategoriesSection';
import { ProductTypeSection } from '@/features/home/ProductTypeSection';
import { FeaturedProducts } from '@/features/home/FeaturedProducts';
import { ServicesHighlight } from '@/features/home/ServicesHighlight';
import { WaterQualityMeter } from '@/features/home/WaterQualityMeter';
import { AboutCompanySection } from '@/features/home/AboutCompanySection';
import { OurClientsSection } from '@/features/home/OurClientsSection';
import { FaqsSection } from '@/features/home/FaqsSection';
import { TestimonialsSection } from '@/features/home/TestimonialsSection';

export default function HomePage() {
  return (
    <div className="space-y-6 pb-12">
      {/* 1. Full-Width Hero Banner Slider */}
      <HeroSlider />

      {/* 2. Product Categories Showcase */}
      <CategoriesSection />

      {/* 3. Dedicated Product Type Sections */}
      <ProductTypeSection
        type="open_type"
        title="Open Type Purifiers"
        subtitle="High-performance open frame RO systems engineered for robust filtration & easy maintenance."
        badgeTag="💧 OPEN FRAME SYSTEMS"
      />

      <ProductTypeSection
        type="box_type"
        title="Box Type Purifiers"
        subtitle="Compact, enclosed box design purifiers perfect for modern space-conscious kitchens."
        badgeTag="📦 BOX TYPE PURIFIERS"
      />

      <ProductTypeSection
        type="hot_cold_normal"
        title="Hot Cold Normal Purifiers"
        subtitle="Multi-temperature RO water dispensers serving instant hot, cold, and room-temp purified water."
        badgeTag="❄️🔥 TRIPLE TEMP DISPENSERS"
      />

      <ProductTypeSection
        type="cabinet_type"
        title="Cabinet Type Purifiers"
        subtitle="Premium glass & stainless steel cabinet purifiers combining luxury style with 7-stage RO filtration."
        badgeTag="🛡️ CABINET PURIFIERS"
      />

      {/* 4. Featured Products Catalog */}
      <FeaturedProducts />

      {/* 5. Water Treatment Services */}
      <ServicesHighlight />

      {/* 6. Interactive TDS Meter / Water Quality Tester */}
      <WaterQualityMeter />

      {/* 7. About Aqua Point BD */}
      <AboutCompanySection />

      {/* 8. Corporate Clients Showcase */}
      <OurClientsSection />

      {/* 9. Authentic FAQs Accordion */}
      <FaqsSection />

      {/* 10. Customer Reviews */}
      <TestimonialsSection />
    </div>
  );
}
