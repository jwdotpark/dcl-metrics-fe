/* eslint-disable react-hooks/exhaustive-deps */
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
import { memo, useEffect, useMemo, useRef, useState } from "react"
import { usePrev } from "../../../lib/hooks/usePrev"
import "react-tile-map/lib/styles.css"
import { Layer, TileMap } from "react-tile-map"
import { heatmapColor } from "../../../lib/hooks/utils"
import tempParcel from "../../../../public/data/temp_parcel.json"
import MapMenu from "./partials/MapMenu"
import MapButtonGroup from "./partials/MapButtonGroup"

const Map = ({
  h,
  coord,
  setCoord,
  selectedParcel,
  setSelectedParcel,
  isMapExpanded,
  setIsMapExpanded,
  prevParcel,
  mapBoxVerticalSize,
  mapHeight,
}) => {
  const box = {
    h: "auto",
    w: "100%",
    bg: useColorModeValue("gray.200", "gray.700"),
  }

  const [tempCoord, setTempCoord] = useState({
    x: 0,
    y: 0,
  })

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
    selected_scene: "#FF9990",
  }

  // TODO remove color property
  const properties = [
    { name: "max_concurrent_users" },
    { name: "visitor_intensity" },
    { name: "time_spent_intensity" },
    { name: "time_spent_afk_intensity" },
    { name: "login_intensity" },
    { name: "logout_intensity" },
  ]

  const [tiles, setTiles] = useState([])
  const [isHover, setIsHover] = useState(false)
  const [isMapLoading, setIsMapLoading] = useState(false)
  const [zoom, setZoom] = useState(1)
  const btnBg = useColorModeValue("gray.100", "gray.900")
  const textColor = useColorModeValue("gray.100", "gray.900")
  const [selected, setSelected] = useState([])
  const [selectedScene, setSelectedScene] = useState([])
  const prevScene = usePrev(selectedScene)
  const isIncluded = selectedScene.includes(selectedParcel.id)
  const [selectedProp, setSelectedProp] = useState(properties[0])
  const prevTile = usePrev(sessionStorage.getItem("selectedParcelType"))
  const layers = []

  const isSelected = (x: number, y: number) => {
    return selected.some((coord) => coord.x === x && coord.y === y)
  }

  const selectedStrokeLayer: Layer = (x, y) => {
    const id = x + "," + y
    const tile = tiles[id]
    return isSelected(x, y)
      ? {
          color: "#F7007C",
          scale: 0.75,
          top: !!tile.top,
          left: !!tile.left,
          topLeft: !!tile.topLeft,
        }
      : null
  }
  const handleClick = (x: number, y: number) => {
    const id = x + "," + y
    setSelectedParcel(tiles[id])

    if (isSelected(x, y)) {
      setSelected(selected.filter((coord) => coord.x !== x && coord.y !== y))
    } else {
      setSelected([{ x, y }])
    }
    if (selectedParcel.scene) {
      setSelectedScene(selectedParcel.scene.parcels)
    }
    console.log("selected tile", tiles[id])
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

  const tileColor = (tile) => {
    if (!tile[selectedProp.name]) {
      return COLOR_BY_TYPE[tile.type]
    }
    if (tile[selectedProp.name] > 0) {
      // return COLOR_BY_TYPE[selectedProp.name]
      const value = tile[selectedProp.name]
      return heatmapColor(value)
    }
  }

  const layer = (x, y) => {
    const id = x + "," + y
    if (tiles && id in tiles) {
      const tile = tiles[id]
      return {
        color: tileColor(tile),
        top: !!tile.top,
        left: !!tile.left,
        topLeft: !!tile.topLeft,
        scale: 0.95,
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
        scene: tile.scene,
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

  useEffect(() => {
    injectTiles()
  }, [tiles])

  useEffect(() => {
    if (selectedParcel.type !== "selected_scene") {
      sessionStorage.setItem("selectedParcel", selectedParcel.id)
      sessionStorage.setItem("selectedParcelType", selectedParcel.type)
    }
    if (selectedParcel.scene) {
      selectedParcel.scene.parcels.map((tile) => {
        tiles[tile].type = "selected_scene"
      })
    }
  }, [selectedParcel])

  useEffect(() => {
    if (prevScene && !isIncluded) {
      // @ts-ignore
      prevScene.map((parcel) => {
        tiles[parcel].type = prevTile
      })
    }
  }, [prevScene])

  return (
    <Box
      w={["100%", "100%", "100%", mapBoxVerticalSize.map]}
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
                  onChange={(e) => {
                    setZoom(e.zoom)
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

export const MapWrapper = memo(Map)
export default MapWrapper
