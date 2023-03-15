import { Text, Center, useColorModeValue } from "@chakra-ui/react"

const BottomLegend = ({ description }) => {
  return (
    <Center mb="2">
      <Text
        // eslint-disable-next-line react-hooks/rules-of-hooks
        color={useColorModeValue("gray.100", "gray.600")}
        fontSize="xs"
      >
        {description}
      </Text>
    </Center>
  )
}

export default BottomLegend
