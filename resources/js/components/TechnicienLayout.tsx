import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { User } from "@/types"
import { TechnicienSidebar } from "@/components/technicientSidebar"
import { SiteHeader } from "@/components/site-header"

interface TechnicienLayoutProps {
  user: User
  titre?: string
  children: React.ReactNode
}

export function TechnicienLayout({ user, titre = "Tableau de bord", children }: TechnicienLayoutProps) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <TechnicienSidebar user={user} />

      <SidebarInset>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
          <SiteHeader titre={titre} />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-6">
              {children}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
