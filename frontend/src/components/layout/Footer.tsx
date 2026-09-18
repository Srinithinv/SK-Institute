import { Code2 } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-black text-white pt-20 pb-10 border-t border-white/10">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img src="/logo.png" alt="SK Technologies Logo" className="h-20 w-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Empowering the next generation of digital innovators with industry-leading technical education and career placement.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand transition-colors text-xs font-bold">TW</a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand transition-colors text-xs font-bold">IN</a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand transition-colors text-xs font-bold">IG</a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-lg mb-6">Programs</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-brand transition-colors text-sm">Full Stack Development</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand transition-colors text-sm">Data Science & AI</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand transition-colors text-sm">Cloud & DevOps</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand transition-colors text-sm">Cybersecurity</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Company</h4>
            <ul className="space-y-4">
              <li><a href="/#about" className="text-gray-400 hover:text-brand transition-colors text-sm">About Us</a></li>
              <li><a href="/#founder" className="text-gray-400 hover:text-brand transition-colors text-sm">Leadership</a></li>
              <li><a href="/#testimonials" className="text-gray-400 hover:text-brand transition-colors text-sm">Success Stories</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand transition-colors text-sm">Careers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Legal</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-brand transition-colors text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand transition-colors text-sm">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand transition-colors text-sm">Refund Policy</a></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Tech Institute. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm">
            Designed with <span className="text-brand">♥</span> in Silicon Valley
          </p>
        </div>

      </div>
    </footer>
  );
}
