import { Tooltip, Box, useBreakpointValue } from "@chakra-ui/react"
import { FiInfo } from "react-icons/fi"
import ToolTip from "../../../../layout/local/ToolTip"

const SceneHelpTooltip = (description) => {
  const helpTooltipSize = useBreakpointValue({
    base: "14px",
    sm: "14px",
    md: "16px",
    lg: "18px",
  })

  return (
    <ToolTip label={description.description}>
      <Box mr="2">
        <FiInfo size={helpTooltipSize} />
      </Box>
    </ToolTip>
  )
}

export default SceneHelpTooltip
