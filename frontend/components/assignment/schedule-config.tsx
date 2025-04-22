"use client"

import { useEffect, useState } from "react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Trash, Info } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function ScheduleConfig({ getDatosRef }: { getDatosRef: React.MutableRefObject<(() => any) | null> }) {
  const [timeBlocks, setTimeBlocks] = useState([
    { id: 1, tipo: "clase", hora_inicio: "08:15", hora_fin: "09:00", observacion: "Bloque 1" },
    { id: 2, tipo: "clase", hora_inicio: "09:00", hora_fin: "09:45", observacion: "Bloque 1" },
    { id: 3, tipo: "receso", hora_inicio: "09:45", hora_fin: "10:15", observacion: "Receso" },
    { id: 4, tipo: "clase", hora_inicio: "10:15", hora_fin: "11:00", observacion: "Bloque 2" },
    { id: 5, tipo: "clase", hora_inicio: "11:00", hora_fin: "11:45", observacion: "Bloque 2" },
    { id: 6, tipo: "almuerzo", hora_inicio: "11:45", hora_fin: "12:45", observacion: "Almuerzo" },
    { id: 7, tipo: "clase", hora_inicio: "12:45", hora_fin: "13:30", observacion: "Bloque 3" },
    { id: 8, tipo: "clase", hora_inicio: "13:30", hora_fin: "14:15", observacion: "Bloque 3" },
    { id: 9, tipo: "receso", hora_inicio: "14:15", hora_fin: "14:30", observacion: "Receso" },
    { id: 10, tipo: "clase", hora_inicio: "14:30", hora_fin: "15:15", observacion: "Bloque 4" },
    { id: 11, tipo: "clase", hora_inicio: "15:15", hora_fin: "16:00", observacion: "Bloque 4" },
  ])

  const obtenerDatos = () => {
    const bloquesTransformados = timeBlocks.map((bloque: any) => ({
      tipo: bloque.tipo,
      hora_inicio: parseTimeStringToDate(bloque.hora_inicio),
      hora_fin: parseTimeStringToDate(bloque.hora_fin),
      observacion: bloque.observacion,
    }));
    
    return bloquesTransformados;
  }

  useEffect(() => {
    if(getDatosRef) getDatosRef.current = obtenerDatos
  }, [timeBlocks]);


  const addTimeBlock = () => {
    const newId = timeBlocks.length > 0 ? Math.max(...timeBlocks.map((block) => block.id)) + 1 : 1
    setTimeBlocks([
      ...timeBlocks,
      {
        id: newId,
        tipo: "clase",
        hora_inicio: "16:00",
        hora_fin: "16:45",
        observacion: `Nuevo Bloque`,
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
                Configure los bloques de tiempo para las clases y recesos. Puede agregar, eliminar y modificar bloques
                según sea necesario.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="space-y-2">
        {timeBlocks.map((block, index) => (
          <div key={block.id} className="flex items-center gap-2 p-2 border rounded-md">
            <Select value={block.tipo} onValueChange={(value: string) => updateTimeBlock(block.id, "tipo", value)}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="clase">Clase</SelectItem>
                <SelectItem value="receso">Receso</SelectItem>
                <SelectItem value="almuerzo">Almuerzo</SelectItem>
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
                  value={block.hora_inicio}
                  onChange={(e) => updateTimeBlock(block.id, "hora_inicio", e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <Label htmlFor={`end-time-${block.id}`} className="text-xs">
                  Fin
                </Label>
                <Input
                  id={`end-time-${block.id}`}
                  type="time"
                  value={block.hora_fin}
                  onChange={(e) => updateTimeBlock(block.id, "hora_fin", e.target.value)}
                />
              </div>
            </div>

            <div className="flex-1">
              <Input
                placeholder="Etiqueta"
                value={block.observacion}
                onChange={(e) => updateTimeBlock(block.id, "observacion", e.target.value)}
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

      <div className="p-4 border rounded-md bg-muted/40 mt-6">
        <div className="flex items-start gap-2">
          <Info className="h-5 w-5 text-blue-500 mt-0.5" />
          <div>
            <h3 className="font-medium mb-1">Configuración de Horarios Flexibles</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Los bloques de tiempo definidos como "Receso" o "Almuerzo" serán excluidos automáticamente de la
              asignación de clases. El sistema respetará estos intervalos al generar el horario.
            </p>
            <p className="text-sm text-muted-foreground">
              Puede agregar tantos bloques como necesite y reorganizarlos según los requerimientos del centro educativo.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const parseTimeStringToDate = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  const now = new Date();
  now.setHours(hours, minutes, 0, 0);
  return now;
};
