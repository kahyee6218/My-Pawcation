import React, { useState } from 'react';
import { Star, Plus, Minus, Check, Dog, Cat, Scissors, Home, Info, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionTitle, Card } from '../ui/Elements';
import { TESTIMONIALS, FAQS, PRICING_DATA } from '../../constants';

export const Testimonials: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // We'll use CSS classes for responsiveness, 
    // but the JS translation needs to match the visual width.
    // On Desktop: 8 items, Tablet: 5 items, Mobile: 3 items

    const next = () => {
        // Loop back to start if at the end
        setCurrentIndex((prev) => (prev + 1) >= TESTIMONIALS.length ? 0 : prev + 1);
    };

    const prev = () => {
        setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
    };

    return (
        <section id="reviews" className="py-12 bg-white scroll-mt-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle title="Happy Tails" subtitle="WhatsApp Reviews" />

                <div className="relative group max-w-5xl mx-auto">
                    {/* Carousel Viewport */}
                    <div className="overflow-hidden px-1">
                        <div
                            className="flex transition-transform duration-300 ease-in-out gap-2 md:gap-3"
                            style={{
                                // Calculation: Move by 1 item's percentage width
                                // Each item is 100/N % of the container
                                transform: `translateX(calc(-${currentIndex} * (100% / 3 + 0.5rem)))`, /* Mobile default (3 items) */
                            }}
                        >
                            {/* We'll use Tailwind classes to override the calc on larger screens */}
                            <style>{`
                                @media (min-width: 768px) {
                                    #testimonial-track { transform: translateX(calc(-${currentIndex} * (100% / 5 + 0.75rem))) !important; }
                                }
                                @media (min-width: 1024px) {
                                    #testimonial-track { transform: translateX(calc(-${currentIndex} * (100% / 8 + 0.75rem))) !important; }
                                }
                            `}</style>
                            <div id="testimonial-track" className="flex gap-2 md:gap-3 shrink-0 transition-transform duration-300 ease-in-out">
                                {TESTIMONIALS.map((review) => (
                                    <div
                                        key={review.id}
                                        className="w-[calc(100vw/3.5)] md:w-[calc(1024px/5.5)] lg:w-[calc(1280px/9)] shrink-0"
                                        style={{ width: 'clamp(80px, 11%, 140px)' }} /* Fixed-ish small size */
                                    >
                                        <Card className="p-0 overflow-hidden shadow-sm hover:shadow-md transition-all border border-stone-100 aspect-square bg-gray-50 rounded-lg">
                                            <img
                                                src={review.imageUrl}
                                                alt={`WhatsApp Review ${review.id}`}
                                                className="w-full h-full object-cover"
                                                loading="lazy"
                                            />
                                        </Card>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Navigation Buttons - More prominent for "Next" logic */}
                    <button
                        onClick={prev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-4 bg-white p-2 rounded-full shadow-lg text-brand-dark hover:bg-brand-green hover:text-white transition-all z-10 border border-stone-100"
                        aria-label="Previous Review"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <button
                        onClick={next}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-4 bg-white p-2 rounded-full shadow-lg text-brand-dark hover:bg-brand-green hover:text-white transition-all z-10 border border-stone-100"
                        aria-label="Next Review"
                    >
                        <ChevronRight size={18} />
                    </button>

                    {/* Pagination Dots */}
                    <div className="flex justify-center gap-1.5 mt-6">
                        {TESTIMONIALS.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`h-1 w-1 rounded-full transition-all ${currentIndex === idx ? 'bg-brand-green w-3' : 'bg-stone-200'}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export const Pricing: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'dogs' | 'cats'>('dogs');

    return (
        <section id="pricing" className="py-12 bg-brand-cream scroll-mt-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle title="Transparent Pricing" subtitle="Affordable Care" />

                {/* Tabs */}
                <div className="flex justify-center mb-8">
                    <div className="bg-white p-1 rounded-full shadow-sm inline-flex">
                        <button
                            onClick={() => setActiveTab('dogs')}
                            className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${activeTab === 'dogs' ? 'bg-brand-green text-white shadow-md' : 'text-stone-500 hover:bg-stone-100'}`}
                        >
                            <Dog size={16} />
                            Dogs
                        </button>
                        <button
                            onClick={() => setActiveTab('cats')}
                            className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${activeTab === 'cats' ? 'bg-brand-brown text-white shadow-md' : 'text-stone-500 hover:bg-stone-100'}`}
                        >
                            <Cat size={16} />
                            Cats / Rabbits
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-8 animate-fade-in">
                    {activeTab === 'dogs' ? (
                        <>
                            {/* Dogs Daycare & Boarding Tables */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <PricingTable
                                    title="Day Care"
                                    subtitle="Fun & Socialization"
                                    data={PRICING_DATA.dogs.daycare}
                                    columns={['Size', 'Normal', 'Peak']}
                                />
                                <PricingTable
                                    title="Boarding (Per Night)"
                                    subtitle="Overnight Sleepover"
                                    data={PRICING_DATA.dogs.boarding}
                                    columns={['Size', 'Normal', 'Peak']}
                                    highlight
                                />
                            </div>

                            {/* Monthly & Grooming */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <ListCard title="Monthly Boarding Packages" icon={Home} items={PRICING_DATA.dogs.monthly} />
                                <PricingTable
                                    title="Basic Grooming"
                                    subtitle="Spa Day"
                                    data={PRICING_DATA.dogs.grooming}
                                    columns={['Size', 'Normal', 'Peak']}
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Cats Daycare & Boarding */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <PricingTable
                                    title="Day Care"
                                    subtitle="Cat / Rabbit"
                                    data={PRICING_DATA.cats_rabbits.daycare}
                                    columns={['Type', 'Normal', 'Peak']}
                                />
                                <PricingTable
                                    title="Boarding (Per Night)"
                                    subtitle="Cat / Rabbit"
                                    data={PRICING_DATA.cats_rabbits.boarding}
                                    columns={['Type', 'Normal', 'Peak']}
                                    highlight
                                />
                            </div>
                            <div className="max-w-2xl mx-auto">
                                <ListCard title="Monthly Boarding Packages" icon={Home} items={PRICING_DATA.cats_rabbits.monthly} />
                            </div>
                        </>
                    )}
                </div>

                {/* Add-ons */}
                <div className="mt-12">
                    <div className="bg-white rounded-3xl p-6 border border-brand-sand/30 shadow-sm">
                        <h3 className="text-lg font-bold text-brand-dark mb-4 flex items-center gap-2">
                            <Plus size={18} className="text-brand-green" /> Add-On Services
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {PRICING_DATA.addons.map((addon, idx) => (
                                <div key={idx} className="flex justify-between items-center p-3 bg-brand-cream rounded-xl">
                                    <span className="text-stone-700 font-medium text-xs">{addon.service}</span>
                                    <span className="font-bold text-brand-green text-xs">{addon.price}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Peak Season Note */}
                <div className="mt-6 flex items-start gap-3 bg-brand-blue/10 p-3 rounded-xl text-xs text-stone-600">
                    <Info size={16} className="text-brand-blue shrink-0 mt-0.5" />
                    <p><strong>Note:</strong> Peak Season rates apply during Public Holidays, School Holidays, and Festive Seasons. Prices are subject to change without prior notice.</p>
                </div>
            </div>
        </section>
    );
};

// Helper Components for Pricing
const PricingTable = ({ title, subtitle, data, columns, highlight = false, footerText }: any) => (
    <div className={`bg-white rounded-3xl overflow-hidden border-2 ${highlight ? 'border-brand-green shadow-xl relative' : 'border-gray-100 shadow-sm'}`}>
        {highlight && <div className="bg-brand-green text-white text-center text-xs font-bold py-1 uppercase tracking-wider">Recommended</div>}
        <div className="p-6">
            <h3 className="text-xl font-bold text-brand-dark">{title}</h3>
            <p className="text-stone-500 text-sm mb-6">{subtitle}</p>

            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-gray-100">
                        {columns.map((col: string, i: number) => (
                            <th key={i} className={`pb-3 text-stone-400 font-medium ${i === 0 ? 'text-left' : 'text-right'}`}>{col}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {data.map((row: any, i: number) => (
                        <tr key={i}>
                            <td className="py-4 font-medium text-stone-700">
                                {row.size || row.type}
                            </td>
                            {row.normal && (
                                <td className="py-4 text-right text-stone-600">{row.normal}</td>
                            )}
                            {row.peak && (
                                <td className="py-4 text-right text-brand-brown font-semibold">{row.peak}</td>
                            )}
                            {row.price && !row.normal && (
                                <td className="py-4 text-right text-brand-dark font-bold">{row.price}</td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            {footerText && <p className="text-xs text-stone-400 mt-4 italic">{footerText}</p>}
        </div>
    </div>
);

const ListCard = ({ title, items, icon: Icon }: any) => (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm h-full">
        <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-brand-cream rounded-lg text-brand-dark"><Icon size={20} /></div>
            <h3 className="font-bold text-brand-dark">{title}</h3>
        </div>
        <ul className="space-y-4">
            {items.map((item: any, i: number) => (
                <li key={i} className="flex justify-between items-center text-sm">
                    <span className="text-stone-600">{item.size || item.type}</span>
                    <span className="font-bold text-brand-dark">{item.price}</span>
                </li>
            ))}
        </ul>
    </div>
);


export const FAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="faq" className="py-16 bg-brand-cream/30 scroll-mt-32">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle title="Common Questions" subtitle="FAQ" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    {FAQS.map((item, index) => (
                        <div key={index} className="border-b border-stone-200 last:border-0 md:last:border-b h-fit group">
                            <button
                                className="w-full py-4 text-left flex justify-between items-start focus:outline-none transition-colors gap-4"
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            >
                                <span className="font-bold text-brand-dark text-sm leading-tight pt-0.5 group-hover:text-brand-green transition-colors">{item.question}</span>
                                <div className={`shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-brand-green' : 'text-stone-400'}`}>
                                    <Plus size={16} />
                                </div>
                            </button>
                            <div
                                className={`transition-all duration-300 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-64 pb-4 opacity-100' : 'max-h-0 opacity-0'}`}
                            >
                                <p className="text-stone-600 leading-relaxed text-xs pl-0">{item.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};