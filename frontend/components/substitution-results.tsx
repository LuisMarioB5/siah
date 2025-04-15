"use client"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, CheckCircle, UserCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface SubstitutionResultsProps {
  onBack: () => void
}

export function SubstitutionResults({ onBack }: SubstitutionResultsProps) {
  const substitutes = [
    {
      id: 1,
      name: "Roberto Díaz",
      compatibility: 95,
      experience: "5 años",
      subjects: ["Matemáticas", "Física"],
      availability: "Completa",
      avatar: "RD",
    },
    {
      id: 2,
      name: "Elena Gómez",
      compatibility: 87,
      experience: "8 años",
      subjects: ["Matemáticas", "Química"],
      availability: "Parcial (mañanas)",
      avatar: "EG",
    },
    {
      id: 3,
      name: "Miguel Torres",
      compatibility: 82,
      experience: "3 años",
      subjects: ["Matemáticas"],
      availability: "Completa",
      avatar: "MT",
    },
    {
      id: 4,
      name: "Lucía Fernández",
      compatibility: 75,
      experience: "7 años",
      subjects: ["Física", "Matemáticas"],
      availability: "Parcial (tardes)",
      avatar: "LF",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" onClick={onBack} className="mr-2">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Volver
        </Button>
        <div>
          <h3 className="text-lg font-medium">Sustitutos para María López</h3>
          <p className="text-sm text-muted-foreground">Matemáticas - Miércoles 10:00-11:00</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {substitutes.map((substitute) => (
          <Card key={substitute.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-4 flex items-start gap-4">
                <Avatar className="h-12 w-12">
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
                        substitute.compatibility > 90
                          ? "bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-100 dark:border-green-800"
                          : substitute.compatibility > 80
                            ? "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-100 dark:border-blue-800"
                            : "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900 dark:text-amber-100 dark:border-amber-800",
                      )}
                    >
                      {substitute.compatibility}% compatible
                    </Badge>
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    <div>Experiencia: {substitute.experience}</div>
                    <div>Materias: {substitute.subjects.join(", ")}</div>
                    <div>Disponibilidad: {substitute.availability}</div>
                  </div>
                </div>
              </div>
              <div className="border-t flex">
                <Button
                  variant="ghost"
                  className="flex-1 rounded-none h-12 text-muted-foreground hover:text-foreground"
                >
                  Ver Perfil
                </Button>
                <div className="border-l h-12" />
                <Button
                  variant="ghost"
                  className={cn(
                    "flex-1 rounded-none h-12",
                    substitute.compatibility > 90
                      ? "text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-950"
                      : "text-foreground",
                  )}
                >
                  <UserCheck className="mr-2 h-4 w-4" />
                  Asignar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-end mt-6">
        <Button className="bg-green-600 hover:bg-green-700">
          <CheckCircle className="mr-2 h-4 w-4" />
          Confirmar Sustitución
        </Button>
      </div>
    </div>
  )
}
