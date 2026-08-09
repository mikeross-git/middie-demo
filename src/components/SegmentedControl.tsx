type SegmentedControlProps<T extends string> = {
  label: string
  options: readonly T[]
  value: T
  onChange: (value: T) => void
}

export function SegmentedControl<T extends string>({
  label,
  options,
  value,
  onChange,
}: SegmentedControlProps<T>) {
  return (
    <fieldset className="segmented-control">
      <legend className="sr-only">{label}</legend>
      {options.map((option) => (
        <button
          type="button"
          key={option}
          className={option === value ? 'segmented-control__option is-active' : 'segmented-control__option'}
          aria-pressed={option === value}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </fieldset>
  )
}
