"use client"

import { Calendar, History, Home, UserCheck } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface SidebarNavProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function SidebarNav({ activeTab, setActiveTab }: SidebarNavProps) {
  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
    },
    {
      id: "assignment",
      label: "Asignación",
      icon: Calendar,
    },
    {
      id: "substitution",
      label: "Sustitución",
      icon: UserCheck,
    },
    {
      id: "history",
      label: "Historial",
      icon: History,
    },
  ]

  return (
    <TooltipProvider delayDuration={0}>
      <div className="hidden md:flex h-full w-[70px] flex-col items-center border-r bg-muted/40 py-4">
        {navItems.map((item) => (
          <Tooltip key={item.id}>
            <TooltipTrigger asChild>
              <Button
                variant={activeTab === item.id ? "secondary" : "ghost"}
                size="icon"
                className={cn("h-12 w-12 my-1", activeTab === item.id && "bg-secondary text-secondary-foreground")}
                onClick={() => setActiveTab(item.id)}
              >
                <item.icon className="h-5 w-5" />
                <span className="sr-only">{item.label}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">{item.label}</TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  )
}
