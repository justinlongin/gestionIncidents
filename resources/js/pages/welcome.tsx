import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, Shield, Clock, Users, Search, Bell, User, Menu,
  CheckCircle, TrendingUp, Zap, Lock, BarChart3, ChevronLeft, ChevronRight,
  Facebook, Twitter, Linkedin, Mail, Phone, MapPin, Github
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from '@inertiajs/react';

export default function IncidentPlatformLanding() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "Gérez vos incidents efficacement",
      description: "Une plateforme complète pour le suivi et la résolution rapide des incidents",
      bgColor: "from-blue-600 to-indigo-700"
    },
    {
      title: "Surveillance en temps réel",
      description: "Détectez et répondez aux incidents avant qu'ils n'affectent vos utilisateurs",
      bgColor: "from-indigo-600 to-purple-700"
    },
    {
      title: "Collaboration d'équipe",
      description: "Travaillez ensemble pour résoudre les problèmes plus rapidement",
      bgColor: "from-purple-600 to-pink-700"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: AlertTriangle,
      title: "Alertes Intelligentes",
      description: "Recevez des notifications instantanées pour les incidents critiques avec priorisation automatique"
    },
    {
      icon: Clock,
      title: "Résolution Rapide",
      description: "Réduisez le temps de résolution avec des workflows automatisés et des playbooks personnalisés"
    },
    {
      icon: Users,
      title: "Collaboration Équipe",
      description: "Assignez, suivez et collaborez sur les incidents en temps réel avec votre équipe"
    },
    {
      icon: BarChart3,
      title: "Analytiques Avancées",
      description: "Analysez les tendances et optimisez vos processus avec des rapports détaillés"
    },
    {
      icon: Shield,
      title: "Sécurité Renforcée",
      description: "Protégez vos données avec un chiffrement de bout en bout et des contrôles d'accès"
    },
    {
      icon: Zap,
      title: "Intégrations Multiples",
      description: "Connectez-vous à vos outils préférés : Slack, Teams, PagerDuty, et plus encore"
    }
  ];

  const stats = [
    { value: "99.9%", label: "Uptime garanti" },
    { value: "< 5min", label: "Temps de réponse" },
    { value: "50K+", label: "Incidents résolus" },
    { value: "500+", label: "Entreprises clientes" }
  ];

  const pricing = [
    {
      name: "Starter",
      price: "49",
      period: "mois",
      features: [
        "Jusqu'à 10 utilisateurs",
        "500 incidents/mois",
        "Support email",
        "Intégrations basiques",
        "Rapports mensuels"
      ],
      highlighted: false
    },
    {
      name: "Professional",
      price: "149",
      period: "mois",
      features: [
        "Jusqu'à 50 utilisateurs",
        "Incidents illimités",
        "Support prioritaire 24/7",
        "Toutes les intégrations",
        "Analytiques avancées",
        "Playbooks personnalisés"
      ],
      highlighted: true
    },
    {
      name: "Enterprise",
      price: "Sur mesure",
      period: "",
      features: [
        "Utilisateurs illimités",
        "Support dédié",
        "SLA personnalisé",
        "Intégrations sur mesure",
        "Formation équipe",
        "Conformité avancée"
      ],
      highlighted: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-gray-900 text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center">
              <Phone className="h-3 w-3 mr-1" />
              +33 1 23 45 67 89
            </span>
            <span className="flex items-center">
              <Mail className="h-3 w-3 mr-1" />
              contact@incidentpro.fr
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login"className="hover:text-blue-400 transition-colors" >Connexion</Link>
            <Button size="sm" variant="secondary" className="h-7">
              Essai Gratuit
            </Button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-blue-600 flex items-center">
                <AlertTriangle className="h-6 w-6 mr-2" />
                IncidentPro
              </h1>
              <nav className="hidden md:flex space-x-6">
                <a href="#features" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Fonctionnalités</a>
                <a href="#pricing" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Tarifs</a>
                <a href="#about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">À propos</a>
                <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Contact</a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
            <Link href="/login"className="hover:text-blue-400 transition-colors" >Connexion</Link>

              <Button>Commencer Gratuitement</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Carousel */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`min-w-full text-center text-white`}
              >
                <h2 className="text-5xl font-bold mb-4">{slide.title}</h2>
                <p className="text-xl mb-8 text-blue-100">{slide.description}</p>
                <div className="flex justify-center space-x-4">
                  <Button size="lg" variant="secondary">
                    Démarrer Maintenant
                  </Button>
                  <Button size="lg" variant="outline" className="bg-white/10 text-white border-white hover:bg-white/20">
                    Voir la Démo
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <Button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-3 transition-all"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-3 transition-all"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Dots Indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
            {slides.map((_, index) => (
              <Button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentSlide === index 
                    ? 'bg-white w-8' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-12 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Fonctionnalités Puissantes
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tous les outils dont vous avez besoin pour gérer vos incidents efficacement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Tarifs Simples et Transparents
            </h2>
            <p className="text-xl text-gray-600">
              Choisissez le plan qui correspond à vos besoins
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricing.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative ${plan.highlighted ? 'border-2 border-blue-600 shadow-xl' : ''}`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-4 py-1">
                      Plus Populaire
                    </Badge>
                  </div>
                )}
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-gray-900">
                      {plan.price === "Sur mesure" ? "" : "€"}{plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-gray-600">/{plan.period}</span>
                    )}
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${plan.highlighted ? '' : 'bg-gray-900'}`}
                    size="lg"
                  >
                    {plan.price === "Sur mesure" ? "Nous Contacter" : "Commencer"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Prêt à optimiser la gestion de vos incidents ?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Rejoignez plus de 500 entreprises qui font confiance à IncidentPro
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg" variant="secondary">
              Essai Gratuit 14 Jours
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 text-white border-white hover:bg-white/20">
              Planifier une Démo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold flex items-center">
                <AlertTriangle className="h-6 w-6 mr-2" />
                IncidentPro
              </h3>
              <p className="text-gray-400 text-sm">
                La solution complète pour gérer et résoudre vos incidents rapidement et efficacement.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-400 rounded-full flex items-center justify-center transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors">
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Product */}
            <div>
              <h4 className="font-semibold text-white mb-4">Produit</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Fonctionnalités</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Intégrations</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Tarifs</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">API</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Sécurité</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-semibold text-white mb-4">Ressources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Guides</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Support</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Statut</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-white mb-4">Contact</h4>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                  <span className="text-gray-400 text-sm">
                    15 Avenue des Champs-Élysées<br />
                    75008 Paris, France
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-400 text-sm">+33 1 23 45 67 89</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-400 text-sm">contact@incidentpro.fr</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="border-t border-gray-800 mt-8 pt-8">
            <div className="max-w-md">
              <h4 className="font-semibold text-white mb-2">Newsletter</h4>
              <p className="text-gray-400 text-sm mb-4">Recevez les dernières actualités et conseils directement dans votre boîte mail.</p>
              <div className="flex space-x-2">
                <Input 
                  type="email" 
                  placeholder="Votre email" 
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                />
                <Button>S'inscrire</Button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2026 IncidentPro. Tous droits réservés.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Confidentialité</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Conditions</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}