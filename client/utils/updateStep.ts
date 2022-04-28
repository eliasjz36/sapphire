import { StepObj } from '../ts/interfaces/stepper.interfaces'

const updateStep = (stepNumber: number, steps: StepObj[]) => {
  const newSteps = [...steps]
  let stepCounter = 0
  while (stepCounter < newSteps.length) {
    //current step
    if (stepCounter === stepNumber) {
      newSteps[stepCounter] = {
        ...newSteps[stepCounter],
        highlighted: true,
        selected: true,
        completed: false,
      }
      stepCounter++
    }
    // Past step
    else if (stepCounter < stepNumber) {
      newSteps[stepCounter] = {
        ...newSteps[stepCounter],
        highlighted: false,
        selected: true,
        completed: true,
      }
      stepCounter++
    }
    // Future steps
    else {
      newSteps[stepCounter] = {
        ...newSteps[stepCounter],
        highlighted: false,
        selected: false,
        completed: false,
      }
      stepCounter++
    }
  }
  return newSteps
}

export default updateStep
