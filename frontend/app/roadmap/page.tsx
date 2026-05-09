'use client';

import { useMemo, useState } from 'react';
import {
  Blocks,
  Crown,
  PanelsTopLeft,
  Rocket,
  Server,
  ServerCog,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/components/ThemeProvider';
import ThemeToggle from '@/components/ThemeToggle';
import BottomNavigation from '@/components/BottomNavigation';

type Goal = 'Docker' | 'AWS' | 'Azure' | 'Linux';

interface Stage {
  level: string;
  title: string;
  focus: string;
  unlocks: string[];
  bossMission: string;
  xp: number;
  duration: string;
  done?: boolean;
}

export default function RoadmapPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [activeGoal, setActiveGoal] = useState<Goal>('Docker');

  const goalMeta: Record<Goal, { icon: typeof Rocket; label: string }> = {
    Docker: { icon: PanelsTopLeft, label: 'Containers & packaging' },
    AWS: { icon: Server, label: 'Cloud architecture on AWS' },
    Azure: { icon: ServerCog, label: 'Cloud architecture on Azure' },
    Linux: { icon: Rocket, label: 'Linux ops & automation' },
  };

  const roadmapByGoal: Record<Goal, Stage[]> = useMemo(
    () => ({
      Docker: [
        {
          level: 'Level 1',
          title: 'Container Basics',
          focus: 'Images, containers, registries, lifecycle et commandes essentielles.',
          unlocks: ['docker run', 'docker ps', 'docker pull'],
          bossMission: 'Lancer et explorer un service conteneurise en local.',
          xp: 120,
          duration: '1 semaine',
          done: true,
        },
        {
          level: 'Level 2',
          title: 'Dockerfile Essentials',
          focus: 'Build context, layers, cache, multi-stage builds.',
          unlocks: ['Dockerfile', 'docker build', 'image slimming'],
          bossMission: 'Construire une image legere et reproductible.',
          xp: 150,
          duration: '1 semaine',
          done: true,
        },
        {
          level: 'Level 3',
          title: 'Compose Workflows',
          focus: 'Services multi-conteneurs, reseaux, volumes, env files.',
          unlocks: ['docker compose up', 'service dependencies', 'volumes'],
          bossMission: 'Orchestrer app + DB + cache avec Compose.',
          xp: 180,
          duration: '2 semaines',
        },
        {
          level: 'Level 4',
          title: 'Networking & Storage',
          focus: 'Bridge networks, DNS interne, bind mounts, persistence.',
          unlocks: ['custom networks', 'volume strategy', 'backup basics'],
          bossMission: 'Rendre les donnees persistantes sans casser les deploiements.',
          xp: 210,
          duration: '2 semaines',
        },
        {
          level: 'Level 5',
          title: 'Security Baseline',
          focus: 'Least privilege, rootless options, secrets, image scanning.',
          unlocks: ['non-root containers', 'scan images', 'secret hygiene'],
          bossMission: 'Durcir un stack Docker selon checks securite.',
          xp: 240,
          duration: '2 semaines',
        },
        {
          level: 'Level 6',
          title: 'CI/CD Integration',
          focus: 'Build pipelines, tags immuables, promotion dev->prod.',
          unlocks: ['build in CI', 'artifact tagging', 'release gates'],
          bossMission: 'Automatiser build + push + scan sur chaque merge.',
          xp: 270,
          duration: '2 semaines',
        },
        {
          level: 'Level 7',
          title: 'Registry & Supply Chain',
          focus: 'Private registries, signing, provenance et policy checks.',
          unlocks: ['private registry', 'image signing', 'policy enforcement'],
          bossMission: 'Securiser le chemin image du dev a la prod.',
          xp: 300,
          duration: '2 semaines',
        },
        {
          level: 'Level 8',
          title: 'Kubernetes Bridge',
          focus: 'Passage Docker vers K8s: pods, services, deployments.',
          unlocks: ['pod model', 'service exposure', 'deployment rollout'],
          bossMission: 'Migrer un service Compose vers un deployment K8s simple.',
          xp: 330,
          duration: '3 semaines',
        },
        {
          level: 'Level 9',
          title: 'Observability',
          focus: 'Logs centralises, metrics, alerts et troubleshooting.',
          unlocks: ['container logs', 'metrics baseline', 'incident workflow'],
          bossMission: 'Diagnostiquer et corriger une panne en environnement conteneurise.',
          xp: 360,
          duration: '2 semaines',
        },
        {
          level: 'Level 10',
          title: 'Docker Expert Ops',
          focus: 'Standards equipe, templates, perf tuning et runbooks.',
          unlocks: ['platform standards', 'golden images', 'ops playbook'],
          bossMission: 'Definir la reference Docker d une equipe DevOps complete.',
          xp: 420,
          duration: '3 semaines',
        },
      ],
      AWS: [
        {
          level: 'Level 1',
          title: 'Cloud Fundamentals',
          focus: 'Regions, AZ, shared responsibility et services core.',
          unlocks: ['global infra', 'service selection', 'cost mindset'],
          bossMission: 'Cartographier une architecture AWS de base.',
          xp: 120,
          duration: '1 semaine',
          done: true,
        },
        {
          level: 'Level 2',
          title: 'IAM & Security Basics',
          focus: 'Users, roles, policies, MFA, least privilege.',
          unlocks: ['IAM roles', 'policy structure', 'secure access'],
          bossMission: 'Mettre en place une base IAM propre pour une equipe.',
          xp: 160,
          duration: '2 semaines',
          done: true,
        },
        {
          level: 'Level 3',
          title: 'Networking with VPC',
          focus: 'Subnets, routes, NAT, SG, NACL et acces prive/public.',
          unlocks: ['VPC design', 'subnet strategy', 'network security'],
          bossMission: 'Concevoir un VPC multi-tier securise.',
          xp: 190,
          duration: '2 semaines',
        },
        {
          level: 'Level 4',
          title: 'Compute & Storage',
          focus: 'EC2, ASG, EBS, S3 et patterns de stockage.',
          unlocks: ['EC2 baseline', 'S3 patterns', 'autoscaling'],
          bossMission: 'Deployer une app haute dispo avec stockage adapte.',
          xp: 220,
          duration: '2 semaines',
        },
        {
          level: 'Level 5',
          title: 'Data & Integration',
          focus: 'RDS, DynamoDB, SQS, SNS, event-driven basics.',
          unlocks: ['managed databases', 'queueing', 'pub/sub'],
          bossMission: 'Brancher un flux asynchrone robuste entre services.',
          xp: 250,
          duration: '2 semaines',
        },
        {
          level: 'Level 6',
          title: 'Serverless Patterns',
          focus: 'Lambda, API Gateway, Step Functions et observabilite.',
          unlocks: ['lambda design', 'api gateway', 'workflow orchestration'],
          bossMission: 'Construire une API serverless monitorable.',
          xp: 280,
          duration: '2 semaines',
        },
        {
          level: 'Level 7',
          title: 'Infrastructure as Code',
          focus: 'CloudFormation/Terraform, modules, state, environments.',
          unlocks: ['IaC modules', 'environment promotion', 'reviewable infra'],
          bossMission: 'Versionner une infra complete et la deployer par pipeline.',
          xp: 310,
          duration: '3 semaines',
        },
        {
          level: 'Level 8',
          title: 'Well-Architected Ops',
          focus: 'Reliability, security, performance, cost, sustainability.',
          unlocks: ['WA review', 'trade-off decisions', 'remediation plan'],
          bossMission: 'Realiser une revue Well-Architected d un workload.',
          xp: 340,
          duration: '2 semaines',
        },
        {
          level: 'Level 9',
          title: 'Multi-Account Governance',
          focus: 'Organizations, SCP, account strategy, landing zone.',
          unlocks: ['org design', 'guardrails', 'governance model'],
          bossMission: 'Structurer une plateforme AWS multi-equipes securisee.',
          xp: 380,
          duration: '3 semaines',
        },
        {
          level: 'Level 10',
          title: 'AWS Cloud DevOps Expert',
          focus: 'Platform engineering, incident readiness, resiliency game days.',
          unlocks: ['platform blueprint', 'SRE mindset', 'runbooks'],
          bossMission: 'Piloter un socle AWS cloud/devops enterprise.',
          xp: 430,
          duration: '4 semaines',
        },
      ],
      Azure: [
        {
          level: 'Level 1',
          title: 'Azure Fundamentals',
          focus: 'Regions, subscriptions, resource groups, governance de base.',
          unlocks: ['resource hierarchy', 'naming rules', 'cost awareness'],
          bossMission: 'Monter une fondation Azure propre pour un projet.',
          xp: 120,
          duration: '1 semaine',
          done: true,
        },
        {
          level: 'Level 2',
          title: 'Identity with Entra ID',
          focus: 'Roles, RBAC, managed identities, access reviews.',
          unlocks: ['RBAC model', 'managed identity', 'secure auth'],
          bossMission: 'Securiser les acces des apps et des equipes.',
          xp: 160,
          duration: '2 semaines',
          done: true,
        },
        {
          level: 'Level 3',
          title: 'Azure Network Core',
          focus: 'VNet, subnets, NSG, peering, private endpoints.',
          unlocks: ['vnet design', 'nsg policy', 'private networking'],
          bossMission: 'Concevoir un reseau Azure zero exposition inutile.',
          xp: 190,
          duration: '2 semaines',
        },
        {
          level: 'Level 4',
          title: 'Compute & Containers',
          focus: 'VM, App Service, Container Apps, AKS introduction.',
          unlocks: ['compute choices', 'container deployment', 'scaling basics'],
          bossMission: 'Deployer le meme service sur 2 options compute Azure.',
          xp: 220,
          duration: '2 semaines',
        },
        {
          level: 'Level 5',
          title: 'Data Platform',
          focus: 'Azure SQL, Storage, Cosmos DB, backup et DR.',
          unlocks: ['data service fit', 'backup plan', 'resilient storage'],
          bossMission: 'Definir strategie data selon SLA et budget.',
          xp: 250,
          duration: '2 semaines',
        },
        {
          level: 'Level 6',
          title: 'Observability & SRE',
          focus: 'Monitor, Log Analytics, App Insights, alerting actionnable.',
          unlocks: ['metrics model', 'logs correlation', 'alert routing'],
          bossMission: 'Creer un tableau de bord incidents orienté action.',
          xp: 280,
          duration: '2 semaines',
        },
        {
          level: 'Level 7',
          title: 'IaC & GitOps',
          focus: 'Bicep/Terraform, pipeline deployment, config drift control.',
          unlocks: ['bicep modules', 'gitops flow', 'drift detection'],
          bossMission: 'Industrialiser l infra Azure depuis Git.',
          xp: 310,
          duration: '3 semaines',
        },
        {
          level: 'Level 8',
          title: 'Well-Architected Pillars',
          focus: 'Reliability, security, cost, ops excellence, performance.',
          unlocks: ['pillar review', 'architecture decisions', 'optimization loop'],
          bossMission: 'Mener une revue Azure Well-Architected complete.',
          xp: 340,
          duration: '2 semaines',
        },
        {
          level: 'Level 9',
          title: 'Enterprise Governance',
          focus: 'Policy, management groups, blueprint et compliance.',
          unlocks: ['policy as code', 'landing zone', 'compliance mapping'],
          bossMission: 'Mettre un cadre gouvernance multi-landing zones.',
          xp: 380,
          duration: '3 semaines',
        },
        {
          level: 'Level 10',
          title: 'Azure Cloud DevOps Expert',
          focus: 'Resilience drills, platform standards et excellence operationnelle.',
          unlocks: ['platform ops', 'incident playbooks', 'continuous improvement'],
          bossMission: 'Piloter une plateforme Azure cloud/devops enterprise.',
          xp: 430,
          duration: '4 semaines',
        },
      ],
      Linux: [
        {
          level: 'Level 1',
          title: 'Linux Basics',
          focus: 'Filesystem, shell commands, navigation et editions simples.',
          unlocks: ['cd/ls/cat', 'permissions basics', 'man/help'],
          bossMission: 'Administrer un serveur Linux sans interface graphique.',
          xp: 120,
          duration: '1 semaine',
          done: true,
        },
        {
          level: 'Level 2',
          title: 'Users & Permissions',
          focus: 'Users, groups, sudoers, ACL et hygiene securite.',
          unlocks: ['useradd', 'sudo policy', 'chmod/chown'],
          bossMission: 'Mettre en place un modele d acces securise.',
          xp: 150,
          duration: '1 semaine',
          done: true,
        },
        {
          level: 'Level 3',
          title: 'Process & Services',
          focus: 'Processes, systemd, journald, logs et diagnostics.',
          unlocks: ['systemctl', 'journalctl', 'ps/top'],
          bossMission: 'Diagnostiquer et corriger un service instable.',
          xp: 180,
          duration: '2 semaines',
        },
        {
          level: 'Level 4',
          title: 'Networking Ops',
          focus: 'TCP/IP basics, DNS, routing, firewalling de base.',
          unlocks: ['ip', 'ss', 'dig/nslookup'],
          bossMission: 'Troubleshooter une panne reseau complete.',
          xp: 210,
          duration: '2 semaines',
        },
        {
          level: 'Level 5',
          title: 'Shell Scripting',
          focus: 'Bash scripting, variables, loops, functions, error handling.',
          unlocks: ['bash automation', 'cron jobs', 'defensive scripts'],
          bossMission: 'Automatiser une routine ops quotidienne.',
          xp: 240,
          duration: '2 semaines',
        },
        {
          level: 'Level 6',
          title: 'System Hardening',
          focus: 'SSH hardening, patching, audit et principes locaux de securite.',
          unlocks: ['secure ssh', 'patch cadence', 'audit basics'],
          bossMission: 'Durcir un serveur Linux expose internet.',
          xp: 270,
          duration: '2 semaines',
        },
        {
          level: 'Level 7',
          title: 'Performance & Capacity',
          focus: 'CPU/memory/io analysis, bottleneck detection, tuning.',
          unlocks: ['vmstat/iostat', 'perf checks', 'capacity plan'],
          bossMission: 'Stabiliser une machine sous charge forte.',
          xp: 300,
          duration: '2 semaines',
        },
        {
          level: 'Level 8',
          title: 'Infra Automation',
          focus: 'Ansible basics, config management, idempotence.',
          unlocks: ['playbooks', 'inventory strategy', 'repeatable ops'],
          bossMission: 'Provisionner plusieurs serveurs Linux automatiquement.',
          xp: 330,
          duration: '3 semaines',
        },
        {
          level: 'Level 9',
          title: 'Linux for Cloud Native',
          focus: 'Cgroups, namespaces, kernel features pour containers.',
          unlocks: ['kernel/container link', 'runtime awareness', 'resource control'],
          bossMission: 'Optimiser Linux pour une plateforme conteneurisee.',
          xp: 360,
          duration: '2 semaines',
        },
        {
          level: 'Level 10',
          title: 'Linux DevOps Expert',
          focus: 'Runbooks, incident command, standards et mentoring equipe.',
          unlocks: ['ops governance', 'incident leadership', 'knowledge sharing'],
          bossMission: 'Etablir le standard Linux d une equipe DevOps.',
          xp: 420,
          duration: '3 semaines',
        },
      ],
    }),
    [],
  );

  const activeStages = roadmapByGoal[activeGoal];

  const getStageTier = (index: number, total: number) => {
    const ratio = total <= 1 ? 0 : index / (total - 1);

    if (ratio < 0.33) {
      return { label: 'Debutant', icon: Rocket, color: '#0ea5e9' };
    }

    if (ratio < 0.77) {
      return { label: 'Intermediaire', icon: Blocks, color: '#14b8a6' };
    }

    return { label: 'King', icon: Crown, color: '#0f766e' };
  };

  const getCardGradient = (index: number, total: number) => {
    const ratio = total <= 1 ? 0 : index / (total - 1);

    if (theme.mode === 'light') {
      const lightA = 98 - ratio * 22;
      const lightB = 95 - ratio * 28;
      return `linear-gradient(145deg, hsla(172, 78%, ${lightA}%, 0.96) 0%, hsla(202, 88%, ${lightB}%, 0.95) 100%)`;
    }

    const lightA = 24 - ratio * 10;
    const lightB = 20 - ratio * 8;
    return `linear-gradient(145deg, hsla(172, 75%, ${lightA}%, 0.9) 0%, hsla(208, 72%, ${lightB}%, 0.88) 100%)`;
  };

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <div
      style={{
        backgroundColor: theme.colors.background,
        backgroundImage:
          theme.mode === 'light'
            ? 'radial-gradient(circle at 15% 15%, #ecfeff 0%, transparent 35%), radial-gradient(circle at 90% 10%, #dcfce7 0%, transparent 40%), linear-gradient(160deg, #f8fafc 0%, #ecfeff 55%, #eff6ff 100%)'
            : theme.effects.backgroundGradient,
        color: theme.colors.text,
        minHeight: '100vh',
      }}
    >
      <ThemeToggle />
      <div
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: `${theme.spacing.lg} ${theme.spacing.md} 98px`,
        }}
      >
        <header style={{ marginBottom: theme.spacing.lg }}>
          <h1
            style={{
              margin: `0 0 ${theme.spacing.sm}`,
              fontSize: theme.typography.h1,
              backgroundImage: 'linear-gradient(135deg, #0f766e, #0ea5e9, #e2f5ff)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Roadmap Cloud DevOps
          </h1>
          <p style={{ color: theme.colors.textSecondary, maxWidth: '780px', lineHeight: '1.6' }}>
            Sujets uniquement cloud/devops: Docker, AWS, Azure, Linux. Les cartes se scrollent horizontalement.
          </p>
        </header>

        <section
          style={{
            backgroundColor: theme.effects.floatingSurface,
            borderRadius: theme.borderRadius.lg,
            backdropFilter: 'blur(10px)',
            boxShadow: `0 18px 36px ${theme.colors.shadow}`,
            padding: theme.spacing.lg,
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: theme.spacing.md,
              flexWrap: 'wrap',
              marginBottom: theme.spacing.md,
            }}
          >
            <div>
              <h2 style={{ margin: 0, fontSize: theme.typography.h2 }}>Choix de l objectif</h2>
              <p style={{ marginTop: '6px', color: theme.colors.textSecondary, fontSize: theme.typography.small }}>
                Progression par tiers: Debutant | Intermediaire | King
              </p>
            </div>
            <div
              style={{
                display: 'flex',
                gap: '8px',
                backgroundColor: theme.colors.surface,
                borderRadius: '999px',
                padding: '6px',
                boxShadow: `0 10px 18px ${theme.colors.shadow}`,
                flexWrap: 'wrap',
              }}
            >
              {(Object.keys(goalMeta) as Goal[]).map((goal) => {
                const isActive = goal === activeGoal;
                const Icon = goalMeta[goal].icon;
                const activeBackground = theme.mode === 'light' ? '#ecfeff' : theme.colors.background;
                const activeColor = theme.mode === 'light' ? '#0f766e' : theme.colors.text;
                const buttonBackground = isActive ? activeBackground : 'transparent';
                const buttonColor = isActive ? activeColor : theme.colors.textSecondary;
                return (
                  <button
                    key={goal}
                    onClick={() => setActiveGoal(goal)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      border: 'none',
                      borderRadius: '999px',
                      padding: '8px 12px',
                      backgroundColor: buttonBackground,
                      color: buttonColor,
                      cursor: 'pointer',
                      fontWeight: isActive ? '700' : '600',
                      transition: 'transform 0.24s ease, box-shadow 0.24s ease, color 0.24s ease',
                      boxShadow: isActive ? `0 8px 14px ${theme.colors.shadow}` : 'none',
                    }}
                  >
                    <Icon size={16} strokeWidth={2.4} />
                    {goal}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ marginBottom: theme.spacing.md }}>
            <p style={{ margin: 0, color: theme.colors.textSecondary, fontSize: theme.typography.small }}>
              {goalMeta[activeGoal].label} - Swipe horizontal pour voir tous les niveaux
            </p>
          </div>

          <div
            className='roadmap-horizontal-scroll'
            style={{
              position: 'relative',
              display: 'flex',
              gap: theme.spacing.md,
              overflowX: 'auto',
              overflowY: 'hidden',
              paddingBottom: '8px',
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {activeStages.map((stage, index) => {
              const tier = getStageTier(index, activeStages.length);
              const TierIcon = tier.icon;

              return (
                <article
                  key={stage.title}
                  className='roadmap-card-3d'
                  style={{
                    position: 'relative',
                    flex: '0 0 min(86vw, 320px)',
                    minWidth: '280px',
                    scrollSnapAlign: 'start',
                    backgroundColor: theme.colors.surface,
                    backgroundImage: getCardGradient(index, activeStages.length),
                    borderRadius: theme.borderRadius.lg,
                    padding: theme.spacing.lg,
                    boxShadow: `0 16px 26px ${theme.colors.shadow}`,
                    transformStyle: 'preserve-3d',
                    animation: `slideUp 0.45s ease ${0.04 + index * 0.04}s both`,
                  }}
                >
                {index < activeStages.length - 1 && (
                  <div
                    aria-hidden='true'
                    style={{
                      position: 'absolute',
                      right: '-18px',
                      top: '46%',
                      width: '20px',
                      height: '4px',
                      borderRadius: '999px',
                      backgroundImage: 'linear-gradient(90deg, #0f766e, #0ea5e9)',
                      opacity: theme.mode === 'light' ? 0.55 : 0.75,
                    }}
                  />
                )}

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: theme.spacing.sm,
                  }}
                >
                  <span
                    style={{
                      fontSize: theme.typography.small,
                      color: theme.colors.textSecondary,
                      fontWeight: '700',
                    }}
                  >
                    {stage.level}
                  </span>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '4px 9px',
                      borderRadius: '999px',
                      fontSize: '0.72rem',
                      fontWeight: '700',
                      color: theme.mode === 'light' ? '#0f172a' : theme.colors.text,
                      backgroundColor:
                        theme.mode === 'light' ? 'rgba(255, 255, 255, 0.76)' : 'rgba(15, 23, 42, 0.42)',
                    }}
                  >
                    <TierIcon size={14} color={tier.color} />
                    {tier.label}
                  </span>
                </div>

                <h3 style={{ margin: `0 0 ${theme.spacing.sm}`, fontSize: '1.02rem' }}>{stage.title}</h3>
                <p style={{ margin: `0 0 ${theme.spacing.md}`, color: theme.colors.textSecondary, lineHeight: '1.55' }}>
                  {stage.focus}
                </p>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: theme.spacing.md }}>
                  {stage.unlocks.map((skill) => (
                    <span
                      key={skill}
                      style={{
                        padding: '5px 9px',
                        borderRadius: '999px',
                        backgroundColor: theme.mode === 'light' ? 'rgba(255,255,255,0.72)' : theme.colors.background,
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        color: theme.colors.textSecondary,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px',
                    marginBottom: theme.spacing.md,
                    padding: theme.spacing.sm,
                    borderRadius: theme.borderRadius.md,
                    backgroundColor: theme.mode === 'light' ? 'rgba(14, 165, 233, 0.12)' : `${theme.colors.primary}18`,
                  }}
                >
                  <Blocks size={16} color={theme.mode === 'light' ? '#0f766e' : theme.colors.primary} />
                  <p style={{ margin: 0, fontSize: theme.typography.small, color: theme.colors.text }}>
                    Boss mission: {stage.bossMission}
                  </p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span
                    style={{
                      padding: '6px 10px',
                      borderRadius: '999px',
                      backgroundColor: theme.mode === 'light' ? 'rgba(240, 253, 250, 0.9)' : theme.colors.background,
                      fontSize: theme.typography.small,
                      fontWeight: '700',
                    }}
                  >
                    +{stage.xp} XP
                  </span>
                  <span style={{ color: theme.colors.textSecondary, fontSize: theme.typography.small }}>
                    {stage.duration}
                  </span>
                </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>

      <BottomNavigation theme={theme} currentPath='/roadmap' onNavigate={handleNavigate} />
    </div>
  );
}
