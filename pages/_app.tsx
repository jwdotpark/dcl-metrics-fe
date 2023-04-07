import "../styles/globals.css"
import Head from "next/head"
import Script from "next/script"
import { theme } from "../src/lib/theme/theme"
import type { AppProps } from "next/app"
import { ChakraProvider } from "@chakra-ui/react"
import { Provider } from "jotai"
import ErrorBoundary from "../src/components/error/ErrorBoundary"
import { Inter } from "@next/font/google"
import { AnimatePresence } from "framer-motion"
import Router from "next/router"
import { useEffect, useState } from "react"

const InterFont = Inter({
  subsets: ["latin"],
})

function MyApp({
  Component,
  router,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const telemetry = () => {
    return process.env.NEXT_PUBLIC_TELEMETRY === "true"
  }

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const start = () => {
      setLoading(true)
    }
    const end = () => {
      setLoading(false)
    }
    Router.events.on("routeChangeStart", start)
    Router.events.on("routeChangeComplete", end)
    Router.events.on("routeChangeError", end)
    return () => {
      Router.events.off("routeChangeStart", start)
      Router.events.off("routeChangeComplete", end)
      Router.events.off("routeChangeError", end)
    }
  }, [])

  return (
    <ChakraProvider theme={theme}>
      <Provider>
        <Head>
          <title>DCL Metrics</title>
          <link rel="shortcut icon" sizes="32x32" href="/images/favicon.ico" />
          <meta
            name="description"
            content="We make Decentraland's data accessible so it can be used by the community to build a better metaverse."
          />
          <meta
            name="keywords"
            content="Decentraland, dcl stats, decentraland stats, dcl statistics, decentraland statistics, dcl metrics, decentraland metrics, metaverse stats, metaverse statistics, metaverse metrics"
          />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        {telemetry() && (
          <Script
            async
            defer
            data-website-id="ba886c85-0602-4add-a574-52d2d163ecc1"
            src="https://dcl-metrics-telemetry.herokuapp.com/dcl-metrics-telemetry.js"
            // data-domains="dcl-metrics.com/"
          ></Script>
        )}
        <ErrorBoundary>
          {/* @ts-ignore */}
          <AnimatePresence initial={false} mode="wait">
            <main className={InterFont.className}>
              <Component {...pageProps} key={router.asPath} />
            </main>
          </AnimatePresence>
        </ErrorBoundary>
      </Provider>
    </ChakraProvider>
  )
}

export default MyApp
