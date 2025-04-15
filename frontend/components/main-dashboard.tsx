"use client"

import { useState } from "react"
import { AlertCircle, BookOpen, Calendar, Clock, Filter, GraduationCap, UserCheck, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ScheduleTable } from "@/components/schedule-table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface MainDashboardProps {
  onNavigate: (tab: string) => void
}

export function MainDashboard({ onNavigate }: MainDashboardProps) {
  const [courseFilter, setCourseFilter] = useState("all")
  const [teacherFilter, setTeacherFilter] = useState("all")
  const [dayFilter, setDayFilter] = useState("all")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex gap-2">
          <Button className="bg-green-600 hover:bg-green-700" onClick={() => onNavigate("assignment")}>
            <Calendar className="mr-2 h-4 w-4" />
            Nueva Asignación
          </Button>
          <Button variant="outline" onClick={() => onNavigate("substitution")}>
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
        <CardHeader className="space-y-0">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>Horario Actual</CardTitle>
              <CardDescription>Vista general del horario de clases para la semana actual</CardDescription>
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <Select value={courseFilter} onValueChange={setCourseFilter}>
                <SelectTrigger className="w-[160px]">
                  <Filter className="mr-2 h-3 w-3" />
                  <SelectValue placeholder="Filtrar por curso" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los cursos</SelectItem>
                  <SelectItem value="1A">1° A</SelectItem>
                  <SelectItem value="1B">1° B</SelectItem>
                  <SelectItem value="2A">2° A</SelectItem>
                  <SelectItem value="2B">2° B</SelectItem>
                  <SelectItem value="3A">3° A</SelectItem>
                  <SelectItem value="3B">3° B</SelectItem>
                </SelectContent>
              </Select>

              <Select value={teacherFilter} onValueChange={setTeacherFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-3 w-3" />
                  <SelectValue placeholder="Filtrar por docente" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los docentes</SelectItem>
                  <SelectItem value="maria">María López</SelectItem>
                  <SelectItem value="juan">Juan Pérez</SelectItem>
                  <SelectItem value="ana">Ana García</SelectItem>
                  <SelectItem value="carlos">Carlos Ruiz</SelectItem>
                  <SelectItem value="laura">Laura Martínez</SelectItem>
                </SelectContent>
              </Select>

              <Select value={dayFilter} onValueChange={setDayFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-3 w-3" />
                  <SelectValue placeholder="Filtrar por día" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los días</SelectItem>
                  <SelectItem value="lunes">Lunes</SelectItem>
                  <SelectItem value="martes">Martes</SelectItem>
                  <SelectItem value="miercoles">Miércoles</SelectItem>
                  <SelectItem value="jueves">Jueves</SelectItem>
                  <SelectItem value="viernes">Viernes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="week" className="space-y-4">
            <TabsList>
              <TabsTrigger value="week">Vista Semanal</TabsTrigger>
              <TabsTrigger value="day">Vista Diaria</TabsTrigger>
            </TabsList>
            <TabsContent value="week">
              <ScheduleTable courseFilter={courseFilter} teacherFilter={teacherFilter} dayFilter={dayFilter} />
            </TabsContent>
            <TabsContent value="day">
              <ScheduleTable
                courseFilter={courseFilter}
                teacherFilter={teacherFilter}
                dayFilter={dayFilter}
                viewType="day"
              />
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button variant="outline" size="sm">
            <Clock className="mr-2 h-4 w-4" />
            Ver horario completo
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
