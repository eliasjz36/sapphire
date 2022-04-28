import { InformationCircleSolid } from '@graywolfai/react-heroicons'

interface ErrorProps {
  error: string
}

const Error = ({ error }: ErrorProps) => {
  return (
    <div
      className="mb-4 flex rounded-lg bg-red-100 p-4 text-sm text-red-700 dark:bg-red-200 dark:text-red-800"
      role="alert"
    >
      <InformationCircleSolid className="mr-3 inline h-5 w-5 flex-shrink-0 text-red-700" />
      <div>
        <span className="font-medium">{error}</span>
      </div>
    </div>
  )
}

export default Error
