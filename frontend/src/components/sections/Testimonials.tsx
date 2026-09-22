import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import dbData from '../../data/db.json';

// Hardcoded positions for up to 8 avatars on the concentric circles
const ORBIT_POSITIONS = [
  { ring: 2, angle: 90 },   // Bottom (inner)
  { ring: 3, angle: 270 },  // Top (outer)
  { ring: 2, angle: 180 },  // Left
  { ring: 1, angle: 0 },    // Right
  { ring: 3, angle: 135 },  // Bottom-Left
  { ring: 2, angle: 315 },  // Top-Right
  { ring: 3, angle: 45 },   // Bottom-Right
  { ring: 3, angle: 225 },  // Top-Left
];

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    Promise.resolve({ ok: true, json: () => Promise.resolve(dbData['testimonials']) })
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          const mappedTestimonials = data.map((t: any) => ({
            id: t.id,
            name: t.student_name,
            role: t.role,
            image: t.image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(t.student_name)}&background=random`,
            content: t.text,
            rating: t.rating || 5,
            date: "Sep 3, 2026" // placeholder
          }));
          setTestimonials(mappedTestimonials);
        }
      })
      .catch(err => console.error('Failed to load testimonials:', err));
  }, []);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  if (testimonials.length === 0) return null;

  const activeTestimonial = testimonials[activeIndex];

  // Helper to calculate top/left percentages based on ring and angle
  const getCoordinates = (ring: number, angleDegrees: number) => {
    const radiusMap = { 1: 25, 2: 38, 3: 50 }; // percentages of half-width
    const r = radiusMap[ring as keyof typeof radiusMap];
    const angleRad = (angleDegrees * Math.PI) / 180;
    const x = 50 + r * Math.cos(angleRad);
    const y = 50 + r * Math.sin(angleRad);
    return { left: `${x}%`, top: `${y}%` };
  };

  return (
    <section className="pt-16 pb-12 md:pt-24 md:pb-20 bg-white relative overflow-hidden" id="testimonials">
      
      {/* Background styling */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#f8f9fa] to-transparent pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-heading font-black text-[#0f172a] leading-tight mb-4 tracking-tight">
              Success Stories
            </h2>
            <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
              Hear directly from the students and startups using SK Technologies to launch their careers.
            </p>
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          
          {/* Left Side: Orbit Graphic */}
          <div className="w-full lg:w-1/2 flex justify-center relative min-h-[400px] md:min-h-[500px]">
            <div className="relative w-full max-w-[450px] aspect-square flex items-center justify-center">
              
              {/* Smoky Glow Effect */}
              <div className="absolute inset-0 m-auto w-[70%] h-[70%] bg-[#8b5cf6]/20 rounded-full blur-[60px] z-0 pointer-events-none" />
              <div className="absolute bottom-10 left-1/4 w-[40%] h-[40%] bg-fuchsia-400/10 rounded-full blur-[50px] z-0 pointer-events-none" />

              {/* Concentric Rings */}
              <div className="absolute inset-0 m-auto w-[100%] h-[100%] rounded-full border border-slate-200/60 z-10" />
              <div className="absolute inset-0 m-auto w-[76%] h-[76%] rounded-full border border-slate-200/80 z-10" />
              <div className="absolute inset-0 m-auto w-[50%] h-[50%] rounded-full border border-slate-200 z-10" />
              
              {/* Decorative Sparkles */}
              <div className="absolute top-[20%] left-[12%] text-[#c084fc] z-10 animate-pulse">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              </div>
              <div className="absolute bottom-[20%] right-[18%] text-[#c084fc] z-10 animate-pulse opacity-70">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              </div>

              {/* Center Glow & Star */}
              <div className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-[#8b5cf6] flex items-center justify-center shadow-[0_0_40px_rgba(139,92,246,0.6)] z-20">
                <Star className="w-6 h-6 text-white fill-white" />
              </div>

              {/* Connecting Line to Active */}
              {testimonials.map((_, idx) => {
                if (idx !== activeIndex || idx >= ORBIT_POSITIONS.length) return null;
                const pos = ORBIT_POSITIONS[idx];
                return (
                  <div key="line" className="absolute inset-0 m-auto z-10" style={{ transform: `rotate(${pos.angle}deg)` }}>
                    <div className="absolute top-1/2 left-1/2 h-[2px] bg-[#c084fc] origin-left" style={{ width: `${(pos.ring === 1 ? 25 : pos.ring === 2 ? 38 : 50)}%` }} />
                  </div>
                );
              })}

              {/* Avatars */}
              {testimonials.map((testimonial, idx) => {
                if (idx >= ORBIT_POSITIONS.length) return null; // Only show up to available spots
                const pos = ORBIT_POSITIONS[idx];
                const coords = getCoordinates(pos.ring, pos.angle);
                const isActive = idx === activeIndex;

                return (
                  <div 
                    key={testimonial.id}
                    className={`absolute w-12 h-12 -ml-6 -mt-6 rounded-full cursor-pointer transition-all duration-300 z-20 ${isActive ? 'scale-125 ring-4 ring-[#8b5cf6] shadow-xl' : 'scale-100 ring-2 ring-white hover:scale-110 shadow-md'}`}
                    style={{ left: coords.left, top: coords.top }}
                    onClick={() => setActiveIndex(idx)}
                  >
                    <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover rounded-full bg-slate-100" />
                  </div>
                );
              })}

            </div>
          </div>

          {/* Right Side: Testimonial Card */}
          <div className="w-full lg:w-1/2 relative">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_8px_40px_rgba(0,0,0,0.06)] border border-slate-100 relative max-w-xl mx-auto lg:ml-auto">
              
              <div className="absolute -top-6 left-10">
                <div className="bg-[#f8f9fa] w-12 h-12 rounded-xl flex items-center justify-center text-slate-300">
                   <Quote className="w-6 h-6 fill-current" />
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50 text-[#8b5cf6] rounded-full text-[10px] font-bold tracking-widest uppercase mb-8 mt-2">
                <Star className="w-3 h-3 fill-current" />
                Success Story
              </div>

              <div className="min-h-[220px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTestimonial.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-lg md:text-xl text-slate-700 font-medium leading-relaxed mb-8">
                      "{activeTestimonial.content}"
                    </p>

                    <div className="flex items-center gap-4">
                      <img 
                        src={activeTestimonial.image} 
                        alt={activeTestimonial.name}
                        className="w-12 h-12 rounded-full object-cover border border-slate-200"
                      />
                      <div>
                        <h4 className="font-bold text-[#0f172a]">{activeTestimonial.name}</h4>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">
                          {activeTestimonial.role} • {activeTestimonial.date}
                        </p>
                        <div className="flex gap-0.5 mt-1 text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-current" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Pagination Dots */}
              <div className="flex items-center justify-center gap-2 mt-10">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === activeIndex 
                        ? 'bg-[#8b5cf6] w-6' 
                        : 'bg-slate-200 w-2 hover:bg-slate-300'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
