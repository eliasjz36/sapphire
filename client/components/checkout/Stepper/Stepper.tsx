import { useState, useEffect, useRef } from 'react'

import StepsDisplay from './StepsDisplay'

import updateStep from '../../../utils/updateStep'

import { StepObj } from '../../../ts/interfaces/stepper.interfaces'

interface StepperProps {
  activeStep: number
}

const Stepper = ({ activeStep }: StepperProps) => {
  const [stepperSteps, setStep] = useState<StepObj[]>([])
  const stepsStateRef = useRef<StepObj[]>()

  useEffect(() => {
    const steps = ['Login', 'Shipping Address', 'Payment Method', 'Place Order']
    const stepsState = steps.map((step, index) => {
      const stepObj: StepObj = {}
      stepObj.description = step
      stepObj.completed = false
      stepObj.highlighted = index === 0 ? true : false
      stepObj.selected = index === 0 ? true : false

      return stepObj
    })

    stepsStateRef.current = stepsState

    const currentSteps = updateStep(activeStep - 1, stepsState)

    setStep(currentSteps)
  }, [activeStep])

  useEffect(() => {
    const currentSteps = updateStep(activeStep - 1, stepsStateRef.current!)

    setStep(currentSteps)
  }, [activeStep])

  return (
    <div className="horizontal container mx-auto mt-5 mb-12 max-w-7xl">
      <div className="mx-4 flex items-center justify-between p-4">
        <StepsDisplay steps={stepperSteps} />
      </div>
    </div>
  )
}

export default Stepper
