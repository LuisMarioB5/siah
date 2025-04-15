"use client"
import { styled } from "@mui/material/styles"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell, { tableCellClasses } from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import Chip from "@mui/material/Chip"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Tooltip from "@mui/material/Tooltip"
import IconButton from "@mui/material/IconButton"
import EditIcon from "@mui/icons-material/Edit"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}))

interface ScheduleCell {
  teacher: string
  subject: string
  room: string
  course: string
  points?: number
  isSubstitution?: boolean
  originalTeacher?: string
}

interface BreakCell {
  isBreak: boolean
  name: string
}

type Cell = ScheduleCell | BreakCell

interface ScheduleData {
  [day: string]: {
    [hour: string]: Cell
  }
}

interface ScheduleTableProps {
  scheduleData: ScheduleData
  days: string[]
  hours: string[]
  onEditCell?: (day: string, hour: string, cell: Cell) => void
  showPoints?: boolean
}

export default function ScheduleTable({
  scheduleData,
  days,
  hours,
  onEditCell,
  showPoints = false,
}: ScheduleTableProps) {
  const isBreakCell = (cell: Cell): cell is BreakCell => {
    return (cell as BreakCell).isBreak === true
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 2, overflow: "auto" }}>
      <Table sx={{ minWidth: 700 }} aria-label="schedule table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Hora</StyledTableCell>
            {days.map((day) => (
              <StyledTableCell key={day} align="center">
                {day}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {hours.map((hour) => (
            <StyledTableRow key={hour}>
              <StyledTableCell component="th" scope="row">
                {hour}
              </StyledTableCell>
              {days.map((day) => {
                const cell = scheduleData[day]?.[hour]

                if (!cell) {
                  return (
                    <StyledTableCell key={`${day}-${hour}`} align="center">
                      <Typography variant="body2" color="text.secondary">
                        No asignado
                      </Typography>
                    </StyledTableCell>
                  )
                }

                if (isBreakCell(cell)) {
                  return (
                    <StyledTableCell
                      key={`${day}-${hour}`}
                      align="center"
                      colSpan={days.length}
                      sx={{ bgcolor: "grey.200" }}
                    >
                      <Typography variant="subtitle1" fontWeight="medium">
                        {cell.name}
                      </Typography>
                    </StyledTableCell>
                  )
                }

                return (
                  <StyledTableCell
                    key={`${day}-${hour}`}
                    sx={{
                      p: 1,
                      bgcolor: cell.isSubstitution ? "rgba(255, 152, 0, 0.1)" : "inherit",
                      position: "relative",
                    }}
                  >
                    <Box
                      sx={{
                        p: 1,
                        borderRadius: 1,
                        border: "1px solid",
                        borderColor: cell.isSubstitution ? "warning.light" : "divider",
                        height: "100%",
                      }}
                    >
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.5 }}>
                        <Typography variant="subtitle2" fontWeight="bold">
                          {cell.subject}
                        </Typography>
                        <Chip label={cell.course} size="small" color="primary" variant="outlined" />
                      </Box>
                      <Typography variant="body2">{cell.teacher}</Typography>
                      {cell.isSubstitution && cell.originalTeacher && (
                        <Typography variant="caption" color="warning.main">
                          Sustitución de: {cell.originalTeacher}
                        </Typography>
                      )}
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 0.5 }}>
                        <Typography variant="caption" color="text.secondary">
                          Aula: {cell.room}
                        </Typography>
                        {showPoints && cell.points && (
                          <Chip
                            label={`${cell.points} pts`}
                            size="small"
                            color={cell.points > 85 ? "success" : cell.points > 70 ? "primary" : "default"}
                            variant="outlined"
                            sx={{ height: 20, fontSize: "0.7rem" }}
                          />
                        )}
                      </Box>
                      {onEditCell && (
                        <Tooltip title="Editar asignación">
                          <IconButton
                            size="small"
                            sx={{
                              position: "absolute",
                              top: 4,
                              right: 4,
                              opacity: 0.3,
                              "&:hover": {
                                opacity: 1,
                              },
                            }}
                            onClick={() => onEditCell(day, hour, cell)}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Box>
                  </StyledTableCell>
                )
              })}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
