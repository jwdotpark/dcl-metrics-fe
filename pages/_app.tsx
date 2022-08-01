import "../styles/globals.css"
import Head from "next/head"
import type { AppProps } from "next/app"
import { ChakraProvider } from "@chakra-ui/react"
import { useEffect } from "react"
import {
  isDev,
  fetchFingerprint,
  postTelemetry,
} from "../src/lib/hooks/telemetry"
import { useRouter } from "next/router"

function SafeHydrate({ children }) {
  return (
    <div suppressHydrationWarning>
      {typeof window === "undefined" ? null : children}
    </div>
  )
}
function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  useEffect(() => {
    if (!isDev) {
      fetchFingerprint()
      const fingerPrintInfo = sessionStorage.getItem("fingerPrint")
      // const ip = props.ip
      postTelemetry(JSON.parse(fingerPrintInfo))
    }
    // eslint-disable-next-line
  }, [router.pathname])

  return (
    <ChakraProvider>
      <SafeHydrate>
        <Head>
          <title>DCL Metrics</title>
          <link rel="shortcut icon" sizes="32x32" href="/images/favicon.ico" />
          <meta name="DCL Metrics" content="DCL Metrics" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Component {...pageProps} />
      </SafeHydrate>
    </ChakraProvider>
  )
}

export default MyApp
