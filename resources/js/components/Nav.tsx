import React, { useState, useEffect } from 'react'
import { Link, useForm, usePage } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    Menu, X, Bell, LogOut, User as UserIcon,
    ShieldAlert, AlertTriangle, ChevronDown
} from 'lucide-react'

import { NotificationDropdown } from '@/pages/User/notification'
import { User } from '@/types'

type Props = {
    user?: User | null
    /** 
     * 'landing'  → contexte page d'accueil publique (liens marketing)
     * 'app'      → contexte pages internes (profil, notifs, déconnexion)
     * 'auto'     → détecte automatiquement selon la présence de user (défaut)
     */
    mode?: 'landing' | 'app' | 'auto'
}

export default function Nav({ user = null, mode = 'auto' }: Props) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const { post, processing } = useForm()

    const { notifications } = usePage().props;
    // Détermine le mode effectif
    const effectiveMode = mode === 'auto' ? (user ? 'app' : 'landing') : mode

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleLogout = (e: React.FormEvent) => {
        e.preventDefault()
        post('/logout')
    }

    // ─── STYLES SELON MODE ───────────────────────────────────────────
    const isLanding = effectiveMode === 'landing'

    const navBase = isLanding
        ? `sticky top-0 z-50 transition-all duration-300 ${
              scrolled
                  ? 'bg-[rgba(10,15,30,0.95)] backdrop-blur-xl border-b border-blue-900/30 shadow-[0_4px_24px_rgba(0,0,0,0.4)]'
                  : 'bg-[rgba(10,15,30,0.8)] backdrop-blur-md'
          }`
        : 'sticky top-0 z-50 w-full border-b bg-white/95 dark:bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm'

    const logoTextColor  = isLanding ? 'text-white' : 'text-black dark:text-white'
    const linkColor      = isLanding
        ? 'text-slate-300 hover:text-white'
        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
    const mobileMenuBg   = isLanding
        ? 'bg-[rgba(10,15,30,0.98)] backdrop-blur-2xl border-t border-slate-800'
        : 'bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800'
    const dividerColor   = isLanding ? 'bg-slate-700' : 'bg-gray-200 dark:bg-gray-700'

    // ─── RENDU ───────────────────────────────────────────────────────
    return (
        <>
            <nav className={navBase}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16 lg:h-20">

                        {/* ── LOGO ── */}
                        <Link
                            href={user ? '/incident' : '/'}
                            className={`flex items-center gap-2.5 group ${logoTextColor} font-black text-lg hover:opacity-90 transition-opacity`}
                        >
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105 ${
                                isLanding
                                    ? 'bg-gradient-to-br from-blue-500 to-cyan-400 shadow-[0_0_20px_rgba(37,99,235,0.4)]'
                                    : 'bg-blue-100 dark:bg-blue-900'
                            }`}>
                                {isLanding
                                    ? <AlertTriangle className="h-5 w-5 text-white" />
                                    : <ShieldAlert className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                }
                            </div>
                            <span className="hidden sm:inline">
                                {isLanding
                                    ? <>Incident<span className="text-blue-400">Pro</span></>
                                    : 'Gestion d\'Incidents'
                                }
                            </span>
                            <span className="sm:hidden">
                                {isLanding ? <>Inc<span className="text-blue-400">Pro</span></> : 'Incidents'}
                            </span>
                        </Link>

                        {/* ── DESKTOP NAV ── */}
                        <div className="hidden md:flex items-center gap-6 lg:gap-8">

                            {/* Liens marketing (landing sans user connecté) */}
                            {isLanding && !user && (
                                <>
                                    {[
                                        ['Fonctionnalités', '#features'],
                                        ['Solutions',       '#solutions'],
                                        ['Tarifs',          '#pricing'],
                                        ['Équipe',          '#team'],
                                        ['Contact',         '#contact'],
                                    ].map(([label, href]) => (
                                        <a
                                            key={label}
                                            href={href}
                                            className={`relative text-sm font-medium transition-colors ${linkColor} nav-link-underline`}
                                        >
                                            {label}
                                        </a>
                                    ))}
                                </>
                            )}

                            {/* Liens app (user connecté, mode app ou landing+user) */}
                            {user && (
                                <>
                                    <Link
                                        href="/user/profil"
                                        className={`flex items-center gap-2 text-sm font-medium transition-colors ${linkColor}`}
                                    >
                                        <UserIcon className="w-4 h-4" />
                                        Profil
                                    </Link>

                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className={`relative ${isLanding ? 'text-slate-300 hover:text-white hover:bg-white/10' : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'}`}
                                    >
                                        <Bell className="w-5 h-5" />
                                        <Badge className="absolute -top-1 -right-1 px-1.5 py-0.5 min-w-[20px] h-5 bg-red-500 text-white text-xs">
                                            3
                                        </Badge>
                                    </Button>

                                    <NotificationDropdown notifications={notifications} />
                                </>
                            )}

                            {/* Séparateur */}
                            <div className={`h-6 w-px ${dividerColor}`} />

                            {/* Auth buttons */}
                            {!user ? (
                                <div className="flex items-center gap-3">
                                    <Link
                                        href="/login"
                                        className={`text-sm font-medium transition-colors ${linkColor}`}
                                    >
                                        Connexion
                                    </Link>
                                    <Link href="/login">
                                        <button
                                            className="px-5 py-2.5 rounded-lg text-sm font-bold text-white transition-all hover:scale-105 hover:brightness-110"
                                            style={{
                                                background:   'linear-gradient(135deg, #2563EB, #06B6D4)',
                                                boxShadow:    '0 4px 15px rgba(37,99,235,0.4)',
                                            }}
                                        >
                                            Essai gratuit →
                                        </button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex items-center gap-3">
                                    <Link href="/incident">
                                        <button
                                            className="px-4 py-2 rounded-lg text-sm font-bold text-white transition-all hover:scale-105"
                                            style={{
                                                background: 'linear-gradient(135deg, #2563EB, #06B6D4)',
                                                boxShadow:  '0 4px 15px rgba(37,99,235,0.3)',
                                            }}
                                        >
                                            Mes incidents
                                        </button>
                                    </Link>
                                    <form onSubmit={handleLogout}>
                                        <Button
                                            type="submit"
                                            disabled={processing}
                                            variant="outline"
                                            size="sm"
                                            className={`cursor-pointer transition-colors ${
                                                isLanding
                                                    ? 'border-red-500/40 text-red-400 hover:bg-red-500/10 hover:text-red-300 bg-transparent'
                                                    : 'border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20'
                                            }`}
                                        >
                                            {processing ? (
                                                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                                            ) : (
                                                <LogOut className="w-4 h-4 mr-2" />
                                            )}
                                            {processing ? 'Déconnexion...' : 'Déconnexion'}
                                        </Button>
                                    </form>
                                </div>
                            )}
                        </div>

                        {/* ── HAMBURGER MOBILE ── */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                            className={`md:hidden p-2 rounded-lg transition-colors ${
                                isLanding
                                    ? 'text-white hover:bg-white/10'
                                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                            }`}
                        >
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {/* ── MOBILE MENU ── */}
                {isMenuOpen && (
                    <div className={`md:hidden ${mobileMenuBg} animate-in slide-in-from-top duration-200`}>
                        <div className="container mx-auto px-4 py-4 space-y-2">

                            {/* Liens marketing */}
                            {isLanding && !user && (
                                <>
                                    {[
                                        ['Fonctionnalités', '#features'],
                                        ['Solutions',       '#solutions'],
                                        ['Tarifs',          '#pricing'],
                                        ['Équipe',          '#team'],
                                        ['Contact',         '#contact'],
                                    ].map(([label, href]) => (
                                        <a
                                            key={label}
                                            href={href}
                                            onClick={() => setIsMenuOpen(false)}
                                            className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                                isLanding
                                                    ? 'text-slate-300 hover:text-white hover:bg-white/10'
                                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400'
                                            }`}
                                        >
                                            {label}
                                        </a>
                                    ))}
                                </>
                            )}

                            {/* Liens app (mobile) */}
                            {user && (
                                <>
                                    <Link
                                        href="/incident"
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                            isLanding
                                                ? 'text-slate-300 hover:text-white hover:bg-white/10'
                                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400'
                                        }`}
                                    >
                                        Mes incidents
                                    </Link>
                                    <Link
                                        href="/user/profil"
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                            isLanding
                                                ? 'text-slate-300 hover:text-white hover:bg-white/10'
                                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400'
                                        }`}
                                    >
                                        <UserIcon className="w-4 h-4" />Profil
                                    </Link>
                                    <Link
                                        href="/notifications"
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                            isLanding
                                                ? 'text-slate-300 hover:text-white hover:bg-white/10'
                                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Bell className="w-4 h-4" />Notifications
                                        </div>
                                        <Badge className="bg-red-500 text-white text-xs px-1.5 py-0.5">3</Badge>
                                    </Link>
                                </>
                            )}

                            {/* Auth (mobile) */}
                            <div className={`pt-3 border-t ${isLanding ? 'border-slate-800' : 'border-gray-200 dark:border-gray-800'}`}>
                                {!user ? (
                                    <div className="flex flex-col gap-2">
                                        <Link
                                            href="/login"
                                            onClick={() => setIsMenuOpen(false)}
                                            className={`text-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                                isLanding
                                                    ? 'text-slate-300 hover:text-white hover:bg-white/10'
                                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                            }`}
                                        >
                                            Connexion
                                        </Link>
                                        <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                                            <button
                                                className="w-full py-3 rounded-xl font-bold text-white text-sm"
                                                style={{ background: 'linear-gradient(135deg, #2563EB, #06B6D4)' }}
                                            >
                                                Essai gratuit →
                                            </button>
                                        </Link>
                                    </div>
                                ) : (
                                    <form onSubmit={handleLogout}>
                                        <Button
                                            type="submit"
                                            disabled={processing}
                                            variant="outline"
                                            className={`w-full justify-center cursor-pointer transition-colors ${
                                                isLanding
                                                    ? 'border-red-500/40 text-red-400 hover:bg-red-500/10 bg-transparent'
                                                    : 'border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20'
                                            }`}
                                        >
                                            {processing ? (
                                                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                                            ) : (
                                                <LogOut className="w-4 h-4 mr-2" />
                                            )}
                                            {processing ? 'Déconnexion...' : 'Déconnexion'}
                                        </Button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {/* ── USER INFO BANNER (mode app uniquement quand user connecté) ── */}
            {user && effectiveMode === 'app' && (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-b border-blue-100 dark:border-blue-800">
                    <div className="container mx-auto px-4 py-2">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse inline-block" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                {user.role.nom === 'technicien'
                                    ? <>Technicien <span className="font-semibold text-gray-800 dark:text-gray-200">{user.name}</span> connecté</>
                                    : <>Employé <span className="font-semibold text-gray-800 dark:text-gray-200">{user.name}</span> connecté</>
                                }
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* ── UNDERLINE ANIMATION (landing only) ── */}
            <style>{`
                .nav-link-underline {
                    position: relative;
                }
                .nav-link-underline::after {
                    content: '';
                    position: absolute;
                    bottom: -3px;
                    left: 0;
                    width: 0;
                    height: 2px;
                    background: linear-gradient(90deg, #2563EB, #06B6D4);
                    transition: width 0.3s ease;
                }
                .nav-link-underline:hover::after { width: 100%; }
            `}</style>
        </>
    )
}