import { Box, IconButton, useColorModeValue } from "@chakra-ui/react"
import { FiRotateCcw } from "react-icons/fi"
import ToolTip from "../../../../layout/local/ToolTip"

const ChartResetBtn = ({ handleReset }) => {
  return (
    <Box pos="absolute" zIndex="99999" top="0" right="5">
      <ToolTip label={`Reset`}>
        <IconButton
          zIndex="auto"
          border="1px solid"
          borderColor={useColorModeValue("gray.200", "gray.600")}
          borderRadius="full"
          shadow="md"
          aria-label={""}
          icon={<FiRotateCcw />}
          onClick={() => handleReset()}
          size="xs"
          type="button"
        />
      </ToolTip>
    </Box>
  )
}

export default ChartResetBtn
