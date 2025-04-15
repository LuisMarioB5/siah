import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import Box from "@mui/material/Box"

import Layout from "./components/Layout"
import Dashboard from "./pages/Dashboard"
import Assignment from "./pages/Assignment"
import Substitution from "./pages/Substitution"
import Reports from "./pages/Reports"
import Configuration from "./pages/Configuration"
import Help from "./pages/Help"
import { AsignacionProvider } from "@/context/asignacion-context"

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: "#2e7d32", // Green color for the school theme
      light: "#4caf50",
      dark: "#1b5e20",
    },
    secondary: {
      main: "#f57c00", // Orange as secondary color
      light: "#ffb74d",
      dark: "#e65100",
    },
    background: {
      default: "#f5f5f5",
    },
  },
  typography: {
    fontFamily: ["Roboto", '"Helvetica Neue"', "Arial", "sans-serif"].join(","),
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 4px 6px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.08)",
        },
      },
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AsignacionProvider>
          <Box sx={{ display: "flex" }}>
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/assignment" element={<Assignment />} />
                <Route path="/substitution" element={<Substitution />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/configuration" element={<Configuration />} />
                <Route path="/help" element={<Help />} />
              </Routes>
            </Layout>
          </Box>
        </AsignacionProvider>
      </Router>
    </ThemeProvider>
  )
}

export default App
