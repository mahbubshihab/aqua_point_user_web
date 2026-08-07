import React from 'react';
import { ServiceBookingForm } from '@/features/services/ServiceBookingForm';

export const metadata = {
  title: 'Book Technician Service | Aqua Point Water Solutions',
  description: 'Book certified technician servicing, filter cartridge replacement, and RO machine repairs.',
};

export default function ServicesPage() {
  return <ServiceBookingForm />;
}
