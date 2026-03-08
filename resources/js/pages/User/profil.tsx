import { useState } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { TechnicienSidebar } from "@/components/technicientSidebar"
import { SiteHeader } from "@/components/site-header"
import { User } from "@/types"
import {
  IconShield,
  IconTool,
  IconClipboardCheck,
  IconClock,
  IconAlertTriangle,
  IconCircleCheck,
  IconFlame,
  IconEdit,
  IconCamera,
  IconMail,
  IconPhone,
  IconMapPin,
  IconBriefcase,
  IconCalendar,
  IconStar,
  IconTrendingUp,
  IconActivity,
  IconBolt,
  IconAward,
  IconChartBar,
  IconEye,
  IconArrowRight,
  IconSettings,
  IconBell,
  IconLogout,
  IconBadge,
  IconFingerprint,
  IconWifi,
} from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Link } from "@inertiajs/react"

interface Props {
  user: User
}

// ── Mock Data ──────────────────────────────────────────────────────────────
const MOCK_STATS = {
  total: 47,
  resolved: 38,
  inProgress: 6,
  pending: 3,
  resolutionRate: 81,
  avgResponseTime: "1h 23m",
  streak: 12,
  rating: 4.8,
}

const MOCK_RECENT_INCIDENTS = [
  { id: "INC-0041", title: "Panne serveur DB principale", priority: "critique", status: "résolu", date: "Aujourd'hui, 09:14", category: "Infrastructure" },
  { id: "INC-0040", title: "VPN inaccessible - Siège social", priority: "haute", status: "en cours", date: "Aujourd'hui, 08:32", category: "Réseau" },
  { id: "INC-0039", title: "Imprimante R&D hors service", priority: "normale", status: "résolu", date: "Hier, 16:55", category: "Matériel" },
  { id: "INC-0037", title: "Ralentissement application CRM", priority: "haute", status: "résolu", date: "Hier, 11:20", category: "Logiciel" },
  { id: "INC-0035", title: "Accès refusé suite MàJ", priority: "normale", status: "en attente", date: "22 Fév, 14:07", category: "Sécurité" },
]

const MOCK_SKILLS = [
  { name: "Réseau & Infrastructure", level: 92 },
  { name: "Sécurité Systèmes", level: 85 },
  { name: "Support Matériel", level: 78 },
  { name: "Bases de Données", level: 70 },
  { name: "Cloud & Virtualisation", level: 65 },
]

const MOCK_ACTIVITY = [4, 7, 3, 9, 5, 11, 8, 6, 12, 4, 7, 9, 3, 8, 10, 5, 6, 11, 7, 4, 9, 8, 6, 10, 7, 5, 8, 4]

const PRIORITY_CONFIG: Record<string, { label: string; color: string; bg: string; dot: string }> = {
  critique: { label: "Critique", color: "text-red-600", bg: "bg-red-50 border-red-200", dot: "bg-red-500" },
  haute:    { label: "Haute",    color: "text-orange-600", bg: "bg-orange-50 border-orange-200", dot: "bg-orange-500" },
  normale:  { label: "Normale",  color: "text-blue-600", bg: "bg-blue-50 border-blue-200", dot: "bg-blue-400" },
  basse:    { label: "Basse",    color: "text-slate-500", bg: "bg-slate-50 border-slate-200", dot: "bg-slate-400" },
}

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  "résolu":     { label: "Résolu",     color: "text-emerald-700", bg: "bg-emerald-100" },
  "en cours":   { label: "En cours",   color: "text-blue-700", bg: "bg-blue-100" },
  "en attente": { label: "En attente", color: "text-amber-700", bg: "bg-amber-100" },
}

// ── Sub-components ─────────────────────────────────────────────────────────

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  accent,
}: {
  icon: React.ElementType
  label: string
  value: string | number
  sub?: string
  accent: string
}) {
  return (
    <div
      className={`
        group relative overflow-hidden rounded-2xl border border-slate-200/80
        bg-white p-5 shadow-sm transition-all duration-300
        hover:shadow-lg hover:-translate-y-0.5 cursor-default
      `}
    >
      {/* Accent glow */}
      <div className={`absolute -top-6 -right-6 h-20 w-20 rounded-full ${accent} opacity-10 blur-xl group-hover:opacity-20 transition-opacity`} />

      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-slate-400">{label}</p>
          <p className="mt-1.5 text-3xl font-bold tracking-tight text-slate-900">{value}</p>
          {sub && <p className="mt-1 text-xs text-slate-500">{sub}</p>}
        </div>
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${accent} bg-opacity-15`}>
          <Icon className={`h-5 w-5`} />
        </div>
      </div>
    </div>
  )
}

function ActivityGraph({ data }: { data: number[] }) {
  const max = Math.max(...data)
  return (
    <div className="flex items-end gap-1 h-16">
      {data.map((v, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm bg-blue-500/20 hover:bg-blue-500/60 transition-all duration-200 cursor-pointer group relative"
          style={{ height: `${(v / max) * 100}%` }}
          title={`${v} interventions`}
        >
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 hidden group-hover:block bg-slate-800 text-white text-[10px] rounded px-1.5 py-0.5 whitespace-nowrap z-10">
            {v}
          </div>
        </div>
      ))}
    </div>
  )
}

function SkillBar({ name, level }: { name: string; level: number }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-slate-700">{name}</span>
        <span className="text-xs font-bold text-slate-500">{level}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-700"
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  )
}

// ── Main Page ──────────────────────────────────────────────────────────────

export default function Profil({ user }: Props) {
  const [activeTab, setActiveTab] = useState<"overview" | "incidents" | "settings">("overview")

  const displayName = user?.name ?? "Technicien"
  const initials = displayName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <TechnicienSidebar user={user} />

      <SidebarInset>
        <SiteHeader titre="Mon Profil" />

        <div className="min-h-screen bg-[#f6f8fb] font-sans">
          {/* ── HERO BANNER ──────────────────────────────────────────────── */}
          <div className="relative h-48 overflow-hidden bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900">
            {/* Animated grid */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(59,130,246,.4) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(59,130,246,.4) 1px, transparent 1px)
                `,
                backgroundSize: "32px 32px",
              }}
            />
            {/* Glowing orbs */}
            <div className="absolute top-6 left-1/4 h-40 w-40 rounded-full bg-blue-600/30 blur-3xl" />
            <div className="absolute bottom-0 right-1/3 h-32 w-32 rounded-full bg-cyan-500/20 blur-2xl" />

            {/* Status badge top right */}
            <div className="absolute top-4 right-6 flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              <span className="text-xs font-medium text-emerald-300">En ligne</span>
            </div>
          </div>

          {/* ── PROFILE HEADER ───────────────────────────────────────────── */}
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="relative -mt-16 mb-6 flex flex-col sm:flex-row sm:items-end gap-5 sm:gap-6">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="h-28 w-28 rounded-2xl border-4 border-white shadow-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
                  <span className="text-3xl font-bold text-white tracking-tight">{initials}</span>
                </div>
                <button className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-blue-600 shadow-md hover:bg-blue-700 transition-colors">
                  <IconCamera className="h-3.5 w-3.5 text-white" />
                </button>
                {/* Online dot */}
                <span className="absolute top-2 right-2 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-400" />
              </div>

              {/* Name + meta */}
              <div className="flex-1 pb-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                  <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{displayName}</h1>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-600 px-2.5 py-0.5 text-xs font-semibold text-white">
                      <IconShield className="h-3 w-3" /> Technicien N2
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full border border-amber-300 bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
                      <IconStar className="h-3 w-3 fill-amber-400 text-amber-400" /> Top Performer
                    </span>
                  </div>
                </div>
                <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
                  <span className="flex items-center gap-1"><IconMail className="h-3.5 w-3.5" />{user?.email ?? "technicien@acme.com"}</span>
                  <span className="flex items-center gap-1"><IconMapPin className="h-3.5 w-3.5" />Yaoundé, CM</span>
                  <span className="flex items-center gap-1"><IconCalendar className="h-3.5 w-3.5" />Membre depuis Jan 2023</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pb-1">
                <Link href="/user/profil/edit">
                  <Button size="sm" variant="outline" className="gap-1.5 border-slate-300 hover:border-blue-400 hover:text-blue-600 transition-colors">
                    <IconEdit className="h-3.5 w-3.5" /> Modifier
                  </Button>
                </Link>
                <Button size="sm" className="gap-1.5 bg-blue-600 hover:bg-blue-700">
                  <IconTool className="h-3.5 w-3.5" /> Nouvelle intervention
                </Button>
              </div>
            </div>

            {/* ── NAVIGATION TABS ──────────────────────────────────────── */}
            <div className="mb-6 flex gap-1 border-b border-slate-200">
              {(["overview", "incidents", "settings"] as const).map((tab) => {
                const labels: Record<string, string> = { overview: "Vue d'ensemble", incidents: "Mes incidents", settings: "Paramètres" }
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-all duration-200 ${
                      activeTab === tab
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"
                    }`}
                  >
                    {labels[tab]}
                  </button>
                )
              })}
            </div>

            {/* ── OVERVIEW TAB ─────────────────────────────────────────── */}
            {activeTab === "overview" && (
              <div className="space-y-6 pb-10">
                {/* KPI Cards */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <StatCard icon={IconClipboardCheck} label="Total Incidents" value={MOCK_STATS.total} sub="Ce mois-ci" accent="bg-blue-500" />
                  <StatCard icon={IconCircleCheck} label="Résolus" value={MOCK_STATS.resolved} sub={`Taux ${MOCK_STATS.resolutionRate}%`} accent="bg-emerald-500" />
                  <StatCard icon={IconBolt} label="Temps moyen" value={MOCK_STATS.avgResponseTime} sub="Réponse initiale" accent="bg-amber-500" />
                  <StatCard icon={IconFlame} label="Série active" value={`${MOCK_STATS.streak}j`} sub="Sans incident ouvert" accent="bg-rose-500" />
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                  {/* Activité + Compétences */}
                  <div className="col-span-2 space-y-5">

                    {/* Activité graph */}
                    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
                      <div className="mb-4 flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-slate-900">Activité des 28 derniers jours</h3>
                          <p className="text-xs text-slate-400 mt-0.5">Nombre d'interventions par jour</p>
                        </div>
                        <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-1">
                          <IconTrendingUp className="h-3 w-3" /> +14% vs mois dernier
                        </span>
                      </div>
                      <ActivityGraph data={MOCK_ACTIVITY} />
                      <div className="mt-3 flex justify-between text-[10px] text-slate-400">
                        <span>27 Jan</span><span>23 Fév</span>
                      </div>
                    </div>

                    {/* Incidents récents */}
                    <div className="rounded-2xl border border-slate-200/80 bg-white shadow-sm overflow-hidden">
                      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                        <div>
                          <h3 className="font-semibold text-slate-900">Incidents récents</h3>
                          <p className="text-xs text-slate-400 mt-0.5">5 dernières interventions</p>
                        </div>
                        <Link href="/intervention/view">
                          <button className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors">
                            Voir tout <IconArrowRight className="h-3 w-3" />
                          </button>
                        </Link>
                      </div>
                      <div className="divide-y divide-slate-50">
                        {MOCK_RECENT_INCIDENTS.map((inc) => {
                          const p = PRIORITY_CONFIG[inc.priority] ?? PRIORITY_CONFIG.normale
                          const s = STATUS_CONFIG[inc.status] ?? STATUS_CONFIG["en attente"]
                          return (
                            <div
                              key={inc.id}
                              className="flex items-center gap-4 px-5 py-3.5 hover:bg-slate-50 transition-colors cursor-pointer group"
                            >
                              <div className={`h-2 w-2 flex-shrink-0 rounded-full ${p.dot}`} />
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-mono text-slate-400">{inc.id}</span>
                                  <span className="truncate text-sm font-medium text-slate-800 group-hover:text-blue-700 transition-colors">{inc.title}</span>
                                </div>
                                <div className="mt-0.5 flex items-center gap-2 text-xs text-slate-400">
                                  <span>{inc.category}</span>
                                  <span>·</span>
                                  <span>{inc.date}</span>
                                </div>
                              </div>
                              <span className={`flex-shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ${s.bg} ${s.color}`}>
                                {s.label}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Sidebar cards */}
                  <div className="space-y-5">

                    {/* Performance score */}
                    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
                      <h3 className="font-semibold text-slate-900 mb-1">Score de performance</h3>
                      <p className="text-xs text-slate-400 mb-4">Évaluation globale du mois</p>
                      <div className="flex items-center justify-center">
                        <div className="relative h-32 w-32">
                          <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                            <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f1f5f9" strokeWidth="2.5" />
                            <circle
                              cx="18" cy="18" r="15.9" fill="none"
                              stroke="url(#scoreGrad)" strokeWidth="2.5"
                              strokeDasharray={`${MOCK_STATS.resolutionRate} ${100 - MOCK_STATS.resolutionRate}`}
                              strokeLinecap="round"
                            />
                            <defs>
                              <linearGradient id="scoreGrad" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#3b82f6" />
                                <stop offset="100%" stopColor="#06b6d4" />
                              </linearGradient>
                            </defs>
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-2xl font-bold text-slate-900">{MOCK_STATS.resolutionRate}%</span>
                            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Score</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-3 text-center">
                        <div className="rounded-xl bg-slate-50 p-2.5">
                          <p className="text-lg font-bold text-slate-900">{MOCK_STATS.rating}</p>
                          <p className="text-[10px] text-slate-400 uppercase tracking-wider">Note moy.</p>
                        </div>
                        <div className="rounded-xl bg-slate-50 p-2.5">
                          <p className="text-lg font-bold text-slate-900">{MOCK_STATS.inProgress}</p>
                          <p className="text-[10px] text-slate-400 uppercase tracking-wider">En cours</p>
                        </div>
                      </div>
                    </div>

                    {/* Compétences */}
                    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
                      <h3 className="font-semibold text-slate-900 mb-1">Compétences techniques</h3>
                      <p className="text-xs text-slate-400 mb-4">Évaluation par domaine</p>
                      <div className="space-y-3.5">
                        {MOCK_SKILLS.map((s) => (
                          <SkillBar key={s.name} name={s.name} level={s.level} />
                        ))}
                      </div>
                    </div>

                    {/* Certifications */}
                    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
                      <h3 className="font-semibold text-slate-900 mb-3">Certifications</h3>
                      <div className="space-y-2.5">
                        {[
                          { label: "CompTIA A+", year: "2022", color: "bg-blue-100 text-blue-700" },
                          { label: "ITIL Foundation", year: "2023", color: "bg-violet-100 text-violet-700" },
                          { label: "Cisco CCNA", year: "2024", color: "bg-cyan-100 text-cyan-700" },
                        ].map((cert) => (
                          <div key={cert.label} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <IconAward className="h-4 w-4 text-slate-400" />
                              <span className="text-sm font-medium text-slate-700">{cert.label}</span>
                            </div>
                            <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${cert.color}`}>{cert.year}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── INCIDENTS TAB ─────────────────────────────────────────── */}
            {activeTab === "incidents" && (
              <div className="pb-10">
                <div className="rounded-2xl border border-slate-200/80 bg-white shadow-sm overflow-hidden">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-5 border-b border-slate-100">
                    <div>
                      <h3 className="font-semibold text-slate-900">Tous mes incidents</h3>
                      <p className="text-xs text-slate-400 mt-0.5">Historique complet de vos interventions</p>
                    </div>
                    <div className="flex gap-2">
                      {["Tous", "En cours", "Résolu", "En attente"].map((f) => (
                        <button
                          key={f}
                          className="rounded-full px-3 py-1 text-xs font-medium border border-slate-200 text-slate-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Table */}
                  <div className="divide-y divide-slate-50">
                    {MOCK_RECENT_INCIDENTS.concat(MOCK_RECENT_INCIDENTS).map((inc, i) => {
                      const p = PRIORITY_CONFIG[inc.priority] ?? PRIORITY_CONFIG.normale
                      const s = STATUS_CONFIG[inc.status] ?? STATUS_CONFIG["en attente"]
                      return (
                        <div
                          key={`${inc.id}-${i}`}
                          className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          <div className={`h-2.5 w-2.5 flex-shrink-0 rounded-full ${p.dot}`} />
                          <div className="w-24 flex-shrink-0">
                            <span className="text-xs font-mono font-semibold text-slate-500">{inc.id}</span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-slate-800">{inc.title}</p>
                            <p className="text-xs text-slate-400 mt-0.5">{inc.category} · {inc.date}</p>
                          </div>
                          <span className={`hidden sm:inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold border ${p.bg} ${p.color}`}>
                            {p.label}
                          </span>
                          <span className={`flex-shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${s.bg} ${s.color}`}>
                            {s.label}
                          </span>
                          <IconEye className="hidden sm:block h-4 w-4 flex-shrink-0 text-slate-300 hover:text-blue-500 transition-colors" />
                        </div>
                      )
                    })}
                  </div>

                  <div className="flex justify-center py-5 border-t border-slate-100">
                    <Link href="/intervention/view">
                      <Button size="sm" variant="outline" className="gap-2 border-slate-300">
                        Voir tous les incidents <IconArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* ── SETTINGS TAB ─────────────────────────────────────────── */}
            {activeTab === "settings" && (
              <div className="pb-10 space-y-5 max-w-2xl">
                {/* Informations personnelles */}
                <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
                  <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <IconFingerprint className="h-4 w-4 text-blue-600" /> Informations personnelles
                  </h3>
                  <div className="space-y-4">
                    {[
                      { label: "Nom complet", value: displayName, icon: IconBriefcase },
                      { label: "Email", value: user?.email ?? "technicien@acme.com", icon: IconMail },
                      { label: "Téléphone", value: "+237 6XX XXX XXX", icon: IconPhone },
                      { label: "Localisation", value: "Yaoundé, Cameroun", icon: IconMapPin },
                    ].map((field) => (
                      <div key={field.label} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                        <div className="flex items-center gap-3">
                          <field.icon className="h-4 w-4 text-slate-400" />
                          <div>
                            <p className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">{field.label}</p>
                            <p className="text-sm font-medium text-slate-800">{field.value}</p>
                          </div>
                        </div>
                        <button className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors">Modifier</button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Link href="/user/profil/edit">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 gap-1.5">
                        <IconEdit className="h-3.5 w-3.5" /> Modifier le profil
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Notifications */}
                <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
                  <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <IconBell className="h-4 w-4 text-blue-600" /> Préférences de notification
                  </h3>
                  <div className="space-y-3">
                    {[
                      { label: "Nouveaux incidents assignés", desc: "Recevoir une alerte à chaque assignation" },
                      { label: "Mises à jour d'incidents", desc: "Changement de statut ou commentaire" },
                      { label: "Rappels d'échéance", desc: "Notification 1h avant expiration SLA" },
                    ].map((notif) => (
                      <div key={notif.label} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                        <div>
                          <p className="text-sm font-medium text-slate-800">{notif.label}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{notif.desc}</p>
                        </div>
                        {/* Toggle */}
                        <div className="relative">
                          <input type="checkbox" defaultChecked className="sr-only peer" id={`tog-${notif.label}`} />
                          <label
                            htmlFor={`tog-${notif.label}`}
                            className="
                              relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full
                              bg-slate-200 transition-colors duration-200
                              peer-checked:bg-blue-600
                            "
                          >
                            <span className="
                              inline-block h-4 w-4 translate-x-1 transform rounded-full bg-white shadow transition-transform duration-200
                              peer-checked:translate-x-6
                            " />
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Danger zone */}
                <div className="rounded-2xl border border-red-200 bg-red-50/50 p-6">
                  <h3 className="font-semibold text-red-700 mb-1">Zone de danger</h3>
                  <p className="text-xs text-red-500 mb-4">Ces actions sont irréversibles. Agissez avec précaution.</p>
                  <Button size="sm" variant="outline" className="border-red-300 text-red-600 hover:bg-red-100 gap-1.5">
                    <IconLogout className="h-3.5 w-3.5" /> Se déconnecter de tous les appareils
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}