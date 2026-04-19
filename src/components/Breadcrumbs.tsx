import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { getFontSizeClass } from '../lib/fontSize';

export default function Breadcrumbs({ items }: { items: { label: string, href?: string }[] }) {
  const { fontSize } = useSettings();
  const textSizeClass = getFontSizeClass(fontSize, 'ui');

  return (
    <nav className={`flex items-center space-x-2 ${textSizeClass} opacity-70 mb-6 overflow-x-auto whitespace-nowrap pb-2`} style={{ color: 'var(--text-secondary)' }}>
      <Link to="/" className="hover:opacity-100 flex items-center transition-opacity" style={{ color: 'var(--text-color)' }}>
        <Home size={16} className="mr-1" /> முகப்பு
      </Link>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight size={16} className="opacity-50 flex-shrink-0" />
          {item.href ? (
            <Link to={item.href} className="hover:opacity-100 truncate transition-opacity" style={{ color: 'var(--text-color)' }}>
              {item.label}
            </Link>
          ) : (
            <span className="font-semibold truncate" style={{ color: 'var(--text-color)' }}>{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
