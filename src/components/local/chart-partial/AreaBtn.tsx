/* eslint-disable react-hooks/rules-of-hooks */
import { Button, Text, useColorModeValue } from "@chakra-ui/react"

const AreaBtn = ({ toggleArea, setToggleArea }) => {
  return (
    <Button
      mr="2"
      bg={
        toggleArea
          ? useColorModeValue("gray.300", "gray.500")
          : useColorModeValue("gray.100", "gray.700")
      }
      border={useColorModeValue("gray.200", "gray.600")}
      borderRadius="md"
      shadow="md"
      onClick={() => setToggleArea(!toggleArea)}
      size="xs"
      variant="solid"
    >
      <Text>Area</Text>
    </Button>
  )
}

export default AreaBtn
