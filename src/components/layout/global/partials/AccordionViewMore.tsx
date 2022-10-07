import { Text, Button, Center, useColorModeValue } from "@chakra-ui/react"
import { FiChevronsUp, FiChevronsDown } from "react-icons/fi"

const AccordionViewMore = ({ isOpen, onToggle }) => {
  return (
    <Center w="100%" py="4">
      <Button
        bg={useColorModeValue("#6272a4", "#282a36")}
        border="2px solid"
        borderColor={useColorModeValue("#282a3625", "#6272a425")}
        borderRadius="xl"
        shadow="md"
        _hover={{
          bg: useColorModeValue("gray.600", "gray.700"),
        }}
        onClick={onToggle}
        rightIcon={
          isOpen ? (
            <FiChevronsUp color="gray.200" />
          ) : (
            <FiChevronsDown color="gray.200" />
          )
        }
        size="md"
        variant="ghost"
      >
        <Text color={useColorModeValue("#fff", "gray.200")} fontSize="sm">
          {isOpen ? "View Less" : "View More"}
        </Text>
      </Button>
    </Center>
  )
}

export default AccordionViewMore
