import React, { useState } from 'react';
import { Star, Plus, Minus, Check, Dog, Cat, Scissors, Home, Info, Search } from 'lucide-react';
import { SectionTitle, Card } from '../ui/Elements';
import { TESTIMONIALS, FAQS, PRICING_DATA } from '../../constants';

export const Testimonials: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredTestimonials = TESTIMONIALS.filter(t =>
        t.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.dogName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section id="reviews" className="py-24 bg-white scroll-mt-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle title="Happy Tails" subtitle="Reviews" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-brand-cream p-8 rounded-3xl">
                            <h3 className="text-2xl font-bold text-brand-dark mb-2">4.9/5 Rating</h3>
                            <div className="flex text-yellow-400 mb-4">
                                {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={24} />)}
                            </div>
                            <p className="text-stone-600">Based on over 500+ happy stays. We take pride in every wagging tail.</p>
                        </div>

                        <div className="p-6 bg-brand-green/10 rounded-3xl border border-brand-green/20">
                            <h4 className="font-bold text-brand-dark mb-2">Real Feedback</h4>
                            <p className="text-sm text-stone-600">All reviews are from verified pet owners who have trusted us with their furkids.</p>
                        </div>
                    </div>

                    <div className="lg:col-span-8">
                        <div className="mb-8 relative max-w-md">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-full leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-brand-green focus:border-brand-green sm:text-sm transition-shadow shadow-sm hover:shadow-md"
                                placeholder="Search reviews..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {filteredTestimonials.length > 0 ? (
                                filteredTestimonials.map(review => (
                                    <div key={review.id} className="h-full">
                                        <Card className="p-6 h-full hover:shadow-lg transition-shadow duration-300 flex flex-col">
                                            <div className="flex items-center gap-4 mb-4">
                                                <img
                                                    src={review.imageUrl}
                                                    alt={review.dogName}
                                                    className="w-14 h-14 rounded-full object-cover border-2 border-brand-green"
                                                />
                                                <div>
                                                    <h4 className="font-bold text-brand-dark">{review.ownerName} & {review.dogName}</h4>
                                                    <p className="text-xs text-stone-500 uppercase tracking-wide">{review.breed}</p>
                                                </div>
                                            </div>

                                            <div className="flex text-yellow-400 mb-3">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        size={16}
                                                        fill={i < review.rating ? "currentColor" : "none"}
                                                        className={i < review.rating ? "text-yellow-400" : "text-gray-200"}
                                                    />
                                                ))}
                                            </div>

                                            <div className="relative flex-grow">
                                                <span className="absolute -top-2 -left-2 text-4xl text-brand-sand/40 font-serif leading-none">"</span>
                                                <p className="text-stone-600 relative z-10 text-sm leading-relaxed italic pl-2">
                                                    {review.text}
                                                </p>
                                            </div>
                                        </Card>
                                    </div>
                                ))
                            ) : (
                                <div className="w-full text-center py-12 col-span-2">
                                    <p className="text-stone-500 text-lg">No reviews found.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export const Pricing: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'dogs' | 'cats'>('dogs');

    return (
        <section id="pricing" className="py-24 bg-brand-cream scroll-mt-32">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle title="Transparent Pricing" subtitle="Affordable Care" />

                {/* Tabs */}
                <div className="flex justify-center mb-12">
                    <div className="bg-white p-1.5 rounded-full shadow-sm inline-flex">
                        <button
                            onClick={() => setActiveTab('dogs')}
                            className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${activeTab === 'dogs' ? 'bg-brand-green text-white shadow-md' : 'text-stone-500 hover:bg-stone-100'}`}
                        >
                            <Dog size={18} />
                            Dogs
                        </button>
                        <button
                            onClick={() => setActiveTab('cats')}
                            className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${activeTab === 'cats' ? 'bg-brand-brown text-white shadow-md' : 'text-stone-500 hover:bg-stone-100'}`}
                        >
                            <Cat size={18} />
                            Cats / Rabbits
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-12 animate-fade-in">
                    {activeTab === 'dogs' ? (
                        <>
                            {/* Dogs Daycare & Boarding Tables */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <PricingTable
                                    title="Day Care"
                                    subtitle="Fun & Socialization"
                                    data={PRICING_DATA.dogs.daycare}
                                    columns={['Size', 'Normal', 'Peak']}
                                    footerText="Peak Season: Public Holidays, School Holidays, Festive Seasons"
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
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <ListCard title="Monthly Boarding Packages" icon={Home} items={PRICING_DATA.dogs.monthly} />
                                <ListCard title="Basic Grooming" icon={Scissors} items={PRICING_DATA.dogs.grooming} />
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Cats Daycare & Boarding */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                                    columns={['Type', 'Price']}
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
                <div className="mt-16">
                    <div className="bg-white rounded-3xl p-8 border border-brand-sand/30 shadow-sm">
                        <h3 className="text-xl font-bold text-brand-dark mb-6 flex items-center gap-2">
                            <Plus size={20} className="text-brand-green" /> Add-On Services
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {PRICING_DATA.addons.map((addon, idx) => (
                                <div key={idx} className="flex justify-between items-center p-4 bg-brand-cream rounded-xl">
                                    <span className="text-stone-700 font-medium text-sm">{addon.service}</span>
                                    <span className="font-bold text-brand-green text-sm">{addon.price}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Peak Season Note */}
                <div className="mt-8 flex items-start gap-3 bg-brand-blue/10 p-4 rounded-xl text-sm text-stone-600">
                    <Info size={18} className="text-brand-blue shrink-0 mt-0.5" />
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
        <section id="faq" className="py-24 bg-brand-sand/20 scroll-mt-32">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle title="Common Questions" subtitle="FAQ" />

                <div className="space-y-4">
                    {FAQS.map((item, index) => (
                        <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-brand-sand/20">
                            <button
                                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none hover:bg-brand-cream/50 transition-colors"
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            >
                                <span className="font-bold text-brand-dark text-lg pr-4">{item.question}</span>
                                <div className={`shrink-0 p-1 rounded-full transition-colors ${openIndex === index ? 'bg-brand-green text-white' : 'bg-brand-cream text-brand-dark'}`}>
                                    {openIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                                </div>
                            </button>
                            <div
                                className={`px-6 transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-48 pb-6 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
                            >
                                <p className="text-stone-600 leading-relaxed text-sm">{item.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};