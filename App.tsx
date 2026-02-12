import React from 'react';
import { Navbar, Footer } from './components/ui/Layout';
import { MainHero, AboutPreview, WhyChooseUs, DailyRoutine, HowItWorks } from './components/sections/HomeSections';
import { Testimonials, Pricing, FAQ } from './components/sections/DetailSections';
import { BookingForm } from './components/sections/BookingForm';
import { CONTACT_INFO } from './constants';

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

      {/* WhatsApp Floating Button */}
      <a
        href={`https://wa.me/${CONTACT_INFO.whatsapp.replace(/[^0-9]/g, '')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#20ba5a] transition-colors transform hover:scale-110 flex items-center justify-center"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
      </a>
    </div>
  );
}

export default App;