"use client"

import { useEffect, useState } from "react"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Check, Plus, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface CriteriaProps {
  nombre: string
  puntos: number
}

export function AssignmentCriteria({ getDatosRef }: { getDatosRef: React.MutableRefObject<(() => any) | null> }) {
  const [teacherCriteria, setTeacherCriteria] = useState<CriteriaProps[]>([
    { nombre: "Antigüedad Docente", puntos: 7 },
    { nombre: "Disponibilidad", puntos: 9 },
    { nombre: "Experiencia en la Materia", puntos: 8 },
    { nombre: "Especialidad", puntos: 8 },
  ])

  const [classroomCriteria, setClassroomCriteria] = useState<CriteriaProps[]>([
    { nombre: "Capacidad", puntos: 7 },
    { nombre: "Equipamiento", puntos: 8 },
    { nombre: "Ubicación", puntos: 6 },
  ])

  const [customCriteria, setCustomCriteria] = useState<CriteriaProps[]>([])

  const updateCriteriaPoints = (criteriaType: string, index: number, points: number) => {
    const updateCriteria = (criteria: CriteriaProps[]) => {
      const newCriteria = [...criteria]
      newCriteria[index] = { ...newCriteria[index], puntos: points }
      return newCriteria
    }

    switch (criteriaType) {
      case "teacher":
        setTeacherCriteria(updateCriteria(teacherCriteria))
        break
      case "classroom":
        setClassroomCriteria(updateCriteria(classroomCriteria))
        break
      case "custom":
        setCustomCriteria(updateCriteria(customCriteria))
        break
    }
  }

  const addCustomCriteria = () => {
    setCustomCriteria((prev) => [...prev, { nombre: "Nuevo Criterio", puntos: 5 }])
  }

  const removeCustomCriteria = (index: number) => {
    const newCriteria = [...customCriteria]
    newCriteria.splice(index, 1)
    setCustomCriteria(newCriteria)
  }

  const updateCustomCriteriaName = (index: number, name: string) => {
    const newCriteria = [...customCriteria]
    newCriteria[index] = { ...newCriteria[index], nombre: name }
    setCustomCriteria(newCriteria)
  }

  const [ requiereBalanceoCarga, setRequiereBalanceoCarga ] = useState(false);
  const [ requiereProximidad, setRequiereProximidad ] = useState(false);
  const [ requiereConsecutividad, setRequiereConsecutividad ] = useState(false);
  const [ requiereEspecializacion, setRequiereEspecializacion ] = useState(false);
  const [ maxHoras, setMaxHoras ] = useState(40);
  const [ maxVeces, setMaxVeces ] = useState(4);
  const [ umbralMinimo, setUmbralMinimo ] = useState(70);
  const [ notasAdicionales, setNotasAdicionales ] = useState('');

  const obtenerDatos = () => {
    return {
      docente: {
        antiguedad: teacherCriteria[0].puntos,
        disponibilidad: teacherCriteria[1].puntos,
        experiencia: teacherCriteria[2].puntos,
        especialidad: teacherCriteria[3].puntos,
      },
      aula: {
        capacidad: classroomCriteria[0].puntos,
        equipamiento: classroomCriteria[1].puntos,
        ubicacion: classroomCriteria[2].puntos,
      },
      personalizados: customCriteria,
      opcionesAvanzadas: {
        balancearCarga: requiereBalanceoCarga,
        minimizarDesplazamientos: requiereProximidad,
        horasConsecutivas: requiereConsecutividad,
        especializacion: requiereEspecializacion,
      },
      maxHorasDocente: Number(maxHoras),
      maxVecesDocente: Number(maxVeces),
      umbralMinimo: Number(umbralMinimo),
      notas: notasAdicionales
    }
  }

  useEffect(() => {
    if(getDatosRef) getDatosRef.current = obtenerDatos
  }, [
    teacherCriteria,
    classroomCriteria,
    customCriteria,
    requiereBalanceoCarga,
    requiereProximidad,
    requiereConsecutividad,
    requiereEspecializacion,
    maxHoras,
    maxVeces,
    umbralMinimo,
    notasAdicionales
  ]);

  return (
    <div className="space-y-6">
      {/* Criterios Docentes */}
      <Card>
        <CardHeader>
          <CardTitle>Sistema de Puntos para Docentes</CardTitle>
          <CardDescription>
            Ajuste la importancia de cada criterio para la asignación automática de docentes.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {teacherCriteria.map((criteria, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm">{criteria.nombre}</Label>
                <span className="text-sm">{criteria.puntos} puntos</span>
              </div>
              <Slider
                defaultValue={[criteria.puntos]}
                max={10}
                min={1}
                step={1}
                onValueChange={(value) => updateCriteriaPoints("teacher", index, value[0])}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Criterios Aulas */}
      <Card>
        <CardHeader>
          <CardTitle>Sistema de Puntos para Aulas</CardTitle>
          <CardDescription>Ajuste la importancia de cada criterio para la asignación de aulas.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {classroomCriteria.map((criteria, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm">{criteria.nombre}</Label>
                <span className="text-sm">{criteria.puntos} puntos</span>
              </div>
              <Slider
                defaultValue={[criteria.puntos]}
                max={10}
                min={1}
                step={1}
                onValueChange={(value) => updateCriteriaPoints("classroom", index, value[0])}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Criterios Personalizados */}
      <Card>
        <CardHeader>
          <CardTitle>Criterios Personalizados</CardTitle>
          <CardDescription>Agregue criterios adicionales para la asignación.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {customCriteria.map((criteria, index) => (
            <div key={index} className="grid grid-cols-4 gap-4 items-center">
              <Input
                type="text"
                placeholder="Nombre del criterio"
                value={criteria.nombre}
                onChange={(e) => updateCustomCriteriaName(index, e.target.value)}
              />
              <div className="flex items-center justify-between">
                <Slider
                  defaultValue={[criteria.puntos]}
                  max={10}
                  min={1}
                  step={1}
                  onValueChange={(value) => updateCriteriaPoints("custom", index, value[0])}
                />
              </div>
                <span className="text-sm">{criteria.puntos} puntos</span>
              <Button variant="ghost" size="icon" onClick={() => removeCustomCriteria(index)}>
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button variant="outline" className="w-full" onClick={addCustomCriteria}>
            <Plus className="h-4 w-4 mr-2" />
            Agregar Criterio
          </Button>
        </CardContent>
      </Card>

      {/* Opciones Avanzadas */}
      <Card>
        <CardHeader>
          <CardTitle>Opciones Avanzadas</CardTitle>
          <CardDescription>Configure opciones adicionales para optimizar la asignación de horarios.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2 border rounded-md p-4">
            <div className="flex items-center space-x-2">
              <Checkbox
              id="balance"
              checked={requiereBalanceoCarga}
              onCheckedChange={(checked) => setRequiereBalanceoCarga(Boolean(checked))}
              />
              <div>
                <label htmlFor="balance" className="text-sm font-medium leading-none">
                  Balancear carga horaria
                </label>
                <p className="text-xs text-muted-foreground">
                  Distribuye equitativamente las horas entre docentes (+10 puntos).
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
              id="proximity"
              checked={requiereProximidad}
              onCheckedChange={(checked) => setRequiereProximidad(Boolean(checked))}
              />
              <div>
                <label htmlFor="proximity" className="text-sm font-medium leading-none">
                  Minimizar desplazamientos
                </label>
                <p className="text-xs text-muted-foreground">
                  Reduce cambios de aula para docentes en horas consecutivas (+15 puntos).
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
              id="consecutive"
              checked={requiereConsecutividad}
              onCheckedChange={(checked) => setRequiereConsecutividad(Boolean(checked))}
              />
              <div>
                <label htmlFor="consecutive" className="text-sm font-medium leading-none">
                  Priorizar horas consecutivas
                </label>
                <p className="text-xs text-muted-foreground">
                  Asigna bloques consecutivos de la misma materia cuando sea posible (+10 puntos).
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
              id="specialization"
              checked={requiereEspecializacion}
              onCheckedChange={(checked) => setRequiereEspecializacion(Boolean(checked))}
              />
              <div>
                <label htmlFor="specialization" className="text-sm font-medium leading-none">
                  Priorizar especialización
                </label>
                <p className="text-xs text-muted-foreground">
                  Da mayor peso a la especialización del docente sobre otros criterios (+20 puntos).
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Máximo de Horas por Docente</Label>
            <Input
            type="number"
            value={maxHoras}
            onChange={(e) => setMaxHoras(Number(e.target.value))}
            min="1"
            max="40"
            />
            <p className="text-xs text-muted-foreground">
              Límite de horas semanales que puede tener asignado un docente (1-40).
            </p>
          </div>

          <div className="space-y-2">
            <Label>Máximo de veces por Docente</Label>
            <Input
            type="number"
            value={maxVeces}
            onChange={(e) => setMaxVeces(Number(e.target.value))}
            min="1"
            max="8"
            />
            <p className="text-xs text-muted-foreground">
              Límite de veces diarias que un profesor puede dar clase a un grupo (1-8).
            </p>
          </div>

          <div className="space-y-2">
            <Label>Umbral Mínimo de Puntos</Label>
            <Input
            type="number"
            value={umbralMinimo}
            onChange={(e) => setUmbralMinimo(Number(e.target.value))}
            min="0"
            max="100"
            />
            <p className="text-xs text-muted-foreground">
              Puntuación mínima requerida para considerar una asignación como válida (0-100).
            </p>
          </div>

          <div className="space-y-2">
            <Label>Notas Adicionales</Label>
            <Textarea
            placeholder="Ingrese cualquier información adicional relevante para la asignación"
            value={notasAdicionales}
            onChange={(e) => setNotasAdicionales(e.target.value.toString())}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
