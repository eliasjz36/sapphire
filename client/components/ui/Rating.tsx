import { StarSolid } from '@graywolfai/react-heroicons'

interface RatingProps {
  rating: number | string
}

const Rating = ({ rating }: RatingProps) => {
  return (
    <>
      {[1, 2, 3, 4, 5].map((number, index) => (
        <StarSolid
          key={number + index}
          className={`${
            rating >= number ? 'text-yellow-300' : 'text-gray-200'
          } h-5 w-5 `}
          aria-hidden="true"
        />
      ))}
    </>
  )
}

export default Rating
