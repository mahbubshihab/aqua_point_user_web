import React from 'react';
import { HeroSlider } from '@/features/home/HeroSlider';
import { CategoryShowcaseGrid } from '@/features/home/CategoryShowcaseGrid';
import { FeaturedProducts } from '@/features/home/FeaturedProducts';
import { WaterTelemetryMeter } from '@/features/home/WaterTelemetryMeter';
import { ServicesHighlight } from '@/features/home/ServicesHighlight';
import { WhyUsAndTestimonials } from '@/features/home/WhyUsAndTestimonials';

export default function HomePage() {
  return (
    <div className="space-y-6 pb-12">
      <HeroSlider />
      <CategoryShowcaseGrid />
      <FeaturedProducts />
      <WaterTelemetryMeter />
      <ServicesHighlight />
      <WhyUsAndTestimonials />
    </div>
  );
}
