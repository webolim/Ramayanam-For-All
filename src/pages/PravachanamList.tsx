import React from 'react';
import { Link } from 'react-router-dom';
import { pravachanaRoopaRamayanam } from '../data/content';
import { getFontSizeClass } from '../lib/fontSize';
import { useSettings } from '../context/SettingsContext';
import Breadcrumbs from '../components/Breadcrumbs';

export default function PravachanamList() {
  const { fontSize } = useSettings();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Breadcrumbs items={[{ label: 'பிரவசன ரூப ராமாயணம்' }]} />
      
      <div>
        <h1 className={`${getFontSizeClass(fontSize, 'h1')} font-serif font-bold mb-4`} style={{ color: 'var(--text-color)' }}>
          பிரவசன ரூப ராமாயணம்
        </h1>
        <p className={`${getFontSizeClass(fontSize)} opacity-70 leading-relaxed max-w-3xl`} style={{ color: 'var(--text-secondary)' }}>
          முக்கிய சமஸ்கிருத ஸ்லோகங்களுடன் அவற்றின் விரிவான தமிழ் விளக்கங்கள். இது ஒரு தொடர் விரிவுரை வடிவில் அமைந்த தொகுப்பாகும்.
        </p>
      </div>

      {pravachanaRoopaRamayanam.length === 0 ? (
        <div className="p-8 text-center border rounded-2xl" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)' }}>
          <p className={getFontSizeClass(fontSize)} style={{ color: 'var(--text-secondary)' }}>பிரவசன ரூப ராமாயணம் விரைவில் இணைக்கப்படும்...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pravachanaRoopaRamayanam.map((item) => (
            <Link
              key={item.id}
              to={`/pravachanam/${item.id}`}
              className="block p-5 rounded-xl border shadow-sm transition-all hover:shadow-md hover:border-[var(--accent-color)]"
              style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
            >
              <div className="flex items-start gap-4">
                 <div className="w-10 h-10 shrink-0 rounded-lg flex items-center justify-center font-bold font-serif text-[var(--accent-color)]" style={{ backgroundColor: 'var(--accent-soft)' }}>
                    {item.number}
                  </div>
                  <div>
                    <h2 className={`${getFontSizeClass(fontSize, 'h2')} font-bold mb-2`} style={{ color: 'var(--text-color)' }}>
                      {item.title}
                    </h2>
                    {item.shloka && (
                      <p className={`${getFontSizeClass(fontSize, 'ui')} font-semibold opacity-60 line-clamp-1 mb-2 font-sans tracking-wide`} style={{ color: 'var(--text-secondary)' }}>
                        {item.shloka}
                      </p>
                    )}
                    <p className={`${getFontSizeClass(fontSize)} opacity-70 line-clamp-2`} style={{ color: 'var(--text-color)' }}>
                      {item.content[0]}
                    </p>
                  </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
