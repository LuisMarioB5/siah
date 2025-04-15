"use client"

import * as React from "react"
import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { CheckIcon } from "lucide-react"

export type Option = {
  value: string
  label: string
}

interface MultiSelectProps {
  options: Option[]
  selected: string[]
  onChange: (selected: string[]) => void
  placeholder?: string
  className?: string
}

export function MultiSelect({ options, selected, onChange, placeholder = "Seleccionar", className }: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)

  const handleUnselect = (value: string) => {
    onChange(selected.filter((item) => item !== value))
  }

  const handleSelect = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((item) => item !== value))
    } else {
      onChange([...selected, value])
    }
  }

  const selectedLabels = selected.map((value) => options.find((option) => option.value === value)?.label || value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className={cn("min-h-10 h-auto", className)}>
          <div className="flex flex-wrap gap-1 py-1">
            {selectedLabels.length > 0 ? (
              selectedLabels.map((label) => (
                <Badge variant="secondary" key={label} className="mr-1">
                  {label}
                  <button
                    className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        e.stopPropagation()
                        const value = options.find((option) => option.label === label)?.value
                        if (value) handleUnselect(value)
                      }
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      const value = options.find((option) => option.label === label)?.value
                      if (value) handleUnselect(value)
                    }}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput placeholder={`Buscar ${placeholder.toLowerCase()}...`} />
          <CommandList>
            <CommandEmpty>No se encontraron resultados.</CommandEmpty>
            <CommandGroup className="max-h-64 overflow-auto">
              {options.map((option) => {
                const isSelected = selected.includes(option.value)
                return (
                  <CommandItem key={option.value} value={option.value} onSelect={() => handleSelect(option.value)}>
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected ? "bg-primary text-primary-foreground" : "opacity-50",
                      )}
                    >
                      {isSelected && <CheckIcon className="h-3 w-3" />}
                    </div>
                    {option.label}
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
