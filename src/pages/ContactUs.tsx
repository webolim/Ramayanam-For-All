import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFontSizeClass } from '../lib/fontSize';
import { useSettings } from '../context/SettingsContext';
import Breadcrumbs from '../components/Breadcrumbs';

export default function ContactUs() {
  const { fontSize } = useSettings();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResult(null);

    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    // Uses the API key from environment variables, or a fallback if not set.
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "YOUR_ACCESS_KEY_HERE";
    formData.append("access_key", accessKey);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        formElement.reset();
        navigate('/contact/success');
      } else {
        console.error("Error", data);
        setResult({ type: 'error', message: data.message || "மன்னிக்கவும், பிழை ஏற்பட்டுள்ளது. மீண்டும் முயற்சிக்கவும். (Sorry, an error occurred.)" });
      }
    } catch (error) {
      console.error("Error", error);
      setResult({ type: 'error', message: "மன்னிக்கவும், பிழை ஏற்பட்டுள்ளது. மீண்டும் முயற்சிக்கவும். (Sorry, an error occurred.)" });
    }
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Breadcrumbs items={[{ label: 'தொடர்புக்கு' }]} />
      
      <div>
        <h1 className={`${getFontSizeClass(fontSize, 'h1')} font-serif font-bold mb-4`} style={{ color: 'var(--text-color)' }}>
          தொடர்புக்கு
        </h1>
        <p className={`${getFontSizeClass(fontSize)} opacity-70 leading-relaxed max-w-3xl`} style={{ color: 'var(--text-secondary)' }}>
          எங்கள் இணையதளம் மற்றும் சேவைகள் குறித்த சந்தேகங்கள் அல்லது கருத்துகளைப் பகிர்ந்துகொள்ள எங்களைத் தொடர்பு கொள்ளவும். பிழைகளைச் சுட்டிக்காட்ட விரும்பினால், நீங்கள் ஸ்கிரீன்ஷாட் (screenshot) ஒன்றையும் இணைக்கலாம்.
        </p>
      </div>

      <div className="p-6 md:p-10 rounded-[1.25rem] border shadow-sm" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
        
        <form onSubmit={onSubmit} className="space-y-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className={`block font-medium ${getFontSizeClass(fontSize, 'subtext')}`} style={{ color: 'var(--text-color)' }}>
                பெயர் (Name)
              </label>
              <input type="text" name="name" id="name" required
                className={`w-full p-3.5 rounded-[0.75rem] border bg-transparent ${getFontSizeClass(fontSize)} outline-none transition-colors focus:border-[var(--accent-color)]`}
                style={{ borderColor: 'var(--border-color)', color: 'var(--text-color)' }}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className={`block font-medium ${getFontSizeClass(fontSize, 'subtext')}`} style={{ color: 'var(--text-color)' }}>
                மின்னஞ்சல் (Email)
              </label>
              <input type="email" name="email" id="email" required
                className={`w-full p-3.5 rounded-[0.75rem] border bg-transparent ${getFontSizeClass(fontSize)} outline-none transition-colors focus:border-[var(--accent-color)]`}
                style={{ borderColor: 'var(--border-color)', color: 'var(--text-color)' }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className={`block font-medium ${getFontSizeClass(fontSize, 'subtext')}`} style={{ color: 'var(--text-color)' }}>
              செய்தி (Message)
            </label>
            <textarea name="message" id="message" required rows={5}
              className={`w-full p-3.5 rounded-[0.75rem] border bg-transparent ${getFontSizeClass(fontSize)} outline-none transition-colors focus:border-[var(--accent-color)] resize-y`}
              style={{ borderColor: 'var(--border-color)', color: 'var(--text-color)' }}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="attachment" className={`block font-medium ${getFontSizeClass(fontSize, 'subtext')}`} style={{ color: 'var(--text-color)' }}>
              படம் / ஸ்கிரீன்ஷாட் இணைக்க (Attach a screenshot, optional)
            </label>
            <input type="file" name="attachment" id="attachment" accept="image/*, application/pdf"
              className={`w-full p-3 rounded-[0.75rem] border bg-transparent ${getFontSizeClass(fontSize)} outline-none transition-colors focus:border-[var(--accent-color)] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[var(--accent-soft)] file:text-[var(--accent-color)] hover:file:bg-opacity-80 cursor-pointer`}
              style={{ borderColor: 'var(--border-color)', color: 'var(--text-color)' }}
            />
            <p className={`text-sm opacity-60 mt-1.5`} style={{ color: 'var(--text-secondary)' }}>
              Max file size: 10MB (Images or PDF)
            </p>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`w-full md:w-auto px-10 py-3.5 rounded-full font-bold transition-opacity hover:opacity-90 disabled:opacity-50 ${getFontSizeClass(fontSize)} flex items-center justify-center gap-2`}
            style={{ backgroundColor: 'var(--accent-color)', color: 'white' }}
          >
            {isSubmitting ? 'அனுப்பப்படுகிறது...' : 'அனுப்புக (Submit)'}
          </button>

          {result && result.type === 'error' && (
            <div 
              className={`mt-4 p-5 rounded-[0.75rem] font-medium ${getFontSizeClass(fontSize, 'subtext')} border`} 
              style={{ 
                backgroundColor: '#fde8e8', 
                color: '#9b1c1c',
                borderColor: '#f8b4b4'
              }}
            >
              {result.message}
            </div>
          )}
        </form>

        <div className="pt-8 border-t" style={{ borderColor: 'var(--border-color)' }}>
          <h2 className={`${getFontSizeClass(fontSize, 'h2')} font-bold mb-4`} style={{ color: 'var(--text-color)' }}>
            நேரடி மின்னஞ்சல்
          </h2>
          <p className={`${getFontSizeClass(fontSize)} mb-4`} style={{ color: 'var(--text-secondary)' }}>
            நீங்கள் நேரடியாகவும் பின்வரும் முகவரிக்கு மின்னஞ்சல் அனுப்பலாம்:
          </p>
          <a 
            href="mailto:ramayanamforall@gmail.com" 
            className={`${getFontSizeClass(fontSize)} font-medium underline inline-block transition-colors hover:text-opacity-80`}
            style={{ color: 'var(--accent-color)' }}
          >
            ramayanamforall@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
}
