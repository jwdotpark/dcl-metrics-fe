import {
  Box,
  useColorModeValue,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react"

const Okay = () => {
  return (
    <Alert
      alignItems="center"
      justifyContent="center"
      flexDir="column"
      h="100%"
      textAlign="center"
      borderRadius="xl"
      status="success"
      variant="subtle"
    >
      <AlertIcon boxSize="40px" mt="4" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="2xl">
        All Systems Operational!
      </AlertTitle>
      <AlertDescription mx="4" my="4">
        {/* We are experiencing service outages with the Decentraland API and the
        quality of data is currently degraded. We apologize for any
        inconvenience! */}
      </AlertDescription>
    </Alert>
  )
}

const Warning = () => {
  return (
    <Alert
      alignItems="center"
      justifyContent="center"
      flexDir="column"
      h="100%"
      textAlign="center"
      borderRadius="xl"
      status="warning"
      variant="subtle"
    >
      <AlertIcon boxSize="40px" mt="4" mr={0} />
      <AlertTitle mt={6} mb={0} fontSize="2xl">
        Partial Outage
      </AlertTitle>
      <AlertDescription mx="2" my="4">
        We are experiencing service outages with the Decentraland API and the
        quality of data is currently degraded. We apologize for any
        inconvenience!
      </AlertDescription>
    </Alert>
  )
}

const ErrorBox = ({ error }) => {
  return (
    <Box
      mb="4"
      border="1px solid"
      borderColor={useColorModeValue("gray.200", "gray.900")}
      borderRadius="xl"
      shadow="md"
    >
      <Box h="100%">{error ? <Warning /> : <Okay />}</Box>
    </Box>
  )
}

export default ErrorBox
