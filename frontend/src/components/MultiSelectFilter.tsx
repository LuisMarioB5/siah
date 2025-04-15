"use client"
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
import Checkbox from "@mui/material/Checkbox"
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank"
import CheckBoxIcon from "@mui/icons-material/CheckBox"

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

interface Option {
  id: string
  label: string
}

interface MultiSelectFilterProps {
  options: Option[]
  value: Option[]
  onChange: (newValue: Option[]) => void
  label: string
  placeholder?: string
  fullWidth?: boolean
  size?: "small" | "medium"
}

export default function MultiSelectFilter({
  options,
  value,
  onChange,
  label,
  placeholder = "Seleccionar...",
  fullWidth = true,
  size = "small",
}: MultiSelectFilterProps) {
  return (
    <Autocomplete
      multiple
      id={`multi-select-${label.toLowerCase().replace(/\s+/g, "-")}`}
      options={options}
      disableCloseOnSelect
      value={value}
      onChange={(_, newValue) => onChange(newValue)}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
          {option.label}
        </li>
      )}
      size={size}
      fullWidth={fullWidth}
      renderInput={(params) => <TextField {...params} label={label} placeholder={placeholder} size={size} />}
    />
  )
}
