/* eslint-disable no-unused-vars */
import {
  Box,
  Flex,
  Center,
  useColorModeValue,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react"
import { memo, useEffect, useState } from "react"
import { usePrev } from "../../../lib/hooks/usePrev"
import "react-tile-map/lib/styles.css"
import { Layer, TileMap } from "react-tile-map"
import { heatmapColor } from "../../../lib/hooks/utils"
import MapButtonGroup from "./partials/MapButtonGroup"
import CollapsibleMapBox from "./partials/CollapsibleMapBox"
import { FullScreen, useFullScreenHandle } from "react-full-screen"
import { searchTiles } from "../../../lib/data/searchMap"

const Map = ({
  h,
  coord,
  setCoord,
  selectedParcel,
  setSelectedParcel,
  isMapExpanded,
  setIsMapExpanded,
  mapBoxVerticalSize,
  mapHeight,
  parcelData,
  setMapHeight,
}) => {
  const [tempCoord, setTempCoord] = useState({
    x: 0,
    y: 0,
  })
  const handle = useFullScreenHandle()

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

  const properties = [
    { name: "max_concurrent_users" },
    { name: "visitor_intensity" },
    { name: "avg_time_spent_intensity" },
    { name: "avg_time_spent_afk_intensity" },
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
  const isIncluded = selectedScene?.includes(selectedParcel?.id)
  const [selectedProp, setSelectedProp] = useState(properties[0])
  const prevTile = usePrev(sessionStorage.getItem("selectedParcelType"))
  const [center, setCenter] = useState({ x: 0, y: 0 })
  const [searchResult, setSearchResult] = useState([])
  const [keyword, setKeyword] = useState("")
  const [searchResultID, setSearchResultID] = useState({ x: 0, y: 0 })

  // infobox
  const { getButtonProps, getDisclosureProps, isOpen, onToggle } =
    useDisclosure()
  const [hidden, setHidden] = useState(!isOpen)
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

    if (!isOpen) {
      onToggle()
    }

    if (selectedParcel && selectedParcel.scene) {
      setSelectedScene(selectedParcel.scene.parcels)
    }

    setCenter({ x: x, y: y })
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const injectTiles = () => {
    // @ts-ignore
    parcelData.map((tile) => {
      const id = tile.coordinates
      tiles[id] = { ...tiles[id], ...tile }
    })
  }

  const tileColor = (tile) => {
    if (!tile[selectedProp.name]) {
      return COLOR_BY_TYPE[tile.type]
    }
    if (tile[selectedProp.name] > 0) {
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
    if (searchResultID.x !== 0 && searchResultID.y !== 0) {
      setCenter({ x: searchResultID.x, y: searchResultID.y })
      handleClick(searchResultID.x, searchResultID.y)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchResultID])

  useEffect(() => {
    setTimeout(() => {
      setSearchResult(searchTiles(tiles, keyword))
    }, 250)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword])

  useEffect(() => {
    fetchTiles()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (zoom < 0.7) {
      setZoom(0.7)
    }
  }, [zoom])

  useEffect(() => {
    injectTiles()
  }, [injectTiles, tiles])

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
  }, [selectedParcel, tiles])

  useEffect(() => {
    if (prevScene && !isIncluded) {
      // @ts-ignore
      prevScene.map((parcel) => {
        tiles[parcel].type = prevTile
      })
    }
  }, [isIncluded, prevScene, prevTile, tiles])

  return (
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
    >
      <Box
        w="100%"
        h="auto"
        border="solid 1px"
        borderColor={useColorModeValue("gray.200", "gray.600")}
        borderRadius="xl"
        shadow="md"
      >
        <FullScreen handle={handle}>
          <Box
            overflow="hidden"
            h={!isMapExpanded ? mapHeight.collapsed : mapHeight.expanded}
            bg="#25232A"
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
                <Box>
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
                    handle={handle}
                    setMapHeight={setMapHeight}
                    keyword={keyword}
                    setKeyword={setKeyword}
                    searchResult={searchResult}
                    setSearchResultID={setSearchResultID}
                  />
                </Box>
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
                    setCenter(e.center)
                  }}
                  x={center.x}
                  y={center.y}
                />
                <CollapsibleMapBox
                  getButtonProps={getButtonProps}
                  getDisclosureProps={getDisclosureProps}
                  isOpen={isOpen}
                  hidden={hidden}
                  setHidden={setHidden}
                  coord={coord}
                  selectedParcel={selectedParcel}
                  isMapExpanded={isMapExpanded}
                  mapBoxVerticalSize={mapBoxVerticalSize}
                  mapHeight={mapHeight}
                  handle={handle}
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
        </FullScreen>
      </Box>
    </Flex>
  )
}

export const MapWrapper = memo(Map)
export default MapWrapper
