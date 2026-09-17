import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Full Stack Developer @ TechCorp",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    content: "The practical approach to learning here completely changed my career trajectory. Within 6 months, I went from struggling with basic JavaScript to architecting full-stack applications."
  },
  {
    id: 2,
    name: "David Chen",
    role: "Data Scientist @ InnovateAI",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    content: "The mentors don't just teach; they guide you through real-world problems. The machine learning track was intense but exactly what I needed to land my dream job."
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Cloud Engineer @ StartupX",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
    content: "I had zero cloud experience before joining. The hands-on AWS labs and deployment projects gave me the confidence to handle production environments."
  }
];

export function Testimonials() {
  return (
    <section className="pt-16 pb-8 md:pt-24 md:pb-12 bg-white relative overflow-hidden" id="testimonials">
      
      {/* Background styling */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-brand/5 to-transparent pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-black text-dark leading-tight mb-4">
              Don't just take <span className="text-brand italic">Our Word</span> for it
            </h2>
            <p className="text-lg md:text-xl text-secondary-text max-w-2xl mx-auto">
              Hear from our alumni who have successfully transitioned into high-impact tech roles across the globe.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.15, duration: 0.6, type: "spring" }}
              className="bg-white border border-border/50 rounded-[2rem] p-8 md:p-10 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_-15px_rgba(87,0,105,0.1)] transition-shadow duration-500 relative group"
            >
              <Quote className="absolute top-8 right-8 w-12 h-12 text-brand/10 group-hover:text-brand/20 transition-colors" />
              
              <div className="flex gap-1 mb-6 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>

              <p className="text-lg text-secondary-text font-medium leading-relaxed mb-8 relative z-10">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-4 mt-auto">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-brand/20"
                />
                <div>
                  <h4 className="font-bold text-dark">{testimonial.name}</h4>
                  <p className="text-sm text-brand font-medium">{testimonial.role}</p>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
