import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface CurrentScheduleProps {
  viewType: "week" | "day"
  searchQuery: string
  selectedCourses: string[]
  selectedTeachers: string[]
  selectedDays: string[]
}

export function CurrentSchedule({
  viewType,
  searchQuery,
  selectedCourses,
  selectedTeachers,
  selectedDays,
}: CurrentScheduleProps) {
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

  // Sample data - in a real app this would come from your backend
  const schedule = {
    Lunes: {
      "7:30 - 8:20": [
        { teacher: "María López", subject: "Matemáticas", room: "A101", course: "1A" },
        { teacher: "Juan Pérez", subject: "Historia", room: "B203", course: "2A" },
        { teacher: "Ana García", subject: "Ciencias", room: "C305", course: "3A" },
      ],
      "8:20 - 9:10": [
        { teacher: "María López", subject: "Matemáticas", room: "A101", course: "1A" },
        { teacher: "Juan Pérez", subject: "Historia", room: "B203", course: "2A" },
        { teacher: "Ana García", subject: "Ciencias", room: "C305", course: "3A" },
      ],
      "9:10 - 10:00": [
        { teacher: "Carlos Ruiz", subject: "Literatura", room: "A102", course: "1B" },
        { teacher: "Laura Martínez", subject: "Inglés", room: "B204", course: "2B" },
        { teacher: "Pedro Sánchez", subject: "Física", room: "C306", course: "3B" },
      ],
      "10:00 - 10:30": [{ isBreak: true, name: "RECESO" }],
      "10:30 - 11:20": [
        { teacher: "María López", subject: "Matemáticas", room: "A101", course: "2B" },
        { teacher: "Juan Pérez", subject: "Historia", room: "B203", course: "3B" },
        { teacher: "Ana García", subject: "Ciencias", room: "C305", course: "1B" },
      ],
      "11:20 - 12:10": [
        { teacher: "Carlos Ruiz", subject: "Literatura", room: "A102", course: "3A" },
        { teacher: "Laura Martínez", subject: "Inglés", room: "B204", course: "1A" },
        { teacher: "Pedro Sánchez", subject: "Física", room: "C306", course: "2A" },
      ],
      "12:10 - 13:00": [
        { teacher: "María López", subject: "Matemáticas", room: "A101", course: "3B", alert: true },
        { teacher: "Juan Pérez", subject: "Historia", room: "B203", course: "1B" },
        { teacher: "Ana García", subject: "Ciencias", room: "C305", course: "2B" },
      ],
    },
    Martes: {
      "7:30 - 8:20": [
        { teacher: "Pedro Sánchez", subject: "Física", room: "C306", course: "1A" },
        { teacher: "María López", subject: "Matemáticas", room: "A101", course: "2A" },
        { teacher: "Juan Pérez", subject: "Historia", room: "B203", course: "3A" },
      ],
      "8:20 - 9:10": [
        { teacher: "Pedro Sánchez", subject: "Física", room: "C306", course: "1A" },
        { teacher: "María López", subject: "Matemáticas", room: "A101", course: "2A" },
        { teacher: "Juan Pérez", subject: "Historia", room: "B203", course: "3A" },
      ],
      "9:10 - 10:00": [
        { teacher: "Ana García", subject: "Ciencias", room: "C305", course: "1B" },
        { teacher: "Carlos Ruiz", subject: "Literatura", room: "A102", course: "2B" },
        { teacher: "Laura Martínez", subject: "Inglés", room: "B204", course: "3B" },
      ],
      "10:00 - 10:30": [{ isBreak: true, name: "RECESO" }],
      "10:30 - 11:20": [
        { teacher: "Pedro Sánchez", subject: "Física", room: "C306", course: "2B" },
        { teacher: "María López", subject: "Matemáticas", room: "A101", course: "3B" },
        { teacher: "Juan Pérez", subject: "Historia", room: "B203", course: "1B" },
      ],
      "11:20 - 12:10": [
        { teacher: "Ana García", subject: "Ciencias", room: "C305", course: "3A" },
        { teacher: "Carlos Ruiz", subject: "Literatura", room: "A102", course: "1A" },
        { teacher: "Laura Martínez", subject: "Inglés", room: "B204", course: "2A" },
      ],
      "12:10 - 13:00": [
        { teacher: "Pedro Sánchez", subject: "Física", room: "C306", course: "3B" },
        { teacher: "María López", subject: "Matemáticas", room: "A101", course: "1B" },
        { teacher: "Juan Pérez", subject: "Historia", room: "B203", course: "2B", alert: true },
      ],
    },
    Miércoles: {
      "7:30 - 8:20": [
        { teacher: "Laura Martínez", subject: "Inglés", room: "B204", course: "1A" },
        { teacher: "Pedro Sánchez", subject: "Física", room: "C306", course: "2A" },
        { teacher: "María López", subject: "Matemáticas", room: "A101", course: "3A" },
      ],
      "8:20 - 9:10": [
        { teacher: "Laura Martínez", subject: "Inglés", room: "B204", course: "1A" },
        { teacher: "Pedro Sánchez", subject: "Física", room: "C306", course: "2A" },
        { teacher: "María López", subject: "Matemáticas", room: "A101", course: "3A" },
      ],
      "9:10 - 10:00": [
        { teacher: "Juan Pérez", subject: "Historia", room: "B203", course: "1B" },
        { teacher: "Ana García", subject: "Ciencias", room: "C305", course: "2B" },
        { teacher: "Carlos Ruiz", subject: "Literatura", room: "A102", course: "3B" },
      ],
      "10:00 - 10:30": [{ isBreak: true, name: "RECESO" }],
      "10:30 - 11:20": [
        { teacher: "Laura Martínez", subject: "Inglés", room: "B204", course: "2B" },
        { teacher: "Pedro Sánchez", subject: "Física", room: "C306", course: "3B" },
        { teacher: "María López", subject: "Matemáticas", room: "A101", course: "1B", alert: true },
      ],
      "11:20 - 12:10": [
        { teacher: "Juan Pérez", subject: "Historia", room: "B203", course: "3A" },
        { teacher: "Ana García", subject: "Ciencias", room: "C305", course: "1A" },
        { teacher: "Carlos Ruiz", subject: "Literatura", room: "A102", course: "2A" },
      ],
      "12:10 - 13:00": [
        { teacher: "Laura Martínez", subject: "Inglés", room: "B204", course: "3B" },
        { teacher: "Pedro Sánchez", subject: "Física", room: "C306", course: "1B" },
        { teacher: "María López", subject: "Matemáticas", room: "A101", course: "2B" },
      ],
    },
    Jueves: {
      "7:30 - 8:20": [
        { teacher: "Carlos Ruiz", subject: "Literatura", room: "A102", course: "1A" },
        { teacher: "Laura Martínez", subject: "Inglés", room: "B204", course: "2A" },
        { teacher: "Pedro Sánchez", subject: "Física", room: "C306", course: "3A" },
      ],
      "8:20 - 9:10": [
        { teacher: "Carlos Ruiz", subject: "Literatura", room: "A102", course: "1A" },
        { teacher: "Laura Martínez", subject: "Inglés", room: "B204", course: "2A" },
        { teacher: "Pedro Sánchez", subject: "Física", room: "C306", course: "3A" },
      ],
      "9:10 - 10:00": [
        { teacher: "María López", subject: "Matemáticas", room: "A101", course: "1B" },
        { teacher: "Juan Pérez", subject: "Historia", room: "B203", course: "2B" },
        { teacher: "Ana García", subject: "Ciencias", room: "C305", course: "3B" },
      ],
      "10:00 - 10:30": [{ isBreak: true, name: "RECESO" }],
      "10:30 - 11:20": [
        { teacher: "Carlos Ruiz", subject: "Literatura", room: "A102", course: "2B" },
        { teacher: "Laura Martínez", subject: "Inglés", room: "B204", course: "3B" },
        { teacher: "Pedro Sánchez", subject: "Física", room: "C306", course: "1B" },
      ],
      "11:20 - 12:10": [
        { teacher: "María López", subject: "Matemáticas", room: "A101", course: "3A" },
        { teacher: "Juan Pérez", subject: "Historia", room: "B203", course: "1A" },
        { teacher: "Ana García", subject: "Ciencias", room: "C305", course: "2A" },
      ],
      "12:10 - 13:00": [
        { teacher: "Carlos Ruiz", subject: "Literatura", room: "A102", course: "3B" },
        { teacher: "Laura Martínez", subject: "Inglés", room: "B204", course: "1B" },
        { teacher: "Pedro Sánchez", subject: "Física", room: "C306", course: "2B" },
      ],
    },
    Viernes: {
      "7:30 - 8:20": [
        { teacher: "Ana García", subject: "Ciencias", room: "C305", course: "1A" },
        { teacher: "Carlos Ruiz", subject: "Literatura", room: "A102", course: "2A" },
        { teacher: "Laura Martínez", subject: "Inglés", room: "B204", course: "3A" },
      ],
      "8:20 - 9:10": [
        { teacher: "Ana García", subject: "Ciencias", room: "C305", course: "1A" },
        { teacher: "Carlos Ruiz", subject: "Literatura", room: "A102", course: "2A" },
        { teacher: "Laura Martínez", subject: "Inglés", room: "B204", course: "3A" },
      ],
      "9:10 - 10:00": [
        { teacher: "Pedro Sánchez", subject: "Física", room: "C306", course: "1B" },
        { teacher: "María López", subject: "Matemáticas", room: "A101", course: "2B" },
        { teacher: "Juan Pérez", subject: "Historia", room: "B203", course: "3B" },
      ],
      "10:00 - 10:30": [{ isBreak: true, name: "RECESO" }],
      "10:30 - 11:20": [
        { teacher: "Ana García", subject: "Ciencias", room: "C305", course: "2B" },
        { teacher: "Carlos Ruiz", subject: "Literatura", room: "A102", course: "3B" },
        { teacher: "Laura Martínez", subject: "Inglés", room: "B204", course: "1B" },
      ],
      "11:20 - 12:10": [
        { teacher: "Pedro Sánchez", subject: "Física", room: "C306", course: "3A", alert: true },
        { teacher: "María López", subject: "Matemáticas", room: "A101", course: "1A" },
        { teacher: "Juan Pérez", subject: "Historia", room: "B203", course: "2A" },
      ],
      "12:10 - 13:00": [
        { teacher: "Ana García", subject: "Ciencias", room: "C305", course: "3B" },
        { teacher: "Carlos Ruiz", subject: "Literatura", room: "A102", course: "1B" },
        { teacher: "Laura Martínez", subject: "Inglés", room: "B204", course: "2B" },
      ],
    },
  }

  // Filter the schedule based on the selected filters
  const filteredSchedule = { ...schedule }

  // Apply day filter
  const displayDays =
    selectedDays.length > 0
      ? days.filter((day) => selectedDays.includes(day.toLowerCase()))
      : viewType === "day"
        ? [days[0]]
        : days

  // For search query, we'll filter the cells
  const filterCell = (cell: any) => {
    if (cell.isBreak) return true

    const matchesSearch =
      searchQuery === "" ||
      cell.teacher.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cell.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cell.room.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCourse = selectedCourses.length === 0 || selectedCourses.includes(cell.course)

    const teachers = [
      { value: "maria-lopez", label: "María López" },
      { value: "juan-perez", label: "Juan Pérez" },
      { value: "ana-garcia", label: "Ana García" },
      { value: "carlos-ruiz", label: "Carlos Ruiz" },
      { value: "laura-martinez", label: "Laura Martínez" },
      { value: "pedro-sanchez", label: "Pedro Sánchez" },
    ]

    const matchesTeacher =
      selectedTeachers.length === 0 ||
      selectedTeachers.some((teacherId) => {
        const teacherName = teachers.find((t) => t.value === teacherId)?.label
        return teacherName && cell.teacher.includes(teacherName)
      })

    return matchesSearch && matchesCourse && matchesTeacher
  }

  return (
    <div className="rounded-md border overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Hora</TableHead>
            {displayDays.map((day) => (
              <TableHead key={day}>{day}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {hours.map((hour) => (
            <TableRow key={hour}>
              <TableCell className="font-medium">{hour}</TableCell>
              {displayDays.map((day) => {
                const cells = schedule[day][hour]

                // Check if this is a break period
                if (cells.length === 1 && cells[0].isBreak) {
                  return (
                    <TableCell
                      key={`${day}-${hour}`}
                      className="bg-muted/50 text-center font-medium"
                      colSpan={displayDays.length}
                    >
                      {cells[0].name}
                    </TableCell>
                  )
                }

                // Filter cells based on filters
                const filteredCells = cells.filter(filterCell)

                return (
                  <TableCell key={`${day}-${hour}`} className="p-0">
                    <div className="grid gap-1 p-1">
                      {filteredCells.length > 0 ? (
                        filteredCells.map((cell, index) => (
                          <div
                            key={index}
                            className={cn("p-2 rounded-md", cell.alert ? "bg-red-50 dark:bg-red-950" : "bg-card")}
                          >
                            <div className="flex items-center justify-between">
                              <div className="font-medium">{cell.subject}</div>
                              <Badge variant="outline" className="ml-2">
                                {cell.course}
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground">{cell.teacher}</div>
                            <div className="text-xs text-muted-foreground">Aula: {cell.room}</div>
                          </div>
                        ))
                      ) : (
                        <div className="p-2 text-center text-sm text-muted-foreground">No hay clases</div>
                      )}
                    </div>
                  </TableCell>
                )
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
