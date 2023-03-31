import { Text, Center, useColorModeValue, useColorMode } from "@chakra-ui/react"
import Link from "next/link"

const BottomLegend = ({ description, link }) => {
  return (
    <Center mb="2">
      <Text color="gray.400" fontSize="xs">
        {description}
      </Text>
      <Link href={link} target="_bkank">
        <Text
          ml="1"
          color={useColorModeValue("blue.400", "blue.200")}
          fontSize="xs"
          fontWeight="semibold"
        >
          {link}
        </Text>
      </Link>
    </Center>
  )
}

export default BottomLegend
