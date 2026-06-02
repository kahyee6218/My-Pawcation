/**
 * BookingFlow — step-by-step guided booking form inside the chatbot.
 * Collects pet info step by step, then generates a WhatsApp deep-link
 * with a formatted summary to send to My Pawcation.
 */

// ----------------------------------------------------------------
// TYPES
// ----------------------------------------------------------------

export interface PetInfo {
  type: 'dog' | 'cat' | 'rabbit' | '';
  breed: string;
  size: 'small' | 'medium' | 'large' | '';
  weight: string; // e.g. "5kg"
  name: string;
  notes: string;  // e.g. "male, needs diapers", "long-hair", etc.
}

export interface BookingSummary {
  pets: PetInfo[];
  serviceType: 'boarding' | 'daycare' | '';
  checkIn: string;   // date string
  checkOut: string;  // date string
  addGrooming: boolean;
  addTransport: boolean;
  customerName: string;
  customerPhone: string;
}

export const EMPTY_PET: PetInfo = {
  type: '', breed: '', size: '', weight: '', name: '', notes: ''
};

export const EMPTY_BOOKING: BookingSummary = {
  pets: [],
  serviceType: '',
  checkIn: '',
  checkOut: '',
  addGrooming: false,
  addTransport: false,
  customerName: '',
  customerPhone: '',
};

// ----------------------------------------------------------------
// STEP DEFINITIONS
// ----------------------------------------------------------------

export type FlowStep =
  | 'service_type'
  | 'pet_count'
  | 'pet_type'
  | 'pet_name'
  | 'pet_breed'
  | 'pet_size'
  | 'pet_weight'
  | 'pet_notes'
  | 'add_more_pets'
  | 'dates'
  | 'addons'
  | 'customer_name'
  | 'customer_phone'
  | 'summary'
  | 'done';

export interface FlowState {
  step: FlowStep;
  booking: BookingSummary;
  currentPetIndex: number;
  started: boolean;
}

export const INITIAL_FLOW: FlowState = {
  step: 'service_type',
  booking: { ...EMPTY_BOOKING },
  currentPetIndex: 0,
  started: false,
};

// ----------------------------------------------------------------
// STEP → QUESTION + HANDLER
// ----------------------------------------------------------------

interface StepHandler {
  question: string;
  options?: string[];          // quick-reply chips
  process: (value: string, state: FlowState) => { nextState: FlowState; reply: string };
}

const WHATSAPP_NUMBER = '60173840723';

function normalizeWeight(input: string): string {
  const match = input.match(/\d+(?:\.\d+)?/);
  if (!match) return '';
  // keep only the first number to avoid "12kg 20kg 30kg" -> "12kg"
  const first = match[0];
  return `${first}kg`;
}

function formatPetLabel(pet: PetInfo): string {
  const parts: string[] = [];
  if (pet.name) parts.push(pet.name);
  if (pet.type) parts.push(pet.type);
  if (pet.breed) parts.push(pet.breed);
  if (pet.size) parts.push(pet.size);
  if (pet.weight) parts.push(pet.weight);
  if (pet.notes) parts.push(`📝 ${pet.notes}`);
  return parts.join(' · ');
}

function buildWhatsAppLink(summary: BookingSummary): string {
  const lines: string[] = [];

  lines.push(`🐾 New Booking Enquiry – My Pawcation`);
  lines.push(``);
  lines.push(`👤 Customer: ${summary.customerName || '(not provided)'}`);
  lines.push(`📞 Phone: ${summary.customerPhone || '(not provided)'}`);
  lines.push(``);
  lines.push(`📋 Service: ${summary.serviceType === 'boarding' ? '🏠 Boarding' : '☀️ Daycare'}`);
  lines.push(`📅 Check-in: ${summary.checkIn || 'TBC'}`);
  lines.push(`📅 Check-out: ${summary.checkOut || 'TBC'}`);
  lines.push(``);

  const validPets = summary.pets.filter(pet => pet.name || pet.type || pet.breed || pet.size || pet.weight || pet.notes);
  if (validPets.length > 0) {
    lines.push(`🐶🐱 Pets (${validPets.length}):`);
    validPets.forEach((pet, i) => {
      // Ensure we never pass an empty pet label
      const label = formatPetLabel(pet);
      if (label.trim().length > 0) {
        lines.push(`${i + 1}. ${label}`);
      }
    });
    lines.push(``);
  }

  const addons: string[] = [];
  if (summary.addGrooming) addons.push('✂️ Grooming');
  if (summary.addTransport) addons.push('🚗 Transport');
  if (addons.length > 0) {
    lines.push(`🔧 Add-ons: ${addons.join(', ')}`);
    lines.push(``);
  }

  const message = lines.join('\n');
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// ----------------------------------------------------------------
// STEP HANDLERS
// ----------------------------------------------------------------

export function getStepQuestion(state: FlowState): string {
  const { step, booking, currentPetIndex } = state;
  const pet = booking.pets[currentPetIndex] || { ...EMPTY_PET };

  switch (step) {
    case 'service_type':
      return `Let's get your pet booked! 🐾\n\nFirst — what type of service are you looking for?\n\n• **Boarding** (overnight stay)\n• **Daycare** (just for the day)`;

    case 'pet_count':
      return `How many pets will be ${booking.serviceType === 'boarding' ? 'boarding' : 'staying'} with us? 🐾\n\nJust type a number (e.g. "2")`;

    case 'pet_type':
      return `🐾 **Pet #${currentPetIndex + 1}** — What type of pet is this?\n\n• Dog 🐶\n• Cat 🐱\n• Rabbit 🐰`;

    case 'pet_name':
      return `What's your ${pet.type || 'pet'}'s name? 🐾`;

    case 'pet_breed':
      return `What breed is ${pet.name || 'your pet'}? (e.g. "Golden Retriever", "Persian", etc.)`;

    case 'pet_size':
      return `What size is ${pet.name || 'your pet'}? 🐾\n\n• **Small** (≤7kg)\n• **Medium** (8–15kg)\n• **Large** (>15kg)`;

    case 'pet_weight':
      return `What's ${pet.name || 'your pet'}'s approximate weight? (e.g. "5kg" or "12kg") 🐾`;

    case 'pet_notes':
      return `Any special notes for ${pet.name || 'this pet'}? (e.g. "male, needs diapers", "long-hair", "on medication", "shy with other dogs")\n\nType "none" if nothing special!`;

    case 'add_more_pets':
      return `Got it! ✅\n\nDo you have another pet to add, or are we done with pets?\n\n• **Add another pet** 🐾\n• **Done — continue** ➡️`;

    case 'dates':
      return `📅 Great! Now let's get your dates.\n\nWhen would you like to **check-in**?\n*(e.g. "15 June" or "15/6")*`;

    case 'addons':
      return `Would you like to add any extra services?\n\n• **Grooming** ✂️ (bath + nail)\n• **Transport** 🚗 (pick-up/drop-off)\n• **Both**\n• **Neither**`;

    case 'customer_name':
      return `Almost done! 🎉\n\nWhat's your name?`;

    case 'customer_phone':
      return `And your phone number? 📱\n\nSo our team can reach you easily.`;

    case 'summary':
      return `Perfect! Here's a summary of your booking: ⬆️\n\nWhen you're ready, tap the button below to send everything to us on WhatsApp — our team will confirm your slot! 🐾`;

    case 'done':
      return `Thanks! Our team will get back to you soon on WhatsApp. 🐾\n\nFeel free to ask me anything else in the meantime!`;

    default:
      return `How can I help? 🐾`;
  }
}

export function getStepOptions(state: FlowState): string[] {
  const { step } = state;

  switch (step) {
    case 'service_type':
      return ['🏠 Boarding', '☀️ Daycare'];
    case 'pet_type':
      return ['🐶 Dog', '🐱 Cat', '🐰 Rabbit'];
    case 'pet_size':
      return ['Small (≤7kg)', 'Medium (8-15kg)', 'Large (>15kg)'];
    case 'add_more_pets':
      return ['➕ Add another pet', '➡️ Done — continue'];
    case 'addons':
      return ['✂️ Grooming', '🚗 Transport', 'Both', 'Neither'];
    default:
      return [];
  }
}

export function processStep(userInput: string, state: FlowState): {
  nextState: FlowState;
  reply: string;
  complete: boolean;
} {
  const text = userInput.trim();
  const lower = text.toLowerCase();
  const { step, booking, currentPetIndex } = state;
  const next = { ...state };
  const pet = { ...(booking.pets[currentPetIndex] || { ...EMPTY_PET }) };

  switch (step) {
    // ── SERVICE TYPE ──
    case 'service_type': {
      if (lower.includes('board') || lower.includes('overnight')) {
        next.booking = { ...booking, serviceType: 'boarding' };
      } else if (lower.includes('day') || lower.includes('daycare')) {
        next.booking = { ...booking, serviceType: 'daycare' };
      } else {
        next.booking = { ...booking, serviceType: 'boarding' }; // default
      }
      next.step = 'pet_count';
      return {
        nextState: next,
        reply: `${next.booking.serviceType === 'boarding' ? '🏠 Boarding' : '☀️ Daycare'} — great choice!`,
        complete: false
      };
    }

    // ── PET COUNT ──
    case 'pet_count': {
      const countMatch = text.match(/\d+/);
      const count = countMatch ? parseInt(countMatch[0], 10) : 1;
      const clamped = Math.max(1, Math.min(count, 5));
      next.booking = { ...booking, pets: Array(clamped).fill(null).map(() => ({ ...EMPTY_PET })) };
      next.currentPetIndex = 0;
      next.step = 'pet_type';
      return {
        nextState: next,
        reply: `Got it, ${clamped} pet${clamped > 1 ? 's' : ''}! We'll add each one separately so nothing gets mixed up. 🐾`,
        complete: false
      };
    }

    // ── PET TYPE ──
    case 'pet_type': {
      if (lower.includes('dog') || lower.includes('anjing')) pet.type = 'dog';
      else if (lower.includes('cat') || lower.includes('kucing')) pet.type = 'cat';
      else if (lower.includes('rabbit') || lower.includes('arnab')) pet.type = 'rabbit';
      else pet.type = 'dog';

      const pets = [...next.booking.pets];
      pets[currentPetIndex] = pet;
      next.booking = { ...booking, pets };
      next.step = 'pet_name';
      return {
        nextState: next,
        reply: `${pet.type === 'dog' ? '🐶' : pet.type === 'cat' ? '🐱' : '🐰'} ${pet.type.charAt(0).toUpperCase() + pet.type.slice(1)} added. What is this pet's name?`,
        complete: false
      };
    }

    // ── PET NAME ──
    case 'pet_name': {
      pet.name = text;
      const pets = [...next.booking.pets];
      pets[currentPetIndex] = pet;
      next.booking = { ...booking, pets };
      next.step = 'pet_breed';
      return {
        nextState: next,
        reply: `${pet.name} — what a cute name! 🐾`,
        complete: false
      };
    }

    // ── PET BREED ──
    case 'pet_breed': {
      pet.breed = text;
      const pets = [...next.booking.pets];
      pets[currentPetIndex] = pet;
      next.booking = { ...booking, pets };
      next.step = 'pet_size';
      return {
        nextState: next,
        reply: `Got it, a ${pet.breed}! 🐾`,
        complete: false
      };
    }

    // ── PET SIZE ──
    case 'pet_size': {
      if (lower.includes('small') || lower.includes('kecil') || lower.includes('≤7')) pet.size = 'small';
      else if (lower.includes('medium') || lower.includes('sederhana')) pet.size = 'medium';
      else if (lower.includes('large') || lower.includes('besar') || lower.includes('>15')) pet.size = 'large';
      else pet.size = 'medium';

      const pets = [...next.booking.pets];
      pets[currentPetIndex] = pet;
      next.booking = { ...booking, pets };
      next.step = 'pet_weight';
      return {
        nextState: next,
        reply: `Got it — ${pet.size.toUpperCase()} size. What is ${pet.name || 'this pet'}'s approximate weight?`,
        complete: false
      };
    }

    // ── PET WEIGHT ──
    case 'pet_weight': {
      pet.weight = normalizeWeight(text);
      const pets = [...next.booking.pets];
      pets[currentPetIndex] = pet;
      next.booking = { ...booking, pets };
      next.step = 'pet_notes';
      return {
        nextState: next,
        reply: pet.weight ? `Weight noted: ~${pet.weight}.` : `Weight noted.`,
        complete: false
      };
    }

    // ── PET NOTES ──
    case 'pet_notes': {
      if (lower === 'none' || lower === 'no' || lower === 'nope' || lower === 'nothing') {
        pet.notes = '';
      } else {
        pet.notes = text;
      }
      const pets = [...next.booking.pets];
      pets[currentPetIndex] = pet;
      next.booking = { ...booking, pets };

      if (currentPetIndex + 1 < next.booking.pets.length) {
        next.step = 'add_more_pets';
        return {
          nextState: next,
          reply: `Saved ${pet.name || `pet ${currentPetIndex + 1}`} ✅`,
          complete: false
        };
      } else {
        next.step = 'dates';
        return {
          nextState: next,
          reply: `All pets added! ✅ Now let's get your dates.`,
          complete: false
        };
      }
    }

    // ── ADD MORE PETS? ──
    case 'add_more_pets': {
      if (lower.includes('add') || lower.includes('+') || lower.includes('yes') || lower.includes('ya') || lower.includes('another')) {
        next.currentPetIndex = currentPetIndex + 1;
        next.step = 'pet_type';
        return {
          nextState: next,
          reply: `Great — let's add pet #${next.currentPetIndex + 1}. Is it a dog, cat, or rabbit?`,
          complete: false
        };
      } else {
        next.step = 'dates';
        return {
          nextState: next,
          reply: `Perfect — let's continue with your dates.`,
          complete: false
        };
      }
    }

    // ── DATES ──
    case 'dates': {
      const looksLikeCheckOut = /\b(to|until|till|end|checkout|check-out|out)\b/i.test(lower) || /\d{1,2}\/\d{1,2}\s*[-–]\s*\d{1,2}\/\d{1,2}/.test(lower);

      if (!next.booking.checkIn) {
        next.booking = { ...booking, checkIn: text };
        return {
          nextState: next,
          reply: `Check-in noted: ${text}. 📅\n\nAnd when would you like to **check-out**?`,
          complete: false
        };
      }

      if (!next.booking.checkOut) {
        const cleanText = text.replace(/^yes\s*/i, '').trim();
        next.booking = { ...booking, checkOut: cleanText };
        next.step = 'addons';
        return {
          nextState: next,
          reply: looksLikeCheckOut
            ? `Check-out noted: ${cleanText}. 📅\n\nAny extra services?`
            : `Check-out noted: ${cleanText}. 📅\n\nAny extra services?`,
          complete: false
        };
      }
      break;
    }

    // ── ADD-ONS ──
    case 'addons': {
      if (lower.includes('groom') || lower.includes('✂')) {
        next.booking = { ...booking, addGrooming: true, addTransport: false };
      } else if (lower.includes('transport') || lower.includes('pick') || lower.includes('drop') || lower.includes('🚗')) {
        next.booking = { ...booking, addGrooming: false, addTransport: true };
      } else if (lower.includes('both') || lower.includes('all')) {
        next.booking = { ...booking, addGrooming: true, addTransport: true };
      } else {
        next.booking = { ...booking, addGrooming: false, addTransport: false };
      }
      next.step = 'customer_name';
      return {
        nextState: next,
        reply: 'Noted! ✅',
        complete: false
      };
    }

    // ── CUSTOMER NAME ──
    case 'customer_name': {
      next.booking = { ...booking, customerName: text };
      next.step = 'customer_phone';
      return {
        nextState: next,
        reply: `Hi ${text}! 👋`,
        complete: false
      };
    }

    // ── CUSTOMER PHONE ──
    case 'customer_phone': {
      next.booking = { ...booking, customerPhone: text };
      next.step = 'summary';
      const waLink = buildWhatsAppLink(next.booking);
      return {
        nextState: next,
        reply: `✅ Booking details are ready!\n\n${formatSummary(next.booking)}\n\n[💬 Send to WhatsApp →](${waLink})`,
        complete: true,
      };
    }

    // ── SUMMARY / DONE ──
    case 'summary':
    case 'done': {
      const waLink = buildWhatsAppLink(next.booking);
      return {
        nextState: next,
        reply: `Ready to send!\n\n[💬 Send to WhatsApp →](${waLink})`,
        complete: true
      };
    }

    default:
      return { nextState: state, reply: '', complete: false };
  }

  return { nextState: state, reply: '', complete: false };
}

// ----------------------------------------------------------------
// SUMMARY FORMATTER
// ----------------------------------------------------------------

function formatSummary(booking: BookingSummary): string {
  const lines: string[] = [];

  lines.push(`📋 Booking Summary`);
  lines.push(``);
  lines.push(`🐾 Service: ${booking.serviceType === 'boarding' ? '🏠 Boarding' : '☀️ Daycare'}`);
  lines.push(`📅 Check-in: ${booking.checkIn || 'TBC'}`);
  lines.push(`📅 Check-out: ${booking.checkOut || 'TBC'}`);
  lines.push(``);

  const validPets = booking.pets.filter(pet => pet.name || pet.type || pet.breed || pet.size || pet.weight || pet.notes);
  if (validPets.length > 0) {
    validPets.forEach((pet, i) => {
      const details = formatPetLabel(pet);
      lines.push(`🐶🐱 Pet ${i + 1}: ${details}`);
    });
    lines.push(``);
  }

  const addons: string[] = [];
  if (booking.addGrooming) addons.push('✂️ Grooming');
  if (booking.addTransport) addons.push('🚗 Transport');
  if (addons.length > 0) {
    lines.push(`🔧 Add-ons: ${addons.join(', ')}`);
    lines.push(``);
  }

  lines.push(`👤 Customer: ${booking.customerName || 'TBC'}`);
  lines.push(`📞 Phone: ${booking.customerPhone || 'TBC'}`);

  return lines.join('\n');
}

export { buildWhatsAppLink, formatSummary };
