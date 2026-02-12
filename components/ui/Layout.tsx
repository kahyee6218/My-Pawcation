import React, { useState, useEffect } from 'react';
import { Menu, X, Instagram, Facebook, Phone, Mail, MapPin } from 'lucide-react';
import { NAV_ITEMS, CONTACT_INFO } from '../../constants';
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
            <a href="#home" className="flex items-center gap-3 group">
              <img
                src="/assets/logo.png"
                alt="My Pawcation Logo"
                className="h-12 w-auto transform group-hover:scale-105 transition-transform"
              />
              <div className="flex flex-col">
                <span className="font-display font-extrabold text-xl leading-tight text-brand-brown">
                  My Pawcation
                </span>
                <span className="text-[10px] font-bold text-brand-green tracking-widest uppercase">
                  Home-Style Boarding
                </span>
              </div>
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="font-medium text-brand-dark hover:text-brand-green transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.querySelector(item.href);
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {item.label}
              </a>
            ))}
            <a href="#booking" onClick={(e) => {
              e.preventDefault();
              const element = document.querySelector('#booking');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}>
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
            <div className="flex items-center gap-3 mb-6">
              <img src="/assets/logo.png" alt="My Pawcation" className="h-10 w-auto bg-white rounded-lg p-1" />
              <span className="font-display font-bold text-xl">My Pawcation</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed text-sm">
              Premium home-style boarding & daycare. We provide a cage-free, loving environment where your dogs are treated like family.
            </p>
            <div className="flex space-x-4">
              {CONTACT_INFO.instagram && (
                <a href={CONTACT_INFO.instagram} target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 rounded-full hover:bg-brand-green transition-colors">
                  <Instagram size={20} />
                </a>
              )}
              {CONTACT_INFO.facebook && (
                <a href={CONTACT_INFO.facebook} target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 rounded-full hover:bg-brand-green transition-colors">
                  <Facebook size={20} />
                </a>
              )}
              <a href="https://tiktok.com/@mypawcation" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 rounded-full hover:bg-brand-green transition-colors">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-display font-bold text-lg mb-6 text-brand-sand">Quick Links</h3>
            <ul className="space-y-3">
              {NAV_ITEMS.map(item => (
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
                <span>{CONTACT_INFO.address.split(',').map((part, i) => (
                  <span key={i} className="block">{part.trim()}{i < CONTACT_INFO.address.split(',').length - 1 ? ',' : ''}</span>
                ))}</span>
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <Phone className="shrink-0 text-brand-green" size={20} />
                <span>{CONTACT_INFO.whatsapp}</span>
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <Mail className="shrink-0 text-brand-green" size={20} />
                <span>{CONTACT_INFO.email}</span>
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