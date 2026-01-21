import {
  Home,
  Sun,
  Moon,
  Scissors,
  Heart,
  ShieldCheck,
  Clock,
  Bone,
  MapPin,
  Car
} from 'lucide-react';
import { NavItem, Service, Testimonial, FaqItem, Facility, PricingTier } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

export const SERVICES: Service[] = [
  {
    title: 'Home-Style Boarding',
    description: 'Cage-free living in a warm home environment. Your dog sleeps indoors with soothing music and 24/7 supervision.',
    icon: Home,
    features: ['No cages (Baby gates only)', 'Air-conditioned zones', 'Daily photo/video updates', 'Evening tuck-in service'],
    price: 'From RM40/night'
  },
  {
    title: 'Daycare Fun',
    description: 'Perfect for busy parents. A day full of socialization, sensory games, and nap times in our secure zones.',
    icon: Sun,
    features: ['Group play sessions', 'Behavioral monitoring', 'Rest periods', 'Feeding included'],
    price: 'From RM20/day'
  },
  {
    title: 'Visit-to-Feed',
    description: 'We come to you! Ideal for cats or dogs who prefer staying in their own environment.',
    icon: Car,
    features: ['Feeding & Water top-up', 'Litter/Potty clean up', 'Playtime & Cuddles', 'Home security check'],
    price: 'From RM30/visit'
  },
  {
    title: 'Special Care',
    description: 'Dedicated attention for seniors, puppies, or pets with medical needs. We treat them like our own.',
    icon: Heart,
    features: ['Medication administration', 'Special diets handling', 'Mobility support', 'Isolation zone available'],
    price: 'Custom Quote'
  }
];

export const PRICING_TIERS: PricingTier[] = [
  {
    size: "Small",
    weight: "≤ 7kg",
    daycarePrice: "RM 20",
    boardingPrice: "RM 40",
    features: ["Standard Playtime", "Daily Updates"]
  },
  {
    size: "Medium",
    weight: "7 - 15kg",
    daycarePrice: "RM 30",
    boardingPrice: "RM 55",
    features: ["Standard Playtime", "Daily Updates"]
  },
  {
    size: "Large",
    weight: "15kg +",
    daycarePrice: "RM 40",
    boardingPrice: "RM 70",
    features: ["Standard Playtime", "Daily Updates"]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    ownerName: "Erica",
    dogName: "Cotton",
    breed: "Japanese Spitz",
    text: "Cotton feels so at home here. I never have to worry about cages or her being lonely. The daily WhatsApp updates are the highlight of my day when I'm away. Truly a premier boarding experience in KL!",
    rating: 5,
    imageUrl: "/assets/dog-spitz.jpg"
  },
  {
    id: 2,
    ownerName: "Wei Ren",
    dogName: "Cooper",
    breed: "Golden Retriever",
    text: "The space is amazing and very clean. Cooper always comes back happy and well-rested. It's rare to find a place that handles large breeds with so much care and attention to detail.",
    rating: 5,
    imageUrl: "/assets/dog-golden.jpg"
  },
  {
    id: 3,
    ownerName: "Sarah L.",
    dogName: "Mochi",
    breed: "Poodle",
    text: "Professional, transparent, and most importantly, loving. They even prepared fresh meals for Mochi when she was being a picky eater. Highly recommend for any pawrent!",
    rating: 5,
    imageUrl: "/assets/dog-food.jpg"
  }
];

export const FAQS: FaqItem[] = [
  {
    question: "Do you use cages?",
    answer: "Absolutely not! We are a 100% cage-free facility. We use baby gates to separate play zones and ensure safety, just like in a real home."
  },
  {
    question: "What vaccinations are required?",
    answer: "For the safety of all guests, we strictly require proof of valid core vaccinations (Distemper, Parvovirus, Hepatitis) and Rabies. Kennel Cough (Bordetella) is highly recommended."
  },
  {
    question: "Do I need to bring food?",
    answer: "Yes, we recommend bringing your dog's regular food to prevent tummy upsets from switching diets. We have a fridge and freezer for fresh/raw food diets too!"
  },
  {
    question: "What if there is an emergency?",
    answer: "We have a 24/7 standby vehicle and are partnered with a nearby veterinary clinic (5 mins away). We will contact you immediately while transporting your pet."
  },
  {
    question: "How do you handle aggressive dogs?",
    answer: "For the safety of our pack, we do not accept aggressive dogs. A behavioral assessment is conducted before the first boarding to ensure a harmonious environment."
  }
];

export const FACILITIES: Facility[] = [];