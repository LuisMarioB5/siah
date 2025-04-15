"use client"

import { useState } from "react"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { MainDashboard } from "@/components/main-dashboard"
import { AssignmentScreen } from "@/components/assignment-screen"
import { SubstitutionScreen } from "@/components/substitution-screen"
import { HistoryScreen } from "@/components/history-screen"
import { SiteHeader } from "@/components/site-header"
import { SidebarNav } from "@/components/sidebar-nav"
import { AssignmentPreview } from "@/components/assignment-preview"

export function DashboardPage() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="flex-1 flex">
        <SidebarNav activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 p-6 md:p-8 pt-6 overflow-auto">
          <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsContent value="dashboard" className="space-y-6">
              <MainDashboard onNavigate={setActiveTab} />
            </TabsContent>
            <TabsContent value="assignment" className="space-y-6">
              <AssignmentScreen onPreview={() => setActiveTab("preview")} />
            </TabsContent>
            <TabsContent value="preview" className="space-y-6">
              <AssignmentPreview onBack={() => setActiveTab("assignment")} />
            </TabsContent>
            <TabsContent value="substitution" className="space-y-6">
              <SubstitutionScreen />
            </TabsContent>
            <TabsContent value="history" className="space-y-6">
              <HistoryScreen />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
