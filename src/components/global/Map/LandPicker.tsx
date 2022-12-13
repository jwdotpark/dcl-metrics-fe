import { Text, Box, useColorModeValue, Flex, Spacer } from "@chakra-ui/react"
import GridBox from "../../local/GridBox"
import dynamic from "next/dynamic"
const MapWrapper = dynamic(() => import("./Map"), { ssr: false })
import { useEffect, useState } from "react"

const LandPicker = ({ parcelData, isPage }) => {
  const box = {
    h: "auto",
    w: "100%",
    bg: useColorModeValue("white", "gray.800"),
  }

  const h = "auto"

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
    <GridBox box={box}>
      <Flex pos="relative" mt="4" mx="5">
        <Flex w="100%">
          <Box>
            <Text fontSize="2xl">
              <b>Land Picker </b>
            </Text>
          </Box>
          <Spacer />
        </Flex>
      </Flex>
      <Box ml="6">
        <Text color="gray.500" fontSize="sm">
          Choose the land!
        </Text>
      </Box>

      <Box h="100%" mx={[-4, 0, 0, 0]}>
        <Flex
          sx={{
            "& > * + *": {
              ml: [0, 0, 0, 0, 0],
              mt: [4, 4, 4, 0],
            },
          }}
          direction={[
            "column",
            "column",
            "column",
            "column",
            isMapExpanded ? "column" : "row",
          ]}
          m="4"
          mb="4"
        >
          <MapWrapper
            h={h}
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
        </Flex>
      </Box>
    </GridBox>
  )
}

export default LandPicker
