import {
  Box,
  Center,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useColorMode,
  Flex,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react"
import GridBox from "../../GridBox"

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

const ErrorBox = ({ isError }) => {
  const box = {
    w: "100%",
    bg: useColorModeValue("white", "gray.800"),
  }

  return (
    <Box mb="4" borderRadius="xl">
      <GridBox box={box}>
        <Box h="100%">{isError ? <Warning /> : <Okay />}</Box>
      </GridBox>
    </Box>
  )
}

export default ErrorBox
