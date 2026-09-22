import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  // Explosive text animation variants
  const letterContainer: any = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.2 }
    }
  };

  const letterAnim: any = {
    hidden: { opacity: 0, y: 100, rotate: -20, scale: 0.5 },
    show: { 
      opacity: 1, 
      y: 0, 
      rotate: 0, 
      scale: 1,
      transition: { type: "spring", damping: 12, stiffness: 200 }
    }
  };

  // Floating photographic tech images merged into background
  const techImages = [
    { src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&h=200&fit=crop', top: '15%', left: '10%', delay: 0, duration: 6, size: 'w-24 h-24' },
    { src: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=200&h=200&fit=crop', top: '25%', right: '12%', delay: 1, duration: 8, size: 'w-20 h-20' },
    { src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=200&h=200&fit=crop', bottom: '25%', left: '15%', delay: 2, duration: 7, size: 'w-28 h-28' },
    { src: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=200&h=200&fit=crop', bottom: '15%', right: '25%', delay: 0.8, duration: 8.5, size: 'w-24 h-24' },
  ];


  return (
    <section 
      className="relative pt-32 pb-16 bg-white flex flex-col justify-center items-center overflow-hidden min-h-[90vh]"
    >
      
      {/* Animated Video Background & Floating Logos */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-dark">
         <div className="absolute inset-[-10%] w-[120%] h-[120%]">
           <video 
             autoPlay 
             loop 
             muted 
             playsInline 
             className="w-full h-full object-cover opacity-60"
           >
             <source src="/hero-bg.mp4" type="video/mp4" />
           </video>
         </div>
         
         {/* Floating glowing orbs for extra animation (Optimized: using radial gradients instead of heavy blur filters) */}
         <motion.div 
           className="absolute top-[10%] left-[15%] w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(87,0,105,0.4)_0%,transparent_70%)]"
           animate={{
             x: [0, 100, -50, 0],
             y: [0, -100, 50, 0],
             scale: [1, 1.5, 0.8, 1]
           }}
           transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
         />
         <motion.div 
           className="absolute bottom-[10%] right-[15%] w-[30rem] h-[30rem] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.3)_0%,transparent_70%)]"
           animate={{
             x: [0, -100, 50, 0],
             y: [0, 100, -50, 0],
             scale: [1, 1.2, 0.9, 1]
           }}
           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
         />

         {/* Floating Tech Images Blended into BG */}
         {techImages.map((img, index) => (
           <motion.div
             key={index}
             className={`absolute ${img.size} z-0 opacity-25`}
             style={{ 
               top: img.top, 
               left: img.left, 
               right: img.right, 
               bottom: img.bottom 
             }}
             animate={{
               y: [0, -40, 0],
               rotate: [0, 8, -5, 0],
               scale: [1, 1.05, 1],
             }}
             transition={{
               duration: img.duration,
               repeat: Infinity,
               ease: "easeInOut",
               delay: img.delay
             }}
           >
             <img
               src={img.src}
               alt="tech floating graphic"
               className="w-full h-full object-cover rounded-3xl"
             />
           </motion.div>
         ))}


         {/* Bright vibrant overlay instead of white smoky effect */}
         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand/40 to-brand" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 w-full flex flex-col items-center text-center mt-12">
        
        {/* Explosive Headline */}
        <motion.div
          variants={letterContainer}
          initial="hidden"
          animate="show"
          className="mb-8"
        >
           <h1 className="text-4xl md:text-6xl lg:text-[76px] font-heading font-black text-white leading-[1] tracking-tighter flex flex-wrap justify-center gap-x-3 drop-shadow-2xl">
              {['MASTER', 'THE', 'DIGITAL'].map((word, i) => (
                <div key={i} className="flex">
                  {word.split('').map((char, j) => (
                    <motion.span key={j} variants={letterAnim} className="inline-block">
                      {char}
                    </motion.span>
                  ))}
                </div>
              ))}
              <div className="flex w-full justify-center mt-3">
                 {['FUTURE'].map((word, i) => (
                  <div key={i} className="flex text-pink-300">
                    {word.split('').map((char, j) => (
                      <motion.span key={j} variants={letterAnim} className="inline-block">
                        {char}
                      </motion.span>
                    ))}
                  </div>
                ))}
              </div>
           </h1>
        </motion.div>

        {/* Supporting Text */}
        <motion.p
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1, ease: "easeOut" }}
          className="text-lg md:text-xl text-blue-100 mb-12 max-w-2xl leading-relaxed font-medium drop-shadow-md"
        >
          Immersive, high-velocity IT training for the next generation of software engineers and technical leaders.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, type: "spring", bounce: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <a
            href="#services"
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById('services');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                window.history.pushState(null, '', '/#services');
              }
            }}
            className="group relative px-10 py-4 bg-brand rounded-full text-white font-bold text-base overflow-hidden flex items-center justify-center gap-3 shadow-[0_0_40px_rgba(87,0,105,0.4)] hover:shadow-[0_0_60px_rgba(87,0,105,0.6)] transition-all duration-300 hover:scale-105"
          >
            <motion.div 
               className="absolute inset-0 bg-white/20"
               initial={{ x: '-100%' }}
               whileHover={{ x: '100%' }}
               transition={{ duration: 0.5, ease: "easeInOut" }}
            />
            <span className="relative z-10 tracking-wide uppercase">Explore Programs</span>
            <ArrowRight className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-2" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}

