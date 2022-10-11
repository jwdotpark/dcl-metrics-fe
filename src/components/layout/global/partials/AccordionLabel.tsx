import {
  Box,
  Text,
  AccordionButton,
  useColorModeValue,
  AccordionIcon,
  Button,
} from "@chakra-ui/react"
import { useState } from "react"
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

  const [parcelRadius, setParcelRadius] = useState(false)
  const handleParcelRadius = (value: string) => {
    if (value === "Parcels") {
      setParcelRadius(!parcelRadius)
    }
  }

  return (
    <h2>
      <AccordionButton
        bg={useColorModeValue("gray.300", "gray.600")}
        borderBottomWidth="0"
        borderTopRadius={name === "Users" ? "xl" : "none"}
        borderBottomRadius={parcelRadius && "xl"}
        _hover={{
          bg: useColorModeValue("gray.400", "gray.700"),
        }}
        _expanded={{
          bg: useColorModeValue("gray.300", "gray.600"),
          color: useColorModeValue("gray.800", "white"),
        }}
        onClick={(e) => {
          // @ts-ignore
          handleParcelRadius(e.target.innerText)
        }}
      >
        <Box flex="1" py="2" textAlign="center">
          <Button leftIcon={labelIcon(name)} variant="link">
            <Text
              as="b"
              color={useColorModeValue("gray.700", "gray.100")}
              fontSize="30px"
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
