import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqData = [
  {
    question: "What is Private Institute and how does it work?",
    answer: "Private Institute is a premier tech education platform. We offer intensive, industry-aligned courses designed to take you from beginner to job-ready professional. You learn through hands-on projects, live mentorship, and an AI-driven curriculum."
  },
  {
    question: "Are there any prerequisites to join the courses?",
    answer: "Most of our foundational courses, like the Full Stack Web Development program, require no prior coding experience. Advanced courses may require basic knowledge of programming concepts."
  },
  {
    question: "Do you offer placement assistance?",
    answer: "Yes! We have a dedicated career services team. We provide resume building, mock interviews, and direct referrals to our network of 500+ hiring partners."
  },
  {
    question: "How long does it take to complete a course?",
    answer: "Our flagship programs typically take 3 to 6 months to complete, depending on whether you choose the part-time or full-time track."
  },
  {
    question: "Is the curriculum updated regularly?",
    answer: "Absolutely. We update our curriculum every quarter to ensure you are learning the latest technologies and frameworks used in the industry right now."
  },
  {
    question: "Can I get a refund if I'm not satisfied?",
    answer: "Yes, we offer a 14-day money-back guarantee. If you realize the program isn't a good fit within the first two weeks, you can get a full refund."
  },
  {
    question: "Are the classes live or pre-recorded?",
    answer: "We use a hybrid model. Core concepts are taught via high-quality pre-recorded videos so you can learn at your own pace, paired with weekly live Q&A and mentorship sessions."
  },
  {
    question: "What kind of projects will I build?",
    answer: "You will build real-world, production-ready applications. For example, e-commerce platforms, social media dashboards, and AI-integrated web apps that you can showcase in your portfolio."
  },
  {
    question: "Is there 1-on-1 mentorship available?",
    answer: "Yes, every student is assigned a dedicated industry mentor who provides weekly 1-on-1 guidance, code reviews, and career advice."
  },
  {
    question: "Do I get a certificate upon completion?",
    answer: "Yes, you will receive a verified, industry-recognized certificate that you can add to your LinkedIn profile and resume."
  },
  {
    question: "What is the average salary hike after completing a course?",
    answer: "Historically, our graduates see an average salary hike of 120% to 150%, with many landing jobs at top-tier tech companies and innovative startups."
  },
  {
    question: "Can I switch courses after enrolling?",
    answer: "Yes, you can request a course transfer within the first 7 days of enrollment, subject to seat availability in the target cohort."
  },
  {
    question: "Are there any scholarships available?",
    answer: "Yes, we conduct scholarship tests periodically. Meritorious students can receive up to 50% off on tuition fees."
  },
  {
    question: "How does the AI AI Chatbot help me?",
    answer: "Our proprietary AI chatbot acts as your 24/7 teaching assistant. It can debug your code, explain complex concepts, and guide you through assignments when mentors are offline."
  },
  {
    question: "What happens if I miss a live session?",
    answer: "All live sessions are recorded and uploaded to your student dashboard within 24 hours, so you can catch up anytime."
  },
  {
    question: "Do you teach data structures and algorithms?",
    answer: "Yes, Data Structures and Algorithms (DSA) are a core component of our curriculum, specifically tailored to help you crack technical interviews."
  },
  {
    question: "Is there a community I can join?",
    answer: "Yes, upon enrolling, you get exclusive access to our Discord community where you can network with peers, alumni, and industry experts."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  
  const questionsPerPage = 4;
  const totalPages = Math.ceil(faqData.length / questionsPerPage);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
    setOpenIndex(null); // Close any open FAQ when switching pages
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    setOpenIndex(null); // Close any open FAQ when switching pages
  };

  const currentQuestions = faqData.slice(
    currentPage * questionsPerPage,
    (currentPage + 1) * questionsPerPage
  );

  return (
    <section className="pt-4 pb-10 md:pt-6 md:pb-12 bg-white text-dark">
      <div className="max-w-[1000px] mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-1.5 bg-brand/10 border border-brand/20 rounded-full text-brand font-bold uppercase tracking-wider text-xs mb-4 md:mb-6">
              Common Questions
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-black mb-4 md:mb-6 text-dark">
              Frequently Asked Questions
            </h2>
            <p className="text-base md:text-lg text-secondary-text max-w-2xl mx-auto">
              Everything you need to know about Private Institute's curriculum, mentorship, placements, and how we help you launch your tech career.
            </p>
          </motion.div>
        </div>

        {/* FAQ List */}
        <div className="space-y-4 mb-8 min-h-[290px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {currentQuestions.map((faq, index) => {
                const globalIndex = currentPage * questionsPerPage + index;
                return (
                  <div
                    key={globalIndex}
                    className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
                  >
                    <button
                      onClick={() => toggleFaq(globalIndex)}
                      className="w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none"
                    >
                      <span className="font-bold text-base md:text-lg text-dark pr-8">{faq.question}</span>
                      <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                        {openIndex === globalIndex ? (
                          <Minus className="w-5 h-5 text-brand" />
                        ) : (
                          <Plus className="w-5 h-5 text-brand" />
                        )}
                      </span>
                    </button>
                    
                    <AnimatePresence>
                      {openIndex === globalIndex && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <div className="px-5 md:px-6 pb-6 pt-0 text-secondary-text text-sm md:text-base leading-relaxed">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <button
            onClick={prevPage}
            className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-dark hover:text-brand hover:border-brand hover:bg-brand/5 transition-all focus:outline-none focus:ring-2 focus:ring-brand/50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            aria-label="Previous FAQs"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          
          <div className="text-sm font-semibold text-secondary-text">
            Page <span className="text-brand">{currentPage + 1}</span> of {totalPages}
          </div>

          <button
            onClick={nextPage}
            className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-dark hover:text-brand hover:border-brand hover:bg-brand/5 transition-all focus:outline-none focus:ring-2 focus:ring-brand/50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            aria-label="Next FAQs"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>

      </div>
    </section>
  );
}
