import { Text, Button, Center, useColorModeValue } from "@chakra-ui/react"
import { useRouter } from "next/router"

const AccordionLink = ({ name }) => {
  const router = useRouter()
  return (
    <Center w="100%">
      <Button
        bg={useColorModeValue("#6272a4", "#282a36")}
        borderRadius="xl"
        shadow="md"
        _hover={{
          bg: useColorModeValue("gray.600", "gray.700"),
        }}
        onClick={() => router.push(`/${name}`)}
        size="sm"
        variant="ghost"
      >
        <Text color={useColorModeValue("#fff", "gray.200")} fontSize="sm">
          View More {name.charAt(0).toUpperCase() + name.slice(1)}
        </Text>
      </Button>
    </Center>
  )
}

export default AccordionLink
