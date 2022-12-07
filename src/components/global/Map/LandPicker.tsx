import { Text, Box, useColorModeValue, Flex, Spacer } from "@chakra-ui/react"
import GridBox from "../../local/GridBox"
import dynamic from "next/dynamic"
const MapWrapper = dynamic(() => import("./Map"), { ssr: false })
import MapInfo from "./MapInfo"
import { useState } from "react"
import { usePrev } from "../../../lib/hooks/usePrev"

const LandPicker = () => {
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
    map: isMapExpanded ? "100%" : "70%",
    info: isMapExpanded ? "100%" : "30%",
  }
  const mapHeight = {
    collapsed: 500,
    expanded: 650,
  }

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
          />
          <MapInfo
            h={h}
            isMapExpanded={isMapExpanded}
            setIsMapExpanded={setIsMapExpanded}
            coord={coord}
            setCoord={setCoord}
            selectedParcel={selectedParcel}
            setSelectedParcel={setSelectedParcel}
            mapBoxVerticalSize={mapBoxVerticalSize}
            mapHeight={mapHeight}
          />
        </Flex>
      </Box>
    </GridBox>
  )
}

export default LandPicker
