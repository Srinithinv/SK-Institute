import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Heart, MessageCircle, Share2, Star, Music } from 'lucide-react';

const videoReviews = [
  { 
    id: 1, 
    name: "Alex Mercer", 
    avatar: "AM",
    likes: "12K",
    comments: "342",
    videoId: "aqz-KE-bpKQ", // Big Buck Bunny (Always embeddable)
    thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=700&q=60"
  },
  { 
    id: 2, 
    name: "Priya Sharma", 
    avatar: "PS",
    likes: "8.4K",
    comments: "156",
    videoId: "eRsGyueVLvQ", // Sintel
    thumbnail: "https://images.unsplash.com/photo-1531123897727-8f129e1bf98c?auto=format&fit=crop&w=400&h=700&q=60"
  },
  { 
    id: 3, 
    name: "Jordan Lee", 
    avatar: "JL",
    likes: "15K",
    comments: "892",
    videoId: "R6MlUcmOul8", // Tears of Steel
    thumbnail: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&h=700&q=60"
  },
  { 
    id: 4, 
    name: "Sam Wright", 
    avatar: "SW",
    likes: "5.2K",
    comments: "94",
    videoId: "LXb3EKWsInQ", // Costa Rica 4K
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=700&q=60"
  },
  { 
    id: 5, 
    name: "Maria Garcia", 
    avatar: "MG",
    likes: "21K",
    comments: "1.2K",
    videoId: "M7lc1UVf-VE", // Google Developers API Test Video (Guaranteed Embeddable)
    thumbnail: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&h=700&q=60"
  },
  { 
    id: 6, 
    name: "Chen Wei", 
    avatar: "CW",
    likes: "11K",
    comments: "430",
    videoId: "jNQXAC9IVRw", // Me at the zoo (First YouTube Video)
    thumbnail: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&h=700&q=60"
  },
  { 
    id: 7, 
    name: "Sarah Jenkins", 
    avatar: "SJ",
    likes: "9.1K",
    comments: "210",
    videoId: "094y1Z2wpJg", // MrBeast (Allows embedding for views)
    thumbnail: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&h=700&q=60"
  },
  { 
    id: 8, 
    name: "James Miller", 
    avatar: "JM",
    likes: "18K",
    comments: "654",
    videoId: "dQw4w9WgXcQ", // Never Gonna Give You Up (Always embeddable)
    thumbnail: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&h=700&q=60"
  }
];

export function VideoReviews() {
  const [playingId, setPlayingId] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.innerWidth < 768 && scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-8 pb-4 md:pt-10 md:pb-6 bg-white text-dark relative overflow-hidden" id="video-reviews">
      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand/10 rounded-full text-brand font-bold uppercase tracking-widest text-[10px] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-brand" />
              Authentic Experiences
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-black mb-4 leading-tight">
              Real Stories. <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-[#8d00aa]">Real Results.</span>
            </h2>
          </motion.div>
        </div>

        {/* Grid Container with Navigation */}
        <div className="max-w-6xl mx-auto px-4 md:px-20 relative group/carousel">
          
          {/* Grid Layout with AnimatePresence for smooth transitions */}
          <div className="overflow-hidden pb-12 pt-4">
            <AnimatePresence mode="wait">
              <motion.div 
                ref={scrollRef}
                className="flex md:grid overflow-x-auto snap-x snap-mandatory md:overflow-x-visible md:snap-none md:grid-cols-3 lg:grid-cols-4 gap-6 pb-4 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] justify-items-center"
              >
                {videoReviews.map((review) => (
                  <div
                    key={review.id}
                    className="w-[70vw] sm:w-[260px] shrink-0 snap-center md:w-full md:max-w-[260px] md:mx-auto md:shrink md:snap-none relative"
                  >
                    {/* Video Card Container (9:16 aspect ratio) - Reduced shadow for performance */}
                    <div 
                      className="relative w-full aspect-[9/16] rounded-[2rem] overflow-hidden bg-black shadow-lg ring-1 ring-white/10"
                    >
                      
                      {playingId === review.id ? (
                        // Active Video Player
                        <iframe
                          width="100%"
                          height="100%"
                          src={`https://www.youtube.com/embed/${review.videoId}?autoplay=1&rel=0&modestbranding=1&controls=1`}
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
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center text-white font-bold text-xs shadow-md">
                                {review.avatar}
                              </div>
                              <span className="text-white font-semibold text-sm drop-shadow-md">{review.name}</span>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center border border-white/20">
                              <span className="text-white font-bold text-[10px]">T.</span>
                            </div>
                          </div>

                          {/* Center Play Button */}
                          <div className="absolute inset-0 flex items-center justify-center z-20">
                            <div className="w-14 h-14 bg-white/30 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-brand transition-all duration-300 shadow-xl">
                              <Play className="w-6 h-6 text-white fill-white ml-1" />
                            </div>
                          </div>

                          {/* Right Action Icons Column */}
                          <div className="absolute right-4 bottom-24 flex flex-col items-center gap-5 z-20">
                            <div className="flex flex-col items-center gap-1 group/btn">
                              <div className="w-10 h-10 rounded-full bg-black/60 flex items-center justify-center group-hover/btn:bg-black/80 transition-colors border border-white/10">
                                <Heart className="w-5 h-5 text-white" />
                              </div>
                              <span className="text-white text-[10px] font-semibold">{review.likes}</span>
                            </div>
                            
                            <div className="flex flex-col items-center gap-1 group/btn">
                              <div className="w-10 h-10 rounded-full bg-black/60 flex items-center justify-center group-hover/btn:bg-black/80 transition-colors border border-white/10">
                                <MessageCircle className="w-5 h-5 text-white" />
                              </div>
                              <span className="text-white text-[10px] font-semibold">{review.comments}</span>
                            </div>
                            
                            <div className="flex flex-col items-center gap-1 group/btn">
                              <div className="w-10 h-10 rounded-full bg-black/60 flex items-center justify-center group-hover/btn:bg-black/80 transition-colors border border-white/10">
                                <Share2 className="w-5 h-5 text-white" />
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
