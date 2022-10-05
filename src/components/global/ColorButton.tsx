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
        fontSize="sm"
        borderRadius="md"
        label="Toggle Color Mode"
        placement="auto"
      >
        <Button onClick={toggleColorMode} size="lg" variant="link">
          {colorMode === "light" ? <FiMoon /> : <FiSun />}
        </Button>
      </Tooltip>
    </>
  )
}

export default ColorButton
