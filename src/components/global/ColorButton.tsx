import { Button, useColorMode } from "@chakra-ui/react"
import { FiMoon, FiSun } from "react-icons/fi"
const ColorButton = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <>
      {/* <Button size="lg" variant="link" onClick={toggleColorMode}>
        {colorMode === "light" ? <FiMoon /> : <FiSun />}
      </Button> */}
    </>
  )
}

export default ColorButton
