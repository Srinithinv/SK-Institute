import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Star, Clock, Users, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function CourseDiscovery() {
  const navigate = useNavigate();
  const categories = ["Artificial Intelligence", "Data Science & Analytics", "Machine Learning", "DevOps", "Full Stack Development", "IoT & Embedded Systems"];
  
  const [coursesData, setCoursesData] = useState<Record<string, any[]>>({});
  const [activeCategory, setActiveCategory] = useState<string>("Artificial Intelligence");
  const [activeIndex, setActiveIndex] = useState(0);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // End-to-end implementation: Fetching courses directly from the backend
    fetch(`\${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/content/courses`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          // Group courses by category
          const grouped: Record<string, any[]> = {};
          data.forEach((course: any) => {
            // Provide fallbacks for missing data to match frontend requirements
            const formattedCourse = {
              id: course.id,
              title: course.title,
              image: course.image_url || "/courses/ai-1.jpg",
              duration: course.duration || "20 Hrs",
              enrolled: "2k+",
              price: course.price || "₹2,999",
              rating: "4.8"
            };
            
            if (!grouped[course.category]) {
              grouped[course.category] = [];
            }
            grouped[course.category].push(formattedCourse);
          });
          setCoursesData(grouped);
        }
      })
      .catch(err => console.error('Failed to load courses:', err));
  }, []);

  const displayedCourses = coursesData[activeCategory] || [];

  const scrollCards = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300; 
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
      if (maxScroll <= 0) {
        setActiveIndex(0);
        return;
      }
      const scrollPercentage = scrollLeft / maxScroll;
      
      const numDots = Math.max(5, Math.ceil(displayedCourses.length / 2));
      let newIndex = Math.round(scrollPercentage * (numDots - 1));
      
      if (Number.isNaN(newIndex)) newIndex = 0;
      setActiveIndex(newIndex);
    }
  };

  return (
    <section id="services" className="pt-20 pb-20 bg-white relative font-sans">
      <div className="absolute top-0 left-0 right-0 h-[300px] bg-gradient-to-b from-[#f8f5ff] to-white pointer-events-none z-0"></div>
      
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-8">
        <h2 className="text-[34px] font-bold text-center text-[#1e293b] mb-10 tracking-tight">
          Trending Skills
        </h2>

        {/* Mobile Category Dropdown (Highly User Friendly) */}
        <div className="md:hidden mb-8 w-full">
          <label htmlFor="category-select" className="sr-only">Choose a category</label>
          <div className="relative">
            <select
              id="category-select"
              value={activeCategory}
              onChange={(e) => {
                setActiveCategory(e.target.value);
                setActiveIndex(0);
                if (scrollRef.current) scrollRef.current.scrollLeft = 0;
              }}
              className="appearance-none w-full bg-white border-2 border-[#6d28d9]/20 text-[#1e293b] font-semibold py-3.5 pl-5 pr-10 rounded-xl shadow-sm focus:outline-none focus:border-[#6d28d9] focus:ring-1 focus:ring-[#6d28d9] transition-colors"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#6d28d9]">
              <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Desktop Tab Bar */}
        <div className="hidden md:block mb-10 w-full overflow-hidden rounded-xl border border-slate-100 shadow-sm bg-[#faf8fc]">
          <div className="flex items-center w-full justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setActiveIndex(0);
                  if (scrollRef.current) scrollRef.current.scrollLeft = 0;
                }}
                className={`relative px-8 py-4 whitespace-nowrap text-[15px] transition-colors duration-200 flex-none text-center ${
                  activeCategory === cat 
                    ? 'text-[#1e293b] font-medium' 
                    : 'text-slate-500 font-normal hover:text-slate-700'
                }`}
              >
                {cat}
                {activeCategory === cat && (
                  <div className="absolute bottom-0 left-4 right-4 h-[3px] bg-[#6d28d9] rounded-t-sm" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Carousel */}
        <div className="relative mb-8">
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto scrollbar-hide gap-5 pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <AnimatePresence mode="wait">
              {displayedCourses.map((course) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  key={course.id}
                  onClick={() => navigate('/courses')}
                  className="flex-none w-[280px] md:w-[290px] snap-start bg-white border border-slate-100 rounded-2xl cursor-pointer hover:shadow-lg transition-shadow duration-300 flex flex-col overflow-hidden"
                >
                  <div className="relative h-[160px] w-full p-1 bg-white">
                    <img 
                      src={course.image} 
                      alt={course.title}
                      className="w-full h-full object-cover rounded-t-xl rounded-b-sm"
                    />
                    
                    <div className="absolute bottom-3 left-3 bg-white text-[#1e293b] px-2 py-1 rounded-md flex items-center gap-1 shadow-sm text-[11px] font-medium">
                      <Globe className="w-3 h-3 text-slate-600" />
                      English
                    </div>

                    <div className="absolute bottom-3 right-3 bg-white text-[#1e293b] px-2 py-1 rounded-md flex items-center gap-1 shadow-sm text-[11px] font-medium">
                      {course.rating} <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    </div>
                  </div>

                  <div className="px-5 pt-4 pb-5 flex flex-col flex-grow">
                    <h3 className="font-semibold text-[17px] text-[#1e293b] mb-6 leading-tight line-clamp-2 min-h-[3rem]">
                      {course.title}
                    </h3>
                    
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-3 text-[12px] font-medium text-slate-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#8b5cf6]" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-[#8b5cf6]" />
                          <span>{course.enrolled} Enrolled</span>
                        </div>
                      </div>
                      
                      <div className="font-bold text-[#1e293b] text-base">
                        {course.price}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {displayedCourses.length === 0 && (
              <div className="w-full py-20 text-center text-slate-500 font-medium">
                No courses available for this category yet.
              </div>
            )}
          </div>
        </div>

        {/* Bottom controls */}
        <div className="flex flex-col md:flex-row items-center justify-between relative mt-8 gap-8 pb-4">
          <div className="flex items-center gap-4 mx-auto md:mx-0 md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
            <button 
              onClick={() => scrollCards('left')}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-400 transition-colors shadow-sm focus:outline-none"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-2">
              {Array.from({ length: Math.max(5, Math.ceil(displayedCourses.length / 2)) }).map((_, i) => (
                <div 
                  key={i} 
                  className={`h-[4px] rounded-full transition-all duration-300 ${
                    i === activeIndex 
                      ? "bg-[#1e293b] w-8" 
                      : "bg-slate-200 w-4"
                  }`}
                />
              ))}
            </div>

            <button 
              onClick={() => scrollCards('right')}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-400 transition-colors shadow-sm focus:outline-none"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="w-auto md:ml-auto md:w-auto mx-auto md:mx-0">
            <button 
              onClick={() => navigate('/courses')}
              className="flex items-center justify-center gap-2 px-8 py-3.5 bg-[#10b981] hover:bg-[#059669] text-white font-medium text-[15px] rounded-full shadow-md transition-colors"
            >
              View More <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
