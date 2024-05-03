import type { AppProps } from 'next/app'

import { ThemeProvider } from 'styled-components'

import { Theme } from '@radix-ui/themes'

import '@radix-ui/themes/styles.css'
import GlobalStyles from '@styles/global'
import { defaultTheme } from '@styles/theme'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Theme accentColor="indigo">
        <Component {...pageProps} />
      </Theme>
      <GlobalStyles />
    </ThemeProvider>
  )
}
