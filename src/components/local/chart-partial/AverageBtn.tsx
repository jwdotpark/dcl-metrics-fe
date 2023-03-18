/* eslint-disable react-hooks/rules-of-hooks */
import { Button, Text, useColorModeValue } from "@chakra-ui/react"

const AverageBtn = ({ toggleMarker, setToggleMarker }) => {
  return (
    <Button
      pos="absolute"
      zIndex="2"
      top="2"
      right="5"
      bg={
        toggleMarker
          ? useColorModeValue("gray.300", "gray.700")
          : useColorModeValue("gray.100", "gray.500")
      }
      borderRadius="xl"
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
