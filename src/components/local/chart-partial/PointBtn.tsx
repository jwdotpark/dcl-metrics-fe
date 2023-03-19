/* eslint-disable react-hooks/rules-of-hooks */
import { Button, Text, useColorModeValue } from "@chakra-ui/react"

const PointBtn = ({ togglePoint, setTogglePoint }) => {
  return (
    <Button
      mr="2"
      bg={
        togglePoint
          ? useColorModeValue("gray.300", "gray.700")
          : useColorModeValue("gray.100", "gray.500")
      }
      border={useColorModeValue("gray.200", "gray.600")}
      borderRadius="md"
      shadow="md"
      onClick={() => setTogglePoint(!togglePoint)}
      size="xs"
      variant="solid"
    >
      <Text>Point</Text>
    </Button>
  )
}

export default PointBtn
