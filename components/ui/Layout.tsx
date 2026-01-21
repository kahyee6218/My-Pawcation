import React, { useState, useEffect } from 'react';
import { Menu, X, PawPrint, Instagram, Facebook, Phone, Mail, MapPin } from 'lucide-react';
import { NAV_ITEMS } from '../../constants';
import { Button } from './Elements';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <a href="#home" className="flex items-center gap-2 group">
              <div className="bg-brand-green p-2 rounded-full text-white transform group-hover:rotate-12 transition-transform shadow-lg shadow-brand-green/20">
                <PawPrint size={24} fill="currentColor" />
              </div>
              <span className={`font-display font-extrabold text-2xl tracking-tight ${scrolled ? 'text-brand-dark' : 'text-brand-dark'}`}>
                My Pawcation
              </span>
            </a>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="font-medium text-brand-dark hover:text-brand-green transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a href="#booking">
                <Button size="sm" variant="primary">Book Now</Button>
            </a>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-brand-dark hover:text-brand-green p-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block px-3 py-3 rounded-xl text-base font-medium text-brand-dark hover:bg-brand-cream hover:text-brand-green"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4">
                <a href="#booking" onClick={() => setIsOpen(false)}>
                    <Button fullWidth>Book a Stay</Button>
                </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-white pt-16 pb-8 rounded-t-4xl mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <PawPrint className="text-brand-sand" size={32} />
              <span className="font-display font-bold text-2xl">My Pawcation</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed text-sm">
              Safe, home-style boarding for your furry family members. No cages, just love.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-brand-green transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-brand-green transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-display font-bold text-lg mb-6 text-brand-sand">Quick Links</h3>
            <ul className="space-y-3">
              {NAV_ITEMS.slice(0, 5).map(item => (
                <li key={item.label}>
                  <a href={item.href} className="text-gray-300 hover:text-brand-sand transition-colors text-sm">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-lg mb-6 text-brand-sand">Visit Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 text-gray-300">
                <MapPin className="shrink-0 text-brand-green" size={20} />
                <span>Jalan Badam 5, Taman Rakyat,<br />Cheras, 56100, KL</span>
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <Phone className="shrink-0 text-brand-green" size={20} />
                <span>+60 12-345 6789</span>
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <Mail className="shrink-0 text-brand-green" size={20} />
                <span>woof@mypawcation.com.my</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-lg mb-6 text-brand-sand">Opening Hours</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex justify-between">
                <span>Mon - Fri</span>
                <span>7:00 AM - 7:30 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Weekends</span>
                <span>9:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between text-brand-sand">
                <span>Public Holidays</span>
                <span>By Appt. Only</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-400 text-xs">
          <p>&copy; {new Date().getFullYear()} My Pawcation Enterprise (0012345-X). All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};