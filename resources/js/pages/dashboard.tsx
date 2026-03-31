import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import { Incident, User } from "@/types"
import IncidentTable from "@/components/IncidentTable"
import UserTable from "@/components/UserTable"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Activity, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  Users, 
  TrendingUp,
  FileWarning,
  Bell,
  BarChart3,
  Download,
  Filter,
  Plus,
  RefreshCw
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Link } from "@inertiajs/react"
import { Progress } from "@/components/ui/progress"
import { useEffect, useState } from "react"

interface Props {
  incidents: Incident[]
  users: User[]
  user: User
}

export default function Dashboard({ incidents, users, user }: Props) {
  // Calcul des statistiques
  const totalIncidents = incidents.length
  const incidentsEnCours = incidents.filter(i => i.statut === 'En cours').length
  const incidentsResolus = incidents.filter(i => i.statut === 'Résolu').length
  const incidentsEnAttente = incidents.filter(i => i.statut === 'En attente').length
  const incidentsTermines = incidents.filter(i => i.statut === 'Terminé').length
  
  const totalUsers = users.length

  const techniciens = users.filter(u => u.role.nom === 'technicien').length
  const employes = users.filter(u => u.role.nom === 'user').length



  
  // Taux de résolution
  const resolutionRate = totalIncidents > 0 
    ? Math.round(((incidentsResolus + incidentsTermines) / totalIncidents) * 100)
    : 0

  // Incidents récents
  const recentIncidents = incidents
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5)

  // Incidents urgents
  const urgentIncidents = incidents.filter(i => i.priorite.nom === 'elevée' && i.statut !== 'Terminé').slice(0, 3)

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar user={user} />

      <SidebarInset>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
          <SiteHeader titre="Tableau de bord" />
          
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-6">
              {/* En-tête avec actions rapides */}
              <div className="px-4 pt-6 lg:px-6">
                <div className="mb-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                      <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Tableau de bord
                      </h1>
                      <p className="text-slate-600 dark:text-slate-400 mt-2">
                        Vue d'ensemble de votre plateforme de gestion d'incidents
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <Button variant="outline" size="sm" className="border-slate-300 dark:border-slate-700">
                        <Download className="mr-2 h-4 w-4" />
                        Exporter
                      </Button>
                      <Button size="sm" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                        <Plus className="mr-2 h-4 w-4" />
                        Nouveau rapport
                      </Button>
                    </div>
                  </div>

                  {/* Cartes de statistiques avec gradient */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-blue-50 dark:from-slate-800 dark:to-slate-900/50">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          Total Incidents
                        </CardTitle>
                        <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                          <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                          {totalIncidents}
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-3 w-3 text-green-500" />
                          <span className="text-xs text-slate-600 dark:text-slate-400">
                            +{incidentsEnCours} en cours
                          </span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-yellow-50 dark:from-slate-800 dark:to-yellow-900/20">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          En Attente
                        </CardTitle>
                        <div className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900/30">
                          <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                          {incidentsEnAttente}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-600 dark:text-slate-400">
                            Nécessitent une intervention
                          </span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-green-50 dark:from-slate-800 dark:to-green-900/20">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          Taux de résolution
                        </CardTitle>
                        <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                          <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                          {resolutionRate}%
                        </div>
                        <Progress value={resolutionRate} className="h-2" />
                      </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-purple-50 dark:from-slate-800 dark:to-purple-900/20">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          Utilisateurs
                        </CardTitle>
                        <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                          <Users className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                          {totalUsers}
                        </div>
                        <div className="flex gap-4 text-xs text-slate-600 dark:text-slate-400">
                          <span className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            {techniciens} techniciens
                          </span>
                          <span className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            {employes} employés
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>

              {/* Contenu principal */}
              <div className="flex flex-col gap-6 px-4 lg:px-6 pb-8">
                <Tabs defaultValue="overview" className="space-y-6">
                  <TabsList className="bg-slate-100 dark:bg-slate-800 p-1">
                    <TabsTrigger 
                      value="overview" 
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
                    >
                      Vue d'ensemble
                    </TabsTrigger>
                    <TabsTrigger 
                      value="incidents" 
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
                    >
                      Incidents
                    </TabsTrigger>
                    <TabsTrigger 
                      value="users" 
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
                    >
                      Utilisateurs
                    </TabsTrigger>
                    <TabsTrigger 
                      value="analytics" 
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
                    >
                      Analytiques
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-6">
                    {/* Graphique et alerts */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-blue-50 dark:from-slate-800 dark:to-slate-900/50">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
                            <Activity className="h-5 w-5 text-blue-500" />
                            Activité des incidents
                          </CardTitle>
                          <CardDescription className="text-slate-600 dark:text-slate-400">
                            Évolution des incidents sur les 90 derniers jours
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ChartAreaInteractive chartData={incidents} />
                        </CardContent>
                      </Card>

                      {/* Incidents urgents */}
                      <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-red-50 dark:from-slate-800 dark:to-red-900/20">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
                                <AlertCircle className="h-5 w-5 text-red-500" />
                                Incidents urgents
                              </CardTitle>
                              <CardDescription className="text-slate-600 dark:text-slate-400">
                                Priorité élevée nécessitant attention
                              </CardDescription>
                            </div>
                            <Badge className="bg-gradient-to-r from-red-500 to-orange-500">
                              {urgentIncidents.length} urgent{urgentIncidents.length !== 1 ? 's' : ''}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {urgentIncidents.map((incident) => (
                              <div key={incident.id} className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/30 rounded-lg">
                                <div className="space-y-1">
                                  <p className="text-sm font-medium leading-none text-slate-900 dark:text-white">
                                    {incident.titre}
                                  </p>
                                  <div className="flex items-center gap-2 text-xs">
                                    <Badge variant="outline" className="capitalize border-red-200 dark:border-red-800">

                                      {incident.priorite.nom}


                                    </Badge>
                                    <span className="text-slate-600 dark:text-slate-400">
                                      {incident.categorie.nom}
                                    </span>
                                  </div>
                                </div>
                                <Button size="sm" variant="outline" className="border-red-300 dark:border-red-700 text-red-600 dark:text-red-400">
                                  Voir
                                </Button>
                              </div>
                            ))}
                            {urgentIncidents.length === 0 && (
                              <div className="text-center py-6">
                                <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-3" />
                                <p className="text-slate-600 dark:text-slate-400">
                                  Aucun incident urgent en ce moment
                                </p>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Incidents récents et graphiques */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Incidents récents */}
                      <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900/50">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
                                <FileWarning className="h-5 w-5 text-slate-500" />
                                Incidents récents
                              </CardTitle>
                              <CardDescription className="text-slate-600 dark:text-slate-400">
                                5 derniers incidents créés
                              </CardDescription>
                            </div>
                            <Button variant="ghost" size="sm" asChild>
                              <Link href="/admin/incidents" className="text-blue-600 dark:text-blue-400">
                                Voir tout
                              </Link>
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {recentIncidents.map((incident) => (
                              <div key={incident.id} className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3 last:border-0">
                                <div className="space-y-1">
                                  <p className="text-sm font-medium leading-none text-slate-900 dark:text-white">
                                    {incident.titre}
                                  </p>
                                  <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                                    <Badge variant="outline" className="capitalize">

                                      {incident.priorite.nom}

                                    </Badge>
                                    <span>•</span>
                                    <span>{incident.categorie.nom}</span>
                                  </div>
                                </div>
                                <Badge className={
                                  incident.statut === 'En attente' ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white' :
                                  incident.statut === 'En cours' ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' :
                                  incident.statut === 'Résolu' ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' :
                                  'bg-gradient-to-r from-gray-500 to-slate-500 text-white'
                                }>
                                  {incident.statut}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Graphique de répartition */}
                      <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-purple-50 dark:from-slate-800 dark:to-purple-900/20">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
                            <BarChart3 className="h-5 w-5 text-purple-500" />
                            Répartition par statut
                          </CardTitle>
                          <CardDescription className="text-slate-600 dark:text-slate-400">
                            Distribution des incidents selon leur statut
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {[
                              { status: 'En attente', count: incidentsEnAttente, color: 'bg-gradient-to-r from-yellow-400 to-orange-400' },
                              { status: 'En cours', count: incidentsEnCours, color: 'bg-gradient-to-r from-blue-400 to-cyan-400' },
                              { status: 'Résolu', count: incidentsResolus, color: 'bg-gradient-to-r from-green-400 to-emerald-400' },
                              { status: 'Terminé', count: incidentsTermines, color: 'bg-gradient-to-r from-gray-400 to-slate-400' }
                            ].map((item) => (
                              <div key={item.status} className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    {item.status}
                                  </span>
                                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                                    {item.count}
                                  </span>
                                </div>
                                <Progress 
                                  value={totalIncidents > 0 ? (item.count / totalIncidents) * 100 : 0}
                                  className="h-2 bg-slate-200 dark:bg-slate-700"
                                  indicatorClassName={`${item.color}`}
                                />
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="incidents" className="space-y-6">
                    <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-blue-50 dark:from-slate-800 dark:to-slate-900/50">
                      <CardHeader>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <CardTitle className="text-slate-900 dark:text-white">Tous les incidents</CardTitle>
                            <CardDescription className="text-slate-600 dark:text-slate-400">
                              Gérez et surveillez tous les incidents de la plateforme
                            </CardDescription>
                          </div>
                          <div className="flex gap-3">
                            <Button variant="outline" size="sm" className="border-slate-300 dark:border-slate-700">
                              <Filter className="mr-2 h-4 w-4" />
                              Filtres
                            </Button>
                            <Button size="sm" className="bg-gradient-to-r from-blue-600 to-blue-700">
                              <Plus className="mr-2 h-4 w-4" />
                              Nouvel incident
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <IncidentTable data={incidents} />
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="users" className="space-y-6">
                    <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-purple-50 dark:from-slate-800 dark:to-purple-900/20">
                      <CardHeader>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <CardTitle className="text-slate-900 dark:text-white">Gestion des utilisateurs</CardTitle>
                            <CardDescription className="text-slate-600 dark:text-slate-400">
                              Visualiser et gérer tous les utilisateurs de la plateforme
                            </CardDescription>
                          </div>
                          <div className="flex gap-3">
                            <Button variant="outline" size="sm" className="border-slate-300 dark:border-slate-700">
                              <Filter className="mr-2 h-4 w-4" />
                              Filtres
                            </Button>
                            <Button size="sm" className="bg-gradient-to-r from-purple-600 to-purple-700">
                              <Plus className="mr-2 h-4 w-4" />
                              Ajouter utilisateur
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <UserTable data={users} />
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="analytics" className="space-y-6">
                    <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-green-50 dark:from-slate-800 dark:to-green-900/20">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
                          <TrendingUp className="h-5 w-5 text-green-500" />
                          Analyses détaillées
                        </CardTitle>
                        <CardDescription className="text-slate-600 dark:text-slate-400">
                          Statistiques avancées et tendances
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="h-96 flex flex-col items-center justify-center">
                        <div className="text-center max-w-md">
                          <div className="relative mb-6">
                            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur-xl opacity-30"></div>
                            <Activity className="relative h-16 w-16 mx-auto text-green-500" />
                          </div>
                          <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">
                            Analytiques avancées
                          </h3>
                          <p className="text-slate-600 dark:text-slate-400 mb-6">
                            Cette section vous permettra d'analyser les performances,
                            les tendances et les métriques clés de votre plateforme.
                          </p>
                          <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Actualiser les données
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}