import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { COURSES } from '../data/courses';
import { 
  Clock, 
  BookOpen, 
  Award, 
  ChevronDown, 
  CheckCircle2,
  Star,
  Users,
  Video,
  PlayCircle,
  Download,
  Share2,
  X,
  Target
} from 'lucide-react';

export function CourseDetailsPage() {
  const { id } = useParams();
  const location = useLocation();
  const course = COURSES.find(c => c.id === id);
  const [activeSyllabus, setActiveSyllabus] = useState<number | null>(0); // First one open by default like Edureka
  const [activeTab, setActiveTab] = useState('overview');
  const [isRequirementsOpen, setIsRequirementsOpen] = useState(false);

  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const scrollToSection = (sectionId: string) => {
    setActiveTab(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      // Offset for sticky header if needed, but smooth scroll is usually fine
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleShare = async () => {
    if (!course) return;
    try {
      if (navigator.share) {
        await navigator.share({
          title: course.title,
          text: `Check out this course: ${course.title} at Institute!`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Course link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        scrollToSection(id);
      }, 500); // slight delay to allow rendering
    }
  }, [location.hash]);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Course not found</h2>
          <Link to="/" className="text-brand hover:underline font-medium">Return to Home</Link>
        </div>
      </div>
    );
  }

  const toggleSyllabus = (index: number) => {
    setActiveSyllabus(activeSyllabus === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
      {/* Hero Section (Clean Minimal Style) */}
      <section className="bg-brand pt-24 pb-16 text-white relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center text-sm font-medium text-gray-300">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2 text-gray-500">›</span>
            <span className="hover:text-white transition-colors cursor-pointer">{course.category}</span>
            <span className="mx-2 text-gray-500">›</span>
            <span className="text-white truncate">{course.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                {course.title} Certification Training
              </h1>
              <p className="text-lg text-gray-200 mb-8 max-w-3xl leading-relaxed">
                {course.shortDescription}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-sm font-medium">
                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full">
                  <Star className="w-4 h-4 text-white fill-white" />
                  <span>4.8 (10,543 Ratings)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-5 h-5 text-white/80" />
                  <span>25,000+ Learners</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <PlayCircle className="w-5 h-5 text-white/80" />
                  <span>Live Instructor-Led</span>
                </div>
              </div>
            </motion.div>
            
            {/* Empty column for spacing on desktop, as the sticky card goes here later */}
            <div className="hidden lg:block"></div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          
          {/* Main Content Area (Left side) */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Sticky Sub-navigation */}
            <div className="bg-white border border-gray-200 sticky top-32 z-40 shadow-sm hidden md:block rounded-md mb-8">
              <ul className="flex items-center space-x-8 px-6 text-sm font-semibold text-gray-600">
                <li 
                  onClick={() => scrollToSection('overview')}
                  className={`py-4 border-b-2 cursor-pointer transition-colors ${activeTab === 'overview' ? 'border-brand text-brand' : 'border-transparent hover:text-brand'}`}
                >
                  Overview
                </li>
                <li 
                  onClick={() => scrollToSection('curriculum')}
                  className={`py-4 border-b-2 cursor-pointer transition-colors ${activeTab === 'curriculum' ? 'border-brand text-brand' : 'border-transparent hover:text-brand'}`}
                >
                  Curriculum
                </li>
                <li 
                  onClick={() => scrollToSection('reviews')}
                  className={`py-4 border-b-2 cursor-pointer transition-colors ${activeTab === 'reviews' ? 'border-brand text-brand' : 'border-transparent hover:text-brand'}`}
                >
                  Reviews
                </li>
                <li 
                  onClick={() => scrollToSection('certificate')}
                  className={`py-4 border-b-2 cursor-pointer transition-colors ${activeTab === 'certificate' ? 'border-brand text-brand' : 'border-transparent hover:text-brand'}`}
                >
                  Certificate
                </li>
              </ul>
            </div>
            
            {/* Overview Section */}
            <motion.section 
              id="overview" 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-white p-8 rounded-lg shadow-sm border border-gray-200"
            >
              <h2 className="text-2xl font-bold text-brand mb-4">About this Course</h2>
              <p className="text-gray-600 leading-relaxed text-base">
                {course.fullDetails}
              </p>
              
              <div className="mt-8">
                <h3 className="text-xl font-bold text-brand mb-4">What you will learn</h3>
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                >
                   <motion.div variants={itemVariants} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{course.outcome}</span>
                   </motion.div>
                   <motion.div variants={itemVariants} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">Industry-recognized certification</span>
                   </motion.div>
                   <motion.div variants={itemVariants} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">Lifetime access to LMS</span>
                   </motion.div>
                   <motion.div variants={itemVariants} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">Real-world industry projects</span>
                   </motion.div>
                </motion.div>
              </div>
            </motion.section>

            {/* Curriculum Section (Edureka Accordion) */}
            <motion.section 
              id="curriculum" 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="pt-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-brand">Course Curriculum</h2>
                <a 
                  href="/Syllabus.pdf" 
                  download="Course_Syllabus.pdf"
                  className="text-brand font-semibold text-sm flex items-center gap-1 hover:underline"
                >
                  <Download className="w-4 h-4" /> Download Syllabus
                </a>
              </div>
              
              <motion.div 
                className="bg-white rounded-lg shadow-sm border border-gray-200 divide-y divide-gray-200"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
              >
                {course.syllabus.map((item, index) => (
                  <motion.div 
                    key={index} 
                    className="overflow-hidden"
                    variants={itemVariants}
                  >
                    <button
                      onClick={() => toggleSyllabus(index)}
                      className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors focus:outline-none"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-brand/10 text-brand flex items-center justify-center shrink-0 font-bold text-sm">
                          {index + 1}
                        </div>
                        <h3 className="font-bold text-gray-900 text-left">{item.module}</h3>
                      </div>
                      <ChevronDown 
                        className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                          activeSyllabus === index ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>
                    
                    <AnimatePresence>
                      {activeSyllabus === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-4 pt-2 ml-12">
                            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Topics Covered</h4>
                            <ul className="space-y-3">
                              {item.topics.map((topic, i) => (
                                <li key={i} className="flex items-start gap-3 text-gray-600 text-sm">
                                  <Video className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                                  <span>{topic}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>

            {/* Certificate Section */}
            <motion.section 
              id="certificate" 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="pt-8 mb-16"
            >
              <h2 className="text-2xl font-bold text-brand mb-6">Certification</h2>
              <div className="bg-gradient-to-r from-brand/5 to-white border border-gray-200 rounded-xl p-8 flex flex-col md:flex-row gap-8 items-center">
                <div className="w-full md:w-1/3 shrink-0 relative">
                  <div className="absolute inset-0 bg-brand/20 blur-xl rounded-full transform -translate-y-4"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1523289333742-be1143f6b766?auto=format&fit=crop&w=400&q=80" 
                    alt="Certificate" 
                    className="w-full rounded-lg shadow-md relative z-10 border-4 border-white"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-white p-2 rounded-full shadow-lg z-20">
                    <Award className="w-8 h-8 text-brand" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-dark mb-3">Earn Your Industry-Recognized Certificate</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Upon successful completion of the {course.title} course and all associated projects, you will receive a verifiable certificate of achievement. 
                    Share your verified certificate on LinkedIn, include it in your resume, and showcase it to potential employers to stand out in the competitive job market.
                  </p>
                  <motion.button 
                    onClick={() => setIsRequirementsOpen(true)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-2.5 border-2 border-brand text-brand font-bold rounded hover:bg-brand hover:text-white transition-colors"
                  >
                    View Requirements
                  </motion.button>
                </div>
              </div>
            </motion.section>
          </div>

          {/* Right Column (Sticky Pricing Card) - Premium Redesign */}
          <div className="lg:col-span-1 lg:-mt-48">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="sticky top-32 bg-white rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,71,179,0.15)] border border-brand/10 overflow-hidden z-40 flex flex-col"
            >
              
              {/* Card Header / Image */}
              <div className="relative h-56 bg-gray-100 hidden lg:block group overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform cursor-pointer">
                    <PlayCircle className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8 bg-gradient-to-b from-white to-gray-50/50 flex-1">
                <div className="flex items-center gap-2 mb-2">
                   <span className="px-3 py-1 bg-red-500/10 text-red-600 text-[10px] uppercase font-bold rounded-full border border-red-500/20">Special Offer</span>
                   <span className="text-[10px] uppercase font-bold text-brand bg-brand/10 px-3 py-1 rounded-full border border-brand/20">20% OFF</span>
                </div>
                <div className="mb-6">
                  <span className="text-gray-400 text-sm font-medium line-through mr-2">
                     ₹ {(parseInt(course.price.replace(/\D/g,'')) * 1.2).toLocaleString('en-IN')}
                  </span>
                  <div className="text-4xl font-black text-dark mt-1 tracking-tight">
                    {course.price}
                  </div>
                </div>

                <motion.a 
                  href="https://wa.me/1234567890" 
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full relative overflow-hidden group flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-brand text-white font-bold text-lg transition-all shadow-[0_8px_20px_rgba(0,71,179,0.3)] hover:shadow-[0_12px_25px_rgba(0,71,179,0.4)] hover:-translate-y-0.5 mb-4 border border-brand/50"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                  <span>Enroll Now</span>
                </motion.a>
                
                <button 
                  onClick={handleShare}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border-2 border-gray-100 text-gray-700 font-bold hover:border-brand/30 hover:bg-brand/5 hover:text-brand transition-all"
                >
                  <Share2 className="w-4 h-4" /> Share Course
                </button>

                <hr className="my-6 border-gray-100" />

                <h4 className="font-bold text-dark mb-4 text-xs uppercase tracking-wider">This course includes:</h4>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-sm font-medium text-gray-700">
                    <div className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4 text-brand" />
                    </div>
                    <span>{course.duration} of live classes</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm font-medium text-gray-700">
                    <div className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center shrink-0">
                      <BookOpen className="w-4 h-4 text-brand" />
                    </div>
                    <span>Real-life industry projects</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm font-medium text-gray-700">
                    <div className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center shrink-0">
                      <Award className="w-4 h-4 text-brand" />
                    </div>
                    <span>Industry-Recognized Certification</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
      
      {/* Requirements Modal */}
      <AnimatePresence>
        {isRequirementsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsRequirementsOpen(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50/50">
                <h3 className="text-xl font-bold text-dark flex items-center gap-2">
                  <Target className="w-5 h-5 text-brand" />
                  Certificate Requirements
                </h3>
                <button 
                  onClick={() => setIsRequirementsOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 md:p-8">
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-brand/10 text-brand flex items-center justify-center shrink-0 font-bold mt-0.5">1</div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">85% Minimum Attendance</h4>
                      <p className="text-gray-600 text-sm">You must attend at least 85% of all live interactive sessions. Recordings are available, but live participation is required to meet this criterion.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-brand/10 text-brand flex items-center justify-center shrink-0 font-bold mt-0.5">2</div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Complete All Assignments</h4>
                      <p className="text-gray-600 text-sm">Submit all module-end assignments within the given deadlines. Assignments are graded and require a minimum passing score of 70%.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-brand/10 text-brand flex items-center justify-center shrink-0 font-bold mt-0.5">3</div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Capstone Project Submission</h4>
                      <p className="text-gray-600 text-sm">Successfully build and deploy the final capstone project. This project will be evaluated by industry experts and must meet professional standards.</p>
                    </div>
                  </li>
                </ul>
                
                <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                  <button 
                    onClick={() => setIsRequirementsOpen(false)}
                    className="px-6 py-2.5 bg-brand text-white font-bold rounded-lg hover:bg-brand/90 transition-colors"
                  >
                    Got it, thanks!
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
