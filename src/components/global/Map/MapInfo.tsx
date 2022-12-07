import {
  Box,
  Button,
  Center,
  Flex,
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react"
import image from "next/image"
import { description } from "../../../lib/data/sceneInfo"
import MapImage from "./partials/MapImage"
import ParcelInfoBox from "./partials/ParcelInfoBox"
import ParcelInfoTable from "./partials/ParcelInfoTable"

const MapInfo = ({
  h,
  coord,
  setCoord,
  selectedParcel,
  setSelectedParcel,
  isMapExpanded,
  setIsMapExpanded,
  mapBoxVerticalSize,
  mapHeight,
}) => {
  const box = {
    h: "auto",
    w: "100%",
    bg: useColorModeValue("gray.100", "gray.700"),
  }

  const isIncluded = selectedParcel.scene ? true : false
  return (
    <Box
      w={["100%", "100%", "100%", mapBoxVerticalSize.info]}
      mt={[4, 4, 4, isMapExpanded ? 4 : 0]}
      ml={[0, 0, 0, isMapExpanded ? 0 : 4]}
      bg={box.bg}
      border="solid 1px"
      borderColor={useColorModeValue("gray.200", "gray.600")}
      borderRadius="xl"
      shadow="md"
    >
      <ParcelInfoBox
        isIncluded={isIncluded}
        isMapExpanded={isMapExpanded}
        selectedParcel={selectedParcel}
        coord={coord}
        mapHeight={mapHeight}
      />
    </Box>
  )
}

export default MapInfo
