import dynamic from 'next/dynamic'

import { Layout } from '../components'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'

import useUpdateForm from '../hooks/useUpdateForm'

import { profileInputs } from '../utils/inputs'

const ProfileScreen = () => {
  const { register, errors, onSubmit } = useUpdateForm()

  return (
    <Layout title="Profile">
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Profile
          </h1>
          <form className="mt-8 space-y-6" method="POST" onSubmit={onSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md">
              {profileInputs.map((input) => (
                <div className="mb-2" key={input.id}>
                  <Input
                    label={input.label}
                    htmlFor={input.htmlFor}
                    placeHolder={input.placeHolder}
                    id={input.id}
                    type={input.type}
                    error={errors[input.id]?.message}
                    register={register}
                    autoComplete={input.autoComplete}
                  />
                </div>
              ))}

              <p className="mt-4 text-xs text-gray-700 dark:text-gray-300">
                Use 8 or more characters with a mix of letters, numbers &
                symbols
              </p>
            </div>

            <Button type="submit" content="Update" />
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default dynamic(() => Promise.resolve(ProfileScreen) as any, {
  ssr: false,
})
