import {
  Box,
  Text,
  AccordionButton,
  useColorModeValue,
  AccordionIcon,
  Button,
} from "@chakra-ui/react"
import { FiUsers, FiMapPin, FiPackage } from "react-icons/fi"

const AccordionLabel = ({ name }) => {
  const labelIcon = (name) => {
    if (name === "Users") {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return <FiUsers size="24px" color={useColorModeValue("#000", "#fff")} />
    } else if (name === "Scenes") {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return <FiMapPin size="24px" color={useColorModeValue("#000", "#fff")} />
    } else if (name === "Parcels") {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return <FiPackage size="24px" color={useColorModeValue("#000", "#fff")} />
    }
  }
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
          <Button leftIcon={labelIcon(name)} variant="link">
            <Text
              as="b"
              sx={{ transform: "translateY(4px)" }}
              color={useColorModeValue("gray.700", "gray.100")}
              fontSize="24px"
            >
              {name}
            </Text>
          </Button>
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
  )
}

export default AccordionLabel
