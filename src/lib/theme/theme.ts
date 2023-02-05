import { extendTheme, useColorModeValue } from "@chakra-ui/react"

export const theme = extendTheme({
  fonts: {
    //heading: "Roboto",
    //body: "Roboto",
  },
  styles: {
    global: {
      h1: {
        fontSize: "3xl",
        fontWeight: "bold",
      },
      h2: {
        fontSize: "2xl",
        fontWeight: "bold",
      },
      h3: {
        fontSize: "xl",
        fontWeight: "bold",
      },
      h4: {
        fontSize: "lg",
        fontWeight: "bold",
      },
      h5: {
        fontSize: "md",
        fontWeight: "bold",
      },
      body: {
        fontSize: "md",
        fontWeight: "normal",
      },
    },
  },
})
