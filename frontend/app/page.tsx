'use client';

import { BrainCircuit, ChartColumnIncreasing, CloudCog, Layers3 } from 'lucide-react';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useTheme } from '@/components/ThemeProvider';
import ThemeToggle from '@/components/ThemeToggle';
import QuizList from '@/components/QuizList';
import BottomNavigation from '@/components/BottomNavigation';

export default function Home() {
  const { theme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const [selectedDifficulty, setSelectedDifficulty] = useState<'Tous' | 'Facile' | 'Moyen' | 'Difficile'>('Tous');
  const difficultyOptions: Array<'Tous' | 'Facile' | 'Moyen' | 'Difficile'> = ['Tous', 'Facile', 'Moyen', 'Difficile'];

  const featureCards = [
    {
      title: 'Quiz Cloud Complets',
      description: 'Series riches sur AWS, Azure, Linux et Docker avec questions de niveau reel.',
      Icon: BrainCircuit,
    },
    {
      title: 'Roadmaps Pratiques',
      description: 'Parcours progressifs cloud/devops du niveau debutant au niveau king.',
      Icon: Layers3,
    },
    {
      title: 'Suivi de Score',
      description: 'Historique des resultats, analyse des points faibles et progression continue.',
      Icon: ChartColumnIncreasing,
    },
    {
      title: 'Track Cloud',
      description: 'Vision operationnelle orientee architecture, securite, deployment et troubleshooting.',
      Icon: CloudCog,
    },
  ];

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <div style={{
      backgroundColor: theme.colors.background,
      backgroundImage:
        theme.mode === 'light'
          ? 'radial-gradient(circle at 15% 15%, #ecfeff 0%, transparent 35%), radial-gradient(circle at 90% 10%, #dcfce7 0%, transparent 40%), linear-gradient(160deg, #f8fafc 0%, #ecfeff 55%, #eff6ff 100%)'
          : theme.effects.backgroundGradient,
      color: theme.colors.text,
      minHeight: '100vh',
      transition: 'background-color 0.35s ease, color 0.35s ease',
    }}>
      <ThemeToggle />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: `${theme.spacing.lg} ${theme.spacing.md} 90px` }}>
        <header style={{ marginBottom: theme.spacing.lg }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 14px',
            borderRadius: '999px',
            backgroundColor: theme.effects.floatingSurface,
            backdropFilter: 'blur(10px)',
            color: theme.colors.textSecondary,
            fontSize: theme.typography.small,
            marginBottom: theme.spacing.md,
            boxShadow: `0 10px 24px ${theme.colors.shadow}`,
          }}>
            Cloud Learning Platform
          </span>
          <h1 style={{
            fontSize: theme.typography.h1,
            marginBottom: theme.spacing.sm,
            backgroundImage: 'linear-gradient(135deg, #0f766e, #0ea5e9, #e2f5ff)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold',
          }}>
            CloudLab Platform
          </h1>
          <p style={{
            fontSize: theme.typography.body,
            color: theme.colors.textSecondary,
            maxWidth: '760px',
            lineHeight: '1.6',
          }}>
            Formez-vous sur le cloud et le devops avec une interface moderne, des quizzes riches et des roadmaps actionnables.
          </p>
        </header>

        <main>
          <section style={{ marginTop: theme.spacing.lg }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: theme.spacing.md,
              marginBottom: theme.spacing.md,
              flexWrap: 'wrap',
            }}>
              <h2 style={{
                fontSize: theme.typography.h2,
                margin: 0,
                color: theme.colors.text,
              }}>
                Quizzes Disponibles
              </h2>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: theme.effects.floatingSurface,
                borderRadius: '999px',
                padding: '6px',
                backdropFilter: 'blur(8px)',
                boxShadow: `0 8px 18px ${theme.colors.shadow}`,
              }}>
                {difficultyOptions.map((level) => {
                  const isActive = selectedDifficulty === level;
                  return (
                    <button
                      key={level}
                      onClick={() => setSelectedDifficulty(level)}
                      style={{
                        border: 'none',
                        borderRadius: '999px',
                        padding: '7px 12px',
                        backgroundColor: isActive ? theme.colors.surface : 'transparent',
                        color: isActive ? theme.colors.text : theme.colors.textSecondary,
                        fontSize: theme.typography.small,
                        fontWeight: isActive ? '700' : '600',
                        cursor: 'pointer',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease, color 0.2s ease',
                        boxShadow: isActive ? `0 8px 16px ${theme.colors.shadow}` : 'none',
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
                          (e.currentTarget as HTMLElement).style.color = theme.colors.text;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                          (e.currentTarget as HTMLElement).style.color = theme.colors.textSecondary;
                        }
                      }}
                    >
                      {level}
                    </button>
                  );
                })}
              </div>
            </div>
            <QuizList difficultyFilter={selectedDifficulty} />
          </section>

          <section style={{ marginTop: theme.spacing.lg }}>
            <h2 style={{
              fontSize: theme.typography.h2,
              marginBottom: theme.spacing.md,
              color: theme.colors.text,
            }}>
              A propos
            </h2>
            <div style={{
              backgroundColor: theme.effects.floatingSurface,
              padding: theme.spacing.lg,
              borderRadius: theme.borderRadius.lg,
              backdropFilter: 'blur(10px)',
              boxShadow: `0 12px 30px ${theme.colors.shadow}`,
            }}>
              <p style={{
                color: theme.colors.textSecondary,
                lineHeight: '1.6',
              }}>
                La plateforme evolue vers un vrai cockpit de progression technique. Voila les modules en cours de livraison :
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: theme.spacing.md,
                marginTop: theme.spacing.md,
              }}>
                {featureCards.map((card, index) => (
                  <article
                    key={card.title}
                    className='feature-card-modern ambient-float'
                    style={{
                      padding: theme.spacing.md,
                      backgroundColor: theme.colors.background,
                      borderRadius: theme.borderRadius.md,
                      boxShadow: `0 8px 18px ${theme.colors.shadow}`,
                      animationDelay: `${0.05 + index * 0.04}s`,
                    }}
                  >
                    <card.Icon size={18} strokeWidth={2.3} color={theme.colors.primary} />
                    <h3 style={{
                      fontSize: '1rem',
                      margin: `${theme.spacing.sm} 0 6px`,
                    }}>
                      {card.title}
                    </h3>
                    <p style={{
                      margin: 0,
                      color: theme.colors.textSecondary,
                      fontSize: theme.typography.small,
                      lineHeight: '1.55',
                    }}>
                      {card.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>

      <BottomNavigation theme={theme} currentPath={pathname} onNavigate={handleNavigate} />
    </div>
  );
}