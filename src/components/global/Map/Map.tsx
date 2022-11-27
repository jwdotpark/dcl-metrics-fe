/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  Text,
  Center,
  Flex,
  GridItem,
  useColorModeValue,
  Button,
  Spacer,
  Spinner,
  ButtonGroup,
} from "@chakra-ui/react"
import { memo, useEffect, useState } from "react"
import "react-tile-map/lib/styles.css"
import { Layer, TileMap } from "react-tile-map"
import tempParcel from "../../../../public/data/temp_parcel.json"
import MapMenu from "./partials/MapMenu"
import MapButtonGroup from "./partials/MapButtonGroup"

const Map = ({ h, coord, setCoord, selectedParcel, setSelectedParcel }) => {
  const box = {
    h: "auto",
    w: "100%",
    bg: useColorModeValue("gray.200", "gray.700"),
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
    // new properties
    total_avg_time_spent: "#8be9fd",
    total_avg_time_spent_afk: "#50fa7b",
    total_logins: "#ffb86c",
    total_logouts: "#ff79c6",
    total_visitors: "#bd93f9",
    deploy_count: "#ff5555",
  }

  // const { layers = [], onChange, onPopup, onClick, ...rest } = props
  const [tempCoord, setTempCoord] = useState({
    x: 0,
    y: 0,
  })

  const [tiles, setTiles] = useState([])
  const [isHover, setIsHover] = useState(false)
  const [isMapLoading, setIsMapLoading] = useState(false)
  const [isMapExpanded, setIsMapExpanded] = useState(false)
  const [zoom, setZoom] = useState(1)
  const btnBg = useColorModeValue("gray.800", "gray.400")
  const textColor = useColorModeValue("gray.100", "gray.900")
  const layers = []
  const mapHeight = {
    collapsed: 500,
    expanded: 750,
  }

  const properties = [
    { name: "total_avg_time_spent", color: "#8be9fd" },
    { name: "total_avg_time_spent_afk", color: "#50fa7b" },
    { name: "total_logins", color: "#ffb86c" },
    { name: "total_logouts", color: "#ff79c6" },
    { name: "total_visitors", color: "#bd93f9" },
    { name: "deploy_count", color: "#ff5555" },
  ]

  const [selected, setSelected] = useState([])
  const isSelected = (x: number, y: number) => {
    return selected.some((coord) => coord.x === x && coord.y === y)
  }

  const selectedStrokeLayer: Layer = (x, y) => {
    return isSelected(x, y) ? { color: "#f1fa8c", scale: 0.95 } : null
  }

  const handleClick = (x: number, y: number) => {
    const id = x + "," + y
    setSelectedParcel(tiles[id])
    if (isSelected(x, y)) {
      setSelected(selected.filter((coord) => coord.x !== x && coord.y !== y))
    } else {
      setSelected([{ x, y }])
    }
  }

  const fetchTiles = async (
    url: string = "https://api.decentraland.org/v2/tiles"
  ) => {
    if (!window.fetch) return {}
    setIsMapLoading(true)
    const resp = await fetch(url, {
      cache: "force-cache",
    })
    const json = await resp.json()
    setTiles(json.data)
    setIsMapLoading(false)
  }

  const injectTiles = () => {
    // @ts-ignore
    tempParcel.map((tile) => {
      const id = tile.coordinates
      tiles[id] = { ...tiles[id], ...tile }
    })
  }

  const [selectedProp, setSelectedProp] = useState(properties[0])

  const layer = (x, y) => {
    const id = x + "," + y
    if (tiles && id in tiles) {
      const tile = tiles[id]

      const tileColor = () => {
        if (!tile[selectedProp.name]) {
          return COLOR_BY_TYPE[tile.type]
        } else if (tile[selectedProp.name] > 0) {
          return COLOR_BY_TYPE[selectedProp.name]
        }
      }

      return {
        // color: COLOR_BY_TYPE[tile.type],
        color: tileColor(),
        top: !!tile.top,
        left: !!tile.left,
        topLeft: !!tile.topLeft,
        owner: tile.owner,
        estateId: tile.estateId,
        tokenId: tile.tokenId,
        type: tile.type,
        coordinate: tile?.coordinate,
        deploy_count: tile?.deploy_count,
        total_avg_time_spent: tile.total_avg_time_spent,
        total_avg_time_spent_afk: tile.total_avg_time_spent,
        total_logins: tile.total_logins,
        total_logouts: tile.total_logouts,
        total_visitors: tile.total_visitors,
        scenes: tile.scenes,
      }
    } else {
      return {
        color: (x + y) % 2 === 0 ? COLOR_BY_TYPE[13] : COLOR_BY_TYPE[14],
      }
    }
  }

  useEffect(() => {
    fetchTiles()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    injectTiles()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProp, tiles])

  return (
    <Box
      w={["100%", "100%", "100%", "70%"]}
      h="auto"
      border="solid 1px"
      borderColor={useColorModeValue("gray.200", "gray.600")}
      borderRadius="xl"
      shadow="md"
    >
      <GridItem w={box.w} h="100%" bg={box.bg} borderRadius="xl">
        <Box p="4">
          <Box
            overflow="hidden"
            h={!isMapExpanded ? mapHeight.collapsed : mapHeight.expanded}
            bg="#25232A"
            border="2px solid"
            borderColor={useColorModeValue("gray.200", "gray.600")}
            borderRadius="xl"
            shadow="md"
            onMouseEnter={() => {
              setIsHover(true)
            }}
            onMouseLeave={() => {
              setIsHover(false)
            }}
          >
            {!isMapLoading ? (
              <>
                {isHover && (
                  <MapButtonGroup
                    isMapExpanded={isMapExpanded}
                    setIsMapExpanded={setIsMapExpanded}
                    zoom={zoom}
                    setZoom={setZoom}
                    tempCoord={tempCoord}
                    properties={properties}
                    selectedProp={selectedProp}
                    setSelectedProp={setSelectedProp}
                    textColor={textColor}
                    btnBg={btnBg}
                  />
                )}
                {isHover && (
                  <Flex>
                    <Box pos="absolute" zIndex="banner" bottom="2" left="2">
                      <Text color="gray.100" textShadow="md">
                        [{tempCoord.x}, {tempCoord.y}]
                      </Text>
                    </Box>
                    <Spacer />
                    <Box
                      pos="absolute"
                      zIndex="banner"
                      right="2"
                      bottom="2"
                      shadow="md"
                    >
                      <MapMenu
                        textColor={textColor}
                        btnBg={btnBg}
                        properties={properties}
                        selectedProp={selectedProp}
                        setSelectedProp={setSelectedProp}
                      />
                    </Box>
                  </Flex>
                )}
                <TileMap
                  zoom={zoom}
                  layers={[layer, selectedStrokeLayer, ...layers]}
                  onHover={(x, y) => {
                    setTempCoord({ x, y })
                  }}
                  onClick={(x, y) => {
                    setCoord({ x, y })
                    handleClick(x, y)
                  }}
                />
              </>
            ) : (
              <Center
                h={isMapExpanded ? mapHeight.expanded : mapHeight.collapsed}
              >
                <Spinner />
              </Center>
            )}
          </Box>
        </Box>
      </GridItem>
    </Box>
  )
}

export default memo(Map)
