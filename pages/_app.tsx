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
            data-website-id="ba886c85-0602-4add-a574-52d2d163ecc1"
            src="https://dcl-metrics-telemetry.herokuapp.com/dcl-metrics-telemetry.js"
            data-cache="true"
          ></script>
        </Head>
        <Component {...pageProps} />
      </SafeHydrate>
    </ChakraProvider>
  )
}

export default MyApp
