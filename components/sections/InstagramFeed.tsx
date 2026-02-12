import * as React from 'react';
import { Instagram, Heart, MessageCircle, ExternalLink } from 'lucide-react';
import { CONTACT_INFO } from '../../constants';

const IG_POSTS = [
    { id: 1, image: 'https://instagram.fkul8-2.fna.fbcdn.net/v/t51.2885-15/631179265_17851586916670950_7079759530187246386_n.jpg?stp=dst-jpg_e15_p640x640_tt6&_nc_ht=instagram.fkul8-2.fna.fbcdn.net&_nc_cat=106&_nc_oc=Q6cZ2QHvxdfCTPfBolAOtuTmRoeMElAckfRy6RoshWaMD28mpbwUYZYQGZ492gdF1BdSj6LNwJ3PntGnw2r1HO2RLDog&_nc_ohc=W1ZNKNW_8NQQ7kNvwFz0nR2&_nc_gid=PW_XcTbEn8Qd490VJqEUdA&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfsevWbUne6xornl98N_lDMR-OKw3Kx1Jx06FcqJaYFc2Q&oe=6993A4C6&_nc_sid=8b3546', likes: '124', comments: '12' },
    { id: 2, image: 'https://instagram.fkul8-2.fna.fbcdn.net/v/t51.2885-15/626262301_17851157211670950_9157709564449968146_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08_tt6&_nc_ht=instagram.fkul8-2.fna.fbcdn.net&_nc_cat=106&_nc_oc=Q6cZ2QHvxdfCTPfBolAOtuTmRoeMElAckfRy6RoshWaMD28mpbwUYZYQGZ492gdF1BdSj6LNwJ3PntGnw2r1HO2RLDog&_nc_ohc=TF_eZ_U-lNMQ7kNvwGTOPgv&_nc_gid=PW_XcTbEn8Qd490VJqEUdA&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfsndGjmy4Kx1IhZmJ8XlB9jUek102fRbC97mFdrDR6qfA&oe=69939A67&_nc_sid=8b3546', likes: '89', comments: '5' },
    { id: 3, image: 'https://instagram.fkul8-2.fna.fbcdn.net/v/t51.2885-15/626283774_17850526917670950_914310762650359551_n.jpg?stp=dst-jpg_e15_p640x640_tt6&_nc_ht=instagram.fkul8-2.fna.fbcdn.net&_nc_cat=106&_nc_oc=Q6cZ2QHvxdfCTPfBolAOtuTmRoeMElAckfRy6RoshWaMD28mpbwUYZYQGZ492gdF1BdSj6LNwJ3PntGnw2r1HO2RLDog&_nc_ohc=-bNCnnrBijMQ7kNvwGq_qpE&_nc_gid=PW_XcTbEn8Qd490VJqEUdA&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_Afvb62TEjzebIWWGsaxPisx0Jonz2LETlYHD4ozIxyliyA&oe=6993858F&_nc_sid=8b3546', likes: '210', comments: '18' },
    { id: 4, image: 'https://instagram.fkul8-2.fna.fbcdn.net/v/t51.2885-15/625685547_17849733123670950_803894237524073057_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08_tt6&_nc_ht=instagram.fkul8-2.fna.fbcdn.net&_nc_cat=106&_nc_oc=Q6cZ2QHvxdfCTPfBolAOtuTmRoeMElAckfRy6RoshWaMD28mpbwUYZYQGZ492gdF1BdSj6LNwJ3PntGnw2r1HO2RLDog&_nc_ohc=HhrH68vcirsQ7kNvwGcKdWu&_nc_gid=PW_XcTbEn8Qd490VJqEUdA&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_Aftz13RCTNL0xwysjrbxhuNoexatTaiTdD4NSkgvcRcOOw&oe=69938EA4&_nc_sid=8b3546', likes: '156', comments: '9' },
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
