import {
  Flex,
  useColorModeValue,
  Center,
  Spacer,
  IconButton,
} from "@chakra-ui/react"
import { FiXCircle } from "react-icons/fi"

export const PanelHeader = ({ setOpen }) => {
  return (
    <Flex
      className="handler"
      direction="row"
      w="100%"
      h="50px"
      bg={useColorModeValue("gray.500", "gray.900")}
      _hover={{ cursor: "grab" }}
    >
      <Center h="100%" mx="4">
        Handler
      </Center>
      <Spacer />
      <Center w="4rem" h="100%">
        <IconButton
          bg={useColorModeValue("gray.400", "gray.200")}
          borderRadius="full"
          shadow="sm"
          aria-label={"close"}
          icon={<FiXCircle size="100%" />}
          onClick={() => setOpen(false)}
          size="xs"
        />
      </Center>
    </Flex>
  )
}
