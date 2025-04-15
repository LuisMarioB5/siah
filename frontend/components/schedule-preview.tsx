import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export function SchedulePreview() {
  const hours = ["8:00 - 9:00", "9:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00", "12:00 - 13:00"]
  const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"]

  // Sample data with changes highlighted
  const schedule = {
    Lunes: {
      "8:00 - 9:00": { teacher: "María López", subject: "Matemáticas", room: "A101", status: "unchanged" },
      "9:00 - 10:00": { teacher: "Juan Pérez", subject: "Historia", room: "B203", status: "unchanged" },
      "10:00 - 11:00": { teacher: "Ana García", subject: "Ciencias", room: "C305", status: "unchanged" },
      "11:00 - 12:00": { teacher: "Carlos Ruiz", subject: "Literatura", room: "A102", status: "unchanged" },
      "12:00 - 13:00": { teacher: "Laura Martínez", subject: "Inglés", room: "B204", status: "unchanged" },
    },
    Martes: {
      "8:00 - 9:00": { teacher: "Pedro Sánchez", subject: "Física", room: "C306", status: "unchanged" },
      "9:00 - 10:00": { teacher: "María López", subject: "Matemáticas", room: "A101", status: "unchanged" },
      "10:00 - 11:00": { teacher: "Juan Pérez", subject: "Historia", room: "B203", status: "unchanged" },
      "11:00 - 12:00": { teacher: "Ana García", subject: "Ciencias", room: "C305", status: "unchanged" },
      "12:00 - 13:00": { teacher: "Carlos Ruiz", subject: "Literatura", room: "A102", status: "unchanged" },
    },
    Miércoles: {
      "8:00 - 9:00": { teacher: "Laura Martínez", subject: "Inglés", room: "B204", status: "unchanged" },
      "9:00 - 10:00": { teacher: "Pedro Sánchez", subject: "Física", room: "C306", status: "unchanged" },
      "10:00 - 11:00": {
        teacher: "Roberto Díaz",
        subject: "Matemáticas",
        room: "A101",
        status: "new",
        oldTeacher: "María López",
      },
      "11:00 - 12:00": { teacher: "Juan Pérez", subject: "Historia", room: "B203", status: "unchanged" },
      "12:00 - 13:00": { teacher: "Ana García", subject: "Ciencias", room: "C305", status: "unchanged" },
    },
    Jueves: {
      "8:00 - 9:00": { teacher: "Carlos Ruiz", subject: "Literatura", room: "A102", status: "unchanged" },
      "9:00 - 10:00": { teacher: "Laura Martínez", subject: "Inglés", room: "B204", status: "unchanged" },
      "10:00 - 11:00": { teacher: "Pedro Sánchez", subject: "Física", room: "C306", status: "unchanged" },
      "11:00 - 12:00": { teacher: "María López", subject: "Matemáticas", room: "A101", status: "unchanged" },
      "12:00 - 13:00": {
        teacher: "Elena Gómez",
        subject: "Historia",
        room: "B203",
        status: "new",
        oldTeacher: "Juan Pérez",
      },
    },
    Viernes: {
      "8:00 - 9:00": { teacher: "Ana García", subject: "Ciencias", room: "C305", status: "unchanged" },
      "9:00 - 10:00": { teacher: "Carlos Ruiz", subject: "Literatura", room: "A102", status: "unchanged" },
      "10:00 - 11:00": { teacher: "Laura Martínez", subject: "Inglés", room: "B204", status: "unchanged" },
      "11:00 - 12:00": {
        teacher: "Miguel Torres",
        subject: "Física",
        room: "C306",
        status: "new",
        oldTeacher: "Pedro Sánchez",
      },
      "12:00 - 13:00": { teacher: "María López", subject: "Matemáticas", room: "A101", status: "unchanged" },
    },
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
          <span className="text-sm">Asignación nueva</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-white border border-gray-300 rounded dark:bg-gray-800"></div>
          <span className="text-sm">Sin cambios</span>
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
                  return (
                    <TableCell
                      key={`${day}-${hour}`}
                      className={cell.status === "new" ? "bg-green-50 dark:bg-green-950" : ""}
                    >
                      <div className="font-medium">{cell.subject}</div>
                      <div className="text-sm text-muted-foreground">{cell.teacher}</div>
                      {cell.status === "new" && (
                        <Badge
                          variant="outline"
                          className="mt-1 text-xs bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-100 dark:border-green-800"
                        >
                          Reemplaza a: {cell.oldTeacher}
                        </Badge>
                      )}
                      <div className="text-xs text-muted-foreground">Aula: {cell.room}</div>
                    </TableCell>
                  )
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="p-4 border rounded-md bg-muted/50">
        <h3 className="font-medium mb-2">Resumen de Cambios</h3>
        <ul className="space-y-1 text-sm">
          <li>• 3 nuevas asignaciones realizadas</li>
          <li>• 22 asignaciones sin cambios</li>
          <li>• Compatibilidad con criterios: 95%</li>
        </ul>
      </div>
    </div>
  )
}
