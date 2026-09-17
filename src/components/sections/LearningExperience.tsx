import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';

const steps = [
  {
    title: "Practical Learning",
    description: "Build things. Code every day. Learn by solving real problems instead of just watching videos.",
    align: "left"
  },
  {
    title: "Expert Guidance",
    description: "Get unstuck faster. Learn industry best practices directly from senior engineers.",
    align: "right"
  },
  {
    title: "Real Projects",
    description: "Develop a production-ready portfolio that proves you can build complex systems.",
    align: "left"
  },
  {
    title: "Career Growth",
    description: "Master the technical interview and connect directly with our hiring partners.",
    align: "right"
  }
];

export function LearningExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const lineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="py-40 bg-white relative overflow-hidden">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-10">
         <motion.div 
           className="w-[150vw] h-[150vw] rounded-full border border-brand/50 absolute"
           style={{ rotate: useTransform(smoothProgress, [0, 1], [0, 180]) }}
         />
      </div>

      <div className="max-w-[1000px] mx-auto px-6 md:px-12 relative z-10">
        
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl md:text-8xl font-heading font-black tracking-tighter text-dark"
          >
            The <span className="text-brand">Journey</span>
          </motion.h2>
        </div>

        <div className="relative">
          {/* Central Orbit Beam */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-black/5 -translate-x-1/2 rounded-full hidden md:block" />
          <motion.div 
            className="absolute left-1/2 top-0 bottom-0 w-2 bg-brand shadow-[0_0_20px_var(--color-brand)] -translate-x-1/2 rounded-full hidden md:block origin-top"
            style={{ scaleY: lineHeight }}
          />

          <div className="flex flex-col gap-24 md:gap-40">
            {steps.map((step, index) => {
              // Custom transforms based on scroll position for each item
              const itemProgress = useTransform(
                smoothProgress,
                [index * 0.2, index * 0.2 + 0.3],
                [0, 1]
              );
              
              const y = useTransform(itemProgress, [0, 1], [100, 0]);
              const opacity = useTransform(itemProgress, [0, 1], [0, 1]);
              const scale = useTransform(itemProgress, [0, 1], [0.8, 1]);
              
              const xLeft = useTransform(itemProgress, [0, 1], [-100, 0]);
              const xRight = useTransform(itemProgress, [0, 1], [100, 0]);

              return (
                <motion.div 
                  key={index}
                  style={{ y, opacity, scale, x: step.align === 'left' ? xLeft : xRight }}
                  className={`flex md:w-1/2 relative ${
                    step.align === 'left' ? 'md:pr-16 md:justify-end' : 'md:pl-16 md:ml-auto'
                  }`}
                >
                  
                  {/* Orbit Node */}
                  <div className={`absolute top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center ${
                    step.align === 'left' ? '-right-[24px]' : '-left-[24px]'
                  }`}>
                    <motion.div 
                      className="w-12 h-12 rounded-full bg-white border-[4px] border-brand shadow-[0_0_30px_rgba(87,0,105,0.4)] z-20 flex items-center justify-center"
                      style={{ scale: useTransform(itemProgress, [0.5, 1], [0, 1]) }}
                    >
                      <span className="font-bold text-brand text-lg">{index + 1}</span>
                    </motion.div>
                  </div>

                  <div className={`bg-white border-2 border-brand/10 p-10 rounded-[2rem] shadow-2xl hover:border-brand/40 transition-colors w-full ${
                    step.align === 'left' ? 'md:text-right text-left' : 'text-left'
                  }`}>
                    <div className="text-6xl font-black text-brand/10 mb-4 tracking-tighter">0{index + 1}</div>
                    <h3 className="text-3xl font-heading font-black text-dark mb-4">{step.title}</h3>
                    <p className="text-lg text-secondary-text font-medium leading-relaxed">{step.description}</p>
                  </div>

                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
