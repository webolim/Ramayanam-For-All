import React from 'react';
import { Link } from 'react-router-dom';
import { kandams } from '../data/content';
import { getFontSizeClass } from '../lib/fontSize';
import { useSettings } from '../context/SettingsContext';
import Breadcrumbs from '../components/Breadcrumbs';

export default function KandamsList() {
  const { fontSize } = useSettings();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Breadcrumbs items={[{ label: 'காண்டங்கள்' }]} />
      
      <div>
        <h1 className={`${getFontSizeClass(fontSize, 'h1')} font-serif font-bold mb-4`} style={{ color: 'var(--text-color)' }}>
          காண்டங்கள்
        </h1>
        <p className={`${getFontSizeClass(fontSize)} opacity-70 leading-relaxed`} style={{ color: 'var(--text-secondary)' }}>
          வால்மீகி முனிவரால் இயற்றப்பட்ட ராமாயணத்தின் ஆறு காண்டங்களின் தமிழ் விளக்கவுரை.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {kandams.map((kandam, idx) => (
          <Link
            key={kandam.id}
            to={`/kandams/${kandam.id}`}
            className="group block p-6 rounded-2xl border relative cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
          >
            <span className="font-serif text-[48px] absolute top-1 right-4 font-bold select-none opacity-5 transition-opacity group-hover:opacity-10 pointer-events-none" style={{ color: 'var(--text-color)' }}>
              {String(idx + 1).padStart(2, '0')}
            </span>
            <h2 className={`${getFontSizeClass(fontSize, 'h2')} font-bold mb-3 group-hover:text-[var(--accent-color)] transition-colors`} style={{ color: 'var(--text-color)' }}>
              {kandam.name}
            </h2>
            <p className={`${getFontSizeClass(fontSize)} opacity-70 line-clamp-3 leading-relaxed`} style={{ color: 'var(--text-secondary)' }}>
              {kandam.description}
            </p>
            <div className={`mt-4 ${getFontSizeClass(fontSize, 'ui')} uppercase tracking-wider font-semibold`} style={{ color: 'var(--text-secondary)' }}>
              {kandam.sargas.length > 0 ? `${kandam.sargas.length} சர்க்கங்கள்` : 'விரைவில்...'}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
