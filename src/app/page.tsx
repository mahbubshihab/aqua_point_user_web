import React from 'react';
import { HeroSlider } from '@/features/home/HeroSlider';
import { QuickActionCards } from '@/features/home/QuickActionCards';
import { WaterTelemetryMeter } from '@/features/home/WaterTelemetryMeter';
import { FeaturedProducts } from '@/features/home/FeaturedProducts';
import { ServicesHighlight } from '@/features/home/ServicesHighlight';
import { WhyUsAndTestimonials } from '@/features/home/WhyUsAndTestimonials';

export default function HomePage() {
  return (
    <div className="space-y-6 pb-12">
      <HeroSlider />
      <QuickActionCards />
      <FeaturedProducts />
      <WaterTelemetryMeter />
      <ServicesHighlight />
      <WhyUsAndTestimonials />
    </div>
  );
}
