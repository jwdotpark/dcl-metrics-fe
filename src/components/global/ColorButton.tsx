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
        label="Toggle Color Mode"
        placement="auto"
        fontSize="sm"
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
