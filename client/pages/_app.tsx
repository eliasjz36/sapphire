import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'

import { ToastContainer } from 'react-toastify'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

import { StoreProvider } from '../context/Store'

import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.min.css'

const initialOptions = {
  'client-id': 'test',
  currency: 'USD',
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <StoreProvider>
        <PayPalScriptProvider deferLoading={true} options={initialOptions}>
          <Component {...pageProps} />
        </PayPalScriptProvider>
      </StoreProvider>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        limit={1}
      />
    </ThemeProvider>
  )
}

export default MyApp
