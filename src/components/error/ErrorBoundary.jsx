import React from "react"
import Layout from "../layout/layout"
import {
  Box,
  Flex,
  Center,
  Text,
  Button,
  Container,
  Divider,
  VStack,
  StackDivider,
} from "@chakra-ui/react"

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    })
    console.log("error", error)
    console.log("errorInfo", errorInfo)
  }

  render() {
    if (this.state.errorInfo) {
      // fallback ui
      return (
        <Container maxW={["xl", "2xl", "4xl", "8xl"]} mt="20">
          <VStack
            align="stretch"
            divider={<StackDivider borderColor="gray.600" />}
            spacing={4}
          >
            <Box maxW="md" p="4" px={[8, 0, 0, 0]}>
              <Text fontSize="4xl">Sorry, there is an error!</Text>
            </Box>
            <Box maxW="md" p="4" px={[8, 0, 0, 0]}>
              <Text mb="2" fontSize="4xl">
                Error
              </Text>
              <Text as="kbd">
                {this.state.error && this.state.error.toString()}
              </Text>
            </Box>
            <Box maxW="md" p="4" px={[8, 0, 0, 0]}>
              <Text mb="2" fontSize="4xl">
                Error Stack
              </Text>
              <Text as="kbd">
                {this.state.errorInfo.componentStack.toString()}
              </Text>
            </Box>
            <Box pt="8">
              <Button
                borderRadius="xl"
                onClick={() => this.setState({ errorInfo: null })}
                type="button"
              >
                Try again?
              </Button>
            </Box>
          </VStack>
        </Container>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
