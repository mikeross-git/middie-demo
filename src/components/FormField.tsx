import type { InputHTMLAttributes } from 'react'

type FormFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string
  label: string
  hint?: string
}

export function FormField({ id, label, hint, ...props }: FormFieldProps) {
  return (
    <label className="form-field" htmlFor={id}>
      <span className="form-field__label">{label}</span>
      <input id={id} className="form-field__input" {...props} />
      {hint && <span className="form-field__hint">{hint}</span>}
    </label>
  )
}
