'use client';

import { useState, useEffect } from 'react';
import { apiGet } from '@/lib/api';

interface HealthStatus {
  status: string;
  message: string;
  timestamp: string;
}

export default function HealthCheck() {
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
    <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '20px' }}>
      <h3>État API Backend</h3>
      {loading && <p>🔄 Vérification en cours...</p>}
      {error && <p style={{ color: 'red' }}>❌ {error}</p>}
      {health && (
        <div style={{ color: 'green' }}>
          <p>✅ API connectée</p>
          <p><strong>Status :</strong> {health.status}</p>
          <p><strong>Message :</strong> {health.message}</p>
        </div>
      )}
    </div>
  );
}
