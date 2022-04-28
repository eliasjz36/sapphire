import { CheckCircleSolid, XCircleOutline } from '@graywolfai/react-heroicons'
import { RadioGroup } from '@headlessui/react'

interface PaymentOptionProps {
  paymentMethod: string
}

const PaymentOption = ({ paymentMethod }: PaymentOptionProps) => {
  return (
    <RadioGroup.Option
      value={paymentMethod}
      className={({ active, checked }) =>
        `${
          active
            ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-300'
            : ''
        }
    ${checked ? 'bg-indigo-600  text-white' : 'bg-white'}
     relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md transition-transform duration-200 hover:scale-[1.02] focus:outline-none`
      }
    >
      {({ checked }) => (
        <>
          <div className="flex w-full items-center">
            {
              <div className="mr-3 flex-shrink-0">
                {checked ? (
                  <CheckCircleSolid className="h-6 w-6 text-white" />
                ) : (
                  <XCircleOutline className="h-6 w-6 text-gray-500" />
                )}
              </div>
            }
            <div className="flex items-center">
              <div className="text-sm">
                <RadioGroup.Label
                  as="p"
                  className={`font-medium  ${
                    checked ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {paymentMethod}
                </RadioGroup.Label>
              </div>
            </div>
          </div>
        </>
      )}
    </RadioGroup.Option>
  )
}

export default PaymentOption
