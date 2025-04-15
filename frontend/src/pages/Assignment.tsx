"use client"

import { Tooltip } from "@/components/ui/tooltip"

import type React from "react"
import { useState } from "react"
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Tabs,
  Tab,
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Slider,
  Stack,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import DeleteIcon from "@mui/icons-material/Delete"
import InfoIcon from "@mui/icons-material/Info"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import EditIcon from "@mui/icons-material/Edit"

import MultiSelectFilter from "../components/MultiSelectFilter"
import ScheduleTable from "../components/ScheduleTable"
import { mockCourses, mockTeachers, mockSubjects, mockClassrooms, mockDays, mockScheduleData } from "../mockData"

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`assignment-tabpanel-${index}`}
      aria-labelledby={`assignment-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `assignment-tab-${index}`,
    "aria-controls": `assignment-tabpanel-${index}`,
  }
}

export default function Assignment() {
  const [tabValue, setTabValue] = useState(0)
  const [showPreview, setShowPreview] = useState(false)
  const [timeBlocks, setTimeBlocks] = useState([
    { id: 1, type: "class", startTime: "07:30", endTime: "08:20", label: "Bloque 1" },
    { id: 2, type: "class", startTime: "08:20", endTime: "09:10", label: "Bloque 2" },
    { id: 3, type: "class", startTime: "09:10", endTime: "10:00", label: "Bloque 3" },
    { id: 4, type: "break", startTime: "10:00", endTime: "10:30", label: "Receso" },
    { id: 5, type: "class", startTime: "10:30", endTime: "11:20", label: "Bloque 4" },
    { id: 6, type: "class", startTime: "11:20", endTime: "12:10", label: "Bloque 5" },
    { id: 7, type: "class", startTime: "12:10", endTime: "13:00", label: "Bloque 6" },
  ])
  const [selectedSubjects, setSelectedSubjects] = useState<{ id: string; label: string }[]>([])
  const [selectedTeachers, setSelectedTeachers] = useState<{ id: string; label: string }[]>([])
  const [selectedDays, setSelectedDays] = useState<{ id: string; label: string }[]>([])
  const [selectedClassrooms, setSelectedClassrooms] = useState<{ id: string; label: string }[]>([])
  const [editMode, setEditMode] = useState(false)
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [currentCell, setCurrentCell] = useState<any>(null)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const handleAddTimeBlock = () => {
    const newId = Math.max(...timeBlocks.map((block) => block.id)) + 1
    setTimeBlocks([
      ...timeBlocks,
      {
        id: newId,
        type: "class",
        startTime: "13:00",
        endTime: "13:50",
        label: `Bloque ${timeBlocks.filter((b) => b.type === "class").length + 1}`,
      },
    ])
  }

  const handleDeleteTimeBlock = (id: number) => {
    setTimeBlocks(timeBlocks.filter((block) => block.id !== id))
  }

  const handleTimeBlockChange = (id: number, field: string, value: string) => {
    setTimeBlocks(timeBlocks.map((block) => (block.id === id ? { ...block, [field]: value } : block)))
  }

  const handleGeneratePreview = () => {
    setShowPreview(true)
  }

  const handleBackToConfig = () => {
    setShowPreview(false)
  }

  const handleEditCell = (day: string, hour: string, cell: any) => {
    setCurrentCell({ day, hour, ...cell })
    setOpenEditDialog(true)
  }

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false)
    setCurrentCell(null)
  }

  const days = mockDays.map((day) => day.label)
  const hours = [
    "7:30 - 8:20",
    "8:20 - 9:10",
    "9:10 - 10:00",
    "10:00 - 10:30",
    "10:30 - 11:20",
    "11:20 - 12:10",
    "12:10 - 13:00",
  ]

  if (showPreview) {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Vista Previa de Asignación
          </Typography>
        </Box>

        <Card>
          <CardHeader
            title="Horario Generado"
            subheader="Horario generado para el curso 1° A"
            action={
              <Button
                variant={editMode ? "contained" : "outlined"}
                startIcon={<EditIcon />}
                onClick={() => setEditMode(!editMode)}
                size="small"
              >
                {editMode ? "Editando" : "Editar Manualmente"}
              </Button>
            }
          />
          <Divider />
          <CardContent>
            <Box sx={{ mb: 2 }}>
              <Button startIcon={<ArrowBackIcon />} onClick={handleBackToConfig} variant="text">
                Volver a configuración
              </Button>
            </Box>

            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  sx={{
                    width: 16,
                    height: 16,
                    bgcolor: "rgba(76, 175, 80, 0.1)",
                    border: "1px solid #4caf50",
                    borderRadius: 1,
                  }}
                />
                <Typography variant="body2">Asignación nueva</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  sx={{
                    width: 16,
                    height: 16,
                    bgcolor: "rgba(255, 152, 0, 0.1)",
                    border: "1px solid #ff9800",
                    borderRadius: 1,
                  }}
                />
                <Typography variant="body2">Editado manualmente</Typography>
              </Box>
            </Box>

            <ScheduleTable
              scheduleData={mockScheduleData}
              days={days}
              hours={hours}
              onEditCell={editMode ? handleEditCell : undefined}
              showPoints={true}
            />

            <Paper sx={{ p: 2, mt: 3, bgcolor: "rgba(0, 0, 0, 0.02)" }}>
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                <InfoIcon color="info" />
                <Box>
                  <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                    Criterios de Asignación
                  </Typography>
                  <List dense disablePadding>
                    <ListItem disablePadding>
                      <ListItemText primary="• Se priorizó la disponibilidad de los docentes (90%)" />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemText primary="• Se consideró la experiencia en la materia (80%)" />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemText primary="• Se balanceó la carga horaria entre docentes" />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemText primary="• Se minimizaron los desplazamientos entre aulas" />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemText primary="• Se priorizaron horas consecutivas para la misma materia" />
                    </ListItem>
                  </List>
                </Box>
              </Box>
            </Paper>
          </CardContent>
          <Divider />
          <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
            <Button variant="outlined" onClick={handleBackToConfig}>
              Modificar Parámetros
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<CheckCircleIcon />}
              onClick={() => alert("Asignación confirmada")}
            >
              Confirmar Asignación
            </Button>
          </Box>
        </Card>

        <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
          <DialogTitle>Editar Asignación</DialogTitle>
          <DialogContent>
            <DialogContentText>{currentCell && `${currentCell.day}, ${currentCell.hour}`}</DialogContentText>
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Materia</InputLabel>
                    <Select value={currentCell?.subject || ""} label="Materia">
                      {mockSubjects.map((subject) => (
                        <MenuItem key={subject.id} value={subject.label}>
                          {subject.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Docente</InputLabel>
                    <Select value={currentCell?.teacher || ""} label="Docente">
                      {mockTeachers.map((teacher) => (
                        <MenuItem key={teacher.id} value={teacher.label}>
                          {teacher.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Aula</InputLabel>
                    <Select value={currentCell?.room || ""} label="Aula">
                      {mockClassrooms.map((classroom) => (
                        <MenuItem key={classroom.id} value={classroom.label}>
                          {classroom.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditDialog}>Cancelar</Button>
            <Button onClick={handleCloseEditDialog} variant="contained">
              Guardar Cambios
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    )
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Asignación Inteligente
        </Typography>
      </Box>

      <Card>
        <CardHeader
          title="Configuración de Asignación"
          subheader="Configure los parámetros para la asignación automática de docentes a materias y horarios"
        />
        <Divider />
        <CardContent>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="assignment tabs">
              <Tab label="Información Básica" {...a11yProps(0)} />
              <Tab label="Horarios" {...a11yProps(1)} />
              <Tab label="Criterios" {...a11yProps(2)} />
            </Tabs>
          </Box>

          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Stack spacing={3}>
                  <FormControl fullWidth>
                    <InputLabel id="course-select-label">Curso</InputLabel>
                    <Select labelId="course-select-label" id="course-select" label="Curso" defaultValue="1A">
                      {mockCourses.map((course) => (
                        <MenuItem key={course.id} value={course.id}>
                          {course.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <MultiSelectFilter
                    options={mockSubjects}
                    value={selectedSubjects}
                    onChange={setSelectedSubjects}
                    label="Materias"
                    placeholder="Seleccionar materias"
                    size="medium"
                  />

                  <MultiSelectFilter
                    options={mockDays}
                    value={selectedDays}
                    onChange={setSelectedDays}
                    label="Días"
                    placeholder="Seleccionar días"
                    size="medium"
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack spacing={3}>
                  <MultiSelectFilter
                    options={mockTeachers}
                    value={selectedTeachers}
                    onChange={setSelectedTeachers}
                    label="Docentes Disponibles"
                    placeholder="Seleccionar docentes"
                    size="medium"
                  />

                  <MultiSelectFilter
                    options={mockClassrooms}
                    value={selectedClassrooms}
                    onChange={setSelectedClassrooms}
                    label="Aulas Disponibles"
                    placeholder="Seleccionar aulas"
                    size="medium"
                  />

                  <Paper sx={{ p: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      Requisitos Especiales
                    </Typography>
                    <FormGroup>
                      <FormControlLabel control={<Checkbox />} label="Requiere laboratorio" />
                      <FormControlLabel control={<Checkbox defaultChecked />} label="Requiere proyector" />
                      <FormControlLabel control={<Checkbox />} label="Requiere computadoras" />
                      <FormControlLabel control={<Checkbox />} label="Requiere equipamiento especial" />
                    </FormGroup>
                  </Paper>
                </Stack>
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
                Bloques de Tiempo
                <Tooltip title="Configure los bloques de tiempo para las clases y recesos. Puede agregar, eliminar y modificar bloques según sea necesario.">
                  <IconButton size="small" sx={{ ml: 1 }}>
                    <InfoIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Typography>
            </Box>

            <Stack spacing={2}>
              {timeBlocks.map((block) => (
                <Paper key={block.id} sx={{ p: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={2}>
                      <FormControl fullWidth size="small">
                        <InputLabel>Tipo</InputLabel>
                        <Select
                          value={block.type}
                          label="Tipo"
                          onChange={(e) => handleTimeBlockChange(block.id, "type", e.target.value)}
                        >
                          <MenuItem value="class">Clase</MenuItem>
                          <MenuItem value="break">Receso</MenuItem>
                          <MenuItem value="lunch">Almuerzo</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} sm={2}>
                      <TextField
                        label="Inicio"
                        type="time"
                        value={block.startTime}
                        onChange={(e) => handleTimeBlockChange(block.id, "startTime", e.target.value)}
                        fullWidth
                        size="small"
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={6} sm={2}>
                      <TextField
                        label="Fin"
                        type="time"
                        value={block.endTime}
                        onChange={(e) => handleTimeBlockChange(block.id, "endTime", e.target.value)}
                        fullWidth
                        size="small"
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={9} sm={5}>
                      <TextField
                        label="Etiqueta"
                        value={block.label}
                        onChange={(e) => handleTimeBlockChange(block.id, "label", e.target.value)}
                        fullWidth
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={3} sm={1} sx={{ display: "flex", justifyContent: "center" }}>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteTimeBlock(block.id)}
                        disabled={timeBlocks.length <= 1}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Paper>
              ))}

              <Button variant="outlined" startIcon={<AddIcon />} onClick={handleAddTimeBlock} fullWidth>
                Agregar Bloque
              </Button>
            </Stack>

            <Paper sx={{ p: 2, mt: 3, bgcolor: "rgba(0, 0, 0, 0.02)" }}>
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                <InfoIcon color="info" />
                <Box>
                  <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                    Configuración de Horarios Flexibles
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Los bloques de tiempo definidos como "Receso" o "Almuerzo" serán excluidos automáticamente de la
                    asignación de clases. El sistema respetará estos intervalos al generar el horario.
                  </Typography>
                  <Typography variant="body2">
                    Puede agregar tantos bloques como necesite y reorganizarlos según los requerimientos del centro
                    educativo.
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
                  Sistema de Puntos para Docentes
                  <Tooltip title="Ajuste la importancia de cada criterio para la asignación automática de docentes. El sistema calculará una puntuación total para cada docente basada en estos criterios.">
                    <IconButton size="small" sx={{ ml: 1 }}>
                      <InfoIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Typography>

                <Stack spacing={3} sx={{ mt: 2 }}>
                  <Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                      <Typography variant="body2">Antigüedad Docente</Typography>
                      <Typography variant="body2" fontWeight="medium">
                        70%
                      </Typography>
                    </Box>
                    <Slider defaultValue={70} step={10} marks min={0} max={100} valueLabelDisplay="auto" />
                    <Typography variant="caption" color="text.secondary">
                      Prioriza a docentes con mayor antigüedad en la institución (25 puntos máx).
                    </Typography>
                  </Box>

                  <Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                      <Typography variant="body2">Disponibilidad</Typography>
                      <Typography variant="body2" fontWeight="medium">
                        90%
                      </Typography>
                    </Box>
                    <Slider defaultValue={90} step={10} marks min={0} max={100} valueLabelDisplay="auto" />
                    <Typography variant="caption" color="text.secondary">
                      Considera la disponibilidad horaria de los docentes (30 puntos máx).
                    </Typography>
                  </Box>

                  <Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                      <Typography variant="body2">Experiencia en la Materia</Typography>
                      <Typography variant="body2" fontWeight="medium">
                        80%
                      </Typography>
                    </Box>
                    <Slider defaultValue={80} step={10} marks min={0} max={100} valueLabelDisplay="auto" />
                    <Typography variant="caption" color="text.secondary">
                      Prioriza a docentes con más experiencia en la materia específica (25 puntos máx).
                    </Typography>
                  </Box>

                  <Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                      <Typography variant="body2">Especialidad</Typography>
                      <Typography variant="body2" fontWeight="medium">
                        85%
                      </Typography>
                    </Box>
                    <Slider defaultValue={85} step={10} marks min={0} max={100} valueLabelDisplay="auto" />
                    <Typography variant="caption" color="text.secondary">
                      Valora la formación académica y especialización del docente (20 puntos máx).
                    </Typography>
                  </Box>
                </Stack>

                <Typography variant="h6" gutterBottom sx={{ mt: 4, display: "flex", alignItems: "center" }}>
                  Sistema de Puntos para Aulas
                  <Tooltip title="Ajuste la importancia de cada criterio para la asignación de aulas. El sistema evaluará que el aula cumpla con los requisitos físicos y técnicos necesarios.">
                    <IconButton size="small" sx={{ ml: 1 }}>
                      <InfoIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Typography>

                <Stack spacing={3} sx={{ mt: 2 }}>
                  <Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                      <Typography variant="body2">Capacidad</Typography>
                      <Typography variant="body2" fontWeight="medium">
                        75%
                      </Typography>
                    </Box>
                    <Slider defaultValue={75} step={10} marks min={0} max={100} valueLabelDisplay="auto" />
                    <Typography variant="caption" color="text.secondary">
                      Evalúa si el aula tiene capacidad suficiente para el grupo (20 puntos máx).
                    </Typography>
                  </Box>

                  <Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                      <Typography variant="body2">Equipamiento</Typography>
                      <Typography variant="body2" fontWeight="medium">
                        85%
                      </Typography>
                    </Box>
                    <Slider defaultValue={85} step={10} marks min={0} max={100} valueLabelDisplay="auto" />
                    <Typography variant="caption" color="text.secondary">
                      Verifica que el aula cuente con el equipamiento necesario (25 puntos máx).
                    </Typography>
                  </Box>

                  <Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                      <Typography variant="body2">Ubicación</Typography>
                      <Typography variant="body2" fontWeight="medium">
                        60%
                      </Typography>
                    </Box>
                    <Slider defaultValue={60} step={10} marks min={0} max={100} valueLabelDisplay="auto" />
                    <Typography variant="caption" color="text.secondary">
                      Considera la ubicación del aula para minimizar desplazamientos (15 puntos máx).
                    </Typography>
                  </Box>
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Opciones Avanzadas
                </Typography>

                <Paper sx={{ p: 2, mb: 3 }}>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label={
                        <Box>
                          <Typography variant="body2">Balancear carga horaria</Typography>
                          <Typography variant="caption" color="text.secondary">
                            Distribuye equitativamente las horas entre docentes (+10 puntos).
                          </Typography>
                        </Box>
                      }
                    />
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label={
                        <Box>
                          <Typography variant="body2">Minimizar desplazamientos</Typography>
                          <Typography variant="caption" color="text.secondary">
                            Reduce cambios de aula para docentes en horas consecutivas (+15 puntos).
                          </Typography>
                        </Box>
                      }
                    />
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label={
                        <Box>
                          <Typography variant="body2">Priorizar horas consecutivas</Typography>
                          <Typography variant="caption" color="text.secondary">
                            Asigna bloques consecutivos de la misma materia cuando sea posible (+10 puntos).
                          </Typography>
                        </Box>
                      }
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label={
                        <Box>
                          <Typography variant="body2">Priorizar especialización</Typography>
                          <Typography variant="caption" color="text.secondary">
                            Da mayor peso a la especialización del docente sobre otros criterios (+20 puntos).
                          </Typography>
                        </Box>
                      }
                    />
                  </FormGroup>
                </Paper>

                <TextField
                  label="Máximo de Horas por Docente"
                  type="number"
                  defaultValue={20}
                  fullWidth
                  sx={{ mb: 3 }}
                  InputProps={{ inputProps: { min: 1, max: 40 } }}
                  helperText="Límite de horas semanales que puede tener asignado un docente."
                />

                <TextField
                  label="Umbral Mínimo de Puntos"
                  type="number"
                  defaultValue={70}
                  fullWidth
                  sx={{ mb: 3 }}
                  InputProps={{ inputProps: { min: 0, max: 100 } }}
                  helperText="Puntuación mínima requerida para considerar una asignación como válida (0-100)."
                />

                <TextField
                  label="Notas Adicionales"
                  multiline
                  rows={4}
                  fullWidth
                  placeholder="Ingrese cualquier información adicional relevante para la asignación"
                />
              </Grid>
            </Grid>
          </TabPanel>
        </CardContent>
        <Divider />
        <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
          <Button variant="outlined">Cancelar</Button>
          <Box>
            {tabValue !== 0 && (
              <Button variant="outlined" sx={{ mr: 1 }} onClick={() => setTabValue(tabValue - 1)}>
                Anterior
              </Button>
            )}
            {tabValue !== 2 ? (
              <Button variant="contained" onClick={() => setTabValue(tabValue + 1)}>
                Siguiente
              </Button>
            ) : (
              <Button variant="contained" color="primary" onClick={handleGeneratePreview}>
                Generar Vista Previa
              </Button>
            )}
          </Box>
        </Box>
      </Card>
    </Box>
  )
}
