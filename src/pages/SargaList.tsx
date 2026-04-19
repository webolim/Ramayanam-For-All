import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { kandams } from '../data/content';
import { getFontSizeClass } from '../lib/fontSize';
import { useSettings } from '../context/SettingsContext';
import Breadcrumbs from '../components/Breadcrumbs';

export default function SargaList() {
  const { kandamId } = useParams();
  const { fontSize } = useSettings();
  
  const kandam = kandams.find(k => k.id === kandamId);

  if (!kandam) return <div>காண்டம் காணப்படவில்லை</div>;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Breadcrumbs items={[
        { label: '6 காண்டங்கள்', href: '/kandams' },
        { label: kandam.name }
      ]} />

      <div>
        <h1 className={`${getFontSizeClass(fontSize, 'h1')} font-serif font-bold mb-4`} style={{ color: 'var(--text-color)' }}>
          {kandam.name}
        </h1>
        <p className={`${getFontSizeClass(fontSize)} leading-relaxed max-w-3xl`} style={{ color: 'var(--text-secondary)' }}>
          {kandam.description}
        </p>
      </div>

      {kandam.sargas.length === 0 ? (
        <div className="p-8 text-center border rounded-2xl" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)' }}>
          <p className={getFontSizeClass(fontSize)} style={{ color: 'var(--text-secondary)' }}>சர்க்கங்கள் விரைவில் இணைக்கப்படும்...</p>
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className={`${getFontSizeClass(fontSize, 'h2')} font-bold mb-4 border-b pb-2`} style={{ borderColor: 'var(--border-color)', color: 'var(--text-color)' }}>
            சர்க்கங்கள் ({kandam.sargas.length})
          </h2>
          <div className="grid gap-3">
            {kandam.sargas.map((sarga) => (
              <Link
                key={sarga.id}
                to={`/kandams/${kandam.id}/sarga/${sarga.id}`}
                className="p-4 rounded-xl flex items-center justify-between border transition-colors hover:border-[var(--accent-color)]"
                style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold font-serif text-[var(--accent-color)]" style={{ backgroundColor: 'var(--accent-soft)' }}>
                    {sarga.number}
                  </div>
                  <h3 className={`${getFontSizeClass(fontSize)} font-medium`} style={{ color: 'var(--text-color)' }}>{sarga.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
