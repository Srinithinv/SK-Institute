import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import type { MouseEvent } from 'react';

const technologies = [
  { name: "React", x: 20, y: 30, delay: 0.1 },
  { name: "Node.js", x: 70, y: 20, delay: 0.2 },
  { name: "Python", x: 40, y: 60, delay: 0.3 },
  { name: "AWS", x: 80, y: 70, delay: 0.4 },
  { name: "Docker", x: 10, y: 70, delay: 0.5 },
  { name: "TypeScript", x: 50, y: 20, delay: 0.6 },
  { name: "GraphQL", x: 30, y: 80, delay: 0.7 },
  { name: "PostgreSQL", x: 85, y: 40, delay: 0.8 },
];

export function TechnologiesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section 
      className="py-40 bg-white relative overflow-hidden min-h-screen flex items-center"
      ref={containerRef}
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, var(--color-brand) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full relative z-10">
        
        <div className="text-center mb-20 pointer-events-none">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, type: "spring" }}
            className="text-6xl md:text-8xl font-heading font-black tracking-tighter text-dark relative inline-block"
          >
            The <span className="text-brand">Stack</span>
            <div className="absolute -inset-4 bg-brand/10 blur-3xl -z-10 rounded-full" />
          </motion.h2>
        </div>

        <div className="relative h-[500px] w-full max-w-[1000px] mx-auto">
          
          {/* Connecting SVG Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {technologies.map((tech, i) => {
              // Calculate rough absolute positions based on percentages
              // This is a simplified interactive line drawing
              return (
                <motion.line
                  key={`line-${i}`}
                  x1={`${tech.x}%`}
                  y1={`${tech.y}%`}
                  x2={mousePos.x}
                  y2={mousePos.y}
                  stroke="var(--color-brand)"
                  strokeWidth="2"
                  strokeOpacity="0.2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
              );
            })}
          </svg>

          {/* Floating Nodes */}
          {technologies.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: tech.delay, type: "spring", stiffness: 200, damping: 20 }}
              animate={{
                y: [0, -20, 0],
                x: [0, 10, 0],
              }}
              // @ts-ignore - framer motion repeat infinite typing issue
              transition={{
                y: { repeat: Infinity, duration: 4 + i, ease: "easeInOut" },
                x: { repeat: Infinity, duration: 5 + i, ease: "easeInOut" }
              }}
              className="absolute cursor-pointer group"
              style={{
                left: `${tech.x}%`,
                top: `${tech.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div className="px-6 py-3 bg-white border-2 border-brand/20 rounded-full font-bold text-dark shadow-xl hover:border-brand hover:scale-110 transition-all duration-300">
                {tech.name}
              </div>
              <div className="absolute inset-0 bg-brand/20 blur-xl rounded-full -z-10 group-hover:bg-brand/40 transition-colors" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
