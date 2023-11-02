export type SelectOption = {
  label: string
  value: string
}

type SelectProps = {
  selectedValue: string
  options: SelectOption[]
  onSelect: (value: string) => void
  name?: string
}

export const Select = ({ selectedValue, options, onSelect, name }: SelectProps) => {
  return (
    <div className="select">
      <select
        value={selectedValue}
        className="select__field"
        name={name}
        onChange={(event) => {
          console.log(event.target.value)
          onSelect(event.target.value)
        }}
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
