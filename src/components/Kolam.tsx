import React from 'react';
import { cn } from '../lib/utils';

export function DecorativeKolam({ className }: { className?: string }) {
  return (
    <svg
      className={cn("text-current", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 63.24 63.24"
    >
      <g className="text-[var(--accent-color)]" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2.11px">
        <path d="M9.04,23.64h0c4.41,0,7.98,3.58,7.98,7.98v7.98h-7.98c-4.41,0-7.98-3.58-7.98-7.98h0c0-4.41,3.58-7.98,7.98-7.98Z" transform="translate(-19.71 15.65) rotate(-45)"/>
        <rect x="23.64" y="23.64" width="15.97" height="15.97" transform="translate(-13.1 31.62) rotate(-45)"/>
        <path d="M31.62,1.05h7.98v7.98c0,4.41-3.58,7.98-7.98,7.98h0c-4.41,0-7.98-3.58-7.98-7.98h0c0-4.41,3.58-7.98,7.98-7.98Z" transform="translate(60.37 -6.93) rotate(135)"/>
        <path d="M54.2,23.64h0c4.41,0,7.98,3.58,7.98,7.98v7.98h-7.98c-4.41,0-7.98-3.58-7.98-7.98h0c0-4.41,3.58-7.98,7.98-7.98Z" transform="translate(114.89 15.65) rotate(135)"/>
        <path d="M31.62,46.22h7.98v7.98c0,4.41-3.58,7.98-7.98,7.98h0c-4.41,0-7.98-3.58-7.98-7.98h0c0-4.41,3.58-7.98,7.98-7.98Z" transform="translate(-29.07 38.23) rotate(-45)"/>
      </g>
      <g className="text-[var(--secondary-color)]" fill="currentColor">
        <circle cx="8.89" cy="8.89" r="1.48"/>
        <circle cx="8.89" cy="54.35" r="1.48"/>
        <circle cx="8.89" cy="31.62" r="1.48"/>
        <circle cx="31.62" cy="8.89" r="1.48"/>
        <circle cx="31.62" cy="54.35" r="1.48"/>
        <circle cx="31.62" cy="31.62" r="1.48"/>
        <circle cx="54.35" cy="8.89" r="1.48"/>
        <circle cx="54.35" cy="54.35" r="1.48"/>
        <circle cx="54.35" cy="31.62" r="1.48"/>
      </g>
    </svg>
  );
}

export function KolamDivider({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center opacity-30 my-8", className)}>
      <div className="flex-1 h-px bg-current"></div>
      <DecorativeKolam className="w-8 h-8 mx-4" />
      <div className="flex-1 h-px bg-current"></div>
    </div>
  );
}

// ------------------------------------------------------------------
// PULLI KOLAM DESIGN SYSTEM COMPONENTS
// ------------------------------------------------------------------

export function PulliCorner({ className }: { className?: string }) {
  return (
    <div className={cn(`absolute z-0 pointer-events-none transition-opacity duration-500`, className)}>
       {/* Classic Padi / Geometric Pulli Kolam (Straight Lines) */}
      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-full h-full">
        {/* 9 Pulli (Dots) in a 3x3 Grid */}
        <g className="text-[var(--secondary-color)]" fill="currentColor" stroke="none">
          <circle cx="20" cy="20" r="4.5" />
          <circle cx="50" cy="20" r="4.5" />
          <circle cx="80" cy="20" r="4.5" />
          <circle cx="20" cy="50" r="4.5" />
          <circle cx="50" cy="50" r="4.5" />
          <circle cx="80" cy="50" r="4.5" />
          <circle cx="20" cy="80" r="4.5" />
          <circle cx="50" cy="80" r="4.5" />
          <circle cx="80" cy="80" r="4.5" />
        </g>

        {/* Straight Lines (Padi/Geometric Kolam) */}
        <g className="text-[var(--accent-color)]" strokeLinecap="square" strokeLinejoin="miter" strokeWidth="3">
          <rect x="20" y="20" width="60" height="60" />
          <polygon points="50,20 80,50 50,80 20,50" />
        </g>
      </svg>
    </div>
  );
}

export function PulliCard({ children, className, style }: { children: React.ReactNode, className?: string, style?: React.CSSProperties }) {
  return (
    <div 
      className={cn("relative p-2 sm:p-3 rounded-[2rem] border shadow-sm transition-all duration-300", className)}
      style={{ backgroundColor: 'var(--secondary-soft)', borderColor: 'var(--border-color)', ...style }}
    >
      <div 
        className="relative w-full h-full p-6 md:p-8 rounded-[1.25rem] border overflow-hidden"
        style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
      >
        <PulliCorner className="-top-10 -left-10 w-32 h-32 opacity-15" />
        <PulliCorner className="-bottom-10 -right-10 w-32 h-32 opacity-15" />
        
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
}

/** 
 * Wraps content with a full-bleed subtle dot kolam background 
 */
export function PulliBackground({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn("relative w-full h-full", className)}>
      <div className="absolute inset-0 bg-pulli-pattern pointer-events-none z-0 opacity-50"></div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
