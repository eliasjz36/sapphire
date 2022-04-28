interface InputProps {
  label: string
  htmlFor: string
  placeHolder?: string
  id: string
  type: string
  error: string | undefined
  register(id: string): void // eslint-disable-line no-unused-vars
  autoComplete: string
}

const Input = ({
  label,
  htmlFor,
  id,
  type,
  error,
  register,
  autoComplete,
  placeHolder,
}: InputProps) => {
  return (
    <>
      {
        <label
          htmlFor={htmlFor}
          className={
            !placeHolder
              ? `mb-3 block text-sm font-semibold text-gray-500 dark:text-gray-200`
              : 'sr-only'
          }
        >
          {label}
        </label>
      }
      <input
        id={id}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeHolder}
        className="relative block w-full appearance-none rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-indigo-500 dark:focus:ring-indigo-500 sm:text-sm"
        {...register(id)}
      />
      <p className="text-xs text-red-500">{error}</p>
    </>
  )
}

export default Input
