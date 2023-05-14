import { Button, useColorMode } from "@chakra-ui/react"
import { FiMoon, FiSun } from "react-icons/fi"
import ToolTip from "../../components/layout/local/ToolTip"

const ColorButton = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <ToolTip label="Toggle Color Mode">
      <Button
        data-testid="colorBtn"
        onClick={toggleColorMode}
        size="lg"
        variant="link"
      >
        {colorMode === "light" ? <FiMoon /> : <FiSun />}
      </Button>
    </ToolTip>
  )
}

export default ColorButton
