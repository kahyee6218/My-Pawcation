/**
 * SmartReply — instant local answer engine for My Pawcation.
 * Matches common questions locally (0ms latency), falls back to Gemini only for unknown ones.
 */

import { CONTACT_INFO, PRICING_DATA } from '../constants';

const WHATSAPP = `[💬 WhatsApp Us](https://wa.me/60173840723?text=Hi%20My%20Pawcation!%20I%20have%20a%20question)`;

// ----------------------------------------------------------------
// KNOWLEDGE BASE — instant exact & fuzzy matches
// ----------------------------------------------------------------

interface Rule {
  /** Keywords that must ALL appear (case-insensitive) */
  keywords: string[];
  /** The instant reply (supports Markdown) */
  reply: string;
  /** Context-aware follow-up question */
  followUp?: string;
}

const rules: Rule[] = [
  // ── PRICING ──
  {
    keywords: ['price', 'pricing', 'rate', 'cost', 'how much', 'fee', 'board', 'boarding', 'overnight'],
    reply: `🐾 **Dog Boarding (per night):**
• Small (≤7kg): RM40–50
• Medium (8–15kg): RM60–70
• Large (>15kg): RM80–90

🐱 **Cat Boarding (per night):**
• Standard: RM30–35 | Long-hair: RM40–45

*Peak season +RM10 extra. Prices include meals & daily updates!*`,
    followUp: 'What size is your pet? I can give you an exact quote! 🐶'
  },
  {
    keywords: ['daycare', 'day care', 'day', 'daily'],
    reply: `☀️ **Dog Daycare (per day):**
• Small (≤7kg): RM30–40
• Medium (8–15kg): RM40–50
• Large (>15kg): RM50–60

🐱 **Cat Daycare (per day):**
• Standard: RM15–25 | Long-hair: RM20–25`,
    followUp: 'What type of pet do you have? I can give you a precise rate!'
  },
  {
    keywords: ['month', 'monthly', 'long term', 'long-term', 'package'],
    reply: `📦 **Monthly Packages:**
• Small Dog: RM850/mo
• Medium Dog: RM1,250/mo
• Large Dog: RM1,650/mo
• Cat Standard: RM650/mo
• Cat Long-hair: RM850/mo

Great value for extended stays! 🏠`,
    followUp: 'How long are you planning to board? I can help you figure out the best option!'
  },
  {
    keywords: ['groom', 'grooming', 'bath', 'nail', 'shower'],
    reply: `✂️ **Grooming (bath + nail trim):**
• Small Dog: RM45–55
• Medium Dog: RM65–75
• Large Dog: RM75–85

Fresh & clean before pickup! 🛁`,
    followUp: 'What size is your dog? I\'ll confirm the exact price!'
  },
  {
    keywords: ['add', 'addon', 'extra', 'pick', 'drop', 'transport', '1-on-1', 'premium', 'training', 'home visit', 'feeding'],
    reply: `🔧 **Add-on Services:**
• Pick-up & Drop-off (within 10km): RM20–40
• Training Reinforcement: RM40/session
• Premium 1-on-1 Care: +RM30/day
• Home Visit (Feeding/Care): RM50–100`,
    followUp: 'Interested in any of these add-ons? Let me know!'
  },

  // ── BOOKING ──
  {
    keywords: ['book', 'booking', 'reserve', 'how to', 'process', 'make a', 'slot'],
    reply: `📅 **How to book:**
1. Contact us via WhatsApp to check availability
2. Confirm dates and pet details
3. Pay 50% deposit to secure your slot
4. Balance on check-out

${WHATSAPP}`,
    followUp: 'Would you like to chat with us on WhatsApp now to check availability?'
  },
  {
    keywords: ['payment', 'deposit', 'pay', 'refund', 'cancel'],
    reply: `💳 **Payment:**
• 50% deposit to confirm booking
• Balance on check-out
• Full upfront also accepted
• Deposits are non-refundable (reserves your slot)

We accept bank transfer & Touch \'n Go eWallet.`,
    followUp: 'Ready to book? Just reach us on WhatsApp to get started!'
  },

  // ── POLICIES & REQUIREMENTS ──
  {
    keywords: ['requirement', 'require', 'vaccine', 'vaccinated', 'rule', 'policy', 'terms'],
    reply: `📋 **Boarding Requirements:**
• Fully vaccinated (proof required)
• Male dogs must wear diapers (owner provides)
• Bring your pet's food, leash & medication
• Check-in: from 2PM | Check-out: by 12PM

Daily photo/video updates included! 📸`,
    followUp: 'Does your pet meet these requirements? Happy to clarify anything!'
  },
  {
    keywords: ['male', 'diaper', 'boy', 'unneutered', 'not neutered'],
    reply: `Yes, we accept male dogs! Just a heads up — male dogs need to wear diapers during their stay. 🩲

Please bring your own diapers as owners provide them. We'll make sure your boy is comfortable! 🐶`,
    followUp: 'What breed is your dog? Would love to know more!'
  },
  {
    keywords: ['check in', 'check-in', 'check out', 'check-out', 'time', 'hour'],
    reply: `⏰ **Check-in / Check-out Times:**
• Check-in: From 2:00 PM onwards
• Check-out: By 12:00 PM (noon)

Early or late requests subject to availability & extra charges.`,
    followUp: 'What dates are you looking at? I can help check availability!'
  },
  {
    keywords: ['bring', 'pack', 'supply', 'what should', 'need to'],
    reply: `🎒 **What to bring for your pet:**
• Their regular food
• Diapers (for male dogs)
• Any medication
• Leash
• Favourite toy or blanket (optional but welcome!)

We provide bowls, beds, and lots of love! ❤️`,
    followUp: 'When are you planning to board? Let me know!'
  },

  // ── LOCATION ──
  {
    keywords: ['location', 'where', 'address', 'area', 'near', 'direction', 'waze', 'google maps'],
    reply: `📍 We're at: **Endah Regal Condominium, Sri Petaling, 57000 KL**

We serve KL, PJ, Subang, Cheras & Puchong areas.
Pick-up & drop-off available within 10km (RM20–40). 🚗`,
    followUp: 'Which area are you coming from?'
  },
  {
    keywords: ['sri petaling', 'endah', 'regal', 'condo'],
    reply: `📍 Yes! We're based at **Endah Regal Condominium, Jalan 1/149e, Sri Petaling, 57000 Kuala Lumpur**.

Easy access from KL, PJ, Subang, Cheras & Puchong. 🗺️`,
    followUp: 'Need directions or pick-up service? Let me know!'
  },

  // ── ABOUT / WHY US ──
  {
    keywords: ['about', 'who are', 'what is', 'cage', 'home', 'style', 'different', 'special', 'why'],
    reply: `🏡 **Why My Pawcation?**
We're a **cage-free, home-style** pet boarding — not a kennel!
• Limited spots for personalised attention
• Separate areas for cats & dogs
• Daily photo/video updates
• Strict hygiene & safety SOPs

Your pet vacations while you vacation! ✨`,
    followUp: 'What kind of pet do you have? 🐾'
  },
  {
    keywords: ['routine', 'schedule', 'day', 'daily life', 'activity', 'walk'],
    reply: `🐾 **Daily Routine:**
☀️ 7–9 AM: Feeding & cleaning
🎾 9–11 AM: Playtime & walks
😴 Afternoon: Rest & free time
📸 Evening: Feeding + updates to you

A happy, structured day for your fur baby!`,
    followUp: 'Do you have a preferred routine for your pet? We can accommodate!'
  },
  {
    keywords: ['capacity', 'how many', 'max', 'limit', 'spot', 'space', 'full'],
    reply: `🏠 We keep it cosy — max **8 dogs + 4 cats** at a time.

This way every pet gets the attention they deserve. Spots fill up fast, especially during holidays! 🐾`,
    followUp: 'Would you like to check availability for your dates?'
  },

  // ── CONTACT ──
  {
    keywords: ['contact', 'whatsapp', 'wa', 'call', 'phone', 'number', 'email', 'fb', 'facebook', 'instagram', 'ig', 'social'],
    reply: `📞 **Contact Us:**
• WhatsApp: +60 17-384 0723
• Email: csmypawcation@gmail.com
• FB: facebook.com/mypawcation
• IG: instagram.com/mypawcation

${WHATSAPP}`,
    followUp: 'Anything else I can help with? 😊'
  },

  // ── GREETINGS ──
  {
    keywords: ['check-in', 'check in', 'checkin', 'checkout', 'check-out', 'check out', 'date', 'dates', 'when', 'schedule'],
    reply: `📅 For availability, please tell us your **check-in** and **check-out** dates.\n\nThen we can confirm your slot right away!`,
    followUp: 'What dates are you planning? 🐾'
  },
  {
    keywords: ['hello', 'hi', 'hey', 'morning', 'afternoon', 'evening', 'good'],
    reply: `Hey there! 🐾 Welcome to **My Pawcation** — cage-free home-style pet boarding in KL!

I can help with pricing, booking, requirements, and more. What would you like to know?`,
    followUp: undefined
  },
  {
    keywords: ['thank', 'thanks', 'appreciate', 'helpful', 'great'],
    reply: `You're welcome! Glad I could help! 🐾

Anything else you'd like to know? I'm here for you!`,
    followUp: undefined
  },
  {
    keywords: ['bye', 'goodbye', 'see you', 'later'],
    reply: `Bye for now! 🐾 Feel free to pop back anytime — I'm always here to help with your pet boarding needs.

Take care! ❤️`,
    followUp: undefined
  },
];

// ----------------------------------------------------------------
// MATCHING ENGINE
// ----------------------------------------------------------------

/** Simple tokeniser: lowercase + split on non-alphanumeric */
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length > 0);
}

/** Check if a phrase exists as a substring (handles multi-word keywords like "check in") */
function containsPhrase(text: string, phrase: string): boolean {
  return text.includes(phrase);
}

/** Score how well a user message matches a rule */
function scoreRule(message: string, rule: Rule): number {
  const lowerMsg = message.toLowerCase().trim();

  let hits = 0;
  for (const kw of rule.keywords) {
    // Multi-word keywords use substring match; single-word use token match
    if (kw.includes(' ')) {
      if (containsPhrase(lowerMsg, kw)) hits++;
    } else {
      const tokens = tokenize(lowerMsg);
      if (tokens.includes(kw)) hits++;
    }
  }

  // Percentage of required keywords matched
  return hits / rule.keywords.length;
}

/** Find the best matching rule. Returns null if no rule scores above threshold. */
function findBestMatch(message: string): Rule | null {
  const lowerMsg = message.toLowerCase().trim();
  let best: { rule: Rule; score: number } | null = null;

  for (const rule of rules) {
    const score = scoreRule(lowerMsg, rule);
    if (score > (best?.score ?? 0)) {
      best = { rule, score };
    }
  }

  // Require at least 50% keyword match to consider it a hit
  if (best && best.score >= 0.5) return best.rule;
  return null;
}

// ----------------------------------------------------------------
// PUBLIC API
// ----------------------------------------------------------------

export interface SmartReplyResult {
  /** The instant reply text (Markdown) */
  reply: string;
  /** Whether this was a local match (true) or needs Gemini (false) */
  localMatch: boolean;
}

/**
 * Check if the message can be answered instantly.
 * Returns a reply if confident, otherwise null to signal "use Gemini".
 */
export function getInstantReply(userMessage: string): SmartReplyResult | null {
  const matched = findBestMatch(userMessage);

  if (matched) {
    let reply = matched.reply;
    if (matched.followUp) {
      reply += `\n\n${matched.followUp}`;
    }
    return { reply, localMatch: true };
  }

  // Didn't match any rule — needs Gemini
  return null;
}

/**
 * Fallback when even Gemini is unavailable.
 * Gives a helpful WhatsApp redirect for unknown questions.
 */
export function getFallbackReply(userMessage: string): string {
  // Check for simple keywords even on fallback
  const lower = userMessage.toLowerCase();
  if (lower.includes('price') || lower.includes('cost') || lower.includes('rate')) {
    return `I'd love to give you a precise quote! Please reach us on WhatsApp and we'll help you right away 🐾\n\n${WHATSAPP}`;
  }
  if (lower.includes('book') || lower.includes('reserve')) {
    return `For bookings, it's best to chat with us directly on WhatsApp so we can check availability and confirm your dates! 📅\n\n${WHATSAPP}`;
  }

  return `Great question! I want to make sure you get the best answer — our team can help you personally on WhatsApp 🐾\n\n${WHATSAPP}\n\nWe'll reply fast, promise! ⚡`;
}
