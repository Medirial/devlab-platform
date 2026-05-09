'use client';

import { Compass, Home, Trophy, UserRound, type LucideIcon } from 'lucide-react';
import { Theme } from '@/lib/theme';

interface BottomNavigationProps {
  theme: Theme;
  currentPath: string;
  onNavigate: (path: string) => void;
}

interface NavItem {
  label: string;
  path: string;
  Icon: LucideIcon;
}

const navItems: NavItem[] = [
  { label: 'Accueil', path: '/', Icon: Home },
  { label: 'Roadmap', path: '/roadmap', Icon: Compass },
  { label: 'Résultats', path: '/results', Icon: Trophy },
  { label: 'Profil', path: '/profile', Icon: UserRound },
];

export default function BottomNavigation({ theme, currentPath, onNavigate }: Readonly<BottomNavigationProps>) {
  const activeIndex = navItems.findIndex((item) => {
    if (item.path === '/') {
      return currentPath === '/';
    }
    return currentPath.startsWith(item.path);
  });

  const safeIndex = Math.max(activeIndex, 0);
  const segmentWidth = 100 / navItems.length;
  const barBackground = theme.mode === 'light' ? 'rgba(255, 255, 255, 0.66)' : 'rgba(11, 18, 32, 0.66)';

  return (
    <nav style={{
      position: 'fixed',
      bottom: '16px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 'min(430px, calc(100vw - 20px))',
      backgroundColor: barBackground,
      border: `1px solid ${theme.colors.border}`,
      backdropFilter: 'blur(14px)',
      display: 'grid',
      gridTemplateColumns: `repeat(${navItems.length}, 1fr)`,
      alignItems: 'center',
      height: '68px',
      boxShadow: `0 18px 44px ${theme.colors.shadow}`,
      borderRadius: '999px',
      padding: 0,
      overflow: 'hidden',
      zIndex: 1000,
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: `${safeIndex * segmentWidth}%`,
        width: `${segmentWidth}%`,
        backgroundColor: theme.colors.surface,
        borderRadius: '999px',
        boxShadow: `0 12px 22px ${theme.colors.shadow}`,
        transition: 'left 0.38s cubic-bezier(0.22, 1, 0.36, 1), width 0.38s cubic-bezier(0.22, 1, 0.36, 1)',
        zIndex: 1,
      }} />

      {navItems.map((item) => {
        const isActive = item.path === '/' ? currentPath === '/' : currentPath.startsWith(item.path);
        return (
          <button
            key={item.path}
            onClick={() => onNavigate(item.path)}
            aria-label={item.label}
            title={item.label}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: isActive ? theme.colors.primary : theme.colors.textSecondary,
              transition: 'transform 0.32s cubic-bezier(0.22, 1, 0.36, 1), color 0.32s ease',
              borderRadius: 0,
              height: '100%',
              position: 'relative',
              width: '100%',
              zIndex: 2,
              transform: isActive ? 'translateY(-1px) scale(1.02)' : 'translateY(0) scale(1)',
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                (e.currentTarget as HTMLElement).style.color = theme.colors.primary;
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                (e.currentTarget as HTMLElement).style.color = theme.colors.textSecondary;
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }
            }}
          >
            <item.Icon size={22} strokeWidth={2.4} />
          </button>
        );
      })}
    </nav>
  );
}
