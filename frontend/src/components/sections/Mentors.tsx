import { motion } from 'framer-motion';
import { Link, Globe, Mail } from 'lucide-react';

const MENTORS = [
  {
    name: "Dr. Sarah Chen",
    role: "Lead AI Scientist",
    company: "ex-Google Brain",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800",
    description: "10+ years of experience in deep learning and NLP. Published author and open-source contributor."
  },
  {
    name: "Michael Roberts",
    role: "Principal Engineer",
    company: "Netflix",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
    description: "Specializes in scalable distributed systems and cloud architecture. Built backend for millions of users."
  },
  {
    name: "Jessica Walsh",
    role: "Head of Product Design",
    company: "Stripe",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
    description: "Award-winning UX/UI designer. Passionate about creating intuitive, accessible, and beautiful interfaces."
  }
];

export function Mentors() {
  return (
    <section className="py-8 md:py-12 bg-[#f8f9fa] relative overflow-hidden" id="mentors">
      <div className="max-w-[1440px] mx-auto px-6 md:px-8 relative z-10">
        
        <div className="text-center max-w-2xl mx-auto mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-3 py-1 bg-brand/10 border border-brand/20 rounded-full text-brand font-bold uppercase tracking-widest text-[10px] mb-3">
              Learn From The Best
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-black text-dark leading-tight mb-3">
              Meet Your <span className="text-brand">Mentors</span>
            </h2>
            <p className="text-sm md:text-base text-slate-500 font-medium">
              You'll be guided by industry leaders who are actively shaping the future of tech.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {MENTORS.map((mentor, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="group relative bg-white rounded-2xl p-3 border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Image Container with Hover Zoom */}
              <div className="relative w-full aspect-square md:h-48 rounded-xl overflow-hidden bg-gray-100 mb-4">
                <img 
                  src={mentor.image} 
                  alt={mentor.name} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" 
                />
                
                {/* Overlay gradient for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Hover Content (Socials) */}
                <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-20">
                  <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-brand hover:scale-110 transition-all border border-white/30">
                    <Link className="w-4 h-4" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-brand hover:scale-110 transition-all border border-white/30">
                    <Globe className="w-4 h-4" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-brand hover:scale-110 transition-all border border-white/30">
                    <Mail className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Text Info */}
              <div className="px-3 pb-3 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-brand transition-colors">
                  {mentor.name}
                </h3>
                <div className="text-brand font-bold text-xs mb-2">
                  {mentor.role} <span className="text-gray-400 font-normal ml-1">@ {mentor.company}</span>
                </div>
                <p className="text-gray-500 text-xs leading-relaxed">
                  {mentor.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
