import "../styles/globals.css"
import Head from "next/head"
import Script from "next/script"
import { theme } from "../src/lib/theme/theme"
import type { AppProps } from "next/app"
import { ChakraProvider } from "@chakra-ui/react"
import { Provider } from "jotai"
import { Inter } from "@next/font/google"
import { AnimatePresence } from "framer-motion"

const InterFont = Inter({
  subsets: ["latin"],
})

function MyApp({
  Component,
  router,
  // eslint-disable-next-line no-unused-vars
  pageProps: { session, ...pageProps },
}: AppProps) {
  const telemetry = () => {
    return process.env.NEXT_PUBLIC_TELEMETRY === "true"
  }

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
        {/* @ts-ignore */}
        <AnimatePresence initial={false} mode="wait">
          <main className={InterFont.className}>
            <Component {...pageProps} key={router.asPath} />
          </main>
        </AnimatePresence>
      </Provider>
    </ChakraProvider>
  )
}

export default MyApp
