import { motion } from 'framer-motion';
import { Calendar, Users, ArrowRight } from 'lucide-react';

const BATCHES = [
  {
    date: "October 15, 2026",
    title: "Full Stack Web Development",
    seats: "5 Seats Left",
    status: "Filling Fast"
  },
  {
    date: "November 01, 2026",
    title: "Data Science & AI",
    seats: "12 Seats Left",
    status: "Open"
  },
  {
    date: "December 10, 2026",
    title: "Cloud & DevOps",
    seats: "20 Seats Left",
    status: "Upcoming"
  }
];

export function UpcomingBatches() {
  return (
    <section className="py-12 md:py-16 bg-white relative overflow-hidden" id="batches">
      <div className="max-w-[1000px] mx-auto px-4 md:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-2 bg-brand/10 border border-brand/20 rounded-full text-brand font-bold uppercase tracking-widest text-xs mb-4">
              Admissions Open
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-black text-dark leading-tight mb-4">
              Upcoming <span className="text-brand">Batches</span>
            </h2>
            <p className="text-base md:text-lg text-slate-500 font-medium">
              Secure your spot in our upcoming cohorts. Classes fill up extremely fast.
            </p>
          </motion.div>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand/0 via-brand/20 to-brand/0 transform md:-translate-x-1/2" />

          <div className="space-y-8">
            {BATCHES.map((batch, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`flex flex-col md:flex-row gap-8 items-start md:items-center relative ${
                  idx % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-white border-4 border-brand transform -translate-x-[7px] md:-translate-x-1/2 mt-6 md:mt-0 shadow-[0_0_15px_rgba(87,0,105,0.3)] z-10" />

                {/* Content Card */}
                <div className={`w-full md:w-1/2 pl-12 md:pl-0 pr-4 md:pr-0 ${idx % 2 === 0 ? 'md:pr-12 text-left md:text-right' : 'md:pl-12 text-left'}`}>
                  <div className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-12px_rgba(87,0,105,0.15)] hover:-translate-y-2 transition-all duration-300 relative overflow-hidden cursor-pointer">
                    
                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative z-10">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4 ${
                        batch.status === 'Filling Fast' ? 'bg-orange-100 text-orange-600' :
                        batch.status === 'Open' ? 'bg-green-100 text-green-600' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                        {batch.status}
                      </div>
                      
                      <h3 className="text-xl font-bold text-dark mb-4 group-hover:text-brand transition-colors">
                        {batch.title}
                      </h3>
                      
                      <div className={`flex flex-col gap-2 text-slate-500 text-sm font-medium ${idx % 2 === 0 ? 'md:items-end' : 'md:items-start'}`}>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-brand" />
                          <span>{batch.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-brand" />
                          <span>{batch.seats}</span>
                        </div>
                      </div>

                      <button className="mt-6 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gray-50 text-brand text-sm font-bold hover:bg-brand hover:text-white transition-all duration-300 group/btn border border-gray-100">
                        Apply Now
                        <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
