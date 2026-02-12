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

    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            setStatus('loading');
            try {
                const response = await fetch("https://formspree.io/f/xaqqvkwa", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    setStatus('success');
                    setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        dogName: '',
                        serviceType: 'Boarding',
                        checkIn: '',
                        message: ''
                    });
                } else {
                    setStatus('error');
                }
            } catch (err) {
                setStatus('error');
            }
        }
    };

    if (status === 'success') {
        return (
            <section id="booking" className="py-12 bg-white scroll-mt-24">
                <div className="max-w-4xl mx-auto px-4">
                    <Card className="p-10 text-center space-y-6 border-2 border-brand-green">
                        <div className="w-20 h-20 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mx-auto text-4xl">
                            ✓
                        </div>
                        <h2 className="text-3xl font-display font-extrabold text-brand-brown">Booking Request Sent!</h2>
                        <p className="text-stone-600 text-lg">
                            Thank you for choosing My Pawcation. We've received your request for <strong>{formData.dogName}</strong> and will contact you via WhatsApp or email within 24 hours to confirm availability.
                        </p>
                        <Button variant="outline" onClick={() => setStatus('idle')}>Send Another Request</Button>
                    </Card>
                </div>
            </section>
        )
    }

    return (
        <section id="booking" className="py-12 bg-brand-cream relative scroll-mt-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-brand-brown rounded-[2.5rem] p-6 md:p-10 shadow-2xl overflow-hidden relative">
                    {/* Background pattern */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-brand-green/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-accent/10 rounded-full blur-3xl -ml-32 -mb-32"></div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10 items-center">
                        <div className="text-white space-y-8">
                            <div>
                                <span className="inline-block py-1 px-4 rounded-full bg-brand-accent/20 text-brand-accent text-sm font-bold uppercase tracking-widest mb-4">
                                    Reservations
                                </span>
                                <h2 className="text-5xl font-display font-extrabold mb-6 leading-tight">Ready for a <br /><span className="text-brand-accent">Pawcation?</span></h2>
                                <p className="text-brand-cream/80 text-xl leading-relaxed">
                                    Give your dog the vacation they deserve. Fill out the form and we'll handle the rest. We usually reply within a few hours.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center gap-5 bg-white/5 p-6 rounded-2xl backdrop-blur-md border border-white/10">
                                    <div className="bg-brand-accent text-brand-brown p-3 rounded-xl"><User size={24} /></div>
                                    <div>
                                        <p className="font-bold text-lg text-white">New Guests Welcome</p>
                                        <p className="text-sm text-brand-cream/60">First-time boarding gets a complimentary treat pack!</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-5 bg-white/5 p-6 rounded-2xl backdrop-blur-md border border-white/10">
                                    <div className="bg-brand-green text-white p-3 rounded-xl"><Calendar size={24} /></div>
                                    <div>
                                        <p className="font-bold text-lg text-white">Instant Notifications</p>
                                        <p className="text-sm text-brand-cream/60">Get confirmed via WhatsApp for faster communication.</p>
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