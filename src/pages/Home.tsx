import React from 'react';
import { Link } from 'react-router-dom';
import { kandams } from '../data/content';
import { getFontSizeClass } from '../lib/fontSize';
import { useSettings } from '../context/SettingsContext';
import { DecorativeKolam, KolamDivider, PulliCard, PulliCorner } from '../components/Kolam';

export default function Home() {
  const { fontSize } = useSettings();
  
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 flex flex-col items-center text-center">
      <div className={`${getFontSizeClass(fontSize, 'ui')} mb-8 tracking-widest uppercase font-semibold`} style={{ color: 'var(--text-secondary)' }}>
        முகப்பு &nbsp;•&nbsp; தொகுப்புகள்
      </div>
      
      <div className="flex justify-center mb-6 opacity-60" style={{ color: 'var(--secondary-color)' }}>
        <DecorativeKolam className="w-14 h-14" />
      </div>

      <h1 className={`font-serif ${getFontSizeClass(fontSize, 'h1')} mb-6 font-bold leading-tight`} style={{ color: 'var(--text-color)' }}>
        வால்மீகி ராமாயணம்
      </h1>
      
      <p className={`${getFontSizeClass(fontSize, 'subtext')} leading-[1.8] max-w-[650px] mb-12`} style={{ color: 'var(--text-secondary)' }}>
        ஸ்ரீ ராமாயண மாமா அவர்களின் தமிழ் விளக்க உரையுடன் கூடிய முழுமையான டிஜிட்டல் தொகுப்பு. எளிய தமிழில் பக்தி இலக்கியத்தின் சாரத்தை உணர இங்கே தொடங்குங்கள்.
      </p>

      {/* Introduction Section */}
      <div 
        className="w-full max-w-5xl mx-auto mb-16 p-8 md:p-10 rounded-[2rem] border shadow-sm flex flex-col items-center text-center gap-6" 
        style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
      >
        <div className={`inline-block px-3 py-1 mt-2 rounded-full ${getFontSizeClass(fontSize, 'ui')} font-bold tracking-widest uppercase`} style={{ backgroundColor: 'var(--secondary-soft)', color: 'var(--secondary-color)' }}>
          அர்ப்பணம்
        </div>
        <div className="w-48 h-48 md:w-56 md:h-56 shrink-0 rounded-full overflow-hidden border-8 shadow-sm relative z-10 mx-auto" style={{ borderColor: 'var(--bg-color)' }}>
          <img 
            src="https://raw.githubusercontent.com/webolim/rama/refs/heads/main/Ramayana-Mama.webp" 
            alt="Sri Ramayana Mama"
            className="w-full h-full object-cover sepia-[.3] hover:sepia-0 transition-all duration-500"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 flex flex-col items-center">
          <h2 className={`font-serif ${getFontSizeClass(fontSize, 'h2')} font-bold mb-4`} style={{ color: 'var(--text-color)' }}>
            ஸ்ரீ ராமாயண மாமா
          </h2>
          <p className={`leading-[1.9] max-w-3xl ${getFontSizeClass(fontSize)}`} style={{ color: 'var(--text-secondary)' }}>
            இந்த வலைத்தளத்தின் முக்கிய நோக்கம் 'ஸ்ரீ ராமாயண மாமா' என அன்புடன் அழைக்கப்படும் திரு. ரங்கநாத் அவர்களின் அரிய தமிழ் விளக்கவுரைகளை அடுத்த தலைமுறைக்குக் கொண்டு சேர்ப்பதே ஆகும். பல ஆண்டுகளாக அவர் நிகழ்த்திய ராமாயண ப்ரவசனங்களை எழுத்து வடிவில் அனைவரும் எளிமையாகப் படித்து, ராம பக்தியையும், வால்மீகி முனிவரின் தத்துவங்களையும் உணர வேண்டும் என்பதே இந்த எண்ணத்தின் ஆணிவேர்.
          </p>
        </div>
      </div>

      <div className="w-full text-left grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {kandams.map((kandam, idx) => (
          <Link
            key={kandam.id}
            to={`/kandams/${kandam.id}`}
            className="block h-full p-6 sm:p-8 rounded-[1.25rem] border relative cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group"
            style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
          >
            <span className="font-serif text-[64px] absolute top-1 right-5 font-bold select-none opacity-5 transition-opacity group-hover:opacity-10 pointer-events-none" style={{ color: 'var(--text-color)' }}>
              {String(idx + 1).padStart(2, '0')}
            </span>
            <div className={`${getFontSizeClass(fontSize, 'h2')} font-bold mb-3 group-hover:text-[var(--accent-color)] transition-colors relative z-10`} style={{ color: 'var(--text-color)' }}>
              {kandam.name}
            </div>
            <div className={`${getFontSizeClass(fontSize)} uppercase tracking-wider font-semibold relative z-10`} style={{ color: 'var(--text-secondary)' }}>
              {kandam.sargas.length} சர்க்கங்கள்
            </div>
          </Link>
        ))}

        <Link
          to="/pravachanam"
          className="col-span-1 sm:col-span-2 lg:col-span-3 block rounded-[1.25rem] border p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between relative overflow-hidden transition-transform hover:-translate-y-1 mt-2"
          style={{ backgroundColor: 'var(--accent-color)', borderColor: 'var(--border-color)', color: 'white' }}
        >
          <div className="relative z-10">
            <span className={`inline-block px-3.5 py-1.5 rounded-full ${getFontSizeClass(fontSize, 'ui')} uppercase font-semibold tracking-wider mb-2`} style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
              சிறப்புப் பிரிவு
            </span>
            <div className={`${getFontSizeClass(fontSize, 'h2')} font-serif font-bold mb-1`}>
              ப்ரவசன ரூப ராமாயணம்
            </div>
            <div className={`${getFontSizeClass(fontSize, 'subtext')} opacity-70`}>
              சமஸ்கிருத ஸ்லோகங்களுடன் கூடிய விரிவான விளக்கம்
            </div>
          </div>
          <div className={`mt-6 md:mt-0 px-6 py-2.5 rounded-lg ${getFontSizeClass(fontSize, 'subtext')} font-medium transition-colors hover:bg-white/10 relative z-10`} style={{ border: '1px solid rgba(255,255,255,0.3)' }}>
            வாசிக்கத் தொடங்கவும்
          </div>
        </Link>
      </div>

      {/* Credits Section */}
      <div className="w-full max-w-4xl mx-auto mb-16 px-6 sm:px-10 text-center relative pt-12 border-t" style={{ borderColor: 'var(--border-color)' }}>
        <h3 className={`font-serif ${getFontSizeClass(fontSize, 'h2')} font-bold mb-6`} style={{ color: 'var(--text-color)' }}>
          பங்களித்தவர்கள் (Credits)
        </h3>
        <p className={`leading-[1.9] max-w-3xl mx-auto ${getFontSizeClass(fontSize)}`} style={{ color: 'var(--text-secondary)' }}>
          மதிப்பிற்குரிய <strong>டாக்டர். ரங்கன்ஜி</strong> அவர்களின் தலைமையின் கீழ், ஸ்ரீ ராமாயண மாமா அவர்களின் கையெழுத்துப் பிரதிகளை டிஜிட்டல் வடிவில் மாற்றி இந்தத் தளம் உருவாக முக்கியக் காரணமாக இருந்த <strong>திருமதி. கலா ரவி ராமன்</strong> அவர்களுக்கு எங்கள் மனமார்ந்த நன்றிகளைத் தெரிவித்துக் கொள்கிறோம்.
        </p>
        <p className={`mt-4 leading-[1.8] max-w-3xl mx-auto ${getFontSizeClass(fontSize, 'subtext')} opacity-80`} style={{ color: 'var(--text-secondary)' }}>
          Under the valuable leadership of <strong>Dr. Ranganji</strong>, we express our heartfelt gratitude to <strong>Smt. Kala Ravi Raman</strong>, whose immense contribution of converting and digitizing the handwritten Tamil Ramayana and works of Sri Ramayana Mama made this project possible.
        </p>
      </div>
    </div>
  );
}
