import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Heart, MessageCircle, Share2, Star, Music } from 'lucide-react';

export function VideoReviews() {
  const [videoReviews, setVideoReviews] = useState<any[]>([]);
  const [playingId, setPlayingId] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`\${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/content/video-testimonials`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          const mappedReviews = data.map((v: any) => {
            let avatar = "U";
            if (v.student_name && v.student_name.length > 0) {
              const parts = v.student_name.split(' ');
              if (parts.length > 1) {
                avatar = parts[0][0].toUpperCase() + parts[1][0].toUpperCase();
              } else {
                avatar = parts[0].substring(0, 2).toUpperCase();
              }
            }

            return {
              id: v.id,
              name: v.student_name,
              avatar: avatar,
              likes: Math.floor(Math.random() * 20 + 1) + "K",
              comments: Math.floor(Math.random() * 500 + 100),
              videoUrl: v.video_url,
              thumbnail: v.thumbnail_url
            };
          });
          setVideoReviews(mappedReviews);
        }
      })
      .catch(err => console.error('Failed to load video testimonials:', err));
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
          scrollRef.current.scrollBy({ left: 294, behavior: 'smooth' });
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
    <section className="pt-8 pb-4 md:pt-10 md:pb-6 bg-[#f8f9fa] text-dark relative overflow-hidden" id="video-reviews">
      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-heading font-black mb-4 text-[#0f172a] leading-tight tracking-tight">
              Real Reviews from Our Community
            </h2>
            <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto">
              Authentic experiences shared by students and startups on our platform
            </p>
          </motion.div>
        </div>

        {/* Grid Container with Navigation */}
        <div 
          className="w-full relative group/carousel flex flex-col items-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          onTouchCancel={() => setIsPaused(false)}
        >
          
          {/* Desktop Navigation Arrows */}
          <div className="max-w-[1050px] w-full mx-auto px-4 absolute inset-0 pointer-events-none z-30 hidden md:flex items-center justify-between">
            <button 
              onClick={() => scroll('left')} 
              className="w-14 h-14 flex items-center justify-center bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] rounded-full text-slate-400 hover:text-brand hover:scale-105 transition-all pointer-events-auto border border-slate-100"
            >
              <ChevronLeft className="w-6 h-6 -ml-0.5" />
            </button>
            
            <button 
              onClick={() => scroll('right')} 
              className="w-14 h-14 flex items-center justify-center bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] rounded-full text-slate-400 hover:text-brand hover:scale-105 transition-all pointer-events-auto border border-slate-100"
            >
              <ChevronRight className="w-6 h-6 -mr-0.5" />
            </button>
          </div>

          {/* Grid Layout with AnimatePresence for smooth transitions */}
          <div className="pb-2 md:pb-12 pt-4 max-w-[858px] w-full overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div 
                ref={scrollRef}
                className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              >
                {videoReviews.map((review) => (
                  <div
                    key={review.id}
                    className="w-[80vw] sm:w-[270px] shrink-0 snap-center relative group/card"
                  >
                    {/* Video Card Container (9:16 aspect ratio) */}
                    <div 
                      className={`relative w-full aspect-[9/16] rounded-[2rem] overflow-hidden bg-black ring-1 ring-white/5 transition-all duration-500 group-hover/card:ring-2 group-hover/card:ring-[#8b5cf6] group-hover/card:shadow-[0_0_40px_rgba(139,92,246,0.3)] shadow-xl`}
                    >
                      
                      {playingId === review.id ? (
                        // Active Video Player
                        <iframe
                          width="100%"
                          height="100%"
                          src={review.videoUrl.includes('?') ? `${review.videoUrl}&autoplay=1` : `${review.videoUrl}?autoplay=1`}
                          title={`Video review by ${review.name}`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          className="absolute inset-0 w-full h-full z-10 bg-black"
                        ></iframe>
                      ) : (
                        // Native UI Overlay & Thumbnail
                        <div 
                          className="absolute inset-0 w-full h-full cursor-pointer group bg-black"
                          onClick={() => setPlayingId(review.id)}
                        >
                          {/* Background Thumbnail - Optimized loading */}
                          <img 
                            src={review.thumbnail} 
                            alt={review.name}
                            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                            decoding="async"
                          />
                          
                          {/* Gradients */}
                          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 pointer-events-none" />

                          {/* Header Area */}
                          <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-20">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-[#8b5cf6] flex items-center justify-center text-white font-bold text-xs shadow-md">
                                {review.avatar}
                              </div>
                              <span className="text-white font-bold text-sm drop-shadow-md">{review.name}</span>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20 backdrop-blur-sm">
                              <span className="text-white font-black text-[11px] font-heading opacity-90">T</span>
                            </div>
                          </div>

                          {/* Center Play Button */}
                          <div className="absolute inset-0 flex items-center justify-center z-20">
                            <div className="w-14 h-14 bg-white/30 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-brand transition-all duration-300 shadow-xl">
                              <Play className="w-6 h-6 text-white fill-white ml-1" />
                            </div>
                          </div>

                          {/* Right Action Icons Column */}
                          <div className="absolute right-4 bottom-20 flex flex-col items-center gap-6 z-20">
                            <div className="flex flex-col items-center gap-1.5 group/btn">
                              <div className="w-11 h-11 rounded-full bg-black/40 flex items-center justify-center group-hover/btn:bg-black/60 backdrop-blur-md transition-colors border border-white/10">
                                <Heart className="w-5 h-5 text-white stroke-[2.5]" />
                              </div>
                              <span className="text-white text-[11px] font-bold tracking-wide">{review.likes}</span>
                            </div>
                            
                            <div className="flex flex-col items-center gap-1.5 group/btn">
                              <div className="w-11 h-11 rounded-full bg-black/40 flex items-center justify-center group-hover/btn:bg-black/60 backdrop-blur-md transition-colors border border-white/10">
                                <MessageCircle className="w-5 h-5 text-white stroke-[2.5]" />
                              </div>
                              <span className="text-white text-[11px] font-bold tracking-wide">{review.comments}</span>
                            </div>
                            
                            <div className="flex flex-col items-center gap-1.5 group/btn">
                              <div className="w-11 h-11 rounded-full bg-black/40 flex items-center justify-center group-hover/btn:bg-black/60 backdrop-blur-md transition-colors border border-white/10">
                                <Share2 className="w-5 h-5 text-white stroke-[2.5]" />
                              </div>
                            </div>
                          </div>

                          {/* Bottom Info Area */}
                          <div className="absolute left-5 bottom-5 right-16 z-20">
                            <div className="flex gap-0.5 mb-2 text-yellow-400">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-3.5 h-3.5 fill-current drop-shadow-md" />
                              ))}
                            </div>
                            <div className="flex items-center gap-2 text-white/90 text-xs font-medium">
                              <Music className="w-3.5 h-3.5" />
                              <span className="truncate drop-shadow-md">Original Audio - {review.name}</span>
                            </div>
                          </div>
                        </div>
                      )}

                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
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
    </section>
  );
}
