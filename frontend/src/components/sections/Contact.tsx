import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send } from 'lucide-react';

export function Contact() {
  return (
    <section className="py-12 bg-white text-dark relative overflow-hidden" id="contact">
      
      {/* Background styling */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-brand/5 blur-[80px] rounded-full pointer-events-none" />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10 text-left">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
        >
          {/* Left Column: Info & Cards */}
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-black text-dark leading-tight mb-3">
              Let's start your <br />
              <span className="text-brand">Journey</span>
            </h2>
            <p className="text-sm md:text-base text-secondary-text mb-6">
              Have questions about our programs, batches, or placement assistance? We are here to help you take the next step.
            </p>

            <div className="flex flex-col gap-4">
              <div className="group flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,71,179,0.12)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="w-12 h-12 rounded-full bg-brand/5 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-brand/10 transition-all duration-300 relative z-10 border border-brand/10">
                  <MapPin className="w-5 h-5 text-brand" />
                </div>
                <div className="relative z-10">
                  <h4 className="text-base font-bold text-dark mb-0.5 group-hover:text-brand transition-colors duration-300">Campus Location</h4>
                  <p className="text-xs text-secondary-text leading-tight">123 Innovation Drive, Tech Park<br />Silicon Valley, CA 94043</p>
                </div>
              </div>
              
              <div className="group flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,71,179,0.12)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="w-12 h-12 rounded-full bg-brand/5 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-brand/10 transition-all duration-300 relative z-10 border border-brand/10">
                  <Phone className="w-5 h-5 text-brand" />
                </div>
                <div className="relative z-10">
                  <h4 className="text-base font-bold text-dark mb-0.5 group-hover:text-brand transition-colors duration-300">Phone</h4>
                  <p className="text-xs text-secondary-text leading-tight">+1 (555) 123-4567<br />+1 (555) 987-6543</p>
                </div>
              </div>
              
              <div className="group flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,71,179,0.12)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="w-12 h-12 rounded-full bg-brand/5 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-brand/10 transition-all duration-300 relative z-10 border border-brand/10">
                  <Mail className="w-5 h-5 text-brand" />
                </div>
                <div className="relative z-10">
                  <h4 className="text-base font-bold text-dark mb-0.5 group-hover:text-brand transition-colors duration-300">Email</h4>
                  <p className="text-xs text-secondary-text leading-tight">admissions@institute.edu</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Location Map */}
          <div className="w-full h-[300px] lg:h-[380px] rounded-2xl overflow-hidden shadow-lg border border-gray-100 relative group">
            {/* Real Google Map Embed */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.63929062107!2d-122.08624618469247!3d37.4219998798252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fba02425def45%3A0x8a5019d57c0ee280!2sGoogleplex!5e0!3m2!1sen!2sus!4v1628120000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Campus Location Map"
              className="absolute inset-0 grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
            ></iframe>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
