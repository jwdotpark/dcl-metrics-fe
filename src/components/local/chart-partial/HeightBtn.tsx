/* eslint-disable react-hooks/rules-of-hooks */
import { Button, Text, useColorModeValue } from "@chakra-ui/react"

const HeightBtn = ({ height, setHeight }) => {
  return (
    <Button
      mr="2"
      bg={
        setHeight
          ? useColorModeValue("gray.300", "gray.500")
          : useColorModeValue("gray.100", "gray.700")
      }
      border={useColorModeValue("gray.200", "gray.600")}
      borderRadius="md"
      shadow="md"
      onClick={() => setHeight(!height)}
      size="xs"
      variant="solid"
    >
      <Text>{!height ? "Expand" : "Shrink"}</Text>
    </Button>
  )
}

export default HeightBtn
