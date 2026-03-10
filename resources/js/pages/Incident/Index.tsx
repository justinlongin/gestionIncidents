import Nav from "@/components/Nav";
import { Button } from "@/components/ui/button";
import {
    Table, TableBody, TableCell, TableHead,
    TableHeader, TableRow
} from "@/components/ui/table";
import { Incident, User } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { Badge } from "@/components/ui/badge";
import {
    Card, CardContent, CardDescription,
    CardHeader, CardTitle
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    AlertCircle, CheckCircle, Clock,
    Filter, PlusCircle
} from "lucide-react";
import { useState } from "react";

interface Props {
    incidents: Incident[]
    user: User
}

export default function Index({ incidents, user }: Props) {
    const [activeFilter, setActiveFilter] = useState<string>('all');

    const filterIncidents = incidents.filter(i => i.statut !== 'Terminé');

    let filterFilterIncidents = filterIncidents;
    if (activeFilter === 'En attente') filterFilterIncidents = filterIncidents.filter(i => i.statut === 'En attente');
    if (activeFilter === 'En cours')   filterFilterIncidents = filterIncidents.filter(i => i.statut === 'En cours');
    if (activeFilter === 'Résolu')     filterFilterIncidents = filterIncidents.filter(i => i.statut === 'Résolu');

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'elevée':  return 'bg-red-500 text-white';
            case 'moyenne': return 'bg-orange-500 text-white';
            case 'basse':   return 'bg-green-500 text-white';
            default:        return 'bg-gray-500 text-white';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'En attente': return <Clock      className="w-4 h-4 text-yellow-500" />;
            case 'En cours':   return <AlertCircle className="w-4 h-4 text-blue-500"   />;
            case 'Résolu':     return <CheckCircle className="w-4 h-4 text-green-500"  />;
            default:           return <Clock       className="w-4 h-4"                 />;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <Head title="Gestion des Incidents" />

            {/* ── NAVBAR UNIFIÉE — mode app, user toujours connecté ici ── */}
            <Nav user={user} mode="app" />

            <div className="container mx-auto px-4 py-8">
                {/* ── EN-TÊTE PAGE ── */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            Gestion des Incidents
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300">
                            {user.role.nom === 'technicien'
                                ? "Suivez et gérez les incidents assignés"
                                : "Créez et suivez vos incidents"}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-lg px-4 py-2 shadow-sm">
                            <Filter className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600 dark:text-gray-300">
                                {filterIncidents.length} incidents actifs
                            </span>
                        </div>

                        {user.role.nom === 'technicien' && (
                            <Link href="/intervention/view">
                                <Button className="cursor-pointer bg-blue-600 hover:bg-blue-700 transition-colors shadow-md">
                                    <Clock className="w-4 h-4 mr-2" />
                                    Mes Interventions
                                </Button>
                            </Link>
                        )}

                        {user.role.nom === 'user' && (
                            <Link href="/incident/create">
                                <Button className="cursor-pointer bg-green-600 hover:bg-green-700 transition-colors shadow-md">
                                    <PlusCircle className="w-4 h-4 mr-2" />
                                    Nouvel Incident
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>

                {/* ── TABLE CARD ── */}
                <Card className="border-0 shadow-xl dark:border-gray-700">
                    <CardHeader className="pb-4">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <CardTitle className="text-2xl">Incidents Actifs</CardTitle>
                                <CardDescription>
                                    Liste des incidents nécessitant une attention
                                </CardDescription>
                            </div>

                            {user.role.nom === 'user' && (
                                <Tabs defaultValue="all" className="w-auto" onValueChange={setActiveFilter}>
                                    <TabsList>
                                        <TabsTrigger value="all">Tous</TabsTrigger>
                                        <TabsTrigger value="En attente">En attente</TabsTrigger>
                                        <TabsTrigger value="En cours">En cours</TabsTrigger>
                                        <TabsTrigger value="Résolu">Résolu</TabsTrigger>
                                    </TabsList>
                                </Tabs>
                            )}
                        </div>
                    </CardHeader>

                    <CardContent>
                        <div className="rounded-lg border dark:border-gray-700 overflow-hidden">
                            <Table>
                                <TableHeader className="bg-gray-50 dark:bg-gray-800">
                                    <TableRow>
                                        <TableHead className="font-semibold">Titre</TableHead>
                                        <TableHead className="hidden lg:table-cell">Description</TableHead>
                                        <TableHead className="hidden md:table-cell">Priorité</TableHead>
                                        <TableHead className="hidden md:table-cell">Catégorie</TableHead>
                                        <TableHead className="hidden lg:table-cell">Créé le</TableHead>
                                        {user.role.nom === 'technicien' && (
                                            <TableHead className="text-center">Action</TableHead>
                                        )}
                                        {user.role.nom === 'user' && (
                                            <>
                                                <TableHead>Statut</TableHead>
                                                <TableHead>Actions</TableHead>
                                            </>
                                        )}
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {filterFilterIncidents.length === 0 ? (
                                        <TableRow>
                                            <TableCell
                                                colSpan={user.role.nom === 'technicien' ? 6 : 7}
                                                className="text-center py-12"
                                            >
                                                <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                                                    <CheckCircle className="w-12 h-12 mb-4 text-green-500" />
                                                    <p className="text-lg font-medium">Aucun incident actif</p>
                                                    <p className="text-sm">Tous les incidents sont traités</p>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filterFilterIncidents.map(incident => (
                                            <TableRow
                                                key={incident.id}
                                                className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                                            >
                                                {/* Titre */}
                                                <TableCell className="font-medium">
                                                    <div className="flex items-center gap-2">
                                                        {getStatusIcon(incident.statut)}
                                                        <span className="truncate max-w-[150px]">{incident.titre}</span>
                                                    </div>
                                                </TableCell>

                                                {/* Description */}
                                                <TableCell className="hidden lg:table-cell max-w-xs truncate">
                                                    {incident.description}
                                                </TableCell>

                                                {/* Priorité */}
                                                <TableCell className="hidden md:table-cell">
                                                    <Badge className={getPriorityColor(incident.priorite.nom)}>
                                                        {incident.priorite.nom}
                                                    </Badge>
                                                </TableCell>

                                                {/* Catégorie */}
                                                <TableCell className="hidden md:table-cell">
                                                    <Badge variant="outline">
                                                        {incident.categorie.nom}
                                                    </Badge>
                                                </TableCell>

                                                {/* Date */}
                                                <TableCell className="hidden lg:table-cell">
                                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                                        {new Date(incident.created_at).toLocaleDateString('fr-FR', {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric',
                                                        })}
                                                    </div>
                                                </TableCell>

                                                {/* Action technicien */}
                                                {user.role.nom === 'technicien' && (
                                                    <TableCell>
                                                        <div className="flex justify-center">
                                                            <Link href={`/incident/${incident.id}`}>
                                                                <Button
                                                                    size="sm"
                                                                    className="cursor-pointer bg-blue-600 hover:bg-blue-700 transition-colors"
                                                                >
                                                                    Intervenir
                                                                </Button>
                                                            </Link>
                                                        </div>
                                                    </TableCell>
                                                )}

                                                {/* Actions user */}
                                                {user.role.nom === 'user' && (
                                                    <>
                                                        <TableCell>
                                                            <div className="flex items-center gap-2">
                                                                {getStatusIcon(incident.statut)}
                                                                <span className="capitalize">{incident.statut}</span>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="flex gap-2">
                                                                <Button
                                                                    size="sm"
                                                                    variant="outline"
                                                                    disabled={incident.statut !== 'En attente'}
                                                                    className="cursor-pointer"
                                                                >
                                                                    <Link href={`/incident/${incident.id}/edit`}>Éditer</Link>
                                                                </Button>
                                                                {incident.statut === 'Résolu' && (
                                                                    <Link href={`/intervention/cloture/${incident.id}`}>
                                                                        <Button
                                                                            size="sm"
                                                                            className="cursor-pointer bg-green-600 hover:bg-green-700"
                                                                        >
                                                                            Clôturer
                                                                        </Button>
                                                                    </Link>
                                                                )}
                                                            </div>
                                                        </TableCell>
                                                    </>
                                                )}
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}