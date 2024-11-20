import { Box, IconButton } from "@chakra-ui/react"
import { FiRotateCcw } from "react-icons/fi"
import ToolTip from "../../../../layout/local/ToolTip"

const ChartResetBtn = ({ handleReset }) => {
  return (
    <Box pos="absolute" zIndex="8" top="0" right="5">
      <ToolTip label={`Reset`}>
        <IconButton
          borderRadius="none"
          aria-label={"Reset button"}
          icon={<FiRotateCcw />}
          onClick={() => handleReset()}
          size="sm"
          type="button"
          variant="ghost"
        />
      </ToolTip>
    </Box>
  )
}

export default ChartResetBtn
