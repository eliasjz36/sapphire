import React from 'react'

import { CheckSolid } from '@graywolfai/react-heroicons'

import { StepObj } from '../../../ts/interfaces/stepper.interfaces'

interface StepsDisplayProps {
  steps: StepObj[]
}

const StepsDisplay = ({ steps }: StepsDisplayProps) => {
  return (
    <>
      {steps.map((step, index) => (
        <div
          key={index}
          className={
            index !== steps.length - 1
              ? 'flex w-full items-center'
              : 'flex items-center'
          }
        >
          <div className="relative flex flex-col items-center text-gray-800 dark:text-gray-50">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300 py-3 transition duration-500 ease-in-out  ${
                step.selected ? 'bg-indigo-600 font-bold text-white' : ''
              }`}
            >
              {step.completed ? (
                <span className="text-white">
                  <CheckSolid className="h-4 w-4" />
                </span>
              ) : (
                index + 1
              )}
            </div>
            <div
              className={`absolute top-0  mt-16 w-32 text-center text-xs font-medium ${
                step.highlighted
                  ? 'text-gray-800 dark:text-white'
                  : 'text-gray-400 dark:text-gray-300'
              }`}
            >
              {step.description}
            </div>
          </div>
          <div className="flex-auto border-t-2 border-gray-300 transition duration-500 ease-in-out "></div>
        </div>
      ))}
    </>
  )
}

export default StepsDisplay
