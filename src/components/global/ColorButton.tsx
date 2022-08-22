import {
  Button,
  Tooltip,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react"
import { FiMoon, FiSun } from "react-icons/fi"
const ColorButton = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <>
      <Tooltip
        label="theme change"
        placement="auto"
        fontSize="sm"
        bg={useColorModeValue("gray.300", "gray.700")}
        color={useColorModeValue("black", "white")}
        borderRadius="md"
      >
        <Button size="lg" variant="link" onClick={toggleColorMode}>
          {colorMode === "light" ? <FiMoon /> : <FiSun />}
        </Button>
      </Tooltip>
    </>
  )
}

export default ColorButton
