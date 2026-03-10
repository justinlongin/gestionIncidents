import React, { useState, useEffect, useRef } from 'react';
import {
  AlertTriangle, Shield, Clock, Users,
  CheckCircle, Zap, BarChart3, ChevronLeft, ChevronRight,
  Facebook, Twitter, Linkedin, Mail, Phone, MapPin, Github,
  ArrowRight, Star, Play, Globe, Headphones, Database,
  Activity, Target, Eye, MessageSquare, ChevronDown,
  Server, AlertCircle, CheckSquare,
  User
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Link, usePage } from '@inertiajs/react';
import Nav from '@/components/Nav';

/* ─────────────────────────────────────────────
   COUNTER HOOK
───────────────────────────────────────────── */
function useCounter(end: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, start]);
  return count;
}

/* ─────────────────────────────────────────────
   ANIMATED STAT
───────────────────────────────────────────── */
function AnimatedStat({ value, suffix, label, prefix = '' }: { value: number; suffix?: string; label: string; prefix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const count = useCounter(value, 2000, visible);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="text-center group">
      <div className="stat-number text-5xl font-black mb-2 transition-all duration-300 group-hover:scale-110">
        {prefix}{count}{suffix}
      </div>
      <div className="text-slate-400 text-sm uppercase tracking-widest font-medium">{label}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function IncidentPlatformLanding() {
  const { auth } = usePage().props as { auth: { user: any } };
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactName, setContactName] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const slides = [
    {
      tag: "Nouveau · Automatisation IA",
      title: "Gérez vos incidents avec",
      highlight: "précision et rapidité",
      description: "Une plateforme de niveau entreprise pour détecter, analyser et résoudre vos incidents en temps réel — avant que vos utilisateurs ne s'en aperçoivent.",
      cta: "Commencer gratuitement",
      ctaSecondary: "Voir la démo",
      visual: "🚨"
    },
    {
      tag: "Intelligence Artificielle",
      title: "Détection proactive",
      highlight: "alimentée par l'IA",
      description: "Notre moteur d'intelligence artificielle analyse des milliers de signaux par seconde pour prédire et prévenir les incidents avant qu'ils ne surviennent.",
      cta: "Explorer l'IA",
      ctaSecondary: "Documentation",
      visual: "🤖"
    },
    {
      tag: "Collaboration",
      title: "Unissez vos équipes",
      highlight: "autour des incidents",
      description: "War rooms digitales, assignation intelligente, playbooks automatisés — tout ce dont votre équipe a besoin pour coordonner la résolution d'incidents critiques.",
      cta: "Inviter l'équipe",
      ctaSecondary: "Cas clients",
      visual: "⚡"
    }
  ];

  const features = [
    { icon: AlertTriangle, title: "Alertes Intelligentes", description: "Notifications instantanées avec priorisation automatique basée sur l'impact métier et la criticité technique.", color: "from-orange-500 to-red-500", bg: "from-orange-50 to-red-50" },
    { icon: Clock, title: "MTTR Optimisé", description: "Réduisez votre Mean Time To Resolve de 60% grâce aux workflows automatisés et aux playbooks personnalisés.", color: "from-blue-500 to-cyan-500", bg: "from-blue-50 to-cyan-50" },
    { icon: Users, title: "War Room Digitale", description: "Centralisez la communication d'équipe, assignez des rôles et suivez l'avancement en temps réel depuis un tableau de bord unifié.", color: "from-violet-500 to-purple-500", bg: "from-violet-50 to-purple-50" },
    { icon: BarChart3, title: "Analytiques Post-Mortem", description: "Rapports automatiques post-incident, analyse des causes racines et recommandations pour éviter les récidives.", color: "from-emerald-500 to-green-500", bg: "from-emerald-50 to-green-50" },
    { icon: Shield, title: "Conformité & Sécurité", description: "SOC 2 Type II, ISO 27001, RGPD. Chiffrement AES-256, audit logs complets et contrôles d'accès granulaires.", color: "from-slate-500 to-gray-600", bg: "from-slate-50 to-gray-50" },
    { icon: Zap, title: "600+ Intégrations", description: "Slack, Teams, PagerDuty, Jira, Datadog, Prometheus, AWS CloudWatch et bien plus — connectez votre stack en minutes.", color: "from-yellow-500 to-amber-500", bg: "from-yellow-50 to-amber-50" },
    { icon: Activity, title: "Monitoring Continu", description: "Surveillance 24/7 de votre infrastructure avec des seuils d'alerte configurables et des dashboards temps réel.", color: "from-pink-500 to-rose-500", bg: "from-pink-50 to-rose-50" },
    { icon: Database, title: "Historique Complet", description: "Archivage illimité de tous vos incidents avec recherche full-text, filtres avancés et exports en CSV/PDF.", color: "from-teal-500 to-cyan-600", bg: "from-teal-50 to-cyan-50" },
    { icon: Globe, title: "Multi-Régions", description: "Infrastructure répartie sur 12 datacenters mondiaux pour une latence minimale et une disponibilité maximale.", color: "from-indigo-500 to-blue-600", bg: "from-indigo-50 to-blue-50" },
  ];

  const solutions = [
    {
      icon: Server,
      title: "Pannes d'infrastructure",
      description: "Détectez automatiquement les défaillances serveur, réseau ou base de données. Notre système corrèle les alertes pour identifier la cause racine en quelques secondes, pas en heures.",
      tags: ["Serveurs", "Réseau", "BDD", "Cloud"],
      image: "🖥️",
      metric: "-72%", metricLabel: "temps de détection"
    },
    {
      icon: AlertCircle,
      title: "Incidents de sécurité",
      description: "Répondez aux menaces cyber en temps réel. Isolation automatique des systèmes compromis, notification des équipes de sécurité et documentation complète pour la conformité.",
      tags: ["SIEM", "SOC", "RGPD", "ISO 27001"],
      image: "🔐",
      metric: "4min", metricLabel: "temps de réponse moyen"
    },
    {
      icon: Eye,
      title: "Dégradations de performance",
      description: "Identifiez les goulets d'étranglement avant que vos utilisateurs ne les ressentent. Suivi des SLA, alertes proactives et corrélation automatique des métriques applicatives.",
      tags: ["APM", "SLA", "UX", "Métriques"],
      image: "📊",
      metric: "99.9%", metricLabel: "uptime maintenu"
    },
    {
      icon: MessageSquare,
      title: "Communication de crise",
      description: "Gérez la communication interne et externe lors d'incidents critiques. Pages de statut publiques, templates de communication et historique complet des décisions prises.",
      tags: ["Stakeholders", "Status Page", "Slack", "Email"],
      image: "📢",
      metric: "3x", metricLabel: "meilleure coordination"
    },
  ];

  const team = [
    {
      name: "Sophie Marchand",
      role: "CEO & Co-fondatrice",
      bio: "Ex-CTO chez OVHcloud. 15 ans d'expérience en gestion d'incidents critiques pour des systèmes à 99.999% de disponibilité.",
      avatar: "SM",
      color: "from-violet-400 to-purple-600",
      social: { linkedin: "#", twitter: "#" },
      expertise: ["Leadership", "SRE", "Cloud Architecture"]
    },
    {
      name: "Thomas Leblanc",
      role: "CTO & Co-fondateur",
      bio: "Ancien ingénieur chez Datadog. Architecte des systèmes de monitoring distribué traitant 10M+ métriques/seconde.",
      avatar: "TL",
      color: "from-blue-400 to-cyan-600",
      social: { linkedin: "#", github: "#" },
      expertise: ["Distributed Systems", "Observability", "Go/Rust"]
    },
    {
      name: "Amélie Rousseau",
      role: "Head of Product",
      bio: "Product manager senior avec 10 ans dans les outils DevOps. A lancé 3 produits SaaS B2B à plus de 100M€ d'ARR.",
      avatar: "AR",
      color: "from-emerald-400 to-teal-600",
      social: { linkedin: "#", twitter: "#" },
      expertise: ["Product Strategy", "UX", "GTM"]
    },
    {
      name: "Maxime Fontaine",
      role: "Head of Security",
      bio: "CISSP certifié. Ex-responsable cybersécurité chez BNP Paribas. Expert en conformité SOC 2, ISO 27001 et RGPD.",
      avatar: "MF",
      color: "from-orange-400 to-red-500",
      social: { linkedin: "#", twitter: "#" },
      expertise: ["Cybersécurité", "Conformité", "Zero Trust"]
    },
    {
      name: "Clara Dupont",
      role: "Lead Designer",
      bio: "Designer senior spécialisée en interfaces complexes pour les équipes SRE/DevOps. Ancienne chez Figma et Notion.",
      avatar: "CD",
      color: "from-pink-400 to-rose-600",
      social: { linkedin: "#", twitter: "#" },
      expertise: ["UX Research", "Design Systems", "Figma"]
    },
    {
      name: "Julien Bernard",
      role: "VP Engineering",
      bio: "15 ans en ingénierie logicielle. A dirigé des équipes de 80+ ingénieurs chez Criteo. Passionné de systèmes résilients.",
      avatar: "JB",
      color: "from-slate-400 to-gray-600",
      social: { linkedin: "#", github: "#" },
      expertise: ["Engineering Management", "Kafka", "Kubernetes"]
    },
  ];

  const testimonials = [
    {
      quote: "IncidentPro a transformé notre façon de gérer les crises. Notre MTTR est passé de 4 heures à 18 minutes en 3 mois. C'est tout simplement remarquable.",
      name: "François Petit",
      role: "SRE Manager",
      company: "TechCorp France",
      avatar: "FP",
      stars: 5,
      color: "from-blue-500 to-cyan-500"
    },
    {
      quote: "L'intégration avec notre stack (Datadog, Slack, PagerDuty) a pris moins d'une heure. La détection automatique des incidents nous a sauvés plusieurs fois en production.",
      name: "Marie Lambert",
      role: "Head of Infrastructure",
      company: "Banque Digitale SA",
      avatar: "ML",
      stars: 5,
      color: "from-violet-500 to-purple-500"
    },
    {
      quote: "Le support 24/7 est exceptionnel — ils ont répondu à 3h du matin lors d'un incident critique et nous ont aidés à le résoudre en temps réel. Service incomparable.",
      name: "Pierre Durand",
      role: "CTO",
      company: "StartupScale",
      avatar: "PD",
      stars: 5,
      color: "from-emerald-500 to-teal-500"
    },
  ];

  const pricing = [
    {
      name: "Starter",
      price: "49",
      period: "mois",
      description: "Parfait pour les petites équipes qui démarrent avec la gestion d'incidents structurée.",
      features: ["Jusqu'à 10 utilisateurs", "500 incidents/mois", "5 intégrations incluses", "Alertes email & SMS", "Rapports mensuels", "Support email (48h)"],
      highlighted: false,
      cta: "Démarrer l'essai",
      badge: null
    },
    {
      name: "Professional",
      price: "149",
      period: "mois",
      description: "La solution complète pour les équipes DevOps et SRE qui nécessitent une fiabilité maximale.",
      features: ["Jusqu'à 50 utilisateurs", "Incidents illimités", "Toutes les intégrations (600+)", "War Rooms digitales", "Playbooks automatisés", "Analytiques avancées", "Post-mortems IA", "Support prioritaire 24/7"],
      highlighted: true,
      cta: "Commencer maintenant",
      badge: "⭐ Plus Populaire"
    },
    {
      name: "Enterprise",
      price: "Sur mesure",
      period: "",
      description: "Pour les grandes organisations avec des besoins de conformité et de scalabilité avancés.",
      features: ["Utilisateurs illimités", "SLA 99.99% garanti", "Déploiement on-premise", "SSO / SAML / LDAP", "Conformité SOC 2 / ISO 27001", "Customer Success Manager dédié", "Formation & onboarding", "Contrats sur mesure"],
      highlighted: false,
      cta: "Contacter les ventes",
      badge: null
    }
  ];

  const faqs = [
    { q: "Quelle est la disponibilité garantie de la plateforme ?", a: "Nous garantissons 99.9% d'uptime (SLA) pour les plans Starter et Professional, et 99.99% pour les clients Enterprise. Notre infrastructure est répartie sur plusieurs datacenters avec basculement automatique." },
    { q: "Comment se passe l'intégration avec mes outils existants ?", a: "IncidentPro offre plus de 600 intégrations natives via des connecteurs plug-and-play. Pour Slack, Teams, PagerDuty, Datadog, AWS et la majorité des outils majeurs, l'intégration prend moins de 10 minutes. Nous disposons également d'une API REST complète et de webhooks." },
    { q: "Mes données sont-elles sécurisées et conformes au RGPD ?", a: "Absolument. Toutes les données sont chiffrées en AES-256 au repos et en transit (TLS 1.3). Nos datacenters européens sont certifiés ISO 27001 et SOC 2 Type II. Nous sommes 100% conformes RGPD avec un DPA disponible sur demande." },
    { q: "Puis-je importer mes incidents existants ?", a: "Oui, nous offrons des outils d'import depuis les principales plateformes (PagerDuty, Opsgenie, VictorOps, Jira, etc.) ainsi qu'un import CSV/JSON. Notre équipe Customer Success vous accompagne gratuitement pendant la migration." },
    { q: "Quel est le délai de mise en place ?", a: "La majorité de nos clients sont opérationnels en moins de 48 heures. Pour les entreprises, notre équipe d'onboarding dédie 2 semaines pour configurer, intégrer et former vos équipes selon vos processus spécifiques." },
    { q: "Proposez-vous un essai gratuit ?", a: "Oui, nous offrons un essai gratuit de 14 jours sur le plan Professional, sans carte bancaire requise. Vous avez accès à toutes les fonctionnalités pour tester avec votre environnement réel." },
  ];

  const integrations = [
    { name: "Slack", icon: "💬", color: "bg-green-50 border-green-200" },
    { name: "PagerDuty", icon: "🔔", color: "bg-green-50 border-green-200" },
    { name: "Datadog", icon: "🐶", color: "bg-purple-50 border-purple-200" },
    { name: "AWS", icon: "☁️", color: "bg-orange-50 border-orange-200" },
    { name: "Jira", icon: "🎯", color: "bg-blue-50 border-blue-200" },
    { name: "GitHub", icon: "🐙", color: "bg-slate-50 border-slate-200" },
    { name: "Teams", icon: "💼", color: "bg-indigo-50 border-indigo-200" },
    { name: "Grafana", icon: "📈", color: "bg-orange-50 border-orange-200" },
    { name: "Prometheus", icon: "🔥", color: "bg-red-50 border-red-200" },
    { name: "Kubernetes", icon: "⚙️", color: "bg-blue-50 border-blue-200" },
    { name: "Terraform", icon: "🏗️", color: "bg-violet-50 border-violet-200" },
    { name: "OpsGenie", icon: "🚨", color: "bg-red-50 border-red-200" },
  ];

  const processSteps = [
    { num: "01", icon: User, title: "Détection", description: "L'incident est détecté automatiquement via vos intégrations monitoring ou signalé manuellement par votre équipe.", color: "text-blue-600", bg: "bg-blue-100" },
    { num: "02", icon: Target, title: "Triage & Priorisation", description: "Notre IA analyse l'impact, la sévérité et le contexte pour prioriser automatiquement et assigner aux bonnes personnes.", color: "text-orange-600", bg: "bg-orange-100" },
    { num: "03", icon: Users, title: "Réponse coordonnée", description: "La war room digitale est créée, les playbooks sont déclenchés et toute l'équipe est coordonnée en temps réel.", color: "text-violet-600", bg: "bg-violet-100" },
    { num: "04", icon: CheckSquare, title: "Résolution & Post-Mortem", description: "L'incident est résolu, documenté et un rapport post-mortem automatique est généré avec les recommandations.", color: "text-emerald-600", bg: "bg-emerald-100" },
  ];

  const nextSlide = () => setCurrentSlide((p) => (p + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((p) => (p - 1 + slides.length) % slides.length);
  useEffect(() => { const t = setInterval(nextSlide, 6000); return () => clearInterval(t); }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&family=Space+Mono:wght@400;700&display=swap');
        
        * { box-sizing: border-box; }
        
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        
        .mono { font-family: 'Space Mono', monospace; }
        
        :root {
          --navy: #0A0F1E;
          --navy-light: #111827;
          --blue: #2563EB;
          --blue-light: #3B82F6;
          --cyan: #06B6D4;
          --accent: #F59E0B;
          --success: #10B981;
          --danger: #EF4444;
        }

        .hero-bg {
          background: linear-gradient(135deg, #0A0F1E 0%, #0F1A35 40%, #0E1E40 70%, #0A1628 100%);
          position: relative;
          overflow: hidden;
        }

        .hero-bg::before {
          content: '';
          position: absolute;
          width: 800px;
          height: 800px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(37, 99, 235, 0.15) 0%, transparent 70%);
          top: -200px;
          right: -200px;
          pointer-events: none;
        }

        .hero-bg::after {
          content: '';
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%);
          bottom: -100px;
          left: -100px;
          pointer-events: none;
        }

        .grid-pattern {
          background-image: 
            linear-gradient(rgba(37, 99, 235, 0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37, 99, 235, 0.06) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        .stat-number {
          background: linear-gradient(135deg, #2563EB, #06B6D4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .glow-blue { box-shadow: 0 0 30px rgba(37, 99, 235, 0.3); }
        .glow-cyan { box-shadow: 0 0 30px rgba(6, 182, 212, 0.2); }

        .card-hover {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card-hover:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.12);
        }

        .feature-icon {
          transition: transform 0.3s ease;
        }
        .card-hover:hover .feature-icon {
          transform: scale(1.15) rotate(-5deg);
        }

        .slide-track {
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-link {
          position: relative;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #2563EB, #06B6D4);
          transition: width 0.3s ease;
        }
        .nav-link:hover::after { width: 100%; }

        .badge-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.4); }
          50% { box-shadow: 0 0 0 8px rgba(37, 99, 235, 0); }
        }

        .float-anim {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .gradient-text {
          background: linear-gradient(135deg, #2563EB 0%, #06B6D4 50%, #8B5CF6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .process-line::after {
          content: '';
          position: absolute;
          top: 50%;
          right: -50%;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, #2563EB, transparent);
          transform: translateY(-50%);
        }

        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s ease, padding 0.3s ease;
        }
        .faq-answer.open { max-height: 200px; }

        .tag-pill {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          padding: 3px 10px;
          border-radius: 20px;
        }

        @media (max-width: 768px) {
          .hero-title { font-size: 2.2rem; line-height: 1.15; }
          .section-title { font-size: 1.8rem; }
        }

        .topbar-scroll {
          background: rgba(10, 15, 30, 0.95);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(37, 99, 235, 0.15);
          box-shadow: 0 4px 24px rgba(0,0,0,0.3);
        }

        .mobile-menu {
          background: rgba(10, 15, 30, 0.98);
          backdrop-filter: blur(20px);
        }

        .integration-card:hover {
          transform: translateY(-4px) scale(1.05);
          box-shadow: 0 8px 24px rgba(0,0,0,0.1);
        }
        .integration-card { transition: all 0.25s ease; }
      `}</style>

      <div className="min-h-screen" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#0A0F1E', background: '#F8FAFF' }}>

        {/* ── TOP BAR ── */}
        <div style={{ background: '#0A0F1E' }} className="text-white text-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col sm:flex-row justify-between items-center gap-2">
            <div className="flex items-center gap-6 text-slate-300">
              <a href="tel:+33123456789" className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
                <Phone className="h-3 w-3" />+33 1 23 45 67 89
              </a>
              <a href="mailto:contact@incidentpro.fr" className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
                <Mail className="h-3 w-3" />contact@incidentpro.fr
              </a>
            </div>
            <div className="flex items-center gap-4 text-slate-300">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" style={{ animation: 'pulse-glow 2s infinite' }} />
                Tous les systèmes opérationnels
              </span>
              <a href="#contact" className="text-blue-400 hover:text-cyan-400 transition-colors font-medium">Contactez-nous →</a>
            </div>
          </div>
        </div>

        {/* ── NAVBAR UNIFIÉE ── */}
        <Nav user={auth.user ?? null} mode="landing" />

        {/* ── HERO CAROUSEL ── */}
        <section className="hero-bg grid-pattern">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 overflow-hidden">
            <div className="slide-track flex" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {slides.map((slide, idx) => (
                <div key={idx} className="min-w-full text-center text-white px-4">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 badge-glow"
                    style={{ background: 'rgba(37,99,235,0.2)', border: '1px solid rgba(37,99,235,0.4)', color: '#93C5FD' }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
                    {slide.tag}
                  </div>
                  <h2 className="hero-title text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {slide.title}<br />
                    <span className="gradient-text">{slide.highlight}</span>
                  </h2>
                  <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">{slide.description}</p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link href="/login">
                      <button className="px-8 py-4 rounded-xl font-bold text-white text-base transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #2563EB, #06B6D4)', boxShadow: '0 8px 32px rgba(37,99,235,0.4)' }}>
                        {slide.cta} <ArrowRight className="inline h-4 w-4 ml-1" />
                      </button>
                    </Link>
                    <button className="px-8 py-4 rounded-xl font-bold text-white text-base transition-all hover:bg-white/10 flex items-center justify-center gap-2"
                      style={{ border: '1px solid rgba(255,255,255,0.2)' }}>
                      <Play className="h-4 w-4" />{slide.ctaSecondary}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:bg-white/10"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <ChevronLeft className="h-5 w-5 text-white" />
            </button>
            <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:bg-white/10"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <ChevronRight className="h-5 w-5 text-white" />
            </button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {slides.map((_, i) => (
                <button key={i} onClick={() => setCurrentSlide(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-8 bg-blue-400' : 'w-2 bg-white/30'}`} />
              ))}
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <section style={{ background: '#0A0F1E' }} className="py-16 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16">
              <AnimatedStat value={999} suffix="%" prefix="" label="Uptime garanti" />
              <AnimatedStat value={5} suffix="min" label="MTTR moyen" />
              <AnimatedStat value={50} suffix="K+" label="Incidents résolus" />
              <AnimatedStat value={500} suffix="+" label="Entreprises clientes" />
            </div>
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section id="features" className="py-20 lg:py-28" style={{ background: '#F8FAFF' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="mono text-blue-600 text-xs font-bold uppercase tracking-[0.2em] mb-3 block">— Fonctionnalités —</span>
              <h2 className="section-title text-3xl lg:text-5xl font-black text-slate-900 mb-4">
                Tout ce dont vous avez<br /><span className="gradient-text">besoin pour réussir</span>
              </h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto">Une plateforme unifiée qui couvre l'ensemble du cycle de vie de vos incidents, de la détection à la prévention.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((f, i) => (
                <div key={i} className="card-hover bg-white rounded-2xl p-6 border border-slate-100">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.bg} flex items-center justify-center mb-4 feature-icon`}>
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${f.color} flex items-center justify-center`}>
                      <f.icon className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{f.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="py-20 lg:py-28" style={{ background: '#0A0F1E' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="mono text-cyan-400 text-xs font-bold uppercase tracking-[0.2em] mb-3 block">— Processus —</span>
              <h2 className="text-3xl lg:text-5xl font-black text-white mb-4">Comment ça <span className="gradient-text">fonctionne ?</span></h2>
              <p className="text-slate-400 text-lg max-w-xl mx-auto">Un workflow structuré et automatisé pour chaque type d'incident.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, i) => (
                <div key={i} className="text-center group">
                  <div className="relative inline-flex mb-6">
                    <div className={`w-16 h-16 rounded-2xl ${step.bg} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                      <step.icon className={`h-8 w-8 ${step.color}`} />
                    </div>
                    <span className="mono absolute -top-2 -right-2 text-xs font-bold text-slate-500 bg-slate-800 rounded px-1.5 py-0.5">{step.num}</span>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
                  {i < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-3/4 w-1/2 h-px bg-gradient-to-r from-blue-600/50 to-transparent" style={{ transform: 'translateX(50%)' }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SOLUTIONS ── */}
        <section id="solutions" className="py-20 lg:py-28" style={{ background: '#F8FAFF' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="mono text-blue-600 text-xs font-bold uppercase tracking-[0.2em] mb-3 block">— Solutions —</span>
              <h2 className="section-title text-3xl lg:text-5xl font-black text-slate-900 mb-4">
                Problèmes courants,<br /><span className="gradient-text">solutions concrètes</span>
              </h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto">IncidentPro s'adapte à chaque type d'incident que votre organisation peut rencontrer.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {solutions.map((s, i) => (
                <div key={i} className="card-hover bg-white rounded-2xl p-8 border border-slate-100 flex flex-col gap-5">
                  <div className="flex items-start gap-4">
                    <div className="text-5xl float-anim" style={{ animationDelay: `${i * 0.4}s` }}>{s.image}</div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <s.icon className="h-4 w-4 text-blue-600" />
                        <h3 className="font-black text-slate-900 text-xl">{s.title}</h3>
                      </div>
                      <p className="text-slate-500 text-sm leading-relaxed">{s.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                    <div className="flex flex-wrap gap-2">
                      {s.tags.map(tag => (
                        <span key={tag} className="tag-pill" style={{ background: '#EFF6FF', color: '#2563EB' }}>{tag}</span>
                      ))}
                    </div>
                    <div className="text-right shrink-0 ml-4">
                      <div className="text-2xl font-black gradient-text">{s.metric}</div>
                      <div className="text-xs text-slate-400 font-medium">{s.metricLabel}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── INTEGRATIONS ── */}
        <section className="py-20 lg:py-28" style={{ background: '#0F1729' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="mono text-cyan-400 text-xs font-bold uppercase tracking-[0.2em] mb-3 block">— Intégrations —</span>
              <h2 className="text-3xl lg:text-5xl font-black text-white mb-4">Connectez votre <span className="gradient-text">stack entier</span></h2>
              <p className="text-slate-400 text-lg max-w-xl mx-auto">Plus de 600 intégrations natives. Prêt en quelques minutes, pas en jours.</p>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4 mb-10">
              {integrations.map((integ, i) => (
                <div key={i} className={`integration-card rounded-2xl p-4 flex flex-col items-center gap-2 border cursor-pointer ${integ.color}`}>
                  <span className="text-3xl">{integ.icon}</span>
                  <span className="text-xs font-bold text-slate-600">{integ.name}</span>
                </div>
              ))}
            </div>
            <div className="text-center">
              <span className="text-slate-400 text-sm">et <span className="text-white font-bold">600+</span> autres intégrations disponibles</span>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="py-20 lg:py-28" style={{ background: '#F8FAFF' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="mono text-blue-600 text-xs font-bold uppercase tracking-[0.2em] mb-3 block">— Témoignages —</span>
              <h2 className="section-title text-3xl lg:text-5xl font-black text-slate-900 mb-4">
                Ils nous font <span className="gradient-text">confiance</span>
              </h2>
              <p className="text-slate-500 text-lg">Des équipes SRE et DevOps qui ont transformé leur gestion des incidents.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <div key={i} className="card-hover bg-white rounded-2xl p-7 border border-slate-100 flex flex-col gap-5">
                  <div className="flex gap-1">
                    {Array.from({ length: t.stars }).map((_, s) => (
                      <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-700 leading-relaxed text-sm flex-1">"{t.quote}"</p>
                  <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-xs font-black`}>{t.avatar}</div>
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{t.name}</div>
                      <div className="text-slate-400 text-xs">{t.role} · {t.company}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TEAM ── */}
        <section id="team" className="py-20 lg:py-28" style={{ background: '#0A0F1E' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="mono text-cyan-400 text-xs font-bold uppercase tracking-[0.2em] mb-3 block">— Notre Équipe —</span>
              <h2 className="text-3xl lg:text-5xl font-black text-white mb-4">Les experts derrière <span className="gradient-text">IncidentPro</span></h2>
              <p className="text-slate-400 text-lg max-w-xl mx-auto">Une équipe de vétérans du secteur, obsédée par la fiabilité des systèmes.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {team.map((member, i) => (
                <div key={i} className="card-hover rounded-2xl p-6 group cursor-pointer" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center text-white font-black text-lg shrink-0 transition-transform duration-300 group-hover:scale-110`}>
                      {member.avatar}
                    </div>
                    <div>
                      <h3 className="text-white font-black text-lg leading-tight">{member.name}</h3>
                      <p className="text-blue-400 text-sm font-medium">{member.role}</p>
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">{member.bio}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {member.expertise.map(exp => (
                      <span key={exp} className="tag-pill" style={{ background: 'rgba(37,99,235,0.15)', color: '#93C5FD' }}>{exp}</span>
                    ))}
                  </div>
                  <div className="flex gap-3 border-t pt-4" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
                    {member.social.linkedin && (
                      <a href={member.social.linkedin} className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-blue-600/20" style={{ background: 'rgba(255,255,255,0.05)' }}>
                        <Linkedin className="h-4 w-4 text-slate-400 hover:text-blue-400" />
                      </a>
                    )}
                    {member.social.twitter && (
                      <a href={member.social.twitter} className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-cyan-600/20" style={{ background: 'rgba(255,255,255,0.05)' }}>
                        <Twitter className="h-4 w-4 text-slate-400 hover:text-cyan-400" />
                      </a>
                    )}
                    {member.social.github && (
                      <a href={member.social.github} className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-slate-600/20" style={{ background: 'rgba(255,255,255,0.05)' }}>
                        <Github className="h-4 w-4 text-slate-400 hover:text-white" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRICING ── */}
        <section id="pricing" className="py-20 lg:py-28" style={{ background: '#F8FAFF' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="mono text-blue-600 text-xs font-bold uppercase tracking-[0.2em] mb-3 block">— Tarifs —</span>
              <h2 className="section-title text-3xl lg:text-5xl font-black text-slate-900 mb-4">
                Transparent, <span className="gradient-text">sans surprises</span>
              </h2>
              <p className="text-slate-500 text-lg">14 jours d'essai gratuit sur tous les plans. Aucune carte bancaire requise.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              {pricing.map((plan, i) => (
                <div key={i} className={`rounded-2xl p-8 relative ${plan.highlighted ? 'shadow-2xl' : 'bg-white border border-slate-100'}`}
                  style={plan.highlighted ? { background: '#0A0F1E', border: '2px solid #2563EB' } : {}}>
                  {plan.badge && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-bold text-white"
                      style={{ background: 'linear-gradient(135deg, #2563EB, #06B6D4)', boxShadow: '0 4px 15px rgba(37,99,235,0.5)' }}>
                      {plan.badge}
                    </div>
                  )}
                  <h3 className={`text-2xl font-black mb-1 ${plan.highlighted ? 'text-white' : 'text-slate-900'}`}>{plan.name}</h3>
                  <p className={`text-sm mb-6 ${plan.highlighted ? 'text-slate-400' : 'text-slate-500'}`}>{plan.description}</p>
                  <div className="mb-8">
                    {plan.price !== "Sur mesure" ? (
                      <>
                        <span className={`text-5xl font-black ${plan.highlighted ? 'text-white' : 'text-slate-900'}`}>€{plan.price}</span>
                        <span className={`text-sm ml-1 ${plan.highlighted ? 'text-slate-400' : 'text-slate-500'}`}>/{plan.period}</span>
                      </>
                    ) : (
                      <span className={`text-3xl font-black ${plan.highlighted ? 'text-white' : 'text-slate-900'}`}>{plan.price}</span>
                    )}
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feat, fi) => (
                      <li key={fi} className="flex items-start gap-3">
                        <CheckCircle className={`h-4 w-4 mt-0.5 shrink-0 ${plan.highlighted ? 'text-cyan-400' : 'text-emerald-500'}`} />
                        <span className={`text-sm ${plan.highlighted ? 'text-slate-300' : 'text-slate-600'}`}>{feat}</span>
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all hover:scale-105 ${plan.highlighted ? 'text-white' : 'text-white bg-slate-900 hover:bg-slate-800'}`}
                    style={plan.highlighted ? { background: 'linear-gradient(135deg, #2563EB, #06B6D4)', boxShadow: '0 4px 20px rgba(37,99,235,0.4)' } : {}}>
                    {plan.cta} →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-20 lg:py-28" style={{ background: '#0A0F1E' }}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="mono text-cyan-400 text-xs font-bold uppercase tracking-[0.2em] mb-3 block">— FAQ —</span>
              <h2 className="text-3xl lg:text-5xl font-black text-white mb-4">Questions <span className="gradient-text">fréquentes</span></h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left gap-4">
                    <span className="text-white font-semibold text-sm leading-relaxed">{faq.q}</span>
                    <ChevronDown className={`h-4 w-4 text-slate-400 shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`faq-answer px-6 ${openFaq === i ? 'open pb-5' : ''}`}>
                    <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="py-20 lg:py-28" style={{ background: '#F8FAFF' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <span className="mono text-blue-600 text-xs font-bold uppercase tracking-[0.2em] mb-3 block">— Contact —</span>
                <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-4">Parlons de vos <span className="gradient-text">besoins</span></h2>
                <p className="text-slate-500 leading-relaxed mb-8">Notre équipe commerciale vous répond sous 2 heures ouvrées. Pour les urgences techniques, notre support 24/7 est disponible pour les clients Professional et Enterprise.</p>
                <div className="space-y-5">
                  {[
                    { icon: Phone, label: "Téléphone", value: "+33 1 23 45 67 89", href: "tel:+33123456789" },
                    { icon: Mail, label: "Email", value: "contact@incidentpro.fr", href: "mailto:contact@incidentpro.fr" },
                    { icon: MapPin, label: "Adresse", value: "15 Av. des Champs-Élysées, 75008 Paris", href: "#" },
                    { icon: Headphones, label: "Support 24/7", value: "support@incidentpro.fr", href: "mailto:support@incidentpro.fr" },
                  ].map(({ icon: Icon, label, value, href }) => (
                    <a key={label} href={href} className="flex items-center gap-4 group">
                      <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center transition-colors group-hover:bg-blue-100">
                        <Icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-400 font-medium uppercase tracking-wide">{label}</div>
                        <div className="text-slate-800 font-semibold text-sm">{value}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
                <h3 className="text-xl font-black text-slate-900 mb-6">Envoyer un message</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1.5">Nom complet</label>
                    <input type="text" value={contactName} onChange={e => setContactName(e.target.value)}
                      placeholder="Jean Dupont" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-400 transition-colors" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1.5">Email professionnel</label>
                    <input type="email" value={contactEmail} onChange={e => setContactEmail(e.target.value)}
                      placeholder="jean@entreprise.fr" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-400 transition-colors" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1.5">Message</label>
                    <textarea value={contactMessage} onChange={e => setContactMessage(e.target.value)} rows={4}
                      placeholder="Décrivez votre besoin ou posez votre question..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-400 transition-colors resize-none" />
                  </div>
                  <button className="w-full py-3.5 rounded-xl font-bold text-white text-sm transition-all hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #2563EB, #06B6D4)', boxShadow: '0 4px 20px rgba(37,99,235,0.35)' }}>
                    Envoyer le message →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA BANNER ── */}
        <section className="py-20" style={{ background: 'linear-gradient(135deg, #0A0F1E 0%, #0E1E40 50%, #0A1628 100%)' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="text-6xl mb-6 float-anim">🚀</div>
            <h2 className="text-3xl lg:text-5xl font-black text-white mb-4">
              Prêt à passer au niveau<br /><span className="gradient-text">supérieur ?</span>
            </h2>
            <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">Rejoignez 500+ entreprises qui ont réduit leur MTTR de 70% en moins de 3 mois. Essai gratuit, sans carte bancaire.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/login">
                <button className="px-8 py-4 rounded-xl font-bold text-white transition-all hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #2563EB, #06B6D4)', boxShadow: '0 8px 32px rgba(37,99,235,0.4)' }}>
                  Démarrer l'essai gratuit 14 jours →
                </button>
              </Link>
              <a href="#contact">
                <button className="px-8 py-4 rounded-xl font-bold text-white transition-all hover:bg-white/10"
                  style={{ border: '1px solid rgba(255,255,255,0.2)' }}>
                  Parler à un expert
                </button>
              </a>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{ background: '#060A14' }} className="text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
              {/* Brand */}
              <div className="lg:col-span-2 space-y-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xl font-black">Incident<span className="text-blue-400">Pro</span></span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed max-w-xs">La plateforme de référence pour les équipes SRE et DevOps qui refusent de subir leurs incidents.</p>
                <div className="flex gap-3">
                  {[Facebook, Twitter, Linkedin, Github].map((Icon, i) => (
                    <a key={i} href="#" className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:bg-blue-600/20 hover:-translate-y-0.5"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}>
                      <Icon className="h-4 w-4 text-slate-400" />
                    </a>
                  ))}
                </div>
                <div className="p-4 rounded-xl" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold mb-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />Statut des systèmes
                  </div>
                  <p className="text-slate-400 text-xs">Tous les systèmes opérationnels · Uptime 99.98% ce mois</p>
                </div>
              </div>

              {/* Links */}
              {[
                { title: "Produit", links: ["Fonctionnalités", "Intégrations", "Tarifs", "API", "Sécurité", "Nouveautés"] },
                { title: "Ressources", links: ["Documentation", "Blog technique", "Guides SRE", "Support", "Status Page", "Changelog"] },
                { title: "Entreprise", links: ["À propos", "Équipe", "Carrières", "Presse", "Partenaires", "Confidentialité"] },
              ].map(col => (
                <div key={col.title}>
                  <h4 className="font-bold text-white text-sm mb-4">{col.title}</h4>
                  <ul className="space-y-2.5">
                    {col.links.map(link => (
                      <li key={link}><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">{link}</a></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Newsletter */}
            <div className="border-t mt-12 pt-10" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                  <h4 className="font-bold text-white mb-1">Newsletter SRE</h4>
                  <p className="text-slate-400 text-sm">Conseils, retours d'expérience et veille sur la gestion d'incidents. Bi-mensuel, sans spam.</p>
                </div>
                <div className="flex gap-2 w-full lg:w-auto">
                  <input type="email" value={newsletterEmail} onChange={e => setNewsletterEmail(e.target.value)}
                    placeholder="votre@email.fr"
                    className="flex-1 lg:w-60 px-4 py-2.5 rounded-xl text-sm text-white outline-none focus:border-blue-400 transition-colors"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }} />
                  <button className="px-5 py-2.5 rounded-xl font-bold text-white text-sm whitespace-nowrap transition-all hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #2563EB, #06B6D4)' }}>
                    S'inscrire
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom */}
            <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              <p className="text-slate-500 text-xs mono">© 2026 IncidentPro SAS · Made with ❤️ à Paris, France</p>
              <div className="flex gap-6">
                {["Confidentialité", "CGU", "Cookies", "RGPD"].map(link => (
                  <a key={link} href="#" className="text-slate-500 hover:text-slate-300 text-xs transition-colors">{link}</a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
