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
      console.log(land)
    }
  }

  const fetchTiles = async (
    url: string = "https://api.decentraland.org/v2/tiles"
  ) => {
    if (!window.fetch) return {}
    const resp = await window.fetch(url)
    const json = await resp.json()
    setTiles(json.data)
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

  useEffect(() => {
    fetchTiles()
  }, [])

  return (
    <Box w={["100%", "100%", "100%", "80%"]} h={h}>
      <GridItem
        sx={mapBoxCss}
        w={box.w}
        h="100%"
        bg={box.bg}
        borderRadius="xl"
        shadow="md"
      >
        <Box p="4">
          <Box overflow="hidden" h="500" borderRadius="xl">
            <TileMap
              isDraggable={true}
              layers={[layer, ...layers]}
              onClick={(x, y) => {
                setCoord({ x, y })
                onClickAtlasHandler(x, y)
              }}
            />
          </Box>
        </Box>
      </GridItem>
    </Box>
  )
}

export default Map
