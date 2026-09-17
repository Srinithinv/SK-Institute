import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useBooking } from '../../contexts/BookingContext';




const NAV_LINKS = [
  { label: 'Courses', href: '/#services' },
  { label: 'Career & Success', href: '/#testimonials' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
];

const OFFERS = [
  "🔥 Special Offer: 50% Off Full Stack Course!",
  "🚀 Early Bird Registration Open for Next Batch!",
  "🎁 Book Free Career Counselling Now!",
  "⚡ Fast Track Your IT Career Today!",
  "💼 100% Placement Assistance Guarantee",
  "🎓 Scholarship Available for Meritorious Students"
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { openBooking } = useBooking();

  // Handle scroll effect for header background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Check immediately on mount (fixes HMR disappearing header)
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 30s linear infinite;
            display: inline-flex;
            white-space: nowrap;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}
      </style>
      <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${isScrolled ? 'shadow-lg' : ''}`}>
        {/* Continuous Offers Marquee */}
        <div className="w-full bg-[#002b6b] border-b border-white/10 overflow-hidden py-2 relative z-[100] cursor-pointer">
          <div className="animate-marquee">
            {OFFERS.map((offer, i) => (
              <span key={i} className="text-white font-medium text-sm mx-8 tracking-wide">
                {offer}
              </span>
            ))}
            {/* Duplicated for seamless loop */}
            {OFFERS.map((offer, i) => (
              <span key={`dup-${i}`} className="text-white font-medium text-sm mx-8 tracking-wide">
                {offer}
              </span>
            ))}
          </div>
        </div>

        <div className={`py-4 transition-colors duration-300 ${isScrolled ? 'bg-white shadow-sm' : 'bg-white/95 backdrop-blur-md'}`}>
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo Placeholder */}
        <Link to="/" className="flex items-center gap-2 group">
          <img src="/logo.png" alt="SK Technologies Logo" className="h-16 w-auto object-contain" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              onClick={(e) => {
                if (window.location.pathname === '/') {
                  const id = link.href.replace('/#', '');
                  const element = document.getElementById(id);
                  if (element) {
                    e.preventDefault();
                    element.scrollIntoView({ behavior: 'smooth' });
                    window.history.pushState(null, '', link.href);
                  }
                }
              }}
              className="text-sm font-medium text-brand/80 hover:text-brand transition-colors drop-shadow-sm"
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => openBooking()}
            className="px-5 py-2.5 rounded-lg bg-brand text-white text-sm font-semibold hover:bg-brand/90 transition-colors focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-white shadow-md"
          >
            Book Free Counselling
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 -mr-2 text-brand hover:text-brand/80 focus-visible:ring-2 focus-visible:ring-brand rounded-md drop-shadow-sm"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-white p-6 flex flex-col md:hidden"
          >
            <div className="flex items-center justify-between mb-12">
              <Link to="/" className="flex items-center gap-2 group" onClick={() => setIsMobileMenuOpen(false)}>
                <img src="/logo.png" alt="SK Technologies Logo" className="h-16 w-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
              </Link>
              <button
                className="p-2 -mr-2 text-secondary-text hover:text-dark focus-visible:ring-2 focus-visible:ring-brand rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex flex-col gap-6 flex-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-2xl font-heading font-bold text-dark hover:text-brand"
                  onClick={(e) => {
                    if (window.location.pathname === '/') {
                      const id = link.href.replace('/#', '');
                      const element = document.getElementById(id);
                      if (element) {
                        e.preventDefault();
                        setIsMobileMenuOpen(false);
                        element.scrollIntoView({ behavior: 'smooth' });
                        window.history.pushState(null, '', link.href);
                        return;
                      }
                    }
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <button
              className="mt-auto px-6 py-4 rounded-xl bg-brand text-white text-lg font-semibold text-center hover:bg-brand/90 transition-colors focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              onClick={() => {
                setIsMobileMenuOpen(false);
                openBooking();
              }}
            >
              Book Free Counselling
            </button>
          </motion.div>
        )}
      </AnimatePresence>
        </div>
      </header>
    </>
  );
}
