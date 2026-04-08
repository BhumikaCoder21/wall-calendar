import React from 'react';
import clsx from 'clsx';

interface Props {
  theme: 'light' | 'dark';
}

export function SpiralBinding({ theme }: Props) {
  const rings = Array.from({ length: 14 });
  return (
    <div className="relative flex justify-center items-center gap-3 py-1.5 z-20">
      {rings.map((_, i) => (
        <div
          key={i}
          className={clsx(
            'w-5 h-5 rounded-full border-2 relative flex-shrink-0',
            theme === 'dark'
              ? 'border-ink-500 bg-ink-800'
              : 'border-ink-300 bg-ink-100',
          )}
          style={{
            boxShadow: theme === 'dark'
              ? '0 1px 3px rgba(0,0,0,0.4), inset 0 1px 2px rgba(255,255,255,0.1)'
              : '0 1px 3px rgba(0,0,0,0.15), inset 0 1px 2px rgba(255,255,255,0.8)',
          }}
        >
          <div
            className={clsx(
              'absolute inset-1 rounded-full',
              theme === 'dark' ? 'bg-ink-600' : 'bg-ink-200',
            )}
          />
        </div>
      ))}
    </div>
  );
}
