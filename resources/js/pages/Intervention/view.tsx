import Nav from '@/components/Nav';
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
  XCircle
} from 'lucide-react';
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';

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
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                <Nav user={user}/>
            
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            Mes Interventions
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300">
                            Suivez et gérez vos interventions en cours
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-lg px-4 py-2 shadow-sm">
                            <Filter className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600 dark:text-gray-300">
                                {interventions.length} interventions au total
                            </span>
                        </div>
                        
                        <Button asChild variant="outline">
                            <Link href="/incident">
                                <Eye className="w-4 h-4 mr-2" />
                                Voir tous les incidents
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Filtres */}
                <div className="mb-8">
                    <Tabs value={activeFilter} onValueChange={setActiveFilter}>
                        <TabsList className="grid grid-cols-3 md:w-auto">
                            {filters.map((filter) => {
                                const Icon = filter.icon;
                                const config = getStatusConfig(filter.value);
                                return (
                                    <TabsTrigger 
                                        key={filter.value} 
                                        value={filter.value}
                                        className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 dark:data-[state=active]:bg-blue-900/30 dark:data-[state=active]:text-blue-300"
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
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Interventions {activeFilter.toLowerCase()}
                        </h2>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            {filterIncidents.length} résultat{filterIncidents.length !== 1 ? 's' : ''}
                        </div>
                    </div>

                    {filterIncidents.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
                                <Archive className="w-12 h-12 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                Aucune intervention {activeFilter.toLowerCase()}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 max-w-md">
                                {activeFilter === 'En cours' 
                                    ? "Vous n'avez actuellement aucune intervention en cours. Revenez plus tard ou consultez les autres statuts."
                                    : `Aucune intervention n'est actuellement ${activeFilter.toLowerCase()}.`
                                }
                            </p>
                            {activeFilter !== 'En cours' && (
                                <Button 
                                    className="mt-4"
                                    onClick={() => setActiveFilter('En cours')}
                                >
                                    Voir les interventions en cours
                                </Button>
                            )}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filterIncidents.map((intervention) => {
                                const statusConfig = getStatusConfig(intervention.statut);
                                const StatusIcon = statusConfig.icon;

                                return (
                                    <Card 
                                        key={intervention.id} 
                                        className="border-0 shadow-lg dark:border-gray-700 hover:shadow-xl transition-shadow duration-300"
                                    >
                                        <CardHeader className="pb-3">
                                            <div className="flex justify-between items-start mb-2">
                                                <div className={`p-2 ${statusConfig.bgColor} rounded-lg`}>
                                                    <StatusIcon className={`w-5 h-5 ${statusConfig.color}`} />
                                                </div>
                                                <Badge className={getPriorityColor(intervention.priorite.nom)}>
                                                    {intervention.priorite.nom}
                                                </Badge>
                                            </div>
                                            <CardTitle className="text-lg capitalize line-clamp-2">
                                                {intervention.titre}
                                            </CardTitle>
                                            <CardDescription className="line-clamp-3">
                                                {intervention.description}
                                            </CardDescription>
                                        </CardHeader>
                                        
                                        <CardContent className="pb-3">
                                            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
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
                                        
                                        <CardFooter className="pt-3 border-t dark:border-gray-700">
                                            {intervention.statut === 'En cours' ? (
                                                <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                                                    <Link href={`/intervention/view/${intervention.id}`}>
                                                        <CheckCircle className="w-4 h-4 mr-2" />
                                                        Terminer l'intervention
                                                    </Link>
                                                </Button>
                                            ) : (
                                                <div className="w-full">
                                                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${statusConfig.bgColor}`}>
                                                        <StatusIcon className={`w-4 h-4 ${statusConfig.color}`} />
                                                        <span className={`text-sm font-medium ${statusConfig.color}`}>
                                                            {statusConfig.text}
                                                        </span>
                                                    </div>
                                                    {intervention.statut === 'Résolu' && (
                                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
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
                <Card className="border-0 shadow-lg dark:border-gray-700 mt-8">
                    <CardHeader>
                        <CardTitle>Statistiques des interventions</CardTitle>
                        <CardDescription>Vue d'ensemble de votre activité</CardDescription>
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
                                        className={`p-4 rounded-lg ${config.bgColor} border dark:border-gray-700`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">{filter.label}</p>
                                                <p className="text-2xl font-bold mt-1">{filter.count}</p>
                                            </div>
                                            <Icon className={`w-8 h-8 ${config.color}`} />
                                        </div>
                                        <div className="mt-3">
                                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                                <div 
                                                    className={`h-2 rounded-full ${config.color.replace('text-', 'bg-')}`}
                                                    style={{ width: `${percentage}%` }}
                                                />
                                            </div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
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
        </div>
    );
}