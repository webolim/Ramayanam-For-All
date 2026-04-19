import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from 'lucide-react';
import { pravachanaRoopaRamayanam } from '../data/content';
import { getFontSizeClass } from '../lib/fontSize';
import { useSettings } from '../context/SettingsContext';
import Breadcrumbs from '../components/Breadcrumbs';

export default function PravachanamView() {
  const { id } = useParams();
  const { fontSize } = useSettings();
  const [showHeader, setShowHeader] = useState(true);
  const [showWidget, setShowWidget] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const [targetParagraph, setTargetParagraph] = useState<number | null>(null);

  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const widgetTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const targetTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const paragraphRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    const mainEl = document.getElementById('main-scroll-container');
    if (!mainEl) return;

    const handleScroll = () => {
      const scrollTop = mainEl.scrollTop;
      const scrollHeight = mainEl.scrollHeight;
      const clientHeight = mainEl.clientHeight;
      
      setShowHeader(true);
      setShowWidget(true);

      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      if (widgetTimeoutRef.current) clearTimeout(widgetTimeoutRef.current);

      if (scrollTop > 100) {
        scrollTimeoutRef.current = setTimeout(() => setShowHeader(false), 1500);
      }
      
      widgetTimeoutRef.current = setTimeout(() => setShowWidget(false), 3000);

      const calculatedProgress = Math.min(100, Math.max(0, (scrollTop / (scrollHeight - clientHeight)) * 100));
      setProgress(isNaN(calculatedProgress) ? 0 : calculatedProgress);

      const mainRect = mainEl.getBoundingClientRect();
      const readingLine = mainRect.top + 140;

      let currentIdx = 0;
      for (let i = 0; i < paragraphRefs.current.length; i++) {
        const p = paragraphRefs.current[i];
        if (p) {
          const rect = p.getBoundingClientRect();
          if (rect.bottom > readingLine + 20) {
            currentIdx = i;
            break;
          }
        }
      }
      setCurrentParagraph(currentIdx);
    };

    mainEl.addEventListener('scroll', handleScroll);
    return () => {
      mainEl.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      if (widgetTimeoutRef.current) clearTimeout(widgetTimeoutRef.current);
      if (targetTimeoutRef.current) clearTimeout(targetTimeoutRef.current);
    };
  }, []);

  const currentIndex = pravachanaRoopaRamayanam.findIndex(p => p.id === id);
  const item = pravachanaRoopaRamayanam[currentIndex];

  if (!item || currentIndex === -1) return <div>பகுதி காணப்படவில்லை</div>;

  const prevItem = currentIndex > 0 ? pravachanaRoopaRamayanam[currentIndex - 1] : null;
  const nextItem = currentIndex < pravachanaRoopaRamayanam.length - 1 ? pravachanaRoopaRamayanam[currentIndex + 1] : null;

  const scrollToParagraph = (idx: number) => {
    if (idx >= 0 && idx < item.content.length) {
      const el = paragraphRefs.current[idx];
      const mainEl = document.getElementById('main-scroll-container');
      if (el && mainEl) {
        setTargetParagraph(idx);
        if (targetTimeoutRef.current) clearTimeout(targetTimeoutRef.current);
        targetTimeoutRef.current = setTimeout(() => setTargetParagraph(null), 2500);
        
        const mainRect = mainEl.getBoundingClientRect();
        const elRect = el.getBoundingClientRect();
        const targetTop = mainEl.scrollTop + elRect.top - mainRect.top - 140;
        
        mainEl.scrollTo({ top: targetTop, behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 relative">
        <div className="max-w-3xl mx-auto mb-4">
          <Breadcrumbs items={[
            { label: 'பிரவசன ரூப ராமாயணம்', href: '/pravachanam' },
            { label: `பகுதி ${item.number}` }
          ]} />
        </div>

      <header 
        className={`relative -mx-4 sm:-mx-6 md:-mx-10 px-4 sm:px-6 md:px-10 mb-8 pt-4 pb-4 sticky z-30 transition-all duration-500 ease-in-out top-[72px] lg:top-[80px] ${showHeader ? 'translate-y-0 opacity-100' : '-translate-y-[150%] opacity-0 pointer-events-none'}`}
      >
        <div className="absolute inset-0 -left-[100vw] -right-[100vw] border-b backdrop-blur-md" style={{ backgroundColor: 'var(--header-bg)', opacity: 0.85, borderColor: 'var(--border-color)', zIndex: -1 }}></div>
        <div className="max-w-3xl mx-auto flex items-center justify-between relative z-10">
          <div className="w-10 sm:w-12 flex justify-start">
            {prevItem && (
              <Link to={`/pravachanam/${prevItem.id}`} className="p-2 -ml-2 rounded-full hover:bg-[var(--accent-soft)] transition-colors" style={{ color: 'var(--accent-color)' }}>
                <ChevronLeft size={24} />
              </Link>
            )}
          </div>
          <div className="text-center flex-1 px-4">
            <div className="font-bold mb-1 tracking-widest uppercase text-[14px] sm:text-[16px]" style={{ color: 'var(--accent-color)' }}>
              பகுதி {item.number}
            </div>
            <h1 className={`${getFontSizeClass(fontSize, 'h1')} font-serif font-bold leading-tight`} style={{ color: 'var(--text-color)' }}>
              {item.title}
            </h1>
          </div>
          <div className="w-10 sm:w-12 flex justify-end">
            {nextItem && (
              <Link to={`/pravachanam/${nextItem.id}`} className="p-2 -mr-2 rounded-full hover:bg-[var(--accent-soft)] transition-colors" style={{ color: 'var(--accent-color)' }}>
                <ChevronRight size={24} />
              </Link>
            )}
          </div>
        </div>
      </header>

      <article 
        className="max-w-3xl mx-auto select-none"
        onContextMenu={(e) => e.preventDefault()}
        onCopy={(e) => e.preventDefault()}
        onCut={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
        style={{ WebkitUserSelect: 'none', userSelect: 'none' }}
      >
        <div className="space-y-8">
          {item.shloka && (
            <div className="p-6 rounded-xl text-center border" style={{ backgroundColor: 'var(--sidebar-bg)', borderColor: 'var(--border-color)' }}>
              <p className={`${getFontSizeClass(fontSize, 'h2')} font-bold leading-loose`} style={{ color: 'var(--accent-color)' }}>
                {item.shloka}
              </p>
            </div>
          )}

          <div className={`${getFontSizeClass(fontSize)} space-y-6 leading-[2.2] opacity-90 relative`}>
            {item.content.map((paragraph, idx) => (
              <div key={idx} className="relative">
                <p 
                  ref={el => paragraphRefs.current[idx] = el}
                  className="text-left md:text-justify hyphens-auto transition-colors px-3 py-2 sm:px-4 sm:py-3 -mx-3 sm:-mx-4 rounded-2xl"
                  style={{
                    backgroundColor: targetParagraph === idx ? 'var(--accent-soft)' : 'transparent',
                    transitionDuration: targetParagraph === idx ? '0ms' : '1000ms'
                  }}
                >
                  {paragraph}
                </p>
              </div>
            ))}
          </div>
        </div>

        <nav className="mt-16 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: 'var(--border-color)' }}>
          {prevItem ? (
            <Link
              to={`/pravachanam/${prevItem.id}`}
              className="w-full sm:flex-1 sm:max-w-[45%] flex items-center gap-3 p-4 rounded-xl border transition-colors hover:shadow-md"
              style={{ backgroundColor: 'var(--sidebar-bg)', borderColor: 'var(--border-color)' }}
            >
              <ChevronLeft size={20 + (fontSize * 2)} className="shrink-0" style={{ color: 'var(--accent-color)' }} />
              <div className="flex-1 text-left">
                <div className={`${getFontSizeClass(fontSize, 'ui')} opacity-50 uppercase tracking-wider font-semibold mb-1`}>முந்தைய பகுதி</div>
                <div className={`${getFontSizeClass(fontSize, 'subtext')} font-medium line-clamp-1`}>{prevItem.title}</div>
              </div>
            </Link>
          ) : (
            <div className="hidden sm:block sm:flex-1"></div>
          )}

          {nextItem ? (
            <Link
              to={`/pravachanam/${nextItem.id}`}
              className="w-full sm:flex-1 sm:max-w-[45%] flex items-center gap-3 p-4 rounded-xl border transition-colors hover:shadow-md text-right"
              style={{ backgroundColor: 'var(--sidebar-bg)', borderColor: 'var(--border-color)' }}
            >
              <div className="flex-1">
                <div className={`${getFontSizeClass(fontSize, 'ui')} opacity-50 uppercase tracking-wider font-semibold mb-1`}>அடுத்த பகுதி</div>
                <div className={`${getFontSizeClass(fontSize, 'subtext')} font-medium line-clamp-1`}>{nextItem.title}</div>
              </div>
              <ChevronRight size={20 + (fontSize * 2)} className="shrink-0" style={{ color: 'var(--accent-color)' }} />
            </Link>
          ) : (
            <div className={`w-full sm:flex-1 text-center sm:text-right py-4 ${getFontSizeClass(fontSize, 'subtext')}`}>
              <Link to="/pravachanam" className="font-medium hover:underline" style={{ color: 'var(--accent-color)' }}>
                பட்டியலுக்குத் திரும்பு
              </Link>
            </div>
          )}
        </nav>
      </article>
      </div>

      {/* Floating Scroll & Paragraph Navigation */}
      <div 
        className={`fixed bottom-8 right-6 sm:right-8 z-50 transition-all duration-500 pointer-events-none lg:scale-150 lg:origin-bottom-right ${showWidget ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="flex flex-col items-center gap-1.5 px-2 py-3 rounded-full border shadow-lg backdrop-blur-md pointer-events-auto" style={{ backgroundColor: 'var(--card-bg)', opacity: 0.95, borderColor: 'var(--border-color)', color: 'var(--text-color)' }}>
          <button 
            disabled={currentParagraph === 0} 
            onClick={() => scrollToParagraph(currentParagraph - 1)}
            className="p-1.5 lg:p-2 rounded-full hover:bg-[var(--accent-soft)] disabled:opacity-30 disabled:hover:bg-transparent transition-colors flex items-center justify-center"
            style={{ color: 'var(--accent-color)' }}
            aria-label="Previous paragraph"
          >
            <ChevronUp size={20} className="w-5 h-5 lg:w-6 lg:h-6" />
          </button>
          <div className="text-[11px] lg:text-[14px] font-bold text-center leading-none py-1" style={{ color: 'var(--text-secondary)' }}>
            {Math.round(progress)}%
          </div>
          <button 
            disabled={currentParagraph === item.content.length - 1} 
            onClick={() => scrollToParagraph(currentParagraph + 1)}
            className="p-1.5 lg:p-2 rounded-full hover:bg-[var(--accent-soft)] disabled:opacity-30 disabled:hover:bg-transparent transition-colors flex items-center justify-center"
            style={{ color: 'var(--accent-color)' }}
            aria-label="Next paragraph"
          >
            <ChevronDown size={20} className="w-5 h-5 lg:w-6 lg:h-6" />
          </button>
        </div>
      </div>
    </>
  );
}
