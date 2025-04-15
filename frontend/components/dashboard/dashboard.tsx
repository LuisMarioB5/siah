"use client"

import { useState } from "react"
import { AlertCircle, BookOpen, Calendar, Download, GraduationCap, Search, UserCheck, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { CurrentSchedule } from "@/components/dashboard/current-schedule"
import { MultiSelect } from "@/components/ui/multi-select"

export function Dashboard() {
  const [viewType, setViewType] = useState("week")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCourses, setSelectedCourses] = useState<string[]>([])
  const [selectedTeachers, setSelectedTeachers] = useState<string[]>([])
  const [selectedDays, setSelectedDays] = useState<string[]>([])

  const courses = [
    { value: "1A", label: "1° A" },
    { value: "1B", label: "1° B" },
    { value: "2A", label: "2° A" },
    { value: "2B", label: "2° B" },
    { value: "3A", label: "3° A" },
    { value: "3B", label: "3° B" },
  ]

  const teachers = [
    { value: "maria-lopez", label: "María López" },
    { value: "juan-perez", label: "Juan Pérez" },
    { value: "ana-garcia", label: "Ana García" },
    { value: "carlos-ruiz", label: "Carlos Ruiz" },
    { value: "laura-martinez", label: "Laura Martínez" },
    { value: "pedro-sanchez", label: "Pedro Sánchez" },
    { value: "elena-gomez", label: "Elena Gómez" },
    { value: "roberto-diaz", label: "Roberto Díaz" },
    { value: "miguel-torres", label: "Miguel Torres" },
    { value: "lucia-fernandez", label: "Lucía Fernández" },
  ]

  const days = [
    { value: "lunes", label: "Lunes" },
    { value: "martes", label: "Martes" },
    { value: "miercoles", label: "Miércoles" },
    { value: "jueves", label: "Jueves" },
    { value: "viernes", label: "Viernes" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex gap-2">
          <Button className="bg-green-600 hover:bg-green-700">
            <Calendar className="mr-2 h-4 w-4" />
            Nueva Asignación
          </Button>
          <Button variant="outline">
            <UserCheck className="mr-2 h-4 w-4" />
            Nueva Sustitución
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cursos Activos</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">3 niveles educativos</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Docentes Asignados</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">92% con horario completo</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Asignaturas</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">100% asignadas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sustituciones Recientes</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">En los últimos 7 días</p>
          </CardContent>
        </Card>
      </div>

      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Atención requerida</AlertTitle>
        <AlertDescription>
          Hay 3 docentes que han reportado ausencias para esta semana. Se requiere asignar sustitutos.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>Horario Actual</CardTitle>
              <CardDescription>Vista general del horario de clases para la semana actual</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por materia, docente o aula..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <MultiSelect
                options={courses}
                selected={selectedCourses}
                onChange={setSelectedCourses}
                placeholder="Filtrar por curso"
                className="min-w-[200px]"
              />
              <MultiSelect
                options={teachers}
                selected={selectedTeachers}
                onChange={setSelectedTeachers}
                placeholder="Filtrar por docente"
                className="min-w-[200px]"
              />
              <MultiSelect
                options={days}
                selected={selectedDays}
                onChange={setSelectedDays}
                placeholder="Filtrar por día"
                className="min-w-[200px]"
              />
            </div>
          </div>

          <Tabs defaultValue="week" value={viewType} onValueChange={setViewType} className="space-y-4">
            <TabsList>
              <TabsTrigger value="week">Vista Semanal</TabsTrigger>
              <TabsTrigger value="day">Vista Diaria</TabsTrigger>
            </TabsList>
            <TabsContent value="week">
              <CurrentSchedule
                viewType="week"
                searchQuery={searchQuery}
                selectedCourses={selectedCourses}
                selectedTeachers={selectedTeachers}
                selectedDays={selectedDays}
              />
            </TabsContent>
            <TabsContent value="day">
              <CurrentSchedule
                viewType="day"
                searchQuery={searchQuery}
                selectedCourses={selectedCourses}
                selectedTeachers={selectedTeachers}
                selectedDays={selectedDays}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Exportar horario
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
