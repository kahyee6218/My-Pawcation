import * as React from 'react';
import { ArrowRight, CheckCircle, Clock, Check, ShieldCheck } from 'lucide-react';
import { Button, SectionTitle, Card } from '../ui/Elements';
import { WHY_CHOOSE_US, DAILY_ROUTINE, HYGIENE_SOP } from '../../constants';

export const MainHero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-[600px] flex items-center justify-center overflow-hidden pt-20 pb-12">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/Header-Banner.png"
          alt="My Pawcation Home Environment"
          className="w-full h-full object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px]"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <div className="space-y-6 flex flex-col items-center">
          {/* Logo */}
          <img
            src="/assets/logo.png"
            alt="My Pawcation Logo"
            className="h-28 md:h-40 w-auto drop-shadow-xl"
          />

          {/* Main Title */}
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-display font-extrabold text-brand-dark tracking-tight leading-tight">
              My Pawcation
            </h1>
            <p className="text-2xl md:text-4xl font-display font-bold text-brand-dark mt-2 opacity-90">
              Home-Style Pet Boarding
            </p>
          </div>

          {/* Subtext Features */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-6 text-base md:text-xl font-bold text-stone-800 bg-white/70 px-8 py-3 rounded-full backdrop-blur-md shadow-lg border border-white/50">
            <span className="flex items-center gap-2">Cage-Free</span>
            <span className="text-brand-green text-2xl">•</span>
            <span className="flex items-center gap-2">Small Capacity</span>
            <span className="text-brand-green text-2xl">•</span>
            <span className="flex items-center gap-2">Daily Updates</span>
          </div>

          {/* CTA Button */}
          <div className="pt-6">
            <a href="#booking">
              <Button
                variant="primary"
                size="lg"
                className="bg-brand-brown hover:bg-brand-dark text-white px-10 py-4 rounded-full text-xl font-black shadow-2xl transform hover:scale-105 transition-all uppercase tracking-widest ring-4 ring-brand-brown/20"
              >
                Book Us Today
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export const AboutPreview: React.FC = () => {
  return (
    <section id="about" className="py-12 bg-white rounded-t-[3rem] -mt-8 relative z-20 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1 grid grid-cols-2 gap-3">
            <div className="translate-y-6">
              <img
                src="/assets/Picture center.jpeg"
                className="rounded-2xl shadow-md object-cover h-64 w-full"
                alt="Our cozy boarding facility"
              />
            </div>
            <div>
              <img
                src="/assets/IMG_7274.jpeg"
                className="rounded-2xl shadow-md object-cover h-64 w-full"
                alt="Happy dog guest"
              />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <SectionTitle
              title="A Home Away From Home"
              subtitle="About Us"
              centered={false}
            />
            <div className="space-y-4 text-base text-stone-600 leading-relaxed">
              <p>
                At <span className="font-bold text-brand-dark">My Pawcation</span>, we provide a calm, clean, and loving home environment for your pets while you’re away. No cages, no overcrowding — just attentive care, proper routines, and lots of love ❤️.
              </p>
              <p>
                We understand the worry of leaving your furkid behind. That's why we prioritize strict hygiene, separate zones for cats and dogs, and daily updates so you can enjoy your trip knowing they are happy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const WhyChooseUs: React.FC = () => {
  return (
    <section id="why-us" className="py-12 bg-brand-cream scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Why Choose My Pawcation?" subtitle="Our Promise" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_US.map((item, index) => (
            <Card key={index} className="p-6 h-full hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 bg-brand-green/10 rounded-xl flex items-center justify-center text-brand-green mb-4">
                <item.icon size={24} />
              </div>
              <h3 className="text-lg font-bold text-brand-dark mb-2">{item.title}</h3>
              <p className="text-stone-600 leading-relaxed text-sm">
                {item.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export const DailyRoutine: React.FC = () => {
  return (
    <section id="routine" className="py-12 bg-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionTitle title="A Typical Day" subtitle="Daily Routine" centered={false} />
            <p className="text-stone-600 mb-6 max-w-lg text-sm">
              Routine provides comfort. While we adjust based on your pet's needs, health, and temperament, here is what a typical fun-filled day looks like.
            </p>
            <div className="relative border-l-4 border-brand-sand ml-4 space-y-8">
              {DAILY_ROUTINE.map((item, index) => (
                <div key={index} className="relative pl-8">
                  <div className="absolute -left-[1.35rem] top-0 w-10 h-10 bg-white border-4 border-brand-green rounded-full flex items-center justify-center">
                    <Clock size={16} className="text-brand-green" />
                  </div>
                  <h4 className="text-lg font-bold text-brand-dark mb-1">{item.time}</h4>
                  <p className="text-stone-600 font-medium text-sm">{item.activity}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#5D4037] p-8 lg:p-12 rounded-[2.5rem] relative overflow-hidden text-white shadow-2xl h-full flex flex-col justify-between">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl -ml-12 -mb-12 pointer-events-none"></div>

            <div className="relative z-10">
              {/* Custom Tag */}
              <span className="inline-block py-2 px-5 rounded-full bg-[#7CB342]/20 text-[#DCEDC8] text-xs font-bold uppercase tracking-[0.2em] mb-8 border border-[#7CB342]/30 backdrop-blur-sm">
                Our Standards
              </span>

              {/* Yellow Line Divider */}
              <div className="w-20 h-1.5 bg-[#FFB300] rounded-full mb-8"></div>

              {/* List */}
              <ul className="space-y-5">
                {HYGIENE_SOP.map((item, index) => (
                  <li key={index} className="flex items-start gap-4 group">
                    <div className="mt-1 w-6 h-6 rounded-full border-[1.5px] border-[#FFB300] flex items-center justify-center shrink-0 group-hover:bg-[#FFB300] transition-colors duration-300">
                      <Check size={14} className="text-[#FFB300] group-hover:text-[#5D4037] transition-colors duration-300" strokeWidth={3} />
                    </div>
                    <span className="text-lg text-[#EFEBE9] font-medium leading-relaxed group-hover:text-white transition-colors">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer */}
            <div className="mt-10 pt-8 border-t border-white/10 relative z-10">
              <p className="font-display font-bold text-[#FFB300] text-lg tracking-wide flex items-center gap-3">
                <ShieldCheck size={22} className="shrink-0" />
                Your pet’s safety and health always come first.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-12 bg-brand-cream scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Simple & Stress-Free" subtitle="How to Book" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-[2.5rem] left-[16%] right-[16%] h-0.5 bg-brand-sand/30 -z-0"></div>

          {/* Step 1 */}
          <div className="text-center relative z-10">
            <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center text-brand-dark font-extrabold text-2xl shadow-md border-4 border-brand-cream mb-6">
              1
            </div>
            <h3 className="font-extrabold text-2xl text-brand-dark mb-3 uppercase tracking-tight">Contact Us</h3>
            <p className="text-stone-700 leading-relaxed px-4 text-lg font-medium">
              Reach out via WhatsApp or Social Media to check availability.
            </p>
          </div>

          {/* Step 2 */}
          <div className="text-center relative z-10">
            <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center text-brand-dark font-extrabold text-2xl shadow-md border-4 border-brand-cream mb-6">
              2
            </div>
            <h3 className="font-extrabold text-2xl text-brand-dark mb-3 uppercase tracking-tight">Confirm Dates</h3>
            <p className="text-stone-700 leading-relaxed px-4 text-lg font-medium">
              We'll confirm the slots for your requested dates.
            </p>
          </div>

          {/* Step 3 */}
          <div className="text-center relative z-10">
            <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center text-brand-dark font-extrabold text-2xl shadow-md border-4 border-brand-cream mb-6">
              3
            </div>
            <h3 className="font-extrabold text-2xl text-brand-dark mb-3 uppercase tracking-tight">Secure Slot</h3>
            <p className="text-stone-700 leading-relaxed px-4 text-lg font-medium">
              Pay 50% deposit or full payment to lock in your booking.
            </p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <a href="https://wa.me/60173840723" target="_blank" rel="noopener noreferrer">
            <Button variant="primary" size="lg">Contact to Book Now</Button>
          </a>
        </div>
      </div>
    </section>
  );
};