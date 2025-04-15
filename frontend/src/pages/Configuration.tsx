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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Switch,
  Slider,
  Stack,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  Tabs,
  Tab,
  Alert,
  Tooltip,
  IconButton,
} from "@mui/material"
import SaveIcon from "@mui/icons-material/Save"
import RestoreIcon from "@mui/icons-material/Restore"
import SchoolIcon from "@mui/icons-material/School"
import PersonIcon from "@mui/icons-material/Person"
import MenuBookIcon from "@mui/icons-material/MenuBook"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import CalculateIcon from "@mui/icons-material/Calculate"
import NotificationsIcon from "@mui/icons-material/Notifications"
import SecurityIcon from "@mui/icons-material/Security"
import InfoIcon from "@mui/icons-material/Info"

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
      id={`config-tabpanel-${index}`}
      aria-labelledby={`config-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  )
}

export default function Configuration() {
  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Configuración del Sistema
        </Typography>
      </Box>

      <Alert severity="info" sx={{ mb: 3 }}>
        Esta sección permite configurar los parámetros generales del sistema SIASH. Los cambios realizados aquí
        afectarán el comportamiento global del sistema.
      </Alert>

      <Card>
        <CardHeader
          title="Parámetros de Configuración"
          subheader="Personalice el comportamiento del sistema según las necesidades de su institución"
          action={
            <Button variant="contained" startIcon={<SaveIcon />} onClick={() => alert("Configuración guardada")}>
              Guardar Cambios
            </Button>
          }
        />
        <Divider />
        <CardContent>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="configuration tabs">
              <Tab icon={<SchoolIcon />} label="General" />
              <Tab icon={<PersonIcon />} label="Docentes" />
              <Tab icon={<CalculateIcon />} label="Algoritmo" />
              <Tab icon={<NotificationsIcon />} label="Notificaciones" />
              <Tab icon={<SecurityIcon />} label="Seguridad" />
            </Tabs>
          </Box>

          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Información de la Institución
                  </Typography>
                  <Stack spacing={3}>
                    <TextField label="Nombre de la Institución" defaultValue="Centro Educativo Los Cayucos" fullWidth />
                    <TextField label="Dirección" defaultValue="Av. Principal #123, Ciudad" fullWidth />
                    <TextField label="Teléfono" defaultValue="+1 234 567 8900" fullWidth />
                    <TextField label="Correo Electrónico" defaultValue="info@loscayucos.edu" fullWidth />
                  </Stack>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Configuración del Período Académico
                  </Typography>
                  <Stack spacing={3}>
                    <FormControl fullWidth>
                      <InputLabel>Período Actual</InputLabel>
                      <Select label="Período Actual" defaultValue="2024-1">
                        <MenuItem value="2023-2">2023-2</MenuItem>
                        <MenuItem value="2024-1">2024-1</MenuItem>
                        <MenuItem value="2024-2">2024-2</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      label="Fecha de Inicio"
                      type="date"
                      defaultValue="2024-01-15"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                      label="Fecha de Finalización"
                      type="date"
                      defaultValue="2024-06-30"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    />
                    <FormGroup>
                      <FormControlLabel control={<Switch defaultChecked />} label="Período Activo" />
                    </FormGroup>
                  </Stack>
                </Paper>
              </Grid>

              <Grid item xs={12}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Configuración de Horarios
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Días Laborables</InputLabel>
                        <Select label="Días Laborables" defaultValue="1-5">
                          <MenuItem value="1-5">Lunes a Viernes</MenuItem>
                          <MenuItem value="1-6">Lunes a Sábado</MenuItem>
                          <MenuItem value="custom">Personalizado</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl fullWidth>
                        <InputLabel>Formato de Hora</InputLabel>
                        <Select label="Formato de Hora" defaultValue="24h">
                          <MenuItem value="12h">12 horas (AM/PM)</MenuItem>
                          <MenuItem value="24h">24 horas</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" gutterBottom>
                        Duración Predeterminada de Bloques
                      </Typography>
                      <Box sx={{ px: 2 }}>
                        <Slider
                          defaultValue={50}
                          step={5}
                          marks={[
                            { value: 30, label: "30 min" },
                            { value: 45, label: "45 min" },
                            { value: 60, label: "60 min" },
                            { value: 90, label: "90 min" },
                          ]}
                          min={30}
                          max={90}
                          valueLabelDisplay="auto"
                          valueLabelFormat={(value) => `${value} min`}
                        />
                      </Box>
                      <FormGroup sx={{ mt: 3 }}>
                        <FormControlLabel control={<Switch defaultChecked />} label="Incluir recesos automáticamente" />
                        <FormControlLabel control={<Switch defaultChecked />} label="Permitir bloques dobles" />
                      </FormGroup>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Parámetros de Docentes
                  </Typography>
                  <Stack spacing={3}>
                    <TextField
                      label="Máximo de Horas Semanales por Docente"
                      type="number"
                      defaultValue={20}
                      fullWidth
                      InputProps={{ inputProps: { min: 1, max: 40 } }}
                    />
                    <TextField
                      label="Mínimo de Horas Semanales por Docente"
                      type="number"
                      defaultValue={10}
                      fullWidth
                      InputProps={{ inputProps: { min: 1, max: 40 } }}
                    />
                    <FormControl fullWidth>
                      <InputLabel>Política de Asignación</InputLabel>
                      <Select label="Política de Asignación" defaultValue="balanced">
                        <MenuItem value="balanced">Balanceada</MenuItem>
                        <MenuItem value="specialized">Priorizar Especialización</MenuItem>
                        <MenuItem value="experience">Priorizar Experiencia</MenuItem>
                        <MenuItem value="availability">Priorizar Disponibilidad</MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Restricciones de Asignación
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <AccessTimeIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Tiempo mínimo entre clases"
                        secondary={
                          <Box sx={{ mt: 1 }}>
                            <Slider
                              defaultValue={15}
                              step={5}
                              marks={[
                                { value: 0, label: "0 min" },
                                { value: 15, label: "15 min" },
                                { value: 30, label: "30 min" },
                              ]}
                              min={0}
                              max={30}
                              valueLabelDisplay="auto"
                              valueLabelFormat={(value) => `${value} min`}
                            />
                          </Box>
                        }
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <MenuBookIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Máximo de materias diferentes por docente"
                        secondary={
                          <Box sx={{ mt: 1 }}>
                            <Slider
                              defaultValue={3}
                              step={1}
                              marks={[
                                { value: 1, label: "1" },
                                { value: 3, label: "3" },
                                { value: 5, label: "5" },
                              ]}
                              min={1}
                              max={5}
                              valueLabelDisplay="auto"
                            />
                          </Box>
                        }
                      />
                    </ListItem>
                  </List>
                  <FormGroup sx={{ mt: 2 }}>
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Respetar preferencias de horario de docentes"
                    />
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Permitir asignación en bloques consecutivos"
                    />
                    <FormControlLabel control={<Switch />} label="Restringir cambios de aula en el mismo día" />
                  </FormGroup>
                </Paper>
              </Grid>

              <Grid item xs={12}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
                    Configuración de Sustituciones
                    <Tooltip title="Estos parámetros afectan cómo el sistema selecciona sustitutos cuando un docente se ausenta.">
                      <IconButton size="small" sx={{ ml: 1 }}>
                        <InfoIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Método de Selección de Sustitutos</InputLabel>
                        <Select label="Método de Selección de Sustitutos" defaultValue="points">
                          <MenuItem value="points">Sistema de Puntos</MenuItem>
                          <MenuItem value="manual">Selección Manual</MenuItem>
                          <MenuItem value="hybrid">Híbrido</MenuItem>
                        </Select>
                      </FormControl>
                      <TextField
                        label="Umbral Mínimo de Puntos para Sustitución"
                        type="number"
                        defaultValue={70}
                        fullWidth
                        InputProps={{ inputProps: { min: 0, max: 100 } }}
                        helperText="Puntuación mínima requerida para considerar un sustituto como válido (0-100)"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormGroup>
                        <FormControlLabel
                          control={<Switch defaultChecked />}
                          label="Notificar automáticamente a sustitutos"
                        />
                        <FormControlLabel
                          control={<Switch defaultChecked />}
                          label="Permitir sustituciones parciales (por día)"
                        />
                        <FormControlLabel control={<Switch />} label="Requerir aprobación manual para sustituciones" />
                      </FormGroup>
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="subtitle2" gutterBottom>
                          Tiempo de antelación mínimo para sustituciones
                        </Typography>
                        <Slider
                          defaultValue={24}
                          step={4}
                          marks={[
                            { value: 0, label: "0h" },
                            { value: 24, label: "24h" },
                            { value: 48, label: "48h" },
                            { value: 72, label: "72h" },
                          ]}
                          min={0}
                          max={72}
                          valueLabelDisplay="auto"
                          valueLabelFormat={(value) => `${value}h`}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Parámetros del Algoritmo de Asignación
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary="Peso de Antigüedad Docente"
                        secondary={
                          <Box sx={{ mt: 1 }}>
                            <Slider
                              defaultValue={70}
                              step={10}
                              marks={[
                                { value: 0, label: "0%" },
                                { value: 50, label: "50%" },
                                { value: 100, label: "100%" },
                              ]}
                              min={0}
                              max={100}
                              valueLabelDisplay="auto"
                              valueLabelFormat={(value) => `${value}%`}
                            />
                          </Box>
                        }
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Peso de Disponibilidad"
                        secondary={
                          <Box sx={{ mt: 1 }}>
                            <Slider
                              defaultValue={90}
                              step={10}
                              marks={[
                                { value: 0, label: "0%" },
                                { value: 50, label: "50%" },
                                { value: 100, label: "100%" },
                              ]}
                              min={0}
                              max={100}
                              valueLabelDisplay="auto"
                              valueLabelFormat={(value) => `${value}%`}
                            />
                          </Box>
                        }
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Peso de Experiencia en la Materia"
                        secondary={
                          <Box sx={{ mt: 1 }}>
                            <Slider
                              defaultValue={80}
                              step={10}
                              marks={[
                                { value: 0, label: "0%" },
                                { value: 50, label: "50%" },
                                { value: 100, label: "100%" },
                              ]}
                              min={0}
                              max={100}
                              valueLabelDisplay="auto"
                              valueLabelFormat={(value) => `${value}%`}
                            />
                          </Box>
                        }
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Peso de Especialidad"
                        secondary={
                          <Box sx={{ mt: 1 }}>
                            <Slider
                              defaultValue={85}
                              step={10}
                              marks={[
                                { value: 0, label: "0%" },
                                { value: 50, label: "50%" },
                                { value: 100, label: "100%" },
                              ]}
                              min={0}
                              max={100}
                              valueLabelDisplay="auto"
                              valueLabelFormat={(value) => `${value}%`}
                            />
                          </Box>
                        }
                      />
                    </ListItem>
                  </List>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Bonificaciones y Penalizaciones
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary="Bonificación por Balanceo de Carga"
                        secondary={
                          <Box sx={{ mt: 1 }}>
                            <Slider
                              defaultValue={10}
                              step={1}
                              marks={[
                                { value: 0, label: "0 pts" },
                                { value: 10, label: "10 pts" },
                                { value: 20, label: "20 pts" },
                              ]}
                              min={0}
                              max={20}
                              valueLabelDisplay="auto"
                              valueLabelFormat={(value) => `${value} pts`}
                            />
                          </Box>
                        }
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Bonificación por Minimizar Desplazamientos"
                        secondary={
                          <Box sx={{ mt: 1 }}>
                            <Slider
                              defaultValue={15}
                              step={1}
                              marks={[
                                { value: 0, label: "0 pts" },
                                { value: 15, label: "15 pts" },
                                { value: 30, label: "30 pts" },
                              ]}
                              min={0}
                              max={30}
                              valueLabelDisplay="auto"
                              valueLabelFormat={(value) => `${value} pts`}
                            />
                          </Box>
                        }
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Bonificación por Horas Consecutivas"
                        secondary={
                          <Box sx={{ mt: 1 }}>
                            <Slider
                              defaultValue={10}
                              step={1}
                              marks={[
                                { value: 0, label: "0 pts" },
                                { value: 10, label: "10 pts" },
                                { value: 20, label: "20 pts" },
                              ]}
                              min={0}
                              max={20}
                              valueLabelDisplay="auto"
                              valueLabelFormat={(value) => `${value} pts`}
                            />
                          </Box>
                        }
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Penalización por Conflicto de Horario"
                        secondary={
                          <Box sx={{ mt: 1 }}>
                            <Slider
                              defaultValue={-50}
                              step={5}
                              marks={[
                                { value: -100, label: "-100 pts" },
                                { value: -50, label: "-50 pts" },
                                { value: 0, label: "0 pts" },
                              ]}
                              min={-100}
                              max={0}
                              valueLabelDisplay="auto"
                              valueLabelFormat={(value) => `${value} pts`}
                            />
                          </Box>
                        }
                      />
                    </ListItem>
                  </List>
                </Paper>
              </Grid>

              <Grid item xs={12}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Configuración Avanzada del Algoritmo
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Método de Optimización</InputLabel>
                        <Select label="Método de Optimización" defaultValue="genetic">
                          <MenuItem value="genetic">Algoritmo Genético</MenuItem>
                          <MenuItem value="simulated">Recocido Simulado</MenuItem>
                          <MenuItem value="greedy">Algoritmo Voraz</MenuItem>
                        </Select>
                      </FormControl>
                      <TextField
                        label="Número Máximo de Iteraciones"
                        type="number"
                        defaultValue={1000}
                        fullWidth
                        InputProps={{ inputProps: { min: 100, max: 10000 } }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormGroup>
                        <FormControlLabel control={<Switch defaultChecked />} label="Optimizar automáticamente" />
                        <FormControlLabel control={<Switch defaultChecked />} label="Permitir soluciones subóptimas" />
                        <FormControlLabel control={<Switch />} label="Modo estricto (sin excepciones)" />
                      </FormGroup>
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="subtitle2" gutterBottom>
                          Umbral de aceptación de solución
                        </Typography>
                        <Slider
                          defaultValue={85}
                          step={5}
                          marks={[
                            { value: 50, label: "50%" },
                            { value: 75, label: "75%" },
                            { value: 100, label: "100%" },
                          ]}
                          min={50}
                          max={100}
                          valueLabelDisplay="auto"
                          valueLabelFormat={(value) => `${value}%`}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={tabValue} index={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Configuración de Notificaciones
                  </Typography>
                  <FormGroup>
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Notificaciones por correo electrónico"
                    />
                    <FormControlLabel control={<Switch defaultChecked />} label="Notificaciones en la aplicación" />
                    <FormControlLabel control={<Switch />} label="Notificaciones por SMS" />
                    <FormControlLabel control={<Switch />} label="Notificaciones push" />
                  </FormGroup>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Eventos de Notificación
                  </Typography>
                  <FormGroup>
                    <FormControlLabel control={<Switch defaultChecked />} label="Nueva asignación" />
                    <FormControlLabel control={<Switch defaultChecked />} label="Cambio de asignación" />
                    <FormControlLabel control={<Switch defaultChecked />} label="Solicitud de sustitución" />
                    <FormControlLabel control={<Switch defaultChecked />} label="Confirmación de sustitución" />
                    <FormControlLabel control={<Switch />} label="Recordatorios de horario" />
                    <FormControlLabel control={<Switch defaultChecked />} label="Alertas del sistema" />
                  </FormGroup>
                </Paper>
              </Grid>

              <Grid item xs={12}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Plantillas de Notificación
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Plantilla a Editar</InputLabel>
                        <Select label="Plantilla a Editar" defaultValue="new_assignment">
                          <MenuItem value="new_assignment">Nueva Asignación</MenuItem>
                          <MenuItem value="substitution_request">Solicitud de Sustitución</MenuItem>
                          <MenuItem value="substitution_confirm">Confirmación de Sustitución</MenuItem>
                          <MenuItem value="schedule_change">Cambio de Horario</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Asunto"
                        defaultValue="Nueva asignación de horario - SIASH"
                        fullWidth
                        sx={{ mb: 2 }}
                      />
                      <TextField
                        label="Contenido de la Notificación"
                        multiline
                        rows={6}
                        defaultValue={`Estimado/a [NOMBRE_DOCENTE],

Se le ha asignado una nueva clase:

Materia: [MATERIA]
Curso: [CURSO]
Horario: [DIA] [HORA_INICIO] - [HORA_FIN]
Aula: [AULA]

Por favor confirme su disponibilidad.

Saludos cordiales,
Sistema SIASH
Centro Educativo Los Cayucos`}
                        fullWidth
                        helperText="Utilice [VARIABLES] para insertar datos dinámicos"
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={tabValue} index={4}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Configuración de Acceso
                  </Typography>
                  <FormGroup>
                    <FormControlLabel control={<Switch defaultChecked />} label="Autenticación de dos factores" />
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Bloqueo después de intentos fallidos"
                    />
                    <FormControlLabel control={<Switch />} label="Inicio de sesión único (SSO)" />
                  </FormGroup>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Tiempo de expiración de sesión (minutos)
                    </Typography>
                    <Slider
                      defaultValue={30}
                      step={5}
                      marks={[
                        { value: 5, label: "5" },
                        { value: 30, label: "30" },
                        { value: 60, label: "60" },
                        { value: 120, label: "120" },
                      ]}
                      min={5}
                      max={120}
                      valueLabelDisplay="auto"
                    />
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Políticas de Contraseña
                  </Typography>
                  <FormGroup>
                    <FormControlLabel control={<Switch defaultChecked />} label="Requerir mayúsculas y minúsculas" />
                    <FormControlLabel control={<Switch defaultChecked />} label="Requerir números" />
                    <FormControlLabel control={<Switch defaultChecked />} label="Requerir caracteres especiales" />
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Forzar cambio periódico de contraseña"
                    />
                  </FormGroup>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Longitud mínima de contraseña
                    </Typography>
                    <Slider
                      defaultValue={8}
                      step={1}
                      marks={[
                        { value: 6, label: "6" },
                        { value: 8, label: "8" },
                        { value: 10, label: "10" },
                        { value: 12, label: "12" },
                      ]}
                      min={6}
                      max={12}
                      valueLabelDisplay="auto"
                    />
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Roles y Permisos
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Rol a Configurar</InputLabel>
                        <Select label="Rol a Configurar" defaultValue="admin">
                          <MenuItem value="admin">Administrador</MenuItem>
                          <MenuItem value="director">Director</MenuItem>
                          <MenuItem value="coordinator">Coordinador</MenuItem>
                          <MenuItem value="teacher">Docente</MenuItem>
                          <MenuItem value="viewer">Visualizador</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" gutterBottom>
                        Permisos
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <FormGroup>
                            <FormControlLabel control={<Switch defaultChecked />} label="Ver horarios" />
                            <FormControlLabel control={<Switch defaultChecked />} label="Crear asignaciones" />
                            <FormControlLabel control={<Switch defaultChecked />} label="Editar asignaciones" />
                            <FormControlLabel control={<Switch defaultChecked />} label="Eliminar asignaciones" />
                          </FormGroup>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormGroup>
                            <FormControlLabel control={<Switch defaultChecked />} label="Gestionar sustituciones" />
                            <FormControlLabel control={<Switch defaultChecked />} label="Ver reportes" />
                            <FormControlLabel control={<Switch defaultChecked />} label="Configurar sistema" />
                            <FormControlLabel control={<Switch defaultChecked />} label="Gestionar usuarios" />
                          </FormGroup>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </TabPanel>
        </CardContent>
        <Divider />
        <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
          <Button
            variant="outlined"
            startIcon={<RestoreIcon />}
            onClick={() => alert("Configuración restaurada a valores predeterminados")}
          >
            Restaurar Valores Predeterminados
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={() => alert("Configuración guardada")}
          >
            Guardar Cambios
          </Button>
        </Box>
      </Card>
    </Box>
  )
}
