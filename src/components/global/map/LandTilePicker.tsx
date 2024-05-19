import { Box, SimpleGrid } from "@chakra-ui/react"
import BoxTitle from "../../layout/local/BoxTitle"
import BoxWrapper from "../../layout/local/BoxWrapper"
import MapTilePicker from "./partials/MapTilePicker"

export const LandTilePicker = ({ parcelData, isPage, parcelCoord }) => {
  return (
    <Box mb="4">
      <BoxWrapper colSpan={0}>
        <BoxTitle
          name="Land Tile Picker"
          description="Choose the land!"
          date=""
          avgData=""
          slicedData=""
          color=""
          line={undefined}
          setLine={undefined}
        />
        <Box h="100%">
          <Box h="500px" m="4" bg="gray.100">
            <MapTilePicker />
          </Box>
        </Box>
      </BoxWrapper>
    </Box>
  )
}
