"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Label } from "@/components/ui/label"
import { MultiSelect } from "@/components/ui/multi-select"
import { HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getCursos, getAniosEscolares } from "@/services/asignacionService"

interface BasicInfoProps {
  getDatosRef: React.MutableRefObject<(() => any) | null>
}

export function BasicInfo({ getDatosRef }: BasicInfoProps) {
  const [selectedAnioId, setSelectedAnioId] = useState<string | null>(null)
  const [selectedCursoIds, setSelectedCursoIds] = useState<string[]>([])
  const [selectedDias, setSelectedDias] = useState<string[]>(["lunes", "martes", "miercoles", "jueves", "viernes"])

  const [aniosEscolares, setAniosEscolares] = useState<any[]>([]);
  const [cursos, setCursos] = useState<any[]>([]);
  
  const diasSemana = [
    { value: "lunes", label: "Lunes" },
    { value: "martes", label: "Martes" },
    { value: "miercoles", label: "Miércoles" },
    { value: "jueves", label: "Jueves" },
    { value: "viernes", label: "Viernes" },
  ]

  useEffect(() => {
    async function fetchData() {
      try {
        const [a, c] = await Promise.all([
          getAniosEscolares(),
          getCursos(),
        ]);
        setAniosEscolares(a);
        setCursos(c);
      } catch (err) {
        console.error('⛔ Error cargando datos:', err);
      }
    }
  
    fetchData();
  }, []);

  const cursosOptions = cursos.map((m: any) => ({
    label: m.nombre,
    value: m.pk_id.toString(),
  }))

  const getDatos = () => ({
    anioEscolarId: selectedAnioId ? Number.parseInt(selectedAnioId) : null,
    cursoIds: selectedCursoIds.map((id: any) => Number.parseInt(id)),
    dias: selectedDias,
  })

  useEffect(() => {
    if (getDatosRef) {
      getDatosRef.current = getDatos
    }
  }, [selectedAnioId, selectedCursoIds, selectedDias, getDatosRef])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="anio-escolar">Año Escolar</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-5 w-5">
                    <HelpCircle className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">Seleccione el año escolar para la asignación.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <Select onValueChange={setSelectedAnioId} required>
            <SelectTrigger id="anio-escolar">
              <SelectValue placeholder="Seleccionar año escolar" />
            </SelectTrigger>
            <SelectContent>
              {aniosEscolares.map((anio: any) => (
                <SelectItem key={anio.pk_id} value={anio.pk_id.toString()}>
                  {anio.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Cursos</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-5 w-5">
                    <HelpCircle className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">Seleccione uno o más cursos para la asignación.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <MultiSelect
            options={cursosOptions}
            selected={selectedCursoIds}
            onChange={setSelectedCursoIds}
            placeholder="Seleccionar cursos"
            className="min-w-[200px]"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Días de la Semana</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-5 w-5">
                    <HelpCircle className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">Seleccione los días de la semana para la asignación.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <MultiSelect
            options={diasSemana}
            selected={selectedDias}
            onChange={setSelectedDias}
            placeholder="Seleccionar días"
            className="min-w-[200px]"
          />
        </div>
      </div>
    </div>
  )
}
