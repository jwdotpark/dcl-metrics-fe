import { Box, useColorModeValue, SimpleGrid } from "@chakra-ui/react"
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
      bg={box.bg}
      border="solid 1px"
      borderColor={useColorModeValue("gray.200", "gray.600")}
      borderRadius="xl"
      shadow="md"
    >
      <SimpleGrid p="4" columns={isIncluded ? 2 : 1} spacing={4}>
        <ParcelInfoBox
          isIncluded={isIncluded}
          isMapExpanded={isMapExpanded}
          selectedParcel={selectedParcel}
          coord={coord}
          mapHeight={mapHeight}
        />
        {isIncluded && (
          <SceneInfoBox
            isIncluded={isIncluded}
            isMapExpanded={isMapExpanded}
            selectedParcel={selectedParcel}
            coord={coord}
            mapHeight={mapHeight}
          />
        )}
      </SimpleGrid>
    </Box>
  )
}

export default MapInfo
