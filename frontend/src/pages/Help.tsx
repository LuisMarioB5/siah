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
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Link,
} from "@mui/material"

import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import SearchIcon from "@mui/icons-material/Search"
import HelpIcon from "@mui/icons-material/Help"
import MenuBookIcon from "@mui/icons-material/MenuBook"
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary"
import ContactSupportIcon from "@mui/icons-material/ContactSupport"
import ArticleIcon from "@mui/icons-material/Article"

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
      id={`help-tabpanel-${index}`}
      aria-labelledby={`help-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  )
}

export default function Help() {
  const [tabValue, setTabValue] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const faqs = [
    {
      question: "¿Cómo funciona el sistema de puntos para la asignación de docentes?",
      answer:
        "El sistema de puntos evalúa a cada docente según varios criterios como antigüedad, disponibilidad, experiencia en la materia y especialización. Cada criterio tiene un peso configurable y la suma total determina la puntuación del docente para una asignación específica. El sistema selecciona automáticamente al docente con mayor puntuación para cada asignación.",
    },
    {
      question: "¿Cómo puedo registrar la ausencia de un docente?",
      answer:
        "Para registrar la ausencia de un docente, vaya a la sección 'Sustitución' en el menú lateral. Seleccione el docente ausente, el rango de fechas de la ausencia y el motivo. El sistema detectará automáticamente las clases afectadas y sugerirá sustitutos adecuados basados en el sistema de puntos.",
    },
    {
      question: "¿Puedo editar manualmente una asignación generada por el sistema?",
      answer:
        "Sí, después de generar una asignación automática, puede ver la vista previa y activar el modo de edición manual haciendo clic en el botón 'Editar Manualmente'. Esto le permitirá modificar cualquier asignación específica según sea necesario antes de confirmarla.",
    },
    {
      question: "¿Cómo puedo ver el historial de asignaciones y sustituciones?",
      answer:
        "Acceda a la sección 'Reportes' en el menú lateral. Allí encontrará un registro completo de todas las asignaciones y sustituciones realizadas. Puede filtrar por tipo, estado, curso, docente, materia y fecha para encontrar información específica.",
    },
    {
      question: "¿Puedo configurar los criterios utilizados por el algoritmo de asignación?",
      answer:
        "Sí, en la sección 'Configuración' > 'Algoritmo' puede ajustar los pesos de cada criterio (antigüedad, disponibilidad, experiencia, etc.) y las bonificaciones o penalizaciones aplicadas. Estos ajustes afectarán cómo el sistema calcula las puntuaciones para las asignaciones y sustituciones.",
    },
    {
      question: "¿El sistema notifica automáticamente a los docentes sobre nuevas asignaciones o sustituciones?",
      answer:
        "Sí, si esta opción está habilitada en la configuración. Puede personalizar las plantillas de notificación y los canales (correo electrónico, notificaciones en la aplicación, etc.) en la sección 'Configuración' > 'Notificaciones'.",
    },
  ]

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Centro de Ayuda
        </Typography>
      </Box>

      <Card>
        <CardHeader
          title="Ayuda y Soporte"
          subheader="Encuentre respuestas a sus preguntas sobre el Sistema Inteligente de Asignación y Sustitución de Horarios"
        />
        <Divider />
        <CardContent>
          <Box sx={{ mb: 4 }}>
            <TextField
              fullWidth
              placeholder="Buscar en la ayuda..."
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
          </Box>

          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="help tabs">
              <Tab icon={<HelpIcon />} label="Preguntas Frecuentes" />
              <Tab icon={<MenuBookIcon />} label="Guías de Uso" />
              <Tab icon={<VideoLibraryIcon />} label="Tutoriales" />
              <Tab icon={<ContactSupportIcon />} label="Soporte" />
            </Tabs>
          </Box>

          <TabPanel value={tabValue} index={0}>
            <Typography variant="h6" gutterBottom>
              Preguntas Frecuentes
            </Typography>
            {faqs.map((faq, index) => (
              <Accordion key={index}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`faq-content-${index}`}
                  id={`faq-header-${index}`}
                >
                  <Typography fontWeight="medium">{faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{faq.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Typography variant="h6" gutterBottom>
              Guías de Uso
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="subtitle1" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
                    <ArticleIcon sx={{ mr: 1 }} />
                    Guías Básicas
                  </Typography>
                  <List>
                    <ListItem button component={Link} href="#" underline="none">
                      <ListItemText primary="Introducción al SIASH" secondary="Conceptos básicos y navegación" />
                    </ListItem>
                    <ListItem button component={Link} href="#" underline="none">
                      <ListItemText primary="Primeros pasos" secondary="Configuración inicial del sistema" />
                    </ListItem>
                    <ListItem button component={Link} href="#" underline="none">
                      <ListItemText primary="Dashboard y filtros" secondary="Cómo utilizar el panel principal" />
                    </ListItem>
                    <ListItem button component={Link} href="#" underline="none">
                      <ListItemText primary="Gestión de usuarios" secondary="Creación y administración de cuentas" />
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="subtitle1" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
                    <ArticleIcon sx={{ mr: 1 }} />
                    Guías Avanzadas
                  </Typography>
                  <List>
                    <ListItem button component={Link} href="#" underline="none">
                      <ListItemText primary="Sistema de puntos" secondary="Cómo funciona el algoritmo de asignación" />
                    </ListItem>
                    <ListItem button component={Link} href="#" underline="none">
                      <ListItemText primary="Optimización de horarios" secondary="Estrategias para mejorar asignaciones" />
                    </ListItem>
                    <ListItem button component={Link} href="#" underline="none">
                      <ListItemText primary="Reportes avanzados" secondary="Análisis de datos históricos" />
                    </ListItem>
                    <ListItem button component={Link} href="#" underline="none">
                      <ListItemText primary="Integración con otros sistemas" secondary="Exportación, API y sincronización" />
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <Typography variant="h6" gutterBottom>
              Tutoriales en Video
            </Typography>
            <Typography variant="body1">Aquí podrás encontrar tutoriales en video próximamente.</Typography>
          </TabPanel>

          <TabPanel value={tabValue} index={3}>
            <Typography variant="h6" gutterBottom>
              Soporte Técnico
            </Typography>
            <Typography variant="body1">
              Si no encuentras la respuesta a tu pregunta, por favor contacta a nuestro equipo de soporte a través del
              correo soporte@siash.com o mediante el formulario de contacto.
            </Typography>
          </TabPanel>
        </CardContent>
      </Card>
    </Box>
  )
}
