/* eslint-disable no-unused-vars */
import { Box, useBreakpointValue } from "@chakra-ui/react"
import { motion } from "framer-motion"
import ParcelInfoBox from "./ParcelInfoBox"

const CollapsibleMapBox = ({
  getButtonProps,
  getDisclosureProps,
  isOpen,
  hidden,
  setHidden,
  coord,
  selectedParcel,
  isMapExpanded,
  mapBoxVerticalSize,
  mapHeight,
  handle,
}) => {
  const mobileWidth = useBreakpointValue({
    base: "100%",
    sm: 300,
    md: 500,
    lg: 500,
    xl: 500,
  })
  const isIncluded = selectedParcel.scene ? true : false

  return (
    <Box>
      <motion.div
        {...getDisclosureProps()}
        hidden={hidden}
        initial={false}
        onAnimationStart={() => setHidden(false)}
        onAnimationComplete={() => setHidden(!isOpen)}
        animate={{ width: isOpen ? mobileWidth : 0 }}
        style={{
          zIndex: "1750",
          backdropFilter: "blur(5px) brightness(0.5)",
          overflowY: isMapExpanded ? "hidden" : "scroll",
          whiteSpace: "nowrap",
          position: "absolute",
          right: "0",
          height: isMapExpanded ? "auto" : handle.active ? "auto" : "100%",
          top: "0",
          borderRadius: "0 0 0 16px",
        }}
      >
        <Box w="100%" borderRadius="xl">
          <ParcelInfoBox
            getButtonProps={getButtonProps}
            isIncluded={isIncluded}
            isMapExpanded={isMapExpanded}
            selectedParcel={selectedParcel}
            coord={coord}
          />
        </Box>
      </motion.div>
    </Box>
  )
}

export default CollapsibleMapBox
