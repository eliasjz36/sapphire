import FooterBottom from './FooterBottom'
import FooterTop from './FooterTop'

const Footer = () => {
  return (
    <footer className="mt-24 bg-white p-4 dark:bg-gray-800 sm:p-6">
      <FooterTop />

      <hr className="my-6 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8" />

      <FooterBottom />
    </footer>
  )
}

export default Footer
