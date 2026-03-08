import React, { useState } from 'react';
import { 
  AlertTriangle, User, Bell, Lock, Shield, Eye, EyeOff, ChevronLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, useForm } from '@inertiajs/react';

export default function EditProfilePassword() {
  const [activeTab, setActiveTab] = useState('security');
  const [showPassword, setShowPassword] = useState(false);

  const {data, setData, post, processing, errors} = useForm({
    'current_password' : '',
    'password': '',
    'password_confirmation': '',
    _method: 'PUT'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(`/user/profil/edit/password`);
};



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => window.history.back()}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-6 w-6 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900">Édition du Profil</h1>
              </div>
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
                <Link href="/user/profil/edit">
                  <button
                    onClick={() => setActiveTab('personal')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === 'personal' 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <User className="h-5 w-5" />
                    <span className="font-medium">Informations</span>
                  </button>
                  </Link>
                  <button
                    onClick={() => setActiveTab('security')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === 'security' 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Lock className="h-5 w-5" />
                    <span className="font-medium">Sécurité</span>
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

            {/* Security */}
            {activeTab === 'security' && (
              <>
              <form onSubmit={handleSubmit}>
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
                          name='current_password'
                          value={data.current_password}
                          onChange={e => setData('current_password', e.target.value)}
                        />
                        {errors.current_password && <div className='text-red-300'>{errors.current_password}</div>}
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
                        name='password'
                        value={data.password}
                        onChange={e => setData('password', e.target.value)}
                      />
                        {errors.password && <div className='text-red-300'>{errors.password}</div>}

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
                        name='password_confirmation'
                        value={data.password_confirmation}
                        onChange={e => setData('password_confirmation', e.target.value)}
                      />
                        {errors.password_confirmation && <div className='text-red-300'>{errors.password_confirmation}</div>}

                    </div>

                    <Button className="ml-4" disabled={processing}>
                            Enregistrer
                        </Button>
                  </CardContent>
                </Card>
            </form>

              </>
            )}


          </div>
        </div>
      </div>
    </div>
  );
}