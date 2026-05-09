'use client';

import { Trophy } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/components/ThemeProvider';
import ThemeToggle from '@/components/ThemeToggle';
import BottomNavigation from '@/components/BottomNavigation';

export default function ResultsPage() {
  const { theme } = useTheme();
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <div style={{
      backgroundColor: theme.colors.background,
      backgroundImage: theme.effects.backgroundGradient,
      color: theme.colors.text,
      minHeight: '100vh',
    }}>
      <ThemeToggle />
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: `${theme.spacing.lg} ${theme.spacing.md} 90px`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: theme.spacing.md }}>
          <Trophy size={24} strokeWidth={2.3} color={theme.colors.primary} />
          <h1 style={{
            fontSize: theme.typography.h1,
            margin: 0,
          }}>
            Mes Resultats
          </h1>
        </div>
        <div style={{
          backgroundColor: theme.colors.surface,
          padding: theme.spacing.lg,
          borderRadius: theme.borderRadius.lg,
          border: `1px solid ${theme.colors.border}`,
          textAlign: 'center',
          color: theme.colors.textSecondary,
          boxShadow: `0 16px 30px ${theme.colors.shadow}`,
        }}>
          <p>Le dashboard de progression arrive: score moyen, serie de victoire et tendances par categorie.</p>
        </div>
      </div>

      <BottomNavigation theme={theme} currentPath="/results" onNavigate={handleNavigate} />
    </div>
  );
}
