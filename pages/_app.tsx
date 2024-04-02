import "../styles/globals.css"
import Script from "next/script"
import { theme } from "../src/lib/theme/theme"
import type { AppProps } from "next/app"
import { ChakraProvider } from "@chakra-ui/react"
import { Provider } from "jotai"
import { Inter } from "next/font/google"
import { AnimatePresence } from "framer-motion"
import { DefaultSeo } from "next-seo"
import { generateMetaData, siteUrl } from "../src/lib/data/metadata"
import Head from "next/head"
//import { generateMetaData } from "../src/lib/data/metadata"

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

  const pageTitle = "DCL-Metrics - Decentraland Metaverse Data"
  const description =
    "We make Decentraland's data accessible so it can be used by the community to build a better metaverse."
  const image = `${siteUrl}/images/index.png`

  const metaData = generateMetaData({
    title: pageTitle,
    description: description,
    image: image,
  })
  return (
    <ChakraProvider theme={theme}>
      <Provider>
        <Head>
          <link rel="shortcut icon" sizes="32x32" href="/images/favicon.ico" />
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
        <DefaultSeo
          title={metaData.title}
          description={metaData.description}
          openGraph={{
            url: siteUrl,
            title: metaData.title,
            description: metaData.description,
            images: [
              {
                url: metaData.image,
                width: 400,
                height: 400,
                alt: metaData.description,
                type: "image/png",
              },
            ],
            siteName: "DCL-Metrics",
          }}
        />
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
