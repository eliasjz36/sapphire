import { Layout, Stepper } from '../components'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'

import useShippingForm from '../hooks/useShippingForm'

import { shippingInputs } from '../utils/inputs'

const ShippingScreen = () => {
  const { register, errors, onSubmit } = useShippingForm()

  return (
    <Layout title="Shipping Address">
      <Stepper activeStep={2} />
      <div className="mt-8">
        <h1 className="mb-8 text-center text-2xl font-extrabold tracking-wide text-gray-900 dark:text-white sm:text-3xl">
          Checkout
        </h1>
      </div>
      <div className="container mx-auto w-3/5">
        <h2 className="text-heading mb-4 font-bold md:text-xl ">
          Shipping Address
        </h2>
        <form
          className="mx-auto w-full justify-center"
          method="post"
          onSubmit={onSubmit}
        >
          {shippingInputs.map((input) => (
            <div className="mt-4" key={input.id}>
              <Input
                label={input.label}
                htmlFor={input.htmlFor}
                id={input.id}
                type={input.type}
                error={errors[input.id]?.message}
                register={register}
                autoComplete={input.autoComplete}
              />
            </div>
          ))}

          <div className="mt-6">
            <Button type="submit" className="col-span-12" content="Continue" />
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default ShippingScreen
