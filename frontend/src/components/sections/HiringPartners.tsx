import { motion } from 'framer-motion';

const PARTNERS = [
  { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
  { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
  { name: "Stripe", logo: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" },
  { name: "Zoho", logo: "/zoho-logo.svg" },
  { name: "TCS", logo: "/tcs-logo.svg" },
];

const SCROLL_ITEMS = [...PARTNERS, ...PARTNERS, ...PARTNERS];

export function HiringPartners() {
  return (
    <section className="py-12 md:py-16 relative overflow-hidden bg-slate-50">
      {/* Vibrant Background Blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[150%] bg-brand/20 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[150%] bg-purple-500/20 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-[20%] left-[40%] w-[30%] h-[80%] bg-accent/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 mb-10 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-block px-4 py-1.5 bg-white/50 backdrop-blur-md border border-white/50 rounded-full text-brand font-bold uppercase tracking-widest text-xs mb-3 shadow-sm">
            Top Companies
          </div>
          <h3 className="text-2xl md:text-3xl font-heading font-black text-dark">
            Our Alumni Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-purple-600">Everywhere</span>
          </h3>
        </motion.div>
      </div>
      
      {/* Gradient Masks for smooth fade at edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-slate-50 to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-slate-50 to-transparent z-20 pointer-events-none" />

      <div className="w-full flex relative z-10">
        <motion.div
          animate={{ x: ["0%", "-33.33%"] }}
          transition={{
            repeat: Infinity,
            duration: 35,
            ease: "linear",
          }}
          className="flex whitespace-nowrap items-center gap-6 md:gap-8 w-max px-4"
        >
          {SCROLL_ITEMS.map((partner, idx) => (
            <div 
              key={idx}
              className="group flex items-center justify-center shrink-0 w-[140px] md:w-[180px] h-[80px] bg-white/40 hover:bg-white/60 backdrop-blur-xl border border-white/60 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300"
            >
              <img 
                src={partner.logo} 
                alt={partner.name} 
                className="max-w-[70%] max-h-[50%] object-contain opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 cursor-pointer drop-shadow-sm"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
