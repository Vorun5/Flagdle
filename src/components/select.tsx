import { SelectHTMLAttributes } from 'react'

export type SelectOption = {
  label: string
  value: string
}

type SelectProps = {
  selectedValue: string
  options: SelectOption[]
  onSelect: (value: string) => void
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onSelect'>

export const Select = ({ selectedValue, options, onSelect, ...props }: SelectProps) => {
  return (
    <div className="select">
      <select
        value={selectedValue}
        className="select__field"
        onChange={(event) => {
          onSelect(event.target.value)
        }}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
