import type { AppProps } from 'next/app'
import { ToastContainer, toast } from 'react-toastify'

import { Theme } from '@radix-ui/themes'

import '@radix-ui/themes/styles.css'
import 'react-toastify/dist/ReactToastify.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Theme accentColor="indigo">
      <Component {...pageProps} />
      <ToastContainer theme="colored" />
    </Theme>
  )
}
