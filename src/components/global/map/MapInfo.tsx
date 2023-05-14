/* eslint-disable no-unused-vars */
import { Box } from "@chakra-ui/react"
import ParcelInfoBox from "./partials/ParcelInfoBox"

const MapInfo = ({
  coord,
  selectedParcel,
  isMapExpanded,
  mapBoxVerticalSize,
  mapHeight,
  getButtonProps,
}) => {
  const isIncluded = selectedParcel.scene ? true : false
  return (
    <Box w="100%" borderRadius="xl">
      <ParcelInfoBox
        getButtonProps={getButtonProps}
        isIncluded={isIncluded}
        isMapExpanded={isMapExpanded}
        selectedParcel={selectedParcel}
        coord={coord}
      />
    </Box>
  )
}

export default MapInfo
