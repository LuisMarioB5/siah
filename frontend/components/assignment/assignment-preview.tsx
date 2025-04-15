"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, CheckCircle, Edit, Info } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AssignmentPreviewProps {
  onBack: () => void
}

export function AssignmentPreview({ onBack }: AssignmentPreviewProps) {
  const [editMode, setEditMode] = useState(false)
  const [selectedCell, setSelectedCell] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("schedule")

  const hours = [
    "7:30 - 8:20",
    "8:20 - 9:10",
    "9:10 - 10:00",
    "10:00 - 10:30",
    "10:30 - 11:20",
    "11:20 - 12:10",
    "12:10 - 13:00",
  ]
  const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"]

  // Sample data for the schedule
  const schedule = {
    Lunes: {
      "7:30 - 8:20": {
        teacher: "María López",
        subject: "Matemáticas",
        room: "A101",
        course: "1A",
        isNew: true,
        points: 92,
      },
      "8:20 - 9:10": {
        teacher: "María López",
        subject: "Matemáticas",
        room: "A101",
        course: "1A",
        isNew: true,
        points: 92,
      },
      "9:10 - 10:00": {
        teacher: "Carlos Ruiz",
        subject: "Literatura",
        room: "A102",
        course: "1A",
        isNew: true,
        points: 88,
      },
      "10:00 - 10:30": { isBreak: true, name: "RECESO" },
      "10:30 - 11:20": {
        teacher: "Ana García",
        subject: "Ciencias",
        room: "C305",
        course: "1A",
        isNew: true,
        points: 85,
      },
      "11:20 - 12:10": {
        teacher: "Laura Martínez",
        subject: "Inglés",
        room: "B204",
        course: "1A",
        isNew: true,
        points: 90,
      },
      "12:10 - 13:00": {
        teacher: "Juan Pérez",
        subject: "Historia",
        room: "B203",
        course: "1A",
        isNew: true,
        points: 87,
      },
    },
    Martes: {
      "7:30 - 8:20": {
        teacher: "Pedro Sánchez",
        subject: "Física",
        room: "C306",
        course: "1A",
        isNew: true,
        points: 89,
      },
      "8:20 - 9:10": {
        teacher: "Pedro Sánchez",
        subject: "Física",
        room: "C306",
        course: "1A",
        isNew: true,
        points: 89,
      },
      "9:10 - 10:00": {
        teacher: "Ana García",
        subject: "Ciencias",
        room: "C305",
        course: "1A",
        isNew: true,
        points: 85,
      },
      "10:00 - 10:30": { isBreak: true, name: "RECESO" },
      "10:30 - 11:20": {
        teacher: "Juan Pérez",
        subject: "Historia",
        room: "B203",
        course: "1A",
        isNew: true,
        points: 87,
      },
      "11:20 - 12:10": {
        teacher: "Carlos Ruiz",
        subject: "Literatura",
        room: "A102",
        course: "1A",
        isNew: true,
        points: 88,
      },
      "12:10 - 13:00": {
        teacher: "María López",
        subject: "Matemáticas",
        room: "A101",
        course: "1A",
        isNew: true,
        points: 92,
      },
    },
    Miércoles: {
      "7:30 - 8:20": {
        teacher: "Laura Martínez",
        subject: "Inglés",
        room: "B204",
        course: "1A",
        isNew: true,
        points: 90,
      },
      "8:20 - 9:10": {
        teacher: "Laura Martínez",
        subject: "Inglés",
        room: "B204",
        course: "1A",
        isNew: true,
        points: 90,
      },
      "9:10 - 10:00": {
        teacher: "Juan Pérez",
        subject: "Historia",
        room: "B203",
        course: "1A",
        isNew: true,
        points: 87,
      },
      "10:00 - 10:30": { isBreak: true, name: "RECESO" },
      "10:30 - 11:20": {
        teacher: "María López",
        subject: "Matemáticas",
        room: "A101",
        course: "1A",
        isNew: true,
        points: 92,
      },
      "11:20 - 12:10": {
        teacher: "Ana García",
        subject: "Ciencias",
        room: "C305",
        course: "1A",
        isNew: true,
        points: 85,
      },
      "12:10 - 13:00": {
        teacher: "Pedro Sánchez",
        subject: "Física",
        room: "C306",
        course: "1A",
        isNew: true,
        points: 89,
      },
    },
    Jueves: {
      "7:30 - 8:20": {
        teacher: "Carlos Ruiz",
        subject: "Literatura",
        room: "A102",
        course: "1A",
        isNew: true,
        points: 88,
      },
      "8:20 - 9:10": {
        teacher: "Carlos Ruiz",
        subject: "Literatura",
        room: "A102",
        course: "1A",
        isNew: true,
        points: 88,
      },
      "9:10 - 10:00": {
        teacher: "María López",
        subject: "Matemáticas",
        room: "A101",
        course: "1A",
        isNew: true,
        points: 92,
      },
      "10:00 - 10:30": { isBreak: true, name: "RECESO" },
      "10:30 - 11:20": {
        teacher: "Pedro Sánchez",
        subject: "Física",
        room: "C306",
        course: "1A",
        isNew: true,
        points: 89,
      },
      "11:20 - 12:10": {
        teacher: "Juan Pérez",
        subject: "Historia",
        room: "B203",
        course: "1A",
        isNew: true,
        points: 87,
      },
      "12:10 - 13:00": {
        teacher: "Laura Martínez",
        subject: "Inglés",
        room: "B204",
        course: "1A",
        isNew: true,
        points: 90,
      },
    },
    Viernes: {
      "7:30 - 8:20": {
        teacher: "Ana García",
        subject: "Ciencias",
        room: "C305",
        course: "1A",
        isNew: true,
        points: 85,
      },
      "8:20 - 9:10": {
        teacher: "Ana García",
        subject: "Ciencias",
        room: "C305",
        course: "1A",
        isNew: true,
        points: 85,
      },
      "9:10 - 10:00": {
        teacher: "Pedro Sánchez",
        subject: "Física",
        room: "C306",
        course: "1A",
        isNew: true,
        points: 89,
      },
      "10:00 - 10:30": { isBreak: true, name: "RECESO" },
      "10:30 - 11:20": {
        teacher: "Laura Martínez",
        subject: "Inglés",
        room: "B204",
        course: "1A",
        isNew: true,
        points: 90,
      },
      "11:20 - 12:10": {
        teacher: "María López",
        subject: "Matemáticas",
        room: "A101",
        course: "1A",
        isNew: true,
        points: 92,
      },
      "12:10 - 13:00": {
        teacher: "Carlos Ruiz",
        subject: "Literatura",
        room: "A102",
        course: "1A",
        isNew: true,
        points: 88,
      },
    },
  }

  const handleEditCell = (day: string, hour: string) => {
    const cell = schedule[day][hour]
    if (!cell.isBreak) {
      setSelectedCell({
        day,
        hour,
        ...cell,
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Vista Previa de Asignación</h1>
      </div>

      <Card className="w-full">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" onClick={onBack} className="mr-2">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Volver
              </Button>
              <div>
                <CardTitle>Horario Generado</CardTitle>
                <CardDescription>Horario generado para el curso 1° A</CardDescription>
              </div>
            </div>
            <Button variant={editMode ? "default" : "outline"} size="sm" onClick={() => setEditMode(!editMode)}>
              <Edit className="mr-2 h-4 w-4" />
              {editMode ? "Editando" : "Editar Manualmente"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="schedule" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="schedule">Horario</TabsTrigger>
              <TabsTrigger value="details">Detalles de Asignación</TabsTrigger>
            </TabsList>

            <TabsContent value="schedule" className="space-y-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
                  <span className="text-sm">Asignación nueva</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-amber-100 border border-amber-300 rounded"></div>
                  <span className="text-sm">Editado manualmente</span>
                </div>
              </div>

              <div className="rounded-md border overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Hora</TableHead>
                      {days.map((day) => (
                        <TableHead key={day}>{day}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {hours.map((hour) => (
                      <TableRow key={hour}>
                        <TableCell className="font-medium">{hour}</TableCell>
                        {days.map((day) => {
                          const cell = schedule[day][hour]

                          // Check if this is a break period
                          if (cell.isBreak) {
                            return (
                              <TableCell
                                key={`${day}-${hour}`}
                                className="bg-muted/50 text-center font-medium"
                                colSpan={days.length}
                              >
                                {cell.name}
                              </TableCell>
                            )
                          }

                          return (
                            <TableCell
                              key={`${day}-${hour}`}
                              className={cn(
                                "p-2 cursor-pointer transition-colors",
                                cell.isNew && !cell.edited ? "bg-green-50 dark:bg-green-950/30" : "",
                                cell.edited ? "bg-amber-50 dark:bg-amber-950/30" : "",
                                editMode ? "hover:bg-muted" : "",
                              )}
                              onClick={() => editMode && handleEditCell(day, hour)}
                            >
                              <div className="font-medium">{cell.subject}</div>
                              <div className="text-sm text-muted-foreground">{cell.teacher}</div>
                              <div className="flex justify-between">
                                <div className="text-xs text-muted-foreground">Aula: {cell.room}</div>
                                <Badge variant="outline" className="text-xs">
                                  {cell.points} pts
                                </Badge>
                              </div>
                            </TableCell>
                          )
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="details" className="space-y-4">
              <div className="p-4 border rounded-md bg-muted/50">
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">Sistema de Puntos Aplicado</h3>
                    <p className="text-sm mb-3">
                      El sistema ha utilizado los siguientes criterios para asignar docentes y aulas:
                    </p>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-1">Criterios para Docentes:</h4>
                        <ul className="space-y-1 text-sm list-disc pl-5">
                          <li>Antigüedad Docente: 70% (25 puntos máx)</li>
                          <li>Disponibilidad: 90% (30 puntos máx)</li>
                          <li>Experiencia en la Materia: 80% (25 puntos máx)</li>
                          <li>Especialidad: 85% (20 puntos máx)</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-1">Criterios para Aulas:</h4>
                        <ul className="space-y-1 text-sm list-disc pl-5">
                          <li>Capacidad: 75% (20 puntos máx)</li>
                          <li>Equipamiento: 85% (25 puntos máx)</li>
                          <li>Ubicación: 60% (15 puntos máx)</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-1">Bonificaciones Aplicadas:</h4>
                        <ul className="space-y-1 text-sm list-disc pl-5">
                          <li>Balanceo de carga horaria: +10 puntos</li>
                          <li>Minimización de desplazamientos: +15 puntos</li>
                          <li>Horas consecutivas para misma materia: +10 puntos</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Mejores Asignaciones</CardTitle>
                    <CardDescription>Docentes con mayor puntuación</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 bg-green-50 dark:bg-green-950/30 rounded-md">
                        <div>
                          <div className="font-medium">María López</div>
                          <div className="text-sm text-muted-foreground">Matemáticas</div>
                        </div>
                        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                          92 pts
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-green-50 dark:bg-green-950/30 rounded-md">
                        <div>
                          <div className="font-medium">Laura Martínez</div>
                          <div className="text-sm text-muted-foreground">Inglés</div>
                        </div>
                        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                          90 pts
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-green-50 dark:bg-green-950/30 rounded-md">
                        <div>
                          <div className="font-medium">Pedro Sánchez</div>
                          <div className="text-sm text-muted-foreground">Física</div>
                        </div>
                        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                          89 pts
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Estadísticas de Asignación</CardTitle>
                    <CardDescription>Resumen del proceso</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Asignaciones realizadas:</span>
                        <span className="font-medium">30</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Puntuación promedio:</span>
                        <span className="font-medium">88.5 pts</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Docentes asignados:</span>
                        <span className="font-medium">6</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Aulas utilizadas:</span>
                        <span className="font-medium">6</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Conflictos resueltos:</span>
                        <span className="font-medium">3</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Edit Dialog */}
          <Dialog open={!!selectedCell} onOpenChange={(open) => !open && setSelectedCell(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Editar Asignación</DialogTitle>
                <DialogDescription>
                  {selectedCell && `${days[days.indexOf(selectedCell.day)]}, ${selectedCell.hour}`}
                </DialogDescription>
              </DialogHeader>

              {selectedCell && (
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Materia</Label>
                    <div className="col-span-3">
                      <Select defaultValue={selectedCell.subject}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar materia" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Matemáticas">Matemáticas</SelectItem>
                          <SelectItem value="Ciencias">Ciencias</SelectItem>
                          <SelectItem value="Historia">Historia</SelectItem>
                          <SelectItem value="Literatura">Literatura</SelectItem>
                          <SelectItem value="Inglés">Inglés</SelectItem>
                          <SelectItem value="Física">Física</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Docente</Label>
                    <div className="col-span-3">
                      <Select defaultValue={selectedCell.teacher}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar docente" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="María López">María López</SelectItem>
                          <SelectItem value="Juan Pérez">Juan Pérez</SelectItem>
                          <SelectItem value="Ana García">Ana García</SelectItem>
                          <SelectItem value="Carlos Ruiz">Carlos Ruiz</SelectItem>
                          <SelectItem value="Laura Martínez">Laura Martínez</SelectItem>
                          <SelectItem value="Pedro Sánchez">Pedro Sánchez</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Aula</Label>
                    <div className="col-span-3">
                      <Select defaultValue={selectedCell.room}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar aula" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A101">A101</SelectItem>
                          <SelectItem value="A102">A102</SelectItem>
                          <SelectItem value="B203">B203</SelectItem>
                          <SelectItem value="B204">B204</SelectItem>
                          <SelectItem value="C305">C305</SelectItem>
                          <SelectItem value="C306">C306</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              <DialogFooter>
                <Button variant="outline" onClick={() => setSelectedCell(null)}>
                  Cancelar
                </Button>
                <Button onClick={() => setSelectedCell(null)}>Guardar Cambios</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onBack}>
            Modificar Parámetros
          </Button>
          <Button className="bg-green-600 hover:bg-green-700">
            <CheckCircle className="mr-2 h-4 w-4" />
            Confirmar Asignación
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
