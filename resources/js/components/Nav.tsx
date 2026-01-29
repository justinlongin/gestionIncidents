import React from 'react'
import { Button } from './ui/button'
import { Link, useForm } from '@inertiajs/react'
import { 
  Menu, 
  X, 
  Home, 
  LogOut, 
  Bell, 
  User as Userlucide, 
  Settings,
  ShieldAlert
} from 'lucide-react'
import { useState } from 'react'
import { Badge } from './ui/badge'
import { User } from '@/types'

type Props = {
    user: User
}
export default function Nav({user}: Props) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { post, processing } = useForm()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        post('/logout')
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <>
            {/* Navigation principale */}
            <nav className="sticky top-0 z-50 w-full border-b bg-white/95 dark:bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo et nom de l'application */}
                        <div className="flex items-center">
                            <Link 
                                href='/incident' 
                                className="flex items-center gap-2 text-black dark:text-white font-semibold text-lg hover:opacity-80 transition-opacity"
                            >
                                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                                    <ShieldAlert className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <span className="hidden sm:inline">Gestion d'Incidents</span>
                                <span className="sm:hidden">Incidents</span>
                            </Link>
                        </div>

                        {/* Navigation desktop */}
                        <div className="hidden md:flex items-center space-x-6">
                            
                            <Link 
                                href='/user/profil' 
                                className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                            >
                                <Userlucide className="w-4 h-4" />
                                Profil
                            </Link>
                            

                            <div className="relative">
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="relative text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                                >
                                    <Bell className="w-5 h-5" />
                                    <Badge className="absolute -top-1 -right-1 px-1.5 py-0.5 min-w-[20px] h-5 bg-red-500 text-white text-xs">
                                        3
                                    </Badge>
                                </Button>
                            </div>

                            <div className="h-6 w-px bg-gray-200 dark:bg-gray-700" />

                            <form onSubmit={handleSubmit}>
                                <Button 
                                    type="submit"
                                    disabled={processing}
                                    variant="outline"
                                    className="cursor-pointer border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                                >
                                    {processing ? (
                                        <>
                                            <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600 dark:border-red-400 mr-2"></span>
                                            Déconnexion...
                                        </>
                                    ) : (
                                        <>
                                            <LogOut className="w-4 h-4 mr-2" />
                                            Déconnexion
                                        </>
                                    )}
                                </Button>
                            </form>
                        </div>

                        {/* Menu mobile */}
                        <div className="md:hidden flex items-center">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleMenu}
                                aria-label="Toggle menu"
                                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                            >
                                {isMenuOpen ? (
                                    <X className="h-5 w-5" />
                                ) : (
                                    <Menu className="h-5 w-5" />
                                )}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Menu mobile déroulant */}
                {isMenuOpen && (
                    <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 animate-in slide-in-from-top duration-200">
                        <div className="container mx-auto px-4 py-3">
                            <div className="space-y-3">                                
                                <Link 
                                    href='/user/profil' 
                                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <Userlucide className="w-4 h-4" />
                                    Profil
                                </Link>
                                

                                <Link 
                                    href='/notifications' 
                                    className="flex items-center justify-between px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <div className="flex items-center gap-3">
                                        <Bell className="w-4 h-4" />
                                        Notifications
                                    </div>
                                    <Badge className="bg-red-500 text-white text-xs px-1.5 py-0.5">
                                        3
                                    </Badge>
                                </Link>

                                <div className="pt-3 border-t border-gray-200 dark:border-gray-800">
                                    <form onSubmit={handleSubmit}>
                                        <Button 
                                            type="submit"
                                            disabled={processing}
                                            variant="outline"
                                            className="w-full justify-center cursor-pointer border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                                        >
                                            {processing ? (
                                                <>
                                                    <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600 dark:border-red-400 mr-2"></span>
                                                    Déconnexion...
                                                </>
                                            ) : (
                                                <>
                                                    <LogOut className="w-4 h-4 mr-2" />
                                                    Déconnexion
                                                </>
                                            )}
                                        </Button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {/* User info banner (optionnel) */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-b border-blue-100 dark:border-blue-800">
                <div className="container mx-auto px-4 py-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">

                            {user.role.nom == 'technicien' ? <p>Technicien <span className="font-medium">{user.name}</span> connecté</p> : <p>Employé <span className="font-medium">{user.name}</span> connecté</p>}

                                
                            </span>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}