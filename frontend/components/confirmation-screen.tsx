"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Mail, X } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface ConfirmationScreenProps {
  onClose: () => void
}

export function ConfirmationScreen({ onClose }: ConfirmationScreenProps) {
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-2 dark:bg-green-900">
          <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
        </div>
        <CardTitle>Sustitución Confirmada</CardTitle>
        <CardDescription>La sustitución ha sido registrada exitosamente en el sistema</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="rounded-lg border p-4">
          <h3 className="font-medium mb-2">Detalles de la Sustitución</h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <div className="text-muted-foreground">Docente Ausente:</div>
            <div>María López</div>

            <div className="text-muted-foreground">Docente Sustituto:</div>
            <div>Roberto Díaz</div>

            <div className="text-muted-foreground">Fecha:</div>
            <div>Miércoles, 10 de Abril de 2024</div>

            <div className="text-muted-foreground">Horario:</div>
            <div>10:00 - 11:00</div>

            <div className="text-muted-foreground">Materia:</div>
            <div>Matemáticas</div>

            <div className="text-muted-foreground">Aula:</div>
            <div>A101</div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Notificación</h3>
            <div className="flex items-center space-x-2">
              <Switch id="send-notification" defaultChecked />
              <Label htmlFor="send-notification">Enviar notificación</Label>
            </div>
          </div>

          <div className="rounded-lg border p-4 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <div>
                <div className="font-medium">Para: Roberto Díaz</div>
                <div className="text-muted-foreground">roberto.diaz@loscayucos.edu</div>
              </div>
              <Button variant="outline" size="sm">
                <Mail className="h-4 w-4 mr-2" />
                Vista previa
              </Button>
            </div>

            <Textarea
              defaultValue="Estimado Roberto Díaz, se le ha asignado una sustitución para la clase de Matemáticas el día Miércoles 10 de Abril de 2024, de 10:00 a 11:00 en el aula A101. Por favor confirme su disponibilidad. Gracias."
              className="min-h-[100px]"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onClose}>
          <X className="h-4 w-4 mr-2" />
          Cerrar
        </Button>
        <Button className="bg-green-600 hover:bg-green-700">
          <CheckCircle className="h-4 w-4 mr-2" />
          Finalizar
        </Button>
      </CardFooter>
    </Card>
  )
}
