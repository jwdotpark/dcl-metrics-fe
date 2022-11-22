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
import { useEffect, useState } from "react"
import "react-tile-map/lib/styles.css"
import { Layer, TileMap } from "react-tile-map"

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

  const layers = []
  const highlights = []

  const getLandById = (x: number, y: number) => {
    const id = `${x},${y}`
    return highlights.find((coord) => {
      return coord.id === id
    })
  }

  const [selected, setSelected] = useState([])
  const isSelected = (x: number, y: number) => {
    return selected.some((coord) => coord.x === x && coord.y === y)
  }

  const selectedStrokeLayer: Layer = (x, y) => {
    return isSelected(x, y) ? { color: "#ff0044", scale: 1.2 } : null
  }

  const selectedFillLayer: Layer = (x, y) => {
    return isSelected(x, y) ? { color: "#ff9990", scale: 1.2 } : null
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

  // memoize layer
  const layer = (x, y) => {
    const id = x + "," + y
    if (tiles && id in tiles) {
      const tile = tiles[id]
      return {
        color: COLOR_BY_TYPE[tile.type],
        top: !!tile.top,
        left: !!tile.left,
        topLeft: !!tile.topLeft,
        owner: tile.owner,
        estateId: tile.estateId,
        tokenId: tile.tokenId,
        type: tile.type,
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

  const onResetClick = () => {
    setSelected([])
  }

  const mapHeight = {
    collapsed: 500,
    expanded: 750,
  }

  const [zoom, setZoom] = useState(1)
  // const btnBg = useColorModeValue("#6272a4", "#44475a")
  const btnBg = "#6272a4"

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
                  <Flex pos="absolute" zIndex="banner" w="100%" p="2">
                    <Box mr="2">
                      <Button
                        color="gray.100"
                        bg={btnBg}
                        borderRadius="xl"
                        shadow="md"
                        onClick={() => onResetClick()}
                        size="sm"
                        variant="solid"
                      >
                        Reset
                      </Button>
                    </Box>
                    <Box>
                      <Button
                        color="gray.100"
                        bg={btnBg}
                        borderRadius="xl"
                        shadow="md"
                        onClick={() => setIsMapExpanded(!isMapExpanded)}
                        size="sm"
                        variant="solid"
                      >
                        {isMapExpanded ? "Collapse" : "Expand"}
                      </Button>
                    </Box>
                    <Spacer />
                    <Box>
                      <ButtonGroup isAttached>
                        <Button
                          color="gray.100"
                          bg={btnBg}
                          borderRadius="xl"
                          shadow="md"
                          onClick={() =>
                            setZoom(Number((zoom - 0.2).toFixed(1)))
                          }
                          size="sm"
                          variant="solid"
                        >
                          -
                        </Button>
                        <Button
                          color="gray.100"
                          bg={btnBg}
                          borderRadius="xl"
                          shadow="md"
                          onClick={() =>
                            setZoom(Number((zoom + 0.2).toFixed(1)))
                          }
                          size="sm"
                          variant="solid"
                        >
                          +
                        </Button>
                      </ButtonGroup>
                    </Box>
                  </Flex>
                )}
                {isHover && (
                  <Box pos="absolute" zIndex="banner" bottom="4" left="4">
                    <Text color="gray.100">
                      [{tempCoord.x}, {tempCoord.y}]
                    </Text>
                  </Box>
                )}
                <TileMap
                  zoom={zoom}
                  layers={[
                    layer,
                    selectedStrokeLayer,
                    selectedFillLayer,
                    ...layers,
                  ]}
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

export default Map
