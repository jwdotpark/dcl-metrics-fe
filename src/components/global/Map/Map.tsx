/* eslint-disable react-hooks/rules-of-hooks */
import {
  Image,
  Box,
  Text,
  Center,
  Flex,
  GridItem,
  useColorModeValue,
  useBreakpointValue,
  Button,
  Spacer,
  Spinner,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import "react-tile-map/lib/styles.css"
import { Coord, Layer, TileMap, TileMapProps } from "react-tile-map"

const Map = ({ h, coord, setCoord }) => {
  const box = {
    h: "auto",
    w: "100%",
    bg: useColorModeValue("gray.200", "gray.700"),
  }

  const mapBoxCss = {
    "&::-webkit-scrollbar": {
      display: "none",
    },
    scrollbarWidth: "none",
    "-webkit-touch-callout": "none",
    "-webkit-user-select": "none",
    "-khtml-user-select": "none",
    "-moz-user-select": "none",
    "-ms-user-select": "none",
    "user-select": "none",
  }

  const COLOR_BY_TYPE: Record<number | string, string> = {
    0: "#ff9990", // my parcels
    1: "#ff4053", // my parcels on sale
    2: "#ff9990", // my estates
    3: "#ff4053", // my estates on sale
    4: "#ffbd33", // parcels/estates where I have permissions
    district: "#5054D4", // districts
    6: "#563db8", // contributions
    road: "#716C7A", // roads
    plaza: "#70AC76", // plazas
    owned: "#3D3A46", // owned parcel/estate
    10: "#3D3A46", // parcels on sale (we show them as owned parcels)
    unowned: "#09080A", // unowned pacel/estate
    12: "#18141a", // background
    13: "#110e13", // loading odd
    14: "#0d0b0e", // loading even
  }

  // const { layers = [], onChange, onPopup, onClick, ...rest } = props
  const [tempCoord, setTempCoord] = useState({
    x: 0,
    y: 0,
  })
  const [tiles, setTiles] = useState([])
  const layers = []
  const highlights = []

  const getLandById = (x: number, y: number) => {
    const id = `${x},${y}`
    return highlights.find((coord) => {
      return coord.id === id
    })
  }

  const onClickAtlasHandler = (x: number, y: number) => {
    if (!tiles) return
    const land = getLandById(x, y)
    if (land) {
      // land?.landId && setSelectedId && setSelectedId(land.landId)
      // setClickedLandId && setClickedLandId(x, y)
    }
  }

  const [isMapLoading, setIsMapLoading] = useState(false)
  const fetchTiles = async (
    url: string = "https://api.decentraland.org/v2/tiles"
  ) => {
    if (!window.fetch) return {}
    console.log("fetching tiles..")
    setIsMapLoading(true)
    const resp = await window.fetch(url)
    const json = await resp.json()
    setTiles(json.data)
    setIsMapLoading(false)
  }

  const layer = (x, y) => {
    const id = x + "," + y
    if (tiles && id in tiles) {
      const tile = tiles[id]
      return {
        color: COLOR_BY_TYPE[tile.type],
        top: !!tile.top,
        left: !!tile.left,
        topLeft: !!tile.topLeft,
      }
    } else {
      return {
        color: (x + y) % 2 === 0 ? COLOR_BY_TYPE[13] : COLOR_BY_TYPE[14],
      }
    }
  }

  // when hover, make scroll speed slower
  const [isHover, setIsHover] = useState(false)
  useEffect(() => {
    fetchTiles()
  }, [])

  // make scroll speed slow
  useEffect(() => {
    if (isHover) {
      window.scrollBy(0, 1)
    } else {
    }
  }, [isHover])

  return (
    <Box w={["100%", "100%", "100%", "80%"]} h="auto">
      <GridItem
        sx={mapBoxCss}
        w={box.w}
        h="100%"
        bg={box.bg}
        borderRadius="xl"
        shadow="md"
      >
        <Box p="4">
          <Box
            overflow="hidden"
            h={h}
            borderRadius="xl"
            onMouseEnter={() => {
              setIsHover(true)
            }}
            onMouseLeave={() => {
              setIsHover(false)
            }}
            shadow="md"
          >
            {!isMapLoading ? (
              <>
                <Box pos="absolute" zIndex="banner" p="2">
                  <Text fontSize="2xl">
                    {isHover && `[${tempCoord.x}, ${tempCoord.y}]`}
                  </Text>
                </Box>
                <TileMap
                  layers={[layer, ...layers]}
                  onHover={(x, y) => {
                    setTempCoord({ x, y })
                  }}
                  onClick={(x, y) => {
                    setCoord({ x, y })
                    onClickAtlasHandler(x, y)
                  }}
                />
              </>
            ) : (
              <Center h={h}>
                <Spinner />
              </Center>
            )}
          </Box>
        </Box>
      </GridItem>
    </Box>
  )
}

export default Map
