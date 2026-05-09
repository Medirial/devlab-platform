import HealthCheck from '@/components/HealthCheck';

export default function Home() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5em', marginBottom: '10px' }}>DevLab Platform</h1>
        <p style={{ fontSize: '1.1em', color: '#666' }}>
          Apprenez le cloud, le fullstack et les technologies modernes
        </p>
      </header>

      <main>
        <HealthCheck />

        <section style={{ marginTop: '40px' }}>
          <h2>Bienvenue 👋</h2>
          <p>La plateforme est en cours de construction.</p>
          <p>Fonctionnalités à venir :</p>
          <ul>
            <li>📝 Quiz techniques (JavaScript, React, Cloud, Docker, AWS)</li>
            <li>🗺️ Roadmaps de développement</li>
            <li>📊 Suivi de progression</li>
            <li>🏆 Système de badges</li>
          </ul>
        </section>
      </main>
    </div>
  );
}