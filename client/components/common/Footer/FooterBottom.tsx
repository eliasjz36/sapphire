import Link from 'next/link'

import Github from '../../icons/Github'
import Linkedin from '../../icons/Linkedin'

const FooterBottom = () => {
  return (
    <div className="sm:flex sm:items-center sm:justify-between">
      <span className="text-sm text-gray-500 dark:text-gray-400 sm:text-center">
        © 2022.{' '}
        <Link href="https://flowbite.com" passHref>
          <a className="hover:underline">Sapphire</a>
        </Link>{' '}
        All Rights Reserved.
      </span>
      <div className="mt-4 flex space-x-3 sm:mt-0 sm:justify-center">
        <Link href="https://github.com/eliasjz36" passHref>
          <a className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
            <Github className="h-6 w-6" />
          </a>
        </Link>

        <Link href="https://www.linkedin.com/in/elias-jimenez" passHref>
          <a className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
            <Linkedin className="h-6 w-6" />
          </a>
        </Link>
      </div>
    </div>
  )
}

export default FooterBottom
