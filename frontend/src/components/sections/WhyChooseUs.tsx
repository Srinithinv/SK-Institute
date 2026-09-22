import { motion } from 'framer-motion';
import { Target, Users, Briefcase, Code } from 'lucide-react';

const REASONS = [
  {
    icon: <Users className="w-8 h-8" />,
    title: "1-on-1 Mentorship",
    description: "Get personalized guidance from industry veterans who have built products for millions of users."
  },
  {
    icon: <Code className="w-8 h-8" />,
    title: "Real-world Projects",
    description: "Don't just watch tutorials. Build production-grade applications that solve actual business problems."
  },
  {
    icon: <Briefcase className="w-8 h-8" />,
    title: "100% Placement Support",
    description: "From resume reviews to mock interviews, we guide you until you land your dream job."
  },
  {
    icon: <Target className="w-8 h-8" />,
    title: "Outcome-Driven",
    description: "Our curriculum is reverse-engineered from the exact skills top tech companies are hiring for today."
  }
];

export function WhyChooseUs() {
  return (
    <section className="py-12 md:py-16 bg-white relative overflow-hidden" id="methodology">
      <div className="max-w-[1440px] mx-auto px-6 md:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-2 bg-brand/10 border border-brand/20 rounded-full text-brand font-bold uppercase tracking-widest text-xs mb-4">
              Our Methodology
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-black text-dark leading-tight mb-4">
              Why Choose <span className="text-brand">SK Technologies?</span>
            </h2>
            <p className="text-base md:text-lg text-slate-500 font-medium">
              We bridge the gap between traditional education and industry expectations.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REASONS.map((reason, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="group relative p-6 rounded-2xl bg-white border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-12px_rgba(87,0,105,0.15)] hover:-translate-y-2 transition-all duration-300"
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-[#f8f9fa] border border-gray-100 flex items-center justify-center text-brand mb-4 group-hover:bg-brand group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-sm group-hover:shadow-brand/30">
                  {reason.icon}
                </div>
                <h3 className="text-xl font-bold text-dark mb-3 group-hover:text-brand transition-colors">
                  {reason.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  {reason.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
