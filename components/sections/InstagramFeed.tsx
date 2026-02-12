import * as React from 'react';
import { Instagram, Heart, MessageCircle, ExternalLink } from 'lucide-react';
import { CONTACT_INFO } from '../../constants';

const IG_POSTS = [
    { id: 1, image: '/assets/ig_post_1.png', likes: '124', comments: '12' },
    { id: 2, image: '/assets/ig_post_2.png', likes: '89', comments: '5' },
    { id: 3, image: '/assets/ig_post_3.png', likes: '210', comments: '18' },
    { id: 4, image: '/assets/ig_post_4.png', likes: '156', comments: '9' },
    { id: 5, image: '/assets/ig_post_5.png', likes: '92', comments: '7' },
    { id: 6, image: 'https://images.unsplash.com/photo-1548191265-cc70d3d45ba1?auto=format&fit=crop&q=80&w=800', likes: '115', comments: '11' },
];

export const InstagramFeed: React.FC = () => {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-3 text-brand-green mb-4">
                            <Instagram size={28} />
                            <span className="font-bold tracking-widest uppercase text-sm">On Instagram</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-display font-black text-brand-dark leading-tight">
                            Follow Our <span className="text-brand-green">Pawsome</span> Journey
                        </h2>
                        <p className="text-stone-600 mt-4 text-lg">
                            Catch daily updates, cute guest highlights, and behind-the-scenes moments from My Pawcation.
                        </p>
                    </div>
                    <a
                        href={CONTACT_INFO.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 bg-brand-dark text-white px-8 py-4 rounded-2xl font-bold hover:bg-brand-green transition-all shadow-xl shadow-brand-brown/10 active:scale-95 transition-all"
                    >
                        @mypawcation
                        <ExternalLink size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {IG_POSTS.map((post) => (
                        <div
                            key={post.id}
                            className="group relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
                            onClick={() => window.open(CONTACT_INFO.instagram, '_blank')}
                        >
                            <img
                                src={post.image}
                                alt="Instagram post"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-brand-dark/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6 text-white font-bold">
                                <div className="flex items-center gap-2">
                                    <Heart size={20} fill="white" />
                                    <span>{post.likes}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MessageCircle size={20} fill="white" />
                                    <span>{post.comments}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-stone-50 rounded-full border border-stone-100 italic text-stone-500 text-sm">
                        Join our community of 500+ pet parents on Instagram 🐾
                    </div>
                </div>
            </div>
        </section>
    );
};
