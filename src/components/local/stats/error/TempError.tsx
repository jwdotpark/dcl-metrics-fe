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
import { useState } from "react"
import GridBox from "../../GridBox"

const AlertComponent = () => {
  return (
    <Alert
      borderRadius="md"
      status="warning"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      h="100%"
    >
      <AlertIcon boxSize="40px" mr={0} mt="4" />
      <AlertTitle mt={4} mb={1} fontSize="3xl">
        Partial Outage
      </AlertTitle>
      <AlertDescription my="4">
        We are experiencing service outages with the Decentraland API and the
        quality of data is currently degraded. We apologize for any
        inconvenience!
      </AlertDescription>
    </Alert>
  )
}

const TempError = () => {
  const box = {
    // h: "300",
    w: "100%",
    bg: useColorModeValue("white", "gray.800"),
  }
  return (
    <Box borderRadius="md">
      <GridBox box={box} mb="8">
        <Box h="100%">
          <AlertComponent />
        </Box>
      </GridBox>
    </Box>
  )
}

export default TempError
