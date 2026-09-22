import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export function VideoGallery() {
  const [videos, setVideos] = useState<any[]>([]);
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [hoveredVideo, setHoveredVideo] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`\${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/content/videos`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          const mappedVideos = data.map((v: any) => ({
            id: v.id,
            title: v.title,
            thumbnail: v.thumbnail_url,
            duration: "1:00:00", // Fallback
            date: v.category,
            videoUrl: v.video_url
          }));
          setVideos(mappedVideos);
        }
      })
      .catch(err => console.error('Failed to load videos:', err));
  }, []);

  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: 344, behavior: 'smooth' });
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-10 md:py-24 bg-dark/5 relative overflow-hidden" id="video-gallery">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        
        <div className="flex flex-col items-center text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="inline-block px-4 py-2 bg-brand/10 border border-brand/20 rounded-full text-brand font-bold uppercase tracking-widest text-sm mb-4">
              Inside The Classroom
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-black text-dark leading-tight">
              Experience Our <span className="text-brand">Live Sessions</span>
            </h2>
          </motion.div>
        </div>

        <div 
          className="relative group/carousel"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          onTouchCancel={() => setIsPaused(false)}
        >
          <div 
            ref={scrollRef}
            className="flex md:grid overflow-x-auto snap-x snap-mandatory md:overflow-x-visible md:snap-none md:grid-cols-2 lg:grid-cols-3 gap-6 pb-4 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
          {videos.map((video, idx) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              onHoverStart={() => setHoveredVideo(video.id)}
              onHoverEnd={() => setHoveredVideo(null)}
              onClick={() => setActiveVideoUrl(video.videoUrl)}
              className="w-[85vw] sm:w-[320px] shrink-0 snap-center md:w-auto md:shrink md:snap-none group relative rounded-[2rem] overflow-hidden cursor-pointer aspect-video bg-dark"
            >
              {/* Thumbnail */}
              <img 
                src={video.thumbnail} 
                alt={video.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-40"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent" />

              {/* Play Button Indicator (Animated) */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                  className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30"
                  animate={{ 
                    scale: hoveredVideo === video.id ? 1.1 : 1,
                    backgroundColor: hoveredVideo === video.id ? "rgba(87, 0, 105, 0.8)" : "rgba(255, 255, 255, 0.2)"
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Play className={`w-8 h-8 ml-1 ${hoveredVideo === video.id ? "text-white" : "text-white"}`} fill="currentColor" />
                </motion.div>
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between pointer-events-none">
                <div className="flex justify-between items-start">
                  <span className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-xs font-bold text-white uppercase tracking-wider">
                    {video.date}
                  </span>
                  <span className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-xs font-bold text-white tracking-wider flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    {video.duration}
                  </span>
                </div>
                
                <div>
                  <h3 className="text-2xl md:text-3xl font-heading font-black text-white leading-tight translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {video.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
          </div>
          
          {/* Mobile Navigation Arrows Below */}
          <div className="md:hidden flex items-center justify-center gap-4 mt-2">
            <button 
              onClick={() => scroll('left')} 
              className="w-12 h-12 flex items-center justify-center bg-white shadow-md rounded-full text-brand border border-gray-100 hover:bg-brand hover:text-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6 -ml-0.5" />
            </button>
            <button 
              onClick={() => scroll('right')} 
              className="w-12 h-12 flex items-center justify-center bg-white shadow-md rounded-full text-brand border border-gray-100 hover:bg-brand hover:text-white transition-colors"
            >
              <ChevronRight className="w-6 h-6 -mr-0.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Video Player Modal */}
      <AnimatePresence>
        {activeVideoUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 sm:p-8 backdrop-blur-sm"
          >
            <button 
              onClick={() => setActiveVideoUrl(null)}
              className="absolute top-6 right-6 p-2 text-white hover:text-brand bg-white/10 hover:bg-white/20 rounded-full transition-colors z-[110]"
            >
              <X className="w-8 h-8" />
            </button>
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl relative border border-white/10"
            >
              <iframe
                src={activeVideoUrl}
                title="Course Video"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
