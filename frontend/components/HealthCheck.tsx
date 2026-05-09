'use client';

import { useState, useEffect } from 'react';
import { useTheme } from './ThemeProvider';
import { apiGet } from '@/lib/api';

interface HealthStatus {
  status: string;
  message: string;
  timestamp: string;
}

export default function HealthCheck() {
  const { theme } = useTheme();
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        setLoading(true);
        const data = await apiGet<HealthStatus>('/health');
        setHealth(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur connexion');
        setHealth(null);
      } finally {
        setLoading(false);
      }
    };

    checkHealth();
  }, []);

  return (
    <div style={{
      padding: theme.spacing.lg,
      border: `1px solid ${theme.colors.border}`,
      borderRadius: theme.borderRadius.lg,
      marginBottom: theme.spacing.lg,
      backgroundColor: theme.colors.surface,
    }}>
      <h3 style={{
        margin: `0 0 ${theme.spacing.md} 0`,
        color: theme.colors.text,
      }}>
        État API Backend
      </h3>
      {loading && <p style={{ color: theme.colors.textSecondary }}>Vérification en cours...</p>}
      {error && <p style={{ color: theme.colors.danger }}>{error}</p>}
      {health && (
        <div style={{ color: theme.colors.success }}>
          <p style={{ margin: 0 }}>API connectée</p>
          <p style={{ margin: `${theme.spacing.sm} 0 0 0`, fontSize: theme.typography.small, color: theme.colors.textSecondary }}>
            <strong>Status :</strong> {health.status}
          </p>
          <p style={{ margin: `${theme.spacing.sm} 0 0 0`, fontSize: theme.typography.small, color: theme.colors.textSecondary }}>
            <strong>Message :</strong> {health.message}
          </p>
        </div>
      )}
    </div>
  );
}
