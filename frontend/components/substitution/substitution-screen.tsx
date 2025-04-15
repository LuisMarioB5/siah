"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, CheckCircle, Info, Search, UserCheck } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MultiSelect } from "@/components/ui/multi-select"

export function SubstitutionScreen() {
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: undefined,
    to: undefined,
  })

  const [step, setStep] = useState<"select" | "results">("select")
  const [selectedTeacher, setSelectedTeacher] = useState<string[]>([])

  const teachers = [
    { value: "maria-lopez", label: "María López" },
    { value: "juan-perez", label: "Juan Pérez" },
    { value: "ana-garcia", label: "Ana García" },
    { value: "carlos-ruiz", label: "Carlos Ruiz" },
    { value: "laura-martinez", label: "Laura Martínez" },
    { value: "pedro-sanchez", label: "Pedro Sánchez" },
  ]

  // Sample affected classes data
  const affectedClasses = [
    {
      id: 1,
      day: "Lunes",
      date: "15/04/2024",
      time: "10:30 - 11:20",
      subject: "Matemáticas",
      course: "1B",
      room: "A101",
      selected: true,
    },
    {
      id: 2,
      day: "Lunes",
      date: "15/04/2024",
      time: "12:10 - 13:00",
      subject: "Matemáticas",
      course: "3B",
      room: "A101",
      selected: true,
    },
    {
      id: 3,
      day: "Martes",
      date: "16/04/2024",
      time: "7:30 - 8:20",
      subject: "Matemáticas",
      course: "2A",
      room: "A101",
      selected: true,
    },
    {
      id: 4,
      day: "Martes",
      date: "16/04/2024",
      time: "8:20 - 9:10",
      subject: "Matemáticas",
      course: "2A",
      room: "A101",
      selected: true,
    },
    {
      id: 5,
      day: "Martes",
      date: "16/04/2024",
      time: "12:10 - 13:00",
      subject: "Matemáticas",
      course: "1B",
      room: "A101",
      selected: true,
    },
    {
      id: 6,
      day: "Miércoles",
      date: "17/04/2024",
      time: "7:30 - 8:20",
      subject: "Matemáticas",
      course: "3A",
      room: "A101",
      selected: true,
    },
    {
      id: 7,
      day: "Miércoles",
      date: "17/04/2024",
      time: "8:20 - 9:10",
      subject: "Matemáticas",
      course: "3A",
      room: "A101",
      selected: true,
    },
    {
      id: 8,
      day: "Miércoles",
      date: "17/04/2024",
      time: "10:30 - 11:20",
      subject: "Matemáticas",
      course: "1B",
      room: "A101",
      selected: true,
    },
  ]

  // Sample substitutes data
  const substitutes = [
    {
      id: 1,
      name: "Roberto Díaz",
      compatibility: 95,
      experience: "5 años",
      subjects: ["Matemáticas", "Física"],
      availability: "Completa",
      avatar: "RD",
      selected: false,
      points: 92,
      criteria: [
        "Experiencia previa en la materia (25/25 pts)",
        "Disponibilidad completa (30/30 pts)",
        "Especialización en Matemáticas (17/20 pts)",
        "Menor carga horaria actual (10/10 pts)",
        "Proximidad al aula asignada (10/15 pts)",
      ],
    },
    {
      id: 2,
      name: "Elena Gómez",
      compatibility: 87,
      experience: "8 años",
      subjects: ["Matemáticas", "Química"],
      availability: "Parcial (mañanas)",
      avatar: "EG",
      selected: false,
      points: 87,
      criteria: [
        "Experiencia previa en la materia (25/25 pts)",
        "Disponibilidad parcial (20/30 pts)",
        "Especialización en Matemáticas (17/20 pts)",
        "Carga horaria media (5/10 pts)",
        "Proximidad al aula asignada (15/15 pts)",
      ],
    },
    {
      id: 3,
      name: "Miguel Torres",
      compatibility: 82,
      experience: "3 años",
      subjects: ["Matemáticas"],
      availability: "Completa",
      avatar: "MT",
      selected: false,
      points: 82,
      criteria: [
        "Experiencia limitada en la materia (15/25 pts)",
        "Disponibilidad completa (30/30 pts)",
        "Especialización en Matemáticas (17/20 pts)",
        "Menor carga horaria actual (10/10 pts)",
        "Distancia considerable al aula (5/15 pts)",
      ],
    },
    {
      id: 4,
      name: "Lucía Fernández",
      compatibility: 75,
      experience: "7 años",
      subjects: ["Física", "Matemáticas"],
      availability: "Parcial (tardes)",
      avatar: "LF",
      selected: false,
      points: 75,
      criteria: [
        "Experiencia previa en la materia (20/25 pts)",
        "Disponibilidad parcial (15/30 pts)",
        "Especialización secundaria en Matemáticas (10/20 pts)",
        "Carga horaria alta (5/10 pts)",
        "Proximidad al aula asignada (15/15 pts)",
      ],
    },
  ]

  const [selectedSubstitutes, setSelectedSubstitutes] = useState<{ [key: number]: number }>({})

  const handleSearchSubstitutes = () => {
    if (selectedTeacher.length > 0 && dateRange.from) {
      setStep("results")
    }
  }

  const handleSelectSubstitute = (classId: number, substituteId: number) => {
    setSelectedSubstitutes((prev) => ({
      ...prev,
      [classId]: substituteId,
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Sustitución de Docentes</h1>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Gestión de Sustituciones</CardTitle>
          <CardDescription>
            {step === "select"
              ? "Seleccione el docente ausente y el rango de fechas para detectar clases afectadas"
              : "Asigne sustitutos para las clases afectadas utilizando el sistema de puntos"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === "select" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="absent-teacher">Docente Ausente</Label>
                  <MultiSelect
                    options={teachers}
                    selected={selectedTeacher}
                    onChange={setSelectedTeacher}
                    placeholder="Seleccionar docente"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Rango de Fechas de Ausencia</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !dateRange.from && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange.from ? (
                          dateRange.to ? (
                            <>
                              {format(dateRange.from, "LLL dd, y", { locale: es })} -{" "}
                              {format(dateRange.to, "LLL dd, y", { locale: es })}
                            </>
                          ) : (
                            format(dateRange.from, "LLL dd, y", { locale: es })
                          )
                        ) : (
                          <span>Seleccionar rango de fechas</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={dateRange.from}
                        selected={dateRange}
                        onSelect={setDateRange}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reason">Motivo de Ausencia</Label>
                  <MultiSelect
                    options={[
                      { value: "health", label: "Salud" },
                      { value: "personal", label: "Personal" },
                      { value: "training", label: "Capacitación" },
                      { value: "official", label: "Comisión Oficial" },
                      { value: "other", label: "Otro" },
                    ]}
                    selected={["health"]}
                    onChange={() => {}}
                    placeholder="Seleccionar motivo"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="details">Detalles Adicionales</Label>
                  <Textarea id="details" placeholder="Ingrese detalles adicionales sobre la ausencia" />
                </div>
              </div>

              <div className="space-y-4 flex items-center justify-center border rounded-md p-4">
                <div className="text-center space-y-4">
                  <Info className="h-16 w-16 text-muted-foreground mx-auto" />
                  <div>
                    <h3 className="text-lg font-medium mb-2">Sistema Inteligente de Sustitución</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Al seleccionar un docente y un rango de fechas, el sistema detectará automáticamente todas las
                      clases afectadas que requerirán sustitución.
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      El sistema utilizará el sistema de puntos para sugerir los mejores sustitutos para cada clase,
                      considerando criterios como disponibilidad, experiencia y especialidad.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Podrá asignar diferentes sustitutos para cada clase afectada si lo desea.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-muted/50 p-4 rounded-md">
                <div>
                  <h3 className="font-medium">Docente: María López</h3>
                  <p className="text-sm text-muted-foreground">Ausencia: 15/04/2024 - 17/04/2024 (3 días)</p>
                </div>
                <Badge
                  variant="outline"
                  className="bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800"
                >
                  8 clases afectadas
                </Badge>
              </div>

              <Tabs defaultValue="byClass">
                <TabsList>
                  <TabsTrigger value="byClass">Por Clase</TabsTrigger>
                  <TabsTrigger value="byDay">Por Día</TabsTrigger>
                </TabsList>

                <TabsContent value="byClass" className="space-y-4 pt-4">
                  <div className="rounded-md border overflow-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Día</TableHead>
                          <TableHead>Fecha</TableHead>
                          <TableHead>Hora</TableHead>
                          <TableHead>Materia</TableHead>
                          <TableHead>Curso</TableHead>
                          <TableHead>Aula</TableHead>
                          <TableHead>Sustituto Recomendado</TableHead>
                          <TableHead>Puntuación</TableHead>
                          <TableHead>Sustituto Seleccionado</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {affectedClasses.map((cls) => (
                          <TableRow key={cls.id}>
                            <TableCell>{cls.day}</TableCell>
                            <TableCell>{cls.date}</TableCell>
                            <TableCell>{cls.time}</TableCell>
                            <TableCell>{cls.subject}</TableCell>
                            <TableCell>{cls.course}</TableCell>
                            <TableCell>{cls.room}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={`/placeholder.svg?height=24&width=24&text=RD`} />
                                  <AvatarFallback>RD</AvatarFallback>
                                </Avatar>
                                <span>Roberto Díaz</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-100 dark:border-green-800"
                              >
                                92 pts
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <MultiSelect
                                options={substitutes.map((sub) => ({
                                  value: sub.id.toString(),
                                  label: `${sub.name} (${sub.points} pts)`,
                                }))}
                                selected={
                                  selectedSubstitutes[cls.id]?.toString()
                                    ? [selectedSubstitutes[cls.id].toString()]
                                    : []
                                }
                                onChange={(values) => handleSelectSubstitute(cls.id, Number.parseInt(values[0] || "1"))}
                                placeholder="Seleccionar"
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="flex justify-between items-center p-4 border rounded-md">
                    <div className="flex items-center gap-2">
                      <UserCheck className="h-5 w-5 text-green-600" />
                      <span className="font-medium">Sustitutos Recomendados</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {substitutes.map((sub) => (
                        <Badge
                          key={sub.id}
                          variant="outline"
                          className={cn(
                            "flex items-center gap-1 py-1 px-2",
                            sub.compatibility > 90
                              ? "bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-100 dark:border-green-800"
                              : sub.compatibility > 80
                                ? "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-100 dark:border-blue-800"
                                : "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900 dark:text-amber-100 dark:border-amber-800",
                          )}
                        >
                          {sub.name} ({sub.points} pts)
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="byDay" className="space-y-4 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {["Lunes", "Martes", "Miércoles"].map((day) => {
                      const dayClasses = affectedClasses.filter((cls) => cls.day === day)
                      return (
                        <Card key={day}>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">{day}</CardTitle>
                            <CardDescription>
                              {dayClasses[0]?.date} • {dayClasses.length} clases
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            {dayClasses.map((cls) => (
                              <div key={cls.id} className="p-2 border rounded-md">
                                <div className="flex justify-between items-center mb-1">
                                  <span className="font-medium">{cls.time}</span>
                                  <Badge>{cls.course}</Badge>
                                </div>
                                <div className="text-sm">
                                  {cls.subject} • Aula {cls.room}
                                </div>
                                <div className="mt-2">
                                  <MultiSelect
                                    options={substitutes.map((sub) => ({
                                      value: sub.id.toString(),
                                      label: `${sub.name} (${sub.points} pts)`,
                                    }))}
                                    selected={
                                      selectedSubstitutes[cls.id]?.toString()
                                        ? [selectedSubstitutes[cls.id].toString()]
                                        : []
                                    }
                                    onChange={(values) =>
                                      handleSelectSubstitute(cls.id, Number.parseInt(values[0] || "1"))
                                    }
                                    placeholder="Seleccionar sustituto"
                                  />
                                </div>
                              </div>
                            ))}
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </TabsContent>
              </Tabs>

              <div className="space-y-2 p-4 border rounded-md bg-muted/30">
                <h3 className="font-medium">Detalles del Sistema de Puntos</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  {substitutes.map((substitute) => (
                    <div key={substitute.id} className="flex items-start gap-3 p-3 border rounded-md bg-card">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${substitute.avatar}`} />
                        <AvatarFallback>{substitute.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{substitute.name}</h4>
                          <Badge
                            variant="outline"
                            className={cn(
                              "bg-opacity-20 border-opacity-30",
                              substitute.points > 90
                                ? "bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-100 dark:border-green-800"
                                : substitute.points > 80
                                  ? "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-100 dark:border-blue-800"
                                  : "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900 dark:text-amber-100 dark:border-amber-800",
                            )}
                          >
                            {substitute.points} pts
                          </Badge>
                        </div>
                        <div className="mt-1 text-sm text-muted-foreground">
                          <div>Experiencia: {substitute.experience}</div>
                          <div>Materias: {substitute.subjects.join(", ")}</div>
                          <div>Disponibilidad: {substitute.availability}</div>
                        </div>
                        <div className="mt-2 text-xs text-muted-foreground">
                          <div className="font-medium text-sm mb-1">Criterios de puntuación:</div>
                          <ul className="list-disc pl-4 space-y-0.5">
                            {substitute.criteria.map((criterion, idx) => (
                              <li key={idx}>{criterion}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {step === "select" ? (
            <>
              <Button variant="outline">Cancelar</Button>
              <Button
                onClick={handleSearchSubstitutes}
                className="bg-green-600 hover:bg-green-700"
                disabled={selectedTeacher.length === 0 || !dateRange.from}
              >
                <Search className="mr-2 h-4 w-4" />
                Buscar Sustitutos
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => setStep("select")}>
                Volver
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                <CheckCircle className="mr-2 h-4 w-4" />
                Confirmar Sustituciones
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
