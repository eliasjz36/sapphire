import Link from 'next/link'
import Image from 'next/image'

import { LockClosedSolid } from '@graywolfai/react-heroicons'

import { Layout } from '../components'
import Input from '../components/ui/Input'

import useRegistrationForm from '../hooks/useRegistrationForm'

import { registerInputs } from '../utils/inputs'

const RegisterScreen = () => {
  const { register, errors, onSubmit, redirect } = useRegistrationForm()

  return (
    <Layout title="Register">
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-lg space-y-8">
          <div>
            <Link href="/" passHref>
              <a className="flex justify-center">
                <span className="sr-only">Saphire</span>
                <Image
                  src="/favicon.svg"
                  alt="sapphire logo"
                  width={128}
                  height={60.46}
                />
              </a>
            </Link>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
              Create your Sapphire Account
            </h2>
          </div>
          <form className="mt-8 space-y-6" method="POST" onSubmit={onSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md">
              {registerInputs.map((input) => (
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

              <p className="mt-1 text-xs text-gray-700 dark:text-gray-200">
                Use 8 or more characters with a mix of letters, numbers &
                symbols
              </p>
            </div>

            <div>
              <button
                type="submit"
                className="group relative mb-2 flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedSolid
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Sign up
              </button>
              <div className="text-sm">
                <span className="mr-1">Already have an account?</span>
                <Link
                  href={`/login?redirect=${(redirect as string) || '/'}`}
                  passHref
                >
                  <a className="font-medium text-indigo-600 hover:text-indigo-500">
                    Sign in
                  </a>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default RegisterScreen
