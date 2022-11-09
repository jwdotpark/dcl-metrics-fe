import { Button, Tooltip, useColorMode } from "@chakra-ui/react"
import { FiMoon, FiSun } from "react-icons/fi"
const ColorButton = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <>
      <Tooltip
        p="2"
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
