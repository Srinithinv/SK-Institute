import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { COURSES as courses, type Course } from '../../data/courses';
import { ArrowUpRight, X, ChevronLeft, ChevronRight } from 'lucide-react';

const categories = ["All", "DEVELOPMENT", "DATA & AI", "CLOUD & DEVOPS"];

export function CourseDiscovery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedSyllabusCourse, setSelectedSyllabusCourse] = useState<Course | null>(null);
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logic for mobile
  useEffect(() => {
    const interval = setInterval(() => {
      if (window.innerWidth < 768 && scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const filteredCourses = activeCategory === "All"
    ? courses
    : courses.filter(c => c.category === activeCategory);

  return (
    <section id="services" className="pt-4 pb-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-heading font-black tracking-tighter text-dark mb-8"
          >
            Explore <span className="text-brand italic">Programs</span>
          </motion.h2>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider transition-colors ${
                  activeCategory === cat ? 'text-white' : 'text-secondary-text hover:text-dark bg-black/5'
                }`}
              >
                {activeCategory === cat && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-brand rounded-full -z-10"
                    transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
                  />
                )}
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Premium Corporate Grid with Sleek Hover Effects */}
        <div className="relative group/carousel">
          <button 
            onClick={() => scroll('left')} 
            className="md:hidden absolute left-0 top-1/2 -translate-y-1/2 -ml-2 z-30 w-10 h-10 flex items-center justify-center bg-white shadow-lg rounded-full text-brand border border-gray-100 opacity-90"
          >
            <ChevronLeft className="w-6 h-6 -ml-0.5" />
          </button>
          
          <button 
            onClick={() => scroll('right')} 
            className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 -mr-2 z-30 w-10 h-10 flex items-center justify-center bg-white shadow-lg rounded-full text-brand border border-gray-100 opacity-90"
          >
            <ChevronRight className="w-6 h-6 -mr-0.5" />
          </button>

          <div 
            ref={scrollRef}
            className="flex md:grid overflow-x-auto snap-x snap-mandatory md:overflow-x-visible md:snap-none md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pb-4 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
          <AnimatePresence mode='popLayout'>
            {filteredCourses.map((course, idx) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => navigate(`/course/${course.id}`)}
                className="w-[85vw] sm:w-[320px] shrink-0 snap-center md:w-auto md:shrink md:snap-none group flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Top Half: Image with hover zoom */}
                <div className="h-48 overflow-hidden relative w-full">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" 
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                     <span className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded text-[10px] font-bold text-gray-800 uppercase tracking-wider shadow-sm">
                       {course.category}
                     </span>
                  </div>
                </div>
                
                {/* Bottom Half: Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 line-clamp-2 min-h-[3.5rem] group-hover:text-brand transition-colors duration-300">
                    {course.title}
                  </h3>
                  
                  {/* Language Indicator */}
                  <div className="flex items-center text-sm text-gray-500 mb-6 font-medium">
                    <svg className="w-4 h-4 mr-2 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                    <span>Tamil, English & Hindi</span>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="mt-auto grid grid-cols-2 gap-3 relative z-20">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedSyllabusCourse(course);
                      }}
                      className="py-2.5 px-4 text-center rounded-full bg-white border border-gray-200 text-gray-700 font-bold text-sm transition-all duration-300 shadow-[0_0_0_0_rgba(87,0,105,0)] hover:shadow-[0_0_15px_rgba(87,0,105,0.3)] hover:border-brand/50 hover:text-brand"
                    >
                      Syllabus
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/course/${course.id}`);
                      }}
                      className="group relative py-2.5 px-4 text-center rounded-full bg-brand text-white font-bold text-sm overflow-hidden shadow-md hover:shadow-[0_0_20px_rgba(87,0,105,0.4)] transition-all duration-300"
                    >
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out z-0"></span>
                      <span className="relative z-10">Know More</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          </div>
        </div>

        {/* Syllabus Modal */}
        <AnimatePresence>
          {selectedSyllabusCourse && (
            <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 pt-24 sm:pt-28 pb-4 sm:pb-6">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedSyllabusCourse(null)}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              />
              
              {/* Modal Content */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[calc(100vh-7rem)] md:max-h-[calc(100vh-9rem)]"
              >
                {/* Header */}
                <div className="flex items-center justify-between p-5 md:p-6 border-b border-gray-100 bg-white">
                  <div>
                    <span className="text-brand font-bold text-sm tracking-wider uppercase mb-1 block">Course Syllabus</span>
                    <h3 className="text-2xl md:text-2xl font-bold text-gray-900 leading-tight">
                      {selectedSyllabusCourse.title}
                    </h3>
                  </div>
                  <button 
                    onClick={() => setSelectedSyllabusCourse(null)}
                    className="p-2 text-gray-400 hover:text-brand hover:bg-brand/5 rounded-full transition-colors flex-shrink-0 ml-4"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                {/* Body - Scrollable */}
                <div className="p-5 md:p-8 overflow-y-auto flex-1 bg-gray-50/30 relative">
                  <div className="absolute top-0 left-0 w-full h-10 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
                  <div className="relative border-l-2 border-brand/20 ml-4 space-y-10 py-6">
                    {selectedSyllabusCourse.syllabus.map((item, idx) => (
                      <div key={idx} className="relative pl-8 group">
                        {/* Timeline Node */}
                        <div className="absolute w-10 h-10 bg-white border-2 border-brand rounded-full -left-[21px] -top-1 flex items-center justify-center shadow-md group-hover:bg-brand group-hover:scale-110 transition-all duration-300 z-10">
                          <span className="font-bold text-brand group-hover:text-white transition-colors">{idx + 1}</span>
                        </div>
                        
                        {/* Content Card */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] group-hover:border-brand/30 group-hover:shadow-[0_8px_30px_-4px_rgba(0,71,179,0.12)] transition-all duration-300 transform group-hover:-translate-y-1">
                          <h5 className="font-bold text-xl text-gray-900 mb-4 tracking-tight">{item.module}</h5>
                          <div className="h-px w-12 bg-brand/20 mb-4 group-hover:w-full group-hover:bg-brand/10 transition-all duration-500" />
                          <ul className="space-y-3">
                            {item.topics.map((topic, tIndex) => (
                              <li key={tIndex} className="text-gray-600 text-sm flex items-start gap-3">
                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand/50 shrink-0 group-hover:bg-brand transition-colors" />
                                <span className="leading-relaxed font-medium">{topic}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
                </div>

                {/* Footer */}
                <div className="p-5 md:p-6 border-t border-gray-100 bg-white flex flex-col-reverse sm:flex-row items-center justify-end gap-4">
                  <button
                    onClick={() => setSelectedSyllabusCourse(null)}
                    className="w-full sm:w-auto px-8 py-2.5 rounded-full font-bold text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      navigate(`/course/${selectedSyllabusCourse.id}`);
                      setSelectedSyllabusCourse(null);
                    }}
                    className="group relative w-full sm:w-auto px-10 py-2.5 rounded-full font-bold text-white bg-brand overflow-hidden shadow-lg hover:shadow-brand/50 transition-all duration-300"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out z-0"></span>
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Know More <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
