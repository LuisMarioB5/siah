"use client"

import { useState } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { AppLayout } from "@/components/app-layout"
import { Dashboard } from "@/components/dashboard/dashboard"
import { AssignmentScreen } from "@/components/assignment/assignment-screen"
import { SubstitutionScreen } from "@/components/substitution/substitution-screen"
import { HistoryScreen } from "@/components/history/history-screen"
import { AsignacionProvider } from "@/context/asignacion-context"

export function SIASHApp() {
  const [activeScreen, setActiveScreen] = useState("assignment")

  const renderScreen = () => {
    switch (activeScreen) {
      case "dashboard":
        return <Dashboard />
      case "assignment":
        return <AssignmentScreen />
      case "substitution":
        return <SubstitutionScreen />
      case "history":
        return <HistoryScreen />
      default:
        return <Dashboard />
    }
  }

  return (
    <ThemeProvider defaultTheme="light" storageKey="siash-theme">
      <AsignacionProvider>
        <AppLayout activeScreen={activeScreen} onScreenChange={setActiveScreen}>
          {renderScreen()}
        </AppLayout>
      </AsignacionProvider>
    </ThemeProvider>
  )
}
