import { TechnicienLayout } from '@/components/TechnicienLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Incident, User } from '@/types';
import { Link } from '@inertiajs/react';
import { 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Filter, 
  Eye, 
  CheckSquare,
  Archive,
  Calendar,
  Folder,
} from 'lucide-react';
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Props {
    interventions: Incident[];
    user: User;
}

export default function View({ interventions, user }: Props) {
    const [activeFilter, setActiveFilter] = useState<string>('En cours');

    const filterIncidents = interventions.filter(item => item.statut === activeFilter);

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'elevée': return 'bg-red-500 text-white';
            case 'moyenne': return 'bg-orange-500 text-white';
            case 'basse': return 'bg-green-500 text-white';
            default: return 'bg-gray-500 text-white';
        }
    };

    const getStatusConfig = (status: string) => {
        switch (status) {
            case 'En cours':
                return {
                    icon: Clock,
                    color: 'text-blue-500',
                    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
                    text: 'En cours'
                };
            case 'Terminé':
                return {
                    icon: CheckSquare,
                    color: 'text-green-500',
                    bgColor: 'bg-green-100 dark:bg-green-900/30',
                    text: 'Terminé'
                };
            case 'Résolu':
                return {
                    icon: CheckCircle,
                    color: 'text-purple-500',
                    bgColor: 'bg-purple-100 dark:bg-purple-900/30',
                    text: 'Résolu'
                };
            default:
                return {
                    icon: AlertCircle,
                    color: 'text-gray-500',
                    bgColor: 'bg-gray-100 dark:bg-gray-900/30',
                    text: status
                };
        }
    };

    const filters = [
        { value: 'En cours', label: 'En cours', icon: Clock, count: interventions.filter(i => i.statut === 'En cours').length },
        { value: 'Terminé', label: 'Terminé', icon: CheckSquare, count: interventions.filter(i => i.statut === 'Terminé').length },
        { value: 'Résolu', label: 'Résolu', icon: CheckCircle, count: interventions.filter(i => i.statut === 'Résolu').length },
    ];

    return (
        <TechnicienLayout user={user} titre="Mes Incidents">
            <div className="px-4 pt-6 lg:px-6 pb-8">
                <div className="mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Mes Interventions
                            </h1>
                            <p className="text-slate-600 dark:text-slate-400 mt-2">
                                Suivez et gérez vos interventions en cours
                            </p>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 px-4 py-2 shadow-sm backdrop-blur">
                                <Filter className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    {interventions.length} intervention{interventions.length !== 1 ? 's' : ''} au total
                                </span>
                            </div>
                            
                            <Button asChild variant="outline" size="sm" className="border-slate-300 dark:border-slate-700">
                                <Link href="/incident" className="flex items-center gap-2">
                                    <Eye className="w-4 h-4" />
                                    Voir tous les incidents
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Filtres */}
                <div className="mb-8">
                    <Tabs value={activeFilter} onValueChange={setActiveFilter} className="w-full">
                        <TabsList className="grid grid-cols-3 md:w-auto bg-slate-100 dark:bg-slate-800 p-1">
                            {filters.map((filter) => {
                                const Icon = filter.icon;
                                const config = getStatusConfig(filter.value);
                                return (
                                    <TabsTrigger 
                                        key={filter.value} 
                                        value={filter.value}
                                        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white transition-all duration-200"
                                    >
                                        <Icon className={`w-4 h-4 mr-2 ${config.color}`} />
                                        {filter.label}
                                        <Badge variant="secondary" className="ml-2">
                                            {filter.count}
                                        </Badge>
                                    </TabsTrigger>
                                );
                            })}
                        </TabsList>
                    </Tabs>
                </div>

                {/* Contenu */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                            Interventions {activeFilter.toLowerCase()}
                        </h2>
                        <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
                            {filterIncidents.length} résultat{filterIncidents.length !== 1 ? 's' : ''}
                        </div>
                    </div>

                    {filterIncidents.length === 0 ? (
                        <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900/50 overflow-hidden">
                            <CardContent className="flex flex-col items-center justify-center py-20 text-center">
                                <div className="p-6 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 mb-4 ring-4 ring-white/50 dark:ring-slate-800/50">
                                    <Archive className="w-12 h-12 text-slate-400 dark:text-slate-500" />
                                </div>
                                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                                    Aucune intervention {activeFilter.toLowerCase()}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 max-w-md mb-6">
                                    {activeFilter === 'En cours' 
                                        ? "Vous n'avez actuellement aucune intervention en cours. Revenez plus tard ou consultez les autres statuts."
                                        : `Aucune intervention n'est actuellement ${activeFilter.toLowerCase()}.`
                                    }
                                </p>
                                {activeFilter !== 'En cours' && (
                                    <Button 
                                        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all"
                                        onClick={() => setActiveFilter('En cours')}
                                    >
                                        Voir les interventions en cours
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filterIncidents.map((intervention) => {
                                const statusConfig = getStatusConfig(intervention.statut);
                                const StatusIcon = statusConfig.icon;

                                return (
                                    <Card 
                                        key={intervention.id} 
                                        className="group border-0 shadow-lg bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900/50 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                                    >
                                        <CardHeader className="pb-3">
                                            <div className="flex justify-between items-start mb-2">
                                                <div className={`p-2 ${statusConfig.bgColor} rounded-lg transition-transform group-hover:scale-105`}>
                                                    <StatusIcon className={`w-5 h-5 ${statusConfig.color}`} />
                                                </div>
                                                <Badge className={`${getPriorityColor(intervention.priorite.nom)} shadow-sm`}>
                                                    {intervention.priorite.nom}
                                                </Badge>
                                            </div>
                                            <CardTitle className="text-lg capitalize line-clamp-2 text-slate-900 dark:text-white">
                                                {intervention.titre}
                                            </CardTitle>
                                            <CardDescription className="line-clamp-3 text-slate-600 dark:text-slate-400">
                                                {intervention.description}
                                            </CardDescription>
                                        </CardHeader>
                                        
                                        <CardContent className="pb-3">
                                            <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                                                <div className="flex items-center gap-1">
                                                    <Folder className="w-4 h-4" />
                                                    <span>{intervention.categorie.nom}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="w-4 h-4" />
                                                    <span>
                                                        {new Date(intervention.created_at).toLocaleDateString('fr-FR', {
                                                            day: 'numeric',
                                                            month: 'short'
                                                        })}
                                                    </span>
                                                </div>
                                            </div>
                                        </CardContent>
                                        
                                        <CardFooter className="pt-3 border-t border-slate-200 dark:border-slate-700">
                                            {intervention.statut === 'En cours' ? (
                                                <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg transition-all">
                                                    <Link href={`/intervention/view/${intervention.id}`} className="flex items-center justify-center gap-2">
                                                        <CheckCircle className="w-4 h-4" />
                                                        Terminer l'intervention
                                                    </Link>
                                                </Button>
                                            ) : (
                                                <div className="w-full">
                                                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${statusConfig.bgColor}`}>
                                                        <StatusIcon className={`w-4 h-4 ${statusConfig.color}`} />
                                                        <span className={`text-sm font-medium ${statusConfig.color}`}>
                                                            {statusConfig.text}
                                                        </span>
                                                    </div>
                                                    {intervention.statut === 'Résolu' && (
                                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                                                            En attente de clôture par l'utilisateur
                                                        </p>
                                                    )}
                                                </div>
                                            )}
                                        </CardFooter>
                                    </Card>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Statistiques */}
                <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900/50 mt-8">
                    <CardHeader>
                        <CardTitle className="text-slate-900 dark:text-white">Statistiques des interventions</CardTitle>
                        <CardDescription className="text-slate-600 dark:text-slate-400">Vue d'ensemble de votre activité</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {filters.map((filter) => {
                                const Icon = filter.icon;
                                const config = getStatusConfig(filter.value);
                                const percentage = interventions.length > 0 
                                    ? Math.round((filter.count / interventions.length) * 100) 
                                    : 0;
                                
                                return (
                                    <div 
                                        key={filter.value} 
                                        className={`p-4 rounded-lg ${config.bgColor} border border-slate-200/50 dark:border-slate-700 transition-transform hover:scale-[1.02]`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-slate-600 dark:text-slate-400">{filter.label}</p>
                                                <p className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">{filter.count}</p>
                                            </div>
                                            <Icon className={`w-8 h-8 ${config.color}`} />
                                        </div>
                                        <div className="mt-3">
                                            <div 
                                                className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden"
                                                role="progressbar"
                                                aria-valuenow={percentage}
                                                aria-valuemin={0}
                                                aria-valuemax={100}
                                                aria-label={`${filter.label}: ${percentage}%`}
                                                title={`${filter.label}: ${percentage}%`}
                                            >
                                                <div 
                                                    className={`h-2 rounded-full transition-all duration-500 ${config.color.replace('text-', 'bg-')}`}
                                                    style={{ width: `${percentage}%` }}
                                                />
                                            </div>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                                {percentage}% du total
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </TechnicienLayout>
    );
}