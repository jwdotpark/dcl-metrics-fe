import { Box } from "@chakra-ui/react"
import dynamic from "next/dynamic"
const MapWrapper = dynamic(() => import("./Map"), { ssr: false })
import { useEffect, useState } from "react"
import BoxWrapper from "../../layout/local/BoxWrapper"
import BoxTitle from "../../layout/local/BoxTitle"

const LandPicker = ({ parcelData, isPage }) => {
  const [coord, setCoord] = useState({
    x: 0,
    y: 0,
  })

  const defaultParcel = {
    id: "0,0",
    name: "Genesis Plaza",
    owner: "0x4eac6325e1dbf1ac90434d39766e164dca71139e",
  }

  const [selectedParcel, setSelectedParcel] = useState(defaultParcel)
  const [isMapExpanded, setIsMapExpanded] = useState(false)
  const mapBoxVerticalSize = {
    map: isMapExpanded ? "100%" : "100%",
    info: isMapExpanded ? "100%" : "100%",
  }

  const defaultMapHeight = {
    collapsed: 500,
    expanded: "80vh",
  }
  const [mapHeight, setMapHeight] = useState(defaultMapHeight)

  useEffect(() => {
    if (isPage) {
      setIsMapExpanded(true)
    }
  }, [isPage])

  return (
    <Box mb="4">
      <BoxWrapper colSpan={0}>
        <BoxTitle
          name="Land Picker"
          description="Choose the land!"
          date=""
          avgData=""
          slicedData=""
          color=""
          line={undefined}
          setLine={undefined}
        />
        <Box h="100%">
          <MapWrapper
            h="auto"
            isMapExpanded={isMapExpanded}
            setIsMapExpanded={setIsMapExpanded}
            coord={coord}
            setCoord={setCoord}
            selectedParcel={selectedParcel}
            setSelectedParcel={setSelectedParcel}
            mapBoxVerticalSize={mapBoxVerticalSize}
            mapHeight={mapHeight}
            setMapHeight={setMapHeight}
            parcelData={parcelData}
          />
        </Box>
      </BoxWrapper>
    </Box>
  )
}

export default LandPicker
