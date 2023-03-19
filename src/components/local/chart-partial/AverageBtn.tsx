/* eslint-disable react-hooks/rules-of-hooks */
import { Button, Text, useColorModeValue } from "@chakra-ui/react"

const AverageBtn = ({ toggleMarker, setToggleMarker }) => {
  return (
    <Button
      mr="2"
      bg={
        toggleMarker
          ? useColorModeValue("gray.300", "gray.500")
          : useColorModeValue("gray.100", "gray.700")
      }
      border={useColorModeValue("gray.200", "gray.600")}
      borderRadius="md"
      shadow="md"
      onClick={() => setToggleMarker(!toggleMarker)}
      size="xs"
      variant="solid"
    >
      <Text>Avg.</Text>
    </Button>
  )
}

export default AverageBtn
