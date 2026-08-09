import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }

export function PrimaryButton({ children, className = '', ...props }: ButtonProps) {
  return (
    <button className={`button button--primary ${className}`} {...props}>
      {children}
    </button>
  )
}

export function SecondaryButton({ children, className = '', ...props }: ButtonProps) {
  return (
    <button className={`button button--secondary ${className}`} {...props}>
      {children}
    </button>
  )
}

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string
  children: ReactNode
}

export function IconButton({ label, children, className = '', ...props }: IconButtonProps) {
  return (
    <button className={`icon-button ${className}`} aria-label={label} {...props}>
      {children}
    </button>
  )
}
