"use client"

import type React from "react"

import { useState } from "react"
import {
  BarChart3,
  Calendar,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Home,
  LogOut,
  Menu,
  Moon,
  Settings,
  Sun,
  UserCheck,
  X,
} from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface AppLayoutProps {
  children: React.ReactNode
  activeScreen: string
  onScreenChange: (screen: string) => void
}

export function AppLayout({ children, activeScreen, onScreenChange }: AppLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { setTheme, theme } = useTheme()

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
      icon: BarChart3,
    },
  ]

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar for desktop */}
      <aside
        className={cn(
          "hidden md:flex flex-col border-r transition-all duration-300 ease-in-out bg-card",
          sidebarCollapsed ? "w-[70px]" : "w-[240px]",
        )}
      >
        <div className="flex items-center h-16 px-4 border-b">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 text-white"
                >
                  <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
                </svg>
              </div>
              <div className="font-semibold text-lg">SIASH</div>
            </div>
          )}
          {sidebarCollapsed && (
            <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 text-white"
              >
                <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
              </svg>
            </div>
          </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
        <nav className="flex-1 py-4">
          <TooltipProvider delayDuration={0}>
            <ul className="space-y-1 px-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={activeScreen === item.id ? "secondary" : "ghost"}
                        className={cn("w-full justify-start", sidebarCollapsed && "justify-center px-0")}
                        onClick={() => onScreenChange(item.id)}
                      >
                        <item.icon className={cn("h-5 w-5", !sidebarCollapsed && "mr-2")} />
                        {!sidebarCollapsed && <span>{item.label}</span>}
                      </Button>
                    </TooltipTrigger>
                    {sidebarCollapsed && <TooltipContent side="right">{item.label}</TooltipContent>}
                  </Tooltip>
                </li>
              ))}
            </ul>
          </TooltipProvider>
        </nav>
        <div className="p-4 border-t">
          {!sidebarCollapsed ? (
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32&text=JD" alt="@director" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Juan Domínguez</p>
                <p className="text-xs text-muted-foreground truncate">Director</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Settings className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Configuración</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                    {theme === "dark" ? (
                      <>
                        <Sun className="mr-2 h-4 w-4" />
                        <span>Tema claro</span>
                      </>
                    ) : (
                      <>
                        <Moon className="mr-2 h-4 w-4" />
                        <span>Tema oscuro</span>
                      </>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Cerrar sesión</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32&text=JD" alt="@director" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Settings className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Configuración</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                    {theme === "dark" ? (
                      <>
                        <Sun className="mr-2 h-4 w-4" />
                        <span>Tema claro</span>
                      </>
                    ) : (
                      <>
                        <Moon className="mr-2 h-4 w-4" />
                        <span>Tema oscuro</span>
                      </>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Cerrar sesión</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden transition-opacity",
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
      >
        <div className="fixed inset-y-0 left-0 w-3/4 max-w-xs bg-card shadow-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 text-white"
                >
                  <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
                </svg>
              </div>
              <div className="font-semibold text-lg">SIASH</div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Button
                    variant={activeScreen === item.id ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => {
                      onScreenChange(item.id)
                      setMobileMenuOpen(false)
                    }}
                  >
                    <item.icon className="h-5 w-5 mr-2" />
                    <span>{item.label}</span>
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32&text=JD" alt="@director" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Juan Domínguez</p>
                <p className="text-xs text-muted-foreground truncate">Director</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="h-16 border-b flex items-center px-4 gap-4">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <div className="md:hidden flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 text-white"
              >
                <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
              </svg>
            </div>
            <div className="font-semibold text-lg">SIASH</div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <HelpCircle className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32&text=JD" alt="@director" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Configuración</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Cerrar sesión</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
