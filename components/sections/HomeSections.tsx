import React from 'react';
import { ArrowRight, CheckCircle, Clock, ShieldCheck, Heart, Sparkles, Star } from 'lucide-react';
import { Button, SectionTitle, Card } from '../ui/Elements';
import { SERVICES } from '../../constants';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden scroll-mt-32">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-brand-green/20 rounded-full blur-3xl opacity-50 z-0"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-brand-blue/20 rounded-full blur-3xl opacity-50 z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm text-brand-dark font-bold text-sm border border-brand-sand">
               <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
               Limited Spots: 8 Dogs Max
            </div>
            <h1 className="text-5xl lg:text-7xl font-display font-extrabold text-brand-dark leading-[1.1]">
              A Vacation Your <br/>
              <span className="text-brand-green inline-block transform -rotate-2">Dog Will Love</span>
            </h1>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="#booking">
                <Button variant="primary" size="lg">Book a Stay</Button>
              </a>
              <a href="#how-it-works">
                <Button variant="secondary" size="lg">How It Works</Button>
              </a>
            </div>
            <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-stone-500 font-medium text-sm">
                <div className="flex items-center gap-2"><ShieldCheck size={18} className="text-brand-green"/> 100% Cage-Free</div>
                <div className="flex items-center gap-2"><Heart size={18} className="text-brand-green"/> Daily Updates</div>
                <div className="flex items-center gap-2"><Sparkles size={18} className="text-brand-green"/> Hygiene First</div>
            </div>
          </div>
          <div className="relative">
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <img 
                src="https://images.unsplash.com/photo-1560807707-8cc77767d783?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Happy French Bulldog" 
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Decorative elements behind image */}
            <div className="absolute inset-0 bg-brand-sand rounded-[3rem] transform -rotate-3 translate-x-4 translate-y-4 -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const AboutPreview: React.FC = () => {
    return (
        <section id="about" className="py-20 bg-white rounded-t-[4rem] -mt-10 relative z-20 scroll-mt-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="order-2 md:order-1 grid grid-cols-2 gap-4">
                        <div className="translate-y-8">
                          <img 
                            src="https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?auto=format&fit=crop&w=500&q=80" 
                            className="rounded-3xl shadow-lg object-cover h-72 w-full" 
                            alt="Cute Yorkie puppy" 
                          />
                        </div>
                        <div>
                          <img 
                            src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=500&q=80" 
                            className="rounded-3xl shadow-lg object-cover h-72 w-full" 
                            alt="Happy Golden Retriever" 
                          />
                        </div>
                    </div>
                    <div className="order-1 md:order-2">
                        <SectionTitle 
                            title="Trusted, Loving & Ethical" 
                            subtitle="About Us"
                            centered={false}
                        />
                        <div className="space-y-6 text-lg text-stone-600 leading-relaxed">
                            <p>
                                <span className="font-bold text-brand-dark">Our Mission:</span> To provide safe, home-style boarding where every pet is treated like family, not just a guest.
                            </p>
                            <p>
                                My Pawcation started because we couldn't find a place we trusted for our own dogs. We wanted a place without cages, without the smell of chemicals, and with genuine human connection.
                            </p>
                            <p>
                                We are urban professionals just like you. We understand the guilt of traveling without them, which is why we over-communicate with photos and love.
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-6 mt-8">
                            {[
                                { label: "Caregivers", value: "Verified" },
                                { label: "Happy Guests", value: "500+" },
                                { label: "Capacity Limit", value: "8 Dogs" },
                                { label: "Emergency Ready", value: "24/7" },
                            ].map((stat, i) => (
                                <div key={i} className="bg-brand-cream p-4 rounded-2xl border border-brand-sand">
                                    <div className="text-2xl font-display font-bold text-brand-dark">{stat.value}</div>
                                    <div className="text-xs font-bold text-brand-green uppercase tracking-wide">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-brand-cream relative scroll-mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle 
          title="Everything They Need" 
          subtitle="Our Services" 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((service, idx) => (
            <Card key={idx} className="h-full flex flex-col p-8 group hover:-translate-y-2 transition-transform duration-300 border border-transparent hover:border-brand-sand">
              <div className="h-14 w-14 bg-brand-sand/50 rounded-2xl flex items-center justify-center text-brand-dark mb-6 group-hover:bg-brand-green group-hover:text-white transition-colors">
                <service.icon size={28} />
              </div>
              <h3 className="text-2xl font-display font-bold text-brand-dark mb-3">{service.title}</h3>
              <p className="text-stone-600 mb-6 flex-grow text-sm leading-relaxed">{service.description}</p>
              <ul className="space-y-2 mb-6">
                {service.features.slice(0, 3).map((feature, i) => (
                  <li key={i} className="flex items-start text-sm text-stone-500">
                    <CheckCircle size={16} className="text-brand-green mr-2 mt-0.5 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="font-bold text-brand-dark">{service.price}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export const HowItWorks: React.FC = () => {
    const steps = [
        { 
            stage: "Before Boarding",
            items: ["Submit online form / contact us", "Vaccination check", "Behavior assessment", "Meet & Greet"]
        },
        { 
            stage: "During Stay",
            items: ["Daily feeding logs", "Playtime sessions", "Photo/Video updates", "Unlimited belly rubs"]
        },
        { 
            stage: "Going Home",
            items: ["Exit health check", "Belongings packed", "Reunion cuddles", "Feedback request"]
        },
    ];

    return (
        <section id="how-it-works" className="py-24 bg-white scroll-mt-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle title="Simple & Transparent" subtitle="How It Works" />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, i) => (
                        <div key={i} className="relative group">
                            <div className="bg-brand-cream rounded-3xl p-8 h-full border-2 border-transparent group-hover:border-brand-sand transition-all">
                                <div className="absolute -top-6 left-8 bg-brand-dark text-white text-xl font-bold w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
                                    {i + 1}
                                </div>
                                <h3 className="mt-4 text-2xl font-display font-bold text-brand-dark mb-6">{step.stage}</h3>
                                <ul className="space-y-4">
                                    {step.items.map((item, idx) => (
                                        <li key={idx} className="flex items-center text-stone-600">
                                            <div className="w-2 h-2 rounded-full bg-brand-green mr-3"></div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}