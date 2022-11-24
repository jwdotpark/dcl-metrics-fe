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
    total_avg_time_spent: "red",
    total_avg_time_spent_afk: "orange",
    total_logins: "yellow",
    total_logouts: "green",
    total_visitors: "purple",
    deploy_count: "navy",
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
  const btnBg = "gray.800"
  const layers = []
  const highlights = []
  const mapHeight = {
    collapsed: 500,
    expanded: 750,
  }

  const onResetClick = () => {
    setSelected([])
  }

  const [selected, setSelected] = useState([])
  const isSelected = (x: number, y: number) => {
    return selected.some((coord) => coord.x === x && coord.y === y)
  }

  const selectedStrokeLayer: Layer = (x, y) => {
    return isSelected(x, y) ? { color: "#ff004450", scale: 1 } : null
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

  const layer = (x, y) => {
    const id = x + "," + y
    if (tiles && id in tiles) {
      const tile = tiles[id]

      const sceneColor = () => {
        if (!tile.total_visitors) {
          return COLOR_BY_TYPE[tile.type]
        } else if (tile.total_visitors > 0) {
          const properties = [
            "total_avg_time_spent",
            "total_avg_time_spent_afk",
            "total_logins",
            "total_logouts",
            "total_visitors",
            "deploy_count",
          ]
          for (let i = 0; i < properties.length; i++) {
            console.log(tile[properties[i]])
            if (tile[properties[i]] > 0) {
              return COLOR_BY_TYPE[properties[i]]
            }
          }
        }
      }

      return {
        // color: COLOR_BY_TYPE[tile.type],
        color: sceneColor(),
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
  }, [tiles])

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
                  <Flex>
                    <Box pos="absolute" zIndex="banner" bottom="4" left="4">
                      <Text color="gray.100">
                        [{tempCoord.x}, {tempCoord.y}]
                      </Text>
                    </Box>
                    <Spacer />
                    <Box pos="absolute" zIndex="banner" right="4" bottom="4">
                      <MapMenu />
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
