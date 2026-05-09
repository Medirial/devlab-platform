'use client';

import { MoonStar, SunMedium } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
  const { mode, toggleTheme, theme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        width: '48px',
        height: '48px',
        borderRadius: '999px',
        border: `1px solid ${theme.colors.border}`,
        backgroundColor: theme.effects.floatingSurface,
        color: mode === 'light' ? '#0B1220' : '#E2E8F0',
        cursor: 'pointer',
        backdropFilter: 'blur(10px)',
        boxShadow: `0 10px 28px ${theme.colors.shadow}`,
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1200,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = `0 14px 34px ${theme.colors.shadow}`;
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px) scale(1.03)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = `0 10px 28px ${theme.colors.shadow}`;
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0) scale(1)';
      }}
    >
      {mode === 'light' ? <MoonStar size={18} strokeWidth={2.4} /> : <SunMedium size={18} strokeWidth={2.4} />}
    </button>
  );
}
