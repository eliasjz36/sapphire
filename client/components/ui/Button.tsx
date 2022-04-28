import { FormEvent } from 'react'

type ButtonType = 'button' | 'submit' | 'reset' | undefined

interface ButtonProps {
  onClickHandler?(e: FormEvent): void // eslint-disable-line no-unused-vars
  content: string
  className?: string
  type?: ButtonType
  disabled?: boolean
}

const Button = ({
  onClickHandler,
  className,
  content,
  type,
  disabled,
}: ButtonProps) => {
  return (
    <button
      type={type || 'button'}
      onClick={onClickHandler}
      disabled={disabled}
      className={`w-full rounded-lg bg-indigo-700 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-800 focus:ring-4 focus:ring-blue-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800 ${className}`}
    >
      {content}
    </button>
  )
}

export default Button
