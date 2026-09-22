import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LogOut, LayoutDashboard, Sparkles, Info, User, BookOpen, Video, MessageSquare, Film, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export function AdminLayout() {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/admin/login');
    } catch (error) {
      console.error('Failed to sign out', error);
    }
  };

  const navLinks = [
    { path: '/admin', altPath: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/about', label: 'About', icon: Info },
    { path: '/admin/founder', label: 'Founder', icon: User },
    { path: '/admin/courses', label: 'Courses', icon: BookOpen },
    { path: '/admin/videos', label: 'Videos', icon: Video },
    { path: '/admin/testimonials', label: 'Testimonials', icon: MessageSquare },
    { path: '/admin/video-testimonials', label: 'Video Reviews', icon: Film }
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white border-r border-slate-200 p-6">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 bg-brand/10 rounded-xl flex items-center justify-center shrink-0">
          <LayoutDashboard className="w-5 h-5 text-brand" />
        </div>
        <span className="text-xl font-bold font-heading text-slate-800 tracking-tight flex items-center gap-2">
          SK Admin <Sparkles className="w-4 h-4 text-brand" />
        </span>
      </div>

      <nav className="flex-1 space-y-3">
        {navLinks.map(link => {
          const isActive = location.pathname === link.path || location.pathname === link.altPath;
          const Icon = link.icon;
          return (
            <Link 
              key={link.path}
              to={link.path}
              onClick={() => setIsSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${
                isActive 
                  ? 'bg-brand/10 text-brand' 
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="pt-6 border-t border-slate-100 mt-6 space-y-4">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <span className="text-xs font-medium text-slate-600 truncate">{user?.email || 'admin@skinstitute.com'}</span>
        </div>
        
        <button
          onClick={handleSignOut}
          className="flex items-center w-full gap-2 px-4 py-3 text-sm font-semibold text-slate-600 hover:text-red-600 hover:bg-red-50 transition-all rounded-xl group"
        >
          <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-brand/30 selection:text-brand-dark flex">
      
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-72 h-screen fixed inset-y-0 left-0 z-40">
        <SidebarContent />
      </aside>

      {/* Mobile Header & Sidebar Toggle */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-40 flex items-center justify-between px-4">
        <span className="text-lg font-bold font-heading text-slate-800 flex items-center gap-2">
          SK Admin <Sparkles className="w-4 h-4 text-brand" />
        </span>
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="w-10 h-10 bg-slate-50 hover:bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Sidebar Backdrop */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="md:hidden fixed inset-y-0 left-0 w-72 z-50 p-4"
            >
              <div className="absolute top-4 right-4 z-50">
                <button 
                  onClick={() => setIsSidebarOpen(false)}
                  className="w-10 h-10 bg-slate-50 hover:bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-72 min-h-screen pt-20 md:pt-6 p-4 md:p-8">
        <div className="max-w-6xl mx-auto w-full">
          <Outlet />
        </div>
      </main>

    </div>
  );
}
