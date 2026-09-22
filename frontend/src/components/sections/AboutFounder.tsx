import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import dbData from '../../data/db.json';

export function AboutFounder() {
  const [founder, setFounder] = useState<any>(null);

  useEffect(() => {
    Promise.resolve({ ok: true, json: () => Promise.resolve(dbData['founder']) })
      .then(res => res.json())
      .then(data => setFounder(data))
      .catch(err => console.error('Failed to load founder content:', err));
  }, []);

  const name = founder?.name || 'Alex Mercer';
  const title = founder?.title || 'Former Tech Lead';
  const bio = founder?.bio || `"I started this institute because I saw a massive gap between what academic institutions teach and what the technology industry actually needs."\n\n"Having spent over a decade architecting systems for Fortune 500 companies, I realized that true engineering skill is forged in the fires of real-world problem solving, not just textbook theory."`;
  const image_url = founder?.image_url || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=1200';

  return (
    <section className="relative pt-12 pb-4 lg:pt-16 lg:pb-8 bg-white text-dark overflow-hidden" id="founder">
      
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Founder Image with Badge */}
          <div className="lg:col-span-5 relative w-full max-w-md mx-auto lg:ml-auto aspect-[4/3] rounded-3xl overflow-hidden group shadow-2xl shadow-brand/10">
            <motion.div 
              className="absolute inset-[-5%] bg-cover bg-top"
              initial={{ scale: 1.1 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
              style={{ 
                backgroundImage: `url("${image_url}")`
              }}
            />
            {/* Tech Overlay */}
            <div className="absolute inset-0 bg-brand/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Glassmorphism Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-white/70 backdrop-blur-md border border-white/40 shadow-xl flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-brand flex items-center justify-center text-white shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <div className="text-xs font-bold text-dark">{title}</div>
                <div className="text-[10px] font-semibold text-brand uppercase tracking-wider">Fortune 500</div>
              </div>
            </motion.div>
          </div>

          {/* Founder Bio Content */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand/5 rounded-md text-brand font-bold uppercase tracking-widest text-[10px] mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
                The Visionary
              </div>
              
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-heading font-black text-dark leading-[1.1] mb-5">
                Empowering the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-[#8d00aa]">Next Generation</span>
              </h2>
              
              <div className="space-y-3 text-base text-secondary-text font-medium leading-relaxed max-w-2xl whitespace-pre-line">
                {bio}
                
                <div className="mt-5 p-4 rounded-xl bg-gray-50 border border-gray-100 relative">
                  <svg className="w-6 h-6 text-brand/20 absolute -top-3 -left-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-dark italic font-bold relative z-10 text-sm">
                    "Our goal isn't to teach you how to write code. It's to teach you how to think like an engineer and build solutions that matter."
                  </p>
                </div>
              </div>
              
              <motion.div 
                className="mt-6 flex items-center gap-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <div className="h-[1px] w-8 bg-brand/30" />
                <div className="font-heading text-xl font-black text-dark uppercase tracking-widest">
                  {name}
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
