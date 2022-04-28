interface ThemeTogglerProps {
  renderThemeHandler(): JSX.Element | null
  className?: string
}

const ThemeToggler = ({ renderThemeHandler, className }: ThemeTogglerProps) => {
  return (
    <div className={`lg:ml-6 ${className}`}>
      <button
        className="block rounded-md bg-gray-100
    px-3 py-2 text-sm font-medium dark:bg-gray-700"
      >
        {renderThemeHandler()}
      </button>
    </div>
  )
}

export default ThemeToggler
