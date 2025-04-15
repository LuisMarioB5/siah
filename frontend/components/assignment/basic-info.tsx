"use client"

import { Label } from "@/components/ui/label"
import { MultiSelect } from "@/components/ui/multi-select"
import { Card } from "@/components/ui/card"
import { HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useEffect, useState } from "react"
import { getMaterias, getDocentes, getAulas, getAniosEscolares, getCursos } from "@/services/asignacionService"

export function BasicInfo({ getDatosRef }: { getDatosRef: React.MutableRefObject<(() => any) | null> }) {
  const diasSemana = [
    {
      label: 'Lunes',
      value: 'lunes'
    },
    {
      label: 'Martes',
      value: 'martes'
    },
    {
      label: 'Miércoles',
      value: 'miércoles'
    },
    {
      label: 'Jueves',
      value: 'jueves'
    },
    {
      label: 'Viernes',
      value: 'viernes'
    },
  ]
  const [selectedDias, setSelectedDias] = useState<string[]>([]);

  const [materias, setMaterias] = useState<any[]>([]);
  const [docentes, setDocentes] = useState<any[]>([]);
  const [aulas, setAulas] = useState<any[]>([]);
  const [aniosEscolares, setAniosEscolares] = useState<any[]>([]);
  const [cursos, setCursos] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [m, d, a, p, c] = await Promise.all([
          getMaterias(),
          getDocentes(),
          getAulas(),
          getAniosEscolares(),
          getCursos(),
        ]);
        setMaterias(m);
        setDocentes(d);
        setAulas(a);
        setAniosEscolares(p);
        setCursos(c);
      } catch (err) {
        console.error('⛔ Error cargando datos:', err);
      }
    }
    
    fetchData();
  }, []);

  const materiaOptions = materias.map((m: any) => ({
    label: m.nombre,
    value: m.pk_id.toString(),
  }))
  const [selectedMaterias, setSelectedMaterias] = useState<string[]>([]);

  const docenteOptions = docentes.map((d: any) => ({
    label: d.persona.nombre + ' ' + d.persona.apellido,
    value: d.pk_id.toString(),
  }))
  const [selectedDocentes, setSelectedDocentes] = useState<string[]>([]);

  const aulaOptions = aulas.map((a: any) => ({
    label: a.nombre,
    value: a.pk_id.toString(),
  }))
  const [selectedAulas, setSelectedAulas] = useState<string[]>([]);

  const [selectedAnioId, setSelectedAnioId] = useState<string | null>(null);
  const [selectedCursoId, setSelectedCursoId] = useState<string | null>(null);
  
  const [ requiereLab, setRequiereLab ] = useState(false);
  const [ requiereProyector, setRequiereProyector ] = useState(false);
  const [ requierePC, setRequierePC ] = useState(false);
  
  const obtenerDatos = () => {
    return {
      ...(selectedAnioId && { anioId: parseInt(selectedAnioId) }),
      ...(selectedCursoId && { cursoId: parseInt(selectedCursoId) }),
      materiasIds: selectedMaterias.map(id => parseInt(id)),
      dias: selectedDias,
      docentesIds: selectedDocentes.map(id => parseInt(id)),
      aulasIds: selectedAulas.map(id => parseInt(id)),
      requisitos: {
        requiere_lab: requiereLab,
        requiere_pc: requierePC,
        requiere_proyector: requiereProyector,
      }
    }
  }

  useEffect(() => {
    if(getDatosRef) getDatosRef.current = obtenerDatos
  }, [ 
    selectedAnioId, 
    selectedCursoId, 
    selectedMaterias, 
    selectedDias, 
    selectedDocentes, 
    selectedAulas, 
    requiereLab,
    requierePC, 
    requiereProyector 
  ])
    
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        {/* Año Escolar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Año Escolar</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-5 w-5">
                    <HelpCircle className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">Seleccione el año escolar al cual pertenecerá el horario.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <Select onValueChange={ setSelectedAnioId }>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar curso" />
            </SelectTrigger>
            <SelectContent>
              {aniosEscolares?.map((anioEscolar: any) => (
                <SelectItem key={anioEscolar.pk_id} value={anioEscolar.pk_id.toString()}>{anioEscolar.nombre}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Cursos */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Curso</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-5 w-5">
                    <HelpCircle className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">Seleccione el curso al que desea asignar materias y horarios.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <Select onValueChange={ setSelectedCursoId }>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar curso" />
            </SelectTrigger>
            <SelectContent>
              {cursos?.map((curso: any) => (
                <SelectItem key={curso.pk_id} value={curso.pk_id.toString()}>{curso.nombre}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Materias */}
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
                    Seleccione las materias que desea asignar a este curso. Puede seleccionar múltiples materias.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <MultiSelect
            options={materiaOptions}
            selected={selectedMaterias}
            onChange={setSelectedMaterias}
            placeholder="Seleccionar materias"
          />
        </div>

        {/* Días de la semana */}
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

          <MultiSelect
            options={diasSemana}
            selected={selectedDias}
            onChange={setSelectedDias}
            placeholder="Seleccionar días"
          />
        </div>
      </div>

      <div className="space-y-4">
        {/* Docentes */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Docentes Disponibles</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-5 w-5">
                    <HelpCircle className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">
                    Seleccione los docentes que estarán disponibles para la asignación. El sistema utilizará el sistema
                    de puntos para determinar la mejor asignación.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <MultiSelect
            options={docenteOptions}
            selected={selectedDocentes}
            onChange={setSelectedDocentes}
            placeholder="Seleccionar docentes"
          />
        </div>

        {/* Aulas */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Aulas Disponibles</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-5 w-5">
                    <HelpCircle className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">
                    Seleccione las aulas que estarán disponibles para la asignación. El sistema evaluará los requisitos
                    físicos y técnicos necesarios para cada materia.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <MultiSelect
            options={aulaOptions}
            selected={selectedAulas}
            onChange={setSelectedAulas}
            placeholder="Seleccionar aulas"
          />
        </div>

        {/* Requisitos Especiales */}
        <Card className="p-4 bg-muted/40">
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Requisitos Especiales</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                id="req-lab" 
                checked={requiereLab} 
                onCheckedChange={(checked) => setRequiereLab(Boolean(checked))}
                />
                <label
                  htmlFor="req-lab"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Requiere laboratorio
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                id="req-projector"
                checked={requiereProyector}
                onCheckedChange={(checked) => {setRequiereProyector(Boolean(checked))}}
                />
                <label
                  htmlFor="req-projector"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Requiere proyector
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                id="req-pc"
                checked={requierePC}
                onCheckedChange={(checked) => {setRequierePC(Boolean(checked))}}
                />
                <label
                  htmlFor="req-pc"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Requiere computadoras
                </label>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>   
  )
}
