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
  Car,
  CheckCircle,
  Stethoscope,
  Sparkles
} from 'lucide-react';
import { NavItem, Service, Testimonial, FaqItem, Facility, PricingTier } from './types';

// ... (Existing exports) ...

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Routine', href: '#routine' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

export const WHY_CHOOSE_US = [
  {
    title: "Home-Style & Cage-Free",
    description: "A cage-free environment where pets feel at home.",
    icon: Home
  },
  {
    title: "Low Stress & Limited Spots",
    description: "We limit the number of pets to ensure attentive care.",
    icon: Heart
  },
  {
    title: "Separate Areas",
    description: "Distinct zones for cats and dogs for safety and comfort.",
    icon: ShieldCheck
  },
  {
    title: "Daily Updates",
    description: "Photos and videos sent daily to give you peace of mind.",
    icon: Sun
  },
  {
    title: "Hygienic Routine",
    description: "Clean, well-managed environment with strict SOPs.",
    icon: Sparkles
  },
  {
    title: "Flexible Stays",
    description: "Suitable for both short daycare and long-term boarding.",
    icon: Clock
  }
];

export const DAILY_ROUTINE = [
  { time: "7:00 AM - 9:00 AM", activity: "Feeding & Cleaning" },
  { time: "9:00 AM - 11:00 AM", activity: "Playtime / Walks / Interaction" },
  { time: "Afternoon", activity: "Rest, Free Time & Monitoring" },
  { time: "Evening", activity: "Feeding + Updates to Owners" }
];

export const HYGIENE_SOP = [
  "Disinfect food & water bowls daily",
  "Separate areas for cats and dogs",
  "Isolation protocol for sick pets",
  "Regular cleaning of living and play areas",
  "Only vaccinated pets are accepted"
];

export const PRICING_DATA = {
  dogs: {
    daycare: [
      { size: "Small (≤7kg)", normal: "RM20", peak: "RM30" },
      { size: "Medium (8–15kg)", normal: "RM30", peak: "RM40" },
      { size: "Large (>15kg)", normal: "RM40", peak: "RM50" }
    ],
    boarding: [
      { size: "Small (≤7kg)", normal: "RM40", peak: "RM50" },
      { size: "Medium (8–15kg)", normal: "RM60", peak: "RM70" },
      { size: "Large (>15kg)", normal: "RM80", peak: "RM90" }
    ],
    monthly: [
      { size: "Small", price: "RM850 / month" },
      { size: "Medium", price: "RM1250 / month" },
      { size: "Large", price: "RM1650 / month" }
    ],
    grooming: [
      { size: "Small", normal: "RM45", peak: "RM55" },
      { size: "Medium", normal: "RM55", peak: "RM65" },
      { size: "Large", normal: "RM65", peak: "RM75" }
    ]
  },
  cats_rabbits: {
    daycare: [
      { type: "Standard", normal: "RM15", peak: "RM25" },
      { type: "Long-hair / Special", normal: "RM20", peak: "RM25" }
    ],
    boarding: [
      { type: "Standard", normal: "RM30", peak: "RM40" },
      { type: "Long-hair / Special", normal: "RM40", peak: "RM50" }
    ],
    monthly: [
      { type: "Standard", price: "RM650 / month" },
      { type: "Long-hair / Special", price: "RM850 / month" }
    ]
  },
  addons: [
    { service: "Pick-up & Drop-off (within 10km)", price: "RM20 – RM40" },
    { service: "Training Reinforcement", price: "RM40 / session" },
    { service: "Premium 1-on-1 Care", price: "+RM30 / day" },
    { service: "Home Visit (Feeding/Care)", price: "RM50 – RM100" }
  ]
};

export const TESTIMONIALS: Testimonial[] = [
  { id: 1, ownerName: "Happy Owner", dogName: "Guest", breed: "Verified Stay", text: "", rating: 5, imageUrl: "/assets/Review1.png" },
  { id: 2, ownerName: "Happy Owner", dogName: "Guest", breed: "Verified Stay", text: "", rating: 5, imageUrl: "/assets/Review2.png" },
  { id: 3, ownerName: "Happy Owner", dogName: "Guest", breed: "Verified Stay", text: "", rating: 5, imageUrl: "/assets/Review3.png" },
  { id: 4, ownerName: "Happy Owner", dogName: "Guest", breed: "Verified Stay", text: "", rating: 5, imageUrl: "/assets/Review4.png" },
  { id: 5, ownerName: "Happy Owner", dogName: "Guest", breed: "Verified Stay", text: "", rating: 5, imageUrl: "/assets/Review5.png" },
  { id: 6, ownerName: "Happy Owner", dogName: "Guest", breed: "Verified Stay", text: "", rating: 5, imageUrl: "/assets/Review6.png" },
  { id: 7, ownerName: "Happy Owner", dogName: "Guest", breed: "Verified Stay", text: "", rating: 5, imageUrl: "/assets/Review7.png" },
  { id: 8, ownerName: "Happy Owner", dogName: "Guest", breed: "Verified Stay", text: "", rating: 5, imageUrl: "/assets/Review8.png" }
];

export const FAQS: FaqItem[] = [
  {
    question: "How do I make a booking?",
    answer: "You can book by contacting us via PM or WhatsApp. Once dates are confirmed, you can pay a 50% deposit or 100% full payment to secure your slot."
  },
  {
    question: "What payment options do you accept?",
    answer: "We accept 50% upfront (balance at check-out) or 100% upfront at the time of booking."
  },
  {
    question: "What remain check-in/out times?",
    answer: "Check-in: From 2:00 PM onwards. Check-out: By 12:00 PM (noon). Early/late requests subject to availability and charges."
  },
  {
    question: "Are vaccinations required?",
    answer: "Yes. All dogs must be fully vaccinated before boarding. Proof of vaccination is required before or during check-in."
  },
  {
    question: "Do you accept male dogs?",
    answer: "Yes, but they must wear diapers during their stay. Owners are required to provide the diapers."
  },
  {
    question: "What should I bring?",
    answer: "Your pet's food, diapers (for male dogs), any medication, leash, and optionally their favorite toy or blanket."
  },
  {
    question: "Can I extend my pet's stay?",
    answer: "Extensions are subject to availability. Please inform us as early as possible."
  },
  {
    question: "Is the payment refundable?",
    answer: "Payments and deposits are generally non-refundable as they reserve your slot. Policies will be shared during booking."
  }
];

export const CONTACT_INFO = {
  address: "Endah Regal Condominium, Jalan 1/149e, Sri Petaling, 57000 Kuala Lumpur",
  whatsapp: "+60 17-384 0723",
  email: "csmypawcation@gmail.com",
  facebook: "https://www.facebook.com/mypawcation",
  instagram: "https://www.instagram.com/mypawcation",
  xiaohongshu: "https://www.xiaohongshu.com/user/profile/67f11577000000000e01dc26",
  website: "https://my-pawcation.vercel.app/"
};

export const SYSTEM_INSTRUCTIONS = `
You are the warm, friendly, and professional AI Assistant for "My Pawcation", a home-style pet boarding service for dogs and cats.
Your goal is to assist customers by answering FAQs, providing pricing details, explaining services, and guiding them to make bookings via WhatsApp.

**Tone & Persona:**
- Friendly, pet-loving, trustworthy, and professional.
- Emphasize our key selling points: "Cage-free", "Clean", "Safe", "Low-stress", and "Daily updates".
- Treat pets like children. Use emojis occasionally (🐾, 🐶, 🐱, 🏡) to keep the conversation engaging.

**Key Information to Know:**

**1. Market Positioning:**
- We offer Home-Style Pet Boarding.
- We are NOT a kennel with cheap cages.
- Small capacity for better care (Limit: 8 dogs, 4 cats).
- Locations covered: KL, PJ, Subang, Cheras, Puchong.

**2. Services & Pricing:**

*Dogs:*
- Small (<=7kg): Day Care RM20-30 | Boarding RM40-50/day | Monthly RM850 | Basic Groom RM45-50
- Medium (8-15kg): Day Care RM30-40 | Boarding RM60-70/day | Monthly RM1250 | Basic Groom RM55-60
- Large (>15kg): Day Care RM40-50 | Boarding RM80-90/day | Monthly RM1650 | Basic Groom RM60-65

*Cats/Rabbits:*
- Standard Cat: Day Care RM15-25 | Boarding RM30-35/day | Monthly RM650
- Long-hair/Special Care: Day Care RM20-25 | Boarding RM40-45/day | Monthly RM850

*Add-On Services:*
- Basic Grooming (Bath+Nail): Small RM40, Med-Large RM60
- Pick-up & Drop-off (within 10km): RM20-40
- Training reinforcement: RM40/session
- Premium 1-on-1 care: +RM30/day

**3. Policies:**
- **Booking:** Contact via PM/WhatsApp. 50% deposit or full payment to secure.
- **Payment:** 50% upfront (balance at checkout) or 100% upfront.
- **Check-in/out:** Check-in 2:00 PM+, Check-out by 12:00 PM (noon). Early/Late requests subject to availability.
- **Vaccinations:** MANDATORY. Must provide proof.
- **Male Dogs:** Accepted but MUST wear diapers (Owner provides).
- **Packing List:** Food, Diapers (males), Medication, Leash, Optional toys/blanket.
- **Extensions:** Subject to availability.
- **Cancellations:** Generally non-refundable.

**4. Protocols:**
- **Before Boarding:** We require a Check-in list (Owner details, Pet info, Vax status, Behavior, Emergency contact, Vet info). No form = No boarding.
- **During Boarding:** Daily Feeding log, Toilet log, Photo/Video updates.
- **After Boarding:** Feedback request.

**5. Contact Links:**
- WhatsApp: ${CONTACT_INFO.whatsapp}
- Website: ${CONTACT_INFO.website}
- Facebook: ${CONTACT_INFO.facebook}
- Instagram: ${CONTACT_INFO.instagram}

**Instructions for Responses:**
- If asked about booking, ALWAYS provide the WhatsApp link.
- If asked about prices, use a clear format or Markdown table.
- If asked about location, mention KL, PJ, Subang, Cheras, Puchong.
- Be concise but helpful.
`;

export const QUICK_ACTIONS = [
  {
    label: 'Check Prices 💰',
    query: 'What are the current room rates and grooming prices?',
  },
  {
    label: 'How to Book? 📅',
    query: 'What is the booking process and requirements?',
  },
  {
    label: 'Location 📍',
    query: 'Where is My Pawcation located?',
  },
  {
    label: 'Boarding Requirements ✅',
    query: 'What are the rules and requirements for boarding my pet?',
  }
];
