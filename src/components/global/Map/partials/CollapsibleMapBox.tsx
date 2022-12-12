import { Box, useDisclosure, Button, useColorModeValue } from "@chakra-ui/react"
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
}) => {
  return (
    <Box zIndex="docked">
      <motion.div
        {...getDisclosureProps()}
        hidden={hidden}
        initial={false}
        onAnimationStart={() => setHidden(false)}
        onAnimationComplete={() => setHidden(!isOpen)}
        animate={{ width: isOpen ? 500 : 0 }}
        style={{
          zIndex: 9000,
          backdropFilter: "blur(20px)",
          overflowY: "scroll",
          whiteSpace: "nowrap",
          position: "absolute",
          right: "0",
          height: "100%",
          top: "0",
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
