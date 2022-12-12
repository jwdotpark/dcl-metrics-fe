import { Box, useDisclosure, Button, useColorModeValue } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { useState } from "react"
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
  // const { getButtonProps, getDisclosureProps, isOpen } = useDisclosure()
  // const [hidden, setHidden] = useState(!isOpen)
  return (
    <Box zIndex="banner">
      <motion.div
        {...getDisclosureProps()}
        hidden={hidden}
        initial={false}
        onAnimationStart={() => setHidden(false)}
        onAnimationComplete={() => setHidden(!isOpen)}
        animate={{ width: isOpen ? 500 : 0 }}
        style={{
          background: "#4A5568",
          overflow: "hidden",
          whiteSpace: "nowrap",
          position: "absolute",
          right: "0",
          height: "100%",
          top: "0",
        }}
      >
        <Button zIndex="popover" {...getButtonProps()}>
          Close
        </Button>
        <MapInfo
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
