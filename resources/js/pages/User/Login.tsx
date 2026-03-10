import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Auth } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Lock, Mail } from 'lucide-react';

export default function Login({ user }: Auth) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
            <Head title="Connexion" />

            {/* Left Side - Branding */}
            <div className="relative hidden flex-col justify-between bg-zinc-900 p-10 text-white lg:flex dark:bg-zinc-900">
                <div className="absolute inset-0 bg-zinc-900" />
                <div className="relative z-20 flex items-center text-lg font-medium">
                    <img src="/logo.svg" alt="Logo" className="mr-2 h-8 w-8" />
                    Gestion Incidents
                </div>
                <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2">
                        <p className="text-lg">&ldquo;La sécurité et l'efficacité de nos opérations dépendent de la vigilance de chacun.&rdquo;</p>
                        <footer className="text-sm">Service Technique</footer>
                    </blockquote>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Connexion</h1>
                        <p className="text-balance text-muted-foreground">Entrez vos identifiants pour accéder à votre espace</p>
                    </div>

                    <form onSubmit={handleSubmit} className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                                <Mail className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="exemple@domaine.com"
                                    required
                                    className="pl-9"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                            </div>
                            {errors.email && <div className="text-sm text-red-500">{errors.email}</div>}
                        </div>

                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Mot de passe</Label>
                                {/* <Link href="/forgot-password" className="ml-auto inline-block text-sm underline">
                                    Mot de passe oublié ?
                                </Link> */}
                            </div>
                            <div className="relative">
                                <Lock className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    className="pl-9"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                            </div>
                            {errors.password && <div className="text-sm text-red-500">{errors.password}</div>}
                        </div>

                        <Button type="submit" className="w-full" disabled={processing}>
                            {processing ? 'Connexion en cours...' : 'Se connecter'}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
