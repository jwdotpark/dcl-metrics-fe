import { Button } from "@chakra-ui/react"
import { FiRotateCcw } from "react-icons/fi"
import ToolTip from "../layout/local/ToolTip"

export const ResetButton = () => {
  const handleLayoutReset = () => {
    localStorage.removeItem("gridLayout")
    window.location.reload()
  }

  return (
    <ToolTip label="Reset Layout">
      <Button onClick={handleLayoutReset} size="md" variant="link">
        <FiRotateCcw />
      </Button>
    </ToolTip>
  )
}
