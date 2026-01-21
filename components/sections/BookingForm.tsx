import React, { useState } from 'react';
import { Send, Calendar, Dog, User, AlertCircle } from 'lucide-react';
import { Button, SectionTitle, Card } from '../ui/Elements';

export const BookingForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dogName: '',
    serviceType: 'Boarding',
    checkIn: '',
    message: ''
  });

  const [errors, setErrors] = useState<{ email?: string; phone?: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear specific error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { email?: string; phone?: string } = {};
    let isValid = true;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    // Phone validation
    // Remove non-digit chars to check length
    const phoneDigits = formData.phone.replace(/\D/g, '');
    // Allow digits, spaces, dashes, parentheses, plus sign
    const phoneCharRegex = /^[0-9\s\-()+]*$/;
    
    if (!formData.phone) {
        // Required field handled by HTML 'required', but good to double check
        newErrors.phone = "Phone number is required.";
        isValid = false;
    } else if (!phoneCharRegex.test(formData.phone)) {
        newErrors.phone = "Phone number contains invalid characters.";
        isValid = false;
    } else if (phoneDigits.length < 9 || phoneDigits.length > 15) {
        newErrors.phone = "Please enter a valid phone number (9-15 digits).";
        isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real app, this would send data to backend
      alert("Thank you! We have received your booking request. We will contact you shortly to confirm.");
      
      // Optional: Reset form on success
      setFormData({
        name: '',
        email: '',
        phone: '',
        dogName: '',
        serviceType: 'Boarding',
        checkIn: '',
        message: ''
      });
    }
  };

  return (
    <section id="booking" className="py-24 bg-white relative scroll-mt-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-teal rounded-[3rem] p-6 md:p-12 shadow-2xl overflow-hidden relative">
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-dark/20 rounded-full blur-3xl -ml-16 -mb-16"></div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
                <div className="text-white space-y-6">
                    <div>
                        <span className="inline-block py-1 px-3 rounded-full bg-brand-sand/20 text-brand-sand text-sm font-bold uppercase tracking-wider mb-3">
                            Start Your Journey
                        </span>
                        <h2 className="text-4xl font-display font-extrabold mb-4">Ready to Book?</h2>
                        <p className="text-brand-cream/90 text-lg leading-relaxed">
                            Fill out the form to request a reservation. We'll check availability and get back to you within 24 hours.
                        </p>
                    </div>

                    <div className="space-y-4 pt-6">
                        <div className="flex items-center gap-4 bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                            <div className="bg-brand-sand text-brand-dark p-2 rounded-full"><User size={20}/></div>
                            <div>
                                <p className="font-bold text-sm text-brand-sand">New Customers</p>
                                <p className="text-xs text-white/80">First night 10% off!</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                            <div className="bg-brand-sand text-brand-dark p-2 rounded-full"><Calendar size={20}/></div>
                            <div>
                                <p className="font-bold text-sm text-brand-sand">Availability</p>
                                <p className="text-xs text-white/80">Spots filling fast for Summer</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg">
                    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Your Name</label>
                                <input 
                                    type="text" 
                                    name="name" 
                                    required
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 outline-none transition-all"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Dog's Name</label>
                                <input 
                                    type="text" 
                                    name="dogName" 
                                    required
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 outline-none transition-all"
                                    placeholder="Buddy"
                                    value={formData.dogName}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
                                <div className="relative">
                                    <input 
                                        type="email" 
                                        name="email" 
                                        required
                                        className={`w-full px-4 py-2 rounded-xl border ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-brand-teal focus:ring-brand-teal/20'} focus:ring-2 outline-none transition-all`}
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    {errors.email && (
                                        <div className="absolute right-3 top-2.5 text-red-500">
                                            <AlertCircle size={18} />
                                        </div>
                                    )}
                                </div>
                                {errors.email && <p className="text-red-500 text-xs mt-1 font-medium ml-1">{errors.email}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Phone</label>
                                <div className="relative">
                                    <input 
                                        type="tel" 
                                        name="phone" 
                                        required
                                        className={`w-full px-4 py-2 rounded-xl border ${errors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-brand-teal focus:ring-brand-teal/20'} focus:ring-2 outline-none transition-all`}
                                        placeholder="(555) 123-4567"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                    {errors.phone && (
                                        <div className="absolute right-3 top-2.5 text-red-500">
                                            <AlertCircle size={18} />
                                        </div>
                                    )}
                                </div>
                                {errors.phone && <p className="text-red-500 text-xs mt-1 font-medium ml-1">{errors.phone}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Service</label>
                                <select 
                                    name="serviceType" 
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 outline-none transition-all bg-white"
                                    value={formData.serviceType}
                                    onChange={handleChange}
                                >
                                    <option>Boarding</option>
                                    <option>Daycare</option>
                                    <option>Grooming</option>
                                    <option>Training</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Desired Date</label>
                                <input 
                                    type="date" 
                                    name="checkIn" 
                                    required
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 outline-none transition-all"
                                    value={formData.checkIn}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Message / Special Needs</label>
                            <textarea 
                                name="message" 
                                rows={3}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 outline-none transition-all"
                                placeholder="Tell us a bit about your dog..."
                                value={formData.message}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        <Button type="submit" fullWidth size="lg">Send Request</Button>
                    </form>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};