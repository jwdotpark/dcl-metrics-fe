import {
  Box,
  useDisclosure,
  Button,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react"
import { motion } from "framer-motion"
import MapInfo from "../MapInfo"

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
  return (
    <Box zIndex="auto">
      <motion.div
        {...getDisclosureProps()}
        hidden={hidden}
        initial={false}
        onAnimationStart={() => setHidden(false)}
        onAnimationComplete={() => setHidden(!isOpen)}
        animate={{ width: isOpen ? mobileWidth : 0 }}
        style={{
          zIndex: 9000,
          backdropFilter: "blur(5px)",
          overflowY: isMapExpanded ? "hidden" : "scroll",
          whiteSpace: "nowrap",
          position: "absolute",
          right: "0",
          height: isMapExpanded ? "auto" : handle.active ? "auto" : "100%",
          top: "0",
          borderRadius: "0 0 0 16px",
        }}
      >
        <MapInfo
          getButtonProps={getButtonProps}
          coord={coord}
          selectedParcel={selectedParcel}
          isMapExpanded={isMapExpanded}
          mapBoxVerticalSize={mapBoxVerticalSize}
          mapHeight={mapHeight}
        />
      </motion.div>
    </Box>
  )
}

export default CollapsibleMapBox
