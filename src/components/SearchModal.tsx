import React, { useState, useEffect } from 'react';
import { X, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';
import Sanscript from '@indic-transliteration/sanscript';
import { kandams, pravachanaRoopaRamayanam } from '../data/content';

const engToTamilDict: Record<string, string> = {
  "bala": "பால", "balakandam": "பால காண்டம்", "ayodhya": "அயோத்தியா", "aranya": "ஆரண்ய",
  "kishkindha": "கிஷ்கிந்தா", "sundara": "சுந்தர", "yuddha": "யுத்த", "pravachanam": "பிரவசன",
  "pravachana": "பிரவசன", "roopa": "ரூப", "kandam": "காண்டம்", "kanda": "காண்டம்",
  "sarga": "சர்க்கம்", "sargam": "சர்க்கம்", "chapter": "சர்க்கம்", "rama": "ராம",
  "raman": "ராமர்", "ramar": "ராமர்", "sita": "சீதா", "seetha": "சீதா", "sitai": "சீதை",
  "seethai": "சீதை", "lakshman": "லட்சுமண", "lakshmana": "லட்சுமணன்", "lakshmanan": "லட்சுமணன்",
  "bharata": "பரத", "bharatan": "பரதன்", "shatrughna": "சத்ருக்ன", "shatrughnan": "சத்ருக்னன்",
  "hanuman": "அனுமன்", "anjaneya": "ஆஞ்சநேய", "hanumar": "அனுமார்", "ravana": "ராவண",
  "ravanan": "ராவணன்", "dasaratha": "தசரத", "dasarathan": "தசரதன்", "kousalya": "கௌசல்யா",
  "kaikeyi": "கைகேயி", "sumitra": "சுமித்ரா", "sugriva": "சுக்ரீவ", "sugrivan": "சுக்ரீவன்",
  "vali": "வாலி", "vibhishana": "விபீஷண", "vibhishanan": "விபீஷணன்", "kumbhakarna": "கும்பகர்ண",
  "indrajit": "இந்திரஜித்", "valmiki": "வால்மீகி", "vishwamitra": "விஸ்வாமித்திர", "guha": "குக",
  "guhan": "குகன்", "jatayu": "ஜடாயு", "sampati": "சம்பாதி", "tara": "தாரை", "mandodari": "மண்டோதரி",
  "surpanakha": "சூர்ப்பணகை", "maricha": "மாரீசன்", "lanka": "லங்கை", "vanara": "வானர",
  "vanaran": "வானரன்", "rakshasa": "ராட்சச", "rakshasi": "ராட்சசி", "ayodhyai": "அயோத்தி",
  "mithila": "மிதிலை", "ramayana": "ராமாயண", "ramayanam": "ராமாயணம்"
};

function transliterateQuery(query: string): string {
  const words = query.trim().toLowerCase().split(/\s+/);
  const translated = words.map(w => {
    if (engToTamilDict[w]) return engToTamilDict[w];
    if (/^[a-z]+$/.test(w)) {
      let itrans = w.replace(/th/g, 't').replace(/sh/g, 'S');
      return Sanscript.t(itrans, 'itrans', 'tamil');
    }
    return w;
  });
  return translated.join(' ');
}

// Flatten data for search
const searchData = [
  ...kandams.flatMap(k => 
    k.sargas.map(s => ({
      type: 'sarga',
      title: s.title,
      kandamName: k.name,
      content: s.content.join(' '),
      link: `/kandams/${k.id}/sarga/${s.id}`
    }))
  ),
  ...pravachanaRoopaRamayanam.map(p => ({
    type: 'pravachanam',
    title: p.title,
    kandamName: 'பிரவசன ரூப ராமாயணம்',
    content: p.content.join(' '),
    link: `/pravachanam/${p.id}`
  }))
];

const fuse = new Fuse(searchData, {
  keys: ['title', 'content', 'kandamName'],
  includeScore: true,
  threshold: 0.3,
});

export default function SearchModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [tamilQuery, setTamilQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.trim().length > 1) {
      const transliterated = transliterateQuery(query);
      setTamilQuery(transliterated);

      let searchRes = fuse.search(transliterated);
      if (searchRes.length === 0 && transliterated !== query) {
        searchRes = fuse.search(query);
      }
      setResults(searchRes.slice(0, 10));
    } else {
      setTamilQuery('');
      setResults([]);
    }
  }, [query]);

  // Handle escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        style={{ backgroundColor: 'var(--card-bg)', color: 'var(--text-color)' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="p-5 border-b flex flex-col gap-2" style={{ borderColor: 'var(--border-color)' }}>
          <div className="flex items-center gap-4">
            <SearchIcon className="w-5 h-5 opacity-50" />
            <input
              autoFocus
              type="text"
              placeholder="தேடுக... (Search words, names, chapters)"
              className="flex-1 bg-transparent border-none outline-none text-lg placeholder:opacity-40"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <button onClick={onClose} className="p-1.5 rounded-lg border hover:bg-black/5" style={{ borderColor: 'var(--border-color)' }}>
              <X size={20} />
            </button>
          </div>
          {tamilQuery && tamilQuery !== query.trim().toLowerCase() && (
             <div className="pl-9 pr-4 text-sm font-medium opacity-70" style={{ color: 'var(--accent-color)' }}>
               தமிழில்: {tamilQuery}
             </div>
          )}
        </div>

        <div className="overflow-y-auto flex-1 p-3">
          {query.trim().toLowerCase() === 'aswin' && (
            <div className="mb-2">
              <button
                className="w-full text-left p-4 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 flex items-start gap-4 transition-colors bg-amber-500/10"
                onClick={() => {
                  navigate('/admin');
                  onClose();
                }}
              >
                <div className="mt-1 opacity-50" style={{ color: 'var(--accent-color)' }}>
                  <FileText size={18} />
                </div>
                <div>
                  <div className="font-semibold text-[16px] mb-1 font-serif" style={{ color: 'var(--accent-color)' }}>
                    Admin Center (Secret Link)
                  </div>
                  <div className="text-[12px] uppercase tracking-wider font-semibold opacity-60 mb-2">
                    Manage Content
                  </div>
                </div>
              </button>
            </div>
          )}
          {query.trim().length > 1 && results.length === 0 && query.trim().toLowerCase() !== 'aswin' ? (
            <div className="p-8 text-center opacity-50">
              முடிவுகள் காணப்படவில்லை (No results found)
            </div>
          ) : (
            <ul className="space-y-1">
              {results.map((res, i) => (
                <li key={i}>
                  <button
                    className="w-full text-left p-4 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 flex items-start gap-4 transition-colors"
                    onClick={() => {
                      navigate(res.item.link);
                      onClose();
                    }}
                  >
                    <div className="mt-1 opacity-50">
                      <FileText size={18} />
                    </div>
                    <div>
                      <div className="font-semibold text-[16px] mb-1 font-serif" style={{ color: 'var(--accent-color)' }}>
                        {res.item.title}
                      </div>
                      <div className="text-[12px] uppercase tracking-wider font-semibold opacity-60 mb-2">
                        {res.item.kandamName}
                      </div>
                      <div className="text-[14px] opacity-70 line-clamp-2 leading-relaxed">
                        {res.item.content}
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  );
}
