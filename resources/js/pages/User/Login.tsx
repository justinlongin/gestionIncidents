import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Auth } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Lock, Mail, Sparkles, Shield, AlertTriangle, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Login({ user }: Auth) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/login');
    };

    const features = [
        { icon: Shield, text: "Sécurité renforcée", color: "text-blue-400" },
        { icon: AlertTriangle, text: "Signalement rapide", color: "text-orange-400" },
        { icon: Clock, text: "Suivi en temps réel", color: "text-green-400" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800">
            <Head title="Connexion" />

            <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                {/* Left Side - Enhanced Branding */}
                <div className={`relative hidden h-full flex-col bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 p-10 text-white lg:flex transition-all duration-700 transform ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    
                    <div className="relative z-20 flex items-center text-lg font-medium">
                        <div className="relative">
                            <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-50 animate-pulse" />
                            <img src="/logo.svg" alt="Logo" className="relative h-10 w-10 mr-3" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            Gestion Incidents
                        </span>
                    </div>

                    <div className="relative z-20 mt-auto space-y-8">
                        {/* Animated Stats */}
                        <div className="grid grid-cols-3 gap-4 mb-8">
                            {[
                                { label: "Incidents résolus", value: "98%", delay: 0 },
                                { label: "Temps moyen", value: "< 2h", delay: 100 },
                                { label: "Satisfaction", value: "4.8/5", delay: 200 }
                            ].map((stat, index) => (
                                <div 
                                    key={index}
                                    className="text-center animate-slide-up"
                                    style={{ animationDelay: `${stat.delay}ms` }}
                                >
                                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                                    <div className="text-xs text-gray-400">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        <blockquote className="space-y-4 border-l-4 border-blue-500 pl-6">
                            <p className="text-lg leading-relaxed">
                                &ldquo;Une plateforme intuitive qui a transformé notre gestion des incidents. 
                                La réactivité et la traçabilité sont désormais exemplaires.&rdquo;
                            </p>
                            <footer className="flex items-center gap-3 text-sm">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                                    <Sparkles className="h-4 w-4" />
                                </div>
                                <div>
                                    <div className="font-semibold">Sophie Martin</div>
                                    <div className="text-gray-400">Directrice Technique</div>
                                </div>
                            </footer>
                        </blockquote>

                        {/* Feature List */}
                        <div className="flex gap-4 pt-6 border-t border-white/10">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-center gap-2 text-sm text-gray-300">
                                    <feature.icon className={`h-4 w-4 ${feature.color}`} />
                                    <span>{feature.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side - Enhanced Form */}
                <div className={`flex items-center justify-center p-8 transition-all duration-700 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
                    <div className="mx-auto w-full max-w-[400px] space-y-8">
                        {/* Header */}
                        <div className="text-center space-y-2">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg mb-4">
                                <Lock className="h-8 w-8 text-white" />
                            </div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                                Bienvenue
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400">
                                Connectez-vous pour accéder à votre tableau de bord
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Adresse email
                                </Label>
                                <div className="relative group">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="nom@entreprise.com"
                                        required
                                        className="pl-10 h-11 bg-white dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                </div>
                                {errors.email && (
                                    <div className="text-sm text-red-500 flex items-center gap-1 animate-shake">
                                        <AlertTriangle className="h-3 w-3" />
                                        {errors.email}
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Mot de passe
                                    </Label>
                                    <button 
                                        type="button"
                                        className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                                        onClick={() => {/* Handle forgot password */}}
                                    >
                                        Mot de passe oublié ?
                                    </button>
                                </div>
                                <div className="relative group">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                    <Input
                                        id="password"
                                        type="password"
                                        required
                                        className="pl-10 h-11 bg-white dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                    />
                                </div>
                                {errors.password && (
                                    <div className="text-sm text-red-500 flex items-center gap-1 animate-shake">
                                        <AlertTriangle className="h-3 w-3" />
                                        {errors.password}
                                    </div>
                                )}
                            </div>

                            <Button 
                                type="submit" 
                                className="w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                                disabled={processing}
                            >
                                {processing ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Connexion en cours...
                                    </div>
                                ) : (
                                    'Se connecter'
                                )}
                            </Button>
                        </form>

                        {/* Additional Info */}
                        <div className="text-center">
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                En vous connectant, vous acceptez nos{' '}
                                <a href="#" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 underline-offset-2 hover:underline">
                                    conditions d'utilisation
                                </a>
                                {' '}et notre{' '}
                                <a href="#" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 underline-offset-2 hover:underline">
                                    politique de confidentialité
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes slide-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }
                
                .animate-slide-up {
                    animation: slide-up 0.5s ease-out forwards;
                    opacity: 0;
                }
                
                .animate-shake {
                    animation: shake 0.3s ease-in-out;
                }
            `}</style>
        </div>
    );
}