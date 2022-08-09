import "../styles/globals.css"
import Head from "next/head"
import type { AppProps } from "next/app"
import { ChakraProvider } from "@chakra-ui/react"
import DataProvider from "../src/lib/hooks/DataProvider"

function SafeHydrate({ children }) {
  return (
    <div suppressHydrationWarning>
      {typeof window === "undefined" ? null : children}
    </div>
  )
}
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <DataProvider>
        <SafeHydrate>
          <Head>
            <title>DCL Metrics</title>
            <link
              rel="shortcut icon"
              sizes="32x32"
              href="/images/favicon.ico"
            />
            <meta name="DCL Metrics" content="DCL Metrics" />
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
            />
          </Head>
          <Component {...pageProps} />
        </SafeHydrate>
      </DataProvider>
    </ChakraProvider>
  )
}

export default MyApp
