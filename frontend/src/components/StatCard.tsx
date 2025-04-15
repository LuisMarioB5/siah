import React from "react"
import { Card, CardContent, Typography, Box, type SxProps, type Theme } from "@mui/material"

interface StatCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  subtitle?: string
  color?: string
  sx?: SxProps<Theme>
}

export default function StatCard({ title, value, icon, subtitle, color = "primary.main", sx }: StatCardProps) {
  return (
    <Card sx={{ height: "100%", ...sx }}>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <Box>
            <Typography variant="h6" component="div" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" component="div" color={color} sx={{ fontWeight: "bold" }}>
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {subtitle}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: `${color}15`,
              borderRadius: "50%",
              p: 1.5,
            }}
          >
            <Box sx={{ fontSize: 32, color }}>
              {icon}
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}
