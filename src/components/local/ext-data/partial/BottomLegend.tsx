import { Text, Center, useColorModeValue } from "@chakra-ui/react"

const BottomLegend = ({ description }) => {
  return (
    <Center mb="2">
      <Text color="gray.400" fontSize="xs">
        {description}
      </Text>
    </Center>
  )
}

export default BottomLegend
