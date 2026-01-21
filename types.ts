import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
}

export interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  price?: string;
}

export interface Testimonial {
  id: number;
  ownerName: string;
  dogName: string;
  breed: string;
  text: string;
  rating: number;
  imageUrl: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Facility {
  title: string;
  description: string;
  imageUrl: string;
}

export interface PricingTier {
  size: string;
  weight: string;
  daycarePrice: string;
  boardingPrice: string;
  features: string[];
}
