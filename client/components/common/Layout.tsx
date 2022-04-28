import { ReactNode } from 'react'
import Head from 'next/head'

import Navbar from './Navbar'
import Footer from './Footer'

interface LayoutProps {
  title: string
  description?: string
  children?: ReactNode
}

const Layout = ({ title, description, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title ? `${title} - Sapphire` : `Sapphire`}</title>
        {description && <meta name="description" content={description} />}
        <link rel="icon" href="/favicon.svg" />
        <meta name="description" content="A clothing store" />
        <meta
          name="keywords"
          content="clothes store ecommerce e-commerce fashion"
        />
      </Head>
      <Navbar />
      <div className="mx-auto min-h-screen">{children}</div>
      <Footer />
    </>
  )
}

export default Layout
