import Image from 'next/image'
import Link from 'next/link'

import navigation from './navigation'

const FooterTop = () => {
  return (
    <div className="md:flex md:justify-between">
      <div className="mb-6 md:mb-0">
        <Link href="/">
          <a className="flex items-center">
            <Image
              src="/images/sapphire-logo.svg"
              alt="FlowBite Logo"
              width={200}
              height={60.46}
            />
          </a>
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-8 sm:gap-6">
        {[
          navigation.map((nav) => (
            <div key={nav.title}>
              <h2 className="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">
                {nav.title}
              </h2>
              <ul className="text-gray-600 dark:text-gray-400">
                {nav.links.map((link) => (
                  <li className="mb-4" key={link.name}>
                    <a href={link.href} className="hover:underline">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )),
        ]}
      </div>
    </div>
  )
}

export default FooterTop
