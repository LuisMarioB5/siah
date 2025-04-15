"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Calendar, CalendarIcon, Download, Info, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { MultiSelect } from "@/components/ui/multi-select"

export function HistoryScreen() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDecision, setSelectedDecision] = useState<any>(null)
  const [date, setDate] = useState<Date>()
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedStatus, setSelectedStatus] = useState<string[]>([])

  const historyItems = [
    {
      id: 1,
      date: "10/04/2024",
      type: "Sustitución",
      absentTeacher: "María López",
      substituteTeacher: "Roberto Díaz",
      subject: "Matemáticas",
      course: "1B",
      status: "Aprobada",
      reason: "Salud",
      criteria: [
        "Roberto Díaz tiene experiencia previa en la materia de Matemáticas (5 años)",
        "Disponibilidad completa en el horario requerido (30/30 pts)",
        "95% de compatibilidad con los criterios de asignación",
        "Conocimiento previo del curso 1B (15/15 pts)",
        "Menor carga horaria que otros candidatos (10/10 pts)",
        "Puntuación total: 92/100 pts",
      ],
      alternatives: [
        { name: "Elena Gómez", points: 87, reason: "Menor disponibilidad horaria (20/30 pts)" },
        { name: "Miguel Torres", points: 82, reason: "Menor experiencia en la materia (15/25 pts)" },
      ],
    },
    {
      id: 2,
      date: "12/04/2024",
      type: "Sustitución",
      absentTeacher: "Juan Pérez",
      substituteTeacher: "Elena Gómez",
      subject: "Historia",
      course: "2B",
      status: "Aprobada",
      reason: "Personal",
      criteria: [
        "Elena Gómez tiene formación académica en Historia (20/20 pts)",
        "Disponibilidad en horario de mañana (25/30 pts)",
        "87% de compatibilidad con los criterios de asignación",
        "Experiencia previa con el curso 2B (15/15 pts)",
        "Recomendación del departamento académico (10/10 pts)",
        "Puntuación total: 87/100 pts",
      ],
      alternatives: [
        { name: "Roberto Díaz", points: 75, reason: "Menor especialización en Historia (10/20 pts)" },
        { name: "Lucía Fernández", points: 72, reason: "Conflicto de horario parcial (15/30 pts)" },
      ],
    },
    {
      id: 3,
      date: "15/04/2024",
      type: "Sustitución",
      absentTeacher: "Pedro Sánchez",
      substituteTeacher: "Miguel Torres",
      subject: "Física",
      course: "3A",
      status: "Aprobada",
      reason: "Capacitación",
      criteria: [
        "Miguel Torres es especialista en Física (20/20 pts)",
        "Disponibilidad completa en el horario requerido (30/30 pts)",
        "82% de compatibilidad con los criterios de asignación",
        "Menor distancia de desplazamiento entre aulas (15/15 pts)",
        "Continuidad pedagógica con el temario actual (10/10 pts)",
        "Puntuación total: 82/100 pts",
      ],
      alternatives: [
        { name: "Lucía Fernández", points: 78, reason: "Disponibilidad parcial (20/30 pts)" },
        { name: "Roberto Díaz", points: 75, reason: "Menor experiencia con el curso 3A (10/15 pts)" },
      ],
    },
    {
      id: 4,
      date: "05/04/2024",
      type: "Asignación",
      absentTeacher: "-",
      substituteTeacher: "Laura Martínez",
      subject: "Inglés",
      course: "1A",
      status: "Aprobada",
      reason: "Nueva asignación",
      criteria: [
        "Laura Martínez es especialista en Inglés con certificación internacional (20/20 pts)",
        "Disponibilidad completa para el horario asignado (30/30 pts)",
        "Experiencia previa con alumnos de primer año (15/15 pts)",
        "Asignación optimizada para minimizar desplazamientos (15/15 pts)",
        "Balanceo de carga horaria entre docentes del departamento (10/10 pts)",
        "Puntuación total: 90/100 pts",
      ],
      alternatives: [
        { name: "Elena Gómez", points: 75, reason: "Menor especialización en Inglés (10/20 pts)" },
        { name: "Carlos Ruiz", points: 70, reason: "Mayor carga horaria actual (5/10 pts)" },
      ],
    },
    {
      id: 5,
      date: "03/04/2024",
      type: "Sustitución",
      absentTeacher: "Ana García",
      substituteTeacher: "Carlos Ruiz",
      subject: "Ciencias",
      course: "2A",
      status: "Rechazada",
      reason: "Incompatibilidad horaria",
      criteria: [
        "Carlos Ruiz tenía un conflicto de horario con otra clase (0/30 pts)",
        "No se encontraron otros docentes disponibles con la especialidad requerida",
        "Se reprogramó la clase para la semana siguiente",
        "Decisión tomada por el director académico",
        "Puntuación total: 45/100 pts (por debajo del umbral mínimo de 70 pts)",
      ],
      alternatives: [],
    },
    {
      id: 6,
      date: "01/04/2024",
      type: "Asignación",
      absentTeacher: "-",
      substituteTeacher: "Pedro Sánchez",
      subject: "Física",
      course: "2B",
      status: "Reasignada",
      reason: "Cambio de horario",
      criteria: [
        "Cambio en la disponibilidad de aulas (25/25 pts para aula C306)",
        "Optimización del horario para reducir horas libres (15/15 pts)",
        "Mejor distribución de la carga académica (10/10 pts)",
        "Solicitud del departamento de Ciencias (10/10 pts)",
        "Aprobado por la dirección académica",
        "Puntuación total: 85/100 pts",
      ],
      alternatives: [
        { name: "Miguel Torres", points: 80, reason: "Menor experiencia docente (20/25 pts)" },
        { name: "Roberto Díaz", points: 78, reason: "Mayor distancia entre aulas (10/15 pts)" },
      ],
    },
  ]

  const filteredItems = historyItems.filter((item) => {
    const matchesSearch =
      searchTerm === "" ||
      item.absentTeacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.substituteTeacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.course.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(item.type.toLowerCase())
    const matchesStatus = selectedStatus.length === 0 || selectedStatus.includes(item.status.toLowerCase())

    return matchesSearch && matchesType && matchesStatus
  })

  const handleViewDecision = (item: any) => {
    setSelectedDecision(item)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Historial de Decisiones</h1>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Registro Histórico</CardTitle>
          <CardDescription>Historial detallado de todas las asignaciones y sustituciones realizadas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por docente, materia o curso..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <MultiSelect
                options={[
                  { value: "sustitución", label: "Sustitución" },
                  { value: "asignación", label: "Asignación" },
                ]}
                selected={selectedTypes}
                onChange={setSelectedTypes}
                placeholder="Tipo"
                className="min-w-[150px]"
              />

              <MultiSelect
                options={[
                  { value: "aprobada", label: "Aprobada" },
                  { value: "rechazada", label: "Rechazada" },
                  { value: "reasignada", label: "Reasignada" },
                ]}
                selected={selectedStatus}
                onChange={setSelectedStatus}
                placeholder="Estado"
                className="min-w-[150px]"
              />

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[180px] justify-start">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP", { locale: es }) : <span>Fecha</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>

              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Exportar
              </Button>
            </div>
          </div>

          <div className="rounded-md border overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Docente Ausente</TableHead>
                  <TableHead>Docente Asignado</TableHead>
                  <TableHead>Materia</TableHead>
                  <TableHead>Curso</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>{item.absentTeacher}</TableCell>
                    <TableCell>{item.substituteTeacher}</TableCell>
                    <TableCell>{item.subject}</TableCell>
                    <TableCell>{item.course}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={cn(
                          "bg-opacity-20 border-opacity-30",
                          item.status === "Aprobada"
                            ? "bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-100 dark:border-green-800"
                            : item.status === "Rechazada"
                              ? "bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-100 dark:border-red-800"
                              : "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900 dark:text-amber-100 dark:border-amber-800",
                        )}
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => handleViewDecision(item)}>
                            <Info className="h-4 w-4 mr-1" />
                            Detalles
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                          <DialogHeader>
                            <DialogTitle>Detalles de la Decisión</DialogTitle>
                            <DialogDescription>
                              {item.type} del {item.date}
                            </DialogDescription>
                          </DialogHeader>

                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div className="font-medium">Tipo:</div>
                              <div>{item.type}</div>

                              <div className="font-medium">Fecha:</div>
                              <div>{item.date}</div>

                              <div className="font-medium">Docente Ausente:</div>
                              <div>{item.absentTeacher}</div>

                              <div className="font-medium">Docente Asignado:</div>
                              <div>{item.substituteTeacher}</div>

                              <div className="font-medium">Materia:</div>
                              <div>{item.subject}</div>

                              <div className="font-medium">Curso:</div>
                              <div>{item.course}</div>

                              <div className="font-medium">Estado:</div>
                              <div>
                                <Badge
                                  variant="outline"
                                  className={cn(
                                    "bg-opacity-20 border-opacity-30",
                                    item.status === "Aprobada"
                                      ? "bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-100 dark:border-green-800"
                                      : item.status === "Rechazada"
                                        ? "bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-100 dark:border-red-800"
                                        : "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900 dark:text-amber-100 dark:border-amber-800",
                                  )}
                                >
                                  {item.status}
                                </Badge>
                              </div>

                              <div className="font-medium">Motivo:</div>
                              <div>{item.reason}</div>
                            </div>

                            <div className="space-y-2 mt-2">
                              <h4 className="font-medium text-sm">Criterios de Decisión:</h4>
                              <div className="bg-muted/50 p-3 rounded-md text-sm">
                                <ul className="list-disc pl-5 space-y-1">
                                  {item.criteria.map((criterion, index) => (
                                    <li key={index}>{criterion}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            {item.alternatives.length > 0 && (
                              <div className="space-y-2">
                                <h4 className="font-medium text-sm">Alternativas Consideradas:</h4>
                                <div className="space-y-2">
                                  {item.alternatives.map((alt, index) => (
                                    <div
                                      key={index}
                                      className="flex justify-between items-center p-2 border rounded-md"
                                    >
                                      <div>
                                        <span className="font-medium">{alt.name}</span>
                                        <div className="text-xs text-muted-foreground">{alt.reason}</div>
                                      </div>
                                      <Badge variant="outline">{alt.points} pts</Badge>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
