import React from 'react';
import { ArrowRight, CheckCircle, Clock } from 'lucide-react';
import { Button, SectionTitle, Card } from '../ui/Elements';
import { WHY_CHOOSE_US, DAILY_ROUTINE, HYGIENE_SOP, SERVICES } from '../../constants';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden scroll-mt-32">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-brand-green/20 rounded-full blur-3xl opacity-50 z-0"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-brand-blue/20 rounded-full blur-3xl opacity-50 z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm text-brand-dark font-bold text-sm border border-brand-sand">
              <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
              Limited Spots: 8 Sets Max
            </div>
            <h1 className="text-5xl lg:text-7xl font-display font-extrabold text-brand-dark leading-[1.1]">
              Home-Style Pet Boarding for <br />
              <span className="text-brand-green inline-block transform -rotate-2">Dogs & Cats</span>
            </h1>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Safe, cage-free, low-stress and professionally cared for — with daily updates for your peace of mind.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="#booking">
                <Button variant="primary" size="lg">Book a Stay</Button>
              </a>
              <a href="#why-us">
                <Button variant="secondary" size="lg">Why Choose Us</Button>
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <img
                src="/assets/header-banner.png"
                alt="My Pawcation Facilities"
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Decorative elements behind image */}
            <div className="absolute inset-0 bg-brand-sand rounded-[3rem] transform -rotate-3 translate-x-4 translate-y-4 -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const AboutPreview: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white rounded-t-[4rem] -mt-10 relative z-20 scroll-mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 grid grid-cols-2 gap-4">
            <div className="translate-y-8">
              <img
                src="/assets/facility.jpg"
                className="rounded-3xl shadow-lg object-cover h-72 w-full"
                alt="Our cozy boarding facility"
              />
            </div>
            <div>
              <img
                src="/assets/dog-golden.jpg"
                className="rounded-3xl shadow-lg object-cover h-72 w-full"
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
            <div className="space-y-6 text-lg text-stone-600 leading-relaxed">
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
    <section id="why-us" className="py-24 bg-brand-cream scroll-mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Why Choose My Pawcation?" subtitle="Our Promise" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY_CHOOSE_US.map((item, index) => (
            <Card key={index} className="p-8 h-full hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 bg-brand-green/10 rounded-2xl flex items-center justify-center text-brand-green mb-6">
                <item.icon size={32} />
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-3">{item.title}</h3>
              <p className="text-stone-600 leading-relaxed">
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
    <section id="routine" className="py-24 bg-white scroll-mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionTitle title="A Typical Day" subtitle="Daily Routine" centered={false} />
            <p className="text-stone-600 mb-8 max-w-lg">
              Routine provides comfort. While we adjust based on your pet's needs, health, and temperament, here is what a typical fun-filled day looks like.
            </p>
            <div className="relative border-l-4 border-brand-sand ml-4 space-y-12">
              {DAILY_ROUTINE.map((item, index) => (
                <div key={index} className="relative pl-8">
                  <div className="absolute -left-[1.35rem] top-0 w-10 h-10 bg-white border-4 border-brand-green rounded-full flex items-center justify-center">
                    <Clock size={16} className="text-brand-green" />
                  </div>
                  <h4 className="text-xl font-bold text-brand-dark mb-1">{item.time}</h4>
                  <p className="text-stone-600 font-medium">{item.activity}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-brand-brown p-8 lg:p-12 rounded-[3.5rem] relative overflow-hidden text-white">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>

            <SectionTitle title="Hygiene & Safety SOP" subtitle="Our Standards" centered={false} className="text-white" />

            <ul className="space-y-4 relative z-10">
              {HYGIENE_SOP.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="text-brand-accent shrink-0 mt-1" />
                  <span className="text-lg text-brand-cream/90">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-8 border-t border-white/20">
              <p className="font-bold text-brand-accent text-lg">Your pet’s safety and health always come first.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 bg-brand-cream scroll-mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Simple & Stress-Free" subtitle="How to Book" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-[2.5rem] left-[16%] right-[16%] h-0.5 bg-brand-sand/30 -z-0"></div>

          {/* Step 1 */}
          <div className="text-center relative z-10">
            <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center text-brand-dark font-bold text-2xl shadow-md border-4 border-brand-cream mb-6">
              1
            </div>
            <h3 className="font-bold text-xl text-brand-dark mb-3">Contact Us</h3>
            <p className="text-stone-600 leading-relaxed px-4">
              Reach out via WhatsApp or Social Media to check availability.
            </p>
          </div>

          {/* Step 2 */}
          <div className="text-center relative z-10">
            <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center text-brand-dark font-bold text-2xl shadow-md border-4 border-brand-cream mb-6">
              2
            </div>
            <h3 className="font-bold text-xl text-brand-dark mb-3">Confirm Dates</h3>
            <p className="text-stone-600 leading-relaxed px-4">
              We'll confirm the slots for your requested dates.
            </p>
          </div>

          {/* Step 3 */}
          <div className="text-center relative z-10">
            <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center text-brand-dark font-bold text-2xl shadow-md border-4 border-brand-cream mb-6">
              3
            </div>
            <h3 className="font-bold text-xl text-brand-dark mb-3">Secure Slot</h3>
            <p className="text-stone-600 leading-relaxed px-4">
              Pay 50% deposit or full payment to lock in your booking.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <a href="https://wa.me/60173840723" target="_blank" rel="noopener noreferrer">
            <Button variant="primary" size="lg">Contact to Book Now</Button>
          </a>
        </div>
      </div>
    </section>
  );
};