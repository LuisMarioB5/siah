"use client"

import type React from "react"
import { useState } from "react"
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Button,
  Grid,
  TextField,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Stack,
} from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { es } from "date-fns/locale"

import SearchIcon from "@mui/icons-material/Search"
import DownloadIcon from "@mui/icons-material/Download"
import InfoIcon from "@mui/icons-material/Info"
import FilterListIcon from "@mui/icons-material/FilterList"

import MultiSelectFilter from "../components/MultiSelectFilter"
import { mockCourses, mockTeachers, mockSubjects } from "../mockData"

// ESTO NO DEJA RENDERIZAR LA PAGINA, TENERLO EN CUENTA
export async function getServerSideProps() {
  return { props: {} };  // Esto evita que la página sea prerenderizada
}

// Mock data for history items
const historyItems = [
  {
    id: 1,
    date: "10/04/2024",
    type: "Sustitución",
    absentTeacher: "María López",
    substituteTeacher: "Roberto Díaz",
    subject: "Matemáticas",
    course: "1B",
    status: "Aprobada",
    reason: "Salud",
    criteria: [
      "Roberto Díaz tiene experiencia previa en la materia de Matemáticas (5 años)",
      "Disponibilidad completa en el horario requerido (30/30 pts)",
      "95% de compatibilidad con los criterios de asignación",
      "Conocimiento previo del curso 1B (15/15 pts)",
      "Menor carga horaria que otros candidatos (10/10 pts)",
      "Puntuación total: 92/100 pts",
    ],
    alternatives: [
      { name: "Elena Gómez", points: 87, reason: "Menor disponibilidad horaria (20/30 pts)" },
      { name: "Miguel Torres", points: 82, reason: "Menor experiencia en la materia (15/25 pts)" },
    ],
  },
  {
    id: 2,
    date: "12/04/2024",
    type: "Sustitución",
    absentTeacher: "Juan Pérez",
    substituteTeacher: "Elena Gómez",
    subject: "Historia",
    course: "2B",
    status: "Aprobada",
    reason: "Personal",
    criteria: [
      "Elena Gómez tiene formación académica en Historia (20/20 pts)",
      "Disponibilidad en horario de mañana (25/30 pts)",
      "87% de compatibilidad con los criterios de asignación",
      "Experiencia previa con el curso 2B (15/15 pts)",
      "Recomendación del departamento académico (10/10 pts)",
      "Puntuación total: 87/100 pts",
    ],
    alternatives: [
      { name: "Roberto Díaz", points: 75, reason: "Menor especialización en Historia (10/20 pts)" },
      { name: "Lucía Fernández", points: 72, reason: "Conflicto de horario parcial (15/30 pts)" },
    ],
  },
  {
    id: 3,
    date: "15/04/2024",
    type: "Sustitución",
    absentTeacher: "Pedro Sánchez",
    substituteTeacher: "Miguel Torres",
    subject: "Física",
    course: "3A",
    status: "Aprobada",
    reason: "Capacitación",
    criteria: [
      "Miguel Torres es especialista en Física (20/20 pts)",
      "Disponibilidad completa en el horario requerido (30/30 pts)",
      "82% de compatibilidad con los criterios de asignación",
      "Menor distancia de desplazamiento entre aulas (15/15 pts)",
      "Continuidad pedagógica con el temario actual (10/10 pts)",
      "Puntuación total: 82/100 pts",
    ],
    alternatives: [
      { name: "Lucía Fernández", points: 78, reason: "Disponibilidad parcial (20/30 pts)" },
      { name: "Roberto Díaz", points: 75, reason: "Menor experiencia con el curso 3A (10/15 pts)" },
    ],
  },
  {
    id: 4,
    date: "05/04/2024",
    type: "Asignación",
    absentTeacher: "-",
    substituteTeacher: "Laura Martínez",
    subject: "Inglés",
    course: "1A",
    status: "Aprobada",
    reason: "Nueva asignación",
    criteria: [
      "Laura Martínez es especialista en Inglés con certificación internacional (20/20 pts)",
      "Disponibilidad completa para el horario asignado (30/30 pts)",
      "Experiencia previa con alumnos de primer año (15/15 pts)",
      "Asignación optimizada para minimizar desplazamientos (15/15 pts)",
      "Balanceo de carga horaria entre docentes del departamento (10/10 pts)",
      "Puntuación total: 90/100 pts",
    ],
    alternatives: [
      { name: "Elena Gómez", points: 75, reason: "Menor especialización en Inglés (10/20 pts)" },
      { name: "Carlos Ruiz", points: 70, reason: "Mayor carga horaria actual (5/10 pts)" },
    ],
  },
  {
    id: 5,
    date: "03/04/2024",
    type: "Sustitución",
    absentTeacher: "Ana García",
    substituteTeacher: "Carlos Ruiz",
    subject: "Ciencias",
    course: "2A",
    status: "Rechazada",
    reason: "Incompatibilidad horaria",
    criteria: [
      "Carlos Ruiz tenía un conflicto de horario con otra clase (0/30 pts)",
      "No se encontraron otros docentes disponibles con la especialidad requerida",
      "Se reprogramó la clase para la semana siguiente",
      "Decisión tomada por el director académico",
      "Puntuación total: 45/100 pts (por debajo del umbral mínimo de 70 pts)",
    ],
    alternatives: [],
  },
  {
    id: 6,
    date: "01/04/2024",
    type: "Asignación",
    absentTeacher: "-",
    substituteTeacher: "Pedro Sánchez",
    subject: "Física",
    course: "2B",
    status: "Reasignada",
    reason: "Cambio de horario",
    criteria: [
      "Cambio en la disponibilidad de aulas (25/25 pts para aula C306)",
      "Optimización del horario para reducir horas libres (15/15 pts)",
      "Mejor distribución de la carga académica (10/10 pts)",
      "Solicitud del departamento de Ciencias (10/10 pts)",
      "Aprobado por la dirección académica",
      "Puntuación total: 85/100 pts",
    ],
    alternatives: [
      { name: "Miguel Torres", points: 80, reason: "Menor experiencia docente (20/25 pts)" },
      { name: "Roberto Díaz", points: 78, reason: "Mayor distancia entre aulas (10/15 pts)" },
    ],
  },
]

export default function Reports() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTypes, setSelectedTypes] = useState<{ id: string; label: string }[]>([])
  const [selectedStatus, setSelectedStatus] = useState<{ id: string; label: string }[]>([])
  const [selectedCourses, setSelectedCourses] = useState<{ id: string; label: string }[]>([])
  const [selectedTeachers, setSelectedTeachers] = useState<{ id: string; label: string }[]>([])
  const [selectedSubjects, setSelectedSubjects] = useState<{ id: string; label: string }[]>([])
  const [openDetailDialog, setOpenDetailDialog] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleViewDetail = (item: any) => {
    setSelectedItem(item)
    setOpenDetailDialog(true)
  }

  const handleCloseDetailDialog = () => {
    setOpenDetailDialog(false)
  }

  const typeOptions = [
    { id: "substitution", label: "Sustitución" },
    { id: "assignment", label: "Asignación" },
  ]

  const statusOptions = [
    { id: "approved", label: "Aprobada" },
    { id: "rejected", label: "Rechazada" },
    { id: "reassigned", label: "Reasignada" },
  ]

  // Filter the history items based on selections
  const filteredItems = historyItems.filter((item) => {
    const matchesSearch =
      searchTerm === "" ||
      item.absentTeacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.substituteTeacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.course.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType =
      selectedTypes.length === 0 || selectedTypes.some((type) => type.label.toLowerCase() === item.type.toLowerCase())

    const matchesStatus =
      selectedStatus.length === 0 ||
      selectedStatus.some((status) => status.label.toLowerCase() === item.status.toLowerCase())

    const matchesCourse = selectedCourses.length === 0 || selectedCourses.some((course) => course.label === item.course)

    const matchesTeacher =
      selectedTeachers.length === 0 ||
      selectedTeachers.some(
        (teacher) => teacher.label === item.absentTeacher || teacher.label === item.substituteTeacher,
      )

    const matchesSubject =
      selectedSubjects.length === 0 || selectedSubjects.some((subject) => subject.label === item.subject)

    const matchesDate =
      !selectedDate ||
      item.date.includes(
        selectedDate
          .toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric" })
          .replace(/\//g, "/"),
      )

    return (
      matchesSearch && matchesType && matchesStatus && matchesCourse && matchesTeacher && matchesSubject && matchesDate
    )
  })

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "aprobada":
        return "success"
      case "rechazada":
        return "error"
      case "reasignada":
        return "warning"
      default:
        return "default"
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Historial de Decisiones
        </Typography>
      </Box>

      <Card>
        <CardHeader
          title="Registro Histórico"
          subheader="Historial detallado de todas las asignaciones y sustituciones realizadas"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Buscar por docente, materia o curso..."
                value={searchTerm}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack direction="row" spacing={2}>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
                  <DatePicker
                    label="Fecha"
                    value={selectedDate}
                    onChange={(newValue) => setSelectedDate(newValue)}
                    slotProps={{ textField: { fullWidth: true, size: "small" } }}
                  />
                </LocalizationProvider>
                <Button variant="outlined" startIcon={<DownloadIcon />} onClick={() => alert("Exportando datos...")}>
                  Exportar
                </Button>
              </Stack>
            </Grid>
          </Grid>

          <Paper sx={{ p: 2, mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
              <FilterListIcon sx={{ mr: 1 }} />
              Filtros Avanzados
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <MultiSelectFilter
                  options={typeOptions}
                  value={selectedTypes}
                  onChange={setSelectedTypes}
                  label="Tipo"
                  placeholder="Todos los tipos"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <MultiSelectFilter
                  options={statusOptions}
                  value={selectedStatus}
                  onChange={setSelectedStatus}
                  label="Estado"
                  placeholder="Todos los estados"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <MultiSelectFilter
                  options={mockCourses}
                  value={selectedCourses}
                  onChange={setSelectedCourses}
                  label="Curso"
                  placeholder="Todos los cursos"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <MultiSelectFilter
                  options={mockTeachers}
                  value={selectedTeachers}
                  onChange={setSelectedTeachers}
                  label="Docente"
                  placeholder="Todos los docentes"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <MultiSelectFilter
                  options={mockSubjects}
                  value={selectedSubjects}
                  onChange={setSelectedSubjects}
                  label="Materia"
                  placeholder="Todas las materias"
                />
              </Grid>
            </Grid>
          </Paper>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="history table">
              <TableHead>
                <TableRow>
                  <TableCell>Fecha</TableCell>
                  <TableCell>Tipo</TableCell>
                  <TableCell>Docente Ausente</TableCell>
                  <TableCell>Docente Asignado</TableCell>
                  <TableCell>Materia</TableCell>
                  <TableCell>Curso</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell align="right">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>{item.absentTeacher}</TableCell>
                    <TableCell>{item.substituteTeacher}</TableCell>
                    <TableCell>{item.subject}</TableCell>
                    <TableCell>
                      <Chip label={item.course} size="small" color="primary" variant="outlined" />
                    </TableCell>
                    <TableCell>
                      <Chip label={item.status} size="small" color={getStatusColor(item.status)} variant="outlined" />
                    </TableCell>
                    <TableCell align="right">
                      <Button startIcon={<InfoIcon />} size="small" onClick={() => handleViewDetail(item)}>
                        Detalles
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <Dialog open={openDetailDialog} onClose={handleCloseDetailDialog} maxWidth="md" fullWidth>
        <DialogTitle>Detalles de la Decisión</DialogTitle>
        <DialogContent dividers>
          {selectedItem && (
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Información General
                  </Typography>
                  <Grid container spacing={1}>
                    <Grid item xs={4}>
                      <Typography variant="body2" color="text.secondary">
                        Tipo:
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="body2">{selectedItem.type}</Typography>
                    </Grid>

                    <Grid item xs={4}>
                      <Typography variant="body2" color="text.secondary">
                        Fecha:
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="body2">{selectedItem.date}</Typography>
                    </Grid>

                    <Grid item xs={4}>
                      <Typography variant="body2" color="text.secondary">
                        Docente Ausente:
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="body2">{selectedItem.absentTeacher}</Typography>
                    </Grid>

                    <Grid item xs={4}>
                      <Typography variant="body2" color="text.secondary">
                        Docente Asignado:
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="body2">{selectedItem.substituteTeacher}</Typography>
                    </Grid>

                    <Grid item xs={4}>
                      <Typography variant="body2" color="text.secondary">
                        Materia:
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="body2">{selectedItem.subject}</Typography>
                    </Grid>

                    <Grid item xs={4}>
                      <Typography variant="body2" color="text.secondary">
                        Curso:
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="body2">{selectedItem.course}</Typography>
                    </Grid>

                    <Grid item xs={4}>
                      <Typography variant="body2" color="text.secondary">
                        Estado:
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Chip
                        label={selectedItem.status}
                        size="small"
                        color={getStatusColor(selectedItem.status)}
                        variant="outlined"
                      />
                    </Grid>

                    <Grid item xs={4}>
                      <Typography variant="body2" color="text.secondary">
                        Motivo:
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="body2">{selectedItem.reason}</Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Criterios de Decisión
                  </Typography>
                  <List dense>
                    {selectedItem.criteria.map((criterion: string, index: number) => (
                      <ListItem key={index} disableGutters>
                        <ListItemText primary={`• ${criterion}`} />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Grid>

              {selectedItem.alternatives.length > 0 && (
                <Grid item xs={12}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      Alternativas Consideradas
                    </Typography>
                    <Grid container spacing={2}>
                      {selectedItem.alternatives.map((alt: any, index: number) => (
                        <Grid item xs={12} md={6} key={index}>
                          <Paper sx={{ p: 2, bgcolor: "rgba(0, 0, 0, 0.02)" }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                              <Typography variant="subtitle2">{alt.name}</Typography>
                              <Chip label={`${alt.points} pts`} size="small" variant="outlined" />
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                              {alt.reason}
                            </Typography>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  </Paper>
                </Grid>
              )}
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetailDialog}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
