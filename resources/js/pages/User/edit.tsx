import React, { useState } from 'react';
import { 
  AlertTriangle, User as Userlucide, Mail, Phone, MapPin, Building, Globe,
  Camera, Save, X, Bell, Lock, Shield, Eye, EyeOff, ChevronLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select } from '@/components/ui/select';
import { Link, useForm } from '@inertiajs/react';
import { User } from '@/types';

interface Props{
  user: User
}

export default function EditProfilePage({user}:Props) {
  const [activeTab, setActiveTab] = useState('personal');
  const [showPassword, setShowPassword] = useState(false);

  const {data, setData, post, processing, errors} = useForm({
    'name': user.name,
    'telephone': user.telephone,
    _method: 'PUT'
  })

  const handlesubmit = (e: React.FormEvent) =>{
    e.preventDefault()
    post('/user/profil/edit')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
            <Link href="/user/profil">
              <Button variant="ghost" size="icon">
                <ChevronLeft className="h-5 w-5" />
              </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-6 w-6 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900">Édition du Profil</h1>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline">
                <X className="h-4 w-4 mr-2" />
                Annuler
              </Button>
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Enregistrer
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1">
            <Card>
              <CardContent className="p-4">
                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveTab('personal')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === 'personal' 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Userlucide className="h-5 w-5" />
                    <span className="font-medium">Informations</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('security')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === 'security' 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Lock className="h-5 w-5" />
                    <span className="font-medium"><Link href="/user/profil/edit/password">Sécurité</Link></span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('notifications')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === 'notifications' 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Bell className="h-5 w-5" />
                    <span className="font-medium">Notifications</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('preferences')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === 'preferences' 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Shield className="h-5 w-5" />
                    <span className="font-medium">Préférences</span>
                  </button>
                </nav>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Personal Information */}
            {activeTab === 'personal' && (
              <>
                {/* Profile Picture */}
                <Card>
                  <CardHeader>
                    <CardTitle>Photo de Profil</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-6">
                      <div className="relative">
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                          JD
                        </div>
                        <Button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center text-white shadow-lg transition-colors">
                          <Camera className="h-4 w-4" />
                        </Button>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-2">
                          JPG, GIF ou PNG. Taille maximale de 2MB
                        </p>
                        <div className="flex space-x-2">
                          <Button size="sm">Télécharger une photo</Button>
                          <Button size="sm" variant="outline">Supprimer</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Basic Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Informations Personnelles</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <form onSubmit={handlesubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nom
                        </label>
                        <Input
                          type='text'
                          value={data.name}
                          onChange={(e) => setData('name', e.target.value)}
                          placeholder="Nom"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Phone className="h-4 w-4 inline mr-2" />
                        Téléphone
                      </label>
                      <Input
                        type="text"
                        value={data.telephone}
                        onChange={(e) => setData('telephone', e.target.value)}
                        placeholder="+33 6 12 34 56 78"
                      />
                    </div>
                    <Button className='cursor-pointer mt-5'> {processing ? 'Edition....' : 'Editer'}</Button>
                    </form>
                  </CardContent>
                </Card>
              </>
            )}

            {/* Security */}
            {/* {activeTab === 'security' && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Modifier le Mot de Passe</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mot de passe actuel
                      </label>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                        />
                        <button
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nouveau mot de passe
                      </label>
                      <Input
                        type="password"
                        placeholder="••••••••"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Minimum 8 caractères avec au moins une majuscule et un chiffre
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirmer le mot de passe
                      </label>
                      <Input
                        type="password"
                        placeholder="••••••••"
                      />
                    </div>

                    <Button>Mettre à jour le mot de passe</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Authentification à Deux Facteurs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg mb-4">
                      <div className="flex items-center space-x-3">
                        <Shield className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="font-medium text-green-900">2FA Activée</p>
                          <p className="text-sm text-green-700">Votre compte est sécurisé</p>
                        </div>
                      </div>
                      <Badge className="bg-green-600">Actif</Badge>
                    </div>
                    <Button variant="outline">Configurer 2FA</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Sessions Actives</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Paris, France</p>
                        <p className="text-sm text-gray-600">Chrome sur Windows • Session actuelle</p>
                        <p className="text-xs text-gray-500 mt-1">Dernière activité: Il y a 2 minutes</p>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Actuel
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Lyon, France</p>
                        <p className="text-sm text-gray-600">Safari sur iPhone</p>
                        <p className="text-xs text-gray-500 mt-1">Dernière activité: Il y a 3 heures</p>
                      </div>
                      <Button variant="outline" size="sm">Déconnecter</Button>
                    </div>
                  </CardContent>
                </Card>
              </>
            )} */}

            {/* Notifications */}
            {/* {activeTab === 'notifications' && (
              <Card>
                <CardHeader>
                  <CardTitle>Préférences de Notifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Notifications Email</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Nouveaux incidents</p>
                          <p className="text-sm text-gray-600">Recevoir un email pour chaque nouvel incident</p>
                        </div>
                        <button
                          onClick={() => handleNotificationToggle('emailIncidents')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            notifications.emailIncidents ? 'bg-blue-600' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              notifications.emailIncidents ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Rapports hebdomadaires</p>
                          <p className="text-sm text-gray-600">Résumé des incidents de la semaine</p>
                        </div>
                        <button
                          onClick={() => handleNotificationToggle('emailReports')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            notifications.emailReports ? 'bg-blue-600' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              notifications.emailReports ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Activité de l'équipe</p>
                          <p className="text-sm text-gray-600">Notifications sur les actions de votre équipe</p>
                        </div>
                        <button
                          onClick={() => handleNotificationToggle('emailTeam')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            notifications.emailTeam ? 'bg-blue-600' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              notifications.emailTeam ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Notifications Push</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Incidents critiques</p>
                          <p className="text-sm text-gray-600">Alertes instantanées pour les incidents critiques</p>
                        </div>
                        <button
                          onClick={() => handleNotificationToggle('pushIncidents')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            notifications.pushIncidents ? 'bg-blue-600' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              notifications.pushIncidents ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Commentaires</p>
                          <p className="text-sm text-gray-600">Quand quelqu'un commente vos incidents</p>
                        </div>
                        <button
                          onClick={() => handleNotificationToggle('pushComments')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            notifications.pushComments ? 'bg-blue-600' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              notifications.pushComments ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Assignations</p>
                          <p className="text-sm text-gray-600">Quand un incident vous est assigné</p>
                        </div>
                        <button
                          onClick={() => handleNotificationToggle('pushAssignments')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            notifications.pushAssignments ? 'bg-blue-600' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              notifications.pushAssignments ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )} */}

            {/* Preferences */}
            {/* {activeTab === 'preferences' && (
              <Card>
                <CardHeader>
                  <CardTitle>Préférences Générales</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fuseau Horaire
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Europe/Paris</option>
                      <option>America/New_York</option>
                      <option>Asia/Tokyo</option>
                      <option>Australia/Sydney</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Langue
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Français</option>
                      <option>English</option>
                      <option>Español</option>
                      <option>Deutsch</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Format de Date
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>DD/MM/YYYY</option>
                      <option>MM/DD/YYYY</option>
                      <option>YYYY-MM-DD</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Format d'Heure
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>24 heures</option>
                      <option>12 heures (AM/PM)</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}