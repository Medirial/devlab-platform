'use client';

import { Home, Trophy, UserRound, type LucideIcon } from 'lucide-react';
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
  { label: 'Résultats', path: '/results', Icon: Trophy },
  { label: 'Profil', path: '/profile', Icon: UserRound },
];

export default function BottomNavigation({ theme, currentPath, onNavigate }: Readonly<BottomNavigationProps>) {
  return (
    <nav style={{
      position: 'fixed',
      bottom: '16px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 'min(740px, calc(100vw - 24px))',
      backgroundColor: theme.effects.floatingSurface,
      border: `1px solid ${theme.colors.border}`,
      backdropFilter: 'blur(14px)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '66px',
      boxShadow: `0 18px 45px ${theme.colors.shadow}`,
      borderRadius: '999px',
      padding: '8px',
      zIndex: 1000,
    }}>
      {navItems.map((item) => {
        const isActive = currentPath === item.path;
        return (
          <button
            key={item.path}
            onClick={() => onNavigate(item.path)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
              backgroundColor: isActive ? theme.colors.surface : 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: isActive ? theme.colors.primary : theme.colors.textSecondary,
              transition: 'all 0.3s ease',
              borderRadius: '999px',
              flex: 1,
              height: '100%',
              position: 'relative',
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
            <item.Icon size={18} strokeWidth={2.3} />
            <span style={{
              fontSize: theme.typography.small,
              fontWeight: isActive ? '700' : '500',
            }}>
              {item.label}
            </span>
            {isActive && (
              <div style={{
                position: 'absolute',
                bottom: '-2px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '34px',
                height: '4px',
                backgroundImage: `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
                borderRadius: theme.borderRadius.sm,
              }} />
            )}
          </button>
        );
      })}
    </nav>
  );
}
