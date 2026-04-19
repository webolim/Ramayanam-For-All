import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Home, Search, BookOpen, Mail, Sun, Moon, Coffee, Minus, Plus } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { cn } from '../lib/utils';
import { getFontSizeClass } from '../lib/fontSize';
import SearchModal from './SearchModal';
import { DecorativeKolam } from './Kolam';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const { theme, setTheme, fontSize, setFontSize } = useSettings();
  const location = useLocation();

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0 });
    setIsSidebarOpen(false);
  }, [location.pathname]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    // Keep empty or handle other scroll behaviors if needed
  };

  const scrollToTop = () => {
    mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleIncreaseFont = () => {
    if (fontSize < 5) setFontSize(fontSize + 1);
  };

  const handleDecreaseFont = () => {
    if (fontSize > -5) setFontSize(fontSize - 1);
  };

  const handleResetFont = () => {
    setFontSize(0);
  };
  
  const cycleTheme = () => {
    if (theme === 'light') setTheme('sepia');
    else if (theme === 'sepia') setTheme('dark');
    else setTheme('light');
  };

  const navItems = [
    { label: "முகப்பு", path: "/", icon: <Home size={18} /> },
    { label: "காண்டங்கள்", path: "/kandams", icon: <BookOpen size={18} /> },
    { label: "பிரவசன ரூபம்", path: "/pravachanam", icon: <BookOpen size={18} /> },
    { label: "தொடர்புக்கு", path: "/contact", icon: <Mail size={18} /> },
  ];

  return (
    <div className={cn("h-[100dvh] w-full relative font-tamil overflow-hidden", `theme-${theme}`)}>
      <header 
        className="fixed top-0 left-0 right-0 z-40 border-b flex items-center justify-between px-4 lg:px-8 h-[72px] lg:h-[80px]"
        style={{ backgroundColor: 'var(--header-bg)', borderColor: 'var(--border-color)' }}
      >
        <div className="flex items-center gap-4 lg:gap-8 min-w-0">
          <button onClick={toggleSidebar} className="lg:hidden p-2 -ml-2 rounded-md hover:bg-[var(--accent-soft)] shrink-0 transition-colors" aria-label="Menu" style={{ color: 'var(--accent-color)' }}>
            <Menu size={24} />
          </button>
          
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center overflow-hidden shrink-0 border" style={{ borderColor: 'var(--border-color)' }}>
              <img src="https://raw.githubusercontent.com/webolim/rama/refs/heads/main/Ramayana-Mama.webp" alt="அனைவருக்கும் ராமாயணம்" className="w-full h-full object-cover" />
            </div>
            <div className="font-serif font-bold text-[18px] sm:text-[22px] hidden sm:block truncate pr-2" style={{ color: 'var(--text-color)' }}>
              அனைவருக்கும் ராமாயணம்
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 ml-4 xl:ml-6">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
              return (
                <Link 
                  key={item.path}
                  to={item.path} 
                  className={cn(
                    "font-semibold transition-colors whitespace-nowrap",
                    getFontSizeClass(fontSize),
                    isActive ? "text-[var(--accent-color)]" : "text-[var(--text-secondary)] hover:text-[var(--accent-color)]"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3 lg:gap-4 shrink-0">
          <div 
            onClick={() => setIsSearchOpen(true)}
            className="hidden xl:flex items-center rounded-full px-5 py-2.5 w-[200px] 2xl:w-[280px] transition-colors cursor-text"
            style={{ backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)' }}
          >
            <input 
              type="text" 
              readOnly 
              placeholder="தேடுக..." 
              className="bg-transparent border-none outline-none w-full text-sm placeholder:opacity-60 cursor-text"
              style={{ color: 'var(--text-primary)' }}
            />
          </div>
          
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="xl:hidden p-2 rounded-full hover:bg-[var(--accent-soft)] transition-colors"
            style={{ color: 'var(--accent-color)' }}
            aria-label="தேடு (Search)"
          >
            <Search size={22} />
          </button>

          <button 
            onClick={cycleTheme}
            className="hidden lg:flex p-2 rounded-full hover:bg-[var(--accent-soft)] transition-colors"
            title="நிறம் (Theme)"
            style={{ color: 'var(--accent-color)' }}
          >
            {theme === 'light' ? <Sun size={20} /> : theme === 'sepia' ? <Coffee size={20} /> : <Moon size={20} />}
          </button>

          <div className="flex border overflow-hidden rounded-full items-center shrink-0 px-2 gap-2 h-9 sm:h-10" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)' }}>
            <button onClick={handleDecreaseFont} disabled={fontSize <= -5} className="p-1 hover:text-[var(--accent-color)] disabled:opacity-50 transition-colors">
              <Minus size={16} />
            </button>
            <input 
              type="range" 
              min="-5" max="5" 
              value={fontSize} 
              onChange={(e) => setFontSize(parseInt(e.target.value))}
              className="w-16 md:w-20 lg:w-24 h-1.5 bg-[var(--border-color)] rounded-lg appearance-none cursor-pointer accent-[var(--accent-color)]"
            />
            <button onClick={handleIncreaseFont} disabled={fontSize >= 5} className="p-1 hover:text-[var(--accent-color)] disabled:opacity-50 transition-colors">
              <Plus size={16} />
            </button>
            <button onClick={handleResetFont} className="px-2 py-1 ml-1 text-sm font-bold text-[var(--accent-color)] border-l" style={{ borderColor: 'var(--border-color)' }}>
              அ
            </button>
          </div>
        </div>
      </header>

      <div className="absolute inset-0 flex overflow-hidden">
        {/* Mobile Sidebar Navigation */}
        <aside 
          className={cn(
            "fixed inset-y-0 left-0 z-50 w-[280px] border-r transform transition-transform duration-300 flex flex-col py-6 px-6 lg:hidden",
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
          style={{ backgroundColor: 'var(--sidebar-bg)', borderColor: 'var(--border-color)' }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="font-bold text-lg">பட்டியல்</div>
            <button onClick={() => setIsSidebarOpen(false)} className="p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/10">
              <X size={20} />
            </button>
          </div>

          <div className="mb-6 block">
            <span className="text-[11px] uppercase tracking-widest font-semibold block mb-4" style={{ color: 'var(--text-secondary)' }}>
              முக்கிய பிரிவுகள்
            </span>
            <ul className="space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
                return (
                  <li key={item.path}>
                    <Link 
                      to={item.path} 
                      onClick={() => setIsSidebarOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-colors",
                        getFontSizeClass(fontSize),
                        isActive ? "bg-[var(--accent-color)] text-white" : "hover:bg-[var(--accent-soft)] text-[var(--text-secondary)] hover:text-[var(--accent-color)]"
                      )}
                    >
                      {item.icon} {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mt-6">
            <span className="text-[11px] uppercase tracking-widest font-semibold block mb-4" style={{ color: 'var(--text-secondary)' }}>
              அமைப்புகள்
            </span>
            <div className="space-y-6">
              <div>
                <label className="block text-[13px] mb-2 font-medium" style={{ color: 'var(--text-secondary)' }}>எழுத்து அளவு (Font Size)</label>
                <div className="flex border rounded-lg p-2 items-center gap-3 w-full" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)' }}>
                  <button onClick={handleDecreaseFont} disabled={fontSize <= -5} className="p-1 hover:text-[var(--accent-color)] disabled:opacity-50 transition-colors">
                    <Minus size={20} />
                  </button>
                  <input 
                    type="range" 
                    min="-5" max="5" 
                    value={fontSize} 
                    onChange={(e) => setFontSize(parseInt(e.target.value))}
                    className="flex-1 h-1.5 bg-[var(--border-color)] rounded-lg appearance-none cursor-pointer accent-[var(--accent-color)]"
                  />
                  <button onClick={handleIncreaseFont} disabled={fontSize >= 5} className="p-1 hover:text-[var(--accent-color)] disabled:opacity-50 transition-colors">
                    <Plus size={20} />
                  </button>
                  <button onClick={handleResetFont} className="px-3 py-1 text-sm font-bold text-[var(--accent-color)] border-l" style={{ borderColor: 'var(--border-color)' }}>
                    அ
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[13px] mb-2 font-medium" style={{ color: 'var(--text-secondary)' }}>நிறம் (Theme)</label>
                <div className="flex flex-col gap-2">
                  <button onClick={() => setTheme('light')} className={cn("px-4 py-2 text-sm border rounded-lg text-left transition-colors", theme === 'light' ? 'border-[var(--accent-color)] bg-[var(--accent-soft)] text-[var(--accent-color)] font-medium' : 'bg-[var(--card-bg)] hover:bg-black/5')} style={{ borderColor: theme === 'light' ? 'var(--accent-color)' : 'var(--border-color)' }}>Light</button>
                  <button onClick={() => setTheme('sepia')} className={cn("px-4 py-2 text-sm border rounded-lg text-left transition-colors", theme === 'sepia' ? 'border-[#b75e18] font-medium' : 'border-transparent')} style={{ backgroundColor: '#f4e4c1', color: '#5f4b32' }}>Sepia</button>
                  <button onClick={() => setTheme('dark')} className={cn("px-4 py-2 text-sm border rounded-lg text-left transition-colors", theme === 'dark' ? 'border-[#e67e22] font-medium' : 'border-transparent')} style={{ backgroundColor: '#1e293b', color: '#e2e8f0' }}>Dark</button>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <main 
          id="main-scroll-container"
          ref={mainRef}
          onScroll={handleScroll}
          className="flex-1 overflow-x-hidden overflow-y-auto relative scroll-smooth bg-pulli-pattern"
        >
          <div className="w-full shrink-0 h-[72px] lg:h-[80px]" />
          
          {/* Subtle spinning background kolam watermark */}
          <div className="fixed -bottom-64 -right-64 w-[900px] h-[900px] pointer-events-none opacity-[0.02] dark:opacity-[0.04] text-[var(--accent-color)] z-0">
            <DecorativeKolam className="w-full h-full animate-[spin_120s_linear_infinite]" />
          </div>

          <div className="flex-1 flex flex-col min-h-full">
            <div className="p-4 sm:p-6 md:p-10 max-w-5xl mx-auto w-full relative z-10 antialiased flex-1">
              {children}
            </div>
            
            {/* Disclaimer Footer visible on every page */}
            <div className={`w-full py-6 px-4 mt-auto border-t text-center relative z-10 ${getFontSizeClass(fontSize, 'subtext')}`} style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-color)' }}>
              <p className="opacity-80 max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                While we strive to bring you the best experience, errors could creep in. Please contact us if you find any and help us fix it using the <Link to="/contact" className="underline hover:text-[var(--accent-color)] transition-colors">Contact Us</Link> section.
              </p>
            </div>
          </div>
        </main>
      </div>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}
