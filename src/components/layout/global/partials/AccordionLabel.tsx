import {
  Box,
  Text,
  AccordionButton,
  useColorModeValue,
  AccordionIcon,
} from "@chakra-ui/react"

const AccordionLabel = ({ name }) => {
  return (
    <h2>
      <AccordionButton
        bg={useColorModeValue("gray.300", "gray.600")}
        borderTopRadius={name === "Users" ? "md" : "none"}
        _hover={{
          bg: useColorModeValue("gray.400", "gray.700"),
        }}
        _expanded={{
          bg: useColorModeValue("gray.300", "gray.600"),
          color: useColorModeValue("gray.800", "white"),
        }}
      >
        <Box flex="1" py="2" textAlign="center">
          <Text as="b" fontSize="3xl" fontWeight="semibold">
            {name}
          </Text>
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
  )
}

export default AccordionLabel
