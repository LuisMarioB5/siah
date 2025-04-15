"use client"

import { useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BasicInfo } from "@/components/assignment/basic-info"
import { ScheduleConfig } from "@/components/assignment/schedule-config"
import { AssignmentCriteria } from "@/components/assignment/assignment-criteria"
import { AssignmentPreview } from "@/components/assignment/assignment-preview"
import { useAsignacion } from "@/context/asignacion-context"

export function AssignmentScreen() {
  const { updateAsignacion } = useAsignacion();
  const getDatosBasicos = useRef<() => any>(null);
  const getDatosHorarios = useRef<() => any>(null);
  const getDatosCriterios = useRef<() => any>(null);

  const [activeTab, setActiveTab] = useState("basic")
  const [showPreview, setShowPreview] = useState(false)

  const handleGeneratePreview = () => {
    const datosPaso1 = getDatosBasicos.current?.()
    const datosPaso2 = getDatosHorarios.current?.()
    const datosPaso3 = getDatosCriterios.current?.()
  
    const datosCompletos = {
      ...datosPaso1,
      bloques: {...datosPaso2},
      criterios: {...datosPaso3}
    }
  
    console.log("📦 Enviando al backend:", datosCompletos)
    // axios.post("/api/generar-horario", datosCompletos)
    
    setShowPreview(true)
  }

  const handleBackToConfig = () => {
    setShowPreview(false)
  }

  if (showPreview) {
    return <AssignmentPreview onBack={handleBackToConfig} />
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Asignación Inteligente</h1>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Configuración de Asignación</CardTitle>
          <CardDescription>
            Configure los parámetros para la asignación automática de docentes a materias y horarios
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basic" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Información Básica</TabsTrigger>
              <TabsTrigger value="schedule">Horarios</TabsTrigger>
              <TabsTrigger value="criteria">Criterios</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-6 pt-4">
              <BasicInfo getDatosRef={getDatosBasicos} />
            </TabsContent>

            <TabsContent value="schedule" className="space-y-6 pt-4">
              <ScheduleConfig getDatosRef={getDatosHorarios}/>
            </TabsContent>

            <TabsContent value="criteria" className="space-y-6 pt-4">
              <AssignmentCriteria getDatosRef={getDatosCriterios}/>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" style={{visibility: 'hidden'}}>Cancelar</Button>
          <div className="flex gap-2">
            {activeTab !== "basic" && (
              <Button variant="outline" onClick={() => setActiveTab(activeTab === "schedule" ? "basic" : "schedule")}>
                Anterior
              </Button>
            )}
            {activeTab !== "criteria" ? (
              <Button onClick={() => {
                setActiveTab(activeTab === "basic" ? "schedule" : "criteria");

              }}>Siguiente</Button>
            ) : (
              <Button onClick={handleGeneratePreview} className="bg-green-600 hover:bg-green-700">
                Generar Vista Previa
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
