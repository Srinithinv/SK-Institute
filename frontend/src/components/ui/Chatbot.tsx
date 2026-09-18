import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Bot, X, Send, User } from 'lucide-react';
import { COURSES } from '../../data/courses';

const getBotResponse = (input: string, pathname: string) => {
  const lowerInput = input.toLowerCase();
  
  // Specific Course Page Context
  if (pathname.startsWith('/course/')) {
    const courseId = pathname.split('/').pop();
    const course = COURSES.find(c => c.id === courseId);
    
    if (course) {
      if (lowerInput.includes('syllabus') || lowerInput.includes('modules') || lowerInput.includes('topics') || lowerInput.includes('learn')) {
        return `The syllabus for ${course.title} includes: ${course.syllabus.map(s => s.module).join(', ')}. Ask me about any specific module!`;
      }
      if (lowerInput.includes('price') || lowerInput.includes('cost') || lowerInput.includes('fee')) {
        return `The price for ${course.title} is ${course.price}.`;
      }
      if (lowerInput.includes('duration') || lowerInput.includes('time') || lowerInput.includes('long')) {
        return `The ${course.title} course takes ${course.duration} to complete.`;
      }
      if (lowerInput.includes('other') || lowerInput.includes('all courses') || lowerInput.includes('home')) {
        return `I am currently assisting you specifically with the ${course.title} course. Please navigate to the Home page to ask about our other offerings.`;
      }
      if (lowerInput.includes('outcome') || lowerInput.includes('job') || lowerInput.includes('placement')) {
        return course.outcome;
      }
      
      return `I can help you with anything related to the ${course.title} course! Ask me about the syllabus, price, or duration.`;
    }
  }

  // Home Page / General Context
  // First, check if they are asking about a specific course by name
  const matchedCourse = COURSES.find(c => lowerInput.includes(c.title.toLowerCase()) || 
    (lowerInput.includes('full stack') && c.id === 'c1') ||
    (lowerInput.includes('data science') && c.id === 'c2') ||
    (lowerInput.includes('cloud') && c.id === 'c3') ||
    (lowerInput.includes('java') && c.id === 'c4') ||
    (lowerInput.includes('ai') && c.id === 'c5') ||
    (lowerInput.includes('mern') && c.id === 'c6') ||
    (lowerInput.includes('security') && c.id === 'c7') ||
    (lowerInput.includes('python') && c.id === 'c8')
  );

  if (matchedCourse) {
    if (lowerInput.includes('price') || lowerInput.includes('cost')) {
       return `${matchedCourse.title} costs ${matchedCourse.price}. Please visit its course page for full details.`;
    }
    return `${matchedCourse.title}: ${matchedCourse.shortDescription} It takes ${matchedCourse.duration} to complete and costs ${matchedCourse.price}. Click on the course card on this page to view the full syllabus!`;
  }

  if (lowerInput.includes('price') || lowerInput.includes('cost') || lowerInput.includes('fee')) {
    return "Our course prices range from ₹34,999 to ₹59,999. Visit a specific course page for exact pricing!";
  }
  if (lowerInput.includes('placement') || lowerInput.includes('job') || lowerInput.includes('career') || lowerInput.includes('guarantee')) {
    return "We offer 100% placement assistance and career counseling for all our students! We have dedicated modules for interview prep.";
  }
  if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
    return "Hello! I am your animated assistant. I can answer general questions about the institute here, or specific questions when you visit a course page. How can I help you today?";
  }
  
  // Only fall back to this generic list if they didn't mention a specific course name
  if (lowerInput.includes('course') || lowerInput.includes('offerings') || lowerInput.includes('learn') || lowerInput.includes('what do you teach')) {
    return `We offer ${COURSES.length} comprehensive courses including ${COURSES.slice(0,3).map(c => c.title).join(', ')} and more! Head to a specific course page to ask detailed questions about it.`;
  }

  return "I'm a simulated AI assistant! I can tell you about our courses, prices, and placements. Could you try rephrasing your question?";
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user'|'bot', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const location = useLocation();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Context-aware greeting when route changes
  useEffect(() => {
    if (location.pathname.startsWith('/course/')) {
      const courseId = location.pathname.split('/').pop();
      const course = COURSES.find(c => c.id === courseId);
      if (course) {
        setMessages([
          { role: 'bot', text: `Welcome to the ${course.title} page! I'm here to answer any specific questions you have about this course.` }
        ]);
      }
    } else {
      setMessages([
        { role: 'bot', text: 'Hello! I can answer general questions about the institute and our courses here. How can I help?' }
      ]);
    }
  }, [location.pathname]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);
    
    setTimeout(() => {
      const botReply = getBotResponse(userMsg, location.pathname);
      setMessages(prev => [...prev, { role: 'bot', text: botReply }]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-[90] w-16 h-16 rounded-full bg-brand text-white shadow-[0_0_20px_rgba(87,0,105,0.4)] flex items-center justify-center border-2 border-white/20 transition-opacity duration-300 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <Bot className="w-8 h-8" />
        </motion.div>
        
        {/* Pulsing rings */}
        <div className="absolute inset-0 rounded-full bg-brand animate-ping opacity-20" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9, transition: { duration: 0.2 } }}
            className="fixed bottom-6 right-6 z-[95] w-[350px] sm:w-[400px] h-[500px] max-h-[80vh] bg-white rounded-3xl shadow-[0_10px_40px_rgba(87,0,105,0.2)] border border-gray-100 flex flex-col overflow-hidden"
          >
            {/* Chat Header */}
            <div className="bg-brand p-4 text-white flex items-center justify-between relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:250%_250%] animate-[shimmer_3s_linear_infinite]" />
              
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                  <motion.div
                    animate={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
                  >
                    <Bot className="w-6 h-6 text-white" />
                  </motion.div>
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-tight">Institute AI</h3>
                  <p className="text-xs text-white/80 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> Online
                  </p>
                </div>
              </div>

              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors relative z-10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto custom-scrollbar bg-gray-50 flex flex-col gap-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 ${msg.role === 'user' ? 'bg-gray-200 text-gray-600' : 'bg-brand/10 text-brand'}`}>
                    {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`p-3 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-brand text-white rounded-tr-sm' 
                      : 'bg-white border border-gray-100 shadow-sm text-gray-700 rounded-tl-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-2 max-w-[85%]">
                  <div className="w-8 h-8 rounded-full bg-brand/10 text-brand flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="p-4 rounded-2xl rounded-tl-sm bg-white border border-gray-100 shadow-sm flex items-center gap-1">
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1.5 h-1.5 bg-brand rounded-full" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-brand/70 rounded-full" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-brand/40 rounded-full" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2.5 text-sm outline-none focus:border-brand/50 focus:ring-2 focus:ring-brand/20 transition-all"
              />
              <button 
                type="submit"
                disabled={!input.trim()}
                className="w-10 h-10 rounded-full bg-brand text-white flex items-center justify-center shrink-0 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#430052] transition-colors"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
