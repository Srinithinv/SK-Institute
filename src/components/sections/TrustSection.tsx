import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';

const stats = [
  { value: 10000, label: "STUDENTS TRAINED", suffix: "+" },
  { value: 95, label: "PLACEMENT RATE", suffix: "%" },
  { value: 50, label: "EXPERT MENTORS", suffix: "+" },
  { value: 200, label: "HIRING PARTNERS", suffix: "+" }
];

function Counter({ from = 0, to, suffix = "", duration = 2 }: { from?: number, to: number, suffix?: string, duration?: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!inView) return;
    
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      if (nodeRef.current) {
        nodeRef.current.textContent = Math.floor(easeProgress * (to - from) + from).toLocaleString() + suffix;
      }
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [inView, to, from, duration, suffix]);

  return <span ref={nodeRef} className="tabular-nums font-black">{from}{suffix}</span>;
}

export function TrustSection() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  const scrollVelocity = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 90
  });

  const x1 = useTransform(scrollVelocity, [0, 1], [0, -1000]);
  const x2 = useTransform(scrollVelocity, [0, 1], [-1000, 0]);

  return (
    <section ref={targetRef} className="py-24 bg-white overflow-hidden relative border-y border-border/10">
      
      {/* Decorative background lines */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'linear-gradient(90deg, var(--color-brand) 1px, transparent 1px)',
          backgroundSize: '10vw 100%'
        }}
      />

      <div className="relative z-10 w-full flex flex-col gap-16">
        
        {/* Infinite Marquee 1 */}
        <motion.div style={{ x: x1 }} className="flex whitespace-nowrap gap-12 text-6xl md:text-8xl font-black text-brand/5 tracking-tighter w-[300vw]">
           {Array(6).fill("INDUSTRY LEADERS • ").map((text, i) => (
             <span key={i}>{text}</span>
           ))}
        </motion.div>

        {/* Counter Grid */}
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1, type: "spring" }}
              className="flex flex-col items-center justify-center text-center p-8 bg-white/50 backdrop-blur-md rounded-[2rem] border-2 border-brand/10 hover:border-brand/30 hover:shadow-[0_0_40px_rgba(87,0,105,0.1)] transition-all duration-300 group"
            >
              <div className="text-5xl md:text-7xl text-brand mb-2 group-hover:scale-110 transition-transform duration-500 ease-out">
                <Counter to={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm md:text-base font-bold text-dark tracking-widest uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Infinite Marquee 2 */}
        <motion.div style={{ x: x2 }} className="flex whitespace-nowrap gap-12 text-6xl md:text-8xl font-black text-brand/5 tracking-tighter w-[300vw]">
           {Array(6).fill("PROVEN SUCCESS • ").map((text, i) => (
             <span key={i}>{text}</span>
           ))}
        </motion.div>

      </div>
    </section>
  );
}
