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
  IconChevronRight,
  IconCheck,
  IconDots,
} from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
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
  { name: "Réseau & Infrastructure", level: 92, color: "from-sky-500 to-blue-600" },
  { name: "Sécurité Systèmes", level: 85, color: "from-violet-500 to-purple-600" },
  { name: "Support Matériel", level: 78, color: "from-emerald-500 to-teal-600" },
  { name: "Bases de Données", level: 70, color: "from-amber-500 to-orange-500" },
  { name: "Cloud & Virtualisation", level: 65, color: "from-rose-500 to-pink-600" },
]

const MOCK_ACTIVITY = [4, 7, 3, 9, 5, 11, 8, 6, 12, 4, 7, 9, 3, 8, 10, 5, 6, 11, 7, 4, 9, 8, 6, 10, 7, 5, 8, 4]

const PRIORITY_CONFIG: Record<string, { label: string; color: string; bg: string; dot: string; ring: string }> = {
  critique: { label: "Critique", color: "text-red-600", bg: "bg-red-50 border border-red-100", dot: "bg-red-500", ring: "ring-red-500/20" },
  haute:    { label: "Haute",    color: "text-orange-600", bg: "bg-orange-50 border border-orange-100", dot: "bg-orange-500", ring: "ring-orange-500/20" },
  normale:  { label: "Normale",  color: "text-blue-600", bg: "bg-blue-50 border border-blue-100", dot: "bg-blue-500", ring: "ring-blue-500/20" },
  basse:    { label: "Basse",    color: "text-slate-500", bg: "bg-slate-50 border border-slate-200", dot: "bg-slate-400", ring: "ring-slate-400/20" },
}

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; icon: string }> = {
  "résolu":     { label: "Résolu",     color: "text-emerald-700", bg: "bg-emerald-50 border border-emerald-200", icon: "✓" },
  "en cours":   { label: "En cours",   color: "text-blue-700",    bg: "bg-blue-50 border border-blue-200",    icon: "↻" },
  "en attente": { label: "En attente", color: "text-amber-700",   bg: "bg-amber-50 border border-amber-200",   icon: "⏸" },
}

// ── Activity Sparkline ─────────────────────────────────────────────────────
function ActivityGraph({ data }: { data: number[] }) {
  const max = Math.max(...data)
  const days = ["L","M","M","J","V","S","D"]
  return (
    <div className="space-y-3">
      <div className="flex items-end gap-[3px] h-20">
        {data.map((v, i) => (
          <div key={i} className="group relative flex-1 flex items-end">
            <div
              className="w-full rounded-t-sm transition-all duration-300 cursor-pointer"
              style={{
                height: `${(v / max) * 100}%`,
                background: v >= 10
                  ? "linear-gradient(to top, #2563eb, #60a5fa)"
                  : v >= 7
                  ? "linear-gradient(to top, #3b82f6, #93c5fd)"
                  : "linear-gradient(to top, #bfdbfe, #dbeafe)",
              }}
            />
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:flex items-center justify-center bg-slate-900 text-white text-[10px] font-bold rounded-md px-1.5 py-1 whitespace-nowrap z-10 shadow-xl">
              {v}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between text-[10px] font-medium text-slate-400 uppercase tracking-wider">
        <span>27 Jan</span>
        <span>23 Fév</span>
      </div>
    </div>
  )
}

// ── Skill Bar ──────────────────────────────────────────────────────────────
function SkillBar({ name, level, color }: { name: string; level: number; color: string }) {
  return (
    <div className="group space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-[13px] font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">{name}</span>
        <span className="text-[11px] font-bold tabular-nums text-slate-500">{level}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-700 ease-out`}
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  )
}

// ── Stat Card ──────────────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, sub, gradient }: {
  icon: React.ElementType; label: string; value: string | number; sub?: string; gradient: string
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white border border-slate-100 p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-gradient-to-br ${gradient}`} />
      <div className="flex items-start gap-4">
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} shadow-sm`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 truncate">{label}</p>
          <p className="mt-0.5 text-2xl font-bold tracking-tight text-slate-900">{value}</p>
          {sub && <p className="mt-0.5 text-[11px] font-medium text-slate-400">{sub}</p>}
        </div>
      </div>
    </div>
  )
}

// ── Incident Row ───────────────────────────────────────────────────────────
function IncidentRow({ inc, compact = false }: { inc: typeof MOCK_RECENT_INCIDENTS[0]; compact?: boolean }) {
  const p = PRIORITY_CONFIG[inc.priority] ?? PRIORITY_CONFIG.normale
  const s = STATUS_CONFIG[inc.status] ?? STATUS_CONFIG["en attente"]
  return (
    <div className={`group flex items-center gap-3 ${compact ? "px-5 py-3" : "px-6 py-4"} hover:bg-slate-50/80 transition-colors cursor-pointer`}>
      {/* Priority dot */}
      <div className={`relative flex-shrink-0`}>
        <span className={`block h-2 w-2 rounded-full ${p.dot}`} />
        {inc.status === "en cours" && (
          <span className={`absolute inset-0 h-2 w-2 rounded-full ${p.dot} animate-ping opacity-60`} />
        )}
      </div>

      {/* ID */}
      <span className="w-20 flex-shrink-0 text-[11px] font-mono font-semibold text-slate-400">{inc.id}</span>

      {/* Title + meta */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] font-semibold text-slate-800 group-hover:text-blue-700 transition-colors">{inc.title}</p>
        <p className="text-[11px] text-slate-400 mt-0.5 truncate">{inc.category} · {inc.date}</p>
      </div>

      {/* Priority badge — hidden on compact */}
      {!compact && (
        <span className={`hidden sm:inline-flex text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${p.bg} ${p.color}`}>
          {p.label}
        </span>
      )}

      {/* Status */}
      <span className={`flex-shrink-0 text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${s.bg} ${s.color}`}>
        {s.label}
      </span>

      {!compact && <IconChevronRight className="h-3.5 w-3.5 flex-shrink-0 text-slate-300 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />}
    </div>
  )
}

// ── Radial Score ───────────────────────────────────────────────────────────
function RadialScore({ value }: { value: number }) {
  const r = 52
  const circ = 2 * Math.PI * r
  const progress = (value / 100) * circ
  return (
    <div className="relative flex items-center justify-center h-36 w-36 mx-auto">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={r} fill="none" stroke="#f1f5f9" strokeWidth="8" />
        <circle
          cx="60" cy="60" r={r} fill="none"
          stroke="url(#scoreGrad)" strokeWidth="8"
          strokeDasharray={`${progress} ${circ}`}
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
        <span className="text-3xl font-black text-slate-900 tabular-nums leading-none">{value}</span>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Score</span>
      </div>
    </div>
  )
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function Profil({ user }: Props) {
  const [activeTab, setActiveTab] = useState<"overview" | "incidents" | "settings">("overview")
  const [notifState, setNotifState] = useState({ n0: true, n1: true, n2: false })

  const displayName = user?.name ?? "Technicien"
  const initials = displayName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  const tabs = [
    { key: "overview" as const, label: "Vue d'ensemble" },
    { key: "incidents" as const, label: "Mes incidents" },
    { key: "settings" as const, label: "Paramètres" },
  ]

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      } as React.CSSProperties}
    >
      <TechnicienSidebar user={user} />

      <SidebarInset>
        <SiteHeader titre="Mon Profil" />

        <div className="min-h-screen bg-slate-50/60">

          {/* ── HERO ─────────────────────────────────────────────────────── */}
          <div className="relative h-52 overflow-hidden bg-slate-900">
            {/* Mesh gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.35),transparent)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_80%_110%,rgba(6,182,212,0.2),transparent)]" />
            {/* Subtle grid */}
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage: `linear-gradient(rgba(148,163,184,1) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,1) 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
              }}
            />
            {/* Online pill */}
            <div className="absolute top-5 right-6 flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-sm px-3 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-xs font-semibold text-emerald-300 tracking-wide">En ligne</span>
            </div>
          </div>

          {/* ── PROFILE STRIP ────────────────────────────────────────────── */}
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="relative -mt-16 mb-8">
              <div className="flex flex-col sm:flex-row sm:items-end gap-5">

                {/* Avatar — self-contained block, no overflow bleed */}
                <div className="flex-shrink-0 self-start sm:self-auto" style={{ paddingBottom: "10px", paddingRight: "10px" }}>
                  <div className="relative" style={{ width: "112px", height: "112px" }}>
                    {/* Avatar tile */}
                    <div className="absolute inset-0 rounded-2xl ring-4 ring-white shadow-xl overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-black text-white tracking-tight">{initials}</span>
                      </div>
                    </div>
                    {/* Camera — positioned outside the tile but inside the padded wrapper */}
                    <button
                      className="absolute flex h-8 w-8 items-center justify-center rounded-xl border-2 border-white bg-slate-800 shadow-md hover:bg-blue-600 transition-colors duration-200 z-10"
                      style={{ bottom: "-10px", right: "-10px" }}
                    >
                      <IconCamera className="h-3.5 w-3.5 text-white" />
                    </button>
                    {/* Online dot */}
                    <span className="absolute top-2 right-2 z-10 h-3 w-3 rounded-full border-2 border-white bg-emerald-400 shadow-sm" />
                  </div>
                </div>

                {/* Name block */}
                <div className="flex-1 pb-1 pt-2 sm:pt-0">
                  <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                    <h1 className="text-[22px] font-black text-slate-900 tracking-tight leading-none">{displayName}</h1>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-2.5 py-1 text-[11px] font-bold text-white tracking-wide shadow-sm shadow-blue-500/30">
                        <IconShield className="h-3 w-3" /> Technicien N2
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-lg bg-amber-400/15 border border-amber-300/50 px-2.5 py-1 text-[11px] font-bold text-amber-700 tracking-wide">
                        <IconStar className="h-3 w-3 fill-amber-500 text-amber-500" /> Top Performer
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-slate-500">
                    <span className="flex items-center gap-1.5"><IconMail className="h-3.5 w-3.5 text-slate-400" />{user?.email ?? "technicien@acme.com"}</span>
                    <span className="flex items-center gap-1.5"><IconMapPin className="h-3.5 w-3.5 text-slate-400" />Yaoundé, CM</span>
                    <span className="flex items-center gap-1.5"><IconCalendar className="h-3.5 w-3.5 text-slate-400" />Depuis Jan 2023</span>
                  </div>
                </div>

                {/* CTA buttons */}
                <div className="flex gap-2 pb-1">
                  <Link href="/user/profil/edit">
                    <button className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-[13px] font-semibold text-slate-700 shadow-sm hover:border-blue-300 hover:text-blue-600 transition-all duration-200">
                      <IconEdit className="h-3.5 w-3.5" /> Modifier
                    </button>
                  </Link>
                  <button className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-[13px] font-semibold text-white shadow-sm shadow-blue-500/30 hover:bg-blue-700 transition-all duration-200">
                    <IconTool className="h-3.5 w-3.5" /> Nouvelle intervention
                  </button>
                </div>
              </div>

              {/* ── TABS ─────────────────────────────────────────────────── */}
              <div className="mt-7 flex gap-0 border-b border-slate-200">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`relative px-5 py-3 text-[13px] font-semibold transition-all duration-200 ${
                      activeTab === tab.key
                        ? "text-blue-600"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.key && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t-full bg-blue-600" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* ════════════════════════════════════════════════════════════ */}
            {/*  OVERVIEW TAB                                                */}
            {/* ════════════════════════════════════════════════════════════ */}
            {activeTab === "overview" && (
              <div className="space-y-6 pb-12">

                {/* KPI row */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <StatCard icon={IconClipboardCheck} label="Total incidents" value={MOCK_STATS.total}      sub="Ce mois-ci"                       gradient="from-blue-500 to-blue-700" />
                  <StatCard icon={IconCircleCheck}    label="Résolus"         value={MOCK_STATS.resolved}   sub={`Taux ${MOCK_STATS.resolutionRate}%`} gradient="from-emerald-500 to-teal-600" />
                  <StatCard icon={IconBolt}           label="Temps moyen"     value={MOCK_STATS.avgResponseTime} sub="Réponse initiale"             gradient="from-amber-500 to-orange-500" />
                  <StatCard icon={IconFlame}          label="Série active"    value={`${MOCK_STATS.streak}j`} sub="Sans incident ouvert"            gradient="from-rose-500 to-pink-600" />
                </div>

                {/* Main grid */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

                  {/* LEFT — Activity + Incidents */}
                  <div className="col-span-2 space-y-6">

                    {/* Activity card */}
                    <div className="rounded-2xl bg-white border border-slate-100 p-6 shadow-sm">
                      <div className="flex items-start justify-between mb-5">
                        <div>
                          <h3 className="text-[15px] font-bold text-slate-900">Activité des 28 derniers jours</h3>
                          <p className="text-[12px] text-slate-400 mt-0.5">Nombre d'interventions par jour</p>
                        </div>
                        <div className="flex items-center gap-1.5 rounded-lg bg-emerald-50 border border-emerald-100 px-2.5 py-1.5">
                          <IconTrendingUp className="h-3.5 w-3.5 text-emerald-600" />
                          <span className="text-[11px] font-bold text-emerald-700">+14% vs mois dernier</span>
                        </div>
                      </div>
                      <ActivityGraph data={MOCK_ACTIVITY} />
                    </div>

                    {/* Recent incidents */}
                    <div className="rounded-2xl bg-white border border-slate-100 shadow-sm overflow-hidden">
                      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-50">
                        <div>
                          <h3 className="text-[15px] font-bold text-slate-900">Incidents récents</h3>
                          <p className="text-[12px] text-slate-400 mt-0.5">5 dernières interventions</p>
                        </div>
                        <Link href="/intervention/view">
                          <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                            Voir tout <IconArrowRight className="h-3 w-3" />
                          </span>
                        </Link>
                      </div>
                      <div className="divide-y divide-slate-50">
                        {MOCK_RECENT_INCIDENTS.map((inc) => (
                          <IncidentRow key={inc.id} inc={inc} compact />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* RIGHT — Score, Skills, Certs */}
                  <div className="space-y-6">

                    {/* Performance score */}
                    <div className="rounded-2xl bg-white border border-slate-100 p-6 shadow-sm">
                      <h3 className="text-[15px] font-bold text-slate-900">Score de performance</h3>
                      <p className="text-[12px] text-slate-400 mt-0.5 mb-5">Évaluation globale du mois</p>
                      <RadialScore value={MOCK_STATS.resolutionRate} />
                      <div className="mt-5 grid grid-cols-2 gap-3">
                        <div className="rounded-xl bg-slate-50 border border-slate-100 p-3 text-center">
                          <p className="text-xl font-black text-slate-900 tabular-nums">{MOCK_STATS.rating}</p>
                          <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mt-0.5">Note moy.</p>
                        </div>
                        <div className="rounded-xl bg-slate-50 border border-slate-100 p-3 text-center">
                          <p className="text-xl font-black text-slate-900 tabular-nums">{MOCK_STATS.inProgress}</p>
                          <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mt-0.5">En cours</p>
                        </div>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="rounded-2xl bg-white border border-slate-100 p-6 shadow-sm">
                      <h3 className="text-[15px] font-bold text-slate-900">Compétences techniques</h3>
                      <p className="text-[12px] text-slate-400 mt-0.5 mb-5">Évaluation par domaine</p>
                      <div className="space-y-4">
                        {MOCK_SKILLS.map((s) => (
                          <SkillBar key={s.name} name={s.name} level={s.level} color={s.color} />
                        ))}
                      </div>
                    </div>

                    {/* Certifications */}
                    <div className="rounded-2xl bg-white border border-slate-100 p-6 shadow-sm">
                      <h3 className="text-[15px] font-bold text-slate-900 mb-4">Certifications</h3>
                      <div className="space-y-3">
                        {[
                          { label: "CompTIA A+", year: "2022", gradient: "from-blue-500 to-blue-700" },
                          { label: "ITIL Foundation", year: "2023", gradient: "from-violet-500 to-purple-700" },
                          { label: "Cisco CCNA", year: "2024", gradient: "from-cyan-500 to-teal-700" },
                        ].map((cert) => (
                          <div key={cert.label} className="group flex items-center gap-3 rounded-xl bg-slate-50 border border-slate-100 px-4 py-3 hover:border-slate-200 transition-colors">
                            <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${cert.gradient} shadow-sm`}>
                              <IconAward className="h-4 w-4 text-white" />
                            </div>
                            <span className="flex-1 text-[13px] font-semibold text-slate-800">{cert.label}</span>
                            <span className="text-[11px] font-bold text-slate-400 tabular-nums">{cert.year}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            )}

            {/* ════════════════════════════════════════════════════════════ */}
            {/*  INCIDENTS TAB                                               */}
            {/* ════════════════════════════════════════════════════════════ */}
            {activeTab === "incidents" && (
              <div className="pb-12">
                <div className="rounded-2xl bg-white border border-slate-100 shadow-sm overflow-hidden">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-5 border-b border-slate-50">
                    <div>
                      <h3 className="text-[15px] font-bold text-slate-900">Tous mes incidents</h3>
                      <p className="text-[12px] text-slate-400 mt-0.5">Historique complet de vos interventions</p>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {["Tous", "En cours", "Résolu", "En attente"].map((f, i) => (
                        <button
                          key={f}
                          className={`rounded-lg px-3 py-1.5 text-[12px] font-semibold border transition-all duration-200 ${
                            i === 0
                              ? "border-blue-200 bg-blue-50 text-blue-700"
                              : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                          }`}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Column headers */}
                  <div className="flex items-center gap-3 px-6 py-2.5 bg-slate-50/80 border-b border-slate-100">
                    <div className="w-2 flex-shrink-0" />
                    <div className="w-20 flex-shrink-0 text-[10px] font-bold uppercase tracking-widest text-slate-400">ID</div>
                    <div className="flex-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">Titre</div>
                    <div className="hidden sm:block w-20 text-[10px] font-bold uppercase tracking-widest text-slate-400">Priorité</div>
                    <div className="w-24 text-[10px] font-bold uppercase tracking-widest text-slate-400">Statut</div>
                    <div className="w-4" />
                  </div>

                  <div className="divide-y divide-slate-50">
                    {MOCK_RECENT_INCIDENTS.concat(MOCK_RECENT_INCIDENTS).map((inc, i) => (
                      <IncidentRow key={`${inc.id}-${i}`} inc={inc} />
                    ))}
                  </div>

                  <div className="flex justify-center py-5 border-t border-slate-50">
                    <Link href="/intervention/view">
                      <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2 text-[13px] font-semibold text-slate-700 shadow-sm hover:border-blue-300 hover:text-blue-600 transition-all duration-200">
                        Voir tous les incidents <IconArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* ════════════════════════════════════════════════════════════ */}
            {/*  SETTINGS TAB                                                */}
            {/* ════════════════════════════════════════════════════════════ */}
            {activeTab === "settings" && (
              <div className="pb-12 space-y-6 max-w-2xl">

                {/* Personal Info */}
                <div className="rounded-2xl bg-white border border-slate-100 shadow-sm overflow-hidden">
                  <div className="flex items-center gap-2.5 px-6 py-4 border-b border-slate-50">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50">
                      <IconFingerprint className="h-4 w-4 text-blue-600" />
                    </div>
                    <h3 className="text-[15px] font-bold text-slate-900">Informations personnelles</h3>
                  </div>
                  <div className="p-4 space-y-2">
                    {[
                      { label: "Nom complet",  value: displayName,                      icon: IconBriefcase },
                      { label: "Email",         value: user?.email ?? "technicien@acme.com", icon: IconMail },
                      { label: "Téléphone",     value: "+237 6XX XXX XXX",              icon: IconPhone },
                      { label: "Localisation",  value: "Yaoundé, Cameroun",             icon: IconMapPin },
                    ].map((field) => (
                      <div key={field.label} className="group flex items-center gap-4 rounded-xl px-4 py-3.5 hover:bg-slate-50 transition-colors">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white shadow-sm">
                          <field.icon className="h-4 w-4 text-slate-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{field.label}</p>
                          <p className="text-[14px] font-semibold text-slate-900 mt-0.5 truncate">{field.value}</p>
                        </div>
                        <button className="opacity-0 group-hover:opacity-100 text-[12px] font-semibold text-blue-600 hover:text-blue-800 transition-all duration-200">
                          Modifier
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end px-6 py-4 border-t border-slate-50 bg-slate-50/50">
                    <Link href="/user/profil/edit">
                      <button className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-[13px] font-semibold text-white shadow-sm shadow-blue-500/20 hover:bg-blue-700 transition-colors">
                        <IconEdit className="h-3.5 w-3.5" /> Modifier le profil
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Notifications */}
                <div className="rounded-2xl bg-white border border-slate-100 shadow-sm overflow-hidden">
                  <div className="flex items-center gap-2.5 px-6 py-4 border-b border-slate-50">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-50">
                      <IconBell className="h-4 w-4 text-violet-600" />
                    </div>
                    <h3 className="text-[15px] font-bold text-slate-900">Préférences de notification</h3>
                  </div>
                  <div className="divide-y divide-slate-50">
                    {[
                      { key: "n0", label: "Nouveaux incidents assignés", desc: "Recevoir une alerte à chaque assignation" },
                      { key: "n1", label: "Mises à jour d'incidents",    desc: "Changement de statut ou commentaire" },
                      { key: "n2", label: "Rappels d'échéance",          desc: "Notification 1h avant expiration SLA" },
                    ].map((notif) => {
                      const checked = notifState[notif.key as keyof typeof notifState]
                      return (
                        <div key={notif.key} className="flex items-center justify-between px-6 py-4">
                          <div className="min-w-0 pr-8">
                            <p className="text-[13px] font-semibold text-slate-800">{notif.label}</p>
                            <p className="text-[11px] text-slate-400 mt-0.5">{notif.desc}</p>
                          </div>
                          <button
                            onClick={() => setNotifState(prev => ({ ...prev, [notif.key]: !prev[notif.key as keyof typeof notifState] }))}
                            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                              checked ? "bg-blue-600" : "bg-slate-200"
                            }`}
                          >
                            <span
                              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                checked ? "translate-x-5" : "translate-x-0"
                              }`}
                            />
                          </button>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Danger zone */}
                <div className="rounded-2xl border border-red-100 bg-red-50/40 p-6">
                  <div className="flex items-center gap-2 mb-1">
                    <IconAlertTriangle className="h-4 w-4 text-red-500" />
                    <h3 className="text-[14px] font-bold text-red-700">Zone de danger</h3>
                  </div>
                  <p className="text-[12px] text-red-400 mb-4">Ces actions sont irréversibles. Agissez avec précaution.</p>
                  <button className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2 text-[13px] font-semibold text-red-600 shadow-sm hover:bg-red-50 hover:border-red-300 transition-all duration-200">
                    <IconLogout className="h-3.5 w-3.5" /> Se déconnecter de tous les appareils
                  </button>
                </div>

              </div>
            )}

          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}