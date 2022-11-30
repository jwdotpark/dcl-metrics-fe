import {
  Button,
  Box,
  GridItem,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import MapInfoTable from "./partials/ParcelInfoTable"
import MapImage from "./partials/MapImage"
import ParcelInfoBox from "./partials/ParcelInfoBox"
import SceneInfoBox from "./partials/SceneInfoBox"

const MapInfo = ({
  h,
  coord,
  setCoord,
  selectedParcel,
  setSelectedParcel,
  isMapExpanded,
  setIsMapExpanded,
}) => {
  const box = {
    h: "auto",
    w: "100%",
    bg: useColorModeValue("gray.100", "gray.700"),
  }

  const isIncluded = selectedParcel.scene ? true : false
  console.log(isIncluded)

  return (
    <Box
      w={["100%", "100%", "100%", "50%"]}
      bg={box.bg}
      border="solid 1px"
      borderColor={useColorModeValue("gray.200", "gray.600")}
      borderRadius="xl"
      shadow="md"
    >
      <Flex h="100%" mb="4" borderRadius="xl">
        <ParcelInfoBox
          isIncluded={isIncluded}
          isMapExpanded={isMapExpanded}
          selectedParcel={selectedParcel}
          coord={coord}
        />
        {isIncluded && (
          <SceneInfoBox
            isIncluded={isIncluded}
            isMapExpanded={isMapExpanded}
            selectedParcel={selectedParcel}
            coord={coord}
          />
        )}
      </Flex>
    </Box>
  )
}

export default MapInfo
