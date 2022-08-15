import "../styles/globals.css"
import Head from "next/head"
import type { AppProps } from "next/app"
import { ChakraProvider } from "@chakra-ui/react"

function SafeHydrate({ children }) {
  return (
    <div suppressHydrationWarning>
      {typeof window === "undefined" ? null : children}
    </div>
  )
}

// export function reportWebVitals(metric) {
//   switch (metric.name) {
//     case "FCP":
//       // handle FCP results
//       break
//     case "LCP":
//       // handle LCP results
//       break
//     case "CLS":
//       // handle CLS results
//       break
//     case "FID":
//       // handle FID results
//       break
//     case "TTFB":
//       // handle TTFB results
//       break
//     case "INP":
//       // handle INP results (note: INP is still an experimental metric)
//       break
//     default:
//       break
//   }
// }

function MyApp({ Component, pageProps }: AppProps) {
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
          <script
            async
            defer
            data-website-id="149cf6e0-3ac8-4781-b4c3-d10a8bf3437e"
            src="https://dcl-metrics-telemetry.herokuapp.com/umami.js"
          ></script>
        </Head>
        <Component {...pageProps} />
      </SafeHydrate>
    </ChakraProvider>
  )
}

export default MyApp
