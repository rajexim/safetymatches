import React from 'react';
import HeroSection from '../components/HeroSection';
import ProductCatalog from '../components/ProductCatalog';
import ExportFootprint from '../components/ExportFootprint';
import AeoFaqSection from '../components/AeoFaqSection';

export default function HomePage({ onOpenRfq }) {
  return (
    <div className="space-y-0">
      <HeroSection onOpenRfq={onOpenRfq} />
      <ProductCatalog onOpenRfq={onOpenRfq} />
      <ExportFootprint />
      <AeoFaqSection onOpenRfq={onOpenRfq} />
    </div>
  );
}
