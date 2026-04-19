import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { getFontSizeClass } from '../lib/fontSize';
import { useSettings } from '../context/SettingsContext';
import Breadcrumbs from '../components/Breadcrumbs';

export default function ContactSuccess() {
  const { fontSize } = useSettings();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Breadcrumbs items={[
        { label: 'தொடர்புக்கு', path: '/contact' },
        { label: 'வெற்றி' }
      ]} />
      
      <div className="flex flex-col items-center justify-center p-8 md:p-16 rounded-[1.25rem] border shadow-sm text-center" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
        <CheckCircle 
          className="w-16 h-16 md:w-20 md:h-20 mb-6" 
          style={{ color: 'var(--accent-color)' }} 
        />
        
        <h1 className={`${getFontSizeClass(fontSize, 'h1')} font-serif font-bold mb-4`} style={{ color: 'var(--text-color)' }}>
          நன்றி! (Thank You!)
        </h1>
        
        <p className={`${getFontSizeClass(fontSize)} opacity-80 leading-relaxed max-w-2xl mb-8 flex flex-col gap-3`} style={{ color: 'var(--text-secondary)' }}>
          <span>உங்கள் செய்தியை வெற்றிகரமாகப் பெற்றுக்கொண்டோம். எங்கள் குழு இதனைப் பரிசீலித்து, தேவைப்பட்டால் உங்களைத் தொடர்புகொள்ளும்.</span>
          <span>(We've successfully received your message! Our team will review your submission and reach out if we need any further details.)</span>
        </p>

        <Link 
          to="/" 
          className={`inline-flex items-center justify-center px-8 py-3.5 rounded-full font-bold transition-opacity hover:opacity-90 ${getFontSizeClass(fontSize)}`}
          style={{ backgroundColor: 'var(--accent-color)', color: 'white' }}
        >
          முகப்புப் பக்கம் திரும்பு (Back to Home)
        </Link>
      </div>
    </div>
  );
}
