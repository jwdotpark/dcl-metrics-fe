import { ChakraProvider } from "@chakra-ui/react"

export const ThemeWrapper = ({ children }) => {
  return <ChakraProvider>{children}</ChakraProvider>
}


