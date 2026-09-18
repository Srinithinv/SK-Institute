import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles } from 'lucide-react';
import { useBooking } from '../../contexts/BookingContext';

export function BookingPopup() {
  const { isBookingOpen, closeBooking, submitBooking } = useBooking();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    course: ''
  });
  const [errors, setErrors] = useState({ email: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let value = e.target.value;
    const name = e.target.name;

    if (name === 'phone') {
      // Auto-format Indian Mobile Number: +91 XXXXX XXXXX
      let cleaned = value.replace(/[^\d+]/g, '');
      
      // If user starts typing without country code, assume +91
      if (cleaned.length > 0 && !cleaned.startsWith('+')) {
        cleaned = '+91' + cleaned;
      }
      
      if (cleaned.startsWith('+91')) {
        const digits = cleaned.slice(3); // Get everything after +91
        if (digits.length > 0) {
          let formatted = '+91 ';
          if (digits.length > 5) {
            formatted += digits.slice(0, 5) + ' ' + digits.slice(5, 10); // Restrict to 10 digits
          } else {
            formatted += digits;
          }
          value = formatted;
        } else {
          value = '+91 ';
        }
      } else {
        // If they type a different country code, just let them type but limit length roughly
        value = cleaned.slice(0, 15);
      }
    }

    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear error when user starts typing
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let hasError = false;
    const newErrors = { email: '', phone: '' };

    // Strict Email Validation (Limits TLD to 2-4 characters to block .commmm)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format (e.g., name@example.com)';
      hasError = true;
    }

    // Strict Indian Mobile Validation (+91 98765 43210)
    // Matches exactly +91 followed by space, 5 digits, space, 5 digits
    const phoneRegex = /^\+91 \d{5} \d{5}$/;
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Invalid Indian mobile (Format: +91 98765 43210)';
      hasError = true;
    }
    
    if (hasError) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    try {
      // Save to Firebase
      await submitBooking({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        course: formData.course
      });

      // Construct WhatsApp message
      const text = `*New Counselling Request*%0A%0A*Name:* ${formData.firstName} ${formData.lastName}%0A*Email:* ${formData.email}%0A*Phone:* ${formData.phone}%0A*Course:* ${formData.course}`;
      
      // Replace this with your actual WhatsApp business number (include country code, no + or spaces)
      const whatsappNumber = "919876543210"; 
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${text}`;
      
      // Open WhatsApp in a new tab
      window.open(whatsappUrl, '_blank');
      
      // Close the popup and reset form
      closeBooking();
      setFormData({ firstName: '', lastName: '', email: '', phone: '', course: '' });
    } catch (error) {
      console.error("Failed to submit booking:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isBookingOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
          
          {/* Backdrop with strong blur for focus */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeBooking}
            className="absolute inset-0 bg-black/40 backdrop-blur-md cursor-pointer"
          />

          {/* Popup Content - Premium 2-Column Layout */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.6, bounce: 0.2 }}
            className="relative w-full max-w-4xl bg-white shadow-2xl rounded-3xl z-10 overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
          >
            {/* Left Side: Visual / Branding */}
            <div className="hidden md:flex flex-col justify-between w-2/5 bg-brand p-8 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center mix-blend-overlay opacity-20" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand/90 to-transparent" />
              
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm mb-6 border border-white/20">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-black font-heading leading-tight mb-4">
                  Fast-Track Your <br /> Tech Career
                </h3>
                <p className="text-white/80 text-sm">
                  Join thousands of successful alumni who have transformed their careers with our expert guidance and placement assistance.
                </p>
              </div>

              <div className="relative z-10 flex items-center gap-3">
                <div className="flex -space-x-2">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64&q=80" className="w-8 h-8 rounded-full border-2 border-brand" alt="Student" />
                  <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&h=64&q=80" className="w-8 h-8 rounded-full border-2 border-brand" alt="Student" />
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=64&h=64&q=80" className="w-8 h-8 rounded-full border-2 border-brand" alt="Student" />
                </div>
                <span className="text-xs font-semibold">Join 10k+ Students</span>
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="w-full md:w-3/5 p-6 sm:p-8 md:p-10 relative overflow-y-auto hide-scrollbar bg-gray-50/50">
              {/* Close Button */}
              <button 
                onClick={closeBooking}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-dark transition-colors focus:outline-none focus:ring-2 focus:ring-brand z-20 shadow-sm"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="mb-6 pr-8">
                <h3 className="text-2xl font-black font-heading text-dark mb-1">Book Free Counselling</h3>
                <p className="text-sm text-secondary-text">Fill out the form below and our career experts will get in touch shortly.</p>
              </div>
              
              <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">First Name</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-dark placeholder:text-gray-400 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all shadow-sm" placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">Last Name</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-dark placeholder:text-gray-400 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all shadow-sm" placeholder="Doe" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className={`w-full bg-white border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-xl px-4 py-2.5 text-sm text-dark placeholder:text-gray-400 focus:outline-none focus:ring-1 transition-all shadow-sm ${errors.email ? 'focus:border-red-500 focus:ring-red-500' : 'focus:border-brand focus:ring-brand'}`} placeholder="john@example.com" />
                    {errors.email && (
                      <p className="text-red-500 text-[10px] font-semibold mt-1 ml-1">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">Phone Number</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required maxLength={15} className={`w-full bg-white border ${errors.phone ? 'border-red-500' : 'border-gray-200'} rounded-xl px-4 py-2.5 text-sm text-dark placeholder:text-gray-400 focus:outline-none focus:ring-1 transition-all shadow-sm ${errors.phone ? 'focus:border-red-500 focus:ring-red-500' : 'focus:border-brand focus:ring-brand'}`} placeholder="+91 98765 43210" />
                    {errors.phone && (
                      <p className="text-red-500 text-[10px] font-semibold mt-1 ml-1">{errors.phone}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">Course of Interest</label>
                  <select name="course" value={formData.course} onChange={handleChange} required className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-dark focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all shadow-sm cursor-pointer appearance-none">
                    <option value="" disabled>Select a course...</option>
                    <option value="Full Stack Development">Full Stack Development</option>
                    <option value="Data Science & AI">Data Science & AI</option>
                    <option value="Cloud Computing">Cloud Computing</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button disabled={isSubmitting} type="submit" className="w-full py-3 bg-brand hover:bg-brand/90 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-[0_8px_20px_rgba(0,71,179,0.25)] hover:shadow-[0_10px_25px_rgba(0,71,179,0.35)] hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed">
                    <span>{isSubmitting ? 'Securing...' : 'Secure My Free Session'}</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-center text-[10px] text-gray-400 mt-3">
                  Your information is 100% secure. We never share your data.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
