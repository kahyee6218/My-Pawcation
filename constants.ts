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
    ownerName: "Mei Ling",
    dogName: "Oreo",
    breed: "Shih Tzu",
    text: "I was so worried about leaving Oreo because he hates cages. My Pawcation is truly a home! He slept on a cozy rug and made so many friends. The daily WhatsApp videos kept me sane during my trip.",
    rating: 5,
    imageUrl: "https://images.unsplash.com/photo-1591946614720-90a587da4a36?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 2,
    ownerName: "Rajiv & Sarah",
    dogName: "Bruno",
    breed: "Golden Retriever",
    text: "The space is huge and clean. Bruno came back happy and tired (the good kind!). I love that they are transparent about their capacity limits. Feels very safe.",
    rating: 5,
    imageUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 3,
    ownerName: "Jessica Tan",
    dogName: "Mochi",
    breed: "Poodle",
    text: "Professional yet warm. They administered Mochi's eye drops perfectly. It's hard to find a place in KL that feels this personal. Highly recommended!",
    rating: 4,
    imageUrl: "https://images.unsplash.com/photo-1605248169874-a690e1188173?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 4,
    ownerName: "Ahmad Z.",
    dogName: "Rocky",
    breed: "Beagle",
    text: "Rocky can be a bit stubborn, but the team handled him with so much patience. He actually didn't want to leave when I picked him up!",
    rating: 5,
    imageUrl: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 5,
    ownerName: "Michelle L.",
    dogName: "Luna",
    breed: "Corgi",
    text: "Great facility, very clean. The only downside is they book up so fast during holidays! But that shows how good they are.",
    rating: 4,
    imageUrl: "https://images.unsplash.com/photo-1612536053345-1171a174a025?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 6,
    ownerName: "Kenji",
    dogName: "Hachi",
    breed: "Shiba Inu",
    text: "10/10 experience. The daily updates are detailed, and I can tell the staff really loves dogs. Will definitely book again.",
    rating: 5,
    imageUrl: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=400&q=80"
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