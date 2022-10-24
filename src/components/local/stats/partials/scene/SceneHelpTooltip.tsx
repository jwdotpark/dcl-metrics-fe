import { Tooltip, Box, useBreakpointValue } from "@chakra-ui/react"
import { FiInfo } from "react-icons/fi"

const SceneHelpTooltip = (description) => {
  const helpTooltipSize = useBreakpointValue({
    base: "14px",
    sm: "14px",
    md: "16px",
    lg: "18px",
  })

  return (
    <Tooltip
      p="2"
      fontSize="sm"
      borderRadius="md"
      label={description.description}
      placement="auto"
    >
      <Box mr="2">
        <FiInfo size={helpTooltipSize} />
      </Box>
    </Tooltip>
  )
}

export default SceneHelpTooltip
