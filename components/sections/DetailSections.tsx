import React, { useState, useRef } from 'react';
import { Star, Plus, Minus, Check, Dog, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionTitle, Card, Button } from '../ui/Elements';
import { TESTIMONIALS, FAQS, PRICING_TIERS } from '../../constants';

export const Testimonials: React.FC = () => {
    const sliderRef = useRef<HTMLDivElement>(null);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredTestimonials = TESTIMONIALS.filter(item => 
        item.dogName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.ownerName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const scrollLeft = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: -350, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: 350, behavior: 'smooth' });
        }
    };

    return (
        <section id="reviews" className="py-24 bg-brand-cream scroll-mt-32 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <SectionTitle title="Happy Tails" subtitle="Testimonials" />

                {/* Search Bar */}
                <div className="max-w-md mx-auto mb-12 relative z-20">
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400 group-focus-within:text-brand-green transition-colors" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-12 pr-4 py-4 border-2 border-transparent bg-white rounded-full text-base placeholder-gray-400 focus:outline-none focus:border-brand-green focus:ring-0 shadow-sm transition-all hover:shadow-md"
                            placeholder="Search by dog or owner name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="relative group px-4 md:px-12">
                     {/* Navigation Buttons (Always visible on desktop if needed) */}
                     {filteredTestimonials.length > 2 && (
                        <>
                            <button 
                                onClick={scrollLeft}
                                className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full shadow-lg items-center justify-center text-brand-dark hover:bg-brand-green hover:text-white transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green"
                                aria-label="Previous testimonials"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <button 
                                onClick={scrollRight}
                                className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full shadow-lg items-center justify-center text-brand-dark hover:bg-brand-green hover:text-white transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green"
                                aria-label="Next testimonials"
                            >
                                <ChevronRight size={24} />
                            </button>
                        </>
                     )}

                    {/* Slider Container */}
                    <div 
                        ref={sliderRef}
                        className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 pt-4 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {filteredTestimonials.length > 0 ? (
                            filteredTestimonials.map((review) => (
                                <div key={review.id} className="snap-center shrink-0 w-[300px] md:w-[360px]">
                                    <Card className="p-8 h-full flex flex-col border border-brand-sand/30 hover:border-brand-green/30 transition-colors">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="relative">
                                                <img 
                                                    src={review.imageUrl} 
                                                    alt={review.dogName} 
                                                    className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md" 
                                                />
                                                <div className="absolute -bottom-1 -right-1 bg-brand-green text-white p-1 rounded-full border-2 border-white">
                                                    <Dog size={12} />
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-brand-dark text-lg leading-tight">{review.ownerName}</h4>
                                                <p className="text-xs text-brand-teal font-bold uppercase tracking-wide">{review.dogName} ({review.breed})</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex text-yellow-400 mb-4">
                                            {[...Array(5)].map((_, i) => (
                                                <Star 
                                                    key={i} 
                                                    size={16} 
                                                    fill={i < review.rating ? "currentColor" : "none"} 
                                                    className={i < review.rating ? "text-yellow-400" : "text-gray-200"}
                                                />
                                            ))}
                                        </div>
                                        
                                        <div className="relative">
                                            <span className="absolute -top-2 -left-2 text-4xl text-brand-sand/40 font-serif leading-none">"</span>
                                            <p className="text-stone-600 relative z-10 text-sm leading-relaxed italic pl-2">
                                                {review.text}
                                            </p>
                                        </div>
                                    </Card>
                                </div>
                            ))
                        ) : (
                            <div className="w-full text-center py-12">
                                <p className="text-stone-500 text-lg">No reviews found for "{searchTerm}".</p>
                                <button 
                                    onClick={() => setSearchTerm('')}
                                    className="mt-2 text-brand-green font-bold hover:underline"
                                >
                                    Clear search
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export const Pricing: React.FC = () => {
    return (
        <section id="pricing" className="py-24 bg-white scroll-mt-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle title="Transparent Pricing" subtitle="Value" />
                <p className="text-center text-stone-500 mb-12 max-w-2xl mx-auto">
                    Simple rates based on size. No hidden fees. We believe in providing premium care at fair prices for our community.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    {PRICING_TIERS.map((tier, i) => (
                        <div key={i} className={`rounded-3xl p-8 border-2 ${i === 1 ? 'border-brand-green bg-brand-cream scale-105 shadow-xl relative z-10' : 'border-gray-100 bg-white shadow-sm'}`}>
                            {i === 1 && (
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-brand-green text-white px-4 py-1 rounded-full text-xs font-bold tracking-wide uppercase">
                                    Most Popular
                                </div>
                            )}
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-brand-sand p-2 rounded-full text-brand-dark">
                                    <Dog size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-brand-dark">{tier.size}</h3>
                                    <p className="text-xs text-stone-500">{tier.weight}</p>
                                </div>
                            </div>
                            
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between items-end pb-2 border-b border-dashed border-gray-200">
                                    <span className="text-sm font-medium text-stone-600">Daycare</span>
                                    <span className="text-2xl font-display font-bold text-brand-dark">{tier.daycarePrice}</span>
                                </div>
                                <div className="flex justify-between items-end pb-2 border-b border-dashed border-gray-200">
                                    <span className="text-sm font-medium text-stone-600">Overnight</span>
                                    <span className="text-2xl font-display font-bold text-brand-dark">{tier.boardingPrice}</span>
                                </div>
                            </div>

                            <ul className="space-y-3 mb-8">
                                {tier.features.map((feat, j) => (
                                    <li key={j} className="flex items-center text-xs text-stone-600 font-medium">
                                        <Check size={14} className="text-brand-green mr-2" />
                                        {feat}
                                    </li>
                                ))}
                                <li className="flex items-center text-xs text-stone-600 font-medium">
                                    <Check size={14} className="text-brand-green mr-2" />
                                    Air-conditioned
                                </li>
                            </ul>
                            <a href="#booking">
                                <Button 
                                    fullWidth 
                                    variant={i === 1 ? 'primary' : 'outline'}
                                    size="sm"
                                >
                                    Choose Plan
                                </Button>
                            </a>
                        </div>
                    ))}
                </div>

                 <div className="mt-12 bg-brand-blue/10 rounded-2xl p-6 text-center">
                    <h4 className="font-bold text-brand-dark mb-2">Optional Add-ons</h4>
                    <div className="flex flex-wrap justify-center gap-4 text-sm text-stone-600">
                        <span className="bg-white px-3 py-1 rounded-full border border-brand-blue/20">Basic Grooming (from RM50)</span>
                        <span className="bg-white px-3 py-1 rounded-full border border-brand-blue/20">Pick-up & Drop-off (Based on distance)</span>
                        <span className="bg-white px-3 py-1 rounded-full border border-brand-blue/20">1-on-1 Training Reinforcement (RM30)</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export const FAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="faq" className="py-24 bg-brand-sand/30 scroll-mt-32">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle title="Common Questions" subtitle="FAQ" />
                
                <div className="space-y-4">
                    {FAQS.map((item, index) => (
                        <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-brand-sand/20">
                            <button 
                                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none hover:bg-brand-cream/50 transition-colors"
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            >
                                <span className="font-bold text-brand-dark text-lg">{item.question}</span>
                                <div className={`p-1 rounded-full transition-colors ${openIndex === index ? 'bg-brand-green text-white' : 'bg-brand-cream text-brand-dark'}`}>
                                    {openIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                                </div>
                            </button>
                            <div 
                                className={`px-6 transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-48 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                            >
                                <p className="text-stone-600 leading-relaxed">{item.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};