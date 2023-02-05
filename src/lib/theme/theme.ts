import { extendTheme, useColorModeValue } from "@chakra-ui/react"

export const theme = extendTheme({
  styles: {
    global: {
      h1: {
        fontSize: "5xl",
        fontWeight: "bold",
        marginBottom: "2rem",
        marginTop: "2rem",
      },
      h2: {
        fontSize: "4xl",
        fontWeight: "bold",
        marginBottom: "1rem",
        marginTop: "1rem",
      },
      h3: {
        fontSize: "3xl",
        fontWeight: "bold",
        marginBottom: "1rem",
        marginTop: "1rem",
      },
      h4: {
        fontSize: "2xl",
        fontWeight: "bold",
        marginBottom: "1rem",
        marginTop: "1rem",
      },
      h5: {
        fontSize: "xl",
        fontWeight: "bold",
        marginBottom: "1rem",
        marginTop: "1rem",
      },
      p: {
        fontSize: "lg",
        fontWeight: "normal",
      },
    },
  },
})
