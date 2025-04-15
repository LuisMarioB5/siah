"use client"

import { Textarea } from "@/components/ui/textarea"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { HelpCircle, Info, Plus, Trash } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface AssignmentScreenProps {
  onPreview: () => void
}

export function AssignmentScreen({ onPreview }: AssignmentScreenProps) {
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
  const [selectedDays, setSelectedDays] = useState<string[]>([])
  const [timeBlocks, setTimeBlocks] = useState([
    { id: 1, type: "class", startTime: "07:30", endTime: "08:20", label: "Bloque 1" },
    { id: 2, type: "class", startTime: "08:20", endTime: "09:10", label: "Bloque 2" },
    { id: 3, type: "class", startTime: "09:10", endTime: "10:00", label: "Bloque 3" },
    { id: 4, type: "break", startTime: "10:00", endTime: "10:30", label: "Receso" },
    { id: 5, type: "class", startTime: "10:30", endTime: "11:20", label: "Bloque 4" },
    { id: 6, type: "class", startTime: "11:20", endTime: "12:10", label: "Bloque 5" },
    { id: 7, type: "class", startTime: "12:10", endTime: "13:00", label: "Bloque 6" },
  ])

  const subjects = [
    "Matemáticas",
    "Ciencias",
    "Historia",
    "Literatura",
    "Inglés",
    "Física",
    "Química",
    "Biología",
    "Educación Física",
    "Arte",
    "Música",
    "Informática",
  ]

  const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"]

  const toggleSubject = (subject: string) => {
    setSelectedSubjects((prev) => (prev.includes(subject) ? prev.filter((s) => s !== subject) : [...prev, subject]))
  }

  const toggleDay = (day: string) => {
    setSelectedDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]))
  }

  const addTimeBlock = () => {
    const newId = timeBlocks.length > 0 ? Math.max(...timeBlocks.map((block) => block.id)) + 1 : 1
    setTimeBlocks([
      ...timeBlocks,
      {
        id: newId,
        type: "class",
        startTime: "13:00",
        endTime: "13:50",
        label: `Bloque ${timeBlocks.filter((b) => b.type === "class").length + 1}`,
      },
    ])
  }

  const removeTimeBlock = (id: number) => {
    setTimeBlocks(timeBlocks.filter((block) => block.id !== id))
  }

  const updateTimeBlock = (id: number, field: string, value: string) => {
    setTimeBlocks(timeBlocks.map((block) => (block.id === id ? { ...block, [field]: value } : block)))
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <CardTitle>Asignación de Horarios</CardTitle>
            <CardDescription>
              Configure los parámetros para la asignación de materias y horarios a cursos
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Información Básica</TabsTrigger>
            <TabsTrigger value="schedule">Horarios</TabsTrigger>
            <TabsTrigger value="criteria">Criterios</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Curso</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar curso" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1A">1° A</SelectItem>
                      <SelectItem value="1B">1° B</SelectItem>
                      <SelectItem value="2A">2° A</SelectItem>
                      <SelectItem value="2B">2° B</SelectItem>
                      <SelectItem value="3A">3° A</SelectItem>
                      <SelectItem value="3B">3° B</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Materias</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-5 w-5">
                            <HelpCircle className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            Seleccione las materias que desea asignar a este curso. Puede seleccionar múltiples
                            materias.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {subjects.map((subject) => (
                      <div key={subject} className="flex items-center space-x-2">
                        <Checkbox
                          id={`subject-${subject}`}
                          checked={selectedSubjects.includes(subject)}
                          onCheckedChange={() => toggleSubject(subject)}
                        />
                        <label
                          htmlFor={`subject-${subject}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {subject}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Días</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-5 w-5">
                            <HelpCircle className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            Seleccione los días en los que se impartirán las materias. Puede seleccionar múltiples días.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {days.map((day) => (
                      <Badge
                        key={day}
                        variant={selectedDays.includes(day) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => toggleDay(day)}
                      >
                        {day}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Aulas Disponibles</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="room-a101" defaultChecked />
                      <label
                        htmlFor="room-a101"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        A101
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="room-a102" defaultChecked />
                      <label
                        htmlFor="room-a102"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        A102
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="room-b203" defaultChecked />
                      <label
                        htmlFor="room-b203"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        B203
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="room-b204" defaultChecked />
                      <label
                        htmlFor="room-b204"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        B204
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="room-c305" defaultChecked />
                      <label
                        htmlFor="room-c305"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        C305
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="room-c306" defaultChecked />
                      <label
                        htmlFor="room-c306"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        C306
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Docentes Disponibles</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="teacher-maria" defaultChecked />
                      <label
                        htmlFor="teacher-maria"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        María López
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="teacher-juan" defaultChecked />
                      <label
                        htmlFor="teacher-juan"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Juan Pérez
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="teacher-ana" defaultChecked />
                      <label
                        htmlFor="teacher-ana"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Ana García
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="teacher-carlos" defaultChecked />
                      <label
                        htmlFor="teacher-carlos"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Carlos Ruiz
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="teacher-laura" defaultChecked />
                      <label
                        htmlFor="teacher-laura"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Laura Martínez
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="teacher-pedro" defaultChecked />
                      <label
                        htmlFor="teacher-pedro"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Pedro Sánchez
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6 pt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-base">Bloques de Tiempo</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Info className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Configure los bloques de tiempo para las clases y recesos. Puede agregar, eliminar y modificar
                        bloques según sea necesario.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div className="space-y-2">
                {timeBlocks.map((block, index) => (
                  <div key={block.id} className="flex items-center gap-2 p-2 border rounded-md">
                    <Select value={block.type} onValueChange={(value) => updateTimeBlock(block.id, "type", value)}>
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="class">Clase</SelectItem>
                        <SelectItem value="break">Receso</SelectItem>
                        <SelectItem value="lunch">Almuerzo</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="grid grid-cols-2 gap-2 flex-1">
                      <div className="flex flex-col">
                        <Label htmlFor={`start-time-${block.id}`} className="text-xs">
                          Inicio
                        </Label>
                        <Input
                          id={`start-time-${block.id}`}
                          type="time"
                          value={block.startTime}
                          onChange={(e) => updateTimeBlock(block.id, "startTime", e.target.value)}
                        />
                      </div>
                      <div className="flex flex-col">
                        <Label htmlFor={`end-time-${block.id}`} className="text-xs">
                          Fin
                        </Label>
                        <Input
                          id={`end-time-${block.id}`}
                          type="time"
                          value={block.endTime}
                          onChange={(e) => updateTimeBlock(block.id, "endTime", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="flex-1">
                      <Input
                        placeholder="Etiqueta"
                        value={block.label}
                        onChange={(e) => updateTimeBlock(block.id, "label", e.target.value)}
                      />
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeTimeBlock(block.id)}
                      disabled={timeBlocks.length <= 1}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ))}

                <Button variant="outline" className="w-full" onClick={addTimeBlock}>
                  <Plus className="mr-2 h-4 w-4" />
                  Agregar Bloque
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="criteria" className="space-y-6 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Criterios de Asignación</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-5 w-5">
                            <HelpCircle className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            Ajuste la importancia de cada criterio para la asignación automática de docentes.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Antigüedad Docente</Label>
                        <span className="text-sm">70%</span>
                      </div>
                      <Slider defaultValue={[70]} max={100} step={10} />
                      <p className="text-xs text-muted-foreground">
                        Prioriza a docentes con mayor antigüedad en la institución.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Disponibilidad</Label>
                        <span className="text-sm">90%</span>
                      </div>
                      <Slider defaultValue={[90]} max={100} step={10} />
                      <p className="text-xs text-muted-foreground">
                        Considera la disponibilidad horaria de los docentes.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Experiencia en la Materia</Label>
                        <span className="text-sm">80%</span>
                      </div>
                      <Slider defaultValue={[80]} max={100} step={10} />
                      <p className="text-xs text-muted-foreground">
                        Prioriza a docentes con más experiencia en la materia específica.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Opciones Avanzadas</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-5 w-5">
                            <HelpCircle className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            Configure opciones adicionales para optimizar la asignación de horarios.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="space-y-2 border rounded-md p-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="balance" defaultChecked />
                      <div>
                        <label htmlFor="balance" className="text-sm font-medium leading-none">
                          Balancear carga horaria
                        </label>
                        <p className="text-xs text-muted-foreground">
                          Distribuye equitativamente las horas entre docentes.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="proximity" defaultChecked />
                      <div>
                        <label htmlFor="proximity" className="text-sm font-medium leading-none">
                          Minimizar desplazamientos
                        </label>
                        <p className="text-xs text-muted-foreground">
                          Reduce cambios de aula para docentes en horas consecutivas.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="consecutive" defaultChecked />
                      <div>
                        <label htmlFor="consecutive" className="text-sm font-medium leading-none">
                          Priorizar horas consecutivas
                        </label>
                        <p className="text-xs text-muted-foreground">
                          Asigna bloques consecutivos de la misma materia cuando sea posible.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="specialization" />
                      <div>
                        <label htmlFor="specialization" className="text-sm font-medium leading-none">
                          Priorizar especialización
                        </label>
                        <p className="text-xs text-muted-foreground">
                          Da mayor peso a la especialización del docente sobre otros criterios.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Máximo de Horas por Docente</Label>
                  <Input type="number" defaultValue="20" min="1" max="40" />
                  <p className="text-xs text-muted-foreground">
                    Límite de horas semanales que puede tener asignado un docente.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Notas Adicionales</Label>
                  <Textarea placeholder="Ingrese cualquier información adicional relevante para la asignación" />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancelar</Button>
        <Button onClick={onPreview} className="bg-green-600 hover:bg-green-700">
          Generar Vista Previa
        </Button>
      </CardFooter>
    </Card>
  )
}
