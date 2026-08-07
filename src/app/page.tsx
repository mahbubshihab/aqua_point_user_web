import React from 'react';
import { HeroSlider } from '@/features/home/HeroSlider';
import { CategoryShowcaseGrid } from '@/features/home/CategoryShowcaseGrid';
import { FeaturedProducts } from '@/features/home/FeaturedProducts';
import { ServicesHighlight } from '@/features/home/ServicesHighlight';
import { WaterQualityMeter } from '@/features/home/WaterQualityMeter';
import { AboutCompanySection } from '@/features/home/AboutCompanySection';
import { FaqsSection } from '@/features/home/FaqsSection';
import { TestimonialsSection } from '@/features/home/TestimonialsSection';

export default function HomePage() {
  return (
    <div className="space-y-6 pb-12">
      {/* 2. Full-Width Hero Banner Slider */}
      <HeroSlider />

      {/* 3. Product Categories Showcase */}
      <CategoryShowcaseGrid />

      {/* 4. Featured Products Catalog (19 Authentic Products) */}
      <FeaturedProducts />

      {/* 5. Water Treatment Services */}
      <ServicesHighlight />

      {/* 6. Interactive TDS Meter / Water Quality Tester */}
      <WaterQualityMeter />

      {/* 7. About Aqua Point BD */}
      <AboutCompanySection />

      {/* 8. Authentic FAQs Accordion */}
      <FaqsSection />

      {/* 9. Customer Reviews */}
      <TestimonialsSection />
    </div>
  );
}
