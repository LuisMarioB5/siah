"use client"

import type React from "react"
import { useState } from "react"
import {
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  CardHeader,
  Alert,
  AlertTitle,
  Divider,
  Button,
  Stack,
  Tabs,
  Tab,
} from "@mui/material"
import SchoolIcon from "@mui/icons-material/School"
import PersonIcon from "@mui/icons-material/Person"
import MenuBookIcon from "@mui/icons-material/MenuBook"
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import AddIcon from "@mui/icons-material/Add"
import DownloadIcon from "@mui/icons-material/Download"

import StatCard from "../components/StatCard"
import MultiSelectFilter from "../components/MultiSelectFilter"
import ScheduleTable from "../components/ScheduleTable"
import { mockScheduleData, mockCourses, mockTeachers, mockDays } from "../mockData"

export default function Dashboard() {
  const [selectedCourses, setSelectedCourses] = useState<{ id: string; label: string }[]>([])
  const [selectedTeachers, setSelectedTeachers] = useState<{ id: string; label: string }[]>([])
  const [selectedDays, setSelectedDays] = useState<{ id: string; label: string }[]>([])
  const [viewType, setViewType] = useState<"week" | "day">("week")

  const handleViewTypeChange = (event: React.SyntheticEvent, newValue: "week" | "day") => {
    setViewType(newValue)
  }

  // Filter the schedule data based on selections
  const filteredDays =
    selectedDays.length > 0
      ? mockDays.filter((day) => selectedDays.some((selected) => selected.id === day.id)).map((day) => day.label)
      : mockDays.map((day) => day.label)

  const hours = [
    "7:30 - 8:20",
    "8:20 - 9:10",
    "9:10 - 10:00",
    "10:00 - 10:30",
    "10:30 - 11:20",
    "11:20 - 12:10",
    "12:10 - 13:00",
  ]

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => alert("Navegando a la pantalla de Asignación")}
          >
            Nueva Asignación
          </Button>
          <Button
            variant="outlined"
            startIcon={<PersonRemoveIcon />}
            onClick={() => alert("Navegando a la pantalla de Sustitución")}
          >
            Nueva Sustitución
          </Button>
        </Stack>
      </Box>

      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Cursos Activos"
            value="12"
            icon={<SchoolIcon fontSize="inherit" />}
            subtitle="3 niveles educativos"
            color="primary.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Docentes Asignados"
            value="45"
            icon={<PersonIcon fontSize="inherit" />}
            subtitle="92% con horario completo"
            color="success.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Asignaturas"
            value="28"
            icon={<MenuBookIcon fontSize="inherit" />}
            subtitle="100% asignadas"
            color="info.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Sustituciones Recientes"
            value="5"
            icon={<PersonRemoveIcon fontSize="inherit" />}
            subtitle="En los últimos 7 días"
            color="warning.main"
          />
        </Grid>

        {/* Alert */}
        <Grid item xs={12}>
          <Alert severity="warning">
            <AlertTitle>Atención requerida</AlertTitle>
            Hay 3 docentes que han reportado ausencias para esta semana. Se requiere asignar sustitutos.
          </Alert>
        </Grid>

        {/* Current Schedule */}
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Horario Actual" subheader="Vista general del horario de clases para la semana actual" />
            <Divider />
            <CardContent>
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12} md={4}>
                  <MultiSelectFilter
                    options={mockCourses}
                    value={selectedCourses}
                    onChange={setSelectedCourses}
                    label="Filtrar por Curso"
                    placeholder="Todos los cursos"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <MultiSelectFilter
                    options={mockTeachers}
                    value={selectedTeachers}
                    onChange={setSelectedTeachers}
                    label="Filtrar por Docente"
                    placeholder="Todos los docentes"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <MultiSelectFilter
                    options={mockDays}
                    value={selectedDays}
                    onChange={setSelectedDays}
                    label="Filtrar por Día"
                    placeholder="Todos los días"
                  />
                </Grid>
              </Grid>

              <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
                <Tabs value={viewType} onChange={handleViewTypeChange} aria-label="schedule view type">
                  <Tab label="Vista Semanal" value="week" />
                  <Tab label="Vista Diaria" value="day" />
                </Tabs>
              </Box>

              <ScheduleTable
                scheduleData={mockScheduleData}
                days={filteredDays}
                hours={hours}
                onEditCell={(day, hour, cell) => {
                  alert(`Editar celda: ${day} ${hour}`)
                }}
              />

              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Button variant="outlined" startIcon={<DownloadIcon />} size="small">
                  Exportar horario
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
