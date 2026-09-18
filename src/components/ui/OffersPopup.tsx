import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Gift, Zap, TrendingUp, Award, BookOpen, ArrowRight } from 'lucide-react';
import { useBooking } from '../../contexts/BookingContext';

const OFFERS = [
  {
    id: 1,
    title: "50% Off Full Stack",
    desc: "Complete Web Development Bootcamp. Limited time!",
    badge: "LIMITED TIME",
    icon: <Zap className="w-6 h-6 text-brand" />
  },
  {
    id: 2,
    title: "Early Bird Data Science",
    desc: "Join the next batch & get 30% off your fees.",
    badge: "JUST ADDED",
    icon: <TrendingUp className="w-6 h-6 text-brand" />
  },
  {
    id: 3,
    title: "Free Career Counselling",
    desc: "1-on-1 session with industry experts.",
    badge: "FREE",
    icon: <Sparkles className="w-6 h-6 text-brand" />
  },
  {
    id: 4,
    title: "Buy 1 Get 1 Course",
    desc: "Enroll in any masterclass, get one absolutely free.",
    badge: "POPULAR",
    icon: <Gift className="w-6 h-6 text-brand" />
  },
  {
    id: 5,
    title: "100% Placement Guarantee",
    desc: "Assured interviews with top tech giants.",
    badge: "GUARANTEE",
    icon: <Award className="w-6 h-6 text-brand" />
  },
  {
    id: 6,
    title: "Free Python Crash Course",
    desc: "Master the basics of Python in 48 hours.",
    badge: "NEW",
    icon: <BookOpen className="w-6 h-6 text-brand" />
  }
];

// Global flag to track if the popup has been shown during this browser session/refresh cycle.
// Client-side navigation will keep this true, but a hard refresh will reset it to false.
let hasShownPopup = false;

export function OffersPopup() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(!hasShownPopup);
  const { openBooking } = useBooking();

  useEffect(() => {
    if (!hasShownPopup) {
      hasShownPopup = true;
    }
  }, []);

  // Cycle through offers every 2.5 seconds (only if not hovered)
  useEffect(() => {
    if (isHovered || !isVisible) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % OFFERS.length);
    }, 2500);

    return () => clearInterval(timer);
  }, [isHovered, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center p-4">
      {/* Central Popup Container */}
      <div 
        className="relative pointer-events-auto w-full max-w-lg perspective-[1000px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)", transition: { duration: 0.3 } }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="relative p-1 rounded-[2.5rem] overflow-hidden group shadow-[0_0_60px_rgba(87,0,105,0.4)]"
          >
            {/* High-tech rotating gradient border */}
            <div className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_0_340deg,var(--color-brand)_360deg)] animate-[spin_3s_linear_infinite] opacity-100 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-[-50%] bg-[conic-gradient(from_180deg,transparent_0_340deg,var(--color-brand)_360deg)] animate-[spin_3s_linear_infinite] opacity-100 group-hover:opacity-100 transition-opacity" />

            {/* Inner Content Card */}
            <div className="relative bg-white rounded-[2.4rem] p-8 h-full w-full z-10 flex flex-col justify-between">
              
              {/* Close Button - fully rounded */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsVisible(false);
                }}
                className="absolute top-5 right-5 text-gray-300 hover:text-white hover:bg-brand transition-all duration-300 z-20 bg-gray-50 p-2 rounded-full border border-gray-100 hover:scale-110 hover:shadow-[0_0_15px_rgba(87,0,105,0.5)]"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex flex-col items-center text-center relative z-10">
                {/* Icon Container with glowing pulse */}
                <div className="relative mb-5">
                  <div className="absolute inset-0 bg-brand/20 rounded-full blur-xl animate-pulse" />
                  <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white border-[3px] border-brand shadow-[0_0_20px_rgba(87,0,105,0.2)] relative z-10">
                    {OFFERS[currentIndex].icon}
                  </div>
                </div>
                
                <span className="inline-block px-4 py-1 rounded-full text-[10px] font-black text-white bg-brand mb-4 tracking-[0.2em] shadow-[0_4px_10px_rgba(87,0,105,0.3)]">
                  {OFFERS[currentIndex].badge}
                </span>
                
                <h3 className="text-2xl font-black text-[var(--color-brand)] leading-tight mb-2">
                  {OFFERS[currentIndex].title}
                </h3>
                
                <p className="text-base text-gray-500 max-w-[80%] mx-auto font-medium">
                  {OFFERS[currentIndex].desc}
                </p>
              </div>

              {/* Bottom interaction area */}
              <div className="flex flex-col items-center mt-8 relative z-10">
                <button 
                  onClick={() => {
                    setIsVisible(false);
                    openBooking();
                  }}
                  className="group/btn relative overflow-hidden bg-brand text-white font-bold text-sm px-8 py-3.5 rounded-full hover:scale-105 transition-all duration-300 shadow-[0_10px_20px_rgba(87,0,105,0.3)] flex items-center gap-2"
                >
                  <span className="relative z-10">CLAIM OFFER</span>
                  <ArrowRight className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                  
                  {/* Button high tech sweep animation */}
                  <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite] skew-x-12" />
                </button>
                
                <div className="mt-4 h-1 w-24 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ x: "-100%" }}
                    animate={{ x: isHovered ? "-100%" : "0%" }}
                    transition={{ duration: 2.5, ease: "linear", repeat: Infinity }}
                    className="h-full bg-brand w-full"
                  />
                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
