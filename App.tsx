import React from 'react';
import { Navbar, Footer } from './components/ui/Layout';
import { MainHero, AboutPreview, WhyChooseUs, DailyRoutine, HowItWorks } from './components/sections/HomeSections';
import { Testimonials, Pricing, FAQ } from './components/sections/DetailSections';
import { BookingForm } from './components/sections/BookingForm';
import { CONTACT_INFO } from './constants';

import { ChatBot } from './components/ui/ChatBot';

function App() {
  return (
    <div className="font-sans antialiased text-brand-brown bg-brand-cream selection:bg-brand-green selection:text-white flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        <MainHero />
        <AboutPreview />
        <WhyChooseUs />
        <DailyRoutine />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <FAQ />
        <BookingForm />
      </main>

      <Footer />

      {/* Intelligent AI ChatBot */}
      <ChatBot />
    </div>
  );
}

export default App;