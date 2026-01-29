import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Textarea } from "@/components/ui/textarea"
import { User } from "@/types"
import { Head } from "@inertiajs/react"
import {
  Mail,
  MapPin,
  Phone,
  Send,
  MessageSquare,
  Clock,
  Building2
} from "lucide-react"
import { useState } from "react"

interface Props {
  user?: User
}

export default function Contact({ user }: Props) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log('Form submitted:', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "support@userhub.com",
      link: "mailto:support@userhub.com",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Phone,
      label: "Téléphone",
      value: "+33 1 23 45 67 89",
      link: "tel:+33123456789",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: MapPin,
      label: "Adresse",
      value: "123 Avenue des Champs-Élysées, Paris, France",
      link: "https://maps.google.com",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: Building2,
      label: "Bureau",
      value: "Du lundi au vendredi",
      link: null,
      color: "from-purple-500 to-indigo-500"
    }
  ]

  const PageContent = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <Head title="Contact" />

      {user && <SiteHeader titre="Contactez-nous" />}

      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-4 md:gap-6">
          {/* En-tête */}
          <div className="px-3 sm:px-4 pt-4 sm:pt-6 lg:px-6">
            <div className="mb-4 sm:mb-6">
              <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-12">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3 sm:mb-4 px-2">
                  Contactez-nous
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 px-4">
                  Nous sommes là pour vous aider. Envoyez-nous un message et notre équipe vous répondra dans les plus brefs délais.
                </p>
              </div>

              {/* Cartes d'information de contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8">
                {contactInfo.map((info, index) => (
                  <Card
                    key={index}
                    className="border-0 shadow-lg bg-white dark:bg-slate-800 hover:shadow-xl transition-shadow"
                  >
                    <CardContent className="p-4 sm:p-5 md:p-6">
                      <div className={`inline-flex p-2 sm:p-3 rounded-lg bg-gradient-to-r ${info.color} mb-3 sm:mb-4`}>
                        <info.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                      </div>
                      <h3 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white mb-1 sm:mb-2">
                        {info.label}
                      </h3>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors break-words"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 break-words">
                          {info.value}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Formulaire de contact et heures d'ouverture */}
          <div className="flex flex-col gap-4 sm:gap-6 px-3 sm:px-4 lg:px-6 pb-6 sm:pb-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Formulaire de contact */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-blue-50 dark:from-slate-800 dark:to-slate-900/50 lg:col-span-2">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg md:text-xl text-slate-900 dark:text-white">
                    <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                    Envoyez-nous un message
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    Remplissez le formulaire ci-dessous et nous vous répondrons rapidement
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm text-slate-700 dark:text-slate-300">
                          Nom complet
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Jean Dupont"
                          value={formData.name}
                          onChange={handleChange}
                          className="h-11 sm:h-10 text-base sm:text-sm bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm text-slate-700 dark:text-slate-300">
                          Email
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="jean.dupont@email.com"
                          value={formData.email}
                          onChange={handleChange}
                          className="h-11 sm:h-10 text-base sm:text-sm bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-sm text-slate-700 dark:text-slate-300">
                        Sujet
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="En quoi pouvons-nous vous aider ?"
                        value={formData.subject}
                        onChange={handleChange}
                        className="h-11 sm:h-10 text-base sm:text-sm bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm text-slate-700 dark:text-slate-300">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Décrivez votre demande..."
                        value={formData.message}
                        onChange={handleChange}
                        className="min-h-[120px] sm:min-h-[150px] text-base sm:text-sm bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 resize-none"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-12 sm:h-11 text-base sm:text-sm bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white touch-manipulation"
                      size="lg"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Envoyer le message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Heures d'ouverture et info additionnelle */}
              <div className="space-y-4 sm:space-y-6">
                <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-purple-50 dark:from-slate-800 dark:to-purple-900/20">
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="flex items-center gap-2 text-base sm:text-lg text-slate-900 dark:text-white">
                      <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500" />
                      Heures d'ouverture
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-slate-700">
                        <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
                          Lundi - Vendredi
                        </span>
                        <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                          9h - 18h
                        </span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-slate-700">
                        <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
                          Samedi
                        </span>
                        <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                          10h - 14h
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
                          Dimanche
                        </span>
                        <span className="text-xs sm:text-sm text-red-600 dark:text-red-400 font-medium">
                          Fermé
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-green-50 dark:from-slate-800 dark:to-green-900/20">
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-base sm:text-lg text-slate-900 dark:text-white">
                      Support rapide
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-4">
                      Pour une assistance immédiate, consultez notre centre d'aide ou contactez-nous via le chat en direct.
                    </p>
                    <div className="space-y-3">
                      <Button
                        variant="outline"
                        className="w-full h-11 sm:h-10 text-sm border-green-300 dark:border-green-700 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 touch-manipulation"
                      >
                        Centre d'aide
                      </Button>
                      <Button
                        className="w-full h-11 sm:h-10 text-sm bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white touch-manipulation"
                      >
                        Chat en direct
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Section carte optionnelle */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900/50">
              <CardContent className="p-0">
                <div className="aspect-video w-full rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-700 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center px-4">
                      <MapPin className="h-10 w-10 sm:h-12 sm:w-12 mx-auto text-slate-400 dark:text-slate-500 mb-2 sm:mb-3" />
                      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
                        Carte de localisation
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )

  // Render with or without sidebar based on user prop
  if (user) {
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
          <PageContent />
        </SidebarInset>
      </SidebarProvider>
    )
  }

  return <PageContent />
}
