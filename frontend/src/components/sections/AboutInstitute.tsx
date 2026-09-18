import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';

export function AboutInstitute() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });
  
  const y1 = useTransform(smoothProgress, [0, 1], [100, -100]);
  const y2 = useTransform(smoothProgress, [0, 1], [150, -150]);
  const opacity = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1, 0.9]);

  return (
    <section ref={containerRef} className="relative pt-4 pb-16 bg-white overflow-hidden" id="about">
      {/* Animated Background Elements */}
      <motion.div 
        className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand/5 rounded-full blur-[100px] pointer-events-none"
        style={{ y: y1 }}
      />
      
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
          style={{ opacity, scale }}
        >
          
          {/* Content */}
          <div className="order-2 lg:order-1 relative">
            
            {/* Tech-Related Background Image Texture */}
            <div className="absolute -inset-10 z-0 opacity-20 pointer-events-none overflow-hidden rounded-[2rem]">
              <div 
                className="absolute inset-0 bg-cover bg-center mix-blend-luminosity"
                style={{ 
                  backgroundImage: 'url("https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1600")' 
                }}
              />
              {/* Fade out edges */}
              <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white" />
              <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
            </div>

            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative z-10"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-black text-dark leading-tight mb-5">
                Redefining <span className="text-brand block">Tech Education</span>
              </h2>
              
              <div className="space-y-4 text-base md:text-lg text-secondary-text font-medium leading-relaxed">
                <p>
                  We are not just a training institute. We are an incubator for the next generation of digital innovators. Founded on the principle that practical, project-based learning accelerates career growth.
                </p>
                <p>
                  Our curriculum is continuously evolved by industry veterans to ensure our graduates don't just learn syntax—they learn how to build, scale, and secure enterprise-grade systems in the real world.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl lg:text-4xl font-black text-dark mb-1">10k+</div>
                  <div className="text-xs font-bold text-brand uppercase tracking-wider">Careers Launched</div>
                </div>
                <div>
                  <div className="text-3xl lg:text-4xl font-black text-dark mb-1">95%</div>
                  <div className="text-xs font-bold text-brand uppercase tracking-wider">Placement Rate</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Image/Visual */}
          <div className="order-1 lg:order-2 relative h-[300px] lg:h-[400px] w-full rounded-[2rem] overflow-hidden group shadow-2xl shadow-brand/10">
            <motion.div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                y: y2,
                scale: 1.1,
                backgroundImage: 'url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200")'
              }}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand/40 to-transparent mix-blend-multiply group-hover:opacity-50 transition-opacity duration-700" />
            <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-[2rem]" />
          </div>

        </motion.div>
      </div>
    </section>
  );
}
